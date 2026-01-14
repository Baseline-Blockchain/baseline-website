---
layout: docs
title: Mining Guide
permalink: /docs/mining/
---

# How to Mine Baseline Cash

Baseline Cash is designed to be mined with consumer hardware (CPUs and GPUs). It implements a modified version of the SHA256d proof-of-work protocol:

> [!TIP]
> **No ASICs?**
> Standard Bitcoin ASICs fail because Baseline forces **Big-Endian byte order** for the `prev_hash` and `merkle_root` fields.
> - Bitcoin: Little-Endian
> - Baseline: Big-Endian
> This simple protocol change invalidates existing ASIC hardware.

## 1. Get a Miner

The official reference miner supports both CPU and GPU mining.

**[Download baseline-miner](https://github.com/Baseline-Blockchain/baseline-miner)** (Python-based)

To install via pip:
```bash
pip install git+https://github.com/Baseline-Blockchain/baseline-miner.git
```

## 2. Connect to a Pool

Most users should mine to a public pool for steady rewards.

### Command Line
Run the miner pointing to a pool's address. You need a **Baseline Address** to receive rewards.

```bash
baseline-miner --gpu \
  --host pool.baseline.cash --port 3333 \
  --address YOUR_ADDRESS_HERE \
  --worker my-gaming-pc
```

| Flag | Description |
|------|-------------|
| `--gpu` | Enable GPU mining (fastest). Omit for CPU only. |
| `--host` | The domain or IP of the mining pool. |
| `--port` | Usually 3333. |
| `--address` | **Required**. Your BLINE address where payouts go. |
| `--worker` | Optional name to track this specific machine. |

## 3. Solo Mining

If you want to mine directly to your own node (and keep 100% of the block reward), you can run a local pool.

1. **Configure your node**:
   Set a `mining.pool_private_key` in your node's `config.json`. This enables the internal Stratum server.
   *(See [Run a Pool](/docs/pool/) for details)*.

2. **Point your miner locally**:
   ```bash
   baseline-miner --gpu \
     --host 127.0.0.1 --port 3333 \
     --address YOUR_ADDRESS_HERE \
     --worker local-worker
   ```

## FAQ

**What hardware is best?**
Modern Nvidia and AMD GPUs perform best. High-core-count CPUs (Ryzen / Threadripper) are also effective.

**Can I dual mine?**
Yes, the miner is lightweight. However, GPU mining will use significant power.

**How often are blocks found?**
The network targets a block every **20 seconds**. This is 30x faster than Bitcoin, so finding blocks (and variance) happens much quicker.
