package command;

/**
 * COMMAND PATTERN — Interface (Command)
 *
 * Represents a user's calculation request as a standalone, self-contained
 * object.
 * This is the architectural cornerstone that enables:
 * - History tracking (each command is a replayable record)
 * - Undo/Redo support (each command knows how to reverse itself)
 *
 * Receiver: CalculatorEngine
 * Invoker: CalculatorEngine.executeCommand()
 * Client: TUI (creates and passes commands to the engine)
 */
public interface Command {

    /**
     * Executes the calculation encapsulated by this command.
     *
     * @return the result of the computation
     */
    double execute();

    /**
     * Reverses the effect of this command, restoring the previous state.
     */
    void undo();

    /**
     * Returns a human-readable description of this command for the history log.
     * Example: "10.0 + 5.0 = 15.0"
     */
    String getDescription();
}
