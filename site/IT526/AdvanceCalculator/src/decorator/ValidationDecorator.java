package decorator;

import strategy.Operation;

/**
 * DECORATOR PATTERN — Concrete Decorator: ValidationDecorator
 *
 * Wraps any Operation and performs pre-execution input validation.
 * If operands contain NaN or Infinity values — which could silently corrupt
 * subsequent calculations — it rejects the request with a clear error message.
 *
 * This extra responsibility is added dynamically at runtime:
 * the concrete Operation classes (AddOperation, SinOperation, etc.)
 * remain completely unaware of this validation layer.
 */
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
