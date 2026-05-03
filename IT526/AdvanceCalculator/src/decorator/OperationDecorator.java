package decorator;

import strategy.Operation;

/**
 * DECORATOR PATTERN — Abstract Decorator (OperationDecorator)
 *
 * Wraps an existing Operation to add cross-cutting concerns
 * (e.g., input validation, logging) without subclassing the concrete
 * operations.
 *
 * This preserves the Open/Closed Principle at the decorator layer:
 * new behaviours can be stacked as wrappers at runtime without touching
 * any concrete operation class.
 */
public abstract class OperationDecorator implements Operation {

    /** The wrapped Operation — may itself be another decorator (chain). */
    protected final Operation wrappedOperation;

    protected OperationDecorator(Operation wrappedOperation) {
        this.wrappedOperation = wrappedOperation;
    }

    @Override
    public String getSymbol() {
        return wrappedOperation.getSymbol();
    }

    @Override
    public int getOperandCount() {
        return wrappedOperation.getOperandCount();
    }
}
