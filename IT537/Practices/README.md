<div style="background-color: white; color: #1a1a1a; padding: 30px; border-radius: 10px; font-family: sans-serif;" markdown="1">

# IT537 Practices

This directory contains various practice projects for the IT537 course. Each project is dockerized and can be run either collectively or individually.

## Content Overview

| Practice                         | Description                            | Port |
| :------------------------------- | :------------------------------------- | :--- |
| [**Practice 1**](./practice-1)   | Personal CV / Resume of Omer Karatas   | 8001 |
| [**Practice 2**](./practice-2)   | The Twelve-Factor App                  | 8002 |
| [**Practice 3**](./practice-3)   | CSS Flag Project                       | 8003 |
| [**Practice 4**](./practice-4)   | Responsiveness                         | 8004 |
| [**Practice 5**](./practice-5)   | Agency                                 | 8005 |
| [**Practice 6**](./practice-6)   | CSS Layout Techniques (Float, Flex...) | 8006 |
| [**Practice 7**](./practice-7)   | Flexbox Layout Examples                | 8007 |
| [**Practice 8**](./practice-8)   | Flexbox Pricing Table                  | 8008 |
| [**Practice 9**](./practice-9)   | Grid Sizing Fundamentals               | 8009 |
| [**Practice 10**](./practice-10) | Mondrian Project                       | 8010 |
| [**Practice 11**](./practice-11) | Modern Resume with Tailwind CSS        | 8011 |
| [**Practice 12**](./practice-12) | Project Template                       | 8012 |
| [**Practice 13**](./practice-13) | Project Template                       | 8013 |
| [**Practice 14**](./practice-14) | Project Template                       | 8014 |
| [**Practice 15**](./practice-15) | Project Template                       | 8015 |
| [**Practice 16**](./practice-16) | Project Template                       | 8016 |
| [**Practice 17**](./practice-17) | Project Template                       | 8017 |

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
