"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrice = exports.getPumpSwapPool = exports.getBuyTokenAmount = exports.calculateWithSlippageBuy = void 0;
const anchor_1 = require("@coral-xyz/anchor");
const web3_js_1 = require("@solana/web3.js");
const IDL_1 = require("../IDL");
const PUMP_AMM_PROGRAM_ID = new web3_js_1.PublicKey('pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA');
const WSOL_TOKEN_ACCOUNT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
const poolProgram = (connection) => {
    return new anchor_1.Program(IDL_1.IDL, {
        connection: connection,
    });
};
const getPoolsWithBaseMint = async (connection, mintAddress) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
                "memcmp": {
                    "offset": 43,
                    "bytes": mintAddress.toBase58()
                }
            }
        ]
    });
    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = poolProgram(connection).coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: false,
            poolData
        };
    });
    return mappedPools;
};
const getPoolsWithQuoteMint = async (connection, mintAddress) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
                "memcmp": {
                    "offset": 75,
                    "bytes": mintAddress.toBase58()
                }
            }
        ]
    });
    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = poolProgram(connection).coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: true,
            poolData
        };
    });
    return mappedPools;
};
const getPoolsWithBaseMintQuoteWSOL = async (connection, mintAddress) => {
    const response = await connection.getProgramAccounts(PUMP_AMM_PROGRAM_ID, {
        filters: [
            { "dataSize": 211 },
            {
                "memcmp": {
                    "offset": 43,
                    "bytes": mintAddress.toBase58()
                }
            },
            {
                "memcmp": {
                    "offset": 75,
                    "bytes": WSOL_TOKEN_ACCOUNT.toBase58()
                }
            }
        ]
    });
    const mappedPools = response.map((pool) => {
        const data = Buffer.from(pool.account.data);
        const poolData = poolProgram(connection).coder.accounts.decode('pool', data);
        return {
            address: pool.pubkey,
            is_native_base: true,
            poolData
        };
    });
    return mappedPools;
};
const getPriceAndLiquidity = async (connection, pool) => {
    const wsolAddress = pool.poolData.poolQuoteTokenAccount;
    const tokenAddress = pool.poolData.poolBaseTokenAccount;
    const wsolBalance = await connection.getTokenAccountBalance(wsolAddress);
    const tokenBalance = await connection.getTokenAccountBalance(tokenAddress);
    const price = wsolBalance.value.uiAmount / tokenBalance.value.uiAmount;
    return {
        ...pool,
        price,
        reserves: {
            native: wsolBalance.value.uiAmount,
            token: tokenBalance.value.uiAmount
        }
    };
};
const getPoolsWithPrices = async (connection, mintAddress) => {
    const [poolsWithBaseMint, poolsWithQuoteMint] = await Promise.all([
        getPoolsWithBaseMint(connection, mintAddress),
        getPoolsWithQuoteMint(connection, mintAddress)
    ]);
    //const poolsWithBaseMinQuoteWSOL = await getPoolsWithBaseMintQuoteWSOL(mintAddress)
    const pools = [...poolsWithBaseMint, ...poolsWithQuoteMint];
    const results = await Promise.all(pools.map((k) => getPriceAndLiquidity(connection, k)));
    const sortedByHighestLiquidity = results.sort((a, b) => b.reserves.native - a.reserves.native);
    return sortedByHighestLiquidity;
};
const calculateWithSlippageBuy = (amount, basisPoints) => {
    return amount - (amount * basisPoints) / 10000n;
};
exports.calculateWithSlippageBuy = calculateWithSlippageBuy;
const getBuyTokenAmount = async (connection, solAmount, mint) => {
    const pool_detail = await getPoolsWithPrices(connection, mint);
    const sol_reserve = BigInt(Math.floor(pool_detail[0].reserves.native * web3_js_1.LAMPORTS_PER_SOL));
    const token_reserve = BigInt(Math.floor(pool_detail[0].reserves.token * 10 ** 6));
    const product = sol_reserve * token_reserve;
    let new_sol_reserve = sol_reserve + solAmount;
    let new_token_reserve = product / new_sol_reserve + 1n;
    let amount_to_be_purchased = token_reserve - new_token_reserve;
    return amount_to_be_purchased;
};
exports.getBuyTokenAmount = getBuyTokenAmount;
const getPumpSwapPool = async (connection, mint) => {
    const pools = await getPoolsWithBaseMintQuoteWSOL(connection, mint);
    return pools[0].address;
};
exports.getPumpSwapPool = getPumpSwapPool;
const getPrice = async (connection, mint) => {
    const pools = await getPoolsWithPrices(connection, mint);
    return pools[0].price;
};
exports.getPrice = getPrice;
