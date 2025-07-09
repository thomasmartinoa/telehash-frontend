import { useState, useEffect } from "react";
import { getTelehashContract } from "../utils/contract";

export default function RegisterSatellite({ wallet }) {
  const [name, setName] = useState("");
  const [registered, setRegistered] = useState("");
  const [error, setError] = useState("");

  const checkIfRegistered = async () => {
    try {
      const contract = getTelehashContract(wallet);
      const current = await wallet.getAddress();
      const satName = await contract.satellites(current);
      if (satName && satName.length > 0) {
        setRegistered(satName);
      } else {
        setRegistered("");
      }
    } catch (err) {
      console.error("Error checking satellite:", err);
    }
  };

  useEffect(() => {
    if (wallet) checkIfRegistered();
  }, [wallet]);

  const register = async () => {
    try {
      if (registered) {
        setError("🚫 Already registered as: " + registered);
        return;
      }

      const contract = getTelehashContract(wallet);
      const tx = await contract.registerSatellite(name);
      await tx.wait();
      setRegistered(name);
      setError("");
      alert("✅ Registered: " + name);
    } catch (err) {
      console.error("Registration failed:", err);
      setError("❌ Registration failed. Try a different wallet.");
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <input
        placeholder="Satellite Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={register}>Register</button>

      {registered && (
        <p style={{ color: "lightgreen", marginTop: "0.5rem" }}>
          ✅ You are already registered as: {registered}
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "0.5rem" }}>{error}</p>
      )}
    </div>
  );
}
