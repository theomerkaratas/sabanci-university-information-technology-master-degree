import engine.CalculatorEngine;
import observer.HistoryLog;
import tui.TerminalUI;

public class Main {

    public static void main(String[] args) {
        CalculatorEngine engine = new CalculatorEngine();
        HistoryLog historyLog = new HistoryLog();
        TerminalUI tui = new TerminalUI(engine, historyLog);

        engine.addObserver(historyLog);
        engine.addObserver(tui);

        tui.start();
    }
}
