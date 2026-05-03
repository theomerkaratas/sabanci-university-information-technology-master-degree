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

---

## 1. Patterns Chosen

Five design patterns were identified and implemented across three GoF categories:

| # | Pattern | Category | Primary Role |
|---|---------|----------|--------------|
| 1 | **Strategy** | Behavioural | Encapsulate each mathematical algorithm in its own interchangeable class |
| 2 | **Command** | Behavioural | Represent each calculation as a replayable, reversible object |
| 3 | **Factory** | Creational | Centralize and decouple Operation object creation from user input parsing |
| 4 | **Observer** | Behavioural | Automatically notify the History Log and TUI on every state change |
| 5 | **Decorator** | Structural | Dynamically wrap operations with cross-cutting concerns (input validation) |

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

| GoF Role | Implementation |
|----------|---------------|
| Strategy | `Operation` interface (`execute()`, `getSymbol()`, `getOperandCount()`) |
| Concrete Strategy | `AddOperation`, `SinOperation`, `SqrtOperation`, … (one class per algorithm) |
| Context | `CalculatorEngine` — calls `operation.execute(operands)` without knowing which algorithm runs |

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

| GoF Role | Implementation |
|----------|---------------|
| Command | `Command` interface |
| Concrete Command | `CalculationCommand` — stores operation, operands, result, and prior state |
| Invoker | `CalculatorEngine.executeCommand()` — calls `cmd.execute()`, pushes to undo stack |
| Receiver | `CalculatorEngine` — its internal `currentResult[]` state is modified by the command |
| Client | `TerminalUI` — constructs the command context via `engine.compute()` |

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

| GoF Role | Implementation |
|----------|---------------|
| Creator | `OperationFactory.create(String token)` |
| Product | `Operation` interface |
| Concrete Product | All `*Operation` classes |
| Client | `CalculatorEngine.compute()` — delegates token resolution to the factory |

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

| GoF Role | Implementation |
|----------|---------------|
| Subject | `CalculatorEngine` — maintains `List<CalculatorObserver>`, calls `notifyObservers()` |
| Observer | `CalculatorObserver` interface (`onStateChanged(event, description, result)`) |
| Concrete Observer | `HistoryLog` — appends `HistoryEntry` records |
| Concrete Observer | `TerminalUI` — caches the latest event for status-bar display |

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

| GoF Role | Implementation |
|----------|---------------|
| Component | `Operation` interface |
| Concrete Component | Any `*Operation` class (e.g., `DivideOperation`) |
| Decorator | `OperationDecorator` — abstract base that wraps an `Operation` |
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

> *"Describe how your architecture would allow a developer to add a 'Currency Converter' operation without changing your existing `CalculatorEngine` class."*

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

### Step 3 — Update the Supported Operations String *(optional, cosmetic)*

```java
// In OperationFactory.getSupportedOperations() — add to the display string:
"  Currency  : cc  (usd2eur)\n"
```

### What Does NOT Change

| File | Changed? | Reason |
|------|----------|--------|
| `CalculatorEngine.java` | **No** | Delegates execution through `Operation` interface |
| `CalculationCommand.java` | **No** | Works with any `Operation` generically |
| `TerminalUI.java` | **No** | Reads `getOperandCount()` dynamically at runtime |
| `HistoryLog.java` | **No** | Reads `getDescription()` from the command |
| `ValidationDecorator.java` | **No** | Applied generically before any operation |
| Any existing `*Operation.java` | **No** | Each is self-contained |

This is the **Open/Closed Principle** in action: the system is **open for extension** (add `CurrencyConverterOperation`) and **closed for modification** (no existing class is touched).
