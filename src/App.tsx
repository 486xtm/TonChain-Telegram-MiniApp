import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useCounterContract } from "./hooks/useCounterContract";
import { useTonConnect } from "./hooks/useTonConnect";
import '@twa-dev/sdk';
import eruda from 'eruda';
eruda.init();
function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();
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
