package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Sine (Scientific Suite)
 *
 * Operates on a single operand (angle in degrees).
 * Internally converts to radians for Math.sin().
 */
public class SinOperation implements Operation {

    @Override
    public double execute(double... operands) {
        return Math.sin(Math.toRadians(operands[0]));
    }

    @Override
    public String getSymbol() {
        return "sin";
    }

    @Override
    public int getOperandCount() {
        return 1;
    }
}
