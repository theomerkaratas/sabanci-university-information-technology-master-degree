import decorator.ValidationDecorator;
import engine.CalculatorEngine;
import factory.OperationFactory;
import observer.HistoryLog;
import strategy.*;

import java.util.List;

public class CalculatorTest {

    private static int passed = 0;
    private static int failed = 0;

    private static void expect(String name, boolean condition) {
        if (condition) {
            System.out.println("  ✔  PASS  " + name);
            passed++;
        } else {
            System.out.println("  ✘  FAIL  " + name);
            failed++;
        }
    }

    private static void expectThrows(String name, Class<? extends Throwable> expected, Runnable block) {
        try {
            block.run();
            System.out.println("  ✘  FAIL  " + name + "  (no exception thrown)");
            failed++;
        } catch (Throwable t) {
            if (expected.isInstance(t)) {
                System.out.println("  ✔  PASS  " + name + "  [" + t.getMessage() + "]");
                passed++;
            } else {
                System.out.println("  ✘  FAIL  " + name + "  (wrong exception: " + t.getClass().getSimpleName() + ")");
                failed++;
            }
        }
    }

    private static boolean near(double a, double b) {
        return Math.abs(a - b) < 1e-9;
    }

    private static void section(String title) {
        System.out.println("\n────────────────────────────────────────────────────────");
        System.out.println("  " + title);
        System.out.println("────────────────────────────────────────────────────────");
    }

    public static void main(String[] args) {

        System.out.println("╔══════════════════════════════════════════════════════╗");
        System.out.println("║   Advanced Calculator — Test Suite (TODO.md §2)      ║");
        System.out.println("╚══════════════════════════════════════════════════════╝");

        testStandardOperations();
        testScientificSuite();
        testStateManagement();
        testHistoryLog();
        testPrecisionAndErrors();
        testFactoryRouting();
        testDecoratorValidation();
        testObserverIntegration();

        System.out.println("\n════════════════════════════════════════════════════════");
        System.out.printf("  Results:  %d passed  |  %d failed  |  %d total%n",
                passed, failed, passed + failed);
        System.out.println("════════════════════════════════════════════════════════");

        if (failed > 0) {
            System.exit(1);
        }
    }

    static void testStandardOperations() {
        section("FR-1 · Standard Operations");
        CalculatorEngine engine = new CalculatorEngine();

        expect("Addition:    4 + 6 = 10",           near(engine.compute("+",  4, 6),   10.0));
        expect("Subtraction: 10 - 3 = 7",           near(engine.compute("-",  10, 3),   7.0));
        expect("Multiply:    3 * 7 = 21",            near(engine.compute("*",  3, 7),   21.0));
        expect("Division:    15 / 4 = 3.75",         near(engine.compute("/",  15, 4),   3.75));
        expect("Modulo:      17 % 5 = 2",            near(engine.compute("%",  17, 5),   2.0));
-
        expect("Token alias 'add'",                  near(engine.compute("add", 1, 1),  2.0));
        expect("Token alias 'sub'",                  near(engine.compute("sub", 5, 2),  3.0));
        expect("Token alias 'mul'",                  near(engine.compute("mul", 4, 4),  16.0));
        expect("Token alias 'div'",                  near(engine.compute("div", 9, 3),  3.0));
        expect("Token alias 'mod'",                  near(engine.compute("mod", 10, 3), 1.0));

        expect("Float precision: 0.1 + 0.2 ≈ 0.3",  near(engine.compute("+", 0.1, 0.2), 0.3));
        expect("Negative result: 3 - 8 = -5",        near(engine.compute("-", 3, 8),  -5.0));
    }

    static void testScientificSuite() {
        section("FR-2 · Scientific Suite");
        CalculatorEngine engine = new CalculatorEngine();

        expect("sin(0°) = 0", near(engine.compute("sin", 0), 0.0));
        expect("sin(90°) = 1", near(engine.compute("sin", 90), 1.0));
        expect("sin(30°) ≈ 0.5", near(engine.compute("sin", 30), 0.5));
        expect("sin(60°) ≈ √3/2", near(engine.compute("sin", 60), Math.sqrt(3) / 2));

        expect("cos(0°) = 1", near(engine.compute("cos", 0), 1.0));
        expect("cos(90°) ≈ 0", near(engine.compute("cos", 90), 0.0));
        expect("cos(60°) = 0.5", near(engine.compute("cos", 60), 0.5));

        expect("log(1) = 0", near(engine.compute("log", 1), 0.0));
        expect("log(e) = 1", near(engine.compute("log", Math.E), 1.0));
        expect("log(100) ≈ 4.605", near(engine.compute("log", 100), Math.log(100)));

        expect("sqrt(0) = 0", near(engine.compute("sqrt", 0), 0.0));
        expect("sqrt(4) = 2", near(engine.compute("sqrt", 4), 2.0));
        expect("sqrt(2) ≈ 1.414", near(engine.compute("sqrt", 2), Math.sqrt(2)));

        expect("pow(2,10) = 1024", near(engine.compute("pow", 2, 10), 1024.0));
        expect("pow(5,0) = 1", near(engine.compute("pow", 5, 0), 1.0));
        expect("pow(9,0.5) = 3", near(engine.compute("pow", 9, 0.5), 3.0));
    }

    static void testStateManagement() {
        section("FR-3 · State Management (Undo / Redo)");
        CalculatorEngine engine = new CalculatorEngine();

        expect("Initially cannot undo", !engine.canUndo());
        expect("Initially cannot redo", !engine.canRedo());

        engine.compute("+", 4, 6);
        expect("After 1 op can undo", engine.canUndo());
        expect("After 1 op no redo", !engine.canRedo());
        expect("Result after add", near(engine.getCurrentResult(), 10.0));

        engine.compute("sin", 90);
        expect("Result after sin(90)", near(engine.getCurrentResult(), 1.0));

        engine.undo();
        expect("After undo: result reverts to 10", near(engine.getCurrentResult(), 10.0));
        expect("Can redo after undo", engine.canRedo());

        engine.redo();
        expect("After redo: result = 1", near(engine.getCurrentResult(), 1.0));
        expect("Cannot redo after redo", !engine.canRedo());

        engine.undo();
        engine.compute("*", 2, 3);
        expect("New op clears redo", !engine.canRedo());

        engine.undo();
        engine.undo();
        expect("Multi-undo to 0", near(engine.getCurrentResult(), 0.0));
        expect("Nothing left to undo", !engine.canUndo());

        expectThrows("Undo on empty stack throws",
                IllegalStateException.class, engine::undo);

        engine.compute("+", 1, 1);
        engine.undo();
        engine.redo();
        expectThrows("Redo on empty stack throws",
                IllegalStateException.class, engine::redo);

        engine.compute("+", 5, 5);
        engine.reset();
        expect("Reset clears result", near(engine.getCurrentResult(), 0.0));
        expect("Reset clears undo", !engine.canUndo());
        expect("Reset clears redo", !engine.canRedo());
    }

    static void testHistoryLog() {
        section("FR-4 · History Log");
        CalculatorEngine engine = new CalculatorEngine();
        HistoryLog log = new HistoryLog();
        engine.addObserver(log);

        expect("Empty log at start", log.getEntries().isEmpty());

        engine.compute("+", 2, 3);
        expect("1 entry after compute", log.getEntries().size() == 1);
        expect("Event = EXECUTE", "EXECUTE".equals(log.getEntries().get(0).event()));

        engine.compute("sin", 90);
        expect("2 entries after second compute", log.getEntries().size() == 2);

        engine.undo();
        expect("3rd entry = UNDO", "UNDO".equals(log.getEntries().get(2).event()));

        engine.redo();
        expect("4th entry = REDO", "REDO".equals(log.getEntries().get(3).event()));

        engine.reset();
        expect("5th entry = RESET", "RESET".equals(log.getEntries().get(4).event()));

        List<HistoryLog.HistoryEntry> snapshot = log.getEntries();
        expectThrows("getEntries() returns unmodifiable list",
                UnsupportedOperationException.class,
                () -> snapshot.add(new HistoryLog.HistoryEntry("X", "x", 0)));

        log.clear();
        expect("Log empty after clear", log.getEntries().isEmpty());
    }

    static void testPrecisionAndErrors() {
        section("FR-5 · Precision & Error Handling");

        DivideOperation div = new DivideOperation();
        expectThrows("DivideOperation: x / 0 throws ArithmeticException",
                ArithmeticException.class, () -> div.execute(5, 0));

        SqrtOperation sqrt = new SqrtOperation();
        expectThrows("SqrtOperation: sqrt(-1) throws ArithmeticException",
                ArithmeticException.class, () -> sqrt.execute(-1));

        LogOperation log = new LogOperation();
        expectThrows("LogOperation: log(0) throws ArithmeticException",
                ArithmeticException.class, () -> log.execute(0));

        expectThrows("LogOperation: log(-5) throws ArithmeticException",
                ArithmeticException.class, () -> log.execute(-5));

        expectThrows("OperationFactory: unknown token throws IllegalArgumentException",
                IllegalArgumentException.class, () -> OperationFactory.create("tangens"));

        ModuloOperation mod = new ModuloOperation();
        expectThrows("ModuloOperation: x % 0 throws ArithmeticException",
                ArithmeticException.class, () -> mod.execute(5, 0));
-
        AddOperation add = new AddOperation();
        expect("Add: negative + positive = correct", near(add.execute(-3.5, 3.5), 0.0));

        expect("SqrtOperation: sqrt(0) = 0", near(sqrt.execute(0), 0.0));
    }

    static void testFactoryRouting() {
        section("FR-6 · Factory Routing");

        expect("+ → AddOperation", OperationFactory.create("+") instanceof AddOperation);
        expect("- → SubtractOperation", OperationFactory.create("-") instanceof SubtractOperation);
        expect("* → MultiplyOperation", OperationFactory.create("*") instanceof MultiplyOperation);
        expect("/ → DivideOperation", OperationFactory.create("/") instanceof DivideOperation);
        expect("% → ModuloOperation", OperationFactory.create("%") instanceof ModuloOperation);
        expect("sin → SinOperation", OperationFactory.create("sin") instanceof SinOperation);
        expect("cos → CosOperation", OperationFactory.create("cos") instanceof CosOperation);
        expect("log → LogOperation", OperationFactory.create("log") instanceof LogOperation);
        expect("sqrt → SqrtOperation", OperationFactory.create("sqrt") instanceof SqrtOperation);
        expect("pow → PowerOperation", OperationFactory.create("pow") instanceof PowerOperation);

        expect("SIN (upper) → SinOperation", OperationFactory.create("SIN") instanceof SinOperation);
        expect("ADD (upper) → AddOperation", OperationFactory.create("ADD") instanceof AddOperation);

        expect("'  add  ' trimmed → AddOperation", OperationFactory.create("  add  ") instanceof AddOperation);
    }

    static void testDecoratorValidation() {
        section("Decorator · ValidationDecorator");

        AddOperation raw = new AddOperation();
        ValidationDecorator vd = new ValidationDecorator(raw);

        expect("Valid operands pass through", near(vd.execute(2, 3), 5.0));

        expectThrows("NaN operand rejected",
                IllegalArgumentException.class, () -> vd.execute(Double.NaN, 1));

        expectThrows("Infinite operand rejected",
                IllegalArgumentException.class, () -> vd.execute(1, Double.POSITIVE_INFINITY));

        expect("getSymbol() delegates to wrapped op", "+".equals(vd.getSymbol()));
    }

    static void testObserverIntegration() {
        section("Observer · Multi-Observer Decoupling");

        CalculatorEngine engine = new CalculatorEngine();
        HistoryLog log1 = new HistoryLog();
        HistoryLog log2 = new HistoryLog();

        engine.addObserver(log1);
        engine.addObserver(log2);

        engine.compute("+", 1, 2);

        expect("Both observers notified (log1)", log1.getEntries().size() == 1);
        expect("Both observers notified (log2)", log2.getEntries().size() == 1);

        engine.removeObserver(log2);
        engine.compute("+", 3, 4);

        expect("Removed observer not notified", log2.getEntries().size() == 1);
        expect("Kept observer still notified", log1.getEntries().size() == 2);

        HistoryLog.HistoryEntry entry = log1.getEntries().get(0);
        expect("Entry result is correct", near(entry.result(), 3.0));
        expect("Entry event is EXECUTE", "EXECUTE".equals(entry.event()));
        expect("Entry description non-empty", entry.description() != null && !entry.description().isEmpty());
    }
}
