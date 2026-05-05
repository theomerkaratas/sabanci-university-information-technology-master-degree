package decorator;

import strategy.Operation;

public class ValidationDecorator extends OperationDecorator {

    public ValidationDecorator(Operation wrappedOperation) {
        super(wrappedOperation);
    }

    @Override
    public double execute(double... operands) {
        for (int i = 0; i < operands.length; i++) {
            if (Double.isNaN(operands[i])) {
                throw new IllegalArgumentException(
                        "Operand " + (i + 1) + " is NaN — not a valid number.");
            }
            if (Double.isInfinite(operands[i])) {
                throw new IllegalArgumentException(
                        "Operand " + (i + 1) + " is Infinite — value out of range.");
            }
        }
        return wrappedOperation.execute(operands);
    }

    @Override
    public String getSymbol() {
        return wrappedOperation.getSymbol();
    }
}
