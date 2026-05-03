package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Power (Scientific Suite)
 *
 * Binary operation: base ^ exponent.
 */
public class PowerOperation implements Operation {

    @Override
    public double execute(double... operands) {
        return Math.pow(operands[0], operands[1]);
    }

    @Override
    public String getSymbol() {
        return "pow";
    }

    @Override
    public int getOperandCount() {
        return 2;
    }
}
