package strategy;

public class MultiplyOperation implements Operation {

    @Override
    public double execute(double... operands) {
        return operands[0] * operands[1];
    }

    @Override
    public String getSymbol() {
        return "*";
    }

    @Override
    public int getOperandCount() {
        return 2;
    }
}
