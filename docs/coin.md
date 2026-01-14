---
layout: docs
title: Baseline Cash (BLINE)
permalink: /docs/coin/
---



Baseline Cash is a decentralized digital currency designed for fair distribution and reliable payments. It is a **clean-room Python implementation** of a Bitcoin-like protocol, optimized for consumer hardware.

## Quick Facts

| Property | Value |
|----------|-------|
| **Ticker** | `BLINE` |
| **Consensus** | Modified SHA256d |
| **Max Supply** | **300,000,000 BLINE** | Hardcoded limit (`MAX_MONEY`). |
| **Block Time** | 20 Seconds |
| **Premine** | 0 BLINE (Fair Launch) |
| **Decimals** | 8 |

## Emission Schedule

Baseline uses a continuous emission model rather than sudden "halvings". This ensures a smooth reduction in inflation and consistent security/incentives for miners.

- **Initial Reward**: 50 BLINE per block.
- **Half-Life**: 4,158,884 blocks (~2.64 years).
- **Formula**: Rewards decay smoothly every block on an exponential curve.

### Supply Cap
The supply is capped at exactly **300,000,000 BLINE** (defined as `MAX_MONEY` in `core/tx.py`). The emission curve is asymptotic to this value.

## Technical Specifications

### No ASICs
Baseline forces a **Big-Endian byte order** for block header hashes (`prev_hash` and `merkle_root`).
- **Bitcoin ASICs**: Hardcoded to Little-Endian. They produce invalid hashes on Baseline.
- **Result**: You can mine effectively with CPUs and GPUs.

### Difficulty Adjustment
We use **LWMA (Linear Weighted Moving Average)** over a 60-block window.
- **Why?** It responds rapidly to hashrate changes. If a large miner joins or leaves, the difficulty adjusts within minutes, keeping block times stable at 20 seconds.

### Units
The smallest unit is a **Liner**.
- 1 BLINE = 100,000,000 Liners.
- 1 Liner = 0.00000001 BLINE.

## Ports

| Service | Mainnet |
|---------|---------|
| P2P | 9333 |
| RPC | 8832 |
| Stratum | 3333 |
