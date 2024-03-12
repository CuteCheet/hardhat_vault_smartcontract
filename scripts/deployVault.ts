import { ethers } from "hardhat"
import * as dotenv from 'dotenv'
dotenv.config()

async function main() {
  
  const Vault = await ethers.getContractFactory(
    "Vault"
  );

  const wethAddress = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  const vault = await Vault.deploy(wethAddress)
  await vault.deployed();

  console.log(
    `CHARACTER_SHOP was deployed to: ${vault.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
