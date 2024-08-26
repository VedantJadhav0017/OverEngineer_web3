// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Whitelist {
    uint8 public WhitelistedAddressesCount;
    uint8 public MaxWhitelistedAddresses;

    mapping(address => bool) public WhitelistedAddresses;

    constructor(uint8 _maxWhitelistedAddresses) {
        MaxWhitelistedAddresses = _maxWhitelistedAddresses;
    }

    function addAddressToWhitelist(address _newAddress) public {
        require(!WhitelistedAddresses[_newAddress], "Address is already whitelisted");
        require(WhitelistedAddressesCount < MaxWhitelistedAddresses, "Max number of whitelisted addresses reached");
        WhitelistedAddresses[_newAddress] = true;
        WhitelistedAddressesCount++;
    }

    function isAddressWhitelisted(address _address) public view returns (bool) {
        return WhitelistedAddresses[_address];
    }

    function removeAddressFromWhitelist(address _address) public {
        require(WhitelistedAddresses[_address], "Address is not whitelisted");
        WhitelistedAddresses[_address] = false;
        WhitelistedAddressesCount--;
    }
}
