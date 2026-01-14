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

The recommended way to run a node is to clone the repository and install it in a virtual environment.

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Baseline-Blockchain/baseline-node.git
    cd baseline-node
    ```

2.  **Set up Python Environment**:
    ```bash
    python -m venv .venv
    
    # Windows
    .venv\Scripts\activate
    
    # Linux / macOS
    source .venv/bin/activate
    ```

3.  **Install**:
    ```bash
    pip install -e .
    ```

## Configuration

Before running the node, you need to configure it. The repository includes a `config.json` file which you should edit.

**Key Settings:**
-   **RPC Password**: You **must** change the `rpc.password` to something secure.
-   **Peers**: The default `config.json` includes mainnet seeds.

**Minimal Example:**

```json
{
  "p2p": {
    "port": 9333,
    "max_peers": 64
  },
  "rpc": {
    "enabled": true,
    "username": "rpcuser",
    "password": "YOUR_SECURE_PASSWORD"
  }
}
```

> [!TIP]
> **Mining Support**
> Every Baseline node is also a mining pool! If you want to mine, see the [Pool Guide](/docs/pool/).

## Running the Node

Once configured, start the node:

```bash
baseline-node --config config.json
```

The node will initialize the blockchain database (Chainstate) and begin syncing.

### Checking Status

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

## Troubleshooting

### Resync from Scratch

If your chainstate is corrupted or you need to resync from genesis, use the `--reset-chainstate` flag. This wipes the blockchain data and peers but **keeps your wallet and payout keys safe**.

```bash
baseline-node --config config.json --reset-chainstate
```
