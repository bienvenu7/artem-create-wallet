import express from "express";
import helmet from "helmet";
import { TronWeb } from "tronweb";
import bip39 from "bip39";
import hdkey from "hdkey";

import dotenv from "dotenv";
import moment from "moment";
import CreateWalletRouter from "./router/walletRouter";
import TransactionRouter from "./router/transactionRouter";

dotenv.config();

const app = express();
const port = process.env.PORT || 3005;

app.use(helmet());
app.disable("x-powered-by");

// Initialize TronWeb instance with default values
const tronWeb = new TronWeb({
  fullHost: "https://api.trongrid.io",
});

app.use("/wallet", CreateWalletRouter);
app.use("/transaction", TransactionRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
