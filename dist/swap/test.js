"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = main;
const web3_js_1 = require("@solana/web3.js");
const poolInfo_1 = require("./poolInfo");
async function main() {
    const connection = new web3_js_1.Connection("xxxx", 'confirmed');
    const mint = new web3_js_1.PublicKey("PctT849PR4DQFdQYzSSPPP7riwFffxcmHmMCCP9pump");
    const poolAddress = new web3_js_1.PublicKey("7K1aRALEp979Cwc9z4Bso4bs6BfPidkt3FA7khKQYArY");
    const account = await connection.getAccountInfo(poolAddress);
    console.log(account);
    if (account && account.data) {
        console.log(Buffer.from(account.data).toString('hex'));
    }
    const bought_token_amount = await (0, poolInfo_1.getBuyTokenAmount)(connection, BigInt(0.01 * web3_js_1.LAMPORTS_PER_SOL), mint, poolAddress);
    console.log(bought_token_amount);
}
main();
