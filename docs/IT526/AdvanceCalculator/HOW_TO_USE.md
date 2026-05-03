@contextScopeItemMention # How to Use — Advanced Calculator

> A step-by-step guide to compiling, running, and interacting with the Advanced Calculator TUI.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Project Structure](#2-project-structure)
3. [Compiling the Project](#3-compiling-the-project)
4. [Running the Calculator](#4-running-the-calculator)
5. [Navigating the TUI](#5-navigating-the-tui)
6. [Performing a Calculation](#6-performing-a-calculation)
7. [Undo and Redo](#7-undo-and-redo)
8. [Viewing Session History](#8-viewing-session-history)
9. [Resetting the Calculator](#9-resetting-the-calculator)
10. [Supported Operations Reference](#10-supported-operations-reference)
11. [Error Messages & Troubleshooting](#11-error-messages--troubleshooting)

---

## 1. Prerequisites

| Requirement                | Minimum Version | Check Command    |
| -------------------------- | --------------- | ---------------- |
| Java Development Kit (JDK) | 16              | `java -version`  |
| Java Compiler              | 16              | `javac -version` |

> **Note:** The project uses Java Records (`HistoryLog.HistoryEntry`) and switch expressions, both of which require **JDK 16 or later**.

---

## 2. Project Structure

```
AdvanceCalculator/
├── src/
│   ├── Main.java                              ← Entry point
│   ├── command/
│   │   ├── Command.java
│   │   └── CalculationCommand.java
│   ├── decorator/
│   │   ├── OperationDecorator.java
│   │   └── ValidationDecorator.java
│   ├── engine/
│   │   └── CalculatorEngine.java
│   ├── factory/
│   │   └── OperationFactory.java
│   ├── observer/
│   │   ├── CalculatorObserver.java
│   │   └── HistoryLog.java
│   ├── strategy/
│   │   ├── Operation.java
│   │   ├── AddOperation.java
│   │   ├── SubtractOperation.java
│   │   ├── MultiplyOperation.java
│   │   ├── DivideOperation.java
│   │   ├── ModuloOperation.java
│   │   ├── SinOperation.java
│   │   ├── CosOperation.java
│   │   ├── LogOperation.java
│   │   ├── SqrtOperation.java
│   │   └── PowerOperation.java
│   └── tui/
│       └── TerminalUI.java
├── bin/                                       ← Compiled .class files (auto-generated)
├── README.md
├── HOW_TO_USE.md
└── PATTERN_JUSTIFICATION.md
```

---

## 3. Compiling the Project

Open a terminal and navigate to the `AdvanceCalculator` directory:

```bash
cd path/to/AdvanceCalculator
```

Compile all Java source files into the `bin/` directory:

```bash
find src -name "*.java" | xargs javac -d bin --release 16
```

On success, no output is printed. You can verify the compiled classes exist:

```bash
find bin -name "*.class"
```

You should see 22 `.class` files listed (21 classes + 1 inner class for `HistoryEntry`).

---

## 4. Running the Calculator

From the `AdvanceCalculator` directory, run:

```bash
java -cp bin Main
```

---

## 5. Navigating the TUI

The interface is entirely **keyboard-driven**. Type a number or alias and press **Enter**.

| Input                       | Action                                    |
| --------------------------- | ----------------------------------------- |
| `1`                         | Perform a new calculation                 |
| `2`                         | Undo the last calculation                 |
| `3`                         | Redo the most recently undone calculation |
| `4`                         | View the full session history log         |
| `5`                         | Reset the calculator to 0                 |
| `6`                         | Show the help screen                      |
| `0` / `q` / `quit` / `exit` | Exit the application                      |

The **status bar** shown above the menu updates after every action:

```
  Current Result: 50      Undo: ✔  Redo: ✘
  Last: 42.0000 + 8.0000 = 50.0000
```

- **Current Result** — the value the engine currently holds.
- **Undo ✔ / ✘** — whether there is something to undo.
- **Redo ✔ / ✘** — whether there is something to redo.
- **Last** — a description of the most recent event.

---

## 6. Performing a Calculation

Select option **1** from the main menu. The calculator guides you through two steps:

### Step 1 — Choose an Operation

```
  » Operation:
```

Type a symbol or name from the table in section 10 and press Enter. Examples:

```
  » Operation: +
  » Operation: sin
  » Operation: sqrt
```

### Step 2 — Enter Operands

The TUI automatically prompts for the correct number of values based on the operation:

**Binary operation (two values):**

```
  » Operand A: 42
  » Operand B: 8
  ✔ Result: 50.000000
```

**Unary operation (one value):**

```
  » Value (degrees): 90
  ✔ Result: 1.000000
```

> **Tip:** For `sin` and `cos`, enter the angle in **degrees** — the calculator converts to radians internally.

### Invalid Input

If you enter something that is not a number, the calculator gives you up to **3 attempts** before cancelling:

```
  » Operand A: abc
  ✘ Error: "abc" is not a valid number. Try again (1/3).
  » Operand A:
```

---

## 7. Undo and Redo

### Undo — Option 2

Reverses the last calculation and restores the previous result:

```
  ✔ Undone.  Current result: 0
```

You can undo **multiple times** to walk back through the full history. The `Undo: ✔` indicator in the status bar confirms there is something to undo.

### Redo — Option 3

Re-applies the most recently undone calculation:

```
  ✔ Redone. Current result: 50
```

> **Note:** Performing a **new calculation** after an undo clears the redo stack — the alternate future is discarded.

---

## 8. Viewing Session History

Select option **4** to display a full log of every event in the current session:

```
────────────────────────────────────────────────────────────
                      SESSION HISTORY
────────────────────────────────────────────────────────────
  No.   Event      Description
  ──────────────────────────────────────────────────────────
  1     EXECUTE    42.0000 + 8.0000 = 50.0000
  2     EXECUTE    sin(90.0000) = 1.0000
  3     EXECUTE    sqrt(144.0000) = 12.0000
  4     UNDO       Undid: sqrt(144.0000) = 12.0000
  5     REDO       Redid: sqrt(144.0000) = 12.0000
```

Event types are color-coded:

| Color   | Event     | Meaning                         |
| ------- | --------- | ------------------------------- |
| Green   | `EXECUTE` | A new calculation was performed |
| Yellow  | `UNDO`    | A calculation was undone        |
| Cyan    | `REDO`    | A calculation was redone        |
| Magenta | `RESET`   | The calculator was reset to 0   |

---

## 9. Resetting the Calculator

Select option **5**. The TUI asks for confirmation before clearing everything:

```
  » Reset calculator to 0 and clear all history? [y/N]:
```

- Type `y` and press Enter to confirm.
- Press Enter without typing, or type anything else, to cancel.

On confirmation, the current result is set to `0`, and both the undo/redo stacks and the history log are cleared.

---

## 10. Supported Operations Reference

### Standard Operations (Binary — two operands)

| Input | Alias | Operation      | Example        |
| ----- | ----- | -------------- | -------------- |
| `+`   | `add` | Addition       | `10 + 3 = 13`  |
| `-`   | `sub` | Subtraction    | `10 - 3 = 7`   |
| `*`   | `mul` | Multiplication | `10 * 3 = 30`  |
| `/`   | `div` | Division       | `10 / 4 = 2.5` |
| `%`   | `mod` | Modulo         | `10 % 3 = 1`   |

### Scientific Suite

| Input  | Arity  | Operation                    | Input Unit | Example             |
| ------ | ------ | ---------------------------- | ---------- | ------------------- |
| `sin`  | Unary  | Sine                         | Degrees    | `sin(90) = 1`       |
| `cos`  | Unary  | Cosine                       | Degrees    | `cos(0) = 1`        |
| `log`  | Unary  | Natural logarithm (base _e_) | —          | `log(1) = 0`        |
| `sqrt` | Unary  | Square root                  | —          | `sqrt(144) = 12`    |
| `pow`  | Binary | Exponentiation (base ^ exp)  | —          | `pow(2, 10) = 1024` |

---

## 11. Error Messages & Troubleshooting

| Error Message                                                       | Cause                                                                             | Resolution                                                           |
| ------------------------------------------------------------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `Unknown operation: "xyz"`                                          | Unrecognised token entered at the operation prompt                                | Check the supported operations in section 10 or press **6** for help |
| `Division by zero is undefined.`                                    | You entered `0` as the divisor for `/` or `%`                                     | Enter a non-zero denominator                                         |
| `Logarithm is undefined for non-positive values.`                   | You entered `0` or a negative number for `log`                                    | Enter a positive number                                              |
| `Square root of a negative number is undefined in the real domain.` | Negative input for `sqrt`                                                         | Enter a non-negative number                                          |
| `"abc" is not a valid number.`                                      | Non-numeric input at an operand prompt                                            | Enter a decimal number (e.g., `3.14`, `-7`, `0`)                     |
| `Nothing to undo.`                                                  | Undo was selected but no calculations have been made                              | Perform at least one calculation first                               |
| `Nothing to redo.`                                                  | Redo was selected but no undos exist, or a new calculation cleared the redo stack | Undo a calculation before attempting redo                            |

### Compilation Errors

**`error: release version 16 not supported`**  
Your JDK is older than 16. Install a newer JDK and ensure `java -version` reports 16+.

**`error: cannot find symbol`**  
The `src/` directory structure may be incorrect. Ensure each `.java` file's `package` declaration matches its folder path directly under `src/` (e.g., `src/strategy/AddOperation.java` declares `package strategy;`).
