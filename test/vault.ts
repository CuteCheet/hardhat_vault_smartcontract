import { ethers } from "hardhat";
import { expect } from "chai";
import { BigNumber, Contract, ContractFactory } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { resetNode, mine } from "../scripts/utils";


describe("Vault Contract Tests", function () {
    let Weth: ContractFactory;
    let Token: ContractFactory;
    let Vault: ContractFactory;
    let vault: Contract;
    let weth: Contract;
    let token: Contract;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    afterEach(async function () {
      await resetNode();
    });
    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy WETH mock
        Weth = await ethers.getContractFactory("WETH");
        weth = await Weth.deploy();
        await weth.deployed();
        await mine(1);

        // Deploy token mock
        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy("Test Token", "TT", ethers.utils.parseEther("10000"));
        await token.deployed();
        await mine(1);

        // Deploy the Vault contract
         Vault = await ethers.getContractFactory("Vault");
         vault = await Vault.deploy(weth.address);
         await vault.deployed();
         await mine(1);
    });

    describe("ETH Operations", function () {
        it("should deposit and withdraw ETH correctly", async function () {
            const depositAmount = ethers.utils.parseEther("1");

            // Deposit ETH
            await owner.sendTransaction({ to: vault.address, value: depositAmount });
            expect(await vault.balances(owner.address)).to.equal(depositAmount);

            // Withdraw ETH
            await vault.connect(owner).withdrawETH(depositAmount);
            expect(await vault.balances(owner.address)).to.equal(0);
        });
    });

    describe("Token Operations", function () {
        it("should deposit and withdraw tokens correctly", async function () {
            const depositAmount = ethers.utils.parseEther("100");

            // Approve and deposit tokens
            await token.approve(vault.address, depositAmount);
            await vault.depositToken(token.address, depositAmount);
            expect(await vault.tokenBalances(owner.address, token.address)).to.equal(depositAmount);

            // Withdraw tokens
            await vault.withdrawToken(token.address, depositAmount);
            expect(await vault.tokenBalances(owner.address, token.address)).to.equal(0);
        });
    });
});