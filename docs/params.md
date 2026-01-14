---
layout: docs
title: Network Parameters
permalink: /docs/params/
---



Baseline Cash (BLINE) uses a set of consensus constants designed for speed and fair distribution.

## General

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Block Time** | 20 Seconds | ~4,320 blocks per day. |
| **Algorithm** | Modified SHA256d | Incompatible with Bitcoin ASICs. |
| **Difficulty** | LWMA-based | Adjusts every block based on recent history. |
| **Max Supply** | **300,000,000** | Strict limit (`MAX_MONEY`). |

## Ports

| Service | Mainnet | Testnet (Regtest) |
|---------|---------|-------------------|
| **P2P** | 9333 | 19333 |
| **RPC** | 8832 | 18832 |
| **Stratum** | 3333 | 13333 |

## Emission Schedule

Block rewards decrease smoothly over time using an exponential decay formula, rather than sudden "halving" cliffs.

- **Initial Reward**: 50 BLINE
- **Decay Factor**: Reduced continuously.
- **Half-Life**: 4,158,884 blocks (~2.64 years).

## Consensus Rules

1.  **Dev Fund**: 1% of the **subsidy** (not fees) is sent to the foundation address.
2.  **Maturity**: Coinbase rewards are spendable after **20 confirmations**.
3.  **Fees**: Minimum relay fee of 5,000 liners per kB.

> [!NOTE]
> **Liners?**
> A "Liner" is the smallest unit of Baseline Cash.
> 1 BLINE = 100,000,000 Liners.
