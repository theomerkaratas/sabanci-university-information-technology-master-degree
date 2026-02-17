# User Stories & Sprint Tasks

## 10 User Stories

1.  **View Menu Categories & Items**
    _As a Customer, I want to browse the menu by categories (e.g., Starters, Mains, Drinks) so that I can easily find what I want to order._
    _(Status: Implemented in Sprint 1 via Mock Data)_

2.  **Add Items to Cart**
    _As a Customer, I want to add items to my shopping cart and adjust quantities so that I can build my order._
    _(Status: Implemented in Sprint 1 via Context)_

3.  **View Cart Summary**
    _As a Customer, I want to view my cart contents and total price at any time to verify my selection before ordering._
    _(Status: Implemented in Sprint 1 via Sidebar)_

4.  **Select Table Number**
    _As a Customer, I want to select my table number during checkout so that the staff knows where to serve the food._
    _(Status: Implemented in Sprint 1 via Modal)_

5.  **Place Order**
    _As a Customer, I want to confirm and place my order so that it is sent to the kitchen._
    _(Status: UI in Sprint 1, Backend integration in Sprint 2)_

6.  **Admin Login**
    _As an Admin, I want to log in with a username and password so that I can access the restricted management dashboard._
    _(Status: Mock Auth in Sprint 1, Real Auth in Sprint 2)_

7.  **View Active Orders (Admin)**
    _As an Admin, I want to view a list of all active orders including table number, items, and total price._
    _(Status: Mock Data in Sprint 1, Real Data in Sprint 2)_

8.  **Update Order Status**
    _As an Admin, I want to update the status of an order (e.g., Pending -> Prepared -> Served) to manage the kitchen workflow._
    _(Status: Console log in Sprint 1, API call in Sprint 2)_

9.  **View Daily Statistics**
    _As an Admin, I want to see a dashboard with total revenue and order counts to monitor the restaurant's performance._
    _(Status: Static UI in Sprint 1)_

10. **Data Persistence**
    _As a System Admin, I want order and user data to be saved to a file/database so that data is not lost when the server restarts._
    _(Status: Sprint 2 Feature)_

---

## Tasks for Sprint 1

**Goal:** Create a functional Frontend Prototype with Mock Data.

### 1. Project Setup

- [x] Initialize React project using Vite.
- [x] Install dependencies (`react-router-dom`, `lucide-react`, etc.).
- [x] Configure basic styling (CSS Variables, Reset).

### 2. Core Components & UI

- [ ] Create `ProductCard` component to display individual menu items.
- [ ] Create `CartSidebar` component for managing selected items.
- [ ] Create `TableSelectionModal` for capturing table info.
- [ ] Design main layout (Header, Navigation, Responsive Grid).

### 3. State Management (Context)

- [ ] Implement `AuthContext` to manage mock user login/logout state.
- [ ] Implement `CartContext` to handle adding/removing items and calculating totals.

### 4. Pages Implementation

- [ ] **Menu Page:**
  - Implement Category filtering logic.
  - Render Product Cards based on selection.
  - Integrate Cart Sidebar toggle.
- [ ] **Admin Page:**
  - Create restricted route protection (check `AuthContext`).
  - Build `StatsDashboard` component (Mock UI).
  - Build `OrdersTable` component (Mock UI).

### 5. Data & Mocking

- [ ] Create `data/products.js` with a list of categories and products.
- [ ] Create mock order data in `Admin.jsx` for visualization.

### 6. Navigation

- [ ] Configure React Router (`/main`, `/admin`).
- [ ] Implement redirection (Root `/` -> `/main`).
