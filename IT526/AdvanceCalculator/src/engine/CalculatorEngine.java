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

public class CalculatorEngine {

    private final double[] currentResult = { 0.0 };

    private final Deque<Command> undoStack = new ArrayDeque<>();
    private final Deque<Command> redoStack = new ArrayDeque<>();

    private final List<CalculatorObserver> observers = new ArrayList<>();

    public void addObserver(CalculatorObserver observer) {
        observers.add(observer);
    }

    public void removeObserver(CalculatorObserver observer) {
        observers.remove(observer);
    }

    public double compute(String token, double... operands) {
        Operation raw = OperationFactory.create(token);
        Operation validated = new ValidationDecorator(raw);

        double snapshot = currentResult[0];

        Command cmd = new CalculationCommand(validated, operands, snapshot, currentResult);

        return executeCommand(cmd);
    }

    public double executeCommand(Command cmd) {
        double result = cmd.execute();
        undoStack.push(cmd);
        redoStack.clear();
        notifyObservers("EXECUTE", cmd.getDescription(), result);
        return result;
    }

    public void undo() {
        if (undoStack.isEmpty()) {
            throw new IllegalStateException("Nothing to undo.");
        }
        Command cmd = undoStack.pop();
        cmd.undo();
        redoStack.push(cmd);
        notifyObservers("UNDO", "Undid: " + cmd.getDescription(), currentResult[0]);
    }

    public void redo() {
        if (redoStack.isEmpty()) {
            throw new IllegalStateException("Nothing to redo.");
        }
        Command cmd = redoStack.pop();
        double result = cmd.execute();
        undoStack.push(cmd);
        notifyObservers("REDO", "Redid: " + cmd.getDescription(), result);
    }

    public double getCurrentResult() {
        return currentResult[0];
    }

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

    private void notifyObservers(String event, String description, double result) {
        for (CalculatorObserver observer : observers) {
            observer.onStateChanged(event, description, result);
        }
    }
}
