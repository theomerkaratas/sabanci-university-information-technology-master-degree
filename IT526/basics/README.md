# Design Pattern Project

A simple Java project demonstrating basic Java compilation and execution.

## Project Structure

```
design-patern/
├── bin/              # Compiled .class files
├── src/              # Source .java files
│   └── Main.java
└── README.md
```

## Prerequisites

- Java Development Kit (JDK) installed
- Terminal or Command Prompt access

## Compilation

To compile the Java source files:

```bash
javac -d bin src/*.java
```

**What this does:**

- `javac` - Java compiler
- `-d bin` - Output directory for compiled classes
- `src/Main.java` - Source file to compile

## Execution

To run the compiled program:

```bash
java -cp bin Main
```

**What this does:**

- `java` - Java runtime
- `-cp bin` - Classpath (where to find .class files)
- `Main` - Main class to execute

## Quick Start

Run both commands in sequence:

```bash
javac -d bin src/*.java && java -cp bin Main
```

This compiles and runs the program in one command.

## Expected Output

```
Hi World!
```

## Troubleshooting

### Error: "Could not find or load main class Main"

- Make sure you've compiled first: `javac -d bin src/Main.java`
- Verify the `bin` folder exists and contains `Main.class`
- Ensure you're in the correct directory

### Error: "Cannot find symbol"

- Check that all imported classes are available
- Verify the source file syntax is correct

## Notes

- The `package src;` declaration in Main.java has been removed for simplicity
- All compiled files are stored in the `bin` directory
- The source files remain in the `src` directory
