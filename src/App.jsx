import { useState, useEffect } from "react";
import ConnectWallet from "./components/ConnectWallet";
import RegisterSatellite from "./components/RegisterSatellite";
import UploadData from "./components/UploadData";
import LogCommand from "./components/LogCommand";
import ViewLogs from "./components/ViewLogs";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/theme.css";

function App() {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="container">
      <header className="header">
        <h1>🛰 Telehash Dashboard</h1>
        <ThemeToggle theme={theme} setTheme={setTheme} />
        <ConnectWallet setWallet={setWallet} setProvider={setProvider} />
      </header>
      {wallet && (
        <div className="card">
          <RegisterSatellite wallet={wallet} />
          <UploadData wallet={wallet} />
          <LogCommand wallet={wallet} />
          <ViewLogs provider={provider} walletAddress={wallet.address || wallet._address} />
        </div>
      )}
    </div>
  );
}

export default App;