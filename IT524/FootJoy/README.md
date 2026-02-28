# FootJoy - 3x3 Football Field Simulator

## What does it do?

This project is a Java-based **3x3 Football Simulator**. It simulates a match between two teams (Home and Away) for a specified duration (in seconds). During the match, players perform actions such as winning the ball, passing, dribbling, and shooting. At the end of the match, it reports statistics like total touches and possession time for each player and team.

## Implementation Details (Technical Structure)

The project is built using Object-Oriented Programming (OOP) and Multi-threading principles:

- **Player & Subclasses (`HomePlayer`, `AwayPlayer`)**: An abstract structure containing the core behaviors of players (shooting, passing, dribbling).
- **Ball**: Managed as a shared resource using `ReentrantLock` and `Condition` to ensure that only one player can hold the ball at a time.
- **MatchController**: Orchestrates the match timing, player turns, and final statistics calculation.
- **PlayerStatistics**: A data structure tracking individual performance (touches, time, etc.).
- **Exception handling**: Custom exception classes like `GameException` and `BallAccessException` ensure the simulation runs safely and handles edge cases.

## What did I learn?

By developing this project, I gained experience in the following areas:

1. **Concurrency**: I learned how to manage a shared resource (the Ball) among multiple threads (Players) using Java's `Lock` and `Condition` mechanisms.
2. **Abstract Classes & Polymorphism**: I improved code reusability by creating a base `Player` class and overriding team-specific behaviors (steal chances, team names, etc.) in subclasses.
3. **Volatile Keyword**: I understood the importance of the `volatile` keyword in ensuring that status flags (like whether the match is running) are correctly visible across different threads.
4. **Custom Exceptions**: I saw how writing custom exception classes clarifies error handling and makes the simulation's logic easier to follow.
