<div style="background-color: white; color: #1a1a1a; padding: 30px; border-radius: 10px; font-family: sans-serif;" markdown="1">

# IT537 Practices

This directory contains various practice projects for the IT537 course. Each project is dockerized and can be run either collectively or individually.

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
| [**Practice 9**](./practice-9)   | CSS Box Model                           | 8009 |
| [**Practice 10**](./practice-10) | Motivational Poster                     | 8010 |
| [**Practice 11**](./practice-11) | CSS Cascade                             | 8011 |
| [**Practice 12**](./practice-12) | Combining CSS Selectors                 | 8012 |
| [**Practice 13**](./practice-13) | CSS Positioning Exercise                | 8013 |
| [**Practice 14**](./practice-14) | CSS Flag Project                        | 8014 |
| [**Practice 15**](./practice-15) | CSS Float                               | 8015 |
| [**Practice 16**](./practice-16) | Responsiveness                          | 8016 |
| [**Practice 17**](./practice-17) | Media Query                             | 8017 |
| [**Practice 18**](./practice-18) | Agency                                  | 8018 |
| [**Practice 19**](./practice-19) | Practice 19                             | 8019 |
| [**Practice 20**](./practice-20) | Practice 20                             | 8020 |
| [**Practice 21**](./practice-21) | Practice 21                             | 8021 |
| [**Practice 22**](./practice-22) | Chessboard with CSS Grid                | 8022 |
| [**Practice 23**](./practice-23) | Grid Sizing Fundamentals                | 8023 |
| [**Practice 24**](./practice-24) | Practice 24                             | 8024 |
| [**Practice 25**](./practice-25) | Practice 25                             | 8025 |
| [**Practice 26**](./practice-26) | Practice 26                             | 8026 |
| [**Practice 27**](./practice-27) | Practice 27                             | 8027 |
| [**Practice 28**](./practice-28) | Practice 28                             | 8028 |
| [**Practice 29**](./practice-29) | Practice 29                             | 8029 |
| [**Practice 30**](./practice-30) | Practice 30                             | 8030 |
| [**Practice 31**](./practice-31) | Practice 31                             | 8031 |
| [**Practice 32**](./practice-32) | Practice 32                             | 8032 |
| [**Practice 33**](./practice-33) | Practice 33                             | 8033 |
| [**Practice 34**](./practice-34) | Practice 34                             | 8034 |
| [**Practice 35**](./practice-35) | Practice 35                             | 8035 |
| [**Practice 36**](./practice-36) | Practice 36                             | 8036 |
| [**Practice 37**](./practice-37) | Practice 37                             | 8037 |
| [**Practice 38**](./practice-38) | Practice 38                             | 8038 |
| [**Practice 39**](./practice-39) | Practice 39                             | 8039 |
| [**Practice 40**](./practice-40) | Practice 40                             | 8040 |

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
