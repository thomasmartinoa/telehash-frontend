import { ethers } from "ethers";
import TelehashABI from "./Telehash.json";

// your deployed contract on BNB testnet
const CONTRACT_ADDRESS = "0x76ca0FdbE82Fb9a0a23b5fA8A1Bb3844DFA2b3Ea";

export const getTelehashContract = (providerOrSigner) => {
  return new ethers.Contract(CONTRACT_ADDRESS, TelehashABI.abi, providerOrSigner);
};
