---
layout: docs
title: RPC API
permalink: /docs/rpc/
---



The Baseline node exposes an HTTP JSON-RPC API for programmatic access. It is largely compatible with Bitcoin Core, with additions for the built-in pool and address index.

## Connection

- **URL**: `http://127.0.0.1:8832`
- **Content-Type**: `application/json`

### Authentication

By default, the RPC server requires **Basic Auth** (Username/Password from `config.json`) for sensitive operations (like wallet management).

However, the server can allow unauthenticated access to a limited allowlist of methods (typically read-only and monitoring endpoints).

**Example Request (Public):**
```bash
curl --data '{"method": "getblockchaininfo", "params": []}' http://127.0.0.1:8832
```

**Example Request (Authenticated):**
```bash
curl --user rpcuser:rpcpass \
  --data '{"method": "getnewaddress", "params": []}' \
  http://127.0.0.1:8832
```

## Blockchain & Mempool Methods

These methods provide information about the blockchain state and specific blocks. Some are public (allowlisted).

| Method | Description |
|--------|-------------|
| `getblockchaininfo` | General chain state (height, difficulty, verification progress). |
| `getblockcount` | Returns the number of blocks in the longest blockchain. |
| `getbestblockhash` | Returns the hash of the best (tip) block. |
| `getdifficulty` | Returns the proof-of-work difficulty as a multiple of the minimum difficulty. |
| `getblock <hash>` | Get full block details. |
| `getblockhash <height>` | Get hash for a specific height. |
| `getblockheader <hash>` | Get the block header information. |
| `getrawtransaction <txid>` | Get transaction details. |
| `gettxout <txid> <vout>` | Returns unspent output details (or null if spent). |
| `getrawmempool` | Returns transaction IDs (or details with `verbose=true`). |
| `getmempoolinfo` | Current transaction memory pool status. |
| `sendrawtransaction <hex>` | Broadcasts a raw transaction to the network. |
| `getchaintxstats` | Statistics about the total number and rate of transactions in the chain. |
| `getblockstats <hash_or_height>` | Statistics for a specific block. |
| `gettxoutsetinfo` | Statistics about the unspent transaction output set. |
| `getindexinfo` | Returns status for optional indexes (address, tx, etc.). |
| `gettimesyncinfo` | Time sync / NTP status and drift details. |
| `estimatesmartfee` | Estimates the transaction fee per kilobyte needed to be included within a certain number of blocks. |
| `uptime` | RPC server uptime in seconds. |

## Network Methods

Methods for inspecting the P2P network connections.

| Method | Description |
|--------|-------------|
| `getnetworkinfo` | Returns information about the node's connection to the network. |
| `getpeerinfo` | Returns data about each connected network node. |
| `getnettotals` | Returns information about network traffic, including bytes in and bytes out. |

## Address Index (Built-in)

Baseline includes a native address index. You do *not* need an external indexer.

| Method | Description |
|--------|-------------|
| `getaddressbalance` | Balance for an address (`{"addresses": ["..."]}`). |
| `getaddressutxos` | List unspent outputs for an address. |
| `getaddresstxids` | List transaction IDs involving an address. |
| `getrichlist` | Richest addresses by UTXO balance. |

## Wallet Methods

> [!NOTE]
> **Requirement**: The node must be running with the wallet enabled for these methods to be available.

These methods manage the built-in wallet.

| Method | Description |
|--------|-------------|
| `getnewaddress` | Generate a new receiving address. |
| `getbalance` | Current wallet balance. |
| `sendtoaddress` | Send funds: `sendtoaddress <addr> <amount>`. |
| `listtransactions` | Recent history. |
| `gettransaction` | Details for a wallet transaction by txid. |
| `listunspent` | Returns array of unspent transaction outputs in the wallet. |
| `listaddresses` | Lists addresses in the wallet. |
| `listaddressbalances` | Balances for each wallet address. |
| `getreceivedbyaddress` | Total received by a wallet address. |
| `rescanwallet` | Rescan the chain for wallet transactions. |
| `encryptwallet` | Encrypt the wallet with a passphrase. |
| `importprivkey` | Adds a private key (as your wallet owns) to your wallet. |
| `importaddress` | Watch a public address (optionally rescan). |
| `importwallet` | Imports keys from a wallet dump file. |
| `dumpwallet` | Dumps all wallet keys in a human-readable format to a file. |
| `walletinfo` | Returns wallet status and metadata. |
| `walletpassphrase` | Stores the wallet decryption key in memory for a specified time. |
| `walletlock` | Removes the wallet encryption key from memory, locking the wallet. |
| `exportseed` | Export the wallet seed (if available). |
| `importseed` | Import a seed and optionally wipe existing keys. |

## Pool & Mining Methods

Unique to Baseline, these methods control the built-in Stratum server.

| Method | Description |
|--------|-------------|
| `getmininginfo` | Returns a json object containing mining-related information. |
| `getblocktemplate` | Returns data needed to construct a block to work on. |
| `submitblock <hex_data>` | Attempts to submit a new block to the network. |
| `getpoolstats` | Hashrate, fees, and payout configuration. |
| `getpoolworkers` | List connected workers and their hashrates. |
| `getpoolpendingblocks` | Blocks mined by your pool waiting for maturity. |
| `getpoolmatured` | Matured blocks ready for payout. |
| `getpoolpayoutpreview` | Preview next payout distribution. |
| `getstratumsessions` | Active Stratum session details. |
| `poolreconcile` | Reconcile payouts with the chain (dry-run unless `apply=true`). |

> [!WARNING]
> **Security Warning**
> Never expose the RPC port (`8832`) to the public internet. It grants full control over the node and wallet. Use an SSH tunnel or reverse proxy if remote access is needed.
