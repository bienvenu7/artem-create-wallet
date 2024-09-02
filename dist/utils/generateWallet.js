"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateWalletFromSeedPhrase = void 0;
const tronweb_1 = require("tronweb");
const bip39_1 = require("bip39");
const hdkey_1 = __importDefault(require("hdkey"));
// Initialize TronWeb instance with default values
const tronWeb = new tronweb_1.TronWeb({
    fullHost: "https://api.trongrid.io",
});
const generateWalletFromSeedPhrase = (mnemonic, index = 0) => {
    // Derive seed from mnemonic
    const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic);
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
exports.generateWalletFromSeedPhrase = generateWalletFromSeedPhrase;
//# sourceMappingURL=generateWallet.js.map