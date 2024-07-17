import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender } from '@ton/core';

export type CounterConfig = {};

export default class Counter implements Contract {
    constructor(
        readonly address: Address,
        readonly init?: { code: Cell; data: Cell },
    ) {}

    static createForDeploy(code: Cell, initialCounterValue: number): Counter {
        const data = beginCell().storeUint(initialCounterValue, 64).endCell();
        const workchain = 0; // deploy to workchain 0
        const address = contractAddress(workchain, { code, data });
        return new Counter(address, { code, data });
    }

    static createFromAddress(address: Address) {
        return new Counter(address);
    }

    async getCounter(provider: ContractProvider) {
        const { stack } = await provider.get("counter", []);
        return stack.readBigNumber();
      }
    async sendDeploy(provider: ContractProvider, via: Sender) {
        await provider.internal(via, {
            value: '0.01',
            bounce: false,
        });
    }
    async sendIncrement(provider: ContractProvider, via: Sender) {
        const messageBody = beginCell().storeUint(1, 32).storeUint(0, 64).endCell();
        await provider.internal(via, { value : "0.002", body: messageBody})
    }
}
