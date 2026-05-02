# SEC509 Laboratory 3: Elasticsearch Honeypots

This repository contains the configuration and implementation for Lab 3 of the SEC509 course. The objective of this laboratory is to deploy, configure, and analyze multiple Elasticsearch honeypots to capture and log malicious activities.

## Project Overview

In this lab, three different Elasticsearch honeypots were deployed and evaluated:
1. **Elastichoney**: A Go-based honeypot designed to mimic an Elasticsearch instance.
2. **ElasticPot**: A Python-based honeypot providing similar functionality.
3. **HoneyPHP (Custom)**: A custom-developed "Enhanced Elasticsearch Honeypot v2.0" written in PHP that combines features from both Elastichoney and ElasticPot.

## Files in this Repository

- `index.php`: The custom PHP implementation of the Elasticsearch honeypot.
- `history.txt`: Complete command history showing the environment setup and deployment steps.
- `omerkaratas_lab4.pdf`: Detailed laboratory report and analysis. (Note: Labeled as Lab 4 in the document, but part of the Lab 3 folder workflow).
- `README.md`: This documentation file.

## Features of HoneyPHP (Custom)

The `HoneyPHP` implementation (v2.0) serves as an enhanced honeypot running on port **9500**. Key features include:
- **Comprehensive Endpoint Simulation**: Mimics root (`/`), `/_cluster/health`, `/_nodes`, and `/_search` endpoints.
- **RCE Detection**: Specifically identifies and logs potential Remote Code Execution (RCE) attempts involving script injections (Painless, script, eval).
- **Index Simulation**: Responds to index-specific queries and provides simulated metadata.
- **Detailed Logging**: Logs IP addresses, request types, and raw body content to `/var/log/honeyphp/`.

## Setup and Deployment

### 1. Prerequisites
The environment requires Go, Python 3, and PHP. You can install all dependencies using:
```bash
sudo apt update && sudo apt install -y golang python3-pip php-cli git screen curl jq
```

### 2. Custom PHP Honeypot (HoneyPHP)
- **Deployment**: The `index.php` file is served using the built-in PHP server.
- **Systemd Service**: A service is configured to ensure high availability.
```bash
sudo systemctl enable honeyphp
sudo systemctl start honeyphp
```
- **Logs**:
  - Main Log: `/var/log/honeyphp/honeyphp.log`
  - Detailed Log: `/var/log/honeyphp/honeyphp_detailed.log`

### 3. Elastichoney & ElasticPot
- **Elastichoney** is configured to run on port 9300 (to avoid conflicts) and is started via `screen`.
- **ElasticPot** is running within a Python virtual environment and is also managed via `screen`.

## Logging Analysis

Each honeypot logs data in its respective format. The `history.txt` file contains the sequence of commands used to monitor these logs and verify the honeypots' functionality.

---
*Created by Ömer Karataş as part of the Sabancı University Information Technology Master's Degree Program.*
