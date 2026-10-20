package strategy;

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
