# Product Backlog — Menu Project

> **Project:** Restaurant Digital Menu & Order Management System  
> **Tech Stack:** React (Vite) + Node.js/Express + CSV Database + Docker  
> **Start Date:** 2026-02-22  
> **Total Story Points:** 89

---

## Priority Overview

| Priority  | ID    | Title                             | Labels                                                    | Estimated Duration |
| --------- | ----- | --------------------------------- | --------------------------------------------------------- | ------------------ |
| 🔴 High   | PB-01 | View Menu Categories & Items      | `frontend`, `customer`, `sprint-1`                        | 3 days             |
| 🔴 High   | PB-02 | Add Items to Cart                 | `frontend`, `customer`, `sprint-1`                        | 2 days             |
| 🔴 High   | PB-03 | View Cart Summary                 | `frontend`, `customer`, `sprint-1`                        | 2 days             |
| 🔴 High   | PB-04 | Select Table Number               | `frontend`, `customer`, `sprint-1`                        | 1 day              |
| 🔴 High   | PB-05 | Place Order                       | `frontend`, `customer`, `sprint-1`                        | 2 days             |
| 🔴 High   | PB-06 | Admin Login                       | `frontend`, `backend`, `auth`, `sprint-1`                 | 2 days             |
| 🟠 Medium | PB-07 | View Active Orders (Admin)        | `frontend`, `admin`, `sprint-1`                           | 2 days             |
| 🟠 Medium | PB-08 | Update Order Status (Admin)       | `frontend`, `admin`, `sprint-1`                           | 1 day              |
| 🟡 Low    | PB-09 | View Daily Statistics (Admin)     | `frontend`, `admin`, `sprint-1`                           | 1 day              |
| 🔴 High   | PB-10 | Data Persistence (CSV Backend)    | `backend`, `database`, `sprint-2`                         | 4 days             |
| 🔴 High   | PB-11 | Persistent Table Selection        | `frontend`, `backend`, `customer`, `sprint-2`, `sprint-3` | 3 days             |
| 🟠 Medium | PB-12 | Backend API — Authentication      | `backend`, `auth`, `sprint-2`                             | 2 days             |
| 🟠 Medium | PB-13 | Backend API — Order Management    | `backend`, `orders`, `sprint-2`                           | 3 days             |
| 🟠 Medium | PB-14 | Backend API — Table Management    | `backend`, `tables`, `sprint-2`                           | 2 days             |
| 🟡 Low    | PB-15 | Backend — Frontend Integration    | `frontend`, `backend`, `integration`, `sprint-2`          | 3 days             |
| 🟡 Low    | PB-16 | Backend Containerization (Docker) | `devops`, `docker`, `sprint-3`                            | 2 days             |
| 🟡 Low    | PB-17 | Frontend Containerization & Nginx | `devops`, `docker`, `nginx`, `sprint-3`                   | 2 days             |
| 🟡 Low    | PB-18 | Docker Compose Orchestration      | `devops`, `docker`, `sprint-3`                            | 1 day              |

---

## Detailed Backlog Items

---

### PB-01 — View Menu Categories & Items

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **ID**             | PB-01                            |
| **Title**          | View Menu Categories & Items     |
| **Labels**         | `frontend` `customer` `sprint-1` |
| **Estimated Time** | 3 days                           |
| **Priority**       | 🔴 High                          |

**Description:**  
As a Customer, I want to browse the menu by categories (e.g., Starters, Mains, Drinks) and view items listed under each category, so that I can easily find what I want to order.

**Tasks:**

- Create `ProductCard` component (item name, price, description)
- Create `MenuPage` component with category filtering logic
- Add mock product and category data in `data/products.js`
- Implement responsive grid layout for menu items

---

### PB-02 — Add Items to Cart

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **ID**             | PB-02                            |
| **Title**          | Add Items to Cart                |
| **Labels**         | `frontend` `customer` `sprint-1` |
| **Estimated Time** | 2 days                           |
| **Priority**       | 🔴 High                          |

**Description:**  
As a Customer, I want to add items from the menu to my cart and adjust quantities, so that I can build my order.

**Tasks:**

- Create `CartContext` (add / remove / update quantity)
- Add "Add to Cart" button to `ProductCard` component
- Implement quantity increment/decrement logic inside `CartContext`

---

### PB-03 — View Cart Summary

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **ID**             | PB-03                            |
| **Title**          | View Cart Summary                |
| **Labels**         | `frontend` `customer` `sprint-1` |
| **Estimated Time** | 2 days                           |
| **Priority**       | 🔴 High                          |

**Description:**  
As a Customer, I want to view my cart contents and total price at any time, so that I can verify my selection before placing an order.

**Tasks:**

- Create `CartSidebar` component (item list + total price)
- Implement total price calculation logic
- Integrate CartSidebar open/close toggle inside `MenuPage`

---

### PB-04 — Select Table Number

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **ID**             | PB-04                            |
| **Title**          | Select Table Number              |
| **Labels**         | `frontend` `customer` `sprint-1` |
| **Estimated Time** | 1 day                            |
| **Priority**       | 🔴 High                          |

**Description:**  
As a Customer, I want to select my table number during checkout, so that the staff knows where to serve the food.

**Tasks:**

- Create `TableSelectionModal` component
- Pass the selected table number to the order context

---

### PB-05 — Place Order

| Field              | Value                            |
| ------------------ | -------------------------------- |
| **ID**             | PB-05                            |
| **Title**          | Place Order                      |
| **Labels**         | `frontend` `customer` `sprint-1` |
| **Estimated Time** | 2 days                           |
| **Priority**       | 🔴 High                          |

**Description:**  
As a Customer, I want to confirm and submit my order, so that it is sent to the kitchen.

**Tasks:**

- Add "Place Order" button inside `CartSidebar`
- Create mock order submission function (console.log in Sprint 1)
- Clear the cart after a successful order is placed

---

### PB-06 — Admin Login

| Field              | Value                                  |
| ------------------ | -------------------------------------- |
| **ID**             | PB-06                                  |
| **Title**          | Admin Login                            |
| **Labels**         | `frontend` `backend` `auth` `sprint-1` |
| **Estimated Time** | 2 days                                 |
| **Priority**       | 🔴 High                                |

**Description:**  
As an Admin, I want to log in with a username and password to access the management dashboard, so that I can reach restricted areas.

**Tasks:**

- Create `AuthContext` (mock login/logout state management)
- Create Admin login form page
- Implement unauthorized access protection for the `/admin` route

---

### PB-07 — View Active Orders (Admin)

| Field              | Value                         |
| ------------------ | ----------------------------- |
| **ID**             | PB-07                         |
| **Title**          | View Active Orders (Admin)    |
| **Labels**         | `frontend` `admin` `sprint-1` |
| **Estimated Time** | 2 days                        |
| **Priority**       | 🟠 Medium                     |

**Description:**  
As an Admin, I want to view a list of all active orders (including table number, items, and total price), so that I can track current orders in real time.

**Tasks:**

- Create `OrdersTable` component (Mock UI)
- Create mock order data inside `Admin.jsx` for visualization

---

### PB-08 — Update Order Status (Admin)

| Field              | Value                         |
| ------------------ | ----------------------------- |
| **ID**             | PB-08                         |
| **Title**          | Update Order Status (Admin)   |
| **Labels**         | `frontend` `admin` `sprint-1` |
| **Estimated Time** | 1 day                         |
| **Priority**       | 🟠 Medium                     |

**Description:**  
As an Admin, I want to update the status of an order (Pending → Prepared → Served), so that I can manage the kitchen workflow.

**Tasks:**

- Add status update buttons to the `OrdersTable` component (Mock functionality)

---

### PB-09 — View Daily Statistics (Admin)

| Field              | Value                         |
| ------------------ | ----------------------------- |
| **ID**             | PB-09                         |
| **Title**          | View Daily Statistics (Admin) |
| **Labels**         | `frontend` `admin` `sprint-1` |
| **Estimated Time** | 1 day                         |
| **Priority**       | 🟡 Low                        |

**Description:**  
As an Admin, I want to see a dashboard showing total revenue and order counts, so that I can monitor the restaurant's performance.

**Tasks:**

- Create `StatsDashboard` component (Mock UI with static data)

---

### PB-10 — Data Persistence (CSV Backend)

| Field              | Value                           |
| ------------------ | ------------------------------- |
| **ID**             | PB-10                           |
| **Title**          | Data Persistence (CSV Backend)  |
| **Labels**         | `backend` `database` `sprint-2` |
| **Estimated Time** | 4 days                          |
| **Priority**       | 🔴 High                         |

**Description:**  
As a System Admin, I want order and user data to be saved to a file/database, so that data is not lost when the server restarts.

**Tasks:**

- Set up `server.js` with Express, add `cors` and `body-parser` middleware
- Create `database/` directory for CSV storage
- Implement `ensureFiles` function to initialize `user.csv`, `admin.csv`, and `order.csv`
- Implement CSV parsing and writing helper functions
- Create a default Admin user if one does not exist

---

### PB-11 — Persistent Table Selection

| Field              | Value                                                 |
| ------------------ | ----------------------------------------------------- |
| **ID**             | PB-11                                                 |
| **Title**          | Persistent Table Selection                            |
| **Labels**         | `frontend` `backend` `customer` `sprint-2` `sprint-3` |
| **Estimated Time** | 3 days                                                |
| **Priority**       | 🔴 High                                               |

**Description:**  
As a Customer, I want my table selection to be remembered and the table to be marked as occupied, so that I don't have to select it again on every visit and others know it's taken.

**Tasks:**

- Store table selection using `localStorage` or `AuthContext` to persist across reloads
- Auto-redirect users with an active table directly to the menu page (skip selection)
- Implement a "Leave Table" / "Checkout" action to clear the stored table

---

### PB-12 — Backend API — Authentication

| Field              | Value                        |
| ------------------ | ---------------------------- |
| **ID**             | PB-12                        |
| **Title**          | Backend API — Authentication |
| **Labels**         | `backend` `auth` `sprint-2`  |
| **Estimated Time** | 2 days                       |
| **Priority**       | 🟠 Medium                    |

**Description:**  
I want the system to have API endpoints for real authentication.

**Tasks:**

- `POST /api/register` — register a new customer
- `POST /api/login` — validate user and admin credentials

---

### PB-13 — Backend API — Order Management

| Field              | Value                          |
| ------------------ | ------------------------------ |
| **ID**             | PB-13                          |
| **Title**          | Backend API — Order Management |
| **Labels**         | `backend` `orders` `sprint-2`  |
| **Estimated Time** | 3 days                         |
| **Priority**       | 🟠 Medium                      |

**Description:**  
I want the system to have API endpoints for creating, listing, and updating the status of orders.

**Tasks:**

- `GET /api/orders` — retrieve order history from `order.csv`
- `POST /api/orders` — save a new order to `order.csv`
- `PUT /api/orders/:id` — update order status (Pending → Served)

---

### PB-14 — Backend API — Table Management

| Field              | Value                          |
| ------------------ | ------------------------------ |
| **ID**             | PB-14                          |
| **Title**          | Backend API — Table Management |
| **Labels**         | `backend` `tables` `sprint-2`  |
| **Estimated Time** | 2 days                         |
| **Priority**       | 🟠 Medium                      |

**Description:**  
I want the system to have API endpoints for tracking table occupancy and preventing double booking.

**Tasks:**

- `POST /api/tables/occupy` — mark a table as occupied for a specific user
- `POST /api/tables/release` — free up a table
- Validate table availability on the backend (prevent double booking)

---

### PB-15 — Backend — Frontend Integration

| Field              | Value                                         |
| ------------------ | --------------------------------------------- |
| **ID**             | PB-15                                         |
| **Title**          | Backend — Frontend Integration                |
| **Labels**         | `frontend` `backend` `integration` `sprint-2` |
| **Estimated Time** | 3 days                                        |
| **Priority**       | 🟡 Low                                        |

**Description:**  
I want the frontend to use real backend APIs instead of mock data.

**Tasks:**

- Update `AuthContext` to use real `/api/login` and `/api/register` endpoints
- Update `CartContext` to submit orders via `/api/orders`
- Update `Admin.jsx` to fetch live orders from `/api/orders`
- Implement order status update logic in the Admin dashboard using the API

---

### PB-16 — Backend Containerization (Docker)

| Field              | Value                             |
| ------------------ | --------------------------------- |
| **ID**             | PB-16                             |
| **Title**          | Backend Containerization (Docker) |
| **Labels**         | `devops` `docker` `sprint-3`      |
| **Estimated Time** | 2 days                            |
| **Priority**       | 🟡 Low                            |

**Description:**  
As a DevOps engineer, I want to run the Node.js/Express backend inside a container, so that deployment is environment-independent.

**Tasks:**

- Create `Dockerfile.server` for the Node.js/Express backend
- Configure `WORKDIR`, `COPY`, and `EXPOSE` (Port 3000) instructions
- Define `CMD` to run `server.js`

---

### PB-17 — Frontend Containerization & Nginx

| Field              | Value                                |
| ------------------ | ------------------------------------ |
| **ID**             | PB-17                                |
| **Title**          | Frontend Containerization & Nginx    |
| **Labels**         | `devops` `docker` `nginx` `sprint-3` |
| **Estimated Time** | 2 days                               |
| **Priority**       | 🟡 Low                               |

**Description:**  
As a DevOps engineer, I want to containerize the React frontend using a multi-stage Docker build and serve it via Nginx.

**Tasks:**

- Create a multi-stage `Dockerfile` for the React frontend
- **Stage 1 (Build):** Install dependencies and run `npm run build`
- **Stage 2 (Serve):** Use `nginx:alpine` to serve the static files
- Copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`
- Create `nginx.conf` for static file serving
- Configure reverse proxy for `/api` requests to the backend service

---

### PB-18 — Docker Compose Orchestration

| Field              | Value                        |
| ------------------ | ---------------------------- |
| **ID**             | PB-18                        |
| **Title**          | Docker Compose Orchestration |
| **Labels**         | `devops` `docker` `sprint-3` |
| **Estimated Time** | 1 day                        |
| **Priority**       | 🟡 Low                       |

**Description:**  
As a DevOps engineer, I want to set up Docker Compose orchestration to manage all services with a single command.

**Tasks:**

- Define `sprint3-backend` service in `docker-compose.yml`
- Define `sprint3-frontend` service in `docker-compose.yml`
- Configure **Volume Mapping** for the `database/` directory to ensure data persistence
- Define port mappings (e.g., `5173:80`, `3003:3000`)

---

## Sprint Plan (Summary)

| Sprint       | Backlog Items                                                 | Goal                                                    | Total Duration |
| ------------ | ------------------------------------------------------------- | ------------------------------------------------------- | -------------- |
| **Sprint 1** | PB-01, PB-02, PB-03, PB-04, PB-05, PB-06, PB-07, PB-08, PB-09 | Fully functional React frontend with mock data          | ~16 days       |
| **Sprint 2** | PB-10, PB-11, PB-12, PB-13, PB-14, PB-15                      | Real backend API, CSV data persistence, and integration | ~17 days       |
| **Sprint 3** | PB-16, PB-17, PB-18                                           | Fully Dockerized full-stack application                 | ~5 days        |
