import { useState } from "react";
import ConnectWallet from "./components/ConnectWallet";
import RegisterSatellite from "./components/RegisterSatellite";
import UploadData from "./components/UploadData";
import LogCommand from "./components/LogCommand";
import ViewLogs from "./components/ViewLogs";

function App() {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🛰 Telehash Dashboard</h1>
      <ConnectWallet setWallet={setWallet} setProvider={setProvider} />
      {wallet && (
        <>
          <RegisterSatellite wallet={wallet} />
          <UploadData wallet={wallet} />
          <LogCommand wallet={wallet} />
          <ViewLogs provider={provider} walletAddress={wallet.address || wallet._address} />
        </>
      )}
    </div>
  );
}

export default App;
