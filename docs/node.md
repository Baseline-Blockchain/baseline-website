---
layout: docs
title: Run a Node
permalink: /docs/node/
---

Running a full node is the best way to support the network and ensure your own financial sovereignty. Full nodes validate every transaction and block, enforcing the consensus rules without trusting third parties.

## Requirements

-   **OS**: Windows, Linux, or macOS.
-   **Python**: 3.12 or newer.
-   **Storage**: ~10 GB (Growing with chain size).
-   **RAM**: 4 GB minimum.

## Installation

The easiest way to install Baseline is via `pip`.

```bash
pip install git+https://github.com/Baseline-Blockchain/baseline-node.git
```

## Running the Node

Once installed, you can start the node with a single command:

```bash
baseline-node
```

The first time you run it, it will:
1.  Create a data directory in `~/.baseline` (Linux/Mac) or `%USERPROFILE%\.baseline` (Windows).
2.  Generate a `config.json` with default settings.
3.  Start synchronizing with the network.

### Checking Status

You can verify your node is running by querying the block count:

```bash
# In a new terminal
baseline-cli getblockcount
```

If it returns a number (e.g., `15420`), your node is active!

## Configuration

You can customize your node by editing `config.json` in your data directory.

**Common Settings:**

```json
{
  "p2p": {
    "port": 9333,
    "max_peers": 64
  },
  "rpc": {
    "enabled": true,
    "username": "rpcuser",
    "password": "rpcpass" # CHANGE THIS!
  }
}
```

> [!TIP]
> **Mining Support**
> Every Baseline node is also a mining pool! If you want to mine, see the [Pool Guide](/docs/pool/).

## SystemD (Linux Service)

To keep your node running in the background, create a systemd service:

`/etc/systemd/system/baseline.service`:

```ini
[Unit]
Description=Baseline Node
After=network.target

[Service]
User=youruser
ExecStart=/usr/local/bin/baseline-node
Restart=always
Type=simple

[Install]
WantedBy=multi-user.target
```

Enable and start it:

```bash
sudo systemctl enable baseline
sudo systemctl start baseline
```
