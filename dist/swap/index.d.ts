import { Connection, PublicKey, TransactionInstruction } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { PumpSwap } from "../IDL/index";
export declare const DEFAULT_DECIMALS = 6;
export declare const DEFAULT_SLIPPAGE_BASIS = 0.05;
export declare class PumpSwapSDK {
    program: Program<PumpSwap>;
    connection: Connection;
    constructor(connection: Connection, user?: PublicKey);
    buy(mint: PublicKey, user: PublicKey, solToBuy: number, slippage?: number): Promise<(PublicKey | TransactionInstruction)[]>;
    sell_exactAmount(mint: PublicKey, user: PublicKey, tokenAmount: number, slippage?: number): Promise<(PublicKey | TransactionInstruction)[]>;
    createBuyInstruction(poolId: PublicKey, user: PublicKey, mint: PublicKey, baseAmountOut: bigint, // Use bigint for u64
    maxQuoteAmountIn: bigint): Promise<TransactionInstruction>;
    createSellInstruction(poolId: PublicKey, user: PublicKey, mint: PublicKey, baseAmountIn: bigint, // Use bigint for u64
    minQuoteAmountOut: bigint): Promise<TransactionInstruction>;
    createWsolAccount(user: PublicKey, amount: Number): Promise<TransactionInstruction[]>;
}
export default PumpSwapSDK;
