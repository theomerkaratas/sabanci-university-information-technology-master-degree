# TrueBank Java Account Application

## About the Project

This project is a basic bank account management application written in Java. It supports essential banking operations such as opening accounts, depositing money, withdrawing funds, transfers, and viewing transaction history. It can be used via the console or (if you choose to extend it) through a web interface.

![Code Diagram](./code_diagram.png)


> [!TIP]
> **Source Code & Implementation:**  
> The Java source code, compiled classes, and test data are available in the [TrueBank Project Directory on GitHub](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT524/BankAccountProject).

---

## 🏛️ System Architecture & Class Hierarchy

The application models a multi-currency retail banking domain. Account state encapsulation, transaction invariants, and persistence handling are structured cleanly across dedicated service and model boundaries:

![Code Diagram](./code_diagram.png)

---

## ⚡ Key Capabilities & Features

* **Account Lifecycle Management:** Opening, closing, freezing, and status transition workflows with unique account identifiers.
* **Transaction Engine:** Real-time deposits, withdrawals, and multi-currency transfers with dynamic exchange rate evaluation.
* **Auditability & History:** Complete logging and chronological retrieval of all financial movements per account.
* **Defensive Validation:** Comprehensive balance sufficiency checks, negative amount guards, and format verification.

## Developers

- [Ömer Karataş](https://www.linkedin.com/in/theomerkaratas/)
- [Erkin Mahmatlı](https://www.linkedin.com/in/erkin-mahmatlı-a201bb19b/)
- [Onur Vatandaş](https://www.linkedin.com/in/onurvatandas/)
