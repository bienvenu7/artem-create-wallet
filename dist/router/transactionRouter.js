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
const TetherToken = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
const toAddress = "TH6AqBpJ6Efjz2BG3nanKPcHaxZ5tPH22h";
const amountToSend = 10 * 1e6;
const privateSenderKey = "0x54b54ccfe267982247ce97a867797ddb6df98ed2444e661593139d63318423b7";
const router = (0, express_1.Router)();
router.get("/send-usdt", async (req, res) => {
    if (req.method !== "GET") {
        res
            .status(404)
            .json({ message: "The endpoint you're trying to access is not found!" });
    }
    try {
        // Get the contract instance
        const contract = await tronWeb.contract().at(TetherToken);
        // Send the transaction
        const transaction = await contract
            .transfer("THU5vxeePzq9SJ5xnJPABXCMg5nUWcf8sX", amountToSend)
            .send({
            feeLimit: 10000000, // Adjust the feeLimit depending on network conditions
        }, privateSenderKey.slice(2));
        res.status(200).json(transaction);
        console.log("Transaction Result:", transaction);
    }
    catch (error) {
        res.status(500).json(error);
        console.error(error);
    }
});
exports.default = router;
//# sourceMappingURL=transactionRouter.js.map