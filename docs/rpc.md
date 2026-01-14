---
layout: docs
title: RPC API
permalink: /docs/rpc/
---

# JSON-RPC API

The Baseline node exposes an HTTP JSON-RPC API for programmatic access. It is largely compatible with Bitcoin Core, with additions for the built-in pool and address index.

## Connection

- **URL**: `http://127.0.0.1:8832`
- **Auth**: Basic Auth (Username/Password from `config.json`).
- **Content-Type**: `application/json`

**Example Request:**
```bash
curl --user rpcuser:rpcpass \
  --data '{"method": "getblockchaininfo", "params": []}' \
  http://127.0.0.1:8832
```

## Blockchain Methods

| Method | Description |
|--------|-------------|
| `getblockchaininfo` | General chain state (height, difficulty, verification progress). |
| `getblock <hash>` | Get full block details. |
| `getblockhash <height>` | Get hash for a specific height. |
| `getrawtransaction <txid>` | Get transaction details. |
| `getmempoolinfo` | Current transaction memory pool status. |

## Address Index (Built-in)

Baseline includes a native address index. You do *not* need an external indexer.

| Method | Description |
|--------|-------------|
| `getaddressbalance` | Balance for an address (`{"addresses": ["..."]}`). |
| `getaddressutxos` | List unspent outputs for an address. |
| `getaddresstxids` | List transaction IDs involving an address. |

## Wallet Methods

| Method | Description |
|--------|-------------|
| `getnewaddress` | Generate a new receiving address. |
| `sendtoaddress` | Send funds: `sendtoaddress <addr> <amount>`. |
| `listtransactions` | Recent history. |
| `getbalance` | Current wallet balance. |

## Pool & Mining Methods

Unique to Baseline, these methods control the built-in Stratum server.

| Method | Description |
|--------|-------------|
| `getpoolstats` | Hashrate, fees, and payout configuration. |
| `getpoolworkers` | List connected workers and their hashrates. |
| `getpoolpendingblocks` | Blocks mined by your pool waiting for maturity. |
| `getpoolmatured` | Matured blocks ready for payout. |

> [!WARNING]
> **Security Warning**
> Never expose the RPC port (`8832`) to the public internet. It grants full control over the node and wallet. Use an SSH tunnel or reverse proxy if remote access is needed.
