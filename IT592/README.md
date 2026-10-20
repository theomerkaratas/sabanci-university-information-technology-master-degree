# IT 592 – Graduation Project ☁️

Welcome to the **IT 592: Graduation Project** course directory!

This directory contains the documentation, overview, and report for the master's graduation project completed as part of the **Sabancı University M.S. in Information Technology** program.

---

## 🚀 Graduation Project: Free Cloud Initiative (FCI)

- **GitHub Organization**: [github.com/freecloudinitiative](https://github.com/freecloudinitiative)
- **Author**: Ömer Faruk Karataş
- **Full Report**: [📄 Read the Graduation Project Report](./graduation_report.md)
- **Official Report (PDF)**: [📥 Download Signed Report (PDF)](./omer_karatas_report.pdf)

**Free Cloud Initiative (FCI)** is an open-source, self-hosted cloud platform built on a bare-metal Kubernetes cluster composed of seven ARM64 Raspberry Pi 5 single-board computers. The project breaks down commercial cloud primitives into lightweight, container-native abstractions designed for education, developer community experimentation, and platform engineering demonstrations.

---

## 🛠️ Architecture & Core Components

| Component / Layer | Technology Stack | Description |
| ----------------- | ---------------- | ----------- |
| **Control Plane** | Go, REST, WebSocket, JWT | Microservices for compute, IAM, storage, database, and terminal access |
| **Data & Persistence** | PostgreSQL & Garage S3 | CloudNativePG (CNPG) operator and S3-compatible distributed object storage |
| **Cluster & Hardware** | 7x Raspberry Pi 5 (ARM64), K3s | Bare-metal, resource-efficient Kubernetes distribution |
| **GitOps & Delivery** | Argo CD, Helm, GitHub Actions | Declarative App-of-Apps GitOps reconciliation and multi-arch CI/CD pipelines |
| **Edge & Security** | Cloudflare Zero Trust, OpenBAO | Automated edge ingress via tunnels, OIDC auth, and secret management |
| **Observability** | Prometheus, Grafana, Loki, Tempo | Full-stack metrics, distributed tracing, and centralized logging |

---

## 📖 Full Documentation

For the complete in-depth academic and technical details, including requirement specifications, schema designs, microservice implementations, and performance analysis, refer to:

👉 **[Graduation Project Report: Free Cloud Initiative (Web / Markdown)](./graduation_report.md)**  
👉 **[Official Graduation Project Report (Signed PDF)](./omer_karatas_report.pdf)**

