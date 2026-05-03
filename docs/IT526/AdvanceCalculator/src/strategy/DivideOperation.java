package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Division
 *
 * Precision & Error Handling: throws ArithmeticException on division by zero,
 * satisfying the project's edge-case requirement without polluting the engine.
 */
public class DivideOperation implements Operation {

    @Override
    public double execute(double... operands) {
        if (operands[1] == 0) {
            throw new ArithmeticException("Division by zero is undefined.");
        }
        return operands[0] / operands[1];
    }

    @Override
    public String getSymbol() {
        return "/";
    }

    @Override
    public int getOperandCount() {
        return 2;
    }
}
