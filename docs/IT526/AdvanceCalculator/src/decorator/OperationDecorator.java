package decorator;

import strategy.Operation;

public abstract class OperationDecorator implements Operation {

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
