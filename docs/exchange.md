---
layout: docs
title: Exchange Integration
permalink: /docs/exchange/
---

# Exchange Integration Guide

Baseline Cash is designed for easy integration. While it is a **Python implementation** (not a Bitcoin Core fork), its RPC and transaction model align with Bitcoin Core standards for compatibility.

## Integration Checklist

### 1. Node Setup
- **Binary**: Run `baseline-node` (Python 3.12+).
- **Config**: Set a secure `rpc.username`/`rpc.password`.
- **Index**: The `addressindex` is on by default—useful for deposit tracking.

### 2. Deposit Architecture
Baseline supports standard **P2PKH** addresses (starting with `N`).

1. **Generate Address**: `getnewaddress "user_123"`
2. **Monitor**: Poll `getaddressutxos` or `listtransactions`.
3. **Confirmations**: Wait for **20 confirmations** (same as coinbase maturity) for finality.

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

## Docker Example

```yaml
services:
  baseline:
    image: baseline-node
    volumes:
      - ./data:/root/.baseline
    ports:
      - "8832:8832"  # RPC (Protect this!)
      - "9333:9333"  # P2P
```
