package factory;

import strategy.*;

public class OperationFactory {

    private OperationFactory() {
    }

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

    public static String[] getSupportedTokens() {
        return new String[] { "+", "add", "-", "sub", "*", "mul", "/", "div", "%", "mod", "sin", "cos", "log", "sqrt",
                "pow" };
    }
}
