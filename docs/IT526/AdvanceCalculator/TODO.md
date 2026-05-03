# Term Project: Advanced Calculator System

## 1. Project Overview

The objective of this term project is to move beyond functional programming and develop a robust, extensible calculator application using Object-Oriented Design principles. While the functional goal is a working calculator, the primary pedagogical goal is the successful application of software design patterns to solve architectural challenges such as operation extensibility, state management, and decoupling of logic from presentation.

Students are expected to implement a system that is resilient to change. A successful project will demonstrate that adding a new mathematical operation (e.g., Modulo or a specific scientific function) requires zero modification to the core calculation engine, adhering strictly to the **Open/Closed Principle**.

## 2. Functional Requirements

Your Java application must support the following features:

- **Standard Operations:** Addition, subtraction, multiplication, and division.
- **Scientific Suite:** At least four scientific functions (e.g., Sin, Cos, Log, Square Root, or Power).
- **State Management:** A robust "Undo" and "Redo" system allowing users to traverse their calculation history.
- **History Log:** A session-based log that records all operations performed and their results.
- **Precision & Error Handling:** Proper management of floating-point arithmetic and edge cases (e.g., division by zero, negative square roots).
- **Terminal User Interface (TUI):** The application must be controllable from the terminal, providing a clear text-based interactive interface.

## 3. Architectural Requirements & Pattern Hints

The core of your grade rests on the identification and implementation of **4 to 5 distinct software design patterns**. You must analyze the requirements and decide which patterns from the Creational, Structural, and Behavioral categories best fit the problem.

### Architectural Hints

To guide your selection, consider the following design challenges you will encounter:

- **Encapsulating Algorithms:** Consider how you might wrap different mathematical operations into their own classes so they can be interchanged at runtime without the main calculator logic knowing which specific operation is being executed.
- **Request Management:** Think about how to represent a user’s request for a calculation as a standalone object. This is often the key to enabling features like history tracking and reversible actions (Undo/Redo).
- **Object Instantiation:** Reflect on how the system should decide which operation object to create based on user input. Providing a centralized interface for this creation can prevent your code from becoming a mess of "if-else" or "switch" statements.
- **Dynamic Behavior Tracking:** Consider how the display or history log can be automatically notified and updated whenever the calculator’s internal state changes, without the calculator needing to hold a hard reference to every UI component.
- **Feature Wrapping:** If you find you need to add extra responsibilities to your operations—such as logging every calculation to a file or validating inputs—think about how to "wrap" existing objects with this new functionality dynamically.

## 4. Deliverables

Students must submit a professional package containing:

### 4.1. Source Code

- A clean, modular Java project (Maven or no build tools are preferred).
- Strict adherence to Java naming conventions (camelCase, PascalCase).
- In-code documentation explaining how the logic flows through your chosen patterns.

### 4.2. Pattern Justification Report

In lieu of a UML diagram, you must provide a detailed report (in Markdown format) that explicitly defines:

- **The Patterns Chosen:** List the patterns you identified. Each pattern should have its own section.
- **The Problem:** Describe the specific architectural bottleneck each pattern addressed.
- **The Solution:** Explain how your Java implementation utilizes the pattern's roles (e.g., which class acts as the "Receiver," "Concrete Strategy," etc.).
- **Extensibility Proof:** Describe how your architecture would allow a developer to add a "Currency Converter" operation without changing your existing `CalculatorEngine` class.
