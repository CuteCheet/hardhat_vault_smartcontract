import { HardhatUserConfig } from "hardhat/config";
import "hardhat-abi-exporter";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";
import * as dotenv from "dotenv";
dotenv.config();

const defaultPrivateKey =
  "51724f75520997358fbe48d5bca8dec3c2a6d8b96d7dcdc72eb7b24d1e2f7b60";
const mnemonic =
  "boost puppy expect economy clock minimum wash couple verb door rude glimpse";
const defaultMnemonicWallet = process.env.MNEMONIC_VAULT ?? mnemonic;

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.24",
        settings: {
          optimizer: {
            enabled: true,
            runs: 10,
          },
        },
      },
    ],
  },
  abiExporter: {
    path: "./abi",
    clear: true,
    only: ["Vault"],
  },
  networks: {
    hardhat: {
      accounts: { mnemonic: defaultMnemonicWallet as string },
      chainId: 5353,
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: { mnemonic: defaultMnemonicWallet as string },
      chainId: 5353,
    },
    ethereumMainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/e06cy0yQjh3dKwGNQtsQENnHV-ES4V81",
      accounts: [defaultPrivateKey],
      chainId: 1,
      gas: "auto",
      gasPrice: 10000000000, // 10 [GWei]
      // gasPrice: 'auto', // 30 [GWei]
    },
    polygonMainnet: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/6oDBBhya4PDb26DMALdeaF_DFv2uAYIi",
      accounts: [defaultPrivateKey],
      chainId: 137,
      gas: "auto",
      // gasPrice: 30000000000, // 30 [GWei]
      gasPrice: "auto", // 30 [GWei]
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/u8-aGJrT_r0NONYEoszURcxQIIy4gkCy",
      accounts: [defaultPrivateKey],
      chainId: 5,
      gas: "auto",
      // gasPrice: 30000000000, // 30 [GWei]
      gasPrice: "auto", // 30 [GWei]
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/Qv_AnKywNz5FdfAr36RkHRKZjmX8jnRe",
      accounts: [defaultPrivateKey],
      chainId: 11155111,
      gas: "auto",
      // gasPrice: 30000000000, // 30 [GWei]
      gasPrice: "auto", // 30 [GWei]
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/Eegn51eepUf6nrAYxohjw00Iw92r79-2",
      accounts: [defaultPrivateKey],
      chainId: 80001,
      gas: "auto",
      // gasPrice: 30000000000, // 30 [GWei]
      gasPrice: "auto", // 30 [GWei]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
