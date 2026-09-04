package command;

public interface Command {

    double execute();

    void undo();

    String getDescription();
}
