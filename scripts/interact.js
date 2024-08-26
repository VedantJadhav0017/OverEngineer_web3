const express = require('express');
const { ethers } = require('ethers');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3001;

const provider = new ethers.providers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/L48GvvFcr3uke99FH2mWBG0tvM2L_Np8");

// Add your private key here
const privateKey = "0x906adfc59cdedcaa060767008764349a03028fc2215ed1e81ebfd939ad683407"; // Replace with your private key
const signer = new ethers.Wallet(privateKey, provider);

const whitelistAddress = "0x17b371393BE819DeC493C7962ba313dAF000Bc95"; // Replace with your deployed address
const cryptoDevsAddress = "0x1C91A72d73c590AA0E355fB8119824718ee784c4"; // Replace with your deployed address

const whitelistAbi = [
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "_maxWhitelistedAddresses",
        "type": "uint8"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_newAddress",
        "type": "address"
      }
    ],
    "name": "addAddressToWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "isAddressWhitelisted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "removeAddressFromWhitelist",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WhitelistedAddressesCount",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MaxWhitelistedAddresses",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "WhitelistedAddresses",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const cryptoDevsAbi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "whitelistContract",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "maxTokenIds",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reservedTokens",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "reservedTokensClaimed",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "WhitelistedAddresses",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const whitelistContract = new ethers.Contract(whitelistAddress, whitelistAbi, signer);
const cryptoDevsContract = new ethers.Contract(cryptoDevsAddress, cryptoDevsAbi, signer);

async function addAddressToWhitelist(address) {
  const tx = await whitelistContract.addAddressToWhitelist(address);
  await tx.wait();
  console.log(`Address ${address} added to whitelist`);
}

async function isAddressWhitelisted(address) {
  const isWhitelisted = await whitelistContract.WhitelistedAddresses(address);
  console.log(`Is address ${address} whitelisted:`, isWhitelisted);
  return isWhitelisted;
}

async function getTotalWhitelisted() {
  const totalWhitelisted = await whitelistContract.MaxWhitelistedAddresses();
  console.log('Total Whitelisted:', totalWhitelisted);
  return totalWhitelisted;
}

async function mint() {
  const tx = await cryptoDevsContract.mint({ value: ethers.utils.parseEther("0.001") });
  await tx.wait();
  console.log("NFT Minted");
}

// async function getBalance(address) {
//   const balance = await cryptoDevsContract.balanceOf(address);
//   console.log(`Balance of ${address} in CryptoDevs`, balance);
//   return balance;
// }

app.use(express.json());

app.post('/addAddressToWhitelist', async (req, res) => {
  const { address } = req.body;
  try {
    await addAddressToWhitelist(address);
    res.send(`Address ${address} added to whitelist`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/isAddressWhitelisted/:address', async (req, res) => {
  const { address } = req.params;
  try {
    const isWhitelisted = await isAddressWhitelisted(address);
    res.send(`Is address ${address} whitelisted: ${isWhitelisted}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/getTotalWhitelisted', async (req, res) => {
  try {
    const totalWhitelisted = await getTotalWhitelisted();
    res.send(`Total Whitelisted: ${totalWhitelisted}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/mint', async (req, res) => {
  try {
    await mint();
    res.send("NFT Minted");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});