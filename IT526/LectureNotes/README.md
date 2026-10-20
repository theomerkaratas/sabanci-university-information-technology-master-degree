# Enterprise Java Frameworks and Design Patterns

# Generic Design Principles

## What Are OO Design Principles?

- Object-Oriented Design Principles are advice, not laws.
- They are obtained through experience in software development.
- It is important to understand that knowing these principles alone does not automatically make you a good software engineer.
- In this course, we will go through well-known principles that guide effective software design.

## Overview of Generic Design Principles

The following generic design principles apply broadly across software development, not only to object-oriented systems:

- KISS (Keep It Simple, Stupid)
- DRY (Do Not Repeat Yourself)
- YAGNI (You Aren't Gonna Need It)
- Separation of Concerns
- Simplest Working Thing
- Avoid Premature Optimization
- Boy-Scout Rule

Each of these is explained in detail below.

## DRY (Do Not Repeat Yourself)

### What It Means:

- Every piece of knowledge must have a single, unambiguous representation within a system.
- Significant functionality should exist in exactly one place in the source code.

### Why Use DRY:

- Prevents maintenance nightmares and logical contradictions caused by duplication.
- Changes remain predictable; modifying one element keeps related parts in sync without affecting unrelated ones.

### How to Apply DRY:

- Centralize business rules, logic, and formulas in one location.
- Abstract similar functions into a single implementation by isolating varying parts.

## YAGNI (You Aren't Gonna Need It)

### What It Means:

- Don’t implement something until it is strictly necessary.

### Why Use YAGNI:

- Any work that is only used for a feature that might be needed tomorrow means losing effort from features that need to be done for the current iteration.
- Implementing unnecessary features leads to code bloat—the software becomes larger and more complicated than it needs to be.

### How to Apply YAGNI:

- Implement features based on actual current needs, never on future foresight.

## Separation of Concerns

### What It Means:

- Divide a program into sections addressing separate concerns (e.g., business logic vs. UI).
- Changes to one concern should not require changes to another.

### Why Use Separation of Concerns:

- Simplifies development and maintenance.
- Enables modules to be reused and updated independently.

### How to Apply Separation of Concerns:

- Use a "divide and conquer" approach to create modules with minimal overlap.

## Simplest Working Thing

### What It Means:

- Focuses on maximizing progress by addressing the actual problem at hand, avoiding anticipated future complications.

### Why Use Simplest Working Thing:

- Working only on current requirements ensures maximum focus on solving the real problem.

### How to Apply Simplest Working Thing:

- Ask: "What is the simplest thing that could possibly work?"
- Implement the new capability in the simplest way possible.
- Refactor the code to remain the simplest representation of all current features.

## Boy-Scout Rule

### What It Means:

- Based on the principle "Leave the campground cleaner than you found it," always aim to leave the code better than you found it.

### Why Use the Boy-Scout Rule:

- Prevents technical debt and code degradation by ensuring quality is minded with every change.

### How to Apply the Boy-Scout Rule:

- Ensure every commit maintains or improves codebase quality.
- Fix unclear code immediately upon discovery.

### Summary Table of Principles

| Principle                  | Core Idea                                                | Key Benefit                     |
| :------------------------- | :------------------------------------------------------- | :------------------------------ |
| **DRY**                    | Don't repeat knowledge; one authoritative representation | Maintainability, sync           |
| **YAGNI**                  | Don't implement until necessary                          | Avoids waste, prevents bloat    |
| **Separation of Concerns** | Split program into distinct concern areas                | Independent development & reuse |
| **Simplest Working Thing** | Implement simply first, then refactor                    | Maximizes real progress         |
| **Boy-Scout Rule**         | Leave code cleaner than you found it                     | Resists technical debt          |

# Inter-Module Design Principles

## Overview of Inter-Module Principles

This set of principles focuses on the relationships between modules or components in a software system. The key inter-module principles covered are:

- Minimize Coupling
- Law of Demeter
- Composition over Inheritance
- Robustness Principle
- Inversion of Control

Each principle is explained in detail below.

## Minimize Coupling

### What It Means:

- The degree of mutual interdependence between modules. Lower coupling minimizes the risk of one unit breaking after changes to another.

### Why Minimize Coupling:

- High coupling creates a "ripple effect" of changes, making systems fragile and difficult to maintain.

### How to Minimize Coupling:

- Eliminate or simplify relationships between modules.
- Reduce coupling by hiding implementation details and following the Law of Demeter.

## Law of Demeter

### What It Means:

- Also known as the "Principle of Least Knowledge," its core rule is: "Don't talk to strangers!"

### Why Follow the Law of Demeter:

- Reduces coupling and preserves encapsulation by preventing objects from knowing too much about each other's internals.

### How to Apply the Law of Demeter:

- A method should only call its own methods, its arguments, objects it creates, or its direct properties.
- Follow the "One Dot Rule": prefer `a.Method()` over `a.b.Method()`.
- Avoid "train wrecks" (method chains) by delegating tasks and focusing on "what" rather than "how."

## Composition over Inheritance

### What It Means:

- Construct complex behaviors by containing instances (composition) rather than subclassing (inheritance).

### Key Distinction:

- Inheritance represents an "is-a" relationship, while composition represents a "uses-a" relationship.

### Why Prefer Composition:

- Creates looser coupling and more flexibility than inheritance.
- Avoids fragile hierarchies and prevents breaking the Liskov Substitution Principle (LSP).
- Each behavior is a separate class, allowing near-infinite combinations for complex logic.

### How to Decide:

- Use inheritance only for genuine "is-a" relationships where substitutability (LSP) is maintained.
- Use composition for "has-a" or "uses-a" relationships.

### Comparison Table: Inheritance vs. Composition

| Aspect               | Inheritance (is-a)                                                               | Composition (uses-a)                                                                           |
| :------------------- | :------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| **Coupling**         | Tight coupling between super-class and sub-class                                 | Loose coupling between front-end and back-end                                                  |
| **Interface impact** | Changes to super-class interface ripple to sub-class and its consumers           | Changes to back-end may change front-end implementation but less likely to ripple to interface |
| **Compatibility**    | Every change to sub-class interface must be compatible with super-class          | Not every change to front-end interface needs compatibility with back-end                      |
| **Timing**           | Sub-class must pick super-class upfront, at compilation time                     | Front-end can delay selecting back-end until needed, at runtime                                |
| **Lifetime**         | Super-class is instantiated with sub-class and remains for lifetime of sub-class | Back-end can be instantiated only when needed and destroyed earlier                            |
| **Extensibility**    | Easy to add new sub-classes because inheritance comes with polymorphism          | Hard to add new front-ends because delegation must be written by hand                          |
| **Method dispatch**  | Calls to super-class interface can be dispatched directly to sub-class           | Calls to front-end interface must be relayed to back-end programmatically                      |

## Inversion of Control (IoC)

### What It Means:

- Inversion of Control is also known as the Hollywood Principle: "Don't call us, we'll call you."
- It is a design principle in which custom-written portions of a computer program receive the flow of control from a generic framework (rather than the custom code controlling the framework).

### Key Implication:

- Inversion of Control carries the strong implication that the reusable code (the framework) and the problem-specific code (your application) are developed independently, even though they operate together in the same application.

### Why Use Inversion of Control:

- Inversion of Control is used to increase the modularity of the program.
- It makes the program more extensible.
- It helps prevent side effects when replacing one module with another.

### How to Implement Inversion of Control:

- Using Dependency Injection (passing dependencies into an object rather than having the object create them).
- Using design patterns such as:
  - Factory Pattern
  - Strategy Pattern
  - Template Method Pattern

### Summary Table of Inter-Module Principles

| Principle                        | Core Idea                                       | Key Benefit                            |
| :------------------------------- | :---------------------------------------------- | :------------------------------------- |
| **Minimize Coupling**            | Reduce mutual interdependence between modules   | Prevents ripple effects from changes   |
| **Law of Demeter**               | Don't talk to strangers; use only one dot       | Reduces coupling, hides implementation |
| **Composition over Inheritance** | Prefer "uses-a" over "is-a"                     | Looser coupling, more flexibility      |
| **Inversion of Control**         | Framework calls your code (Hollywood Principle) | Modularity, extensibility              |

# SOLID Principles

## Overview of SOLID

- SOLID is an acronym for five foundational object-oriented design principles.
- These principles guide developers in creating software that is maintainable, extensible, and robust.
- The SOLID principles are:
  - Single Responsibility Principle
  - Open/Closed Principle
  - Liskov Substitution Principle
  - Interface Segregation Principle
  - Dependency Inversion Principle

Each principle is explained in detail below.

## Single Responsibility Principle (SRP)

### What It Means:

- The Single Responsibility Principle states: "A class should have only one reason to change."
- In other words, a component of code (such as a class or function) should perform a single, well-defined task.
- Each responsibility is an axis of change—if a class assumes more than one responsibility, that class will have more than one reason to change.

### Why Follow SRP:

- If a class has more than one responsibility, the responsibilities become coupled.
- Changes to one responsibility may impair or inhibit the class's ability to meet the others.
- This kind of coupling leads to fragile designs that break in unexpected ways when changed.

### Example of Violation:

- Consider a Rectangle class that has two responsibilities:
  - It handles geometric calculations (for a ComputationalGeometryApplication).
  - It handles graphical rendering (for a GraphicalApplication).
- If a change to the GraphicalApplication causes the Rectangle to change, that change may force us to rebuild, retest, and redeploy the ComputationalGeometryApplication—even though that application has nothing to do with the graphical change.

### How to Apply SRP:

- Separate different responsibilities into different classes.
- Each class should have exactly one reason to change.

## Open/Closed Principle (OCP)

### What It Means:

- The Open/Closed Principle states that we should write our modules so that they can be extended, without requiring them to be modified.
- We want to be able to change what the modules do without changing the source code of the modules themselves.
- More formally: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
- In simpler terms: don't write classes that people can modify; write classes that people can extend.

### Why Follow OCP:

- It improves maintainability and stability by minimizing changes to existing, working code.

### How to Apply OCP:

- Write classes that can be extended (as opposed to classes that can be modified).
- Expose only the moving parts that need to change; hide everything else.
- Abstraction is the key to achieving OCP.

### Example: Violation vs. Compliance

- **Violation (procedural approach):** Consider a `LogOn` function that checks the modem type with `if-else` statements. Each time a new modem is added, the `LogOn` function must be modified. This makes the system much harder to maintain and is very prone to error.
- **Compliance (object-oriented approach):** Define a `Modem` interface (abstract class) with virtual methods like `Dial()`, `Send()`, `Recv()`, and `Hangup()`. The `LogOn` function depends only on the `Modem` interface. Additional modems will not cause the `LogOn` function to change. We have created a module that can be extended with new modems without requiring modification.

## Liskov Substitution Principle (LSP)

### What It Means:

- The Liskov Substitution Principle states that subclasses should be substitutable for their base classes.
- Objects in a program should be replaceable with instances of their subtypes without altering the correctness of that program.
- A user of a base class should continue to function properly if a derivative of that base class is passed to it.
- In code terms: if some function `User` takes an argument of type `Base`, then it should be legal to pass in an instance of `Derived` to that function.

### Why Follow LSP:

- Violating LSP leads to code that breaks at runtime when a subclass is used where a base class is expected.
- The principle enforces proper design by contract: to be substitutable, the contract of the base class must be honored by the derived class.

### Classic Example: The Circle-Ellipse Dilemma

- All circles are ellipses with coincident foci.
- An Ellipse has three data elements: the first two are the foci, and the last is the length of the major axis.
- If Circle inherits from Ellipse, it will inherit these data variables. But Circle only needs two data elements: a center point and a radius.
- **Immediate (but flawed) solution:** We can set both foci to the same value. However, the problem arises when these methods are exposed to the public.
- **Why this violates LSP:** Users of Ellipse have the right to expect that setting two different foci will work. If we pass an instance of Ellipse into a function that calls `SetFoci` with two different points, it will be quite happy. However, if we pass an instance of Circle into the same function, it will fail rather badly because Circle ignores the second input variable. Circle does not honor the implied contract of Ellipse; therefore, it is not substitutable and violates LSP.

### How to Apply LSP:

- Always ensure that a derived class can fully substitute its base class without altering correctness.
- Test for substitutability. If a function works with the base class, it must also work with any derived class.
- Do not weaken preconditions or strengthen postconditions in derived classes.

## Interface Segregation Principle (ISP)

### What It Means:

- The Interface Segregation Principle states: "Clients should not be forced to depend upon interfaces that they do not use." (Robert Martin)
- In practice, this means:
  - Reduce fat interfaces into multiple smaller and more specific client interfaces.
  - An interface should be more dependent on the code that calls it than the code that implements it.

### Why Follow ISP:

- If a class implements methods that are not needed, the caller needs to know about the method implementation of that class.
- For example, if a class implements a method but simply throws an exception, the caller will need to know that this method shouldn't be called.
- ISP is intended to keep a system decoupled and thus easier to refactor, change, and redeploy.

### What Are Fat Interfaces?

- Classes whose interfaces are not cohesive have fat interfaces.
- The interfaces of such a class can be broken up into groups of methods, where each group serves a different set of clients.
- The clients will only have to know about the methods that are of interest to them.

### Interface Pollution:

- A common example of interface pollution is an ATM with multiple interfaces.
- Adding a new transaction changes the UI interface, forcing all other transactions to be recompiled—even though they don't use the new transaction.

### How to Apply ISP:

- Avoid fat interfaces.
- Classes should never have to implement methods that violate the Single Responsibility Principle.
- Split large interfaces into smaller, more focused interfaces, each serving a specific client.

## Dependency Inversion Principle (DIP)

### What It Means:

- The Dependency Inversion Principle states: Depend upon Abstractions. Do not depend upon concretions.
- This means:
  - The strategy of depending upon interfaces or abstract functions and classes, rather than upon concrete functions and classes.
  - Every dependency in the design should target an interface or an abstract class.
  - No dependency should target a concrete class.
- DIP is about the level of abstraction in the messages sent from your code to the thing it is calling.

### The Inversion Thinking:

- Contrary to traditional structured design (where high-level modules depend on low-level modules), DIP argues that:
  - It is the high-level, policy-setting modules that ought to be influencing the low-level detailed modules.
  - The modules that contain the high-level business rules should take precedence over, and be independent of, the modules that contain implementation details.
  - It is high-level, policy-setting modules that we want to be able to reuse.
- We are already quite good at reusing low-level modules in the form of subroutine libraries. When high-level modules depend on low-level modules, it becomes very difficult to reuse those high-level modules in different contexts.

### Why Follow DIP:

- It enables reusability of high-level modules across different contexts.
- It reduces coupling between high-level policy and low-level implementation details.
- It makes the system more flexible and easier to change.

### How to Apply DIP:

- Design interfaces (abstractions) that define the contracts between modules.
- Have high-level modules depend on these abstractions, not on concrete low-level modules.
- Have low-level modules implement these abstractions.
- Use techniques like Dependency Injection to supply concrete implementations to high-level modules at runtime.

### Summary Table of SOLID Principles

| Principle                 | Core Idea                                              | Key Benefit                                          |
| :------------------------ | :----------------------------------------------------- | :--------------------------------------------------- |
| **Single Responsibility** | A class should have only one reason to change          | Prevents coupled responsibilities, reduces fragility |
| **Open/Closed**           | Open for extension, closed for modification            | Improves maintainability and stability               |
| **Liskov Substitution**   | Subclasses must be substitutable for base classes      | Ensures correctness when using inheritance           |
| **Interface Segregation** | Clients should not depend on interfaces they don't use | Keeps system decoupled, easier to refactor           |
| **Dependency Inversion**  | Depend upon abstractions, not concretions              | Enables reuse of high-level modules                  |

# Module-Level Principles

## Overview of Module-Level Principles

- This set of principles focuses on the internal structure and quality of individual modules or components.
- The key module-level principles covered are:
  - Maximize Cohesion
  - Hide Implementation Details
  - Curly's Law
  - Encapsulate What Changes
  - Command Query Separation
- Each principle is explained in detail below, followed by additional related concepts: Incremental Development and Design for Change.

## Maximize Cohesion

### What It Means:

- Cohesion of a single module or component is the degree to which its responsibilities form a meaningful unit.
- In good software design, higher cohesion is better.
- A highly cohesive module does one thing and does it completely; its internal parts are closely related to a single purpose.

### Why Maximize Cohesion:

- Low cohesion leads to several problems:
- Increased difficulty in understanding modules because they mix unrelated responsibilities.
- Increased difficulty in maintaining a system, because logical changes in the domain affect multiple modules, and because changes in one module require changes in related modules.
- Increased difficulty in reusing a module because most applications will not need the random set of operations provided by a low-cohesion module.

### How to Maximize Cohesion:

- Group related functionalities that share a single responsibility (e.g., within a class, module, or package).
- A module should have one clear purpose, and all of its members should contribute directly to that purpose.

## Hide Implementation Details

### What It Means:

- A software module hides information (i.e., implementation details) by providing an interface and not leaking any unnecessary information to the outside world.
- This is a fundamental principle of encapsulation.

### Why Hide Implementation Details:

- When the implementation changes, the interface that clients are using does not have to change.
- This protects clients from being affected by internal modifications.

### How to Hide Implementation Details:

- Minimize accessibility of classes and members (use private, protected, and package-private appropriately).
- Don't expose member data in public (avoid public fields).
- Avoid putting private implementation details into a class's interface.
- Decrease coupling to hide more implementation details. The more loosely coupled your modules are, the more you can hide.

## Curly's Law

### What It Means:

- Curly's Law is about choosing a single, clearly defined goal for any bit of code.
- The core rule is: Do One Thing.
- More specifically, this principle applies to variables as well as functions and classes:
  - A variable should mean one thing, and one thing only.
  - It should not mean one thing in one circumstance and carry a different value from a different domain some other time.
  - It should not mean two things at once.
  - It should mean One Thing and should mean it all the time.

### Why Follow Curly's Law:

- Violating this principle leads to confusing, error-prone code where the same variable carries multiple meanings in different contexts—a common source of bugs.

### How to Apply Curly's Law:

- Create separate variables for separate concepts. Do not reuse a single variable for multiple purposes.
- Ensure that functions and methods also do exactly one thing.
- If you find a variable or function being used for multiple unrelated purposes, split it into multiple distinct entities.

## Incremental Development (Related Concept)

### What It Means:

- Incremental development means "Keep developing until you get it right."
- It is based on agile methodology and is closely related to many of the design principles discussed.

### Characteristics of Agile-Based Incremental Development:

- Agile methods generally promote:
  - Frequent inspection and adaptation (regularly reviewing and adjusting the work).
  - A leadership philosophy that encourages teamwork.
  - Self-organization and accountability within teams.
  - A set of engineering best practices that allow for rapid delivery of high-quality software.
  - A business approach that aligns development with customer needs and company goals.

## Design for Change

### What It Means:

- Design for Change means:
  - Anticipate new requirements and changes to existing requirements.
  - Design for evolution—your software should be able to grow and adapt over time.
  - Recognize that inflexible design risks major redesign in the future.
  - Understand that unanticipated changes are expensive to implement in rigid systems.

### Role of Design Patterns:

- Each design pattern ensures that a system can change in some specific ways.
- Patterns provide proven solutions that build in flexibility for particular kinds of changes.

## Common Causes of Redesign (What to Avoid)

- To design for change effectively, avoid these common causes that force expensive redesigns:

| Cause                                               | How to Avoid It                                                                                 |
| :-------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Creating an object by specifying a class explicitly | Create objects indirectly (e.g., using factories, dependency injection, or abstract factories). |
| Dependence on specific operations                   | Avoid hard-coded requests. Use abstractions, strategies, or command patterns instead.           |
| Dependence on hardware and software platform        | Abstract out dependencies. Isolate platform-specific code behind interfaces.                    |

### Summary Table of Module-Level Principles

| Principle                       | Core Idea                                            | Key Benefit                                     |
| :------------------------------ | :--------------------------------------------------- | :---------------------------------------------- |
| **Maximize Cohesion**           | Responsibilities form a meaningful unit              | Easier understanding, maintenance, and reuse    |
| **Hide Implementation Details** | Provide an interface; don't leak internals           | Protects clients from implementation changes    |
| **Curly's Law**                 | Do One Thing (variables, functions, classes)         | Prevents confusion and bugs from mixed meanings |
| **Encapsulate What Changes**    | Isolate volatile code behind stable interfaces       | Localizes impact of changes                     |
| **Command Query Separation**    | Methods either change state OR return data, not both | Clearer, more predictable interfaces            |

# Creational Design Patterns

## What Are Creational Patterns?

- Creational design patterns abstract the instantiation process.
- They help make a system independent of how its objects are created, composed, and represented.

### Two Types of Creational Patterns:

- Class creational pattern – uses inheritance to vary the class that is instantiated.
- Object creational pattern – delegates instantiation to another object.

### Creational Patterns Covered in This Course:

- Singleton
- Builder
- Factory
- Abstract Factory
- Prototype
- Twin
- Object Pool
- This study guide covers Singleton and Builder in detail.

## Singleton Pattern

### Intent

- The Singleton pattern ensures that a class has only one instance, and provides a global point of access to that instance.

### Motivation (Real-World Examples)

- Certain system resources should have exactly one instance:
  - One printer spooler
  - One file system
  - One window manager

### Problem Solved by Singleton

- We need to ensure there is a single instance of a class.
- A global variable provides accessibility, but does not guarantee that only one instance exists.

### Solution

- Make the class responsible for its own instance.
- The class itself controls the instantiation process and ensures that only one instance is created.

### When to Use Singleton

- Use Singleton when:
  - There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.
  - The sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.

### Structure

- The Singleton class typically contains:
  - A static instance of itself (uniqueInstance)
  - A private constructor (prevents external instantiation)
  - A static Instance() operation (returns the unique instance)

### Participants

- Singleton – defines an Instance operation that lets clients access its unique instance.
- Instance is a class operation (a static member function in C++ / Java).
- The Singleton may be responsible for creating its own unique instance.
- Clients access a Singleton instance solely through Singleton's Instance operation.

### Benefits of Singleton

- Controlled access to the sole instance – you control how and when clients access it.
- Permits refinement of operations and representation by subclassing.
- Permits a variable number of instances instead of exactly one (you can modify the pattern to allow a fixed number of instances).

### Improvement Over Global Variables (Key Advantages)

| Global Variables                                                                          | Singleton                                                    |
| :---------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| Global instances are always created                                                       | Option to not create an instance at all                      |
| Instantiation cannot be delayed                                                           | Instantiation can be delayed to wait for runtime information |
| Order of calling constructors is not defined (problematic if instances have dependencies) | Singleton instantiation order can be controlled              |

### Implementation Example (Java)

```java
public class SingletonDemo {
    private static SingletonDemo ourInstance = new SingletonDemo();

    public static SingletonDemo getInstance() {
        return ourInstance;
    }

    private SingletonDemo() {
        System.out.println("SingletonDemo is initialized");
    }

    public void printText(String input) {
        System.out.println("input is " + input);
    }
}

class Main {
    public static void main(String[] args) {
        System.out.println("SingletonDemo");
        var x = SingletonDemo.getInstance();
        x.printText("XYZ");
    }
}
```

### Key Implementation Details:

- Private constructor – prevents external instantiation.
- Static factory method (getInstance()) – provides global access point.
- Static instance variable – holds the single instance.

### Two Common Implementation Approaches

- Singleton with Public Static Final Field – a direct, simple approach.
- Singleton with Public Static Factory Method – more flexible (allows later changes like instance pooling).

### Problems with Singleton

#### Serialization and Deserialization:

- What happens if we deserialize the singleton object twice?
- You may end up with multiple instances unless special handling is implemented.

#### Reflection:

- One can alter the access provider of the Singleton constructor using reflection:

```java
Constructor constructor = singleton.getClass().getDeclaredConstructor(new Class[0]);
constructor.setAccessible(true); // Make private constructor accessible
Singleton singleton2 = (Singleton) constructor.newInstance(); // Creates new instance!
```

### Solution: Singleton with Enum (Java)

- Using an enum provides built-in serialization safety and reflection protection:

```java
public enum SingletonObject {
    SINGLETON_OBJECT;

    private int myNum = 0;

    private SingletonObject() { }

    public int getMyNum() { return myNum; }
    public void setMyNum(int myNum) { this.myNum = myNum; }

    @Override
    public String toString() {
        return "mySingletonEnum num is " + getMyNum();
    }
}
```

- The enum approach guarantees a single instance even across serialization and prevents reflection-based instantiation.

## Builder Pattern

### Problem Solved by Builder

- The Builder pattern becomes a remedy when the increased number of object constructor parameter combinations leads to an exponential list of constructors (a problem sometimes called "telescoping constructor").

### Intent

- Separate the construction of a complex object from its representation so that the same construction process can create different representations.

### Core Idea

- The intent of the Builder pattern is to move the construction logic for an object outside the class to be instantiated.
- A builder receives each initialization parameter step by step and then returns the resulting constructed object at once.

### Example: Design Reservation System

#### The Problem:

- Consider building a Reservation object with multiple attributes:
  - date (Date)
  - headcount (int)
  - city (String)
  - dollarsPerHead (double)
  - hasSite (bool)
- One approach: read data from a source (parse it using a ReservationParser), create an empty Reservation object, and set its parameters as the parser encounters them.
- However, the result object may not be valid (e.g., required fields missing, inconsistent state).

#### The Builder Solution:

- Use a Builder class to ensure the validity of objects built.
- The ReservationBuilder object stores a reservation request's attributes as a parser finds them, then builds a Reservation object only when all data is collected, verifying its validity before construction.

#### Structure:

- Reservation – the complex target object (constructed only when valid).
- ReservationBuilder – accumulates attributes and validates before building.
- ReservationParser – takes a ReservationBuilder, parses source data, and feeds attributes to the builder.

### Advantages of Builder Pattern

| Advantage                                   | Explanation                                                                                                                                                                         |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Isolates construction code**              | Makes a complex target class simpler by moving construction logic out.                                                                                                              |
| **Separation of concerns**                  | Builder focuses on proper construction; target class focuses on operations of a valid instance.                                                                                     |
| **Finer control over construction process** | Accommodates step-by-step construction, which often occurs when creating an object by parsing from a source (e.g., plain file, database, web service).                              |
| **Allows varying internal representation**  | The interface lets the builder hide the representation and internal structure of the product. To change the product's internal representation, simply define a new kind of builder. |
| **Works through abstract interface**        | The product is constructed through an abstract interface; all you have to do to change the product's internal representation is define a new builder.                               |

### Summary Table

| Pattern       | Intent                                                         | Key Benefit                                                              | Problem Solved                                                       |
| :------------ | :------------------------------------------------------------- | :----------------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Singleton** | Ensure a class has only one instance and provide global access | Controlled access, delayed instantiation, improved over global variables | Multiple instances of what should be a single resource               |
| **Builder**   | Separate construction from representation                      | Step-by-step construction, validity checking, varying representations    | Exponential constructor combinations and invalid intermediate states |

## Creational Design Patterns

### What Are Creational Patterns?

- Creational design patterns abstract the instantiation process.
- They help make a system independent of how its objects are created, composed, and represented.

### Two Types of Creational Patterns:

- Class creational pattern – uses inheritance to vary the class that is instantiated.
- Object creational pattern – delegates instantiation to another object.

### Creational Patterns Covered:

- Singleton
- Builder
- Factory
- Abstract Factory
- Prototype
- Twin
- Object Pool
- This study guide covers Singleton and Builder in detail.

## Singleton Pattern

### When to Use Singleton

- Use Singleton when:
  - There must be exactly one instance of a class, and it must be accessible to clients from a well-known access point.
  - The sole instance should be extensible by subclassing, and clients should be able to use an extended instance without modifying their code.

### Structure

- The Singleton class typically contains:
  - A static instance of itself (uniqueInstance)
  - A private constructor (prevents external instantiation)
  - A static Instance() operation (returns the unique instance)
  - Optional operations: SingletonOperation(), GetSingletonData()

### Participants

- Singleton – defines an Instance operation that lets clients access its unique instance.
- Instance is a class operation (a static member function in C++ / Java).
- The Singleton may be responsible for creating its own unique instance.
- Clients access a Singleton instance solely through Singleton's Instance operation.

### Benefits of Singleton

- Controlled access to the sole instance – you control how and when clients access it.
- Permits refinement of operations and representation by subclassing.
- Permits a variable number of instances instead of exactly one (you can modify the pattern to allow a fixed number of instances).

### Improvement Over Global Variables

| Aspect                   | Global Variables                                                                                       | Singleton                                                    |
| :----------------------- | :----------------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Name space**           | Larger                                                                                                 | Reduced                                                      |
| **Instance creation**    | Global instances are always created                                                                    | Option to not create an instance at all                      |
| **Instantiation timing** | Cannot be delayed                                                                                      | Instantiation can be delayed to wait for runtime information |
| **Constructor order**    | Order of calling constructors is not defined (problematic if there are dependencies between instances) | Order can be controlled                                      |

### Two Common Implementation Approaches

- Singleton with Public Static Final Field – a direct, simple approach using a public static final variable.
- Singleton with Public Static Factory Method – more flexible, using a static method like `getInstance()` (allows later changes such as instance pooling).

### Problems with Singleton

#### Serialization and Deserialization:

- What happens if we deserialize the singleton object twice?
- You may end up with multiple instances unless special handling (such as `readResolve()`) is implemented.

#### Reflection:

- One can alter the access provider of the Singleton constructor using Java reflection:

```java
Constructor constructor = singleton.getClass().getDeclaredConstructor(new Class[0]);
constructor.setAccessible(true); // Make the private constructor accessible
Singleton singleton2 = (Singleton) constructor.newInstance(); // Creates new instance!
```

- This breaks the singleton guarantee.

### Solution: Singleton with Enum (Java)

- Using an enum provides built-in serialization safety and reflection protection:

```java
public enum SingletonObject {
    SINGLETON_OBJECT;

    private int myNum = 0;

    private SingletonObject() { }

    public int getMyNum() { return myNum; }
    public void setMyNum(int myNum) { this.myNum = myNum; }

    @Override
    public String toString() {
        return "mySingletonEnum num is " + getMyNum();
    }
}
```

- The enum approach guarantees a single instance even across serialization and prevents reflection-based instantiation because enum constructors cannot be accessed reflectively.

## Builder Pattern

### Problem Solved by Builder

- The Builder pattern becomes a remedy when the increased number of object constructor parameter combinations leads to an exponential list of constructors (a problem sometimes called "telescoping constructor" anti-pattern).

### Intent

- Separate the construction of a complex object from its representation so that the same construction process can create different representations.

### Core Idea

- The intent of the Builder pattern is to move the construction logic for an object outside the class to be instantiated.
- A builder receives each initialization parameter step by step and then returns the resulting constructed object at once.

### Example: Design Reservation System

#### The Problem:

- Consider building a Reservation object that contains multiple attributes:
  - date (Date)
  - headcount (int)
  - city (String)
  - dollarsPerHead (double)
  - hasSite (bool)
- One approach: read data from a source (parse it using a ReservationParser), create an empty Reservation object, and set its parameters as the parser encounters them.
- However, the result object may not be valid (e.g., required fields missing, inconsistent state, partial construction).

#### The Builder Solution:

- Ensure the validity of the objects built by using a builder class.
- The ReservationBuilder object can store a reservation request's attributes as a parser finds them, and then build a Reservation object, verifying its validity only when all data is collected and the object would be in a valid state.

#### Structure:

- Reservation – the complex target object (constructed only when valid). Its constructor may require many parameters.
- ReservationBuilder – accumulates attributes and validates before building.
- ReservationParser – takes a ReservationBuilder, parses source data (e.g., from a file, database, or web service), and feeds attributes to the builder step by step.

### Builder Pattern Advantages

| Advantage                                   | Explanation                                                                                                                                                              |
| :------------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Isolates construction code**              | Isolates code for construction and representation so that it makes a complex target class simpler.                                                                       |
| **Separation of concerns**                  | Lets a builder class focus on the proper construction of an object, leaving the target class to focus on the operation of a valid instance.                              |
| **Finer control over construction process** | A builder accommodates step-by-step construction, which often occurs when you create an object by parsing from a source (e.g., plain file, database, web service, etc.). |
| **Allows varying internal representation**  | The interface lets the builder hide the representation and internal structure of the product.                                                                            |
| **Easy to change representation**           | The product is constructed through an abstract interface; all you have to do to change the product's internal representation is define a new kind of builder.            |

### Summary Table: Singleton vs. Builder

| Aspect             | Singleton                                                      | Builder                                                              |
| :----------------- | :------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Intent**         | Ensure a class has only one instance and provide global access | Separate construction of a complex object from its representation    |
| **Problem solved** | Multiple instances of what should be a single resource         | Exponential constructor combinations and invalid intermediate states |
| **Key mechanism**  | Private constructor + static instance method                   | Step-by-step parameter accumulation + `build()` method               |
| **Control over**   | When and how the single instance is accessed                   | Step-by-step construction and validity                               |
| **Flexibility**    | Can permit variable number of instances                        | Can create different representations with same process               |

## What Are Factory Patterns?

- In Factory patterns, we create an object without exposing the creation logic to the client and refer to the newly created object using a common interface.
- The factory patterns covered in this material are:
  - Simple Factory
  - Factory Method Pattern

## Simple Factory

### Core Concept

- The Simple Factory pattern pulls object creation code out of the client method and places it in a separate object that is only going to worry about how to create objects.
- If any other object needs a product created, this factory object is the object to come to.

### Example: Pizza Ordering System

#### The Problem (Without Factory):

- In the `orderPizza(String type)` method, the client code contains the object creation logic (e.g., `if type.equals("cheese") then new CheesePizza()`).
- This tightly couples the client to concrete pizza classes.

#### The Simple Factory Solution:

- First, we pull the object creation code out of the `orderPizza` method.
- Then, we place that code in an object that is only going to worry about how to create pizzas (a `SimpleFactory`).
- The `orderPizza` method now simply uses the factory to create the pizza, then calls `prepare()`, `bake()`, `cut()`, and `box()` on the returned pizza.

### Key Design Principle Illustrated

- "Depend upon abstractions. Do not depend upon concrete classes."
- This principle is central to the factory patterns.
- By depending on a pizza interface (or abstract class) rather than concrete pizza types, the client code becomes more flexible and maintainable.

## Factory Method Pattern

### Definition

- The Factory Method Pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate.
- Factory Method lets a class defer instantiation to subclasses.

### Real-World Example

- Iterators in Collections (e.g., `Collection.iterator()`) are an example of the Factory Method pattern.
- The collection defines the interface for creating an iterator, but each concrete collection subclass decides which specific iterator class to instantiate.

### Intent

- The intent of Factory Method is to let a class developer define the interface for creating an object while retaining control of which class to instantiate (delegating that decision to subclasses).

### When to Use Factory Method

- Use the Factory Method pattern when:
  - A class cannot anticipate the class of objects it must create.
  - A class wants its subclasses to specify the objects it creates.
  - Classes delegate responsibility to one of several helper subclasses, and you want to localize the knowledge of which helper subclass is the delegate.

### Informal Description

- Factory Method pattern is used when we have a super class (abstract class) with multiple subclasses and, based on input, we need to return one of the subclasses.
- This pattern takes the responsibility of instantiation away from the client program and gives it to the factory class.

### Key Capability

- The factory pattern is used to replace class constructors, abstracting the process of object generation so that the type of the object instantiated can be determined at run-time.

## Factory Method Pattern Structure

### Participants

| Participant                               | Role                                                                                                                                                                                                                                                |
| :---------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product** (e.g., Document)              | Defines the interface of objects the factory method creates.                                                                                                                                                                                        |
| **ConcreteProduct** (e.g., MyDocument)    | Implements the Product interface.                                                                                                                                                                                                                   |
| **Creator** (e.g., Application)           | Declares the factory method, which returns an object of type Product. Creator may also define a default implementation of the factory method that returns a default ConcreteProduct object. May call the factory method to create a Product object. |
| **ConcreteCreator** (e.g., MyApplication) | Overrides the factory method to return an instance of a ConcreteProduct.                                                                                                                                                                            |

### Example: PizzaStore Factory Method

#### The Creator (Abstract Class):

```java
public abstract class PizzaStore {

    public Pizza orderPizza(String type) {
        Pizza pizza;

        pizza = createPizza(type);  // calls the factory method

        pizza.prepare();
        pizza.bake();
        pizza.cut();
        pizza.box();

        return pizza;
    }

    // The factory method - now abstract in PizzaStore
    abstract Pizza createPizza(String type);
}
```

- Notice that the `orderPizza()` method in the superclass has no clue which specific `Pizza` it is creating; it just knows it can `prepare()`, `bake()`, `cut()`, and `box()` it.
- The factory method `createPizza()` has been moved from a factory object to a method in `PizzaStore`, and it is now abstract.

#### The ConcreteCreator (Subclass):

```java
public class NYPizzaStore extends PizzaStore {
    Pizza createPizza(String item) {
        if (item.equals("cheese")) {
            return new NYStyleCheesePizza();
        } else if (item.equals("veggie")) {
            return new NYStyleVeggiePizza();
        } else if (item.equals("clam")) {
            return new NYStyleClamPizza();
        } else if (item.equals("pepperoni")) {
            return new NYStylePepperoniPizza();
        } else return null;
    }
}
```

- Each concrete `PizzaStore` subclass (e.g., `NYPizzaStore`, `ChicagoPizzaStore`) overrides the factory method to create its own regional style of pizza.

## Factory Method Advantages

| Advantage                                              | Explanation                                                                                                          |
| :----------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| **Eliminates binding of application-specific classes** | Factory methods eliminate the need to bind application-specific classes into your code.                              |
| **Code deals only with the Product interface**         | The code only deals with the Product interface; therefore it can work with any user-defined ConcreteProduct classes. |
| **Provides hooks for subclasses**                      | Creating objects inside a class with a factory method is always more flexible than creating an object directly.      |
| **Decouples client from concrete classes**             | The client (e.g., orderPizza) depends on the abstract Product, not on concrete pizza types.                          |

### Summary Table: Simple Factory vs. Factory Method

| Aspect          | Simple Factory                                          | Factory Method                                                             |
| :-------------- | :------------------------------------------------------ | :------------------------------------------------------------------------- |
| **Definition**  | A separate factory class handles all object creation    | An abstract class defines the creation method; subclasses implement it     |
| **Control**     | Single factory class decides which class to instantiate | Subclasses decide which class to instantiate                               |
| **Flexibility** | Adding new products requires modifying the factory      | Adding new products requires adding a new subclass (open/closed compliant) |
| **Ownership**   | Factory is a separate object                            | Factory method belongs to the Creator class                                |
| **Use case**    | When creation logic is simple and unlikely to change    | When subclasses should determine which object to create                    |

## Abstract Factory Pattern

### What Is Abstract Factory?

- Abstract Factory provides an interface for creating families of related or dependent objects without specifying their concrete classes.
- It is essentially a factory that creates other factories, and these factories then create objects derived from base classes.
- The Abstract Factory pattern can be easily extended to accommodate more products. For example, you can add another subclass `Obj1` and a corresponding `Obj1Factory`.

### When to Use Abstract Factory

- Use the Abstract Factory pattern when:

| Condition                                  | Explanation                                                                                                               |
| :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **System independence**                    | A system should be independent of how its products are created, composed, and represented.                                |
| **Multiple product families**              | A system should be configured with one of multiple families of products.                                                  |
| **Related products must be used together** | A family of related product objects is designed to be used together, and you need to enforce this constraint.             |
| **Hide implementation details**            | You want to provide a class library of products, and you want to reveal just their interfaces, not their implementations. |

### Advantages of Abstract Factory

| Advantage                                  | Explanation                                                                                                                                            |
| :----------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Isolates concrete classes**              | It controls the classes of objects that an application creates. A factory encapsulates the responsibility and the process of creating product objects. |
| **Makes exchanging product families easy** | You can use different product configurations simply by changing the concrete factory.                                                                  |

### Key Distinction from Factory Method

- **Factory Method** deals with creating a single product (one factory method per product family member).
- **Abstract Factory** deals with creating entire families of related products (multiple factory methods, each creating a different type of product).

## Prototype Pattern

### Intent

- Specify the kinds of objects to create using a prototypical instance, and create new objects by copying this prototype (cloning).

### Motivation

- Instead of creating separate classes for each similar object, they could simply be instances of the same class initialized with different parameters.
- The Prototype pattern lets you create new objects by copying an existing object (the prototype) rather than calling a constructor.

### Applicability (When to Use Prototype)

- Use the Prototype pattern when:

| Condition                           | Explanation                                                                                               |
| :---------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **System independence**             | A system should be independent of how its products are created, composed, and represented.                |
| **Avoid factory class hierarchies** | You want to avoid building a class hierarchy of factories that parallels the class hierarchy of products. |
| **Limited state combinations**      | Instances of a class can have one of only a few different combinations of state.                          |
| **Cloning is cheaper**              | Object cloning is cheaper (in terms of performance or complexity) than creation from scratch.             |

### Prototype Pattern Structure

- **Prototype** – declares an interface for cloning itself.
- **ConcretePrototype** – implements the cloning operation to create a copy of itself.
- **Client** – creates a new object by asking a prototype to clone itself.

### Benefits of Prototype

| Benefit                                                 | Explanation                                                                                                                                                                                                                                                                                  |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adding and removing products at run-time**            | Prototypes allow you to add or remove products dynamically without modifying existing code.                                                                                                                                                                                                  |
| **Specifying new objects by varying values**            | You can create new objects by varying values, not by defining new classes. Cloning a prototype is like instantiating a class.                                                                                                                                                                |
| **Reduced subclassing**                                 | Factory Method often produces a hierarchy of Creator classes parallel to the product class hierarchy. In Prototype, you don't need a Creator class hierarchy at all.                                                                                                                         |
| **Configuring an application with classes dynamically** | An application that wants to create instances of a dynamically loaded class won't be able to reference its constructor statically. Instead, the run-time environment creates an instance of each class automatically when it is loaded, and registers the instance with a prototype manager. |

### Implementation Considerations

#### Using a Prototype Manager:

- When the number of prototypes in a system is not fixed, keep a registry of available prototypes.
- The prototype manager stores a set of prototypical objects and returns a clone when a client requests an object of a particular type.

#### Implementing the Clone Operation:

- The hardest part of the Prototype pattern is implementing the Clone operation correctly.

#### Shallow vs. Deep Copy:

- **Shallow copy** copies the object's fields as-is; if fields are references, both copies refer to the same objects.
- **Deep copy** recursively copies all referenced objects.
- It is particularly tricky when object structures contain circular references.

## Object Pool Pattern

### Intent

- When objects are expensive to create and they are needed only for short periods of time, it is advantageous to utilize the Object Pool pattern.
- The Object Pool provides a cache for instantiated objects, tracking which ones are in use and which are available.

### Core Concept

- The object pool design pattern creates a set of objects that may be reused.
- Lifecycle of objects in the pool:
  - Creation
  - Validation
  - Destroy

#### How it works:

| Step  | Action                                                                                                                                                                                               |
| :---- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **1** | A new object is needed. It is requested from the pool.                                                                                                                                               |
| **2** | If a previously prepared object is available, it is returned immediately, avoiding the instantiation cost.                                                                                           |
| **3** | If no objects are present in the pool, a new item is created and returned.                                                                                                                           |
| **4** | When the object has been used and is no longer needed, it is returned to the pool, allowing it to be used again in the future without repeating the computationally expensive instantiation process. |

- _Important Note:_ Once an object has been used and returned, existing references will become invalid.

### Applicability (When to Use Object Pool)

- Use the Object Pool pattern when:

| Condition                                                     | Example                                                                                                                                      |
| :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Objects are expensive to create (high allocation cost)**    | There is a need to open too many database connections. Creating a new connection takes too long, and the database server becomes overloaded. |
| **You need many short-lived objects**                         | Frequent allocation and deallocation can cause memory fragmentation.                                                                         |
| **Several clients need the same resource at different times** | Multiple clients share a limited set of reusable resources.                                                                                  |

### Advantages of Object Pool

| Advantage                                               | Explanation                                                                                                   |
| :------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------ |
| **Boosts performance**                                  | It significantly boosts the performance of the application by reusing objects instead of recreating them.     |
| **Most effective for high-initialization-cost objects** | It is most effective in situations where the cost of initializing a class instance is high.                   |
| **Manages connections**                                 | It manages connections and provides a way to reuse and share them.                                            |
| **Provides object limits**                              | It can provide a limit for the maximum number of objects that can be created, preventing resource exhaustion. |

### Summary Table: Abstract Factory vs. Prototype vs. Object Pool

| Aspect                      | Abstract Factory                                                       | Prototype                                                   | Object Pool                                                |
| :-------------------------- | :--------------------------------------------------------------------- | :---------------------------------------------------------- | :--------------------------------------------------------- |
| **Intent**                  | Create families of related objects without specifying concrete classes | Create new objects by copying a prototype instance          | Reuse expensive-to-create objects for short-term use       |
| **Key mechanism**           | Factory of factories; returns product families                         | Clone operation (copying)                                   | Cache of reusable objects with in-use/available tracking   |
| **Problem solved**          | Enforcing consistency across related products                          | Avoiding parallel factory hierarchies; costly construction  | High instantiation cost; memory fragmentation              |
| **When to use**             | System needs one of multiple product families                          | Few state combinations; cloning cheaper than creation       | Objects expensive to create; short-lived; shared resources |
| **Lifecycle consideration** | Product families can be swapped by changing concrete factory           | Clone operation must handle shallow vs. deep copy correctly | Objects go through: creation → validation → destroy        |

### Complete Creational Patterns Reference (All Patterns from Your Slides)

| Pattern                      | Brief Description                                                                              |
| :--------------------------- | :--------------------------------------------------------------------------------------------- |
| **Singleton**                | Ensures a class has only one instance and provides global access.                              |
| **Builder**                  | Separates construction of a complex object from its representation.                            |
| **Factory (Simple Factory)** | Creates objects without exposing creation logic to the client.                                 |
| **Factory Method**           | Defines an interface for creating an object, but subclasses decide which class to instantiate. |
| **Abstract Factory**         | Provides an interface for creating families of related or dependent objects.                   |
| **Prototype**                | Creates new objects by copying a prototypical instance.                                        |
| **Twin**                     | Allows multiple inheritance-like behavior in languages without multiple inheritance.           |
| **Object Pool**              | Caches reusable objects to avoid expensive instantiation costs.                                |

# Behavioral Patterns

## What Are Behavioral Patterns?

- Behavioral patterns are concerned with algorithms and the assignment of responsibilities between objects.
- Unlike creational patterns (which focus on object creation) or structural patterns (which focus on object composition), behavioral patterns describe not just patterns of objects or classes but also the patterns of communication between them.
- These patterns characterize complex control flow that is difficult to follow at run-time. They shift your focus away from the flow of control to let you concentrate just on the way objects are interconnected.
- Behavioral object patterns use object composition rather than inheritance.

## Behavioral Patterns Covered in This Course

| Pattern             | Brief Description                                                                                        |
| :------------------ | :------------------------------------------------------------------------------------------------------- |
| **Template Method** | Defines the skeleton of an algorithm, deferring some steps to subclasses.                                |
| **Null Object**     | Provides a do-nothing object that avoids null reference checks.                                          |
| **Observer**        | Defines a one-to-many dependency so that when one object changes state, all dependents are notified.     |
| **State**           | Allows an object to alter its behavior when its internal state changes.                                  |
| **Strategy**        | Defines a family of algorithms, encapsulates each one, and makes them interchangeable.                   |
| **Command**         | Encapsulates a request as an object, thereby allowing parameterization and queuing of requests.          |
| **Visitor**         | Represents an operation to be performed on elements of an object structure without changing the classes. |

- This study guide covers Template Method in detail.

## Template Method Pattern

### Intent

- Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
- Template Method lets subclasses redefine certain steps of an algorithm without changing the algorithm's structure.
- In other words: implement an algorithm in a method, deferring the definition of some steps of the algorithm so that other classes can redefine them.

### Core Concept

- Create a (`final`) method that delegates to other methods.
- The client overrides the other methods (the "variant" parts).
- The template method calls the other methods in the proper order (the "invariant" part).

### Visual Structure

```text
AbstractClass (e.g., CaffeineBeverage)
├── templateMethod() [final]    ← defines the algorithm skeleton
│   ├── primitiveOperation1()   ← abstract method
│   ├── primitiveOperation2()   ← abstract method
│   └── hook() [optional]       ← can be overridden or empty default
│
ConcreteClass (e.g., Coffee, Tea)
├── primitiveOperation1()       ← provides specific implementation
└── primitiveOperation2()       ← provides specific implementation
```

### Example: Coffee and Tea Preparation

#### The Problem (Without Template Method):

- Coffee preparation:

```java
void prepareRecipe() {
    boilWater();
    brewCoffeeGrinds();
    pourInCup();
    addSugarAndMilk();
}
```

- Tea preparation:

```java
void prepareRecipe() {
    boilWater();
    steepTeaBag();
    pourInCup();
    addLemon();
}
```

- Notice the duplication: both recipes contain `boilWater()` and `pourInCup()`, but the middle steps (brew vs steep) and condiment steps differ.

#### The Template Method Solution:

- Abstract base class (`CaffeineBeverage`):

```java
public abstract class CaffeineBeverage {

    // Template method - declared final to prevent subclasses from changing the algorithm structure
    final void prepareRecipe() {
        boilWater();
        brew();           // abstract - subclasses implement
        pourInCup();
        addCondiments();  // abstract - subclasses implement
    }

    abstract void brew();
    abstract void addCondiments();

    void boilWater() {
        System.out.println("Boiling water");
    }

    void pourInCup() {
        System.out.println("Pouring into cup");
    }
}
```

- Key observations from the code:

| Element                         | Purpose                                                                                             |
| :------------------------------ | :-------------------------------------------------------------------------------------------------- |
| `final void prepareRecipe()`    | Template method that defines the invariant algorithm structure. Cannot be overridden by subclasses. |
| `abstract void brew()`          | Step that varies by beverage; subclasses must implement.                                            |
| `abstract void addCondiments()` | Step that varies by beverage; subclasses must implement.                                            |
| `void boilWater()`              | Concrete method (same for all subclasses); can be inherited as-is.                                  |
| `void pourInCup()`              | Concrete method (same for all subclasses); can be inherited as-is.                                  |

- Concrete class: `Tea`

```java
public class Tea extends CaffeineBeverage {
    public void brew() {
        System.out.println("Steeping tea bag");
    }

    public void addCondiments() {
        System.out.println("Adding Lemon");
    }
}
```

- Concrete class: `Coffee`

```java
public class Coffee extends CaffeineBeverage {
    public void brew() {
        System.out.println("Dripping coffee through filter");
    }

    public void addCondiments() {
        System.out.println("Adding Sugar and Milk");
    }
}
```

### When to Use Template Method

- Use the Template Method pattern when:

| Condition                          | Explanation                                                                                                                           |
| :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| **Implement invariant parts once** | You want to implement the invariant parts of an algorithm once and leave it up to subclasses to implement the behavior that can vary. |
| **Factor out common behavior**     | Common behavior among subclasses should be factored and localized in a common class to avoid code duplication.                        |

### Consequences (Benefits)

| Consequence                                    | Explanation                                                                                                                                                                                             |
| :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Code reuse**                                 | Template Method factors out common behavior into library classes. Subclasses only need to implement the varying parts.                                                                                  |
| **Inversion of control (Hollywood Principle)** | This refers to how a parent class calls the operations of a subclass, not the other way around. The framework (superclass) controls the algorithm; subclasses are called by the superclass when needed. |

### The Hollywood Principle

- _"Don't call us, we'll call you."_
- In the Template Method pattern, the superclass (the framework) calls the subclass's methods, not the other way around.
- This inverts control: the high-level component determines when low-level components are needed.
- This is a form of the Inversion of Control principle, which is fundamental to many frameworks.

### Template Method vs. Strategy Pattern

| Aspect                     | Template Method                                       | Strategy                                       |
| :------------------------- | :---------------------------------------------------- | :--------------------------------------------- |
| **Mechanism**              | Inheritance (subclassing)                             | Composition (delegation)                       |
| **Where algorithm varies** | Steps are overridden in subclasses                    | Entire algorithm is swapped at run-time        |
| **Control**                | Superclass controls the overall algorithm structure   | Client selects which strategy object to use    |
| **Number of variations**   | Each subclass provides one variation                  | Each strategy object provides one variation    |
| **Best for**               | When variations are limited and known at compile-time | When algorithms need to be swapped dynamically |

### Summary: Template Method Pattern

| Element            | Description                                                                                 |
| :----------------- | :------------------------------------------------------------------------------------------ |
| **Intent**         | Define algorithm skeleton, defer some steps to subclasses                                   |
| **Problem solved** | Duplicate code across similar algorithms; hard to maintain                                  |
| **Key mechanism**  | Final template method calls abstract primitive operations                                   |
| **Participants**   | AbstractClass (defines template method + primitives), ConcreteClass (implements primitives) |
| **Key principle**  | Hollywood Principle: "Don't call us, we'll call you"                                        |
| **Benefits**       | Code reuse, inversion of control, avoids duplication                                        |

## Null Object Pattern

### The Problem

- In most object-oriented languages, such as Java or C#, references may be null.
- References need to be checked to ensure they are not null before invoking any methods.
- This leads to repetitive conditional code (e.g., `if (e != null) e.pay()`).

### The Solution

- Instead of using a null reference to convey absence of an object (for instance, a non-existent customer), you use an object which implements the expected interface, but whose method body is empty (does nothing).
- The advantage of this approach over a working default implementation is that a Null Object is very predictable and has no side effects: it does nothing.

### Intent

- Provide a surrogate for another object that shares the same interface but does nothing.
- Encapsulates the implementation decisions of how to "do nothing" and hides those details from the collaborators.

### Motivation (Example)

#### Without Null Object (typical code):

```java
Employee e = DB.getEmployee("Bob");
if (e != null && e.isTimeToPay(today)) {
    e.pay();
}
```

- **Problems illustrated:**
  - Shortcut evaluation required
  - Need to decide: throw exception? try-catch?
  - Code becomes cluttered with null checks

#### With Null Object:

- `DB.getEmployee("Bob")` returns either a real `Employee` or a `NullEmployee`
- Both implement the same `Employee` interface
- `NullEmployee.pay()` simply does nothing
- No null check needed: `e.isTimeToPay(today)` safely returns `false` (or appropriate default)

### Structure

```text
Client
  │
  ▼
┌─────────────┐         ┌───────────────────────┐
│  Interface  │<────────│      RealObject       │
│ (Employee)  │         │ (e.g., PayingEmployee)│
└─────────────┘         └───────────────────────┘
        ▲                        ▲
        │                        │
        │                 ┌──────┴────────┐
        │                 │ NullObject    │
        │                 │ (NullEmployee)│
        │                 └───────────────┘
        │                        │
        └────────────────────────┘
              (both implement the same interface)
```

### Consequences

| Consequence                          | Explanation                                                                                                                   |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Predictable with no side effects** | The Null Object does nothing, making behavior completely predictable.                                                         |
| **Often implemented as a Singleton** | "If you have two versions of null objects, they should be identical; why waste memory to have the same nothingness repeated?" |
| **Easy equality checks**             | Each null object can be compared by reference (they are the same instance).                                                   |

### Why Singleton for Null Object?

- Null objects have no state (or only identical state).
- You never need more than one instance of a particular Null Object class.
- Using Singleton avoids memory waste.
- Equality checks become simple reference comparisons.

### Null Object vs. Default Implementation

| Aspect             | Default Implementation            | Null Object                            |
| :----------------- | :-------------------------------- | :------------------------------------- |
| **Behavior**       | Provides some actual behavior     | Does nothing                           |
| **Side effects**   | May have side effects             | No side effects                        |
| **Predictability** | Behavior depends on default logic | Completely predictable                 |
| **Use case**       | When a reasonable default exists  | When "absence" needs to be represented |

## Observer Pattern

### Core Concept

- A subject may have any number of dependent observers.
- All observers are notified whenever the subject undergoes a change in state.
- The subject is the publisher of notifications.
- It sends out these notifications without having to know who its observers are.

### The "Newspaper Subscription" Analogy

| Role             | Analogy                          | In Observer Pattern          |
| :--------------- | :------------------------------- | :--------------------------- |
| **Publisher**    | Newspaper company                | Subject (Observable)         |
| **Subscriber**   | Person who receives newspapers   | Observer                     |
| **Subscription** | Request to receive papers        | Registering as observer      |
| **Delivery**     | Newspaper arrives when published | Notification on state change |

### Intent

- Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically.

### Applicability (When to Use Observer)

- Use the Observer pattern when:

| Condition                               | Explanation                                                                                              |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| **Unknown number of dependent objects** | A change to one object requires changing others, and you don't know how many objects need to be changed. |
| **No assumptions about observers**      | An object should be able to notify other objects without making assumptions about who these objects are. |

### Structure

```text
┌─────────────┐              ┌─────────────┐
│   Subject   │              │  Observer   │ (interface)
├─────────────┤              ├─────────────┤
│+attach()    │──────────────│+update()    │
│+detach()    │              └─────────────┘
│+notify()    │                      ▲
└─────────────┘                      │
        │                            │
        │ (holds reference           │
        │  to many observers)        │
        │                    ┌───────┴───────┐
        │                    │ConcreteObserver│
        ▼                    ├───────────────┤
┌─────────────┐              │+update()      │
│ Concrete    │──────────────│+display()     │
│ Subject     │              └───────────────┘
│ (WeatherData)│
└─────────────┘
```

### Collaborations

| Participant          | Role                                                                                                                                |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **Subject**          | Knows its observers. Provides interface for attaching/detaching observers.                                                          |
| **Observer**         | Defines the update interface for objects that should be notified of changes.                                                        |
| **ConcreteSubject**  | Stores state of interest to observers. Sends notification when its state changes.                                                   |
| **ConcreteObserver** | Maintains a reference to a ConcreteSubject. Stores state that must stay consistent with subject's. Implements the update interface. |

### Example: Weather Station

#### The Subject (`WeatherData`):

```java
public void measurementsChanged() {
    notifyObservers();   // Notify all observers when measurements change
}

public void setMeasurements(float temperature, float humidity, float pressure) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    measurementsChanged();   // Trigger notification
}
```

#### The Observer (`CurrentConditionsDisplay`):

```java
public class CurrentConditionsDisplay implements Observer, DisplayElement {
    private float temperature;
    private float humidity;
    private Subject weatherData;

    // Constructor registers the display as an observer
    public CurrentConditionsDisplay(Subject weatherData) {
        this.weatherData = weatherData;
        weatherData.registerObserver(this);
    }

    // Called when subject notifies observers of a change
    public void update(float temperature, float humidity, float pressure) {
        this.temperature = temperature;
        this.humidity = humidity;
        display();
    }

    public void display() {
        System.out.println("Current conditions: " + temperature + "F degrees and " + humidity + "% humidity");
    }
}
```

### Implementation Considerations

#### 1. Dangling References to Deleted Subjects

- When a subject is deleted, notify the observers that the subject has been deleted.
- Otherwise, observers may hold references to a non-existent subject.

#### 2. Push vs. Pull Models

| Model          | Description                                                                                 | Pros                                        | Cons                                     |
| :------------- | :------------------------------------------------------------------------------------------ | :------------------------------------------ | :--------------------------------------- |
| **Push Model** | Subject sends observers detailed information about the change, whether they want it or not. | Simple for observers                        | May send unnecessary data; less flexible |
| **Pull Model** | Subject sends minimal notification; observers ask for details explicitly thereafter.        | Flexible; observers get only what they need | Requires observers to know what to query |

#### 3. Observing More Than One Subject

- To distinguish between subjects, a subject sends its reference together with the update message.
- The observer can then identify which subject changed.

#### 4. Who Triggers the Update?

| Approach                           | How it works                                                              | Pros                                           | Cons                                                                 |
| :--------------------------------- | :------------------------------------------------------------------------ | :--------------------------------------------- | :------------------------------------------------------------------- |
| **Subject triggers automatically** | State-setting operations on Subject call `notify()` after changing state. | Clients don't have to remember to call notify. | Several consecutive operations cause multiple updates (inefficient). |
| **Client triggers manually**       | Client is responsible for calling `notify()` at the right time.           | Avoids needless intermediate updates.          | Clients have an added responsibility (can be forgotten).             |

### Consequences (Benefits)

| Consequence                                              | Explanation                                                                                                                  |
| :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Lets you add observers without modifying the subject** | The subject only knows the Observer interface; new concrete observers can be added anytime.                                  |
| **Abstract coupling between Subject and Observer**       | Subject and Observer are loosely coupled; the subject depends only on the Observer interface, not on concrete classes.       |
| **Support for broadcast communication**                  | The subject broadcasts to all registered observers automatically.                                                            |
| **Unexpected updates**                                   | Observers can be updated in unexpected orders or at unexpected times, which can cause issues if observers have dependencies. |

### Observer Pattern Summary

| Element              | Description                                                                                 |
| :------------------- | :------------------------------------------------------------------------------------------ |
| **Intent**           | Define one-to-many dependency so that when one object changes, all dependents are notified. |
| **Problem solved**   | Need to notify unknown number of objects about state changes without coupling.              |
| **Key participants** | Subject (publisher), Observer (subscriber)                                                  |
| **Key methods**      | `attach()`, `detach()`, `notify()` (Subject); `update()` (Observer)                         |
| **Push vs. Pull**    | Subject can push details or send minimal notification (pull model)                          |
| **Main benefit**     | Loose coupling between publisher and subscribers                                            |

### Summary Table: Null Object vs. Observer

| Aspect                    | Null Object                                    | Observer                                                    |
| :------------------------ | :--------------------------------------------- | :---------------------------------------------------------- |
| **Category**              | Behavioral                                     | Behavioral                                                  |
| **Intent**                | Provide do-nothing object to avoid null checks | Define one-to-many dependency for state change notification |
| **Key mechanism**         | Implements interface with empty methods        | Subject maintains list of observers and notifies them       |
| **Problem solved**        | Cluttered code with repetitive null checks     | Unknown number of objects need to react to changes          |
| **Common implementation** | Often implemented as Singleton                 | Push or pull model for data delivery                        |
| **Coupling**              | Client depends only on interface               | Abstract coupling between Subject and Observer              |

## State Pattern

### Intent

- Allow an object to alter its behavior when its internal state changes.
- The object will appear to change its class (because its behavior changes as if it were an instance of a different class).

### The Problem (Without State Pattern)

- Consider a Gumball Machine with multiple states:

| State           | Description                           |
| :-------------- | :------------------------------------ |
| **SOLD_OUT**    | No gumballs left                      |
| **NO_QUARTER**  | Waiting for a quarter                 |
| **HAS_QUARTER** | Quarter inserted, ready to turn crank |
| **SOLD**        | Dispensing a gumball                  |

- Each action (`insertQuarter()`, `ejectQuarter()`, `turnCrank()`, `dispense()`) behaves differently depending on the current state.
- Without the State pattern, you might write code like this:

```java
final static int SOLD_OUT = 0;
final static int NO_QUARTER = 1;
final static int HAS_QUARTER = 2;
final static int SOLD = 3;

int state = SOLD_OUT;
int count = 0;

public void insertQuarter() {
    if (state == HAS_QUARTER) {
        System.out.println("You can't insert another quarter");
    } else if (state == SOLD_OUT) {
        System.out.println("You can't insert a quarter, the machine is sold out");
    } else if (state == SOLD) {
        System.out.println("Please wait, we're already giving you a gumball");
    } else if (state == NO_QUARTER) {
        state = HAS_QUARTER;   // state transition
        System.out.println("You inserted a quarter");
    }
}
```

- Problems with this approach:

| Problem                            | Explanation                                                                                          |
| :--------------------------------- | :--------------------------------------------------------------------------------------------------- |
| **Large conditional statements**   | Each action requires a multi-part conditional (`if-else` or `switch`) that checks the current state. |
| **Code duplication**               | Several operations often contain the same conditional structure.                                     |
| **Hard to maintain**               | Adding a new state requires modifying every method that contains conditionals.                       |
| **Violates Open/Closed Principle** | The class is not closed for modification when states change.                                         |

### Applicability (When to Use State)

- Use the State pattern when:

| Condition                          | Explanation                                                                                                                                                        |
| :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Behavior depends on state**      | An object's behavior depends on its state, and it must change its behavior at run-time depending on that state.                                                    |
| **Large conditional statements**   | Operations have large, multi-part conditional statements that depend on the object's state. This state is usually represented by one or more enumerated constants. |
| **Repeated conditional structure** | Often, several operations will contain this same conditional structure.                                                                                            |
| **Separate branches**              | The State pattern puts each branch of the conditional in a separate class.                                                                                         |

### The Solution: State Pattern

- **Core idea:** Instead of using conditionals to check the state, delegate behavior to state objects.

#### Steps to implement:

| Step  | Action                                                                                                                              |
| :---- | :---------------------------------------------------------------------------------------------------------------------------------- |
| **1** | **Gather up your states** – Identify all possible states for the object.                                                            |
| **2** | Create an instance variable to hold the current state, and define values for each state (e.g., constants or state objects).         |
| **3** | **Gather up all actions** that can happen in the system (e.g., `insertQuarter()`, `ejectQuarter()`, `turnCrank()`, `dispense()`).   |
| **4** | Create a `State` interface or abstract class that declares methods for all possible actions.                                        |
| **5** | Create concrete state classes that implement the behavior for each specific state, including state transitions.                     |
| **6** | The Context class delegates all state-specific requests to the current state object and maintains a reference to the current state. |

### Structure

```text
┌─────────────────┐              ┌─────────────────┐
│     Context     │              │     State       │ (interface/abstract)
│ (GumballMachine)│              ├─────────────────┤
├─────────────────┤              │+handle()        │
│-state: State    │──────────────│+insertQuarter() │
│+request()       │              │+ejectQuarter()  │
└─────────────────┘              │+turnCrank()     │
        │                        │+dispense()      │
        │                        └─────────────────┘
        │                                  ▲
        │                                  │
        │                     ┌────────────┴────────────┐
        │                     │                         │
        │              ┌──────┴──────┐          ┌───────┴───────┐
        │              │ConcreteState│          │ConcreteState  │
        │              │  (HasQuarter)│         │ (NoQuarter)   │
        │              ├─────────────┤          ├───────────────┤
        │              │+insertQuarter│         │+insertQuarter │
        │              │+ejectQuarter │         │+ejectQuarter  │
        │              │+turnCrank()  │         │+turnCrank()   │
        │              │+dispense()   │         │+dispense()    │
        │              └──────────────┘         └───────────────┘
        │
        └─────────────────────┐
                               │
                        ┌──────┴──────┐
                        │ConcreteState│
                        │ (SoldOut)   │
                        └─────────────┘
```

### Participants and Collaborations

| Participant                                               | Role                                                                                                                                                                                           |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Context** (e.g., GumballMachine)                        | Defines the interface of interest to clients. Maintains an instance of a ConcreteState subclass that defines the current state. Delegates state-specific requests to the current state object. |
| **State** (interface/abstract class)                      | Defines an interface for encapsulating the behavior associated with a particular state of the Context.                                                                                         |
| **ConcreteState** (e.g., HasQuarterState, NoQuarterState) | Implements the behavior associated with a state of the Context. May handle state transitions (changing the Context's current state).                                                           |

#### Collaborations (How They Work Together)

| Collaboration                         | Description                                                                                                                                                   |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Context delegates to State**        | The Context delegates state-specific requests to the current ConcreteState object.                                                                            |
| **Context passes itself as argument** | The Context may pass itself as an argument to the State object handling the request, allowing the State to access Context data and trigger state transitions. |
| **Context is primary interface**      | The Context is the primary interface for clients. Clients can configure a Context with State objects.                                                         |
| **State decides transitions**         | Either the Context or the ConcreteState subclasses can decide which state succeeds another and under what circumstances.                                      |

### Example: Gumball Machine with State Pattern

#### Without State Pattern (monolithic conditional approach):

```java
public class GumballMachine {
    final static int SOLD_OUT = 0;
    final static int NO_QUARTER = 1;
    final static int HAS_QUARTER = 2;
    final static int SOLD = 3;

    int state = SOLD_OUT;
    int count = 0;

    public void insertQuarter() {
        // Large conditional checking state
        if (state == HAS_QUARTER) {
            System.out.println("You can't insert another quarter");
        } else if (state == SOLD_OUT) {
            System.out.println("You can't insert a quarter, the machine is sold out");
        } else if (state == SOLD) {
            System.out.println("Please wait, we're already giving you a gumball");
        } else if (state == NO_QUARTER) {
            state = HAS_QUARTER;
            System.out.println("You inserted a quarter");
        }
    }

    // Similar large conditionals for ejectQuarter(), turnCrank(), dispense()...
}
```

- **Problems highlighted:**
  - `turnCrank()` becomes especially messy because you would need to add code to check whether you have a WINNER and then switch to either the WINNER state or the SOLD state.
  - Each new state requires modifying every method that contains conditionals.

### Consequences (Benefits of State Pattern)

| Consequence                       | Explanation                                                                                                                                                   |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **State-specific code localized** | The State pattern puts all behavior associated with a particular state into one object (a concrete State subclass).                                           |
| **Easy to add new states**        | Because all state-specific code lives in a State subclass, new states and transitions can be added easily by defining new subclasses (Open/Closed Principle). |
| **Eliminates large conditionals** | Instead of scattering state-specific behavior across multiple methods, all behavior for a state is in one class.                                              |
| **Simplifies Context**            | The Context class becomes simpler because it delegates to state objects rather than containing complex conditionals.                                          |

### When Might Conditionals Be Preferred?

| Approach                              | When to use                                                                                                            |
| :------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| **State Pattern**                     | When states are numerous or likely to change frequently; when behavior for each state is complex.                      |
| **Conditionals** (`if-else`/`switch`) | Might be preferred if there are few, stable states (the overhead of creating multiple state classes is not justified). |

- _Note:_ With conditionals, all state-specific code is centralized in a single class. However, this requires changing multiple locations when a new state is added. The State pattern distributes state-specific code across multiple classes but adds states more easily.

### State Pattern vs. Strategy Pattern

| Aspect                  | State Pattern                                                                | Strategy Pattern                                                |
| :---------------------- | :--------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| **Intent**              | Allow object to change behavior when its internal state changes              | Encapsulate interchangeable algorithms                          |
| **Who controls change** | The state objects themselves often determine which state comes next          | The client typically selects which strategy to use              |
| **Change trigger**      | State changes automatically as a result of actions                           | Strategy is set explicitly by the client                        |
| **Analogy**             | A vending machine that behaves differently depending on whether it has coins | A video game character whose attack algorithm can be swapped    |
| **Key difference**      | The Context "appears to change its class" as states change                   | The Context's algorithm changes but its "type" remains the same |

### Summary: State Pattern

| Element               | Description                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Intent**            | Allow an object to alter its behavior when its internal state changes; the object will appear to change its class |
| **Problem solved**    | Large, multi-part conditionals that depend on the object's state; code duplication across operations              |
| **Key mechanism**     | Encapsulate state-specific behavior in separate State classes; Context delegates to current State                 |
| **Participants**      | Context (maintains current state), State (interface), ConcreteState (implementation per state)                    |
| **State transitions** | Can be handled by Context or by ConcreteState objects                                                             |
| **Primary benefit**   | Easy to add new states without modifying existing code (Open/Closed Principle)                                    |
| **Trade-off**         | More classes (one per state); conditionals may be simpler for few, stable states                                  |

## Strategy Pattern

### What Is the Strategy Pattern?

- **Definition** – Define a family of algorithms, encapsulate each one, and make them interchangeable.
- **Key benefit** – Strategy lets the algorithm vary independently from clients that use it.

### Strategy Pattern Structure (Participants)

| Participant                     | Role                                                                                                                                                  |
| :------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Strategy** (e.g., Compositor) | Declares an interface common to all supported algorithms. The Context uses this interface to call the algorithm defined by a ConcreteStrategy.        |
| **ConcreteStrategy**            | Implements the algorithm using the Strategy interface.                                                                                                |
| **Context** (e.g., Composition) | Is configured with a ConcreteStrategy object. Maintains a reference to a Strategy object. May define an interface that lets Strategy access its data. |

### The Duck Simulator: A Step-by-Step Problem Evolution

The following versions walk through how a seemingly simple design breaks down as requirements change, leading to the need for the Strategy pattern.

#### Version 1 – Initial Requirements

- **Requirements:**
  - Simulate ducks
  - All ducks swim
  - All ducks quack
  - All ducks have an appearance, but Redhead, Mallard, Yeşilbaşlı Gövel, etc. ducks look different from each other.
- **Design approach:** Create a superclass `Duck` with `swim()`, `quack()`, and abstract `display()`. Each duck subtype (e.g., `MallardDuck`, `RedheadDuck`) implements its own `display()`.
- **Status:** Works perfectly. No problems yet.

#### Version 2 – New Requirement

- **New requirement:** All ducks fly.
- **Design approach:** Add a `fly()` method to the `Duck` superclass. Now every duck inherits `fly()`.
- **Status:** Still works. All duck types can now fly.

#### Version 3 – The Problem Arrives

- **New requirement:** Simulate rubber ducks.
- **The problem:** Rubber ducks can't fly!
  - If `RubberDuck` extends `Duck`, it inherits the `fly()` method from the superclass.
  - But rubber ducks don't fly in reality.
  - If you call `fly()` on a `RubberDuck` object, the program behaves incorrectly.
- **Status:** The inheritance design is now showing its first crack.

#### Version 4 – The Broken "Fix"

- **Attempted fix:** Override the `fly()` method in the `RubberDuck` class to do nothing (or to print "I can't fly").

```java
public class RubberDuck extends Duck {
    public void fly() {
        // do nothing – rubber ducks can't fly
    }
}
```

- **Why this fix is not maintainable:**
  - Now add wooden decoy ducks to the program. Decoy ducks are not supposed to fly or quack.
  - Here's another class in the hierarchy:
    - `RubberDuck` – doesn't fly, but does quack (actually squeaks)
    - `DecoyDuck` – doesn't fly, doesn't quack
  - The problem multiplies:
    - You must override `fly()` in `RubberDuck` and `DecoyDuck` (and any future non-flying duck).
    - You must override `quack()` in `DecoyDuck` (and any future non-quacking duck).
    - Every time you add a new duck with different behavior, you check and override methods manually.
- **Status:** The design is fragile. Code duplication is growing. The superclass forces behavior on all subclasses, even when it doesn't apply.

#### Version 5 – (The inheritance hierarchy becomes more complex)

- At this point, the class diagram shows a growing number of overrides. The `Duck` superclass tries to be everything to everyone, and subclasses spend their time turning off behaviors they don't want rather than adding new ones.
- **Status:** The design is screaming for a better approach.

#### Version 6 – The Strategy Solution

- **New requirement:** Ducks can be equipped with a rocket to make them fly.
- This requirement breaks the override approach entirely because:
  - A `MallardDuck` should normally fly with wings.
  - But at runtime, you might equip that same `MallardDuck` with a rocket.
  - Behavior must change dynamically, not just be fixed at compile time via inheritance.
- **Solution identified:** Separate the flying behavior to make it configurable at runtime.
- **How Strategy solves this:**
  - Pull the flying behavior out of the `Duck` class entirely.
  - Define a `FlyBehavior` interface.
  - Create multiple concrete behavior classes: `FlyWithWings`, `FlyNoWay`, `FlyRocketPowered`.
  - Each `Duck` gets a `flyBehavior` reference.
  - To fly, the duck delegates to its `flyBehavior` object: `flyBehavior.fly()`.
  - You can swap the behavior at any time by assigning a new behavior object.
- **Status:** The design is now flexible, maintainable, and supports runtime behavior changes.

### The Strategy Solution: Code Implementation

#### The Abstract Duck Class

```java
public abstract class Duck {

    FlyBehavior flyBehavior;
    QuackBehavior quackBehavior;

    public Duck() { }

    public abstract void display();

    public void performFly() {
        flyBehavior.fly();
    }

    public void performQuack() {
        quackBehavior.quack();
    }

    public void swim() {
        System.out.println("All ducks float, even decoys!");
    }
}
```

- _Key insight:_ To perform the quack, a `Duck` just allows the object referenced by `quackBehavior` to quack for it. At this point in the code, we don't care what kind of object it is—all we care about is that it knows how to `quack()`.

#### The `FlyBehavior` Interface and Implementations

```java
// The interface that all flying behavior classes implement
public interface FlyBehavior {
    public void fly();
}
```

```java
// Flying behavior implementation for ducks that DO fly
public class FlyWithWings implements FlyBehavior {
    public void fly() {
        System.out.println("I'm flying!!");
    }
}
```

```java
// Flying behavior implementation for ducks that do NOT fly
public class FlyNoWay implements FlyBehavior {
    public void fly() {
        System.out.println("I can't fly");
    }
}
```

#### The `QuackBehavior` Interface and Implementations

```java
public interface QuackBehavior {
    public void quack();
}
```

```java
public class Quack implements QuackBehavior {
    public void quack() {
        System.out.println("Quack");
    }
}
```

```java
public class MuteQuack implements QuackBehavior {
    public void quack() {
        System.out.println("<< Silence >>");
    }
}
```

```java
public class Squeak implements QuackBehavior {
    public void quack() {
        System.out.println("Squeak");
    }
}
```

#### A Concrete Duck: `MallardDuck`

- Remember, `MallardDuck` inherits the `quackBehavior` and `flyBehavior` instance variables from class `Duck`.

```java
public class MallardDuck extends Duck {

    public MallardDuck() {
        flyBehavior = new FlyWithWings();
        quackBehavior = new Quack();
    }

    public void display() {
        System.out.println("I'm a real Mallard duck");
    }
}
```

#### The Test Class: `MiniDuckSimulator` (First Run)

```java
public class MiniDuckSimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.performQuack();
        mallard.performFly();
    }
}
```

- **Output:**

```text
Quack
I'm flying!!
```

### Dynamic Behavior Change at Runtime: Adding Rocket Power

#### Create a New Duck Type: `ModelDuck`

- Our model duck begins life grounded—without a way to fly.

```java
public class ModelDuck extends Duck {
    public ModelDuck() {
        flyBehavior = new FlyNoWay();  // begins life grounded
        quackBehavior = new Quack();
    }

    public void display() {
        System.out.println("I'm a model duck");
    }
}
```

#### Create a New FlyBehavior: `FlyRocketPowered`

```java
public class FlyRocketPowered implements FlyBehavior {
    public void fly() {
        System.out.println("I'm flying with a rocket!");
    }
}
```

#### Update the Test Class

```java
public class MiniDuckSimulator {
    public static void main(String[] args) {
        Duck mallard = new MallardDuck();
        mallard.performQuack();
        mallard.performFly();

        Duck model = new ModelDuck();
        model.performFly();               // initially "I can't fly"
        model.setFlyBehavior(new FlyRocketPowered());  // rocket-enabled!
        model.performFly();               // now "I'm flying with a rocket!"
    }
}
```

- **Output:**

```text
Quack
I'm flying!!
I can't fly
I'm flying with a rocket!
```

- _Key takeaway:_ The behavior of the same model duck changed at runtime. This is impossible with inheritance alone.

### Version 6 – The Big Picture

- The Strategy pattern separates behaviors (fly, quack) from the `Duck` class hierarchy. Behaviors are:
  - Encapsulated in their own classes
  - Interchangeable at runtime (via setter methods)
  - Composable (any duck can get any behavior combination)

### Consequences of the Strategy Pattern

| Consequence                           | Explanation                                                                                                                                                                                                        |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Families of related algorithms**    | Hierarchies of Strategy classes define a family of algorithms or behaviors for contexts to reuse.                                                                                                                  |
| **Independent variation**             | Encapsulating the algorithm in separate Strategy classes lets you vary the algorithm independently of its context, making it easier to switch, understand, and extend.                                             |
| **Eliminates conditional statements** | The Strategy pattern offers an alternative to conditional statements (`if/else` or `switch`) for selecting desired behavior. Instead of asking "what type of duck am I?" you just delegate to the behavior object. |

### Summary Table: The Evolution from Version 1 to Version 6

| Version | What Changed                                   | Problem Encountered                                   | Solution Attempt                         | Outcome                                      |
| :------ | :--------------------------------------------- | :---------------------------------------------------- | :--------------------------------------- | :------------------------------------------- |
| **V1**  | Initial duck simulation                        | None                                                  | Inheritance from Duck                    | Works fine                                   |
| **V2**  | Added "all ducks fly"                          | None (yet)                                            | Added `fly()` to superclass              | Works fine                                   |
| **V3**  | Added rubber ducks                             | Rubber ducks can't fly                                | Override `fly()` to do nothing           | Fragile, but works                           |
| **V4**  | Added decoy ducks                              | Decoys can't fly or quack                             | Override both methods                    | Not maintainable; code duplication grows     |
| **V5**  | More duck types                                | Every new duck requires checking/overriding behaviors | Continuing the same broken approach      | Design is clearly failing                    |
| **V6**  | Rocket-powered ducks + runtime behavior change | Behavior must change dynamically                      | Separate behaviors into Strategy pattern | Flexible, maintainable, runtime-configurable |

### Before vs. After: Inheritance vs. Strategy

| Aspect                      | Inheritance Approach (V1-V5)                         | Strategy Pattern (V6)                            |
| :-------------------------- | :--------------------------------------------------- | :----------------------------------------------- |
| **Behavior reuse**          | Fixed at compile time                                | Configurable at runtime                          |
| **Code duplication**        | High (every non-default duck overrides methods)      | Low (behaviors are written once and shared)      |
| **Adding new behavior**     | Modify superclass or override in many subclasses     | Create one new behavior class                    |
| **Rubber duck problem**     | Override `fly()` to do nothing                       | Assign `FlyNoWay` behavior                       |
| **Decoy duck problem**      | Override `fly()` and `quack()`                       | Assign `FlyNoWay` + `MuteQuack`                  |
| **Rocket duck requirement** | Impossible without changing existing classes         | Create `FlyRocketPowered` and assign dynamically |
| **Conditional logic**       | Scattered across subclasses (implicit via overrides) | Eliminated entirely                              |

## Command Pattern

### What Is the Command Pattern?

- **Intent** – Wrap a request inside an object. This lets you give different requests to different clients, put requests in a queue or log them, and support operations that can be undone.
- **Motivation** – You want to send requests to objects without knowing anything about what the request is doing or who is receiving it. You also want an easy way to add new kinds of requests.

### When to Use Command (Applicability)

- With Command, you can:

| Capability                                                  | Explanation                                                                                                                                                   |
| :---------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Specify, queue, and execute requests at different times** | A Command object can live on even after the original request is gone.                                                                                         |
| **Transfer requests across processes**                      | You can send a command object to another process and execute it there.                                                                                        |
| **Support undo**                                            | The Command's Execute operation can save enough information to reverse its own effects. To do this, the Command interface needs an extra Unexecute operation. |
| **Support logging changes**                                 | You can log changes so that if the system crashes, you can replay them later.                                                                                 |
| **Extend the system with new transactions**                 | You can add new transactions without changing existing code.                                                                                                  |
| **Execute a group of Commands as a transaction**            | You can combine several commands so they run together as one unit.                                                                                            |

### Structure

- **Command** – Declares an interface for executing an operation.
- **ConcreteCommand** – Connects a Receiver object to an action. It implements Execute by calling the right methods on the Receiver.
- **Client** – Creates a ConcreteCommand object and tells it which Receiver to use.
- **Invoker** – Asks the command to carry out the request.
- **Receiver** – Knows how to actually perform the work needed for the request.

### Collaborations

- The Command pattern separates the invoker from the receiver.
- The `Client` creates a `ConcreteCommand` and gives it a `Receiver`.
- The `Invoker` stores that `ConcreteCommand`.
- The `Invoker` calls `Execute()` on the `Command`, which then calls the appropriate methods on the `Receiver`.

### Consequences of the Command Pattern

| Consequence                          | Explanation                                                                                                           |
| :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Commands are first-class objects** | You can manipulate and extend them just like any other object.                                                        |
| **Composite commands are possible**  | You can put multiple commands together into one (for example, a MacroCommand that runs several commands in sequence). |
| **Easy to add new Commands**         | You don't need to change any existing classes to add a new command.                                                   |

### Summary: Command Pattern Core Concepts

| Aspect                 | Description                                                                    |
| :--------------------- | :----------------------------------------------------------------------------- |
| **Intent**             | Wrap a request inside an object                                                |
| **Key problem solved** | Separate the object asking for something from the object that actually does it |
| **Key capability**     | Supports undo, queues, logging, and transactions                               |
| **Main participants**  | Command, ConcreteCommand, Client, Invoker, Receiver                            |
| **Design principle**   | Encapsulate what varies (the request itself)                                   |

## Visitor Pattern

### What Is the Visitor Pattern?

- **Intent** – Represent an operation that you want to run on every element of an object structure. Visitor lets you define a new operation without changing the classes of the elements you are operating on.
- **Motivation** – Compilers need to perform many different operations on abstract syntax trees (like type checking, code generation, pretty printing). Visitor helps organize this.

### The Problem Visitor Solves

#### Typical Scenario

- **The node types are usually stable** – The kinds of nodes in your structure (like the Node types in an abstract syntax tree) do not change very often.
- **Operations are scattered across nodes** – Every time you add a new operation, you have to modify every node class.
- **Hard to maintain and add new operations** – Adding one new operation means touching all the existing element classes.

#### Visitor's Solution

- You define two separate class hierarchies:

| Hierarchy                                               | Purpose                                                            |
| :------------------------------------------------------ | :----------------------------------------------------------------- |
| **Element hierarchy** (e.g., the Node hierarchy)        | The things you are working on. These stay pretty stable over time. |
| **Visitor hierarchy** (e.g., the NodeVisitor hierarchy) | The operations you want to run on those elements.                  |

- _Key insight:_ To add a new operation, you just create a new subclass of `Visitor`. As long as you don't need to add new kinds of `Elements`, you can keep adding new functionality simply by defining new `Visitor` subclasses.

### When to Use Visitor (Applicability)

- Use the Visitor pattern when:

| Condition                                                                 | Explanation                                                                                                            |
| :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------- |
| **Your object structure contains many classes with different interfaces** | You want to run operations on these objects, and what those operations do depends on the specific type of each object. |
| **You have many different and unrelated operations to perform**           | You want to avoid cluttering up your element classes with all those operations.                                        |
| **The classes that define your object structure rarely change**           | But you often want to define new operations on that structure.                                                         |

- **Important Warning:** If the classes in your object structure change often, you are probably better off putting the operations directly inside those classes. Visitor works best when the structure is stable but the operations keep growing.

#### Participants

| Participant         | Role                                                                                                                                                     |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Visitor**         | Declares a Visit operation for each class of ConcreteElement in the object structure. The name of the operation tells you which element type it handles. |
| **ConcreteVisitor** | Implements each Visit operation declared by Visitor. Each one contains a piece of the overall algorithm for a specific element type.                     |
| **Element**         | Defines an Accept operation that takes a visitor as an argument.                                                                                         |
| **ConcreteElement** | Implements Accept by calling the visitor's matching Visit operation (for example, `visitor.VisitConcreteElement(this)`).                                 |
| **ObjectStructure** | Can go through all its elements. It may provide a simple interface that lets a visitor visit every element.                                              |

#### Typical Flow

1. The `Client` creates a `Visitor` object and gives it to the `ObjectStructure`.
2. The `ObjectStructure` calls `Accept` on each `ConcreteElement` inside it.
3. Each `ConcreteElement` turns around and calls the right Visit method on the Visitor (for example, `visitor.VisitConcreteElement(this)`).
4. The `Visitor` runs the operation using the `ConcreteElement`'s data.

### Collaborations

- A Client that uses the Visitor pattern must create a `ConcreteVisitor` object and then walk through the object structure, calling `Accept` on every element.
- When an element's `Accept` method runs, it sends the request to the visitor's matching `Visit` method.

### Consequences of the Visitor Pattern

| Consequence                                 | Explanation                                                                                                                               |
| :------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Easy to add new operations**              | To add a new operation, just add a new `Visitor` subclass. You don't have to change any of the element classes.                           |
| **Gathers related operations**              | A visitor keeps related operations together in one class and separates unrelated ones from each other.                                    |
| **Hard to add new ConcreteElement classes** | Adding a new element type means you have to add a new `Visit` method to every existing `Visitor` class.                                   |
| **Accumulates state**                       | Visitors can collect information as they move through the object structure. Without Visitor, keeping track of this state is much messier. |
| **Breaks encapsulation**                    | To let a visitor do its work, you often have to expose internal details of `ConcreteElement` classes that you would rather keep private.  |

### Visitor vs. Iterator

| Aspect                     | Iterator                                                                        | Visitor                                                                        |
| :------------------------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------- |
| **What it does**           | Moves through a structure and calls methods on each element                     | Performs operations on elements, possibly of many different types              |
| **Cross-class hierarchy**  | Cannot easily work with object structures that have elements of different types | Works naturally with mixed element types using different Visit methods         |
| **Code example**           | `template<class Item> class Iterator { Item CurrentItem() const; };`            | `class Visitor { void VisitMyType(MyType*); void VisitYourType(YourType*); };` |
| **Primary responsibility** | Moving through the structure                                                    | Defining what to do at each stop                                               |

### Implementation Consideration: Who Is Responsible for Traversal?

- There are three ways to handle who moves through the object structure:

| Option                         | Description                                                         | Trade-off                                                                                        |
| :----------------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------------------- |
| **The object structure**       | The ObjectStructure class itself handles going through its elements | Keeps all traversal logic in one place                                                           |
| **The visitor**                | The Visitor class is responsible for traversal                      | You have to copy the same traversal code into every ConcreteVisitor for every kind of collection |
| **A separate iterator object** | An independent Iterator class handles moving through the structure  | Most flexible; keeps traversal, the structure, and the operations all separate                   |

### Summary Table: Command vs. Visitor

| Aspect                   | Command                                               | Visitor                                                          |
| :----------------------- | :---------------------------------------------------- | :--------------------------------------------------------------- |
| **Intent**               | Wrap a request inside an object                       | Define a new operation without changing element classes          |
| **What varies**          | The requests or actions themselves                    | The operations you run on a stable object structure              |
| **Key capability**       | Undo, queuing, logging, transactions                  | Adding operations without modifying the elements                 |
| **When to use**          | When you need to parameterize, queue, or log requests | When element classes are stable but operations change frequently |
| **Downside**             | You end up with many small command classes            | Adding new element types is very difficult                       |
| **Encapsulation impact** | Low (commands just wrap requests)                     | High (may force you to expose element internals)                 |

### Summary Table: Visitor Pattern Decision Guide

| Question                                                 | Answer | Recommendation                                                                          |
| :------------------------------------------------------- | :----- | :-------------------------------------------------------------------------------------- |
| **Do element classes change often?**                     | Yes    | Don't use Visitor – just put the operations directly inside the element classes instead |
| **Do element classes change often?**                     | No     | Visitor might be a good fit                                                             |
| **Do you need many unrelated operations?**               | Yes    | Visitor helps keep your element classes clean                                           |
| **Do you need to collect information while traversing?** | Yes    | Visitor makes this easy to do                                                           |
| **Can you expose element internals publicly?**           | No     | Visitor might break encapsulation – think twice                                         |

## Structural Patterns

### What Are Structural Patterns?

- Structural patterns are concerned with how classes and objects are composed to form larger structures.
- They help ensure that when one part of a system changes, the entire structure does not need to change.

#### Included Patterns:

- **Adapter**
- **Façade**
- **Decorator**
- **Proxy**
- **Composite**
- **Bridge**
- **Flyweight**

### Two Types of Structural Patterns

| Type                           | Description                                                    | Key Characteristic                                                                                |
| :----------------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| **Structural class patterns**  | Use inheritance to compose interfaces or implementations.      | Static relationship determined at compile time; cannot change at run-time                         |
| **Structural object patterns** | Describe ways to compose objects to realize new functionality. | More flexible because composition can change at run-time (impossible with pure class composition) |

---

## Adapter Pattern

### Intent

- Convert the interface of a class into another interface that clients expect.
- Adapter lets classes work together that could not otherwise because of incompatible interfaces.

### When to Use Adapter (Applicability)

- You want to use an existing class, but its interface does not match the one you need.
- You want to create a reusable class that cooperates with unrelated or unforeseen classes — that is, classes that do not necessarily have compatible interfaces.

### Structure (Participants)

| Participant                      | Role                                                                                                                                         |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Target** (e.g., Shape)         | Defines the domain-specific interface that the Client uses.                                                                                  |
| **Client** (e.g., DrawingEditor) | Collaborates with objects conforming to the Target interface.                                                                                |
| **Adaptee** (e.g., TextView)     | Defines an existing interface that needs adapting (the "legacy" or "third-party" class that does not match the Target interface).            |
| **Adapter** (e.g., TextShape)    | Adapts the interface of the Adaptee to the Target interface. The Adapter implements the Target interface and delegates calls to the Adaptee. |

---

## Façade Pattern

### Intent

- Provide a unified interface to a set of interfaces in a subsystem.
- Define a higher-level interface that makes the subsystem easier to use.

### When to Use Façade (Applicability)

- Use the Façade pattern when:
  - You want to provide a simple interface to a complex subsystem. Only clients needing more customizability will need to look beyond the façade.
  - There are many dependencies between clients and the implementation classes of an abstraction. Introduce a façade to decouple the subsystem from clients and other subsystems.
  - You want to layer your subsystems. Use a façade to define an entry point to each subsystem level. If subsystems are dependent, make them communicate with each other solely through their façades.

### Collaborations (How It Works)

- Clients communicate with the subsystem by sending requests to the Façade, which forwards them to the appropriate subsystem object(s).
- Although the subsystem objects perform the actual work, the façade may have to do work of its own to translate its interface to subsystem interfaces.
- Clients that use the façade do not have to access its subsystem objects directly.

### Implementation Example (Compiler)

The slides provide an example of a `Compiler` class acting as a façade:

```java
class Compiler {
public:
    Compiler();
    virtual void Compile(istream&, BytecodeStream&);
};

void Compiler::Compile(istream& input, BytecodeStream& output) {
    Scanner scanner(input);
    ProgramNodeBuilder builder;
    Parser parser;
    parser.Parse(scanner, builder);
    RISCCodeGenerator generator(output);
    ProgramNode* parseTree = builder.GetRootNode();
    parseTree->Traverse(generator);
}
```

- The `Compiler` class provides a simple `Compile()` method that hides the complexity of scanning, parsing, building a parse tree, and generating code.
- The client does not need to know about `Scanner`, `Parser`, `ProgramNodeBuilder`, or `RISCCodeGenerator`.

### Summary Table: Adapter vs. Façade

| Aspect               | Adapter Pattern                                                                                            | Façade Pattern                                                                                                      |
| :------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Intent**           | Convert the interface of a class into another interface that clients expect.                               | Provide a unified (simplified) interface to a set of interfaces in a subsystem.                                     |
| **Problem solved**   | Incompatible interfaces — making existing classes work with new code without modifying the existing class. | Complexity — hiding the complexity of a subsystem behind a simple interface.                                        |
| **Key mechanism**    | An Adapter class implements the Target interface and delegates to an Adaptee.                              | A Façade class receives client requests and forwards them to appropriate subsystem objects.                         |
| **Relationship**     | The Adapter wraps a single class (the Adaptee) to change its interface.                                    | The Façade wraps a subsystem (multiple classes) to provide a simpler interface.                                     |
| **Client knowledge** | Client knows the Target interface but not the Adaptee.                                                     | Client knows only the Façade; does not need to know subsystem classes.                                              |
| **When to use**      | When you want to reuse an existing class whose interface does not match what you need.                     | When you want to provide a simple interface to a complex subsystem or decouple clients from subsystem dependencies. |

---

## Decorator Pattern

### Intent

- Attach additional responsibilities to an object **dynamically**.
- Decorators provide a flexible alternative to subclassing for extending functionality.

### The Problem: Starbuzz Coffee Example

- A beverage company (Starbuzz Coffee) sells different types of beverages (Espresso, DarkRoast, HouseBlend).
- Customers can add condiments such as mocha, milk, sugar, cream, etc. to their beverages.
- Each condiment has a cost, and the total cost depends on which condiments are added.

#### Problems with Traditional Inheritance (Without Decorator):

| Problem                                                    | Explanation                                                                                                                                                     |
| :--------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **New condiments force new methods and changes to cost()** | Adding a new condiment (e.g., Soy) would require adding a new method to the `Beverage` superclass and modifying the `cost()` method of every beverage subclass. |
| **New beverages inherit inappropriate condiment methods**  | If a new beverage (e.g., Iced Tea) inherits all condiment methods, it might get methods for condiments that do not make sense (e.g., cream in iced tea?).       |
| **Double (or multiple) mocha is difficult**                | What if a customer wants double mocha? The inheritance model does not easily allow adding the same condiment multiple times.                                    |
| **Explosion of subclasses**                                | Supporting every combination of beverage + condiments would require an enormous number of subclasses (e.g., `DarkRoastWithMocha`, `DarkRoastWithMochaAndWhip`). |

### The Solution: Decorator Pattern

- Add responsibilities to individual objects, not to an entire class.
- Inheritance is inflexible because the choice is made statically (at compile time). A client cannot control how and when to decorate the component dynamically (at run time).
- The decorator conforms to the interface of the component it decorates so that its presence is transparent to the component's clients.
- The decorator forwards requests to the component and may perform additional actions (such as adding a cost or modifying a description) before or after forwarding.
- Transparency lets you nest decorators recursively, thereby allowing an unlimited number of added responsibilities.

### Structure (Participants)

| Participant           | Role                                                                                                                               | Example                               |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------ |
| **Component**         | Defines the interface for objects that can have responsibilities added to them dynamically.                                        | `Beverage` (abstract class)           |
| **ConcreteComponent** | The original object to which new responsibilities can be attached.                                                                 | `Espresso`, `DarkRoast`, `HouseBlend` |
| **Decorator**         | Maintains a reference to a Component object and defines an interface that conforms to Component's interface.                       | `CondimentDecorator` (abstract)       |
| **ConcreteDecorator** | Adds responsibilities to the component. Implements the Decorator interface and adds behavior before/after forwarding to component. | `Mocha`, `Whip`, `Soy`                |

### Implementation Example

#### ConcreteDecorator (Mocha)

```java
public class Mocha extends CondimentDecorator {
    Beverage beverage;

    public Mocha(Beverage beverage) {
        this.beverage = beverage;
    }

    public String getDescription() {
        return beverage.getDescription() + ", Mocha";
    }

    public double cost() {
        return 0.20 + beverage.cost();
    }
}
```

- `Mocha` extends `CondimentDecorator` (which itself extends `Beverage`).
- It holds a reference to a `Beverage` object (the component it decorates).
- `getDescription()` adds ", Mocha" to the wrapped beverage's description.
- `cost()` adds $0.20 to the wrapped beverage's cost.

#### Client Code (StarbuzzCoffee)

```java
public class StarbuzzCoffee {
    public static void main(String args[]) {
        // Order an Espresso with no condiments
        Beverage beverage = new Espresso();
        System.out.println(beverage.getDescription() + " $" + beverage.cost());

        // Make a DarkRoast object, wrap it with Mocha, wrap it in a second Mocha, then wrap with Whip
        Beverage beverage2 = new DarkRoast();
        beverage2 = new Mocha(beverage2);    // First Mocha
        beverage2 = new Mocha(beverage2);    // Second Mocha (double mocha!)
        beverage2 = new Whip(beverage2);     // Then Whip
        System.out.println(beverage2.getDescription() + " $" + beverage2.cost());

        // HouseBlend with Soy, Mocha, and Whip
        Beverage beverage3 = new HouseBlend();
        beverage3 = new Soy(beverage3);
        beverage3 = new Mocha(beverage3);
        beverage3 = new Whip(beverage3);
        System.out.println(beverage3.getDescription() + " $" + beverage3.cost());
    }
}
```

- **Key observations from the code:**
  - A `DarkRoast` wrapped in `Mocha` and `Whip` is still a `Beverage`.
  - The client can do anything with the decorated object that it could do with a plain `DarkRoast`, including calling its `cost()` method.
  - Double mocha is achieved simply by wrapping the same beverage in `Mocha` twice.
  - The decorators are applied dynamically at run time by the client code.

### When to Use Decorator (Applicability)

- Use the Decorator pattern when:
  - You want to add responsibilities to individual objects dynamically and transparently — that is, without affecting other objects.
  - Extension by subclassing is impractical (for example, an explosion of subclasses would be required to support every combination of features).

### Liabilities (Drawbacks) of Decorator

| Liability                                     | Explanation                                                                                                                                                                                               |
| :-------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Decorator and component are not identical** | You should not rely on object identity when you use decorators. A decorated object is not the same as the original component object (e.g., `beverage2 instanceof DarkRoast` may be false after wrapping). |
| **Lots of little objects**                    | The pattern produces many small objects that differ only in the way they are interconnected, not in their class or in the value of their variables. This can make the system hard to learn and debug.     |

### Summary Table: Decorator Pattern

| Aspect                | Description                                                                                                                                                                           |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Intent**            | Attach additional responsibilities to an object dynamically. Provides a flexible alternative to subclassing for extending functionality.                                              |
| **Problem solved**    | Preventing subclass explosion when many combinations of features are possible. Allowing run-time (dynamic) addition of responsibilities instead of compile-time (static) inheritance. |
| **Key mechanism**     | A `Decorator` class implements the same interface as the `Component` and wraps (holds a reference to) a `Component` instance, adding behavior before/after delegating.                |
| **Transparency**      | Decorators are transparent to clients because they conform to the `Component` interface.                                                                                              |
| **Recursive nesting** | Because decorators are also `Components`, they can be wrapped by other decorators, allowing unlimited nesting.                                                                        |
| **Main drawback**     | Many small, similar objects that differ only in interconnection, making debugging harder. Object identity breaks (a decorated object is not identical to the original).               |

### Comparison: Inheritance vs. Decorator

| Aspect                | Inheritance (Subclassing)                                            | Decorator Pattern                                             |
| :-------------------- | :------------------------------------------------------------------- | :------------------------------------------------------------ |
| **When applied**      | Statically at compile time                                           | Dynamically at run time                                       |
| **Scope**             | Adds responsibility to an entire class (all instances)               | Adds responsibility to individual objects                     |
| **Flexibility**       | Inflexible — cannot change behavior after instantiation              | Flexible — can add, remove, or reorder decorators at run time |
| **Number of classes** | Can cause an explosion of subclasses (every combination)             | Fewer classes; combinations are created by wrapping objects   |
| **Double mocha?**     | Would require a separate subclass (e.g., `DarkRoastWithDoubleMocha`) | Simply wrap the same beverage in `Mocha` twice                |

---

## Proxy Pattern

### Intent

- Provide a surrogate or placeholder for another object to control access to it.

### Motivation

- Defer the full cost of creating and initializing an object until we actually need it.
- A proxy can act as a stand-in for a real object, controlling access and potentially delaying expensive operations (such as loading a large image from disk or over a network).

### Participants

| Participant                   | Role                                                                                                                                                                                                                                                              | Example      |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- |
| **Proxy** (e.g., ImageProxy)  | Maintains a reference that lets the proxy access the real subject. Provides an interface identical to Subject's so that a proxy can be substituted for the real subject. Controls access to the real subject and may be responsible for creating and deleting it. | `ImageProxy` |
| **Subject** (e.g., Graphic)   | Defines the common interface for `RealSubject` and `Proxy` so that `Proxy` can be used anywhere where a `RealSubject` is expected.                                                                                                                                | `Graphic`    |
| **RealSubject** (e.g., Image) | Defines the real object that the proxy represents.                                                                                                                                                                                                                | `Image`      |

### When to Use Proxy (Applicability)

The slides identify four kinds of proxies:

| Type of Proxy        | Purpose                                                                                          | Example                                                      |
| :------------------- | :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Remote Proxy**     | Provides a local representative for an object in a different address space.                      | Accessing an object running on a remote server.              |
| **Virtual Proxy**    | Creates expensive objects on demand (deferring creation until needed).                           | Loading a large image only when it is displayed.             |
| **Protection Proxy** | Controls access to the original object. Useful when objects should have different access rights. | Different user roles (admin vs. guest) accessing a resource. |
| **Smart Reference**  | A replacement for a bare pointer that performs additional actions when an object is accessed.    | Smart pointers, mutual exclusion locks, copy-on-demand.      |

### Consequences (Benefits)

- The Proxy pattern introduces a level of indirection when accessing an object. This additional indirection has many uses:

| Consequence                                                | Explanation                                                                                                                                  |
| :--------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Hides location (remote proxy)**                          | A remote proxy can hide the fact that an object resides in a different address space.                                                        |
| **Optimizes creation (virtual proxy)**                     | A virtual proxy can perform optimizations such as creating an object on demand (lazy initialization).                                        |
| **Adds housekeeping (protection proxy & smart reference)** | Both protection proxies and smart references allow additional housekeeping tasks (e.g., logging, access control) when an object is accessed. |
| **Optimizes memory (copy-on-demand)**                      | Optimization can be obtained for heavyweight objects by doing copy-on-demand via proxies (copy only when modification occurs).               |

---

## Composite Pattern

### Intent

- Compose objects into tree structures to represent part-whole hierarchies.
- Composite lets clients treat individual objects and compositions of objects uniformly.

### Key Insight

- The key to the Composite pattern is an abstract class that represents both primitives and their containers.

### Structure (Participants)

| Participant                            | Role                                                                                                                                                                                                               | Example                     |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------- |
| **Component** (e.g., Graphic)          | Declares the interface for objects in the composition. Implements default behavior for the interface common to all classes, as appropriate. Declares an interface for accessing and managing its child components. | `Graphic`                   |
| **Leaf** (e.g., Rectangle, Line, Text) | Represents leaf objects in the composition. A leaf has no children. Defines behavior for primitive objects in the composition.                                                                                     | `Rectangle`, `Line`, `Text` |
| **Composite** (e.g., Picture)          | Defines behavior for components having children. Stores child components. Implements child-related operations (e.g., `add()`, `remove()`) in the Component interface.                                              | `Picture`                   |
| **Client**                             | Manipulates objects in the composition through the Component interface. The client does not need to know whether it is dealing with a Leaf or a Composite.                                                         | Client code                 |

### When to Use Composite (Applicability)

- Use the Composite pattern when:
  - You want to represent part-whole hierarchies of objects (e.g., a picture containing shapes, where a shape can be a simple line or another picture containing more shapes).
  - You want clients to be able to ignore the difference between compositions of objects and individual objects.
  - Clients will treat all objects in the composite structure uniformly (i.e., call the same methods on leaves and composites).

### Consequences (Benefits and Drawbacks)

| Consequence                                        | Explanation                                                                                                                                                             |
| :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Makes the client simple**                        | Clients can treat composite structures and individual objects uniformly, without writing conditional code to distinguish between them.                                  |
| **Makes it easier to add new kinds of components** | New Leaf or Composite subclasses can be added without changing existing client code (open/closed principle).                                                            |
| **Can make your design overly general**            | The pattern can introduce generality that may not be needed for simpler problems.                                                                                       |
| **Maximal interface for the Composite**            | The Component interface must declare operations for managing children (e.g., `add()`, `remove()`), even though Leaf objects do not need them.                           |
| **Child management operation placement dilemma**   | Child management operations (e.g., add, remove) can be pushed down to `Composite`, but then `Leaf` and `Composite` will have different interfaces, breaking uniformity. |

### Implementation Considerations

| Implementation Issue                                         | Consideration                                                                                                                                                                  |
| :----------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Explicit parent references**                               | Maintaining a reference from each child back to its parent can simplify traversal and deletion, but adds overhead.                                                             |
| **Sharing components**                                       | Components can potentially be shared between multiple composites.                                                                                                              |
| **Problematic if keeping reference to parent**               | If a component keeps a parent reference, it becomes problematic when a component has multiple parents (shared component).                                                      |
| **Putting child pointer in base class incurs space penalty** | If the `Component` base class includes child pointer storage (for managing children), every `Leaf` object pays this space cost even though `Leaf` objects never have children. |
| **Deletion responsibility**                                  | It is usually best to make a `Composite` responsible for deleting its children when it is destroyed, to avoid memory leaks.                                                    |

### Summary Table: Proxy vs. Composite

| Aspect             | Proxy Pattern                                                                                                                   | Composite Pattern                                                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Intent**         | Provide a surrogate or placeholder for another object to control access to it.                                                  | Compose objects into tree structures to represent part-whole hierarchies. Clients treat individual objects and compositions uniformly.                     |
| **Problem solved** | Controlling access to an object (remote, virtual, protection, smart reference). Deferring expensive operations.                 | Representing recursive hierarchies (e.g., GUI containers, file systems) where both primitives and containers share the same interface.                     |
| **Key mechanism**  | Proxy implements the same interface as `RealSubject` and holds a reference to it. Proxy controls access and may defer creation. | `Component` interface defines uniform operations. `Leaf` implements primitive behavior. `Composite` implements child management and delegates to children. |
| **Relationship**   | Proxy controls access to a single `RealSubject`.                                                                                | `Composite` contains zero or more children (which can be `Leaf` or other `Composite` objects).                                                             |
| **Uniformity**     | Client cannot tell whether it is interacting with `Proxy` or `RealSubject` (same interface).                                    | Client cannot tell whether it is interacting with `Leaf` or `Composite` (same interface).                                                                  |
| **When to use**    | When you need to control, delay, or optimize access to an object.                                                               | When you need to represent part-whole hierarchies and want clients to treat components uniformly.                                                          |
| **Main drawback**  | Adds a level of indirection (slight performance cost).                                                                          | Can make design overly general; Leaf objects pay for child management methods they do not need.                                                            |

---

## Bridge Pattern

### Intent

- Decouple an abstraction from its implementation so that the two can vary independently.

### Motivation

- When an abstraction can have one of several possible implementations, the usual way to accommodate them is to use inheritance.
- However, inheritance binds an implementation to the abstraction permanently, which makes it difficult to modify, extend, and reuse abstractions and implementations independently.

#### The Problem Illustrated

- Example: A Window abstraction that needs to support different kinds of windows (e.g., icon window, dialog window) and different platforms (e.g., X Window System, PM Window Manager).
- It is inconvenient to extend the Window abstraction to cover different kinds of windows or new platforms.
- Clients should be able to create a window without committing to a concrete implementation.

### The Solution

- Put the Window abstraction and its implementation in separate class hierarchies.
- This allows the abstraction (what the client sees) and the implementation (how it works on a specific platform) to change independently.

### Structure (Participants)

| Participant                                             | Role                                                                                                                                                                                                                                                                                                                                    |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Abstraction** (e.g., Window)                          | Defines the abstraction's interface. Maintains a reference to an object of type Implementor.                                                                                                                                                                                                                                            |
| **RefinedAbstraction** (e.g., IconWindow)               | Extends the interface defined by Abstraction. Can add new operations or refine existing ones.                                                                                                                                                                                                                                           |
| **Implementor** (e.g., WindowImp)                       | Defines the interface for implementation classes. This interface does not have to correspond exactly to Abstraction's interface; in fact the two interfaces can be quite different. Typically, the Implementor interface provides only primitive operations, and Abstraction defines higher-level operations based on these primitives. |
| **ConcreteImplementor** (e.g., XWindowImp, PMWindowImp) | Implements the Implementor interface and defines its concrete implementation for a specific platform or technology.                                                                                                                                                                                                                     |

### When to Use Bridge (Applicability)

Use the Bridge pattern when:

| Applicability Condition           | Explanation                                                                                                                                                                                             |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Avoid permanent binding**       | Allows changing the implementation at run-time without modifying the abstraction.                                                                                                                       |
| **Extensibility via subclassing** | Both the abstractions and their implementations should be extensible by subclassing. You can add new abstractions (e.g., new window types) and new implementations (e.g., new platforms) independently. |
| **No impact on clients**          | Changes in the implementation of an abstraction should have no impact on clients. Clients depend only on the Abstraction interface, not on the concrete Implementor.                                    |
| **Hidden implementation**         | You want to hide the implementation of an abstraction completely from clients. Clients see only the abstraction's interface; implementation details are encapsulated.                                   |
| **Class explosion**               | You have an increasing number of classes (class explosion) as shown in the motivation diagram. Bridge collapses a 2D inheritance matrix (abstractions × implementations) into two parallel hierarchies. |
| **Sharing implementations**       | You want to share an implementation among multiple objects, and this fact should be hidden from the client. Multiple abstraction instances can share the same `ConcreteImplementor` object.             |

### Consequences (Benefits)

| Consequence                                 | Explanation                                                                                                                                                                                                                        |
| :------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Decoupling interface and implementation** | The abstraction and implementation can be modified, extended, or replaced independently.                                                                                                                                           |
| **Run-time implementation switching**       | It is even possible for an object to change its implementation at run-time (by swapping the `Implementor` reference).                                                                                                              |
| **Eliminates compile-time dependencies**    | Code that depends only on the `Abstraction` does not need to be recompiled when the `ConcreteImplementor` changes. This is essential when ensuring binary compatibility between different versions of a class library.             |
| **Independent extensibility**               | You can extend the `Abstraction` and `Implementor` hierarchies independently. Adding a new window type does not require modifying all platform implementations. Adding a new platform does not require modifying all window types. |
| **Hiding implementation details**           | Clients are completely unaware of the implementation details, promoting cleaner separation of concerns.                                                                                                                            |

---

## Flyweight Pattern

### Intent

- Use sharing to support large numbers of fine-grained objects efficiently.

### Motivation

- Some applications could benefit from using objects throughout their design, but a naive implementation would be prohibitively expensive (e.g., too much memory consumption).
- The Flyweight pattern is used to minimize memory usage or computational expenses by sharing as much as possible with similar objects.

### Core Concepts

- **Flyweight:** A shared object that can be used in multiple contexts simultaneously. The flyweight acts as an independent object in each context — it is indistinguishable from an instance of the object that is not shared.
- **Immutable requirement:** When multiple clients share access to an object, if a client changes the object's state, the state changes for every client that has access to it. Therefore, flyweights should be used as immutable — once created, the object cannot change. This keeps clients from affecting one another.
- **No context assumptions:** Flyweights cannot make assumptions about the context in which they operate. They must work correctly regardless of which client uses them or where they appear.

### Intrinsic vs. Extrinsic State

| Type of State       | Where Stored                          | Sharable?                                                                                                    | Responsibility                                                       |
| :------------------ | :------------------------------------ | :----------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| **Intrinsic state** | Stored in the flyweight object itself | Yes — it consists of information that is independent of the flyweight's context, thereby making it sharable. | Flyweight stores this state internally.                              |
| **Extrinsic state** | Stored or computed by Client objects  | No — it depends on and varies with the flyweight's context and therefore cannot be shared.                   | Client is responsible for passing this to the flyweight when needed. |

### Structure (Participants)

| Participant                             | Role                                                                                                                                                                                                                                                                                                        |
| :-------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Flyweight** (e.g., Glyph)             | Declares an interface through which flyweights can receive and act on extrinsic state.                                                                                                                                                                                                                      |
| **ConcreteFlyweight** (e.g., Character) | Implements the Flyweight interface and adds storage for intrinsic state, if any. A `ConcreteFlyweight` object must be sharable. Any state it stores must be intrinsic — that is, it must be independent of the `ConcreteFlyweight` object's context.                                                        |
| **UnsharedConcreteFlyweight**           | Not all Flyweight subclasses need to be shared. The Flyweight interface enables sharing; it does not enforce it. It is common for `UnsharedConcreteFlyweight` objects to have `ConcreteFlyweight` objects as children at some level in the flyweight object structure (as the Row and Column classes have). |
| **FlyweightFactory**                    | Creates and manages flyweight objects. Ensures that flyweights are shared properly. When a client requests a flyweight, the `FlyweightFactory` object supplies an existing instance or creates a new one, if none exists.                                                                                   |
| **Client**                              | Maintains a reference to flyweight(s). Computes or stores the extrinsic state of flyweight(s). Clients must obtain `ConcreteFlyweight` objects exclusively from the `FlyweightFactory` to ensure they are shared properly. Clients should not instantiate `ConcreteFlyweights` directly.                    |

### Collaborations (How It Works)

- Flyweight state must be characterized as either intrinsic or extrinsic.
- Intrinsic state is stored in the `ConcreteFlyweight` object.
- Extrinsic state is stored or computed by `Client` objects.
- Clients pass this extrinsic state to the flyweight when they invoke its operations.
- Clients must obtain `ConcreteFlyweight` objects exclusively from the `FlyweightFactory` object to ensure they are shared properly.

### When to Use Flyweight (Applicability)

Apply the Flyweight pattern when all of the following are true:

| Condition                        | Explanation                                                                                                                                                                                                                    |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Large number of objects**      | An application uses a large number of objects. The pattern is only worthwhile when object count is high.                                                                                                                       |
| **High storage costs**           | Storage costs are high because of the number of objects. Memory is the primary constraint being addressed.                                                                                                                     |
| **Extrinsic state potential**    | Most object state can be made extrinsic. If most state is intrinsic, sharing provides little benefit.                                                                                                                          |
| **High sharing ratio**           | Many groups of objects may be replaced by relatively few shared objects once extrinsic state is removed. The sharing ratio must be high enough to justify the added complexity.                                                |
| **Object identity independence** | The application does not depend on object identity. Since flyweight objects may be shared, identity tests (==) will return true for conceptually distinct objects. This can be problematic if clients rely on object identity. |

### Consequences (Benefits and Trade-offs)

| Consequence                    | Explanation                                                                                                                                                                       |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Run-time costs (trade-off)** | Flyweights may introduce run-time costs associated with transferring, finding, and/or computing extrinsic state, especially if that state was formerly stored as intrinsic state. |
| **Space savings (benefit)**    | Run-time costs are offset by space savings, which increase as more flyweights are shared.                                                                                         |
| **Storage saving factors**     | Storage savings depend on: (1) Reduction in total instances, (2) Amount of intrinsic state per object, (3) Whether extrinsic state is computed or stored.                         |
| **Increasing savings**         | The more flyweights are shared, the greater the storage savings. Linear relationship: more sharing → more savings.                                                                |

### Summary Table: Bridge vs. Flyweight

| Aspect                   | Bridge Pattern                                                                                                         | Flyweight Pattern                                                                                                   |
| :----------------------- | :--------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Intent**               | Decouple an abstraction from its implementation so that the two can vary independently.                                | Use sharing to support large numbers of fine-grained objects efficiently.                                           |
| **Problem solved**       | Class explosion from combining multiple abstractions with multiple implementations (2D inheritance matrix).            | High memory usage from creating too many fine-grained objects.                                                      |
| **Key mechanism**        | Separate class hierarchies: one for abstraction, one for implementation. Abstraction holds a reference to Implementor. | Separate intrinsic state (sharable) from extrinsic state (context-specific). Share flyweight objects via a factory. |
| **Relationship**         | Bridge decouples (separates) two hierarchies.                                                                          | Flyweight shares objects across multiple clients.                                                                   |
| **Direction of change**  | Changes in abstraction do not affect implementation; changes in implementation do not affect abstraction.              | Changes to intrinsic state affect all clients sharing the flyweight (hence immutability requirement).               |
| **Run-time flexibility** | Implementation can be changed at run-time by swapping the `Implementor` reference.                                     | Flyweights are immutable; cannot change state after creation.                                                       |
| **When to use**          | When you need to support multiple independent dimensions of variation (abstractions and implementations).              | When you have a very large number of objects and memory is a constraint, and most state can be made extrinsic.      |
| **Main drawback**        | Adds indirection and complexity; may be overkill if only one abstraction or one implementation exists.                 | Adds run-time cost for managing extrinsic state; breaks object identity (shared objects are not distinct).          |

---

## All Structural Patterns Summary (at a glance)

| Pattern       | Intent (One Sentence)                                                                                                     |
| :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| **Adapter**   | "Convert the interface of a class into another interface that clients expect."                                            |
| **Façade**    | "Provide a unified interface to a set of interfaces in a subsystem."                                                      |
| **Decorator** | "Attach additional responsibilities to an object dynamically."                                                            |
| **Proxy**     | "Provide a surrogate or placeholder for another object to control access to it."                                          |
| **Composite** | "Compose objects into tree structures to represent part-whole hierarchies; treat individuals and compositions uniformly." |
| **Bridge**    | "Decouple an abstraction from its implementation so that the two can vary independently."                                 |
| **Flyweight** | "Use sharing to support large numbers of fine-grained objects efficiently."                                               |
