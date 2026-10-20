# IT 537: Interactive Front-End Programming 🌐🎨

Welcome to the **IT 537: Interactive Front-End Programming** documentation section. This course in the **Master of Science in Information Technology** program at **Sabancı University** delivers practical, hands-on training across the modern web development ecosystem—ranging from semantic markup and responsive CSS layout engines to asynchronous JavaScript, modern utility frameworks, and component-driven web architectures.

> [!TIP]
> **Source Code, Live Demos & Docker Environments:**  
> All project source code, Docker Compose files, Express backend scripts, and frontend assets are located in the [IT537 GitHub Directory](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537).

---

## 🍽️ Term Project: Fine Dining Menu & Table Management System

A modern, containerized full-stack restaurant management web application. The platform integrates dual-role authentication, dynamic customer menu ordering, real-time table availability tracking, and a lightweight, server-side CSV persistence engine.

> 💻 **Source Code:** [IT537/menuproject on GitHub ↗](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537/menuproject)

### Core Architectural Features

* **Dynamic Customer Menu:** An interactive menu interface allowing customers to filter items across categories (Appetizers, Main Courses, Pizzas, Desserts) and add selections to a live reactive shopping cart.
* **Real-Time Table Availability Tracking:** When checking out, the system checks live table occupancy. Selected tables are dynamically locked to prevent double-booking until cleared by restaurant staff.
* **Administrative Control Dashboard:** A dedicated order-tracking interface enabling staff to review incoming orders and update preparation lifecycles in real time (`pending` → `preparing` → `completed` → `cancelled`).
* **CSV Storage Engine:** Avoids complex database setup requirements by maintaining all transactional orders, customer accounts, and administrator credentials in human-readable, persistent CSV files (`order.csv`, `user.csv`, `admin.csv`).
* **Containerized Environment:** Fully dockerized with multi-container orchestration for the client interface, API server, and static assets.

### Technology Stack & Architecture

| Layer | Technologies | Role & Purpose |
| :--- | :--- | :--- |
| **Frontend** | Vanilla JavaScript (ES6+), HTML5, Modern CSS3 | Component rendering, reactive client state, and responsive styling |
| **Backend** | Node.js, Express.js | REST API routing, authentication handling, and CSV file I/O |
| **Persistence** | File-based CSV Storage | Lightweight, zero-dependency transactional data storage |
| **DevOps** | Docker, Docker Compose | One-command isolated application provisioning |

---

## 🚀 Hands-on Front-End Practices (Dockerized Lab Modules)

A progressive series of hands-on laboratory exercises exploring foundational web layout algorithms, responsive typography, and CSS design patterns:

> 💻 **Source Code:** [IT537/Practices on GitHub ↗](https://github.com/theomerkaratas/sabanci-university-information-technology-master-degree/tree/main/IT537/Practices)

| Practice | Focus & Concepts | Description | Local Port |
| :--- | :--- | :--- | :---: |
| **Practice 1** | **Twelve-Factor App Methodology** | Containerized micro-frontend architecture adhering to 12-factor cloud-native guidelines. | `:8001` |
| **Practice 2** | **CSS Flag Project** | Exact visual geometry, relative/absolute positioning, and flag composition using pure CSS. | `:8002` |
| **Practice 3** | **Responsive Design Fundamentals** | Viewport breakpoints, media queries, and fluid typography for multi-device compatibility. | `:8003` |
| **Practice 4** | **Classical CSS Layout Techniques** | Comparative analysis of legacy `float` clearance, `inline-block`, and box model alignment. | `:8004` |
| **Practice 5** | **Flexbox Deep-Dive** | 1D alignment, distribution axis (`justify-content`, `align-items`), and flex wrapping rules. | `:8005` |
| **Practice 6** | **CSS Grid Sizing Fundamentals** | 2D track sizing, fractional `fr` units, `minmax()` constraints, and grid template areas. | `:8006` |

---

## 📄 Interactive Web Resume

As an applied demonstration of the front-end concepts mastered throughout the course, a production-grade personal portfolio was engineered:

👉 **[Launch Interactive Resume Website ↗](https://theomerkaratas.github.io/resume/)**

* **Highlights:** Mobile-first responsive layouts, dynamic dark/light theme switching, simulated terminal typing animations, and live LinkedIn profile integration.
