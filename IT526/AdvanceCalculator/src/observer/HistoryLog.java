package observer;

import java.util.ArrayList;
import java.util.List;

public class HistoryLog implements CalculatorObserver {

    public record HistoryEntry(String event, String description, double result) {
    }

    private final List<HistoryEntry> entries = new ArrayList<>();

    @Override
    public void onStateChanged(String event, String description, double result) {
        entries.add(new HistoryEntry(event, description, result));
    }

    public List<HistoryEntry> getEntries() {
        return List.copyOf(entries);
    }

    public void clear() {
        entries.clear();
    }
}
