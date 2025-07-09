import { useState } from "react";
import { ethers } from "ethers";

export default function ConnectWallet({ setWallet, setProvider }) {
  const [address, setAddress] = useState("");

  const connect = async () => {
    try {
      console.log("🔘 Connect Wallet clicked");
      if (!window.ethereum) {
        alert("MetaMask is not installed!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum); // for ethers v6+
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();

      setProvider(provider);
      setWallet(signer);
      setAddress(userAddress);

      console.log("🔌 Connected:", userAddress);
    } catch (err) {
      console.error("❌ Wallet connection error:", err);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <button onClick={connect}>
        {address ? `✅ Connected: ${address.slice(0, 6)}...` : "🔌 Connect Wallet"}
      </button>
    </div>
  );
}
