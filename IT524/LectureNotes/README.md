### THE NATURE OF SOFTWARE

- Software is intangible
  - Hard to understand development effort
- Software is easy to reproduce
  - Cost is in its development
    - In other engineering products, manufacturing is the costly stage
- The industry is labor-intensive

  - Hard to automate

- Untrained people can hack something together
  - Quality problems are hard to notice
- Software is easy to modify
  - People make changes without fully understanding it
- Software does not ‘wear out’
  - It deteriorates by having its design changed:
    - Erroneously, or
    - In ways that were not anticipated, thus making it complex

### SOFTWARE CRISIS

- Much software has poor design and is getting worse
- Many software projects are either never delivered, or are delivered late and over budget
- There is strong demand for new and changed software, which customers expect to be of high quality and to be produced rapidly.
- Are we in a perpetual ‘software crisis’???

### TYPES OF SOFTWARE

- Custom
  - For a specific customer
- Generic
  - Sold on open market
  - Often called
  - COTS (Commercial Off The Shelf)
- Shrink-wrapped

  - Built into hardware
  - Hard to change

- Real time software
  - E.g., control and monitoring systems
  - Must react immediately
  - Safety often a concern
- Data processing software
  - Used to run businesses
  - Accuracy and security of data are key
- Some software has both aspects

### WHAT IS SOFTWARE ENGINEERING

- The process of solving customers’ problems by the systematic development and evolution of large, high-quality software systems within cost, time and other constraints

- Other definitions:

  - IEEE: (1) the application of a systematic, disciplined, quantifiable approach to the development, operation, maintenance of software; that is, the application of engineering to software. (2) The study of approaches as in (1).
  - The Canadian Standards Association: The systematic activities involved in the design, implementation and testing of software to optimize its production and support.

- **Solving customers’ problems**

  - This is the goal of software engineering
  - Sometimes the solution is to buy, not build
  - Adding unnecessary features does not help solve the problem
  - Software engineers must communicate effectively to identify and understand the problem

- **Systematic development and evolution**

  - An engineering process involves applying well understood techniques in an organized and disciplined way
  - Many well-accepted practices have been formally standardized
    - e.g. by the IEEE or ISO
  - Most development work is evolution

- **Large, high quality software systems**

  - Software engineering techniques are needed because large systems cannot be completely understood by one person
  - Teamwork and co-ordination are required
  - **Key challenge**: Dividing up the work and ensuring that the parts of the system work properly together
  - The end-product must be of sufficient quality

- **Cost, time and other constraints**
  - Finite resources
  - The benefit must outweigh the cost
  - Others are competing to do the job cheaper and faster
  - Inaccurate estimates of cost and time have caused many project failures

### STAKEHOLDERS IN SOFTWARE ENGINEERING

1. Users

- Those who use the software

2. Customers

- Those who pay for the software

3. Software developers

- Requirement specialists
- Database specialists
- Programmers
- Configuration management specialists

4. Development Managers

> All four roles can be fulfilled by the same person

### SOFTWARE QUALITY

| Quality Attribute | Definition                                                                                                |
| ----------------- | --------------------------------------------------------------------------------------------------------- |
| Usability         | The ease with which users can learn the system and quickly accomplish their tasks.                        |
| Efficiency        | The ability of the system to perform its functions without wasting resources such as CPU time and memory. |
| Reliability       | The degree to which the system performs its required functions correctly without failure.                 |
| Maintainability   | The ease with which the system can be modified, fixed, or improved over time.                             |
| Reusability       | The extent to which system components can be reused in other projects without the need for reprogramming. |

### SHORT TERM VS LONG TERM QUALITY

| Short Term                                             | Long Term                                                    |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| Does the software meet the customer’s immediate needs? | Maintainability                                              |
| Is it sufficiently efficient?                          | Customer’s future needs                                      |
| Can it handle the current volume of data?              | Scalability: Can the software handle larger volumes of data? |

### SOFTWARE ENGINEERING PROJECTS

- Most projects are evolutionary or maintenance projects, involving work on _legacy_ systems
- <u>Corrective projects:</u> fixing defects
- <u>Adaptive projects:</u> changing the system in response to changes in
  - Operating system
  - Database
  - Rules and regulations
- <u>Enhancement projects:</u> adding new features for users
- <u>Reengineering or perfective projects:</u> changing the system internally so it is more maintainable

| Green Field Projects                                 | Brown Field Projects                                             |
| ---------------------------------------------------- | ---------------------------------------------------------------- |
| New development                                      | Development of new software on top of existing (legacy) software |
| Significantly less common than evolutionary projects | Rebuilding a system from an existing project                     |

- Projects that involve building on a framework or a set of
  existing components.
  - A framework is an application that is missing some important details
    - E.g., Specific rules of this organization
- Such projects:
  - Involve plugging together components that are:
    - Already developed
    - Provide significant functionality
  - Benefit from reusing reliable software
  - Provide much of the same freedom to innovate found in green field development
