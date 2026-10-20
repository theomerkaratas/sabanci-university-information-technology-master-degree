package tui;

import engine.CalculatorEngine;
import factory.OperationFactory;
import java.util.List;
import java.util.Scanner;
import observer.CalculatorObserver;
import observer.HistoryLog;
import strategy.Operation;

public class TerminalUI implements CalculatorObserver {

    private static final String RESET = "\u001B[0m";
    private static final String BOLD = "\u001B[1m";
    private static final String DIM = "\u001B[2m";
    private static final String CYAN = "\u001B[36m";
    private static final String GREEN = "\u001B[32m";
    private static final String YELLOW = "\u001B[33m";
    private static final String RED = "\u001B[31m";
    private static final String MAGENTA = "\u001B[35m";
    private static final String BLUE = "\u001B[34m";
    private static final String WHITE = "\u001B[37m";

    private final CalculatorEngine engine;
    private final HistoryLog historyLog;
    private final Scanner scanner;

    private String lastEvent = "";
    private String lastDescription = "";

    public TerminalUI(CalculatorEngine engine, HistoryLog historyLog) {
        this.engine = engine;
        this.historyLog = historyLog;
        this.scanner = new Scanner(System.in);
    }

    public void start() {
        printBanner();
        boolean running = true;

        while (running) {
            printStatus();
            printMenu();
            String choice = prompt("Enter choice").trim().toLowerCase();

            switch (choice) {
                case "1" -> handleCalculate();
                case "2" -> handleUndo();
                case "3" -> handleRedo();
                case "4" -> handleHistory();
                case "5" -> handleReset();
                case "6" -> handleHelp();
                case "0", "q", "quit", "exit" -> {
                    running = false;
                    printGoodbye();
                }
                default -> printError("Unknown option \"" + choice + "\". Press 6 for help.");
            }
        }
    }

    @Override
    public void onStateChanged(String event, String description, double result) {
        // Store for inline display in printStatus(); HistoryLog handles persistence.
        lastEvent = event;
        lastDescription = description;
    }

    private void handleCalculate() {
        println();
        printSectionHeader("  NEW CALCULATION  ");

        printSupportedOperations();
        String token = prompt("Operation").trim();

        Operation op;
        try {
            op = OperationFactory.create(token);
        } catch (IllegalArgumentException e) {
            printError(e.getMessage());
            return;
        }

        double[] operands = new double[op.getOperandCount()];
        for (int i = 0; i < op.getOperandCount(); i++) {
            String label = op.getOperandCount() == 1
                    ? "Value"
                    : (i == 0 ? "Operand A" : "Operand B");

            if (op.getOperandCount() == 1 && (token.equalsIgnoreCase("sin") || token.equalsIgnoreCase("cos"))) {
                label += " (degrees)";
            }

            Double parsed = promptDouble(label);
            if (parsed == null)
                return;
            operands[i] = parsed;
        }

        try {
            double result = engine.compute(token, operands);
            printSuccess(String.format("Result: %s%s%.6f%s", BOLD, GREEN, result, RESET));
        } catch (ArithmeticException | IllegalArgumentException e) {
            printError(e.getMessage());
        }
    }

    private void handleUndo() {
        try {
            engine.undo();
            printSuccess("Undone.  Current result: " + formatResult(engine.getCurrentResult()));
        } catch (IllegalStateException e) {
            printError(e.getMessage());
        }
    }

    private void handleRedo() {
        try {
            engine.redo();
            printSuccess("Redone. Current result: " + formatResult(engine.getCurrentResult()));
        } catch (IllegalStateException e) {
            printError(e.getMessage());
        }
    }

    private void handleHistory() {
        println();
        printSectionHeader("  SESSION HISTORY  ");
        List<HistoryLog.HistoryEntry> entries = historyLog.getEntries();

        if (entries.isEmpty()) {
            println(DIM + "  No calculations yet." + RESET);
        } else {
            println(String.format("  %-5s %-10s %s", "No.", "Event", "Description"));
            println("  " + "─".repeat(58));
            for (int i = 0; i < entries.size(); i++) {
                var e = entries.get(i);
                String eventColor = switch (e.event()) {
                    case "EXECUTE" -> GREEN;
                    case "UNDO" -> YELLOW;
                    case "REDO" -> CYAN;
                    case "RESET" -> MAGENTA;
                    default -> WHITE;
                };
                println(String.format("  %-5d %s%-10s%s %s",
                        i + 1, eventColor, e.event(), RESET, e.description()));
            }
        }
        println();
    }

    private void handleReset() {
        println();
        String confirm = prompt(YELLOW + "Reset calculator to 0 and clear all history? [y/N]" + RESET).trim();
        if (confirm.equalsIgnoreCase("y")) {
            engine.reset();
            historyLog.clear();
            printSuccess("Calculator reset.");
        } else {
            println(DIM + "  Reset cancelled." + RESET);
        }
    }

    private void handleHelp() {
        println();
        printSectionHeader("  ADVANCED CALCULATOR HELP  ");

        // 1. Navigation
        println(BOLD + WHITE + "  1. Navigation & Menu" + RESET);
        println("  1  →  " + GREEN + "Calculate" + RESET + "      Perform a new math operation");
        println("  2  →  " + YELLOW + "Undo" + RESET + "           Reverse the last calculation");
        println("  3  →  " + CYAN + "Redo" + RESET + "           Re-apply the most recently undone action");
        println("  4  →  " + BLUE + "History" + RESET + "        View the full session log");
        println("  5  →  " + MAGENTA + "Reset" + RESET
                + "          Clear result and all history (requires 'y' confirmation)");
        println("  6  →  " + WHITE + "Help" + RESET + "           Show this screen");
        println("  0  →  " + RED + "Exit" + RESET + "           Close the application (aliases: q, quit, exit)");
        println();

        // 2. Performing Calculations
        println(BOLD + WHITE + "  2. Performing a Calculation" + RESET);
        println("  Step 1: Choose an operation (e.g., '+', 'sin', 'sqrt').");
        println("  Step 2: Enter the required number of values.");
        println("  • " + DIM + "The TUI automatically detects if an op is Unary (1 value) or Binary (2)." + RESET);
        println("  • " + DIM + "You have 3 attempts for numeric input before the operation cancels." + RESET);
        println();

        // 3. Supported Operations
        println(BOLD + WHITE + "  3. Supported Operations" + RESET);
        printSupportedOperations();
        println("  • " + DIM + "Scientific angles (sin, cos) must be entered in DEGREES." + RESET);
        println("  • " + DIM + "Natural Logarithm (log) uses base e." + RESET);
        println("  • " + DIM + "Exponents (pow) take Base then Power." + RESET);
        println();

        // 4. Undo/Redo & History
        println(BOLD + WHITE + "  4. State & History" + RESET);
        println("  • " + YELLOW + "Undo" + RESET + " can be called multiple times to walk back through your session.");
        println("  • " + CYAN + "Redo" + RESET + " is only available immediately after an Undo.");
        println("  • " + RED + "CRITICAL:" + RESET + " Performing a " + GREEN + "NEW" + RESET
                + " calculation clears the Redo stack.");
        println("  • History colors: " + GREEN + "EXECUTE" + RESET + ", " + YELLOW + "UNDO" + RESET + ", " + CYAN
                + "REDO" + RESET + ", " + MAGENTA + "RESET" + RESET + ".");
        println();

        // 5. Common Errors
        println(BOLD + WHITE + "  5. Troubleshooting" + RESET);
        println("  • " + RED + "Unknown operation" + RESET + "  → Check the symbols in section 3 above.");
        println("  • " + RED + "Arithmetic errors" + RESET
                + "  → Division by zero, log(0), or sqrt(-1) are restricted.");
        println("  • " + RED + "Invalid number" + RESET + "     → Ensure you use decimals (e.g. 3.14) or integers.");
        println();
    }

    private void printBanner() {
        println();
        println(CYAN + BOLD + "╔══════════════════════════════════════╗" + RESET);
        println(CYAN + BOLD + "║                                      ║" + RESET);
        println(CYAN + BOLD + "║" + RESET + "      " + CYAN + "✦" + RESET + "  " + BOLD + GREEN + "Advanced Calculator"
                + RESET + "  " + CYAN + "✦" + RESET + CYAN + BOLD + "       ║" + RESET);
        println(CYAN + BOLD + "║                                      ║" + RESET);
        println(CYAN + BOLD + "╚══════════════════════════════════════╝" + RESET);
        println();
    }

    private void printMenu() {
        println();
        println(BOLD + WHITE + "┌────────────────────────┐" + RESET);
        println(BOLD + WHITE + "│          MENU          │" + RESET);
        println(BOLD + WHITE + "├────────────────────────┤" + RESET);
        println(BOLD + WHITE + "│  " + GREEN + "1" + RESET + "  Calculate          " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + YELLOW + "2" + RESET + "  Undo               " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + CYAN + "3" + RESET + "  Redo               " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + BLUE + "4" + RESET + "  View History       " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + MAGENTA + "5" + RESET + "  Reset              " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + WHITE + "6" + RESET + "  Help               " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "│  " + RED + "0" + RESET + "  Exit               " + BOLD + WHITE + "│" + RESET);
        println(BOLD + WHITE + "└────────────────────────┘" + RESET);
    }

    private void printStatus() {
        String undoStatus = engine.canUndo() ? GREEN + "✔" + RESET : DIM + "✘" + RESET;
        String redoStatus = engine.canRedo() ? GREEN + "✔" + RESET : DIM + "✘" + RESET;

        println();
        println(String.format(
                "  %sCurrent Result:%s %s%-18s%s  %sUndo:%s %s  %sRedo:%s %s",
                DIM, RESET,
                BOLD + CYAN, formatResult(engine.getCurrentResult()), RESET,
                DIM, RESET, undoStatus,
                DIM, RESET, redoStatus));

        if (!lastEvent.isEmpty()) {
            println(DIM + "  Last: " + lastDescription + RESET);
        }
    }

    private void printSectionHeader(String title) {
        int width = 60;
        int padding = (width - title.length()) / 2;
        String line = "─".repeat(width);
        println(CYAN + line + RESET);
        println(CYAN + " ".repeat(padding) + BOLD + title + RESET + CYAN + RESET);
        println(CYAN + line + RESET);
    }

    private void printSupportedOperations() {
        println(DIM + "  Available Operations:" + RESET);
        String topBorder = CYAN + "  ┌────────────┬─────────────────────────────────────────────┐" + RESET;
        String midBorder = CYAN + "  ├────────────┼─────────────────────────────────────────────┤" + RESET;
        String botBorder = CYAN + "  └────────────┴─────────────────────────────────────────────┘" + RESET;

        println(topBorder);

        println("  " + CYAN + "│" + RESET + WHITE + BOLD + "  Standard  " + RESET + CYAN + "│" + RESET
                + "  " + GREEN + "+" + RESET + "  " + GREEN + "-" + RESET + "  " + GREEN + "*" + RESET + "  " + GREEN
                + "/" + RESET + "  " + GREEN + "%" + RESET
                + DIM + "  (add, sub, mul, div, mod)" + RESET + "   " + CYAN + "│" + RESET);

        println(midBorder);

        println("  " + CYAN + "│" + RESET + WHITE + BOLD + "  Scientific" + RESET + CYAN + "│" + RESET
                + "  " + MAGENTA + "sin    cos    log    sqrt    pow" + RESET + "           " + CYAN + "│" + RESET);

        println(botBorder);
    }

    private void printSuccess(String message) {
        println(GREEN + "  ✔ " + RESET + message);
    }

    private void printError(String message) {
        println(RED + "  ✘ Error: " + message + RESET);
    }

    private String prompt(String label) {
        System.out.print(BOLD + "  » " + label + ": " + RESET);
        return scanner.nextLine();
    }

    private Double promptDouble(String label) {
        for (int attempt = 1; attempt <= 3; attempt++) {
            String raw = prompt(label).trim();
            try {
                return Double.parseDouble(raw);
            } catch (NumberFormatException e) {
                printError("\"" + raw + "\" is not a valid number."
                        + (attempt < 3 ? " Try again (" + attempt + "/3)." : " Aborting."));
            }
        }
        return null;
    }

    private String formatResult(double value) {
        if (value == Math.floor(value) && !Double.isInfinite(value)) {
            return String.format("%.0f", value);
        }
        return String.format("%.6f", value);
    }

    private void println() {
        System.out.println();
    }

    private void println(String text) {
        System.out.println(text);
    }

    private void printGoodbye() {
        println();
        println(CYAN + BOLD + "  Goodbye! Thank you for using Advanced Calculator." + RESET);
        println();
    }
}
