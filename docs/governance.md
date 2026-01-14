---
layout: docs
title: Governance
permalink: /docs/governance/
---



Baseline Cash is a decentralized project. There is no CEO or central server. Governance happens through code and consensus.

## Upgrade Process (BIPs)

Significant changes follow the **Baseline Improvement Proposal (BIP)** process:

1.  **Draft**: A proposal is written and shared for community discussion (GitHub/Discord).
2.  **Code**: Once agreed upon, code is implemented and tested.
3.  **Signaling**: Miners signal support for the upgrade using **Version Bits** in block headers.
4.  **Activation**: If >95% of hashpower signals support, the upgrade locks in and activates automatically.

## The Foundation

There is a consensus-coded **Dev Fund** (1% of block rewards).
- **Purpose**: Funding infrastructure, security audits, and core development.
- **Transparency**: All fund movements are on-chain.
- **Limits**: The foundation cannot change consensus rules; only miners can enforce upgrades.

## For Operators

As a node operator, you vote with your version.
- **Stay Updated**: Run the latest stable release.
- **Check Logs**: Your node will warn you if the network initiates an upgrade you don't recognize.
