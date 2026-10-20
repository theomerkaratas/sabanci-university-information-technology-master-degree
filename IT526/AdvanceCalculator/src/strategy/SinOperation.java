package strategy;

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
