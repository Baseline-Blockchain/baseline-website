---
layout: docs
title: Networking
permalink: /docs/networking/
---



Baseline nodes communicate via a TCP-based peer-to-peer protocol.

## Ports

| Service | Port | Description |
|---------|------|-------------|
| **P2P** | `9333` | Main network synchronization. Open this firewall port. |
| **RPC** | `8832` | Local API control. **Keep closed/internal**. |
| **Stratum** | `3333` | Mining worker connection. Open if running a public pool. |

## Peer Discovery

When you start a node, it finds peers using:
1.  **Manual Seeds**: Defined in your `config.json` under `network.seeds`.
2.  **DNS Seeds**: Optional hostnames in `network.dns_seeds` (queried if manual seeds/address book are insufficient).
3.  **Address Book + Gossip**: The node persists known peers on disk and also learns more via `addr` gossip.

### Configuration

For a first-time startup on a new data directory, configure at least one seed (manual or DNS) to join the public network:

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

- **Banning**: Repeated violations trigger progressive bans (up to 24 hours).
- **Handshake**: Peers exchange version messages to ensure protocol compatibility.
- **Time Sync**: The node maintains an NTP-based time offset (does not change system time) using the servers in `ntp.servers`.
