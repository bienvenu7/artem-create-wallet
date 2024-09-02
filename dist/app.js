"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const tronweb_1 = require("tronweb");
const dotenv_1 = __importDefault(require("dotenv"));
const walletRouter_1 = __importDefault(require("./router/walletRouter"));
const transactionRouter_1 = __importDefault(require("./router/transactionRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
app.use((0, helmet_1.default)());
app.disable("x-powered-by");
// Initialize TronWeb instance with default values
const tronWeb = new tronweb_1.TronWeb({
    fullHost: "https://api.trongrid.io",
});
app.use("/wallet", walletRouter_1.default);
app.use("/transaction", transactionRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map