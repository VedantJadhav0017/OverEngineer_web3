const { ethers } = require("hardhat");

async function main() {
  // Get the contract factories
  const Whitelist = await ethers.getContractFactory("Whitelist");
  const CryptoDevs = await ethers.getContractFactory("CryptoDevs");

  // Deploy the Whitelist contract with the maximum number of whitelisted addresses
  const maxWhitelistedAddresses = 2; // Set the desired maximum number of whitelisted addresses
  const whitelist = await Whitelist.deploy(maxWhitelistedAddresses);
  await whitelist.deployed();
  console.log("Whitelist deployed to:", whitelist.address);

  // Deploy the CryptoDevs contract, passing the Whitelist contract address
  const cryptoDevs = await CryptoDevs.deploy(whitelist.address);
  await cryptoDevs.deployed();
  console.log("CryptoDevs deployed to:", cryptoDevs.address);
}

// Run the main function and handle errors
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });