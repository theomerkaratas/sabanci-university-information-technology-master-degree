package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Addition
 *
 * Encapsulates the addition algorithm. The CalculatorEngine treats this
 * identically to any other Operation, with no switch-case or if-else required.
 */
public class AddOperation implements Operation {

    @Override
    public double execute(double... operands) {
        return operands[0] + operands[1];
    }

    @Override
    public String getSymbol() {
        return "+";
    }

    @Override
    public int getOperandCount() {
        return 2;
    }
}
