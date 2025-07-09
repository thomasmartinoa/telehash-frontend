import { useState } from "react";
import { getTelehashContract } from "../utils/contract";

export default function UploadData({ wallet }) {
  const [dataHash, setDataHash] = useState("");
  const [cid, setCid] = useState("");
  const [meta, setMeta] = useState("");

  const upload = async () => {
    const contract = getTelehashContract(wallet);
    const tx = await contract.uploadData(dataHash, cid, meta);
    await tx.wait();
    alert("✅ Data uploaded");
  };

  return (
    <div>
      <input placeholder="Data Hash" onChange={(e) => setDataHash(e.target.value)} />
      <input placeholder="Greenfield CID" onChange={(e) => setCid(e.target.value)} />
      <input placeholder="Metadata" onChange={(e) => setMeta(e.target.value)} />
      <button onClick={upload}>Upload Data</button>
    </div>
  );
}
