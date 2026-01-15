---
layout: docs
title: Run a Pool
permalink: /docs/pool/
---



One of Baseline's unique features is that **every full node is a production-grade mining pool**. You don't need separate software like NOMP or Yiimp.

> [!IMPORTANT]
> **Why run a pool?**
> - Run a private pool with configurable fees.
> - Let friends/family mine to your node.
> - Improve network decentralization.

## Quick Setup

To turn your node into a pool, you just need to set a **payout key**.

1.  **Generate a key**:
    Use the wallet CLI to create a dedicated key for pool payouts.
    ```bash
    baseline-wallet generate-key
    ```
    *Save the WIF or hex private key securely!*

2.  **Update `config.json`**:
    Add the pool private key (hex, decimal, or WIF) to the `mining` section.

    ```json
    {
      "mining": {
        "pool_private_key": "YOUR_HEX_KEY_HERE",
        "pool_fee_percent": 1.0,
        "min_payout": 50000000
      }
    }
    ```

3.  **Restart Node**:
    The node will now listen on port `3333` (Stratum by default, configurable via `stratum.port`).

## Configuration Reference

| Setting | Mainnet Default | Description |
|---------|---------|-------------|
| `pool_private_key` | `null` | The key used to sign payout transactions. **Required** to enable Stratum. |
| `pool_fee_percent` | `1.0` | The % cut you take from block rewards before sharing with workers. |
| `min_payout` | `50000000` | Minimum balance (in liners) a worker needs before getting paid. (50M liners = 0.5 BLINE) |

## How Payouts Work

The node handles everything automatically:

1.  **Tracking**: As miners submit shares, the node tracks their contribution in a local database (`data_dir/payouts/ledger.json`).
2.  **Maturity**: When a block is found, the reward is locked for **20 blocks**.
3.  **Distribution**: Once matured, the node creates a transaction paying all eligible workers their share (minus your pool fee).
4.  **Broadcasting**: The payout transaction is sent to the network automatically.

## Monitoring

Your node includes a **built-in visual dashboard** for monitoring your pool.

- **URL**: `http://<your-node-ip>:8832/pool`
- **Features**: Real-time worker stats, hashrate charts, block history, and payout estimates.

> [!NOTE]
> The dashboard is read-only and publicly accessible by default on the RPC port (if exposed).

It also serves a general node status panel at the root URL (`/`).
