import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import {
  getBuyTokenAmount,
  getPumpSwapPool,
  getPrice
} from "./poolInfo";


export async function main() {
  const connection = new Connection("xxx", 'confirmed');
  const mint = new PublicKey("PctT849PR4DQFdQYzSSPPP7riwFffxcmHmMCCP9pump")
  const poolAddress = new PublicKey("7K1aRALEp979Cwc9z4Bso4bs6BfPidkt3FA7khKQYArY")
  const price = await getPrice(connection, mint, poolAddress)
  console.log(price)

  // const account = await connection.getAccountInfo(poolAddress);
  // console.log(account)
  // if(account && account.data) {
  //   console.log(Buffer.from(account.data).toString('hex'));
  // }
  // const bought_token_amount = await getBuyTokenAmount(
  //   connection,
  //   BigInt(0.01 * LAMPORTS_PER_SOL),
  //   mint,
  //   poolAddress
  // );

  // console.log(bought_token_amount)
}

main()