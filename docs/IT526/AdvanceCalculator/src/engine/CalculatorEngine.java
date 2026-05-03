package engine;

import command.CalculationCommand;
import command.Command;
import decorator.ValidationDecorator;
import factory.OperationFactory;
import observer.CalculatorObserver;
import strategy.Operation;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * CalculatorEngine — the central Receiver and Subject of the application.
 *
 * PATTERNS IN USE HERE:
 * - Command : accepts Command objects, executes them, and maintains undo/redo
 * stacks
 * - Observer : notifies all registered CalculatorObserver instances on every
 * state change
 * - Strategy : delegates the actual computation to whichever Operation the
 * Command carries
 * - Factory : used by the convenience method compute() to resolve tokens →
 * Operations
 * - Decorator: every Operation is wrapped in a ValidationDecorator before
 * execution
 *
 * The engine knows nothing about the TUI, the HistoryLog display, or any other
 * concrete
 * observer — it communicates solely through the CalculatorObserver interface.
 */
public class CalculatorEngine {

    // ── Shared mutable state ────────────────────────────────────────────────
    // Wrapped in a single-element array so CalculationCommand can hold a reference
    // and restore it during undo without requiring a back-reference to the engine.
    private final double[] currentResult = { 0.0 };

    // ── Command stacks for Undo / Redo ──────────────────────────────────────
    private final Deque<Command> undoStack = new ArrayDeque<>();
    private final Deque<Command> redoStack = new ArrayDeque<>();

    // ── Observer registry ───────────────────────────────────────────────────
    private final List<CalculatorObserver> observers = new ArrayList<>();

    // ── Public API ───────────────────────────────────────────────────────────

    /** Registers an observer to receive state-change notifications. */
    public void addObserver(CalculatorObserver observer) {
        observers.add(observer);
    }

    /** Removes a previously registered observer. */
    public void removeObserver(CalculatorObserver observer) {
        observers.remove(observer);
    }

    /**
     * Convenience method: builds and executes a command from a token + operands.
     * Internally delegates to the Factory and the Decorator before firing the
     * Command.
     *
     * @param token    operation token (e.g., "+", "sin", "sqrt")
     * @param operands user-supplied numbers
     * @return the computed result
     */
    public double compute(String token, double... operands) {
        // Factory resolves the token → concrete Strategy
        Operation raw = OperationFactory.create(token);
        // Decorator wraps the Strategy with input validation
        Operation validated = new ValidationDecorator(raw);

        // Snapshot current result so the Command can restore it on undo
        double snapshot = currentResult[0];

        // Build the Command object
        Command cmd = new CalculationCommand(validated, operands, snapshot, currentResult);

        // Execute via the standard command path
        return executeCommand(cmd);
    }

    /**
     * Executes any Command object, records it for undo, and notifies observers.
     *
     * @param cmd the command to run
     * @return the result of cmd.execute()
     */
    public double executeCommand(Command cmd) {
        double result = cmd.execute();
        undoStack.push(cmd);
        redoStack.clear(); // a new action invalidates the redo future
        notifyObservers("EXECUTE", cmd.getDescription(), result);
        return result;
    }

    /**
     * Undoes the most recent command and notifies observers.
     *
     * @throws IllegalStateException if there is nothing to undo
     */
    public void undo() {
        if (undoStack.isEmpty()) {
            throw new IllegalStateException("Nothing to undo.");
        }
        Command cmd = undoStack.pop();
        cmd.undo();
        redoStack.push(cmd);
        notifyObservers("UNDO", "Undid: " + cmd.getDescription(), currentResult[0]);
    }

    /**
     * Redoes the most recently undone command and notifies observers.
     *
     * @throws IllegalStateException if there is nothing to redo
     */
    public void redo() {
        if (redoStack.isEmpty()) {
            throw new IllegalStateException("Nothing to redo.");
        }
        Command cmd = redoStack.pop();
        double result = cmd.execute();
        undoStack.push(cmd);
        notifyObservers("REDO", "Redid: " + cmd.getDescription(), result);
    }

    /** Returns the engine's current result without modifying any state. */
    public double getCurrentResult() {
        return currentResult[0];
    }

    /** Resets the engine's result to 0.0 and clears both stacks. */
    public void reset() {
        currentResult[0] = 0.0;
        undoStack.clear();
        redoStack.clear();
        notifyObservers("RESET", "Calculator reset to 0.", 0.0);
    }

    public boolean canUndo() {
        return !undoStack.isEmpty();
    }

    public boolean canRedo() {
        return !redoStack.isEmpty();
    }

    // ── Observer notification ────────────────────────────────────────────────

    private void notifyObservers(String event, String description, double result) {
        for (CalculatorObserver observer : observers) {
            observer.onStateChanged(event, description, result);
        }
    }
}
