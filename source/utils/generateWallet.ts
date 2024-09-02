import { TronWeb } from "tronweb";
import { mnemonicToSeedSync } from "bip39";
import hdkey from "hdkey";

// Initialize TronWeb instance with default values
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

export const generateWalletFromSeedPhrase = (mnemonic: string, index = 0) => {
  // Derive seed from mnemonic
  const seed = mnemonicToSeedSync(mnemonic);

  // Derive the HD node
  const hdNode = hdkey.fromMasterSeed(seed);

  // Derive the child node for the given index
  const childNode = hdNode.derive(`m/44'/195'/0'/0/${index}`); // 195 is the coin type for TRON

  // Derive private key
  const privateKey = childNode.privateKey.toString("hex");

  // Generate the address from the private key
  const address = tronWeb.address.fromPrivateKey(privateKey);

  return { address, privateKey };
};
