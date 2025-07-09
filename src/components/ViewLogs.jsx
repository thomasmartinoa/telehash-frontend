import { useState, useEffect } from "react";
import { getTelehashContract } from "../utils/contract";

export default function ViewLogs({ provider, walletAddress }) {
  const [dataLogs, setDataLogs] = useState([]);
  const [commandLogs, setCommandLogs] = useState([]);

  const loadLogs = async () => {
    const contract = getTelehashContract(provider);
    const data = await contract.getDataLogs(walletAddress);
    const cmds = await contract.getCommandLogs(walletAddress);
    setDataLogs(data);
    setCommandLogs(cmds);
  };

  useEffect(() => {
    if (walletAddress) loadLogs();
  }, [walletAddress]);

  return (
    <div>
      <h3>🧬 Data Logs</h3>
      {dataLogs.map((d, i) => (
        <div key={i}>
          <p>Hash: {d.dataHash}</p>
          <p>CID: {d.greenfieldCID}</p>
          <p>Meta: {d.metadata}</p>
        </div>
      ))}
      <h3>📟 Command Logs</h3>
      {commandLogs.map((c, i) => (
        <div key={i}>
          <p>Cmd: {c.command}</p>
          <p>Time: {new Date(Number(c.timestamp) * 1000).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
