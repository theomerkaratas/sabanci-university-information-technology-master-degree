package tui;

import engine.CalculatorEngine;
import factory.OperationFactory;
import java.util.List;
import java.util.Scanner;
import observer.CalculatorObserver;
import observer.HistoryLog;
import strategy.Operation;

/**
 * TerminalUI — Text User Interface for the Advanced Calculator.
 *
 * Implements CalculatorObserver (OBSERVER PATTERN) so it can display
 * live feedback whenever the engine's state changes.
 *
 * Responsibilities:
 * - Render the interactive menu and prompts
 * - Parse user input and delegate to the CalculatorEngine
 * - Display results, errors, and history in a clear, structured format
 */
public class TerminalUI implements CalculatorObserver {

    // ── ANSI color codes ─────────────────────────────────────────────────────
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

    /** Tracks the last observer notification for inline display. */
    private String lastEvent = "";
    private String lastDescription = "";

    public TerminalUI(CalculatorEngine engine, HistoryLog historyLog) {
        this.engine = engine;
        this.historyLog = historyLog;
        this.scanner = new Scanner(System.in);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Public entry point
    // ═══════════════════════════════════════════════════════════════════════

    /** Starts the interactive TUI loop. Blocks until the user exits. */
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

    // ═══════════════════════════════════════════════════════════════════════
    // OBSERVER PATTERN — onStateChanged
    // ═══════════════════════════════════════════════════════════════════════

    @Override
    public void onStateChanged(String event, String description, double result) {
        // Store for inline display in printStatus(); HistoryLog handles persistence.
        lastEvent = event;
        lastDescription = description;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Menu handlers
    // ═══════════════════════════════════════════════════════════════════════

    private void handleCalculate() {
        println();
        printSectionHeader("  NEW CALCULATION  ");

        // Step 1 — choose operation
        printSupportedOperations();
        String token = prompt("Operation").trim();

        Operation op;
        try {
            op = OperationFactory.create(token);
        } catch (IllegalArgumentException e) {
            printError(e.getMessage());
            return;
        }

        // Step 2 — gather operands
        double[] operands = new double[op.getOperandCount()];
        for (int i = 0; i < op.getOperandCount(); i++) {
            String label = op.getOperandCount() == 1
                    ? "Value"
                    : (i == 0 ? "Operand A" : "Operand B");

            // Hint: for unary scientific ops, clarify units
            if (op.getOperandCount() == 1 && (token.equalsIgnoreCase("sin") || token.equalsIgnoreCase("cos"))) {
                label += " (degrees)";
            }

            Double parsed = promptDouble(label);
            if (parsed == null)
                return; // user entered invalid input; already printed error
            operands[i] = parsed;
        }

        // Step 3 — execute via engine
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
        printSectionHeader("  HELP  ");
        println(BOLD + "  Operations" + RESET);
        printSupportedOperations();
        println(BOLD + "  Menu Options" + RESET);
        println("  1  →  Perform a calculation");
        println("  2  →  Undo the last calculation");
        println("  3  →  Redo the last undone calculation");
        println("  4  →  View full session history");
        println("  5  →  Reset calculator to 0");
        println("  6  →  Show this help screen");
        println("  0  →  Exit the calculator");
        println();
        println(BOLD + "  Usage Notes" + RESET);
        println("  • Binary ops (+, -, *, /, %, pow) require two numbers.");
        println("  • Unary ops (sin, cos, log, sqrt) require one number.");
        println("  • sin / cos input is in degrees.");
        println("  • log is the natural logarithm (base e).");
        println("  • Type the symbol or the name — both work (e.g. + or add).");
        println();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // Rendering helpers
    // ═══════════════════════════════════════════════════════════════════════

    private void printBanner() {
        println();
        println(CYAN + BOLD + "╔══════════════════════════════════════╗" + RESET);
        println(CYAN + BOLD + "║                                      ║" + RESET);
        println(CYAN + BOLD + "║" + RESET + "      " + CYAN + "✦" + RESET + "  " + BOLD + GREEN + "Advanced Calculator" + RESET + "  " + CYAN + "✦" + RESET + CYAN + BOLD + "       ║" + RESET);
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

        // Standard Row
        println("  " + CYAN + "│" + RESET + WHITE + BOLD + "  Standard  " + RESET + CYAN + "│" + RESET
                + "  " + GREEN + "+" + RESET + "  " + GREEN + "-" + RESET + "  " + GREEN + "*" + RESET + "  " + GREEN
                + "/" + RESET + "  " + GREEN + "%" + RESET
                + DIM + "  (add, sub, mul, div, mod)" + RESET + "   " + CYAN + "│" + RESET);

        println(midBorder);

        // Scientific Row
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

    /**
     * Prompts for a numeric input, repeating up to 3 times on bad input.
     * Returns null if the user fails all attempts, signalling the caller to abort.
     */
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
        // Avoid trailing zeros for whole numbers; keep precision otherwise
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
