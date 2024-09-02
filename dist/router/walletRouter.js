"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dotenv_1 = __importDefault(require("dotenv"));
const tronweb_1 = require("tronweb");
dotenv_1.default.config();
const tronWeb = new tronweb_1.TronWeb({
    fullHost: "https://api.trongrid.io",
    privateKey: process.env.WALLET_PRIVATE_KEY,
});
const toAddress = "TH6AqBpJ6Efjz2BG3nanKPcHaxZ5tPH22h";
const amount = 2000000;
const TetherToken = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const router = (0, express_1.Router)();
// Endpoint to create a new wallet from a mnemonic
router.get("/create-wallet", async (req, res) => {
    if (req.method !== "GET") {
        res
            .status(404)
            .json({ message: "The endpoint you're trying to access is not found!" });
    }
    try {
        const wallet = tronWeb.createRandom();
        const transaction = await tronWeb.transactionBuilder.createAccount(wallet.address);
        const signedTransaction = await tronWeb.trx.sign(transaction);
        await tronWeb.trx.sendRawTransaction(signedTransaction);
        res.status(200).json(wallet);
    }
    catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
router.get("/balance-tronc", async (req, res) => {
    if (req.method !== "GET") {
        res
            .status(404)
            .json({ message: "The endpoint you're trying to access is not found!" });
    }
    try {
        const balance = await tronWeb.trx.getBalance("TGvn5BahJ2TiamAmGKZbXK4afkrwgixi4a");
        res.status(200).json({ balance });
    }
    catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
router.get("/balance-usdt", async (req, res) => {
    if (req.method !== "GET") {
        res
            .status(404)
            .json({ message: "The endpoint you're trying to access is not found!" });
    }
    try {
        // Get the contract instance
        const contract = await tronWeb.contract().at(TetherToken);
        // Call the balanceOf method to get the balance
        const balance = await contract
            .balanceOf("THU5vxeePzq9SJ5xnJPABXCMg5nUWcf8sX")
            .call();
        // Convert the balance from SUN to the actual token value (adjust for decimals, typically 6 for USDT)
        const tokenBalance = tronWeb.toDecimal(balance) / 1e6;
        console.log(`TRC20 Token Balance: ${tokenBalance}`);
        res.status(200).json({ tokenBalance });
    }
    catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
exports.default = router;
//# sourceMappingURL=walletRouter.js.map