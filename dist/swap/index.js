"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumpSwapSDK = exports.DEFAULT_SLIPPAGE_BASIS = exports.DEFAULT_DECIMALS = void 0;
const web3_js_1 = require("@solana/web3.js");
const anchor_1 = require("@coral-xyz/anchor");
const spl_token_1 = require("@solana/spl-token");
const index_1 = require("../IDL/index");
const poolInfo_1 = require("./poolInfo");
// Define static public keys
const PUMP_AMM_PROGRAM_ID = new web3_js_1.PublicKey("pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA");
const ASSOCIATED_TOKEN_PROGRAM_ID = new web3_js_1.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const TOKEN_PROGRAM_ID = new web3_js_1.PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
const WSOL_TOKEN_ACCOUNT = new web3_js_1.PublicKey("So11111111111111111111111111111111111111112");
const global = new web3_js_1.PublicKey("ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw");
const eventAuthority = new web3_js_1.PublicKey("GS4CU59F31iL7aR2Q8zVS8DRrcRnXX1yjQ66TqNVQnaR");
const feeRecipient = new web3_js_1.PublicKey("62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV");
const feeRecipientAta = new web3_js_1.PublicKey("94qWNrtmfn42h3ZjUZwWvK1MEo9uVmmrBPd2hpNjYDjb");
const BUY_DISCRIMINATOR = new Uint8Array([
    102, 6, 61, 18, 1, 218, 235, 234,
]);
const SELL_DISCRIMINATOR = new Uint8Array([
    51, 230, 133, 164, 1, 127, 131, 173,
]);
exports.DEFAULT_DECIMALS = 6;
exports.DEFAULT_SLIPPAGE_BASIS = 0.05; // 默认的 slippage 为5%，可以自定义传入
class PumpSwapSDK {
    constructor(connection, user) {
        this.connection = connection;
        const provider = {
            connection: connection,
            publicKey: user
        };
        this.program = new anchor_1.Program(index_1.IDL, provider);
    }
    async buy(mint, user, solToBuy, slippage, poolAddress) {
        const slipp = slippage ?? exports.DEFAULT_SLIPPAGE_BASIS; // Default: 5%
        const bought_token_amount = await (0, poolInfo_1.getBuyTokenAmount)(this.connection, BigInt(solToBuy * web3_js_1.LAMPORTS_PER_SOL), mint, poolAddress);
        let pool;
        if (poolAddress) {
            pool = poolAddress;
        }
        else {
            pool = await (0, poolInfo_1.getPumpSwapPool)(this.connection, mint);
        }
        const solAmount = solToBuy * (1 + slipp);
        const instructions = [];
        const newKeyPair = web3_js_1.Keypair.generate();
        const signers = [newKeyPair];
        // 1. Create temporary WSOL account
        const rentExempt = await this.connection.getMinimumBalanceForRentExemption(165);
        const createTempAccountIx = web3_js_1.SystemProgram.createAccount({
            fromPubkey: user,
            newAccountPubkey: newKeyPair.publicKey,
            lamports: rentExempt + Math.floor(solAmount * web3_js_1.LAMPORTS_PER_SOL),
            space: 165,
            programId: TOKEN_PROGRAM_ID,
        });
        instructions.push(createTempAccountIx);
        // 2. Initialize the account as a WSOL token account
        const initAccountIx = (0, spl_token_1.createInitializeAccountInstruction)(newKeyPair.publicKey, WSOL_TOKEN_ACCOUNT, user);
        instructions.push(initAccountIx);
        // 3. Check if the destination token account exists and create if needed
        const tokenAta = (0, spl_token_1.getAssociatedTokenAddressSync)(mint, user);
        const tokenAccountInfo = await this.connection.getAccountInfo(tokenAta);
        if (!tokenAccountInfo) {
            const createTokenAtaIx = (0, spl_token_1.createAssociatedTokenAccountIdempotentInstruction)(user, tokenAta, user, mint);
            instructions.push(createTokenAtaIx);
        }
        // 4. Create the buy instruction using our temp WSOL account
        const pumpswap_buy_tx = await this.createBuyInstruction(pool, user, mint, bought_token_amount, BigInt(Math.floor(solAmount * web3_js_1.LAMPORTS_PER_SOL)), newKeyPair.publicKey // Use our temp account here instead of ATA
        );
        instructions.push(pumpswap_buy_tx);
        // 5. Close the temporary account to recover SOL
        const closeAccountIx = (0, spl_token_1.createCloseAccountInstruction)(newKeyPair.publicKey, user, user);
        instructions.push(closeAccountIx);
        return { instructions, signers };
    }
    async sell_exactAmount(mint, user, tokenAmount, slippage, poolAddress) {
        const slipp = slippage ?? exports.DEFAULT_SLIPPAGE_BASIS; // Default: 5%
        const sell_token_amount = tokenAmount;
        const price = await (0, poolInfo_1.getPrice)(this.connection, mint, poolAddress);
        const minOut = price * sell_token_amount * (1 - slipp);
        const instructions = [];
        const newKeyPair = web3_js_1.Keypair.generate();
        const signers = [newKeyPair];
        // 1. Create temporary WSOL account with just enough SOL for rent
        const rentExempt = await this.connection.getMinimumBalanceForRentExemption(165);
        const createTempAccountIx = web3_js_1.SystemProgram.createAccount({
            fromPubkey: user,
            newAccountPubkey: newKeyPair.publicKey,
            lamports: rentExempt,
            space: 165,
            programId: TOKEN_PROGRAM_ID,
        });
        instructions.push(createTempAccountIx);
        // 2. Initialize the account as a WSOL token account
        const initAccountIx = (0, spl_token_1.createInitializeAccountInstruction)(newKeyPair.publicKey, WSOL_TOKEN_ACCOUNT, user);
        instructions.push(initAccountIx);
        let pool;
        if (poolAddress) {
            pool = poolAddress;
        }
        else {
            pool = await (0, poolInfo_1.getPumpSwapPool)(this.connection, mint);
        }
        // 3. Create the sell instruction using our temp WSOL account
        const pumpswap_sell_tx = await this.createSellInstruction(pool, user, mint, BigInt(Math.floor(sell_token_amount * 10 ** 6)), BigInt(Math.floor(minOut * web3_js_1.LAMPORTS_PER_SOL)), newKeyPair.publicKey // Use our temp account here instead of ATA
        );
        instructions.push(pumpswap_sell_tx);
        // 4. Close the temporary account to recover SOL
        const closeAccountIx = (0, spl_token_1.createCloseAccountInstruction)(newKeyPair.publicKey, user, user);
        instructions.push(closeAccountIx);
        return { instructions, signers };
    }
    async createBuyInstruction(poolId, user, mint, baseAmountOut, maxQuoteAmountIn, userQuoteTokenAccount // Optional custom wsol account
    ) {
        // Compute associated token account addresses
        const userBaseTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(mint, user);
        // If no custom account is provided, use the default ATA
        const userQuoteAccount = userQuoteTokenAccount ||
            await (0, spl_token_1.getAssociatedTokenAddress)(WSOL_TOKEN_ACCOUNT, user);
        const poolBaseTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(mint, poolId, true);
        const poolQuoteTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(WSOL_TOKEN_ACCOUNT, poolId, true);
        // Define the accounts for the instruction
        const accounts = [
            { pubkey: poolId, isSigner: false, isWritable: false }, // pool_id (readonly)
            { pubkey: user, isSigner: true, isWritable: true }, // user (signer)
            { pubkey: global, isSigner: false, isWritable: false }, // global (readonly)
            { pubkey: mint, isSigner: false, isWritable: false }, // mint (readonly)
            { pubkey: WSOL_TOKEN_ACCOUNT, isSigner: false, isWritable: false }, // WSOL_TOKEN_ACCOUNT (readonly)
            { pubkey: userBaseTokenAccount, isSigner: false, isWritable: true }, // user_base_token_account
            { pubkey: userQuoteAccount, isSigner: false, isWritable: true }, // user_quote_token_account (WSOL)
            { pubkey: poolBaseTokenAccount, isSigner: false, isWritable: true }, // pool_base_token_account
            { pubkey: poolQuoteTokenAccount, isSigner: false, isWritable: true }, // pool_quote_token_account
            { pubkey: feeRecipient, isSigner: false, isWritable: false }, // fee_recipient (readonly)
            { pubkey: feeRecipientAta, isSigner: false, isWritable: true }, // fee_recipient_ata
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // TOKEN_PROGRAM_ID (readonly)
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // TOKEN_PROGRAM_ID (readonly, duplicated as in Rust)
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }, // System Program (readonly)
            { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // ASSOCIATED_TOKEN_PROGRAM_ID (readonly)
            { pubkey: eventAuthority, isSigner: false, isWritable: false }, // event_authority (readonly)
            { pubkey: PUMP_AMM_PROGRAM_ID, isSigner: false, isWritable: false }, // PUMP_AMM_PROGRAM_ID (readonly)
        ];
        // Pack the instruction data: discriminator (8 bytes) + base_amount_in (8 bytes) + min_quote_amount_out (8 bytes)
        const data = Buffer.alloc(8 + 8 + 8); // 24 bytes total
        data.set(BUY_DISCRIMINATOR, 0);
        data.writeBigUInt64LE(BigInt(baseAmountOut), 8); // Write base_amount_out as little-endian u64
        data.writeBigUInt64LE(BigInt(maxQuoteAmountIn), 16); // Write max_quote_amount_in as little-endian u64
        // Create the transaction instruction
        return new web3_js_1.TransactionInstruction({
            keys: accounts,
            programId: PUMP_AMM_PROGRAM_ID,
            data: data,
        });
    }
    async createSellInstruction(poolId, user, mint, baseAmountIn, // Use bigint for u64
    minQuoteAmountOut, // Use bigint for u64
    userQuoteTokenAccount // Optional custom wsol account
    ) {
        // Compute associated token account addresses
        const userBaseTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(mint, user);
        // If no custom account is provided, use the default ATA
        const userQuoteAccount = userQuoteTokenAccount ||
            await (0, spl_token_1.getAssociatedTokenAddress)(WSOL_TOKEN_ACCOUNT, user);
        const poolBaseTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(mint, poolId, true);
        const poolQuoteTokenAccount = await (0, spl_token_1.getAssociatedTokenAddress)(WSOL_TOKEN_ACCOUNT, poolId, true);
        // Define the accounts for the instruction
        const accounts = [
            { pubkey: poolId, isSigner: false, isWritable: false }, // pool_id (readonly)
            { pubkey: user, isSigner: true, isWritable: true }, // user (signer)
            { pubkey: global, isSigner: false, isWritable: false }, // global (readonly)
            { pubkey: mint, isSigner: false, isWritable: false }, // mint (readonly)
            { pubkey: WSOL_TOKEN_ACCOUNT, isSigner: false, isWritable: false }, // WSOL_TOKEN_ACCOUNT (readonly)
            { pubkey: userBaseTokenAccount, isSigner: false, isWritable: true }, // user_base_token_account
            { pubkey: userQuoteAccount, isSigner: false, isWritable: true }, // user_quote_token_account (WSOL)
            { pubkey: poolBaseTokenAccount, isSigner: false, isWritable: true }, // pool_base_token_account
            { pubkey: poolQuoteTokenAccount, isSigner: false, isWritable: true }, // pool_quote_token_account
            { pubkey: feeRecipient, isSigner: false, isWritable: false }, // fee_recipient (readonly)
            { pubkey: feeRecipientAta, isSigner: false, isWritable: true }, // fee_recipient_ata
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // TOKEN_PROGRAM_ID (readonly)
            { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // TOKEN_PROGRAM_
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }, // System Program (readonly)
            { pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // ASSOCIATED_TOKEN_PROGRAM_ID (readonly)
            { pubkey: eventAuthority, isSigner: false, isWritable: false }, // event_authority (readonly)
            { pubkey: PUMP_AMM_PROGRAM_ID, isSigner: false, isWritable: false }, // PUMP_AMM_PROGRAM_ID (readonly)
        ];
        // Pack the instruction data: discriminator (8 bytes) + base_amount_in (8 bytes) + min_quote_amount_out (8 bytes)
        const data = Buffer.alloc(8 + 8 + 8); // 24 bytes total
        data.set(SELL_DISCRIMINATOR, 0);
        data.writeBigUInt64LE(BigInt(baseAmountIn), 8); // Write base_amount_in as little-endian u64
        data.writeBigUInt64LE(BigInt(minQuoteAmountOut), 16); // Write min_quote_amount_out as little-endian u64
        // Create the transaction instruction
        return new web3_js_1.TransactionInstruction({
            keys: accounts,
            programId: PUMP_AMM_PROGRAM_ID,
            data: data,
        });
    }
    async getTokenPrice(mint, poolAddress) {
        const price = await (0, poolInfo_1.getPrice)(this.connection, mint, poolAddress);
        return price;
    }
}
exports.PumpSwapSDK = PumpSwapSDK;
exports.default = PumpSwapSDK;
