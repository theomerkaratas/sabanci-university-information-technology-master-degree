# IT 553: Database Design and Management 🗄️📊

Welcome to the **IT 553: Database Design and Management** documentation section. This course in the **Master of Science in Information Technology** program at **Sabancı University** explores relational database modeling, normalization theory, transaction integrity (ACID), stored procedures, database triggers, and containerized database management.

> [!TIP]
> **Database Dumps, Triggers & Docker Stack:**  
> All SQL schema initialization scripts, data fixtures, trigger definitions, and container configurations are located in the [IT553 GitHub Directory](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT553).

---

## 🎯 Engineering Objectives & Key Implementations

The coursework and practical term deliverables centered on engineering an enterprise-grade, highly normalized relational database architecture alongside automated integrity enforcement mechanisms:

* **Relational Normalization (3NF / BCNF):** Deconstructing complex multi-attribute entities into third normal form schemas, eliminating functional update/insert/delete anomalies while preserving dependency integrity.
* **Declarative Referential Integrity:** Constructing a multi-tier foreign key hierarchy with strict `ON DELETE CASCADE` and `ON UPDATE CASCADE` constraints to safeguard referential validity across interconnected entity graphs.
* **In-Engine Business Logic via Triggers:** Implementing active `BEFORE INSERT` triggers directly within the database engine to enforce validation rules (email regex formatting, phone verification, postal code lengths) via custom `SQLSTATE '45000'` signals.
* **Dual-Schema Design:** Engineering both an enterprise ERP-style entity model (`person`) and a classic relational algebra benchmark (`reservations_system`) for query optimization.
* **Full-Stack Containerized Database Suite:** Orchestrating an isolated, reproducible database environment encompassing MySQL 8.0, web-based database administration tools (CloudBeaver and phpMyAdmin), and an Apache/PHP PDO REST query interface.

---

## 📊 Entity-Relationship Architecture (ERD)

The structural blueprint of the relational database is captured in the entity-relationship diagram below:

![Entity Relationship Diagram](./er_diagram.png)

### Architectural Analysis: The `BusinessEntity` Pattern
Rather than coupling physical addresses and contact points directly to the `Person` table, the architecture implements the **Business Entity Pattern**:
1. **Polymorphic Abstraction:** `BusinessEntity` serves as the primary root. Any individual (`Person`) or organizational contact is uniquely anchored to a `BusinessEntityID`.
2. **Associative Many-to-Many Bridge:** `BusinessEntityAddress` links entities to physical addresses (`Address`) categorized by an extensible type system (`AddressTypeID` such as Home, Office, Billing).
3. **Geographical Normalization:** Addresses are normalized up through `StateProvince` to `CountryRegion`, preventing repetitive country/state strings and enforcing standard ISO regional coding.
4. **Security & Credential Decoupling:** Authentication attributes (`PasswordSalt`, `PasswordHash`) reside in an isolated `Password` table, enforcing 1-to-1 referential separation from public profile information.

---

## ⚡ Active Database Triggers & Data Invariants

To guarantee data consistency regardless of client application logic, critical validation invariants are enforced directly at the storage engine layer using MySQL triggers:

### 1. Email Format Verification (`trg_validate_emailformat`)
Prevents malformed email insertions by enforcing basic structural RFC conventions:
```sql
CREATE TRIGGER trg_validate_emailformat
BEFORE INSERT ON EmailAddress
FOR EACH ROW
BEGIN
  IF NEW.EmailAddress NOT LIKE '%@%.%' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Invalid email address format. Email must contain "@" and "."';
  END IF;
END;
```

### 2. Postal Code Length Validation (`postalcheck`)
Validates that regional postal codes adhere strictly to standard length requirements:
```sql
CREATE TRIGGER postalcheck
BEFORE INSERT ON Address
FOR EACH ROW
BEGIN
    IF CHAR_LENGTH(NEW.PostalCode) != 5 THEN
        SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Postal code must be exactly 5 characters long.';
    END IF;
END;
```

---

## 🗂️ Data Dictionary & Schema Specifications

The project encompasses two independent relational databases:

### 1. Enterprise Schema: `person`

| Entity / Table | Primary Key | Foreign Keys | Role & Architectural Purpose |
| :--- | :--- | :--- | :--- |
| **`BusinessEntity`** | `BusinessEntityID` | — | Top-level entity anchor providing globally unique enterprise identifiers. |
| **`Person`** | `BusinessEntityID` | → `BusinessEntity` | Contains personal attributes (FirstName, LastName, PersonType, EmailPromotion). |
| **`Password`** | `BusinessEntityID` | → `Person` | Secure storage of cryptographic password hashes and unique salt values. |
| **`EmailAddress`** | `(BusinessEntityID, EmailAddressID)` | → `Person` | Multi-valued email support per individual with composite key identification. |
| **`PersonPhone`** | `(BusinessEntityID, PhoneNumber, PhoneNumberTypeID)` | → `Person`, `PhoneNumberType` | Multi-carrier phone numbers mapped to dynamic classification types. |
| **`PhoneNumberType`** | `PhoneNumberTypeID` | — | Lookup dictionary for phone classifications (Mobile, Home, Work). |
| **`Address`** | `AddressID` | → `StateProvince` | Physical geographic street addresses, cities, and postal codes. |
| **`AddressType`** | `AddressTypeID` | — | Extensible address classification types (Billing, Shipping, Office). |
| **`BusinessEntityAddress`**| `(BusinessEntityID, AddressID, AddressTypeID)` | → `BusinessEntity`, `Address`, `AddressType` | Ternary relationship resolving entity-to-address mappings. |
| **`StateProvince`** | `StateProvinceID` | → `CountryRegion` | Sub-national state/province administrative divisions and territory codes. |
| **`CountryRegion`** | `CountryRegionCode` | — | ISO standard alpha country representations. |
| **`ContactType`** | `ContactTypeID` | — | Lookup catalog defining organizational contact positions. |
| **`BusinessEntityContact`**| `(BusinessEntityID, PersonID, ContactTypeID)` | → `BusinessEntity`, `Person`, `ContactType` | Relates enterprise entities to responsible person contacts and roles. |

---

### 2. Benchmark Schema: `reservations_system`

A classical relational model designed for benchmarking complex SQL queries, multi-table cross joins, correlated subqueries, and relational algebra evaluations:

| Table | Primary Key | Foreign Keys | Description |
| :--- | :--- | :--- | :--- |
| **`Sailors`** | `sid` | — | Registered boat operators with competence ratings (1–10) and age metrics. |
| **`Boats`** | `bid` | — | Vessel inventory with unique identifiers, model names, and color identifiers. |
| **`Reserves`** | `(sid, bid, date)` | → `Sailors.sid`, `Boats.bid` | Transactional reservation schedule mapping sailor-vessel reservations across calendar dates. |

---

## 🛠️ Stack & Infrastructure Architecture

The local development and testing environment was engineered as a modular multi-container microservice stack:

| Component | Technology | Role |
| :--- | :--- | :--- |
| **RDBMS Engine** | MySQL 8.0 | Core relational storage with InnoDB ACID transactions and UTF-8 multibyte encoding. |
| **Data Initialization** | SQL Seeders (23 files) | Automated schema generation and bulk fixture insertion during container initialization. |
| **Web Admin GUI** | CloudBeaver & phpMyAdmin | Modern web interfaces for query profiling, ER browsing, and execution plan inspection. |
| **Application Layer** | Apache 2.4 + PHP 8.2 (PDO) | Containerized lightweight web server demonstrating programmatic PDO MySQL connectivity. |
