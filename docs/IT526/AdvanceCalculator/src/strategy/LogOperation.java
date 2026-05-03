package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Natural Logarithm (Scientific Suite)
 *
 * Error Handling: throws ArithmeticException for non-positive inputs,
 * as log(x) is undefined for x <= 0.
 */
public class LogOperation implements Operation {

    @Override
    public double execute(double... operands) {
        if (operands[0] <= 0) {
            throw new ArithmeticException("Logarithm is undefined for non-positive values.");
        }
        return Math.log(operands[0]);
    }

    @Override
    public String getSymbol() {
        return "log";
    }

    @Override
    public int getOperandCount() {
        return 1;
    }
}
