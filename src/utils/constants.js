import { ColorMode, NetworkType } from "@airgap/beacon-sdk";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";

export const TEZOS_COLLECT_NETWORK = {
  type: NetworkType.GHOSTNET,
};

const MAINNET_RPC_URL = "https://mainnet.api.tez.ie";
const GHOSTNET_RPC_URL = "https://ghostnet.smartpy.io/";

const TEZOS_COLLECT_RPC_URL =
  TEZOS_COLLECT_NETWORK.type === NetworkType.GHOSTNET
    ? GHOSTNET_RPC_URL
    : MAINNET_RPC_URL;
export const Tezos = new TezosToolkit(TEZOS_COLLECT_RPC_URL);
export const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRmODc5OTVlNWExNzgxYTBDRDkxOTBCMGFmOTg4OTc0N0I3MTBhOTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NzE0OTc3MDc1MiwibmFtZSI6IkFydENvbGxlY3QifQ.PLt3VASll7EXdxqshzVZDtA3lW7Zr5aDsGpjhBI_Qf8";
// Create a new DAppClient instance
export const TEZOS_COLLECT_WALLET = new BeaconWallet({
  name: "Art Collect",
  preferredNetwork: TEZOS_COLLECT_NETWORK.type,
  colorMode: ColorMode.LIGHT
});

const MARKETPLACE_ADDRESSES = {
  ghostnet: "KT1Kj6PQERCAbFu2Y6N8m1ucDv4bFJJLTWgt",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

const NFT_ADDRESSES = {
  ghostnet: "KT1Qi4n8vTeK6CNQACFABFx5cLNDD1MnCp63",
  kathmandunet: "",
  mainnet: "",
  mondaynet: "",
  dailynet: "",
  delphinet: "",
  edonet: "",
  florencenet: "",
  granadanet: "",
  hangzhounet: "",
  ithacanet: "",
  jakartanet: "",
  custom: "",
};

export const VAULT_ADDRESS = "tz1VL5AfvZ3Cz6Bd2c2agcUQe7HKxje7ojNu";

export const MARKETPLACE_CONTRACT_ADDRESS =
  MARKETPLACE_ADDRESSES["ghostnet"];

export const NFT_CONTRACT_ADDRESS = NFT_ADDRESSES["ghostnet"];

// export const API_ENDPOINT =
//   process.env.NODE_ENV === "development"
//     ? "http://192.168.113.103:80"
//     : "https://api.genesy.xyz";

export const API_ENDPOINT = "https://api.genesy.xyz";
