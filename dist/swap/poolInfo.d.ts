import { Connection, PublicKey } from "@solana/web3.js";
export declare const calculateWithSlippageBuy: (amount: bigint, basisPoints: bigint) => bigint;
export declare const getBuyTokenAmount: (connection: Connection, solAmount: bigint, mint: PublicKey, poolAddress?: PublicKey) => Promise<bigint>;
export declare const getPumpSwapPool: (connection: Connection, mint: PublicKey) => Promise<PublicKey>;
export declare const getPrice: (connection: Connection, mint: PublicKey, poolAddress?: PublicKey) => Promise<number>;
