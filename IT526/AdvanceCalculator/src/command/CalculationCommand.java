package command;

import strategy.Operation;

public class CalculationCommand implements Command {

    private final Operation operation;
    private final double[] operands;
    private final double previousResult;
    private final double[] engineState;
    private double result;

    public CalculationCommand(Operation operation, double[] operands,
            double previousResult, double[] engineState) {
        this.operation = operation;
        this.operands = operands;
        this.previousResult = previousResult;
        this.engineState = engineState;
    }

    @Override
    public double execute() {
        result = operation.execute(operands);
        engineState[0] = result;
        return result;
    }

    @Override
    public void undo() {
        // Restore the engine's state to what it was before this command ran.
        engineState[0] = previousResult;
    }

    @Override
    public String getDescription() {
        if (operation.getOperandCount() == 1) {
            // Unary: sin(90.0) = 1.0
            return String.format("%s(%.4f) = %.4f", operation.getSymbol(), operands[0], result);
        } else {
            // Binary: 10.0 + 5.0 = 15.0
            return String.format("%.4f %s %.4f = %.4f",
                    operands[0], operation.getSymbol(), operands[1], result);
        }
    }
}
