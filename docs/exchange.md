---
layout: docs
title: Exchange Integration
permalink: /docs/exchange/
---



Baseline Cash is designed for easy integration. While it is a **Python implementation** (not a Bitcoin Core fork), its RPC and transaction model align with Bitcoin Core standards for compatibility.

## Integration Checklist

### 1. Node Setup
- **Binary**: Run `baseline-node` (Python 3.12+).
- **Config**: Set a secure `rpc.username`/`rpc.password`.
- **Wallet**: The built-in wallet is **enabled by default** and is required to generate addresses.
- **Index**: The address index is always on (UTXO + history); no external indexer required for deposits.

> See the [RPC API](/docs/rpc/) for a complete list of available methods.

### 2. Deposit Architecture
Baseline supports standard **P2PKH** addresses (starting with `N`).

1. **Generate Address**: `getnewaddress "user_123"`
2. **Monitor**: Poll `getaddressutxos` / `getaddresstxids` for address-indexed tracking. `listtransactions` only covers wallet-managed addresses.
3. **Confirmations**: 20 confirmations is a conservative policy (coinbase maturity is 20 blocks).

### 3. Withdrawal Architecture

1. **Send**: Use `sendtoaddress <dest> <amount>`.
2. **Fees**: Automatic fee estimation is usually sufficient.
3. **Mempool**: Baseline blocks are 20 seconds, so transactions clear quickly.

## Differences from Bitcoin

While mostly compatible, note these differences:
1. **Codebase**: Pure Python. Installing `baseline-node` via pip (or running it from source) is the standard way to run a node.
2. **Block Time**: 20 Seconds (vs 10 mins).
3. **Units**: 1 BLINE = 100,000,000 Liners (same ratio as BTC/Sats).
4. **Address Prefix**: Mainnet addresses start with `N` (version `0x35`).
