package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Cosine (Scientific Suite)
 *
 * Operates on a single operand (angle in degrees).
 */
public class CosOperation implements Operation {

    @Override
    public double execute(double... operands) {
        return Math.cos(Math.toRadians(operands[0]));
    }

    @Override
    public String getSymbol() {
        return "cos";
    }

    @Override
    public int getOperandCount() {
        return 1;
    }
}
