---
layout: docs
title: Block Explorer
permalink: /docs/explorer/
---



The Baseline Block Explorer allows you to search the blockchain for transactions, blocks, and addresses.

**[Launch Explorer](https://explorer.baseline.cash)**

## Features

- **Search**: Find transactions by ID, blocks by height/hash, or addresses.
- **Rich List**: View the top holding addresses.
- **Mempool**: See unconfirmed transactions waiting to be mined.

## API

The explorer is built on top of the standard Baseline RPC. You don't need a special API key; you can run your own node and query it directly using the [JSON-RPC](/docs/rpc/) methods.

### Common Queries
- Check balance: `getaddressbalance`
- Check history: `getaddresstxids`

> [!TIP]
> **Run your own**
> The explorer is fully open source. You can run a local version against your own node.
