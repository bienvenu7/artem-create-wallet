import expess, { Router } from "express";
import dotenv from "dotenv";
import { TronWeb } from "tronweb";

dotenv.config();

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  privateKey: process.env.WALLET_PRIVATE_KEY as string,
});

const TetherToken = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const router = Router();

// Endpoint to create a new wallet from a mnemonic
router.get("/create-wallet", async (req, res) => {
  if (req.method !== "GET") {
    res
      .status(404)
      .json({ message: "The endpoint you're trying to access is not found!" });
  }

  try {
    const wallet = tronWeb.createRandom();

    const transaction = await tronWeb.transactionBuilder.createAccount(
      wallet.address
    );

    const signedTransaction = await tronWeb.trx.sign(transaction);

    await tronWeb.trx.sendRawTransaction(signedTransaction);

    res.status(200).json(wallet);
  } catch (error) {
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
    const balance = await tronWeb.trx.getBalance(
      "TGvn5BahJ2TiamAmGKZbXK4afkrwgixi4a"
    );
    res.status(200).json({ balance });
  } catch (error) {
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
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

export default router;
