import { useEffect, useState } from "react";

// ⚙️ Telehash core components
import ConnectWallet from "./components/ConnectWallet";
import RegisterSatellite from "./components/RegisterSatellite";
import UploadData from "./components/UploadData";
import LogCommand from "./components/LogCommand";
import ViewLogs from "./components/ViewLogs";
import ThemeToggle from "./components/ThemeToggle";

// ✅ Greenfield upload components
import GreenfieldUpload from "./components/GreenfieldUpload.jsx";
import CidFileList from "./components/CidFileList.jsx";

// 🧪 Styles
import "./styles/theme.css";

function App() {
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [theme, setTheme] = useState("dark");

  // ⬇️ Greenfield-related state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const bucketName = "telehash01"; // Update to match your bucket name!

  // 🎨 Theme toggling
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
          {/* 🛠️ Original Telehash Features */}
          <RegisterSatellite wallet={wallet} />
          <UploadData wallet={wallet} />
          <LogCommand wallet={wallet} />
          <ViewLogs
            provider={provider}
            walletAddress={wallet.address || wallet._address}
          />

          <hr />

          {/* 🧠 Greenfield Integration */}
          <h2>📂 Satellite File Upload (via BNB Greenfield)</h2>

        <GreenfieldUpload
  bucketName={bucketName}
  onUploadSuccess={(file) =>
    setUploadedFiles((prev) => [...prev, file])
  }
/>

        <CidFileList
  bucketName={bucketName}
  files={uploadedFiles}
/>
        </div>
      )}
    </div>
  );
}

export default App;
