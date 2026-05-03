package observer;

/**
 * OBSERVER PATTERN — Interface (Observer)
 *
 * Any component that wants to be notified when the calculator's state changes
 * (e.g., a new result is computed, or a command is undone) must implement this
 * interface.
 *
 * Decoupling benefit: the CalculatorEngine (Subject) never holds a concrete
 * reference
 * to the TUI or the history log — it only knows about this interface, which
 * means
 * UI components can be added or removed without touching the engine.
 */
public interface CalculatorObserver {

    /**
     * Called by the CalculatorEngine (Subject) whenever its state changes.
     *
     * @param event       a short label describing what changed ("EXECUTE", "UNDO",
     *                    "REDO")
     * @param description a human-readable summary of the operation that triggered
     *                    the change
     * @param result      the engine's current result after the state change
     */
    void onStateChanged(String event, String description, double result);
}
