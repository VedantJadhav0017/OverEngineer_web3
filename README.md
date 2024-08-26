# WhiteListing Contracts with Peer-to-Peer Video Calling

## Introduction
This project implements WhiteListing contracts to manage access control and permissions within a decentralized application. Additionally, it integrates PeerJS for peer-to-peer video calling, enabling direct communication between users without the need for intermediary servers.

## Technologies Used
- **Solidity**: For writing smart contracts.
- **Ethereum**: Blockchain platform for deploying smart contracts.
- **Web3.js**: JavaScript library for interacting with the Ethereum blockchain.
- **PeerJS**: JavaScript library for peer-to-peer video calling.
- **Node.js**: JavaScript runtime for server-side development.
- **React**: JavaScript library for building user interfaces.

## WhiteListing Contracts
WhiteListing contracts are used to manage access control within the decentralized application. These contracts allow the owner to add or remove addresses from a whitelist, ensuring that only authorized users can access certain features or functionalities of the application. The main functionalities include:
- **Adding to Whitelist**: The contract owner can add addresses to the whitelist.
- **Removing from Whitelist**: The contract owner can remove addresses from the whitelist.
- **Checking Whitelist Status**: Any user can check if an address is whitelisted.

## PeerJS
PeerJS is a JavaScript library that simplifies peer-to-peer communication. It allows for direct video calling between users without the need for intermediary servers. This is achieved by leveraging WebRTC (Web Real-Time Communication) technology. Key features of PeerJS include:
- **Easy Integration**: Simple API for establishing peer-to-peer connections.
- **Serverless Communication**: Direct communication between peers, reducing latency and improving privacy.
- **Scalability**: Suitable for applications requiring real-time communication, such as video calls, file sharing, and gaming.

By combining WhiteListing contracts with PeerJS, this project ensures secure access control while providing a seamless peer-to-peer video calling experience.
