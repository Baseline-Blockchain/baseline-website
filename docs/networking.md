---
layout: docs
title: Networking
permalink: /docs/networking/
---

# Networking

Baseline nodes communicate via a TCP-based peer-to-peer protocol.

## Ports

| Service | Port | Description |
|---------|------|-------------|
| **P2P** | `9333` | Main network synchronization. Open this firewall port. |
| **RPC** | `8832` | Local API control. **Keep closed/internal**. |
| **Stratum** | `3333` | Mining worker connection. Open if running a public pool. |

## Peer Discovery

When you start a node, it finds peers using:
1.  **Manual Seeds**: Defined in your `config.json` under `network.seeds`. This is the primary method for bootstrapping.
2.  **Gossip**: Once connected, peers share known addresses with each other.

> [!NOTE]
> **No DNS Seeds**
> There are currently no active DNS seeds. You must rely on the manual seed list to bootstrap.

### Configuration

You must configure at least one seed in `config.json` to join the network:

```json
"network": {
  "host": "0.0.0.0",
  "port": 9333,
  "max_peers": 64,
  "min_peers": 8,
  "seeds": ["109.104.154.151:9333"]
}
```

> [!TIP]
> **Running in Docker?**
> Ensure port `9333` is mapped (`-p 9333:9333`) so your node can accept incoming connections and help the network.

## Protocol Security

- **Banning**: Nodes that send invalid data or spam are banned for **24 hours**.
- **Handshake**: Peers exchange version messages to ensure protocol compatibility.
- **Time Sync**: The node uses a built-in NTP client to **actively synchronise** its internal clock with pool.ntp.org. This ensures accurate block timestamps and prevents consensus issues effectively overriding the system time for node operations.
