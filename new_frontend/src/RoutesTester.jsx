import React, { useState } from 'react';
import axios from 'axios';

const RoutesTester = () => {
  const [address, setAddress] = useState('');
  const [response, setResponse] = useState('');

  const handleAddAddressToWhitelist = async () => {
    try {
      const res = await axios.post('http://localhost:3001/addAddressToWhitelist', { address });
      setResponse(res.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleIsAddressWhitelisted = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/isAddressWhitelisted/${address}`);
      setResponse(res.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleGetTotalWhitelisted = async () => {
    try {
      const res = await axios.get('http://localhost:3001/getTotalWhitelisted');
      setResponse(res.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  const handleMint = async () => {
    try {
      const res = await axios.post('http://localhost:3001/mint');
      setResponse(res.data);
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div>
      <h1>Routes Tester</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleAddAddressToWhitelist}>Add Address to Whitelist</button>
      <button onClick={handleIsAddressWhitelisted}>Is Address Whitelisted</button>
      <button onClick={handleGetTotalWhitelisted}>Get Total Whitelisted</button>
      <button onClick={handleMint}>Mint NFT</button>
      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default RoutesTester;