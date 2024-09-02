import expess, { Router } from "express";
import dotenv from "dotenv";
import { TronWeb } from "tronweb";

dotenv.config();

const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
  privateKey: process.env.WALLET_PRIVATE_KEY as string,
});

const TetherToken = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

const amountToSend: number = 10 * 1e6;

const router = Router();

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
      .send(
        {
          feeLimit: 10000000, // Adjust the feeLimit depending on network conditions
        },
        (process.env.WALLET_PRIVATE_KEY as string).slice(2)
      );
    res.status(200).json(transaction);

    console.log("Transaction Result:", transaction);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
});

export default router;
