package strategy;

/**
 * STRATEGY PATTERN — Concrete Strategy: Modulo
 *
 * Binary operation: operands[0] % operands[1].
 * Demonstrates extensibility — added without modifying the CalculatorEngine.
 */
public class ModuloOperation implements Operation {

    @Override
    public double execute(double... operands) {
        if (operands[1] == 0) {
            throw new ArithmeticException("Modulo by zero is undefined.");
        }
        return operands[0] % operands[1];
    }

    @Override
    public String getSymbol() {
        return "%";
    }

    @Override
    public int getOperandCount() {
        return 2;
    }
}
