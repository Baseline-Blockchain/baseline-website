---
layout: docs
title: Exchange Integration
permalink: /docs/exchange/
---

Baseline Cash integrates like a typical Bitcoin fork. The node exposes a Core-style JSON-RPC API, ships with a built-in wallet, and includes an always-on address index. If you already integrate Bitcoin forks with RPC + walletnotify, you can use the same playbook here.

## Can exchanges integrate the same as a Bitcoin fork?
Yes. Use the same JSON-RPC wallet methods and `walletnotify` callback flow. Only chain parameters differ (block time, address prefix, unit name).

## Compatibility Summary
- **RPC**: HTTP JSON-RPC with `rpc.username` / `rpc.password` auth, Core-style semantics.
- **Wallet RPC**: `getnewaddress`, `getbalance`, `listunspent`, `listtransactions`, `gettransaction`, `sendtoaddress`, `walletpassphrase`, `walletlock`.
- **Address Index**: `getaddressutxos`, `getaddresstxids`, `getaddressbalance` (always on).
- **Notify Hook**: `walletnotify` runs a command on wallet tx events (new tx or confirmation change).

> See the [RPC API](/docs/rpc/) for the full method list.

## 1. Node Setup
- Run `baseline-node` (Python 3.12+).
- Set secure RPC credentials in `config.json`.
- Optional: configure `walletnotify` for deposit callbacks.

```json
{
  "rpc": { "username": "exchange", "password": "strongpass" },
  "walletnotify": "curl -X POST https://exchange.example/walletnotify?txid=%s"
}
```

## 2. Deposit Flow
Baseline uses standard P2PKH addresses (mainnet prefix `N`).

1. **Generate address**: `getnewaddress "user_123"`
2. **Monitor deposits** (pick one):
   - **Event-driven**: set `walletnotify` and fetch tx details via `gettransaction %s`.
   - **Polling**: `getaddressutxos` / `getaddresstxids` for address-indexed tracking.
3. **Confirmations**: 20 confirmations is a conservative policy (coinbase maturity is 20 blocks).

Note: `walletnotify` fires when a wallet transaction is recorded or its confirmation status changes. Incoming deposits will trigger after they confirm in a block; use the address index if you need mempool-level monitoring or watch-only addresses.

## 3. Withdrawal Flow
1. **Send**: `sendtoaddress <dest> <amount>`
2. **Track**: `gettransaction <txid>`
3. **Fees**: default fee estimation is usually sufficient. Optional overrides via `sendtoaddress` options.

## Differences vs Bitcoin Core
1. **Implementation**: Python node (not a Core fork), but RPC semantics align.
2. **Block Time**: 20 seconds (fast confirmations).
3. **Units**: 1 BLINE = 100,000,000 Liners.
4. **Address Prefix**: mainnet addresses start with `N` (version `0x35`).
