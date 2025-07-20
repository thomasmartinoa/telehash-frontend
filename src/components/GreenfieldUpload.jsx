import React, { useState } from "react";
import { greenfield } from "../greenfieldClient";
import { ethers } from "ethers";

function GreenfieldUpload({ bucketName, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [cid, setCid] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
    if (selected) {
      setStatus(`✅ File selected: ${selected.name}`);
    } else {
      setStatus("");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("❌ Please select a file.");
      return;
    }

    try {
      setLoading(true);
      setStatus("⚙️ Connecting to wallet...");

      if (!window.ethereum) {
        throw new Error("MetaMask not detected.");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();

      setStatus("⚙️ Uploading to Greenfield...");

      const buffer = await file.arrayBuffer();
      const res = await greenfield.object.putObject(
        bucketName,
        file.name,
        new Uint8Array(buffer),
        {
          contentType: file.type || "application/octet-stream",
          signer: signer,
        }
      );

      console.log("Upload result →", res);

      if (!res || res.code !== 0) {
        throw new Error(res?.message || "Upload failed.");
      }

      const objectHash = res.data?.objectId || res.data?.hash;
      if (!objectHash) {
        throw new Error("Upload success, but no object hash returned.");
      }

      setCid(objectHash);
      setStatus("✅ Upload successful.");

      if (onUploadSuccess) {
        onUploadSuccess({ filename: file.name, cid: objectHash });
      }

      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setStatus(`❌ Upload failed: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <input type="file" onChange={handleFileChange} disabled={loading} />
      <br />
      <button onClick={handleUpload} disabled={!file || loading} style={{ marginTop: "0.5rem" }}>
        {loading ? "Uploading..." : "Upload to Greenfield"}
      </button>
      {status && <p style={{ color: status.startsWith("❌") ? "red" : "black" }}>{status}</p>}
      {cid && (
        <p>
          🔗 <strong>Object CID:</strong> <code>{cid}</code>
        </p>
      )}
    </div>
  );
}

export default GreenfieldUpload;
