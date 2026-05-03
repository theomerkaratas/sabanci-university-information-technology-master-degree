package strategy;

/**
 * STRATEGY PATTERN — Interface (Strategy)
 *
 * Defines the contract for all mathematical operations.
 * Each concrete operation (Add, Subtract, Sin, etc.) implements this interface,
 * allowing the CalculatorEngine to execute any operation uniformly without
 * knowing the specific algorithm being applied.
 *
 * Open/Closed Principle: adding a new operation (e.g., Modulo) only requires
 * creating a new class that implements this interface — zero changes to the
 * engine.
 */
public interface Operation {

    /**
     * Executes the operation on the given operands.
     *
     * @param operands one or more double values (unary or binary operations)
     * @return the computed result
     * @throws ArithmeticException      if the operation is mathematically undefined
     *                                  (e.g., divide by zero)
     * @throws IllegalArgumentException if the operand count or value is invalid
     */
    double execute(double... operands);

    /**
     * Returns a human-readable symbol or name for this operation (e.g., "+",
     * "sin").
     */
    String getSymbol();

    /**
     * Returns the number of operands this operation requires.
     * Binary operations return 2; unary operations return 1.
     */
    int getOperandCount();
}
