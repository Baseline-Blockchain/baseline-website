---
layout: docs
title: Governance
permalink: /docs/governance/
---



Baseline Cash is a decentralized project. There is no CEO or central server. Governance happens through code and consensus.

## Upgrade Process

Baseline ships a **version-bits signaling framework** for upgrades. Specific upgrades (bit, threshold, window, activation height/time) are defined in code when scheduled.

1.  **Draft**: A proposal is written and shared for community discussion.
2.  **Code**: Once agreed upon, code is implemented and tested.
3.  **Signaling**: Miners signal support using version bits in block headers.
4.  **Activation**: When the configured threshold is met for the defined window, the upgrade locks in and activates.

## The Foundation

There is a consensus-coded **Dev Fund** (1% of block rewards).
- **Purpose**: Funding infrastructure, security audits, and core development.
- **Transparency**: All fund movements are on-chain.
- **Limits**: The foundation cannot change consensus rules; only miners can enforce upgrades.

## For Operators

As a node operator, you vote with your version.
- **Stay Updated**: Run the latest stable release when upgrades are announced.
