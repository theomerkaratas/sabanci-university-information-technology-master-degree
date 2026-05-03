
import engine.CalculatorEngine;
import observer.HistoryLog;
import tui.TerminalUI;

/**
 * Application entry point.
 *
 * Wires all components together (poor-man's DI):
 * 1. Creates the CalculatorEngine (Subject + Command Invoker)
 * 2. Creates the HistoryLog (Concrete Observer — persistence)
 * 3. Creates the TerminalUI (Concrete Observer — display + input)
 * 4. Registers both observers with the engine
 * 5. Starts the TUI event loop
 */
public class Main {

    public static void main(String[] args) {
        CalculatorEngine engine = new CalculatorEngine();
        HistoryLog historyLog = new HistoryLog();
        TerminalUI tui = new TerminalUI(engine, historyLog);

        // Register observers — the engine will push notifications to both
        engine.addObserver(historyLog);
        engine.addObserver(tui);

        // Hand control to the TUI
        tui.start();
    }
}
