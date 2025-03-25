export type PumpSwap = {
    "address": "pAMMBay6oceH9fJKBRHGP5D4bD4sWpmSwMn52FMfXEA";
    "metadata": {
        "name": "pump_amm";
        "version": "0.1.0";
        "spec": "0.1.0";
        "description": "Created with Anchor";
    };
    "instructions": [
        {
            "name": "buy";
            "discriminator": [
                102,
                6,
                61,
                18,
                1,
                218,
                235,
                234
            ];
            "accounts": [
                {
                    "name": "pool";
                },
                {
                    "name": "user";
                    "writable": true;
                    "signer": true;
                },
                {
                    "name": "global_config";
                },
                {
                    "name": "base_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "quote_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "user_base_token_account";
                    "writable": true;
                },
                {
                    "name": "user_quote_token_account";
                    "writable": true;
                },
                {
                    "name": "pool_base_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "pool_quote_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "protocol_fee_recipient";
                },
                {
                    "name": "protocol_fee_recipient_token_account";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account";
                                "path": "protocol_fee_recipient";
                            },
                            {
                                "kind": "account";
                                "path": "quote_token_program";
                            },
                            {
                                "kind": "account";
                                "path": "quote_mint";
                            }
                        ];
                        "program": {
                            "kind": "const";
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    "name": "base_token_program";
                },
                {
                    "name": "quote_token_program";
                },
                {
                    "name": "system_program";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "associated_token_program";
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "base_amount_out";
                    "type": "u64";
                },
                {
                    "name": "max_quote_amount_in";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "create_config";
            "discriminator": [
                201,
                207,
                243,
                114,
                75,
                111,
                47,
                189
            ];
            "accounts": [
                {
                    "name": "admin";
                    "writable": true;
                    "signer": true;
                    "address": "8LWu7QM2dGR1G8nKDHthckea57bkCzXyBTAKPJUBDHo8";
                },
                {
                    "name": "global_config";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    103,
                                    108,
                                    111,
                                    98,
                                    97,
                                    108,
                                    95,
                                    99,
                                    111,
                                    110,
                                    102,
                                    105,
                                    103
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "system_program";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "lp_fee_basis_points";
                    "type": "u64";
                },
                {
                    "name": "protocol_fee_basis_points";
                    "type": "u64";
                },
                {
                    "name": "protocol_fee_recipients";
                    "type": {
                        "array": [
                            "pubkey",
                            8
                        ];
                    };
                }
            ];
        },
        {
            "name": "create_pool";
            "discriminator": [
                233,
                146,
                209,
                142,
                207,
                104,
                64,
                188
            ];
            "accounts": [
                {
                    "name": "pool";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    112,
                                    111,
                                    111,
                                    108
                                ];
                            },
                            {
                                "kind": "arg";
                                "path": "index";
                            },
                            {
                                "kind": "account";
                                "path": "creator";
                            },
                            {
                                "kind": "account";
                                "path": "base_mint";
                            },
                            {
                                "kind": "account";
                                "path": "quote_mint";
                            }
                        ];
                    };
                },
                {
                    "name": "global_config";
                },
                {
                    "name": "creator";
                    "writable": true;
                    "signer": true;
                },
                {
                    "name": "base_mint";
                },
                {
                    "name": "quote_mint";
                },
                {
                    "name": "lp_mint";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    112,
                                    111,
                                    111,
                                    108,
                                    95,
                                    108,
                                    112,
                                    95,
                                    109,
                                    105,
                                    110,
                                    116
                                ];
                            },
                            {
                                "kind": "account";
                                "path": "pool";
                            }
                        ];
                    };
                },
                {
                    "name": "user_base_token_account";
                    "writable": true;
                },
                {
                    "name": "user_quote_token_account";
                    "writable": true;
                },
                {
                    "name": "user_pool_token_account";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account";
                                "path": "creator";
                            },
                            {
                                "kind": "account";
                                "path": "token_2022_program";
                            },
                            {
                                "kind": "account";
                                "path": "lp_mint";
                            }
                        ];
                        "program": {
                            "kind": "const";
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    "name": "pool_base_token_account";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account";
                                "path": "pool";
                            },
                            {
                                "kind": "account";
                                "path": "base_token_program";
                            },
                            {
                                "kind": "account";
                                "path": "base_mint";
                            }
                        ];
                        "program": {
                            "kind": "const";
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    "name": "pool_quote_token_account";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account";
                                "path": "pool";
                            },
                            {
                                "kind": "account";
                                "path": "quote_token_program";
                            },
                            {
                                "kind": "account";
                                "path": "quote_mint";
                            }
                        ];
                        "program": {
                            "kind": "const";
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    "name": "system_program";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "token_2022_program";
                    "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
                },
                {
                    "name": "base_token_program";
                },
                {
                    "name": "quote_token_program";
                },
                {
                    "name": "associated_token_program";
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "index";
                    "type": "u16";
                },
                {
                    "name": "base_amount_in";
                    "type": "u64";
                },
                {
                    "name": "quote_amount_in";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "deposit";
            "discriminator": [
                242,
                35,
                198,
                137,
                82,
                225,
                242,
                182
            ];
            "accounts": [
                {
                    "name": "pool";
                    "writable": true;
                },
                {
                    "name": "global_config";
                },
                {
                    "name": "user";
                    "signer": true;
                },
                {
                    "name": "base_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "quote_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "lp_mint";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "user_base_token_account";
                    "writable": true;
                },
                {
                    "name": "user_quote_token_account";
                    "writable": true;
                },
                {
                    "name": "user_pool_token_account";
                    "writable": true;
                },
                {
                    "name": "pool_base_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "pool_quote_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "token_program";
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                },
                {
                    "name": "token_2022_program";
                    "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "lp_token_amount_out";
                    "type": "u64";
                },
                {
                    "name": "max_base_amount_in";
                    "type": "u64";
                },
                {
                    "name": "max_quote_amount_in";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "disable";
            "discriminator": [
                185,
                173,
                187,
                90,
                216,
                15,
                238,
                233
            ];
            "accounts": [
                {
                    "name": "admin";
                    "signer": true;
                    "relations": [
                        "global_config"
                    ];
                },
                {
                    "name": "global_config";
                    "writable": true;
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "disable_create_pool";
                    "type": "bool";
                },
                {
                    "name": "disable_deposit";
                    "type": "bool";
                },
                {
                    "name": "disable_withdraw";
                    "type": "bool";
                },
                {
                    "name": "disable_buy";
                    "type": "bool";
                },
                {
                    "name": "disable_sell";
                    "type": "bool";
                }
            ];
        },
        {
            "name": "extend_account";
            "discriminator": [
                234,
                102,
                194,
                203,
                150,
                72,
                62,
                229
            ];
            "accounts": [
                {
                    "name": "account";
                    "writable": true;
                },
                {
                    "name": "user";
                    "signer": true;
                },
                {
                    "name": "system_program";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [];
        },
        {
            "name": "sell";
            "discriminator": [
                51,
                230,
                133,
                164,
                1,
                127,
                131,
                173
            ];
            "accounts": [
                {
                    "name": "pool";
                },
                {
                    "name": "user";
                    "writable": true;
                    "signer": true;
                },
                {
                    "name": "global_config";
                },
                {
                    "name": "base_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "quote_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "user_base_token_account";
                    "writable": true;
                },
                {
                    "name": "user_quote_token_account";
                    "writable": true;
                },
                {
                    "name": "pool_base_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "pool_quote_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "protocol_fee_recipient";
                },
                {
                    "name": "protocol_fee_recipient_token_account";
                    "writable": true;
                    "pda": {
                        "seeds": [
                            {
                                "kind": "account";
                                "path": "protocol_fee_recipient";
                            },
                            {
                                "kind": "account";
                                "path": "quote_token_program";
                            },
                            {
                                "kind": "account";
                                "path": "quote_mint";
                            }
                        ];
                        "program": {
                            "kind": "const";
                            "value": [
                                140,
                                151,
                                37,
                                143,
                                78,
                                36,
                                137,
                                241,
                                187,
                                61,
                                16,
                                41,
                                20,
                                142,
                                13,
                                131,
                                11,
                                90,
                                19,
                                153,
                                218,
                                255,
                                16,
                                132,
                                4,
                                142,
                                123,
                                216,
                                219,
                                233,
                                248,
                                89
                            ];
                        };
                    };
                },
                {
                    "name": "base_token_program";
                },
                {
                    "name": "quote_token_program";
                },
                {
                    "name": "system_program";
                    "address": "11111111111111111111111111111111";
                },
                {
                    "name": "associated_token_program";
                    "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "base_amount_in";
                    "type": "u64";
                },
                {
                    "name": "min_quote_amount_out";
                    "type": "u64";
                }
            ];
        },
        {
            "name": "update_admin";
            "discriminator": [
                161,
                176,
                40,
                213,
                60,
                184,
                179,
                228
            ];
            "accounts": [
                {
                    "name": "admin";
                    "signer": true;
                    "relations": [
                        "global_config"
                    ];
                },
                {
                    "name": "global_config";
                    "writable": true;
                },
                {
                    "name": "new_admin";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [];
        },
        {
            "name": "update_fee_config";
            "discriminator": [
                104,
                184,
                103,
                242,
                88,
                151,
                107,
                20
            ];
            "accounts": [
                {
                    "name": "admin";
                    "signer": true;
                    "relations": [
                        "global_config"
                    ];
                },
                {
                    "name": "global_config";
                    "writable": true;
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "lp_fee_basis_points";
                    "type": "u64";
                },
                {
                    "name": "protocol_fee_basis_points";
                    "type": "u64";
                },
                {
                    "name": "protocol_fee_recipients";
                    "type": {
                        "array": [
                            "pubkey",
                            8
                        ];
                    };
                }
            ];
        },
        {
            "name": "withdraw";
            "discriminator": [
                183,
                18,
                70,
                156,
                148,
                109,
                161,
                34
            ];
            "accounts": [
                {
                    "name": "pool";
                    "writable": true;
                },
                {
                    "name": "global_config";
                },
                {
                    "name": "user";
                    "signer": true;
                },
                {
                    "name": "base_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "quote_mint";
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "lp_mint";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "user_base_token_account";
                    "writable": true;
                },
                {
                    "name": "user_quote_token_account";
                    "writable": true;
                },
                {
                    "name": "user_pool_token_account";
                    "writable": true;
                },
                {
                    "name": "pool_base_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "pool_quote_token_account";
                    "writable": true;
                    "relations": [
                        "pool"
                    ];
                },
                {
                    "name": "token_program";
                    "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
                },
                {
                    "name": "token_2022_program";
                    "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
                },
                {
                    "name": "event_authority";
                    "pda": {
                        "seeds": [
                            {
                                "kind": "const";
                                "value": [
                                    95,
                                    95,
                                    101,
                                    118,
                                    101,
                                    110,
                                    116,
                                    95,
                                    97,
                                    117,
                                    116,
                                    104,
                                    111,
                                    114,
                                    105,
                                    116,
                                    121
                                ];
                            }
                        ];
                    };
                },
                {
                    "name": "program";
                }
            ];
            "args": [
                {
                    "name": "lp_token_amount_in";
                    "type": "u64";
                },
                {
                    "name": "min_base_amount_out";
                    "type": "u64";
                },
                {
                    "name": "min_quote_amount_out";
                    "type": "u64";
                }
            ];
        }
    ];
    "accounts": [
        {
            "name": "GlobalConfig";
            "discriminator": [
                149,
                8,
                156,
                202,
                160,
                252,
                176,
                217
            ];
        },
        {
            "name": "Pool";
            "discriminator": [
                241,
                154,
                109,
                4,
                17,
                177,
                109,
                188
            ];
        }
    ];
    "events": [
        {
            "name": "BuyEvent";
            "discriminator": [
                103,
                244,
                82,
                31,
                44,
                245,
                119,
                119
            ];
        },
        {
            "name": "CreateConfigEvent";
            "discriminator": [
                107,
                52,
                89,
                129,
                55,
                226,
                81,
                22
            ];
        },
        {
            "name": "CreatePoolEvent";
            "discriminator": [
                177,
                49,
                12,
                210,
                160,
                118,
                167,
                116
            ];
        },
        {
            "name": "DepositEvent";
            "discriminator": [
                120,
                248,
                61,
                83,
                31,
                142,
                107,
                144
            ];
        },
        {
            "name": "DisableEvent";
            "discriminator": [
                107,
                253,
                193,
                76,
                228,
                202,
                27,
                104
            ];
        },
        {
            "name": "ExtendAccountEvent";
            "discriminator": [
                97,
                97,
                215,
                144,
                93,
                146,
                22,
                124
            ];
        },
        {
            "name": "SellEvent";
            "discriminator": [
                62,
                47,
                55,
                10,
                165,
                3,
                220,
                42
            ];
        },
        {
            "name": "UpdateAdminEvent";
            "discriminator": [
                225,
                152,
                171,
                87,
                246,
                63,
                66,
                234
            ];
        },
        {
            "name": "UpdateFeeConfigEvent";
            "discriminator": [
                90,
                23,
                65,
                35,
                62,
                244,
                188,
                208
            ];
        },
        {
            "name": "WithdrawEvent";
            "discriminator": [
                22,
                9,
                133,
                26,
                160,
                44,
                71,
                192
            ];
        }
    ];
    "errors": [
        {
            "code": 6000;
            "name": "FeeBasisPointsExceedsMaximum";
        },
        {
            "code": 6001;
            "name": "ZeroBaseAmount";
        },
        {
            "code": 6002;
            "name": "ZeroQuoteAmount";
        },
        {
            "code": 6003;
            "name": "TooLittlePoolTokenLiquidity";
        },
        {
            "code": 6004;
            "name": "ExceededSlippage";
        },
        {
            "code": 6005;
            "name": "InvalidAdmin";
        },
        {
            "code": 6006;
            "name": "UnsupportedBaseMint";
        },
        {
            "code": 6007;
            "name": "UnsupportedQuoteMint";
        },
        {
            "code": 6008;
            "name": "InvalidBaseMint";
        },
        {
            "code": 6009;
            "name": "InvalidQuoteMint";
        },
        {
            "code": 6010;
            "name": "InvalidLpMint";
        },
        {
            "code": 6011;
            "name": "AllProtocolFeeRecipientsShouldBeNonZero";
        },
        {
            "code": 6012;
            "name": "UnsortedNotUniqueProtocolFeeRecipients";
        },
        {
            "code": 6013;
            "name": "InvalidProtocolFeeRecipient";
        },
        {
            "code": 6014;
            "name": "InvalidPoolBaseTokenAccount";
        },
        {
            "code": 6015;
            "name": "InvalidPoolQuoteTokenAccount";
        },
        {
            "code": 6016;
            "name": "BuyMoreBaseAmountThanPoolReserves";
        },
        {
            "code": 6017;
            "name": "DisabledCreatePool";
        },
        {
            "code": 6018;
            "name": "DisabledDeposit";
        },
        {
            "code": 6019;
            "name": "DisabledWithdraw";
        },
        {
            "code": 6020;
            "name": "DisabledBuy";
        },
        {
            "code": 6021;
            "name": "DisabledSell";
        },
        {
            "code": 6022;
            "name": "SameMint";
        },
        {
            "code": 6023;
            "name": "Overflow";
        },
        {
            "code": 6024;
            "name": "Truncation";
        },
        {
            "code": 6025;
            "name": "DivisionByZero";
        },
        {
            "code": 6026;
            "name": "NewSizeLessThanCurrentSize";
        },
        {
            "code": 6027;
            "name": "AccountTypeNotSupported";
        }
    ];
    "types": [
        {
            "name": "BuyEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "base_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "max_quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "user_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "lp_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "lp_fee";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_in_with_lp_fee";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "pool";
                        "type": "pubkey";
                    },
                    {
                        "name": "user";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_quote_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "protocol_fee_recipient";
                        "type": "pubkey";
                    },
                    {
                        "name": "protocol_fee_recipient_token_account";
                        "type": "pubkey";
                    }
                ];
            };
        },
        {
            "name": "CreateConfigEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "admin";
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_recipients";
                        "type": {
                            "array": [
                                "pubkey",
                                8
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "CreatePoolEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "index";
                        "type": "u16";
                    },
                    {
                        "name": "creator";
                        "type": "pubkey";
                    },
                    {
                        "name": "base_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "quote_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "base_mint_decimals";
                        "type": "u8";
                    },
                    {
                        "name": "quote_mint_decimals";
                        "type": "u8";
                    },
                    {
                        "name": "base_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "pool_base_amount";
                        "type": "u64";
                    },
                    {
                        "name": "pool_quote_amount";
                        "type": "u64";
                    },
                    {
                        "name": "minimum_liquidity";
                        "type": "u64";
                    },
                    {
                        "name": "initial_liquidity";
                        "type": "u64";
                    },
                    {
                        "name": "lp_token_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "pool_bump";
                        "type": "u8";
                    },
                    {
                        "name": "pool";
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_quote_token_account";
                        "type": "pubkey";
                    }
                ];
            };
        },
        {
            "name": "DepositEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "lp_token_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "max_base_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "max_quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "user_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "base_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "lp_mint_supply";
                        "type": "u64";
                    },
                    {
                        "name": "pool";
                        "type": "pubkey";
                    },
                    {
                        "name": "user";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_quote_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_pool_token_account";
                        "type": "pubkey";
                    }
                ];
            };
        },
        {
            "name": "DisableEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "admin";
                        "type": "pubkey";
                    },
                    {
                        "name": "disable_create_pool";
                        "type": "bool";
                    },
                    {
                        "name": "disable_deposit";
                        "type": "bool";
                    },
                    {
                        "name": "disable_withdraw";
                        "type": "bool";
                    },
                    {
                        "name": "disable_buy";
                        "type": "bool";
                    },
                    {
                        "name": "disable_sell";
                        "type": "bool";
                    }
                ];
            };
        },
        {
            "name": "ExtendAccountEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user";
                        "type": "pubkey";
                    },
                    {
                        "name": "current_size";
                        "type": "u64";
                    },
                    {
                        "name": "new_size";
                        "type": "u64";
                    }
                ];
            };
        },
        {
            "name": "GlobalConfig";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "admin";
                        "docs": [
                            "The admin pubkey"
                        ];
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_fee_basis_points";
                        "docs": [
                            "The lp fee in basis points (0.01%)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_basis_points";
                        "docs": [
                            "The protocol fee in basis points (0.01%)"
                        ];
                        "type": "u64";
                    },
                    {
                        "name": "disable_flags";
                        "docs": [
                            "Flags to disable certain functionality",
                            "bit 0 - Disable create pool",
                            "bit 1 - Disable deposit",
                            "bit 2 - Disable withdraw",
                            "bit 3 - Disable buy",
                            "bit 4 - Disable sell"
                        ];
                        "type": "u8";
                    },
                    {
                        "name": "protocol_fee_recipients";
                        "docs": [
                            "Addresses of the protocol fee recipients"
                        ];
                        "type": {
                            "array": [
                                "pubkey",
                                8
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "Pool";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "pool_bump";
                        "type": "u8";
                    },
                    {
                        "name": "index";
                        "type": "u16";
                    },
                    {
                        "name": "creator";
                        "type": "pubkey";
                    },
                    {
                        "name": "base_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "quote_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_mint";
                        "type": "pubkey";
                    },
                    {
                        "name": "pool_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "pool_quote_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_supply";
                        "docs": [
                            "True circulating supply without burns and lock-ups"
                        ];
                        "type": "u64";
                    }
                ];
            };
        },
        {
            "name": "SellEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "base_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "min_quote_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "user_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "lp_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "lp_fee";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_out_without_lp_fee";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "pool";
                        "type": "pubkey";
                    },
                    {
                        "name": "user";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_quote_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "protocol_fee_recipient";
                        "type": "pubkey";
                    },
                    {
                        "name": "protocol_fee_recipient_token_account";
                        "type": "pubkey";
                    }
                ];
            };
        },
        {
            "name": "UpdateAdminEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "admin";
                        "type": "pubkey";
                    },
                    {
                        "name": "new_admin";
                        "type": "pubkey";
                    }
                ];
            };
        },
        {
            "name": "UpdateFeeConfigEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "admin";
                        "type": "pubkey";
                    },
                    {
                        "name": "lp_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_basis_points";
                        "type": "u64";
                    },
                    {
                        "name": "protocol_fee_recipients";
                        "type": {
                            "array": [
                                "pubkey",
                                8
                            ];
                        };
                    }
                ];
            };
        },
        {
            "name": "WithdrawEvent";
            "type": {
                "kind": "struct";
                "fields": [
                    {
                        "name": "timestamp";
                        "type": "i64";
                    },
                    {
                        "name": "lp_token_amount_in";
                        "type": "u64";
                    },
                    {
                        "name": "min_base_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "min_quote_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "user_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "user_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_base_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "pool_quote_token_reserves";
                        "type": "u64";
                    },
                    {
                        "name": "base_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "quote_amount_out";
                        "type": "u64";
                    },
                    {
                        "name": "lp_mint_supply";
                        "type": "u64";
                    },
                    {
                        "name": "pool";
                        "type": "pubkey";
                    },
                    {
                        "name": "user";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_base_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_quote_token_account";
                        "type": "pubkey";
                    },
                    {
                        "name": "user_pool_token_account";
                        "type": "pubkey";
                    }
                ];
            };
        }
    ];
};
