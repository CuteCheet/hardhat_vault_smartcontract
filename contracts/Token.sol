// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    // The constructor will mint the specified amount of tokens to the address that deploys the contract.
    constructor(string memory name, string memory symbol, uint256 initialSupply) ERC20(name, symbol) {
        _mint(msg.sender, initialSupply);
    }

    // Function to mint new tokens, only accessible by the contract owner.
    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}