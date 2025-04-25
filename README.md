## 代码参考

https://github.com/outsmartchad/pumpswap-sdk

## 示例代码

```
  import { PumpSwapSDK } from 'sylor-pumpswap';

  const connection = new Connection(rpc_end_point, 'confirmed');
  const tokenMint = new PublicKey(tokenAddr)
  const tokenPair = new PublicKey(pair_address) // 可以通过 dexscreener api获取到
  const wallet = Keypair.fromSecretKey(bs58.decode(privateKey))
  const fun = new PumpSwapSDK(connection, wallet.publicKey);

  const microLamports = priority * LAMPORTS_PER_SOL

  const priorityFeeInstruction = ComputeBudgetProgram.setComputeUnitPrice({
    microLamports: microLamports
  });
  const addComputeUnitsInstruction = ComputeBudgetProgram.setComputeUnitLimit({
    units: 200000  // 设置计算单元上限
  });
  let swapResult;
  const slipp = Number((slippage / 100).toFixed(4))
  if (swapType.toLowerCase() === 'buy') {
    swapResult = await fun.buy(tokenMint, wallet.publicKey, Number(amount),slipp, tokenPair)
  } else {
    swapResult = await fun.sell_exactAmount(tokenMint, wallet.publicKey, Number(tokenAmount),slipp,tokenPair)
  }

  const instructions = [...swapResult.instructions];
  const additionalSigners = [...swapResult.signers];
  const _latestBlockhash = await connection.getLatestBlockhash({ commitment: 'confirmed' })
  const messageV0 = new TransactionMessage({
    payerKey: wallet.publicKey,
    recentBlockhash: _latestBlockhash.blockhash,
    instructions: [
      priorityFeeInstruction,
      addComputeUnitsInstruction,
      ...instructions,
    ],
  }).compileToV0Message();
  const transaction = new VersionedTransaction(messageV0);
  transaction.sign([wallet, ...additionalSigners]);

  const signature = await connection.sendRawTransaction(transaction.serialize(), {
      skipPreflight: false,
      maxRetries: 3,
      preflightCommitment: 'confirmed',
    });

```