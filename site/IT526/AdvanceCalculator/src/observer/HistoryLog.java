package observer;

import java.util.ArrayList;
import java.util.List;

/**
 * OBSERVER PATTERN — Concrete Observer: HistoryLog
 *
 * Maintains a session-based list of every operation performed.
 * Registered as an observer on the CalculatorEngine; whenever the engine's
 * state changes, onStateChanged() is automatically invoked — the engine
 * does not call the history log directly.
 */
public class HistoryLog implements CalculatorObserver {

    /** Immutable record of a single session event. */
    public record HistoryEntry(String event, String description, double result) {
    }

    private final List<HistoryEntry> entries = new ArrayList<>();

    @Override
    public void onStateChanged(String event, String description, double result) {
        entries.add(new HistoryEntry(event, description, result));
    }

    /**
     * Returns an unmodifiable snapshot of the full session history.
     */
    public List<HistoryEntry> getEntries() {
        return List.copyOf(entries);
    }

    /**
     * Clears all recorded history entries for the current session.
     */
    public void clear() {
        entries.clear();
    }
}
