import { Connection, PublicKey, TransactionInstruction, Keypair } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import { PumpSwap } from "../IDL/index";
export declare const DEFAULT_DECIMALS = 6;
export declare const DEFAULT_SLIPPAGE_BASIS = 0.05;
export declare class PumpSwapSDK {
    program: Program<PumpSwap>;
    connection: Connection;
    constructor(connection: Connection, user?: PublicKey);
    buy(mint: PublicKey, user: PublicKey, solToBuy: number, slippage?: number, poolAddress?: PublicKey): Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
    }>;
    sell_exactAmount(mint: PublicKey, user: PublicKey, tokenAmount: number, slippage?: number, poolAddress?: PublicKey): Promise<{
        instructions: TransactionInstruction[];
        signers: Keypair[];
    }>;
    createBuyInstruction(poolId: PublicKey, user: PublicKey, mint: PublicKey, baseAmountOut: bigint, maxQuoteAmountIn: bigint, userQuoteTokenAccount?: PublicKey): Promise<TransactionInstruction>;
    createSellInstruction(poolId: PublicKey, user: PublicKey, mint: PublicKey, baseAmountIn: bigint, // Use bigint for u64
    minQuoteAmountOut: bigint, // Use bigint for u64
    userQuoteTokenAccount?: PublicKey): Promise<TransactionInstruction>;
    getTokenPrice(mint: PublicKey, poolAddress?: PublicKey): Promise<number>;
}
export default PumpSwapSDK;
