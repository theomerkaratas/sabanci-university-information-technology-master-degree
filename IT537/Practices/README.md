# IT537 Practices

This directory contains various practice projects for the IT537 course, dockerized for easy deployment.

## Content Overview

| Practice       | Description                             | Port |
| :------------- | :-------------------------------------- | :--- |
| **Practice 1** | Personal CV / Resume of Omer Karatas    | 8081 |
| **Practice 2** | A creative "Space Sandwich Recipe" page | 8082 |
| **Practice 3** | Simple Test Page 3                      | 8083 |
| **Practice 4** | Simple Test Page 4                      | 8084 |
| **Practice 5** | Simple Test Page 5                      | 8085 |

## How to Use

This project uses **Docker** and **Docker Compose** to run all practice sites simultaneously.

### Prerequisites

- Docker
- Docker Compose

### Running the Projects

1.  Open your terminal and navigate to this directory:

    ```bash
    cd IT537/Practices
    ```

2.  Start the containers depending on your Docker Compose version:

    **For newer Docker Compose (v2+):**

    ```bash
    docker compose up -d
    ```

    **For older Docker Compose (v1):**

    ```bash
    docker-compose up -d
    ```

    _The `-d` flag runs the containers in detached mode (in the background)._

3.  Access the practices in your browser using the ports listed in the table above (e.g., [http://localhost:8080](http://localhost:8080)).

4.  To stop the containers:
    ```bash
    docker compose down
    ```
    _(or `docker-compose down`)_
