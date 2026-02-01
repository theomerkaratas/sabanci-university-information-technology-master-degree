<div style="background-color: white; color: #1a1a1a; padding: 30px; border-radius: 10px; font-family: sans-serif;" markdown="1">

# IT537 Practices

This directory contains various practice projects for the IT537 course, dockerized for easy deployment.

## Content Overview

| Practice                         | Description                             | Port |
| :------------------------------- | :-------------------------------------- | :--- |
| [**Practice 1**](./practice-1)   | Personal CV / Resume of Omer Karatas    | 8001 |
| [**Practice 2**](./practice-2)   | A creative "Space Sandwich Recipe" page | 8002 |
| [**Practice 3**](./practice-3)   | The Twelve-Factor App                   | 8003 |
| [**Practice 4**](./practice-4)   | Portfolio                               | 8004 |
| [**Practice 5**](./practice-5)   | Three Methods of Adding CSS             | 8005 |
| [**Practice 6**](./practice-6)   | CSS Selectors                           | 8006 |
| [**Practice 7**](./practice-7)   | Spanish Vocabulary                      | 8007 |
| [**Practice 8**](./practice-8)   | CSS Properties                          | 8008 |
| [**Practice 9**](./practice-9)   | Test Page 9                             | 8009 |
| [**Practice 10**](./practice-10) | Practice 10                             | 8010 |
| [**Practice 11**](./practice-11) | Placeholder for future exercise         | 8011 |
| [**Practice 12**](./practice-12) | Placeholder for future exercise         | 8012 |
| [**Practice 13**](./practice-13) | Placeholder for future exercise         | 8013 |
| [**Practice 14**](./practice-14) | Placeholder for future exercise         | 8014 |
| [**Practice 15**](./practice-15) | Placeholder for future exercise         | 8015 |
| [**Practice 16**](./practice-16) | Placeholder for future exercise         | 8016 |
| [**Practice 17**](./practice-17) | Placeholder for future exercise         | 8017 |
| [**Practice 18**](./practice-18) | Placeholder for future exercise         | 8018 |
| [**Practice 19**](./practice-19) | Placeholder for future exercise         | 8019 |
| [**Practice 20**](./practice-20) | Placeholder for future exercise         | 8020 |

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

3.  Access the practices in your browser using the ports listed in the table above (e.g., [http://localhost:8001](http://localhost:8001)).

4.  To stop the containers:
    ```bash
    docker compose down
    ```
    _(or `docker-compose down`)_

</div>
