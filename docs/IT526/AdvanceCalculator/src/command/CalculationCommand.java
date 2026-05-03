package command;

import strategy.Operation;

/**
 * COMMAND PATTERN — Concrete Command: CalculationCommand
 *
 * Encapsulates a single user calculation: the operation (Strategy) to perform,
 * the operands, and both the result and the prior state required to undo it.
 *
 * Roles:
 * - Strategy (Operation): the algorithm to execute
 * - Command: the object that wraps the call and its inverse
 *
 * The CalculatorEngine acts as the Receiver whose internal state
 * (currentResult)
 * is modified by execute() and restored by undo().
 */
public class CalculationCommand implements Command {

    /** The concrete Strategy (e.g., AddOperation, SqrtOperation). */
    private final Operation operation;

    /** Input values supplied by the user. */
    private final double[] operands;

    /**
     * Result stored after execute() is called — used to rebuild the description.
     */
    private double result;

    /** The engine's state BEFORE this command ran — used for undo(). */
    private final double previousResult;

    /** Reference to the engine's mutable result holder so undo() can revert it. */
    private final double[] engineState;

    /**
     * @param operation      the Strategy that defines the algorithm
     * @param operands       the user-supplied input values
     * @param previousResult the engine's current result before this command
     * @param engineState    a single-element array wrapping the engine's mutable
     *                       currentResult
     */
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
