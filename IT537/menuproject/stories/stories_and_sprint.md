# User Stories & Sprint Tasks

This document outlines the 10 core user stories for the menu project and the specific tasks planned for Sprint 1.

## 11 User Stories

1.  **View Menu Categories & Items**
    - **As a** Customer,
    - **I want to** browse the menu by categories (e.g., Starters, Mains, Drinks),
    - **So that** I can easily find what I want to order.

2.  **Add Items to Cart**
    - **As a** Customer,
    - **I want to** add items to my shopping cart and adjust quantities,
    - **So that** I can build my order.

3.  **View Cart Summary**
    - **As a** Customer,
    - **I want to** view my cart contents and total price at any time,
    - **So that** I can verify my selection before ordering.

4.  **Select Table Number**
    - **As a** Customer,
    - **I want to** select my table number during checkout,
    - **So that** the staff knows where to serve the food.

5.  **Place Order**
    - **As a** Customer,
    - **I want to** confirm and place my order,
    - **So that** it is sent to the kitchen.

6.  **Admin Login**
    - **As an** Admin,
    - **I want to** log in with a username and password,
    - **So that** I can access the restricted management dashboard.

7.  **View Active Orders (Admin)**
    - **As an** Admin,
    - **I want to** view a list of all active orders including table number, items, and total price,
    - **So that** I can track current orders.

8.  **Update Order Status**
    - **As an** Admin,
    - **I want to** update the status of an order (e.g., Pending -> Prepared -> Served),
    - **So that** I can manage the kitchen workflow.

9.  **View Daily Statistics**
    - **As an** Admin,
    - **I want to** see a dashboard with total revenue and order counts,
    - **So that** I can monitor the restaurant's performance.

10. **Data Persistence**
    - **As a** System Admin,
    - **I want** order and user data to be saved to a file/database,
    - **So that** data is not lost when the server restarts.

11. **Persistent Table Selection**
    - **As a** Customer,
    - **I want** my table selection to be remembered and marked as occupied,
    - **So that** I don't have to select it again until I checkout and others know it's taken.

---

## Tasks for Sprint 1

### Story 1: View Menu Categories & Items

- [ ] Create `ProductCard` component to display individual menu items.
- [ ] Create `MenuPage` with category filtering logic.
- [ ] Create `data/products.js` with mock data for categories and products.
- [ ] Implement responsive grid layout for menu items.

### Story 2: Add Items to Cart

- [ ] Implement `CartContext` to handle adding/removing items.
- [ ] Add "Add to Cart" button in `ProductCard`.
- [ ] Implement quantity adjustment logic in `CartContext`.

### Story 3: View Cart Summary

- [ ] Create `CartSidebar` component for managing selected items.
- [ ] Implement cart total calculation logic.
- [ ] Integrate Cart Sidebar toggle in `MenuPage`.

### Story 4: Select Table Number

- [ ] Create `TableSelectionModal` for capturing table info.
- [ ] Pass table number to order context.

### Story 5: Place Order

- [ ] Implement place order button in `CartSidebar`.
- [ ] Create mock order submission function (console log or local state update).
- [ ] Clear cart after successful order placement.

### Story 6: Admin Login

- [ ] Implement `AuthContext` to manage mock user login/logout state.
- [ ] Create simple login form for Admin access.
- [ ] Implement restricted route protection for `/admin`.

### Story 7: View Active Orders (Admin)

- [ ] Create `OrdersTable` component (Mock UI).
- [ ] Create mock order data in `Admin.jsx` for visualization.

### Story 8: Update Order Status

- [ ] Add status update buttons to `OrdersTable` (Mock functionality).

### Story 9: View Daily Statistics

- [ ] Create `StatsDashboard` component (Mock UI with static data).

### Story 11: Persistent Table Selection (Frontend)

- [ ] Store selected table in `localStorage` or `AuthContext` to persist across reloads.
- [ ] Auto-redirect users with an active table to the menu page (skip selection).
- [ ] Implement "Leave Table" or "Checkout" action to clear stored table.

### Infrastructure & Setup

- [x] Initialize React project using Vite.
- [x] Install dependencies (`react-router-dom`, `lucide-react`, etc.).
- [x] Configure basic styling (CSS Variables, Reset).
- [ ] Configure React Router (`/main`, `/admin`).

## Tasks for Sprint 2

**Goal:** Implement Backend API, Real Data Persistence, and Frontend Integration.

### Backend Setup (Node.js & Express)

- [ ] Initialize `server.js` with Express.
- [ ] Configure `cors` and `body-parser` middleware.
- [ ] Create `database` directory for CSV storage.

### Data Persistence (CSV)

- [ ] Implement `ensureFiles` function to initialize `user.csv`, `admin.csv`, and `order.csv`.
- [ ] Implement CSV parsing and writing helper functions.
- [ ] Create default Admin user if not exists.

### Authentication API

- [ ] Implement `POST /api/register` for new customer registration.
- [ ] Implement `POST /api/login` for validating User and Admin credentials.

### Order Management API

- [ ] Implement `GET /api/orders` to retrieve history from `order.csv`.
- [ ] Implement `POST /api/orders` to save new orders to `order.csv`.
- [ ] Implement `PUT /api/orders/:id` to update order status (e.g., Pending -> Served).

### Table Management API (Story 11)

- [ ] Implement `POST /api/tables/occupy` to mark table as occupied for a specific user.
- [ ] Implement `POST /api/tables/release` to free up the table.
- [ ] Validate table availability (prevent double booking) in backend.

### Frontend Integration

- [ ] Update `AuthContext` to use real `/api/login` and `/api/register` endpoints.
- [ ] Update `CartContext` to submit orders via `/api/orders`.
- [ ] Update `Admin.jsx` to fetch live orders from `/api/orders`.
- [ ] Implement order status update logic in Admin Dashboard using the API.

## Tasks for Sprint 3

**Goal:** Dockerize the application and set up orchestration.

### Backend Containerization

- [ ] Create `Dockerfile.server` for Node.js/Express backend.
- [ ] Configure `WORKDIR`, `COPY`, and `EXPOSE` (Port 3000) instructions.
- [ ] Define `CMD` to run `server.js`.

### Frontend Containerization & Nginx

- [ ] Create multi-stage `Dockerfile` for React frontend.
- [ ] **Stage 1 (Build):** Install dependencies and run `npm run build`.
- [ ] **Stage 2 (Serve):** Use `nginx:alpine` to serve static files.
- [ ] Copy `nginx.conf` to `/etc/nginx/conf.d/default.conf`.

### Nginx Configuration

- [ ] Create `nginx.conf` to handle static file serving.
- [ ] Configure reverse proxy for `/api` requests to backend service.

### Orchestration (Docker Compose)

- [ ] Define `sprint3-backend` service in `docker-compose.yml`.
- [ ] Define `sprint3-frontend` service in `docker-compose.yml`.
- [ ] Configure **Volume Mapping** for `database` directory to ensure data persistence.
- [ ] Define port mappings (e.g., `5173:80`, `3003:3000`).
