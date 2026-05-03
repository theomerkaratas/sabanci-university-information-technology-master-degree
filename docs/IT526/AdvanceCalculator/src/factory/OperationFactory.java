package factory;

import strategy.*;

/**
 * FACTORY PATTERN — OperationFactory (Simple Factory / Static Factory Method)
 *
 * Provides a centralized, single point of responsibility for mapping user-input
 * tokens (e.g., "+", "sin", "sqrt") to concrete Operation objects.
 *
 * Eliminates if-else / switch chains from both the TUI and the
 * CalculatorEngine.
 * Adding a new operation requires only a new case here — nowhere else.
 *
 * Extensibility Proof: to add a "Currency Converter" operation:
 * 1. Create CurrencyConverterOperation implements Operation.
 * 2. Add case "cc" -> new CurrencyConverterOperation() below.
 * 3. No changes to CalculatorEngine, TUI logic, or any other class.
 */
public class OperationFactory {

    private OperationFactory() {
        // Utility class — no instantiation needed.
    }

    /**
     * Maps a user-input token to the corresponding Operation strategy.
     *
     * @param token the raw string entered by the user (case-insensitive)
     * @return a new instance of the matching Operation
     * @throws IllegalArgumentException if the token is not recognised
     */
    public static Operation create(String token) {
        return switch (token.toLowerCase().trim()) {
            case "+", "add" -> new AddOperation();
            case "-", "sub" -> new SubtractOperation();
            case "*", "mul" -> new MultiplyOperation();
            case "/", "div" -> new DivideOperation();
            case "%", "mod" -> new ModuloOperation();
            case "sin" -> new SinOperation();
            case "cos" -> new CosOperation();
            case "log" -> new LogOperation();
            case "sqrt" -> new SqrtOperation();
            case "pow" -> new PowerOperation();
            default ->
                throw new IllegalArgumentException("Unknown operation: \"" + token + "\"");
        };
    }

    /**
     * Returns a plain list of supported operation tokens.
     */
    public static String[] getSupportedTokens() {
        return new String[] { "+", "add", "-", "sub", "*", "mul", "/", "div", "%", "mod", "sin", "cos", "log", "sqrt",
                "pow" };
    }
}
