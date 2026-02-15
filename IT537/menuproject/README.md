# IT-537 FINE DINING

A modern, Dockerized fine dining menu management system. This project features a robust authentication system, real-time table availability tracking, and a server-side CSV storage engine.

## 🚀 Quick Start

Ensure you have [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) installed.

1. **Build and Run:**

   ```bash
   docker compose up -d --build
   ```

2. **Access the App:**
   Open your browser and go to [http://localhost:9999](http://localhost:9999)

## 🔑 Authentication

The system supports two types of users with separate storage:

| User Type         | Default Username | Default Password | Storage File |
| :---------------- | :--------------- | :--------------- | :----------- |
| **Administrator** | `admin`          | `admin123`       | `admin.csv`  |
| **Customer**      | `customer`       | `customer123`    | `user.csv`   |

_Customers can also register new accounts directly from the login page._

## ✨ Features

- **Dynamic Customer Menu:** Browse categories (Appetizers, Main Courses, Pizza, etc.) and add items to a live cart.
- **Table Availability Tracking:** Once checking out, the system checks live occupancy. Occupied tables are blocked for other users until the admin clears them.
- **Admin Panel:** Real-time order management. Update statuses from `pending` to `preparing`, `completed`, or `cancelled`.
- **CSV Storage Engine:** No complex database setup required. All orders, customers, and admin credentials are persisted in human-readable CSV files.
- **Dockerized Environment:** One command to spin up the entire Node.js/Express environment.

## 📁 Project Structure

- `index.html`: Main customer terminal menu.
- `admin.html`: Administrative order tracking dashboard.
- `login.html`: Unified authentication portal.
- `server.js`: Express.js backend handling API requests and CSV I/O.
- `dataManager.js`: Client-side API wrapper with local storage fallbacks.
- `style.css`: Modern, dark-themed responsive design.
- `order.csv`: Transactional order history.
- `user.csv`: Customer account database.
- `admin.csv`: Secured administrator credentials.

## 🛠 Built With

- **Backend:** Node.js, Express.js
- **Frontend:** Vanilla JS, HTML5, CSS3
- **DevOps:** Docker, Docker Compose
- **Data:** CSV (Static File Persistence)

---

_Developed for Sabancı University IT-537 Fine Dining Project._
