---
layout: docs
title: Wallet Guide
permalink: /docs/wallet/
---



Baseline Cash offers two ways to manage your funds: the **Light Wallet** for most users, and the **Node Wallet** for power users.

## 1. Light Wallet (Recommended)

The Light Wallet is a standalone desktop application. It does not require downloading the blockchain.

- **Best for**: Daily use, non-technical users.
- **Platform**: Windows, macOS, Linux.
- **Download**: [Latest Release](https://github.com/Baseline-Blockchain/baseline-light/releases/latest)

### Features
- Instant setup (no sync required).
- Connects to public nodes (or your own).

## 2. Node Wallet

The `baseline-node` software includes a built-in "full" wallet. It is accessed via the command line (CLI) or JSON-RPC.

- **Best for**: Developers, Exhanges, Mining Pools.
- **Platform**: Command Line / Server.

### Usage
The node wallet is controlled via the `baseline-wallet` CLI tool or RPC commands.

```bash
# Generate a new address
baseline-wallet getnewaddress

# Send funds
baseline-wallet sendtoaddress <address> <amount>
```

> [!IMPORTANT]
> **Backup Warning**
> *   **Light Wallet**: Write down your 12-word seed phrase.
> *   **Node Wallet**: Backup your `wallet.json` or export your private keys (`dumpwallet`).
