import "./App.css";
import {useEffect} from 'react';
import { useCounterContract } from "./hooks/useCounterContract";
import { useTonConnect } from "./hooks/useTonConnect";
import WebApp from "@twa-dev/sdk";
import eruda from "eruda";
eruda.init();
import {
  TonConnectButton,
  useTonAddress,
  useTonWallet,
} from "@tonconnect/ui-react";
import { Locales, useTonConnectUI } from "@tonconnect/ui-react";
import { THEME } from '@tonconnect/ui';
import { useIsConnectionRestored } from '@tonconnect/ui-react';
function App() {
  const { connected } = useTonConnect();
  const { value, address, sendIncrement } = useCounterContract();

  const userFriendlyAddress = useTonAddress();
  const rawAddress = useTonAddress(false);

  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();

  const onLanguageChange = (lang: string) => {
    setOptions({
      language: lang as Locales,
      uiPreferences: {
        theme: THEME.DARK,
      },
    });
  };

  const myTransaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: "0QDzW-KvuT7dcCnJbD_DNWR_xNaLlIc0vSOowa19YDFqqYop",
        amount: "20000000",
      },
      {
        address: "0QDzW-KvuT7dcCnJbD_DNWR_xNaLlIc0vSOowa19YDFqqYop",
        amount: "60000000",
      },
    ],
  };

  const connectionRestored = useIsConnectionRestored();
  if (!connectionRestored) {
    return <h1>Please wait...</h1>;
}

// tonConnectUI.setConnectRequestParameters({
//   state: 'loading'
// });
// const tonProofPayload: string | null = await fetchTonProofPayloadFromBackend();

// if (!tonProofPayload) {
//     // remove loader, connect request will be without any additional parameters
//     tonConnectUI.setConnectRequestParameters(null);
// } else {
//     // add tonProof to the connect request
//     tonConnectUI.setConnectRequestParameters({
//         state: "ready",
//         value: { tonProof: tonProofPayload }
//     });
// }
// useEffect(() =>
//   tonConnectUI.onStatusChange(wallet => {
//       if (wallet.connectItems?.tonProof && 'proof' in wallet.connectItems.tonProof) {
//           checkProofInYourBackend(wallet.connectItems.tonProof.proof, wallet.account);
//       }
//   }), []);
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
          className={`Button ${connected ? "Active" : "Disabled"}`}
          onClick={() => {
            sendIncrement();
          }}
        >
          Increment
        </a>
        <button
          onClick={() =>
            WebApp.showAlert(`Hello World! Current count is ${value}`)
          }
        >
          Show Alert
        </button>
        {userFriendlyAddress && (
          <div>
            <span>User-friendly address: {userFriendlyAddress}</span>
            <br />
            <span>Raw address: {rawAddress}</span>
          </div>
        )}

        {wallet && (
          <div>
            {/* <span>Connected wallet: {wallet.name}</span>
            <br /> */}
            <span>Device: {wallet.device.appName}</span>
          </div>
        )}

        <button
          onClick={async () =>
            await tonConnectUI.sendTransaction(myTransaction)
          }
        >
          Send transaction
        </button>
        <div>
          <label>language</label>
          <select onChange={(e) => onLanguageChange(e.target.value)}>
            <option value="en">en</option>
            <option value="ru">ru</option>
          </select>
        </div>
        <button onClick={() => tonConnectUI.disconnect()} >Disconnect</button>
      </div>
    </>
  );
}

export default App;
