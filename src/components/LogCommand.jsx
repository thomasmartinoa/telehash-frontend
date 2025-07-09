import { useState } from "react";
import { getTelehashContract } from "../utils/contract";

export default function LogCommand({ wallet }) {
  const [command, setCommand] = useState("");

  const logCmd = async () => {
    const contract = getTelehashContract(wallet);
    const tx = await contract.logCommand(command);
    await tx.wait();
    alert("✅ Command logged");
  };

  return (
    <div>
      <input placeholder="Command" onChange={(e) => setCommand(e.target.value)} />
      <button onClick={logCmd}>Log Command</button>
    </div>
  );
}
