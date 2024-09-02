"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bip39_1 = __importDefault(require("bip39"));
const hdkey_1 = __importDefault(require("hdkey"));
const tronweb_1 = __importDefault(require("tronweb"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const tronWeb = new tronweb_1.default({
    fullHost: "https://api.shasta.trongrid.io",
});
const USDT_CONTRACT_ADDRESS = "TXLAQ63Xg1NAzckPwKHvzw7CSEmLMEqcdj";
const generateWalletFromMnemonic = (mnemonic, index = 0) => {
    // Derive seed from mnemonic
    const seed = bip39_1.default.mnemonicToSeedSync(mnemonic);
    // Derive the HD node
    const hdNode = hdkey_1.default.fromMasterSeed(seed);
    // Derive the child node for the given index
    const childNode = hdNode.derive(`m/44'/195'/0'/0/${index}`); // 195 is the coin type for TRON
    // Derive private key
    const privateKey = childNode.privateKey.toString("hex");
    // Generate the address from the private key
    const address = tronWeb.address.fromPrivateKey(privateKey);
    return { address, privateKey };
};
app.get("/create-wallet-from-mnemonic", async (req, res) => {
    const mnemonic = bip39_1.default.generateMnemonic(); // Generate a new mnemonic
    const wallet = generateWalletFromMnemonic(mnemonic);
    console.table(wallet);
    res.json({
        mnemonic,
        address: wallet.address,
        privateKey: wallet.privateKey,
    });
});
app.get("/create-wallet", async (req, res) => {
    try {
        // Generate a new wallet
        const account = await tronweb_1.default.createAccount();
        console.log(account);
        // Respond with the wallet details
        res.json({
            address: account.address.base58,
            privateKey: account.privateKey,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=test.js.map