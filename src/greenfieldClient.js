import { Client } from "@bnb-chain/greenfield-js-sdk";

// Create the Greenfield client pointing to the testnet
export const greenfield = Client.create(
  "https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org:443",
  "5600"
);
