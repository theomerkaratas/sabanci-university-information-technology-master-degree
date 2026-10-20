package observer;

public interface CalculatorObserver {
    void onStateChanged(String event, String description, double result);
}
