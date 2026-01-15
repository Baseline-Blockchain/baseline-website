---
layout: docs
title: Protocol Specification
permalink: /docs/spec/
---



This document defines the consensus rules and data structures for Baseline Cash.

## 1. Core Constants

Baseline Cash is a **Python-based implementation** of a Bitcoin-like protocol, optimized for a modern payments network. It is not a fork of Bitcoin Core.

| Parameter | Value | Description |
|-----------|-------|-------------|
| **Hashing Algorithm** | `SHA256d` (Modified) | Double SHA-256 (Incompatible with BTC ASICs). |
| **Byte Order** | **Big-Endian** | Headers use Big-Endian digest bytes (breaks BTC ASICs). |
| **Block Time** | `20 seconds` | Target interval between blocks. |
| **Difficulty Algo** | `LWMA-60` | Linearly Weighted Moving Average (60 blocks). |
| **Max Supply** | **300,000,000** | Hardcoded `MAX_MONEY` (checked in `tx.serialize`). |
| **Port (P2P)** | `9333` | Default P2P port. |

## 2. Block Logic

Blocks link together to form the immutable ledger.

### Header Structure

The 80-byte header is similar to Bitcoin but validated differently.

- **Version** (`int32`): Upgrade tracking.
- **Prev Hash** (`32 bytes`): Hash of the previous block (Big-Endian).
- **Merkle Root** (`32 bytes`): Root of the transaction tree (Big-Endian).
- **Timestamp** (`uint32`): Unix timestamp.
- **Bits** (`uint32`): Compact difficulty target.
- **Nonce** (`uint32`): Random value for Proof-of-Work.

### Proof-of-Work
Miners must find a hash such that:
`SHA256d(Header) <= Target(Bits)`

> [!IMPORTANT]
> **Endianness Distinction**
> Standard Bitcoin treats the hash as a little-endian number for comparison. Baseline treats the hash digest as a **big-endian** number. This prevents Bitcoin ASICs from solving Baseline blocks.

## 3. Transactions

Baseline uses the UTXO (Unspent Transaction Output) model.

### Standard Scripts
Only **P2PKH** (Pay to Public Key Hash) scripts are standard and relayed.
`OP_DUP OP_HASH160 <PubKeyHash> OP_EQUALVERIFY OP_CHECKSIG`

### Fees
- **Min Relay Fee**: 5,000 liners per kB.
- **Dust**: Outputs smaller than cost-to-spend are generally discouraged.

## 4. Monetary Policy

### Subsidy
- **Initial Reward**: 50 BLINE per block.
- **Decay**: The reward decreases exponentially with a half-life of **4,158,884 blocks** (~2.64 years). This avoids the market-shock of sudden "halvings".

### Dev Fund
**1%** of the block *subsidy* is directed to a foundation address to fund ongoing development. This is a consensus rule—blocks missing this output are invalid.

## 5. Consensus Rules

1. **Coinbase Maturity**: Mined coins cannot be spent until they have **20 confirmations**.
2. **Mempool**: Only standard transactions are accepted.
