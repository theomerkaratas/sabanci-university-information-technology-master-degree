# Pattern Justification Report

## Advanced Calculator System — IT526 Term Project

---

## Table of Contents

1. [Patterns Chosen](#1-patterns-chosen)
2. [Strategy Pattern](#2-strategy-pattern)
3. [Command Pattern](#3-command-pattern)
4. [Factory Pattern](#4-factory-pattern)
5. [Observer Pattern](#5-observer-pattern)
6. [Decorator Pattern](#6-decorator-pattern)
7. [Extensibility Proof](#7-extensibility-proof)
8. [How to Use](#8-how-to-use)
9. [Testing](#9-testing)

---

## 1. Patterns Chosen

Five design patterns were identified and implemented across three GoF categories:

| #   | Pattern       | Category    | Primary Role                                                               |
| --- | ------------- | ----------- | -------------------------------------------------------------------------- |
| 1   | **Strategy**  | Behavioural | Encapsulate each mathematical algorithm in its own interchangeable class   |
| 2   | **Command**   | Behavioural | Represent each calculation as a replayable, reversible object              |
| 3   | **Factory**   | Creational  | Centralize and decouple Operation object creation from user input parsing  |
| 4   | **Observer**  | Behavioural | Automatically notify the History Log and TUI on every state change         |
| 5   | **Decorator** | Structural  | Dynamically wrap operations with cross-cutting concerns (input validation) |

---

## 2. Strategy Pattern

### The Problem

The most fundamental architectural challenge of a calculator is **operation extensibility**. A naïve implementation embeds all mathematical logic inside the engine using `if-else` or `switch` chains:

```java
// ❌ Naïve approach — violates OCP
if (op.equals("+")) return a + b;
else if (op.equals("sin")) return Math.sin(a);
// ...every new operation requires modifying this block
```

This violates the **Open/Closed Principle**: adding `ModuloOperation` forces a modification to the `CalculatorEngine`. As the number of operations grows, the engine becomes a maintenance liability.

### The Solution

Every mathematical algorithm is encapsulated in its own class implementing the `Operation` interface (the **Strategy**):

```
src/strategy/
├── Operation.java          ← Strategy interface
├── AddOperation.java       ← Concrete Strategy
├── SubtractOperation.java
├── MultiplyOperation.java
├── DivideOperation.java
├── ModuloOperation.java
├── SinOperation.java
├── CosOperation.java
├── LogOperation.java
├── SqrtOperation.java
└── PowerOperation.java
```

**Pattern roles:**

| GoF Role          | Implementation                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------- |
| Strategy          | `Operation` interface (`execute()`, `getSymbol()`, `getOperandCount()`)                       |
| Concrete Strategy | `AddOperation`, `SinOperation`, `SqrtOperation`, … (one class per algorithm)                  |
| Context           | `CalculatorEngine` — calls `operation.execute(operands)` without knowing which algorithm runs |

The `CalculatorEngine` holds no operation-specific logic whatsoever. It delegates entirely through the `Operation` interface:

```java
// ✔ Engine is agnostic — it calls the same method regardless of which operation is active
double result = operation.execute(operands);
```

### Why This Pattern Fits

- Adding `TangentOperation` requires creating exactly **one new class** — the engine, TUI, and all other classes remain **untouched**.
- Operations with different arities (unary vs. binary) are handled uniformly via `getOperandCount()`, so the TUI knows how many values to prompt for without any special-casing.

---

## 3. Command Pattern

### The Problem

The History Log and Undo/Redo requirements share a common root: they both need to treat a user's calculation as a **first-class object** that can be stored, replayed, and reversed. Without this abstraction, undoing an operation means the engine must manually track what it did and reverse it — logic that would be tangled into the engine itself, making it fragile and hard to extend.

### The Solution

Each user calculation is wrapped in a `CalculationCommand` object (the **Concrete Command**), which bundles:

- The `Operation` strategy to execute
- The user's operands
- A snapshot of the engine's state **before** execution (for undo)
- A reference to the engine's mutable result holder (so undo can write back the snapshot)

```
src/command/
├── Command.java              ← Command interface (execute, undo, getDescription)
└── CalculationCommand.java   ← Concrete Command
```

**Pattern roles:**

| GoF Role         | Implementation                                                                       |
| ---------------- | ------------------------------------------------------------------------------------ |
| Command          | `Command` interface                                                                  |
| Concrete Command | `CalculationCommand` — stores operation, operands, result, and prior state           |
| Invoker          | `CalculatorEngine.executeCommand()` — calls `cmd.execute()`, pushes to undo stack    |
| Receiver         | `CalculatorEngine` — its internal `currentResult[]` state is modified by the command |
| Client           | `TerminalUI` — constructs the command context via `engine.compute()`                 |

The engine maintains two stacks — `undoStack` and `redoStack`:

```
On execute:  push cmd → undoStack;  clear redoStack
On undo:     pop from undoStack → cmd.undo() → push to redoStack
On redo:     pop from redoStack → cmd.execute() → push to undoStack
```

### Why This Pattern Fits

- Every Command is a **complete, self-describing record** — `getDescription()` returns a human-readable string (`"42.0000 + 8.0000 = 50.0000"`) consumed by the History Log without any formatting logic in the engine.
- Undo is O(1) and requires no reverse-engineering of the computation — the snapshot is already stored.
- Adding a new operation type (e.g., `CurrencyConverterOperation`) produces a new `CalculationCommand` automatically — no changes to the undo/redo or history infrastructure.

---

## 4. Factory Pattern

### The Problem

When the user types `"+"` or `"sin"`, something must map that string to the correct `Operation` object. Without a dedicated solution, this mapping logic leaks into multiple places — the TUI must parse the input, decide which class to instantiate, and pass it to the engine. This creates tight coupling between the presentation layer and the strategy layer, and duplicates the same `if-else` tree everywhere the mapping is needed.

### The Solution

`OperationFactory` provides a **single, centralized method** that maps any user-input token to its corresponding `Operation` instance:

```java
// Factory call — the TUI never mentions AddOperation by name
// OperationFactory is resolved via import factory.OperationFactory;
Operation op = OperationFactory.create("+");
```

```
src/factory/
└── OperationFactory.java   ← Static Factory Method
```

**Pattern roles:**

| GoF Role         | Implementation                                                           |
| ---------------- | ------------------------------------------------------------------------ |
| Creator          | `OperationFactory.create(String token)`                                  |
| Product          | `Operation` interface                                                    |
| Concrete Product | All `*Operation` classes                                                 |
| Client           | `CalculatorEngine.compute()` — delegates token resolution to the factory |

The factory uses a `switch` expression (Java 14+) that maps both symbolic and textual aliases:

```java
case "+", "add" -> new AddOperation();
case "sin"      -> new SinOperation();
// ...
```

### Why This Pattern Fits

- **Zero coupling** between the TUI and concrete operation classes — the TUI never imports `AddOperation` or `SinOperation`.
- **Single point of change** — adding a new operation only requires one new `case` line in `OperationFactory`. No other file changes.
- `getSupportedOperations()` exposes a formatted string for the TUI's help and prompt screens, keeping operation metadata co-located with the factory.

---

## 5. Observer Pattern

### The Problem

The calculator engine needs to inform two distinct components whenever its state changes:

1. **The History Log** — must record a persistent entry for every event.
2. **The Terminal UI** — must display live feedback to the user.

A direct coupling approach would require the engine to hold references to both objects and call their methods explicitly. This means the engine's `executeCommand()`, `undo()`, and `redo()` methods would need to be rewritten every time a new observer is added (e.g., a file logger, or a future graphical display).

### The Solution

The engine acts as the **Subject**, maintaining a list of `CalculatorObserver` objects. Any component that wants to receive updates registers itself:

```
src/observer/
├── CalculatorObserver.java   ← Observer interface (onStateChanged)
└── HistoryLog.java           ← Concrete Observer (persists entries)
```

```
src/tui/
└── TerminalUI.java           ← Concrete Observer (displays live feedback)
```

**Pattern roles:**

| GoF Role          | Implementation                                                                       |
| ----------------- | ------------------------------------------------------------------------------------ |
| Subject           | `CalculatorEngine` — maintains `List<CalculatorObserver>`, calls `notifyObservers()` |
| Observer          | `CalculatorObserver` interface (`onStateChanged(event, description, result)`)        |
| Concrete Observer | `HistoryLog` — appends `HistoryEntry` records                                        |
| Concrete Observer | `TerminalUI` — caches the latest event for status-bar display                        |

Every state-changing method (`executeCommand`, `undo`, `redo`, `reset`) ends with a single call to `notifyObservers()`. The engine remains completely ignorant of how many observers exist or what they do with the notification.

### Why This Pattern Fits

- **Complete decoupling** — the engine has no import of `TerminalUI` or `HistoryLog`. It only knows `CalculatorObserver`.
- Adding a `FileLogger` observer (which writes every result to a `.log` file) requires implementing `CalculatorObserver` and calling `engine.addObserver(fileLogger)` in `Main.java` — **zero changes** to the engine.
- Both `HistoryLog` and `TerminalUI` receive the same notification independently, with each reacting according to its own responsibility.

---

## 6. Decorator Pattern

### The Problem

Input validation (guarding against `NaN`, `Infinity`, division by zero, negative square roots, etc.) is a **cross-cutting concern** that applies to all operations. Embedding it inside each `*Operation` class would violate DRY — the same null/NaN check would be duplicated in every `execute()` method. Embedding it in the engine would re-introduce a `switch`-style structure and make the engine aware of per-operation edge cases.

### The Solution

The `ValidationDecorator` wraps any `Operation` and performs pre-flight checks before delegating to the wrapped operation's `execute()` method:

```
src/decorator/
├── OperationDecorator.java   ← Abstract Decorator (extends Operation, wraps Operation)
└── ValidationDecorator.java  ← Concrete Decorator (NaN / Infinity guard)
```

**Pattern roles:**

| GoF Role           | Implementation                                                                   |
| ------------------ | -------------------------------------------------------------------------------- |
| Component          | `Operation` interface                                                            |
| Concrete Component | Any `*Operation` class (e.g., `DivideOperation`)                                 |
| Decorator          | `OperationDecorator` — abstract base that wraps an `Operation`                   |
| Concrete Decorator | `ValidationDecorator` — validates operands, then delegates to `wrappedOperation` |

In `CalculatorEngine.compute()`, every operation is silently wrapped before execution:

```java
Operation raw       = OperationFactory.create(token);   // Factory resolves the Strategy
Operation validated = new ValidationDecorator(raw);      // Decorator adds validation
```

Domain-specific errors (divide by zero, log of a negative) are still raised inside the concrete `*Operation` classes themselves — the decorator handles only generic pre-conditions (NaN, Infinity).

### Why This Pattern Fits

- Validation is applied **uniformly to every operation** in one place, with no duplication.
- Decorators can be **stacked at runtime**: a future `LoggingDecorator` could be wrapped around `ValidationDecorator` to log every call to a file, with no changes to any existing class.
- Each `*Operation` class remains **pure and focused** — it only knows its own mathematical algorithm.

---

## 7. Extensibility Proof

> _"Describe how your architecture would allow a developer to add a 'Currency Converter' operation without changing your existing `CalculatorEngine` class."_

Adding a **Currency Converter** operation to this system requires exactly **three steps**, none of which touch `CalculatorEngine`:

### Step 1 — Create the Concrete Strategy

```java
// src/strategy/CurrencyConverterOperation.java
package strategy;

public class CurrencyConverterOperation implements Operation {

    private static final double USD_TO_EUR = 0.92;  // example rate

    @Override
    public double execute(double... operands) {
        // operands[0] = amount in USD
        return operands[0] * USD_TO_EUR;
    }

    @Override public String getSymbol()      { return "usd→eur"; }
    @Override public int    getOperandCount() { return 1; }
}
```

### Step 2 — Register the Token in the Factory

```java
// In OperationFactory.java — add ONE case:
case "cc", "usd2eur" -> new CurrencyConverterOperation();
```

### Step 3 — Update the Supported Operations String _(optional, cosmetic)_

```java
// In OperationFactory.getSupportedOperations() — add to the display string:
"  Currency  : cc  (usd2eur)\n"
```

### What Does NOT Change

| File                           | Changed? | Reason                                            |
| ------------------------------ | -------- | ------------------------------------------------- |
| `CalculatorEngine.java`        | **No**   | Delegates execution through `Operation` interface |
| `CalculationCommand.java`      | **No**   | Works with any `Operation` generically            |
| `TerminalUI.java`              | **No**   | Reads `getOperandCount()` dynamically at runtime  |
| `HistoryLog.java`              | **No**   | Reads `getDescription()` from the command         |
| `ValidationDecorator.java`     | **No**   | Applied generically before any operation          |
| Any existing `*Operation.java` | **No**   | Each is self-contained                            |

This is the **Open/Closed Principle** in action: the system is **open for extension** (add `CurrencyConverterOperation`) and **closed for modification** (no existing class is touched).

---

## 8. How to Use

> A step-by-step guide to compiling, running, and interacting with the Advanced Calculator TUI.

### 8.1. Prerequisites

| Requirement                | Minimum Version | Check Command    |
| -------------------------- | --------------- | ---------------- |
| Java Development Kit (JDK) | 16              | `java -version`  |
| Java Compiler              | 16              | `javac -version` |

> **Note:** The project uses Java Records (`HistoryLog.HistoryEntry`) and switch expressions, both of which require **JDK 16 or later**.

---

### 8.2. Compiling the Project

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

### 8.3. Running the Calculator

From the `AdvanceCalculator` directory, run:

```bash
java -cp bin Main
```

---

## 9. Testing

> A standalone, zero-dependency test suite that verifies every functional requirement defined in `TODO.md §2`.

The test class lives alongside the other source files:

```
src/
└── CalculatorTest.java   ← 87 tests, no external libraries required
```

---

### 9.1. Prerequisites

The same JDK used to run the calculator is sufficient — no Maven, JUnit, or build tool is needed.

| Requirement | Minimum Version | Check Command   |
| ----------- | --------------- | --------------- |
| JDK         | 16              | `java -version` |

---

### 9.2. Compiling the Tests

From the `AdvanceCalculator` directory, compile all sources **including the test file** in a single pass:

```bash
javac -d bin src/CalculatorTest.java src/strategy/*.java src/command/*.java \
      src/decorator/*.java src/engine/*.java src/factory/*.java \
      src/observer/*.java src/tui/*.java src/Main.java
```

On success, no output is printed.

> **Tip:** If you already compiled the project with `find src -name "*.java" | xargs javac -d bin`, the test class is picked up automatically because `CalculatorTest.java` lives in `src/`.

---

### 9.3. Running the Tests

```bash
java -cp bin CalculatorTest
```

Expected output (abbreviated):

```
╔══════════════════════════════════════════════════════╗
║   Advanced Calculator — Test Suite (TODO.md §2)      ║
╚══════════════════════════════════════════════════════╝

────────────────────────────────────────────────────────
  FR-1 · Standard Operations
────────────────────────────────────────────────────────
  ✔  PASS  Addition:    4 + 6 = 10
  ✔  PASS  Subtraction: 10 - 3 = 7
  ...

════════════════════════════════════════════════════════
  Results:  87 passed  |  0 failed  |  87 total
════════════════════════════════════════════════════════
```

The process exits with **code 0** on full success, or **code 1** if any test fails — making it compatible with CI pipelines.

---

### 9.4. Test Coverage Map

Each test group maps directly to a functional requirement from `TODO.md §2`:

| Test Section                        | TODO.md Requirement        | Tests | What Is Verified                                                                                                |
| ----------------------------------- | -------------------------- | ----- | --------------------------------------------------------------------------------------------------------------- |
| **FR-1 · Standard Operations**      | Standard Operations        | 12    | `+`, `-`, `*`, `/`, `%` correct results; symbolic and word aliases; floating-point; negatives                   |
| **FR-2 · Scientific Suite**         | Scientific Suite           | 16    | `sin`, `cos`, `log`, `sqrt`, `pow` accuracy; degree→radian conversion; boundary values                          |
| **FR-3 · State Management**         | Undo / Redo                | 18    | Single and multi-level undo/redo; redo stack cleared by new operation; empty-stack exceptions; reset            |
| **FR-4 · History Log**              | History Log                | 9     | EXECUTE / UNDO / REDO / RESET entries recorded; `getEntries()` returns unmodifiable copy; `clear()`             |
| **FR-5 · Precision & Errors**       | Precision & Error Handling | 8     | `ArithmeticException` for div/0, sqrt(−n), log(0), log(−n), mod/0; `IllegalArgumentException` for unknown token |
| **FR-6 · Factory Routing**          | Object Instantiation       | 13    | Every token maps to correct concrete class; case-insensitive; whitespace-tolerant                               |
| **Decorator · ValidationDecorator** | Feature Wrapping           | 4     | `NaN` and `Infinity` rejected before execution; `getSymbol()` delegates correctly                               |
| **Observer · Multi-Observer**       | Dynamic Behaviour Tracking | 7     | Multiple observers notified independently; `removeObserver` stops further notifications                         |

---

### 9.5. Adding New Tests

Because `CalculatorTest` is plain Java, extending it requires no framework knowledge:

1. Add a new `static void testMyFeature()` method.
2. Use `expect("description", booleanCondition)` for value assertions.
3. Use `expectThrows("description", ExceptionClass.class, () -> ...)` for exception assertions.
4. Call your method from `main()`.

To add a test for a hypothetical `TangentOperation`:

```java
static void testTangentOperation() {
    section("FR-X · Tangent Operation");
    CalculatorEngine engine = new CalculatorEngine();
    expect("tan(45°) = 1", near(engine.compute("tan", 45), 1.0));
    expectThrows("tan(90°) throws ArithmeticException",
            ArithmeticException.class, () -> engine.compute("tan", 90));
}
```
