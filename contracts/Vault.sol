// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IWETH.sol";

contract Vault is ReentrancyGuard {
    using SafeERC20 for IERC20;

    // Mapping from user addresses to their ETH balance.
    mapping(address => uint256) public balances;

    // Nested mapping from user addresses to token addresses and their balance.
    mapping(address => mapping(address => uint256)) public tokenBalances;

    // Reference to the WETH contract interface.
    IWETH public immutable weth;

   /**
     * @dev Sets the WETH contract address.
     * @param _weth Address of the WETH contract.
     */
    constructor(address _weth) {
        require(_weth != address(0), "WETH address cannot be 0");
        weth = IWETH(_weth);
    }

    /**
     * @dev Allows users to deposit ETH into the contract.
     */
    function depositETH() external payable {
        balances[msg.sender] += msg.value;
    }

    /**
     * @dev Allows users to withdraw ETH from the contract.
     * @param amount The amount of ETH to withdraw.
     */
    function withdrawETH(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient ETH balance");
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "ETH transfer failed");
    }

    /**
     * @dev Allows users to deposit token to the contract.
     * @param amount The amount of token to deposit.
     */
    function depositToken(IERC20 token, uint256 amount) external {
        token.safeTransferFrom(msg.sender, address(this), amount);
        tokenBalances[msg.sender][address(token)] += amount;
    }

    /**
     * @dev Allows users to withdraw ETH from the contract.
     * @param amount The amount of ETH to withdraw.
     */
    function withdrawToken(IERC20 token, uint256 amount) external nonReentrant {
        require(tokenBalances[msg.sender][address(token)] >= amount, "Insufficient token balance");
        tokenBalances[msg.sender][address(token)] -= amount;
        token.safeTransfer(msg.sender, amount);
    }

    /**
     * @dev Allows users to wrap ETH to the contract.
     * @param amount The amount of ETH to wrap.
     */
    function wrapETH(uint256 amount) external nonReentrant {
        require(balances[msg.sender] >= amount, "Insufficient ETH balance");
        balances[msg.sender] -= amount;
        weth.deposit{value: amount}();
        tokenBalances[msg.sender][address(weth)] += amount;
    }

    /**
     * @dev Allows users to unwrap ETH from the contract.
     * @param amount The amount of ETH to unwrap.
     */
    function unwrapETH(uint256 amount) external nonReentrant {
        require(tokenBalances[msg.sender][address(weth)] >= amount, "Insufficient WETH balance");
        tokenBalances[msg.sender][address(weth)] -= amount;
        weth.withdraw(amount);
        balances[msg.sender] += amount;
    }
}