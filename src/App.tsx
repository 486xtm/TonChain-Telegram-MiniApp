import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";
import { useTonConnect } from "./hooks/useTonConnect";
import '@twa-dev/sdk';
// import { TonClient } from "@ton/ton";
// import { useEffect, useState } from "react";

// import  { getHttpEndpoint} from  "@orbs-network/ton-access";


function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
  // const [balance , SetBalance] = useState<T | undefined>();
 
  // useEffect(() => {
  //   (
  //     async () => {
  //       const endpoint = await getHttpEndpoint({ network: "testnet" });
  //       const client = new TonClient({ endpoint });
  //       const currentbalance = await client.getBalance("0QDzW-KvuT7dcCnJbD_DNWR_xNaLlIc0vSOowa19YDFqqYop");
  //       SetBalance(currentbalance);
  //     }
  //   )();
  // },[])
  return (
    <>
      <div className="Container">
        <TonConnectButton />
        <div className="Card">
          <b>Counter Address </b>
          <div className="Hint">{address?.slice(0.3) + "..."}</div>
        </div>
        <div className="Card">
          <b>Counter Value</b>
          <div>{value ?? "Loading"}</div>
        </div>
        <a
          className={`Button ${connected ? 'Active' : 'Disabled'}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
      </div>
    </>
  );
}

export default App;
