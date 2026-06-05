package strategy;

public class SqrtOperation implements Operation {

    @Override
    public double execute(double... operands) {
        if (operands[0] < 0) {
            throw new ArithmeticException("Square root of a negative number is undefined in the real domain.");
        }
        return Math.sqrt(operands[0]);
    }

    @Override
    public String getSymbol() {
        return "sqrt";
    }

    @Override
    public int getOperandCount() {
        return 1;
    }
}
