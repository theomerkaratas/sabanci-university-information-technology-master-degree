<div style="background-color: white; color: #1a1a1a; padding: 30px; border-radius: 10px; font-family: sans-serif;" markdown="1">

# IT537 Practices

This directory contains various practice projects for the IT537 course. Each project is dockerized and can be run either collectively or individually.

## Content Overview

| Practice                       | Description                            | Port |
| :----------------------------- | :------------------------------------- | :--- |
| [**Practice 1**](./practice-1) | The Twelve-Factor App                  | 8001 |
| [**Practice 2**](./practice-2) | CSS Flag Project                       | 8002 |
| [**Practice 3**](./practice-3) | Responsiveness                         | 8003 |
| [**Practice 4**](./practice-4) | CSS Layout Techniques (Float, Flex...) | 8004 |
| [**Practice 5**](./practice-5) | Flexbox Layout Examples                | 8005 |
| [**Practice 6**](./practice-6) | Grid Sizing Fundamentals               | 8006 |

---

## How to Use

### Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

### Option 1: Running a Specific Practice (Recommended)

To save system resources, it is recommended to run only the practice you are currently working on. Each practice has its own `docker-compose.yml` file.

1.  **Navigate** to the specific practice directory (e.g., `practice-1`):

    ```bash
    cd IT537/Practices/practice-1
    ```

2.  **Start** the container:

    ```bash
    docker compose up -d
    ```

3.  **Access** it in your browser using the corresponding port (e.g., [http://localhost:8001](http://localhost:8001)).

4.  **Stop** the container when finished:
    ```bash
    docker compose down
    ```

---

### Option 2: Running All Projects Simultaneously

If you need to have all practices available at once, you can use the root `docker-compose.yml` file. Note that this will lift 40 containers and may significantly impact system performance.

1.  **Navigate** to the root practices directory:

    ```bash
    cd IT537/Practices
    ```

2.  **Toggle on** all services:

    ```bash
    docker compose up -d
    ```

3.  **Toggle off** all services:
    ```bash
    docker compose down
    ```

</div>
