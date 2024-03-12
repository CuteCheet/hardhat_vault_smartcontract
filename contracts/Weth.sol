// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WETH is ERC20 {
    constructor() ERC20("Wrapped Ether", "WETH") {}

    // Function to deposit Ether and mint WETH tokens to the sender's address
    function deposit() public payable {
        _mint(msg.sender, msg.value);
    }

    // Function to withdraw Ether by burning WETH tokens
    function withdraw(uint amount) public {
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");
        _burn(msg.sender, amount);
        payable(msg.sender).transfer(amount);
    }

    // Receive function to handle direct ether transfers to the contract
    receive() external payable {
        deposit();
    }
}