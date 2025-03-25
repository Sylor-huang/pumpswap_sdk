import {
  Connection,
  PublicKey,
  TransactionInstruction,
  SystemProgram,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import {Program, Provider} from "@coral-xyz/anchor";
import {
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountIdempotentInstruction,
} from "@solana/spl-token";
import {PumpSwap, IDL} from "../IDL/index";
import {
  getBuyTokenAmount,
  getPumpSwapPool,
  getPrice
} from "./poolInfo";

// Define static public keys
const PUMP_AMM_PROGRAM_ID: PublicKey = new PublicKey(
  "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA"
);
const ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
);
const TOKEN_PROGRAM_ID: PublicKey = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
);
const WSOL_TOKEN_ACCOUNT: PublicKey = new PublicKey(
  "So11111111111111111111111111111111111111112"
);
const global = new PublicKey("ADyA8hdefvWN2dbGGWFotbzWxrAvLW83WG6QCVXvJKqw");
const eventAuthority = new PublicKey(
  "GS4CU59F31iL7aR2Q8zVS8DRrcRnXX1yjQ66TqNVQnaR"
);
const feeRecipient = new PublicKey(
  "62qc2CNXwrYqQScmEdiZFFAnJR262PxWEuNQtxfafNgV"
);
const feeRecipientAta = new PublicKey(
  "94qWNrtmfn42h3ZjUZwWvK1MEo9uVmmrBPd2hpNjYDjb"
);
const BUY_DISCRIMINATOR: Uint8Array = new Uint8Array([
  102, 6, 61, 18, 1, 218, 235, 234,
]);
const SELL_DISCRIMINATOR: Uint8Array = new Uint8Array([
  51, 230, 133, 164, 1, 127, 131, 173,
]);

export const DEFAULT_DECIMALS = 6;
export const DEFAULT_SLIPPAGE_BASIS = 0.05 // 默认的 slippage 为5%，可以自定义传入

export class PumpSwapSDK {
  public program: Program<PumpSwap>;
  public connection: Connection;
  constructor(connection: Connection, user?: PublicKey) {
    this.connection = connection;
    const provider: Provider = {
      connection: connection as any as Provider["connection"],
      publicKey: user
  }
    this.program = new Program<PumpSwap>(IDL as PumpSwap, provider);
  }
  public async buy(mint: PublicKey, user: PublicKey, solToBuy: number, slippage?: number) {
    const slipp = slippage ?? DEFAULT_SLIPPAGE_BASIS; // Default: 5%
    const bought_token_amount = await getBuyTokenAmount(
      this.connection,
      BigInt(solToBuy * LAMPORTS_PER_SOL),
      mint
    );
    const pool = await getPumpSwapPool(this.connection, mint);
    const pumpswap_buy_tx = await this.createBuyInstruction(
      pool,
      user,
      mint,
      bought_token_amount,
      BigInt(Math.floor(solToBuy * (1 + slipp) * LAMPORTS_PER_SOL))
    );
    const ata = getAssociatedTokenAddressSync(mint, user,false);
    if(!ata) {
      const createAta = createAssociatedTokenAccountIdempotentInstruction(
        user,
        ata,
        user,
        mint
      )
      return [createAta, pumpswap_buy_tx]
    }else{
      return [ata, pumpswap_buy_tx]
    }
  }

  public async sell_exactAmount(
    mint: PublicKey,
    user: PublicKey,
    tokenAmount: number,
    slippage?: number
  ) {
    const slipp = slippage ?? DEFAULT_SLIPPAGE_BASIS; // Default: 5%
    const sell_token_amount = tokenAmount;
    const pool = await getPumpSwapPool(this.connection, mint);
    const price = await getPrice(this.connection, mint)
    const minOut = price * sell_token_amount * (1 - slipp)

    const pumpswap_buy_tx = await this.createSellInstruction(
      await getPumpSwapPool(this.connection, mint),
      user,
      mint,
      BigInt(Math.floor(sell_token_amount * 10 ** 6)),
      BigInt(Math.floor(minOut * LAMPORTS_PER_SOL))
    );
    const ata = getAssociatedTokenAddressSync(mint, user);
    return [ata, pumpswap_buy_tx]
  }

  async createBuyInstruction(
    poolId: PublicKey,
    user: PublicKey,
    mint: PublicKey,
    baseAmountOut: bigint, // Use bigint for u64
    maxQuoteAmountIn: bigint // Use bigint for u64
  ): Promise<TransactionInstruction> {
    // Compute associated token account addresses
    const userBaseTokenAccount = await getAssociatedTokenAddress(mint, user);
    const userQuoteTokenAccount = await getAssociatedTokenAddress(
      WSOL_TOKEN_ACCOUNT,
      user
    );
    const poolBaseTokenAccount = await getAssociatedTokenAddress(
      mint,
      poolId,
      true
    );

    const poolQuoteTokenAccount = await getAssociatedTokenAddress(
      WSOL_TOKEN_ACCOUNT,
      poolId,
      true
    );

    // Define the accounts for the instruction
    const accounts = [
      {pubkey: poolId, isSigner: false, isWritable: false}, // pool_id (readonly)
      {pubkey: user, isSigner: true, isWritable: true}, // user (signer)
      {pubkey: global, isSigner: false, isWritable: false}, // global (readonly)
      {pubkey: mint, isSigner: false, isWritable: false}, // mint (readonly)
      {pubkey: WSOL_TOKEN_ACCOUNT, isSigner: false, isWritable: false}, // WSOL_TOKEN_ACCOUNT (readonly)
      {pubkey: userBaseTokenAccount, isSigner: false, isWritable: true}, // user_base_token_account
      {pubkey: userQuoteTokenAccount, isSigner: false, isWritable: true}, // user_quote_token_account
      {pubkey: poolBaseTokenAccount, isSigner: false, isWritable: true}, // pool_base_token_account
      {pubkey: poolQuoteTokenAccount, isSigner: false, isWritable: true}, // pool_quote_token_account
      {pubkey: feeRecipient, isSigner: false, isWritable: false}, // fee_recipient (readonly)
      {pubkey: feeRecipientAta, isSigner: false, isWritable: true}, // fee_recipient_ata
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // TOKEN_PROGRAM_ID (readonly)
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // TOKEN_PROGRAM_ID (readonly, duplicated as in Rust)
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}, // System Program (readonly)
      {pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // ASSOCIATED_TOKEN_PROGRAM_ID (readonly)
      {pubkey: eventAuthority, isSigner: false, isWritable: false}, // event_authority (readonly)
      {pubkey: PUMP_AMM_PROGRAM_ID, isSigner: false, isWritable: false}, // PUMP_AMM_PROGRAM_ID (readonly)
    ];

    // Pack the instruction data: discriminator (8 bytes) + base_amount_in (8 bytes) + min_quote_amount_out (8 bytes)
    const data = Buffer.alloc(8 + 8 + 8); // 24 bytes total
    data.set(BUY_DISCRIMINATOR, 0);
    data.writeBigUInt64LE(BigInt(baseAmountOut), 8); // Write base_amount_out as little-endian u64
    data.writeBigUInt64LE(BigInt(maxQuoteAmountIn), 16); // Write max_quote_amount_in as little-endian u64

    // Create the transaction instruction
    return new TransactionInstruction({
      keys: accounts,
      programId: PUMP_AMM_PROGRAM_ID,
      data: data,
    });
  }

  async createSellInstruction(
    poolId: PublicKey,
    user: PublicKey,
    mint: PublicKey,
    baseAmountIn: bigint, // Use bigint for u64
    minQuoteAmountOut: bigint // Use bigint for u64
  ): Promise<TransactionInstruction> {
    // Compute associated token account addresses
    const userBaseTokenAccount = await getAssociatedTokenAddress(mint, user);
    const userQuoteTokenAccount = await getAssociatedTokenAddress(
      WSOL_TOKEN_ACCOUNT,
      user
    );
    const poolBaseTokenAccount = await getAssociatedTokenAddress(
      mint,
      poolId,
      true
    );
    const poolQuoteTokenAccount = await getAssociatedTokenAddress(
      WSOL_TOKEN_ACCOUNT,
      poolId,
      true
    );

    // Define the accounts for the instruction
    const accounts = [
      {pubkey: poolId, isSigner: false, isWritable: false}, // pool_id (readonly)
      {pubkey: user, isSigner: true, isWritable: true}, // user (signer)
      {pubkey: global, isSigner: false, isWritable: false}, // global (readonly)
      {pubkey: mint, isSigner: false, isWritable: false}, // mint (readonly)
      {pubkey: WSOL_TOKEN_ACCOUNT, isSigner: false, isWritable: false}, // WSOL_TOKEN_ACCOUNT (readonly)
      {pubkey: userBaseTokenAccount, isSigner: false, isWritable: true}, // user_base_token_account
      {pubkey: userQuoteTokenAccount, isSigner: false, isWritable: true}, // user_quote_token_account
      {pubkey: poolBaseTokenAccount, isSigner: false, isWritable: true}, // pool_base_token_account
      {pubkey: poolQuoteTokenAccount, isSigner: false, isWritable: true}, // pool_quote_token_account
      {pubkey: feeRecipient, isSigner: false, isWritable: false}, // fee_recipient (readonly)
      {pubkey: feeRecipientAta, isSigner: false, isWritable: true}, // fee_recipient_ata
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // TOKEN_PROGRAM_ID (readonly)
      {pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // TOKEN_PROGRAM_ID (readonly, duplicated as in Rust)
      {pubkey: SystemProgram.programId, isSigner: false, isWritable: false}, // System Program (readonly)
      {pubkey: ASSOCIATED_TOKEN_PROGRAM_ID, isSigner: false, isWritable: false}, // ASSOCIATED_TOKEN_PROGRAM_ID (readonly)
      {pubkey: eventAuthority, isSigner: false, isWritable: false}, // event_authority (readonly)
      {pubkey: PUMP_AMM_PROGRAM_ID, isSigner: false, isWritable: false}, // PUMP_AMM_PROGRAM_ID (readonly)
    ];

    // Pack the instruction data: discriminator (8 bytes) + base_amount_in (8 bytes) + min_quote_amount_out (8 bytes)
    const data = Buffer.alloc(8 + 8 + 8); // 24 bytes total
    data.set(SELL_DISCRIMINATOR, 0);
    data.writeBigUInt64LE(BigInt(baseAmountIn), 8); // Write base_amount_in as little-endian u64
    data.writeBigUInt64LE(BigInt(minQuoteAmountOut), 16); // Write min_quote_amount_out as little-endian u64

    // Create the transaction instruction
    return new TransactionInstruction({
      keys: accounts,
      programId: PUMP_AMM_PROGRAM_ID,
      data: data,
    });
  }
}

export default PumpSwapSDK;
