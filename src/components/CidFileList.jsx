import React from "react";

function CidFileList({ bucketName, files }) {
  return (
    <div>
      <h4>📁 Uploaded Files</h4>
      <ul>
        {files.map((f, i) => (
          <li key={i}>
            <a
              href={`https://gnfd-testnet-sp-1.nodereal.io/view/${bucketName}/${f.filename}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {f.filename}
            </a>{" "}
            [CID: <code>{f.cid}</code>]
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CidFileList;
