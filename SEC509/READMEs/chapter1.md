# Software Ubiquity and Modern Dependency

## Software Distribution in Contemporary Society

Software is not confined to utilization by a limited demographic segment of modern society. Rather, the entire population depends upon software systems for essential functions and daily operations.

## Dual Requirements for Software Systems

Given the pervasiveness of software in contemporary life, software systems must satisfy two critical criteria:

- **Functional Correctness**: Software must function properly and according to specifications.
- **Continuous Availability**: Software must remain available at all times to enable users to continue their engagement with digital modes of existence.

The inability to meet either of these requirements undermines the collective capacity to continue functioning effectively within digital ecosystems.

---

# Consequences of Software Failure

## Impact on Organizations and Enterprises

When software systems fail, organizations and commercial entities face substantial and multifaceted consequences.

### Financial Impact

- **Loss of Revenue**: Direct financial losses resulting from service unavailability or system malfunction.

### Reputational Consequences

- **Negative Media Coverage**: Organizations experience unfavorable press coverage. The probability of receiving adverse media attention in such circumstances is exceptionally high.
- **Loss of Consumer Confidence**: Software failures erode customer trust and confidence in the organization's ability to deliver reliable services.
- **Stock Price Depreciation**: The organization's market valuation deteriorates, as reflected in declining stock prices.

## Organizational Imperative for Reliability

Companies and organizations cannot afford to assume risk with unreliable software. The stakes involved—encompassing financial, reputational, and market-based consequences—necessitate that software systems be inherently reliable.

---

# Primary Causes of Software Failure

## Vulnerabilities and Misconfigurations

Software systems fail primarily due to vulnerabilities and misconfigurations present within the software architecture and deployment environment.

---

# Vulnerability Definition and Characteristics

## Formal Definition of Vulnerability

### Vulnerability in the Context of Software

A **vulnerability**, in the context of software, is formally defined as:

**A defect in the implementation or design that opens a pathway for an attacker with the right set of skills to exploit the defect and cause the software to behave in ways the software developer never anticipated.**

Alternatively expressed: A vulnerability constitutes a weakness that can be exploited.

## Exploitability and Control Mechanisms

### Taking Control Through Exploitation

Exploitation of vulnerabilities enables an attacker to assume control of the host computer through multiple attack vectors:

- **Remote Network-Based Control**: If the affected computer is connected via network infrastructure or the Internet, an attacker may exercise remote control over the system.
- **Local Attack Control**: In the case of insider attacks, an attacker with local access may assume control of the local computer.

### Subsequent System Compromise

Once control is obtained, attackers may convert the compromised system into:

- A **zombie computer** (also referred to as a bot)
- A system serving the attacker's objectives under their direct command

## Security Focus of Vulnerabilities

### Scope Limitation

Vulnerabilities relate exclusively to the **security aspects of software**.

### Distinguished from Other Defects

Vulnerabilities are distinct from and do not include:

- **Bugs**: Flaws in implementation that cause the software to perform incorrectly or deviate from intended functionality.
- **Installation Issues**: Problems encountered during the installation or deployment phase of software.
- **Configuration Issues**: Problems related to the configuration or customization of software for specific environments.
- **Operational Issues**: Problems encountered during the use or operation of software by end users.
- **Support-Related Issues**: Problems arising from the provision of support services for the software to other individuals or entities.

---

# Terminology Summary

| Term                  | Definition                                                                                                                                                       |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Vulnerability**     | A defect in implementation or design that opens a pathway for an attacker to exploit and cause unanticipated software behavior; a weakness that can be exploited |
| **Bug**               | A flaw in implementation that causes software to perform incorrectly                                                                                             |
| **Exploit**           | The act of leveraging a vulnerability to cause software to behave in unanticipated ways and gain unauthorized control                                            |
| **Zombie Computer**   | A compromised system under the control of an attacker; alternatively termed a bot                                                                                |
| **Bot**               | A compromised system placed under the control of an attacker; equivalent to a zombie computer                                                                    |
| **Misconfigurations** | Problems related to the installation, configuration, use, or support of software (as distinguished from vulnerabilities)                                         |

---

# Prevalence of Vulnerabilities in Contemporary Software Systems

## Advancement in Vulnerability Research and Detection

Research on detecting cybersecurity problems and developing remedial measures has advanced significantly in recent years. Security researchers are discovering and patching thousands of new vulnerabilities each year, demonstrating both the widespread nature of vulnerabilities and the ongoing effort to address them.

---

# Ubiquity of Security Flaws in Software

## Pervasive Distribution of Security Vulnerabilities

Just as software is ubiquitous in contemporary society, security flaws in software are equally pervasive. Flaws are present in the majority of software systems currently deployed.

## Implications for System Security and Safety

Flaws in software can threaten the security and safety of the very systems on which the software operates. This threat extends beyond data compromise to encompass the physical safety and operational integrity of the systems themselves.

## Scope of Affected Devices

Security flaws can manifest in software across a diverse range of consumer and embedded devices, including but not limited to:

- **Mobile phones**
- **Vacuum cleaners** (robotic devices)
- **Cars and other vehicles**

---

# Security Vulnerabilities in Mobile Phone Devices

## Widespread Vulnerability Across Mobile Platforms

Software vulnerabilities have affected both Android and iPhone platforms, demonstrating that security flaws are not isolated to a single operating system or manufacturer.

## iOS Software Vulnerability

### Clipboard Data Breach

A software developer constructed a malicious proof-of-concept iOS application that exploited a vulnerability to read data recently saved to the device's clipboard. This vulnerability enables unauthorized access to sensitive information that users have copied to the clipboard, potentially including passwords, payment information, and other confidential data.

## Android Software Vulnerabilities

### StrandHogg Vulnerability

**StrandHogg** represents a critical vulnerability in the Android operating system that:

- Allows hackers to gain unauthorized access to private data on almost any Android phone
- Demonstrates the widespread nature of the vulnerability across the Android device ecosystem

## Security Threats in Discontinued Mobile Devices

### Nokia 1100 Reprogramming Vulnerability

Even discontinued mobile devices present serious security risks. The Nokia 1100, a legacy device, can apparently be reprogrammed to use someone else's phone number. This capability enables:

- Unauthorized receipt of text messages on a compromised device
- Fraudulent access to telecommunications services

### Online Banking Fraud Implications

The ability to reprogramme a device to use an alternative phone number opens significant opportunities for online banking fraud. Many financial institutions employ short message service (SMS)-based authentication mechanisms for account access and transaction verification. Compromising this authentication vector through phone number spoofing creates substantial financial risk to users.

---

# Security Vulnerabilities in Connected Robotic Devices

## Vulnerabilities in Connected Robotic Vacuum Cleaners

A connected robotic vacuum cleaner has been found to contain serious vulnerabilities that could facilitate attacks by remote hackers.

## Potential Attack Vectors

Remote exploitation of vulnerabilities in robotic vacuum cleaners enables the following attacks:

- **Unauthorized Video Surveillance**: Remote hackers can view video footage captured by the device's integrated security camera.
- **Denial of Service Attacks**: Attackers can initiate denial of service attacks against the device and potentially the network to which it is connected.

## The Ironpie M6 Robotic Vacuum Cleaner Case Study

### Device Specifications

The Ironpie M6, manufactured by Trifo, is a connected robotic vacuum cleaner equipped with:

- A corresponding mobile application for remote control and management
- A security camera for surveillance and navigation purposes

### Identified Vulnerabilities

Researchers uncovered six (6) distinct security flaws in the Ironpie M6. These vulnerabilities originated from two primary components:

- The vacuum cleaner's mobile application
- The device's connectivity protocol

### Research Disclosure

These vulnerabilities were formally identified and disclosed at the RSA Conference 2020, a premier cybersecurity research and practitioner conference.

---

# Root Causes of Defective Software

## Educational Deficiencies in Secure Programming

### Primary Source of Vulnerability Introduction

The origin of security vulnerabilities in software can be traced to fundamental educational gaps. Programmers frequently do not possess adequate knowledge of secure coding practices because they were never formally taught how to write secure and resilient programs during their academic training or professional development.

## Insufficient Exposure to Nonfunctional Requirements

### Timing Gap in Knowledge Acquisition

Programmers who most urgently require knowledge of security and quality requirements often do not encounter or study these concepts until they are already actively employed in professional software development roles. This timing gap creates a critical vulnerability window during early career development when developers are producing code without adequate understanding of security considerations.

## Inadequate Testing Against Malicious Input

### Gap Between Intended and Secure Functionality

Software may function precisely as the developer intended it to function in normal operational scenarios. However, it may never have been tested to determine how the software behaves when:

- Fed malicious or adversarial input
- Subjected to direct attack
- Operating under attack conditions

This testing gap represents a critical oversight in the software development lifecycle, as developers focus on functional correctness while neglecting security robustness.

## Integration of Nonfunctional Requirements in Development

### Emergence During Complex Application Development

Nonfunctional requirements—which encompass security, performance, scalability, and reliability requirements—do not typically manifest as obvious concerns until developers are assigned to develop a nontrivial business application for the first time. These requirements often become secondary or are lost entirely amid the more immediate pressures of fulfilling functional requirements.

### Competing Priorities in Development Tasks

When developers are focused on delivering the core functional capabilities requested by stakeholders, nonfunctional and quality requirements are frequently deprioritized or overlooked. The immediate demands of task completion overshadow the importance of implementing robust security measures and quality assurance practices.

---

# Financial Impact of Insecure Software on Global Enterprises

## Global Organizational Expenditure on Software Security

Organizations worldwide spend millions each year to secure their software, ensure regulatory compliance, and manage comprehensive security programs. This substantial financial investment reflects the critical importance of software security across all sectors of the global economy.

## Allocation of Security Expenditures

The majority of organizational security spending is allocated toward three primary activities:

- **Identifying Vulnerabilities**: Resources directed toward the discovery and cataloging of security vulnerabilities within software systems.
- **Reducing Risk**: Expenditures associated with mitigating identified vulnerabilities and minimizing overall security exposure.
- **Rewriting Software When Needed**: Costs incurred when software systems must be substantially modified or reconstructed to address critical security deficiencies.

## Business Losses from System Downtime

Downtime resulting from system failures—whether caused by security breaches, malicious attacks, or other security-related incidents—generates significant direct and indirect business losses. These losses extend beyond immediate financial impact to encompass operational disruption, customer dissatisfaction, and long-term market consequences.

---

# Dimensions of Cybersecurity—The McCumber Cube

## Framework for Understanding Cybersecurity Protection

Understanding the dimensions of cybersecurity is essential for managing the protection of networks, domains, and the Internet. A comprehensive approach to cybersecurity requires considering multiple interconnected dimensions simultaneously.

## The McCumber Cube Framework

The McCumber Cube is a foundational cybersecurity framework comprising three distinct dimensions, each of which must be addressed to achieve comprehensive security protection.

### Dimension One: Information States

Information States represent the various conditions or phases in which data exists within computer systems and networks.

**Possible states include:**

- **Data in Transit**: Data being moved from one location to another
- **Data at Rest or in Storage**: Data stored in stationary locations
- **Data in Process**: Data currently being actively used or manipulated

### Dimension Two: Critical Information Characteristics

Critical Information Characteristics represent the fundamental security properties that must be protected. These are also referred to as information security assurances.

**These characteristics include:**

- **Confidentiality**: Protection against unauthorized disclosure of information
- **Integrity**: Protection against unauthorized modification of information
- **Availability**: Assurance that information systems are accessible when required

### Dimension Three: Security Measurements

Security Measurements encompass the mechanisms, methodologies, and organizational approaches employed to implement protection across the other two dimensions.

**Security Measurements include:**

- **Technology**: Technical tools and systems used for security implementation
- **Policies and Practice**: Organizational guidelines, procedures, and established security practices
- **Education, Training, and Awareness of People**: Human-centered security initiatives including formal training programs and awareness-building efforts

## Comprehensive Protection Requirement

The protection of cyberspace requires cybersecurity professionals to account for the safeguarding of data in all three information states. Effective cybersecurity must address the intersection of all three McCumber Cube dimensions.

---

# Information States—First Dimension of the McCumber Cube

## Data-Centric Security Focus

Cyberspace is a domain containing a considerable amount of critically important data. This reality necessitates that cybersecurity experts maintain a primary focus on protecting data as their central objective.

## Data in Transit

### Definition and Scope

Data in transit refers to data being moved from one location to another within a computer network or across network boundaries.

### Primary Concern Area

Network security is primarily concerned with protecting data in this transit state. This state includes data moving along physical transmission media (such as copper wiring) or transmitted wirelessly (such as through Wi-Fi networks).

## Data at Rest or in Storage

### Definition and Examples

Data at rest or in storage refers to data in a stationary state within storage systems. Examples of data at rest include:

- Data on a hard disk drive
- Data in computer memory (RAM)
- Data in a processor register
- Data in databases
- Data in any other persistent storage medium

### Banking Context Example

In the context of a banking scenario, data at rest includes money in an account or valuables stored in a safety deposit box.

## Data in Process

### Definition and Operational Context

The processing state of data occurs when data is currently being actively used or operated upon by computational systems. This is the state in which code is executing operations on data, transforming it from one state to another.

### Vulnerability Concentration

Most vulnerabilities occur when data is being processed. The dynamic nature of data processing—involving movement between different storage locations, manipulation by application code, and exposure through computational channels—creates the greatest attack surface.

---

# Critical Information Characteristics—Second Dimension of the McCumber Cube

## Foundational Definition of Information Security

Experts formally define information security as the ability to protect the confidentiality, integrity, and availability of information or the information system. These three characteristics constitute the core pillars of information security.

## Secondary Security Requirements Supporting the Three Core Goals

When additional security requirements are implemented, they serve to fulfill these three primary goals. Secondary security requirements include:

- **Authentication**: Verification of the identity of users or systems
- **Authorization**: Determination of what authenticated entities are permitted to access or perform
- **Auditing**: Recording and reviewing of security-relevant activities and events
- **Nonrepudiation**: Assurance that entities cannot deny responsibility for their actions

When these secondary security requirements are properly built to fulfill the three core security goals, resilience emerges as a consequence.

## Achieving Resilience Through Security Assurances

Resilience can be assured when key questions concerning confidentiality, integrity, and availability are properly answered and addressed. The systematic treatment of these three fundamental characteristics provides the foundation for building resilient information systems.

## Integration of Security into the Software Development Lifecycle

Integrating security into the software development life cycle is identified as the key to eliminating current security problems once and for all. This integration must occur throughout all phases of software development, from initial design through deployment and maintenance.

---

# Addressing Confidentiality

## Definition of Confidentiality

**Confidentiality** is the assurance that the software system will keep the user's private data private. It is the goal of being assured that information is protected from being accessed by unauthorized and unwanted users.

## Confidentiality Breach Criteria

A confidentiality breach occurs when an individual accesses an asset (information or system) contrary to the wishes or authorization of the owner. The unauthorized viewing of protected information constitutes a violation of confidentiality.

## Typical Technical Measures for Confidentiality

Common technical approaches to protecting confidentiality include:

- **Data Encryption at Rest**: Encrypting files, databases, and other stored data to prevent unauthorized access
- **Data Encryption in Transit**: Using protocols such as SSL (Secure Sockets Layer) and SSH (Secure Shell) to encrypt data during network transmission

## Physical and Behavioral Aspects of Confidentiality

Confidentiality extends beyond technical mechanisms to encompass physical security practices:

- Ensuring that no unauthorized individuals are listening to or observing conversations regarding confidential topics, even in public locations
- Preventing unauthorized individuals from viewing keyboards or screens when sensitive data such as passwords are being entered

## Banking Context Example

In banking systems, confidentiality ensures that a client's account balance will not be disclosed to the public or to any unauthorized parties.

---

# Addressing Integrity

## Definition of Integrity

**Integrity** is the assurance that the software system will preserve the user's data. It is concerned with implementing controls to ensure that information cannot be modified without proper authorization and that stored information cannot be tampered with.

## Integrity Assurances and Promises

Integrity represents a commitment that the data:

- Is not destroyed
- Will not be corrupted
- Will not be altered, either maliciously or accidentally

## Scope of Integrity Protection

Integrity protection applies to information in multiple states:

- Information at rest (stored in databases or files)
- Information in transit (being transmitted across networks)

## Technical Methods for Protecting Integrity

Common techniques for protecting the integrity of information include:

- **Hashing**: Computing cryptographic hashes of data to detect unauthorized modifications
- **Digital Signatures**: Using cryptographic signatures to ensure authenticity and prevent tampering

## Banking Context Example

In banking systems, integrity protection addresses threats such as the unauthorized stealing of money from a bank account or client account, which would constitute unauthorized modification of financial data.

---

# Addressing Availability

## Definition of Availability

**Availability** is the assurance that the user can have access to informational, computational, or communication resources when required. It is ensuring that information and the associated information system are made available to authorized users whenever they need them.

## Complexity and Comprehensive Planning Requirements

Achieving availability is a complicated problem that requires extensive planning and rigorous testing. The challenge extends across multiple domains including system design, infrastructure redundancy, and threat mitigation.

## Dual Threat Categories to Availability

Availability assurance includes resistance to two distinct categories of threats:

- **Availability problems stemming from software defects**: Unintended system failures resulting from bugs or design flaws in software
- **Denial attacks from individuals with malicious intent**: Deliberately induced system unavailability caused by adversaries

## Denial Attacks and Denial of Service (DoS)

Attacks on availability are termed **denial attacks**, also known as **denial of services (DoS)**.

## Banking Context Examples

Availability threats in banking contexts include:

### Minor Inconveniences

Defects or vulnerabilities that cause minor disruptions to service, such as temporary unavailability of the bank's client login page.

### Temporary Outages

Denial of service attacks against critical infrastructure, such as distributed denial of service (DDoS) attacks targeting the bank's nameservers, causing temporary but significant service unavailability.

### Permanent Outages

Catastrophic attacks that permanently destroy banking infrastructure, such as ransomware attacks that destroy banking software, data, and systems, resulting in permanent loss of service.

---

# Practical Application—The VFEmail Case Study

## Case Study Overview

The VFEmail case represents a practical demonstration of how real-world security incidents result in the loss of one or more of the three critical information characteristics.

## Analysis Framework

All attacks fall into one or more categories corresponding to the three security assurances:

- **Confidentiality Loss**: Unauthorized disclosure of protected information
- **Integrity Loss**: Unauthorized modification or corruption of data
- **Availability Loss**: Denial or disruption of access to systems or information

## Application to Real-World Incidents

Security incidents and attacks should be analyzed using the framework of the McCumber Cube to determine which fundamental security characteristics have been compromised or lost during the attack. This analysis provides clarity regarding the nature of the security breach and its implications for organizational security posture.

---

# Software Resilience and Secure Software Characteristics

## Definition of Software Resilience

**Software resilience** is the ability to reduce the magnitude and/or duration of disruptive events. Resilient software systems continue to function effectively even when subjected to adverse conditions, attacks, or unexpected operational scenarios.

## Effectiveness of Resilient Systems

The effectiveness of a resilient application or infrastructure software depends on its ability to:

- **Anticipate**: Predict and prepare for potential disruptive events before they occur
- **Absorb**: Withstand disruptive events without catastrophic failure
- **Adapt to**: Modify behavior or operational parameters in response to disruptive events
- **Recover rapidly from**: Restore normal operations quickly following a disruptive event

## Foundation for Developing Resilient Code

To develop resilient code, both functional and nonfunctional requirements must be comprehensively understood. Resilience cannot be achieved by addressing only the functional aspects of software; rather, it requires equal attention to quality, security, and nonfunctional concerns.

---

# Functional Versus Nonfunctional Requirements

## Definition of Functional Requirements

**Functional requirements** describe what software is expected to "do"—the specific actions, operations, and capabilities the system must perform. These functions or features can be as simple as allowing a user to type a letter or as complex as executing sophisticated business logic.

## Definition of Nonfunctional Requirements

**Nonfunctional requirements (NFRs)** are the quality, security, and resiliency aspects of software that only appear in requirements documents when they are explicitly added. These requirements address how the system must accomplish its functional objectives, rather than what it must accomplish.

## Distinction Between Functional and Nonfunctional Requirements

### Functional Requirements State What

Functional requirements explicitly specify what the system must do. They address the behavioral and operational aspects of the software.

### Nonfunctional Requirements Constrain How

Nonfunctional requirements constrain how the system must accomplish its functional objectives. They establish constraints, quality standards, and performance criteria that govern the manner in which functional requirements are implemented.

---

# Testing of Nonfunctional Requirements

## Standard Testing Progression

Once software is developed, testing conventionally begins by verifying that the software meets its functional requirements. The primary question addressed during this phase is: Does the software perform what the users specify it needs to perform?

## Critical Gap in Testing Practices

Developers **rarely (or NEVER)** test their programs for security flaws or stress the software to the point where its limitations are exposed or it fails to continue operating. This represents a critical gap in contemporary software testing practices.

## Absent Security and Resilience Testing

Security-focused testing is often absent from the standard development and testing cycle. This omission results in:

- Undetected vulnerabilities remaining in deployed software
- Security flaws being discovered only after systems are already in production
- Inadequate preparation for adversarial scenarios and attack conditions

---

# Families of Nonfunctional Requirements Overview

## Categorization of Resilience Characteristics

Resilient software demonstrates several characteristics that make it easier to maintain and support. These characteristics fall into natural groups, each addressing specific aspects of software quality and operational capability.

## Identified Families of Nonfunctional Requirements

The following nonfunctional requirement families have been identified as addressing key aspects of software resilience and quality:

- **Availability**: System uptime and accessibility requirements
- **Capacity**: Resource provisioning and planning capabilities
- **Efficiency**: Computational resource utilization
- **Extensibility**: Ability to add new functionality
- **Interoperability**: Compatibility with other systems and software
- **Manageability**: Administrative and operational control
- **Maintainability**: Ease of modification and correction
- **Performance**: Speed, throughput, and responsiveness
- **Portability**: Ability to operate across different computing environments
- **Privacy**: Protection of personal and sensitive data
- **Recoverability**: Ability to restore operations following failure
- **Reliability**: Consistent, dependable operation
- **Scalability**: Ability to accommodate growing demand

**Note**: These families are listed alphabetically and do not represent an order of importance.

---

# Availability Requirements

## Definition and Scope

Availability requirements specify the levels and conditions under which a software system or application must remain accessible and operational to authorized users.

## Availability Level Categories

### High Availability

High availability is defined as a system or application being available during specified operating hours with no unplanned outages. This level permits scheduled downtime for maintenance during non-operational hours.

### Continuous Operations

Continuous operations is defined as a system or application available 24 hours a day, 7 days a week, with no scheduled outages. This level eliminates planned downtime but permits unplanned outages caused by unexpected failures.

### Continuous Availability

Continuous availability is defined as a system or application available 24 hours a day, 7 days a week, with no planned or unplanned outages. This represents the highest level of availability requirement.

---

# Capacity Requirements

## Definition and Purpose

Capacity refers to the resources allocated to a software system to meet operational demands. Capacity planning ensures that sufficient computational and infrastructure resources are provisioned to accommodate system load.

## Dynamic Capacity Management

Capacity planning is made substantially simpler when runtime environments can be changed dynamically to accommodate:

- Changes in user traffic
- Changes in hardware infrastructure
- Other runtime-related considerations and adaptations

Dynamic capacity management enables systems to scale resource allocation without requiring complete system shutdown or redeployment.

---

# Efficiency Requirements

## Definition of Efficiency

**Efficiency** refers to the degree to which a system uses scarce computational resources effectively and optimally. Efficiency concerns address the prudent consumption of limited system resources.

## Computational Resources Subject to Efficiency Constraints

Efficiency requirements apply to the following computational resources:

- **CPU cycles**: Processor utilization and instruction execution
- **Memory**: Random access memory (RAM) allocation and usage
- **Disk space**: Persistent storage utilization
- **Buffers**: Temporary data storage areas
- **Communication channels**: Network bandwidth and transmission capacity

---

# Interoperability Requirements

## Definition of Interoperability

**Interoperability** is the ability of a system to work with other systems or software without any special effort on the part of the user, the implementers, or the support personnel. Interoperability enables seamless integration with diverse external systems.

## Role of Standards in Interoperability

Interoperability requirements should dictate what standards must be applied to relevant software elements. Standards specifications enable designers and developers to access standardized interfaces and protocols, making it possible to build compliant software that integrates effectively with external systems.

---

# Manageability Requirements

## Definition of Manageability

**Manageability** is the characteristic that allows support personnel to move applications around available hardware as needed or to run software in virtual machine environments. Manageability enables flexible deployment and operational management.

## Architectural Principles Supporting Manageability

Manageability features require designers and developers to build software as **highly cohesive and loosely coupled** systems. This architectural approach facilitates the independent deployment, scaling, and management of software components.

## Cohesion in Software Modules

### Definition of Cohesion

**Cohesion** is increased when the methods of a software module exhibit the following characteristics:

- Have many common aspects
- Are focused on a single subject
- Can be carried out across a variety of unrelated sets of data

High cohesion indicates that methods within a module are strongly related to each other and work together toward a common purpose.

## Coupling in Software Systems

### Strong Coupling

**Strong coupling** occurs when a dependent class contains a pointer directly to a concrete class that offers the required method. Strong coupling creates tight dependencies that make components difficult to modify or replace independently.

### Loose Coupling

**Loose coupling** occurs when a dependent class contains a pointer only to an interface. This approach enables dependent components to interact through abstract interfaces rather than concrete implementations, facilitating flexibility and independent modification.

---

# Maintainability Requirements

## Definition of Software Maintenance

**Software maintenance** refers to the modification of a software application after delivery in order to:

- Correct faults and defects
- Improve performance
- Adapt the product to a modified environment

Software maintenance activities continue throughout the operational lifetime of a software system.

## Significance and Resource Requirements

Software maintenance is an expensive and time-consuming aspect of software development. Substantial financial and human resources are typically devoted to maintaining software systems after deployment, making maintainability a critical nonfunctional requirement.

---

# Performance Requirements

## Definition and Scope

Performance requirements address the speed, responsiveness, and throughput characteristics of software systems. Effective performance requirements establish measurable targets for system behavior under various conditions.

## Three Key Performance Areas

Performance requirements generally address three distinct areas:

### Speed of Processing Transactions

The time required to complete individual transactions or operations. This metric measures the latency or response time for specific system operations.

### Volume of Simultaneous Transactions

The number of transactions or operations that can be executed concurrently. This metric addresses the throughput capacity of the system.

### Number of Simultaneous Users

The quantity of concurrent users that the system can support while maintaining acceptable performance levels. This metric establishes the user capacity threshold.

---

# Portability Requirements

## Definition of Portability

**Portability** is the process of adapting software so that an executable program can be created for a computing environment that is different from the one for which it was originally designed. Portability enables software to operate across multiple hardware and software platforms.

## Strategic Importance and Development Implications

Portability is a key issue for development cost reduction. Sufficient time and resources must be allocated to:

- Determine the optimal programming languages and development environments
- Meet portability requirements
- Implement portability without the risk of developing different implementations for each target environment

Careful planning during the initial software architecture phase prevents costly rework and divergent implementations across different target platforms.

---

# Privacy Requirements

## Definition and Relationship to Security

**Privacy** encompasses controls and mechanisms that protect personal and sensitive information from unauthorized access or disclosure. Many privacy controls are implemented as security controls, reflecting the overlapping nature of privacy and information security concerns.

---

# Recoverability Requirements

## Definition of Recoverability

**Recoverability** is the requirement addressing how quickly an application must be restored following a disaster, unexpected outage, or failure of a dependent system. Recoverability is related to both reliability and availability requirements but extends to encompass recovery procedures and timelines.

## Relationship to Other Nonfunctional Requirements

Recoverability is closely related to:

- **Reliability**: The ability of systems to function without failure
- **Availability**: The requirement that systems remain accessible

Recoverability requirements typically specify the Recovery Time Objective (RTO) and Recovery Point Objective (RPO) that govern restoration procedures.

---

# Reliability Requirements

## Multiple Definitions of Reliability

Reliability may be defined in several distinct ways, each emphasizing different aspects of system dependability:

### Capacity Definition

The capacity of a device or system to perform as designed. This definition emphasizes the system's ability to meet design specifications.

### Resistance Definition

The resistance to failure of a device or system. This definition emphasizes the system's ability to avoid failures.

### Functional Performance Definition

The ability of a device or system to perform a required function under stated conditions for a specified period of time. This definition establishes measurable criteria for reliable operation.

### Probabilistic Definition

The probability that a functional unit will perform its required function for a specified interval under stated conditions. This definition provides a statistical measure of reliability.

### Graceful Failure Definition

The ability of something to fail well. This definition emphasizes that systems should degrade gracefully rather than catastrophically when failures occur.

---

# Scalability Requirements

## Definition of Scalability

**Scalability** is the ability of a system to grow in its capacity to meet the rising demand for the services it offers. Scalability is closely related to capacity nonfunctional requirements but emphasizes the dynamic adjustment of capacity in response to growing demand.

## System Scalability Criteria

System scalability criteria might include the ability to accommodate increasing numbers of:

- **Users**: Increasing number of concurrent or total users
- **Transactions per second**: Increasing transaction throughput without degradation of performance
- **Databases**: Increasing number of databases that can run and provide results simultaneously

---

# Foundational Principle—Resilience and Security Begin from Within

## Integration as the Sole Reliable Approach

The only reliable way to ensure that software is constructed secure and resilient is by integrating a security and resilience mindset and process throughout the entire software development life cycle (SDLC).

## Cost-of-Defect Economic Imperative

The cost of remediating vulnerabilities or flaws in design is substantially lower when they are caught and fixed during the early requirements and design phases compared to the cost of remediation after the software has been launched into production.

### Barry Boehm's Cost-of-Defect Metric

Barry Boehm developed the cost-of-defect metric, which demonstrates the exponential increase in remediation costs as defects progress through successive phases of the software development lifecycle. Defects identified and corrected in the requirements phase incur minimal costs, while the same defects discovered in the maintenance phase incur costs orders of magnitude greater.

---

# Software Development Methodology Frameworks

## Methodology-Agnostic Security Integration

Regardless of which software development methodology an organization follows, security and resilience processes must be present in one form or the other. Security integration is a fundamental requirement independent of the specific development methodology employed.

## Common Software Development Methodologies

Organizations employ various software development methodologies, including:

- **Waterfall**
- **Agile**
- Other methodologies

### Waterfall Model

The Waterfall Model represents a sequential, phase-based approach to software development. The methodology progresses through distinct, non-overlapping phases:

- **Requirements**: Comprehensive gathering and documentation of functional and nonfunctional requirements
- **Specification**: Detailed specification of system behavior and acceptance criteria
- **Design**: Architectural and detailed design of the system
- **Implementation**: Coding and software construction
- **Testing**: Comprehensive testing of implemented functionality
- **Maintenance**: Post-deployment support, correction, and enhancement

Each phase is substantially completed before proceeding to the subsequent phase.

### Agile Model

The Agile Model represents an iterative, incremental approach to software development. The methodology organizes development around cyclical iterations addressing:

- **Requirements analysis** (Phase 1)
- **Design** (Phase 2)
- **Development (coding)** (Phase 3)
- **Testing and debugging** (Phase 4)
- **Release** (Phase 5)
- **Maintenance and user feedback** (Phase 1 of subsequent iteration)

The Agile model emphasizes rapid iteration, continuous feedback, and adaptive planning throughout the development process.

---

# Security Integration Across SDLC Phases

## High-Level Overview of Security and Resilience Processes

A comprehensive overview of the fundamental security and resilience processes should be integrated into the various SDLC phases, spanning from requirements gathering through deployment and beyond.

## SDLC Phase Progression

The typical SDLC progresses through five primary phases:

- **Requirements**
- **Design**
- **Development**
- **Test**
- **Deployment**

## Security and Resilience Processes by Phase

Security and resilience processes are integrated into each SDLC phase according to the specific focus and objectives of that phase.

### Requirements Phase Processes

- **Map Security & Privacy Requirements**: Identify and document security and privacy requirements based on organizational policies, regulatory requirements, and industry standards

### Design Phase Processes

- **Threat Modeling**: Systematic identification and analysis of potential threats and vulnerabilities
- **Security Design Review**: Formal review of architectural and design decisions for security implications

### Development Phase Processes

- **Static Analysis**: Automated analysis of source code to identify potential vulnerabilities without executing the code
- **Peer Review**: Code review by team members to identify security flaws and design issues

### Test Phase Processes

- **Security Test Cases**: Testing specifically designed to verify security controls and identify vulnerabilities
- **Dynamic Analysis**: Testing of executing code to identify runtime vulnerabilities and behavioral issues

### Deployment Phase Processes

- **Final Security Review**: Comprehensive security assessment prior to production deployment
- **Application Security Monitoring & Response Plan**: Establishment of monitoring, incident detection, and incident response procedures for the deployed application

## Process Outputs and Recommendations

Each process yields its own recommendations. These recommendations are prepared to make appropriate changes to:

- **Design and architecture**: Modifications to system architecture and design decisions
- **Source code**: Code corrections and improvements
- **Use of third-party components**: Assessment and selection of external libraries and components
- **Deployment configurations**: Configuration adjustments for secure deployment
- **Other considerations**: Comprehensive review of all factors that help understand and reduce risk down to an acceptable level

---

# Requirements Phase—Security and Resilience Integration

## Designer Preparedness and Constraint Understanding

Designers need to understand the constraints they are expected to face and be prepared to answer the call for security and resilience, as well as nonfunctional requirements (NFRs). Security cannot be treated as an afterthought but must be integral to the requirements phase.

## Environmental Familiarity Requirements

To be effective, business systems analysts and systems designers should be very familiar with the environment in which they are operating. This familiarity requires reviewing and maintaining current knowledge about:

### Organizational Policies and Standards

- **Organizational security policies and standards**: Established security guidelines and protocols specific to the organization
- **Organizational privacy policy**: Privacy protection requirements and procedures mandated by the organization

### External Compliance Requirements

- **Regulatory requirements**: Legal and compliance mandates applicable to the organization and its industry
- **Other relevant industry standards**: Sector-specific standards such as PCI DSS (Payment Card Industry Data Security Standard), ANSI-X9 (American National Standards Institute standards for financial institutions), and other applicable standards

## Mapping Nonfunctional Requirements to Security Goals

The nonfunctional requirements (NFRs) are then mapped against the critical security and resilience goals. These fundamental security objectives establish the foundation for all security-related requirements and design decisions.

### Critical Security and Resilience Goals

The mapping process aligns NFRs with the following core security objectives:

- **Confidentiality**: Protection of information from unauthorized disclosure
- **Privacy**: Protection of personal and sensitive information
- **Integrity**: Protection of information against unauthorized modification
- **Availability**: Assurance that systems and information remain accessible
- **Auditing**: Capability to record and review security-relevant activities

## Security-Focused Requirements Questions

### Data Storage Questions

Designers must address fundamental questions regarding data storage and location:

- **Where is the data being stored?**
  - Locally on organizational infrastructure?
  - Remotely on cloud or external systems?

### Data Access Questions

Questions regarding data access mechanisms and pathways must be addressed:

- **How is the data accessed?**
  - Is access occurring on the same server?
  - Are remote access capabilities required?

### Data Transmission and Connectivity Questions

Questions regarding network connectivity and data transmission methods are essential:

- **What connections are being made?**
- **How is the traffic being transmitted?**
  - Any secure transmission mechanisms involved?
  - Security is needed even for local traffic within organizational infrastructure

### User Access and Authorization Questions

Detailed questions regarding user access, authorization, and privilege must be addressed:

- **User?**
  - How are users accessing the application?
  - What levels of access are required?
  - Any administrative rights required?
  - Is full access to SQL (Structured Query Language) databases needed?
  - Do we allow users to work remotely, and what security controls apply to remote access?

## Requirements Gathering and Analysis Phase Outcomes

### Prioritization and Documentation

These security requirements are prioritized and documented for subsequent phases of the SDLC. Documentation ensures that security considerations are systematically addressed throughout design, development, and testing.

### Requirements Mapping Process

The requirements gathering and analysis phase involves mapping security and privacy requirements from various sources to produce prioritized outputs.

**Key Inputs to the Requirements Phase:**

- **Organizational requirements**: Internal policies and standards
- **Privacy requirements**: Privacy protection obligations and expectations
- **Statutory requirements**: Legal and regulatory compliance mandates
- **Industry requirements**: Industry-specific standards and best practices

**Mapping Process:**

The mapping process translates these diverse inputs into a unified security and privacy requirements specification.

**Key Deliverables of the Requirements Phase:**

- **Prioritized security & privacy requirements**: Systematically ordered security and privacy requirements reflecting organizational priorities
- **Key security-related design goals**: Fundamental objectives that must be achieved through system design and architecture

---

# Systems Design and Detailed Design Phase

## Major Resilience Processes in Design Phase

Threat modeling and design reviews are the two major resilience processes that you will encounter during the design phase. These processes address security concerns before implementation begins.

## Classification of Vulnerability Types

There are two distinct classes of vulnerabilities that must be addressed through design and implementation discipline:

### Design-Related Vulnerabilities

Design-related vulnerabilities are flaws or weaknesses inherent in the system architecture, design decisions, and structural choices. These vulnerabilities arise from fundamental architectural or design decisions that create security exposures.

### Implementation-Related Vulnerabilities

Implementation-related vulnerabilities are flaws arising from how the design is coded or realized in actual software. These vulnerabilities result from insecure coding practices, inadequate input validation, or improper use of APIs and libraries.

## Security Expert Involvement

Security experts should be involved with the project during the design phase to ensure that no bad design issues creep into the design and architecture of the software or the system. Early involvement of security expertise enables identification and correction of design-level vulnerabilities before they become embedded in the codebase.

---

## Foundational Concepts of Threat Modeling

# Definition and Core Objective

Threat modeling, in its essence, is the systematic attempt to enumerate all potential ways that somebody can attack an application. The process involves identifying, documenting, and analyzing potential attack vectors and vulnerabilities inherent in or introduced by the design and implementation of software systems.

# Key Terminological Concepts

Two important terms are fundamental to understanding threat modeling: **systematically** and **attack**.

## Systematic Process

The term "systematically" emphasizes that threat modeling employs a structured, repeatable process rather than an ad hoc approach. By using a model, organizations establish a repeatable process that allows security practitioners to tackle security in a repeatable and consistent fashion during the whole development life cycle. This systematic approach ensures that security analysis is comprehensive, documented, and can be consistently applied across projects and teams.

## Attack Orientation

The term "attack" reflects a fundamental shift in perspective from functional analysis to adversarial analysis. Rather than focusing exclusively on intended use cases, threat modeling actively examines what can be abused and how systems can be exploited. This approach involves developing abuse cases—scenarios describing how systems might be misused—rather than relying solely on legitimate use cases. This adversarial perspective enables practitioners to identify vulnerabilities that might otherwise remain hidden when analyzing only intended functionality.

# Holistic Approach to Risk Reduction

Threat modeling constitutes a holistic approach to reducing risk and securing applications. This holistic perspective operates at two levels:

## Environmental Perspective

The holistic approach considers the entire environment as a unified system, rather than examining isolated components in isolation. This environmental perspective ensures that security considerations account for interactions between components and the broader system context.

## Application-Level Perspective

Threat modeling examines what the application does comprehensively, not merely the separate components that constitute the application. This ensures that security analysis addresses the integrated system behavior, including emergent properties and behaviors arising from component interactions.

---

# Detailed Threat Modeling in the Software Development Lifecycle

## Definition and Purpose

Detailed threat modeling is an excellent way to determine the technical security posture of an application to be developed or currently under development. Technical security posture refers to the overall state of security implementation, including identified vulnerabilities, security controls, and risk management status.

## Position in the SDLC

Detailed threat modeling occupies a critical position within the design phase of the software development lifecycle. Threat modeling activities occur after initial requirements are established but before detailed implementation commences, enabling security issues to be identified and addressed during the design phase when correction is most cost-effective.

---

# Threat Modeling Approaches and Methodologies

## Distinction Between Approaches and Methodologies

Threat modeling approaches and methodologies serve distinct functions in the security analysis process:

### Approaches

**Approaches** describe how one could start the threat modeling process. Approaches address the fundamental question of where to begin and what initial perspective to adopt when initiating threat modeling activities.

### Methodologies

**Methodologies** describe the process itself—the structured sequence of activities, techniques, and procedures employed throughout the threat modeling engagement. Methodologies provide detailed guidance on executing the threat modeling process from initiation through completion.

## Three Fundamental Modeling Approaches

Three primary threat modeling approaches have been identified, each representing a different entry point and perspective for conducting threat analysis:

### Asset-centric Approach

The asset-centric approach initiates the threat modeling process by focusing on organizational assets—the things that must be protected.

### Attacker-centric Approach

The attacker-centric approach initiates the threat modeling process by focusing on potential attackers and their motivations, capabilities, and attack strategies.

### Application-centric Approach

The application-centric approach initiates the threat modeling process by focusing on the application being designed or developed, its functionality, data flows, and interactions.

## Fundamental Question Addressed by Approach Selection

The choice of threat modeling approach determines the sequence and perspective of analysis. The fundamental question addressed by approach selection is:

**Do you start with enumerating your assets, enumerating potential attacks, or conducting a detailed examination of your application and data flows?**

Each approach provides a different entry point that shapes the subsequent analysis process.

---

# Asset-Centric Approach (Risk-Centric Threat Modeling)

## Foundational Concept

The asset-centric approach, also known as **risk-centric threat modeling**, revolves around assets—the critical resources, systems, and data that organizations want to protect. The approach prioritizes protection of valuable organizational assets as the organizing principle for threat analysis.

## Process Steps

### Step One: Asset Enumeration

The first step in the asset-centric approach is to create a comprehensive list of assets worthy of protection. Assets represent things of value to the organization that require security safeguards.

#### Examples of Assets

Assets can encompass diverse organizational resources:

- **Databases containing email addresses**: Information repositories holding personal data
- **Server systems**: Computing infrastructure and platforms
- **Other organizational resources**: Intellectual property, financial data, operational systems, and other valuable assets

### Step Two: Asset Visualization and Component Mapping

The next step involves drawing the assets along with their components and associated traffic flows. This visualization activity provides insight into:

- Interconnections between assets and components
- The physical or logical locations of various assets
- Data flows and communication patterns between assets
- Component dependencies and relationships

### Step Three: Threat Identification

Subsequently, the analyst examines how an attacker could potentially threaten each identified asset. For each asset, the analysis asks: What can go wrong with this asset? What vulnerabilities exist? What attack vectors could compromise this asset?

### Step Four: Iterative Threat Enumeration

By repeating these steps for all identified assets, a comprehensive list of threats is systematically produced. The iterative nature ensures that all assets receive equivalent analytical attention.

## Advantages of Asset-Centric Approach

The asset-centric approach provides several significant advantages:

### Asset-Centered Focus

The approach maintains a clear focus on assets and the organization's most valuable resources. This focus ensures that threat analysis directly addresses organizational priorities and valuable resources.

### Business-Focused Orientation

The asset-centric approach emphasizes business-relevant concerns and organizational assets. This business focus facilitates communication with executive stakeholders and business leaders.

### Risk Assessment Structure

The approach is well-structured for comprehensive risk assessment. The systematic enumeration of assets, their vulnerabilities, and potential threats provides a structured framework for risk evaluation.

**Auditor Appreciation**: Auditors typically favor this approach because it aligns with risk management frameworks and provides structured documentation of assets, threats, and risk mitigation measures.

## Disadvantages of Asset-Centric Approach

The asset-centric approach presents several significant limitations:

### Application Development Disconnect

The approach is not centered around the application itself or around improving the application. This creates a disconnect with software developers, who understand and work with applications more readily than abstract asset lists.

### Translation and Mapping Complexity

Starting with a list of assets that must be translated to components and traffic flows, and then mapped back to security implications, can be time-consuming and contrived. The indirect path from assets to application elements introduces complexity.

### Threat-to-Asset Mapping Difficulty

Mapping threats to specific assets might be difficult and time-consuming. Assets do not correlate one-to-one with threats; a single threat may affect multiple assets, and a single asset may face multiple, diverse threats. This many-to-many relationship complicates the mapping process.

## Methodology Examples

Threat modeling methodologies that employ the asset-centric approach include:

- **PASTA** (Process for Attack Simulation and Threat Analysis)
- **TRIKE** (Threat modeling framework)

---

# Attacker-Centric Approach

## Foundational Concept

The attacker-centric approach instructs practitioners to think like an attacker and find holes in the system. This approach revolves around human threats and attacker motivations, capabilities, and strategies.

## Practitioner Preference

The attacker-centric approach is strongly preferred by penetration testers and security professionals with offensive security backgrounds. This preference reflects the natural alignment between the approach and penetration testing methodology.

## Characterization as Biased Approach

The attacker-centric approach is characterized as the most biased threat modeling approach. Results from this approach depend significantly on the person involved in conducting the analysis. Different analysts with different experiences, backgrounds, and knowledge will identify different threat scenarios.

## Advantages of Attacker-Centric Approach

The attacker-centric approach offers specific advantages in certain contexts:

### Threat Visibility

The approach makes threats, risks, and attacks more visible and comprehensible. By framing analysis in terms of attacker actions and motivations, threats become concrete and tangible rather than abstract.

### Engaging Analysis Process

The movie-like brainstorming process associated with thinking like an attacker is very entertaining and engaging. This engaging nature can facilitate team participation and creative thinking during threat modeling sessions.

## Disadvantages of Attacker-Centric Approach

The attacker-centric approach presents several significant limitations:

### Technical Threat Omission

There is a risk that more technical threats not directly related to human actions may be missed. Technical vulnerabilities arising from architectural decisions or implementation flaws might receive insufficient attention in an attacker-centric analysis that focuses on human-centric attack vectors.

### Realism Concerns

Questions arise regarding the realism of the resulting threats identified. Analysis may focus on dramatic attack scenarios while overlooking common, mundane attack vectors. The resulting threat list may be skewed toward spectacular or novel attacks rather than actually-observed threat patterns.

### Biased Results

Results are inherently biased by the perspectives, knowledge, and experiences of the person or team conducting the analysis. If the process is repeated with different analysts, one can expect different results. This inconsistency undermines the reliability and comprehensiveness of the threat modeling process.

### Required Expertise

Effective attacker-centric threat modeling requires specialized expertise in attacker psychology, tactics, techniques, and procedures. Conducting this approach effectively requires individuals with penetration testing experience and attacker mindset—skills that may be absent from development teams.

---

# Application-Centric Approach

## Foundational Concept

The application-centric approach initiates threat modeling by visualizing the application that is being designed or built, rather than beginning with abstract considerations of risks or potential attacks. The approach shifts the focus to what practitioners are actually working on—the application itself.

## Visualization Process

By drawing the application, its processes, the entities that interact with it, data flows, data stores, and the different actors (users, external systems), analysts develop intimate familiarity with the application. This detailed visualization establishes a common reference point for all participants.

## Advantages of Application-Centric Approach

The application-centric approach offers several significant advantages:

### Common Understanding Development

By starting with the application that everybody is working on, the approach ensures that all team members—developers, architects, security analysts, testers—develop thorough understanding of the application. This shared understanding facilitates communication and enables participants to identify context-specific threats.

### Knowledge Dissemination

The application-centric approach promotes spreading of knowledge about the system across team members. Participants gain exposure to different aspects of the application and understand how their work integrates with other components.

## Disadvantages of Application-Centric Approach

The application-centric approach presents several significant limitations:

### Documentation Requirements

The approach requires good documentation and a clear overview of the application. Without comprehensive and current documentation, participants cannot develop the detailed application understanding necessary for effective threat analysis. Poor documentation undermines this approach.

### Threat Recognition Difficulty

It is difficult for people to see threats through their own application and software. Developers and technical staff find it challenging to identify vulnerabilities in systems they have designed or built. This psychological barrier—the difficulty in viewing one's own work critically—can result in missed threats.

### Abstract Threat Articulation

Looking solely at the application without broader context can make threats sound abstract, which might lead to missed threats. Without explicit consideration of external threat agents and motivations, some realistic threats may not be clearly articulated or recognized.

## Developer Preference

Developers strongly favor the application-centric approach because it aligns with their perspective and work experience. Developers understand applications better than abstract asset lists or attacker personas, making this approach more natural and comfortable for technical staff.

---

# Detailed Threat Modeling—Step-by-Step Process

## Overview of Core Steps

Detailed threat modeling follows a structured, sequential process with clearly defined steps that guide the analyst from application analysis through mitigation planning.

## Primary Steps in Threat Modeling

The threat modeling process comprises the following key steps:

### Step One: Application Diagram Creation

**Step**: Draw a diagram of the application (for example, a data flow diagram)

This initial step creates a visual representation of the application's architecture, components, and data flows. The diagram serves as the foundation for all subsequent analysis.

### Step Two: Threat Enumeration

**Step**: List threats for all elements (STRIDE—OWASP Top 10)

This step systematically identifies potential threats affecting each component and data flow identified in the application diagram. Threat enumeration employs established threat categorization frameworks.

### Step Three: Threat Ranking

**Step**: Rank threats

This step prioritizes identified threats based on severity, likelihood, and impact, enabling focus on the most significant security risks.

### Step Four: Mitigation Planning

**Step**: Mitigation

This step develops specific, actionable strategies and controls to address identified threats.

## Detailed Process Steps

A more granular view of the threat modeling process identifies five key steps:

### Step One: Assemble the Resources

Gather all necessary resources for understanding the target system.

### Step Two: Functional Decomposition

Decompose system functionality to understand component structure and data flows.

### Step Three: Categorizing Threats

Categorize identified threats using established frameworks such as STRIDE.

### Step Four: Ranking Threats

Rank threats using established prioritization frameworks such as DREAD.

### Step Five: Mitigation Planning

Develop specific mitigation strategies for identified threats.

---

# Assembling the Resources

## Purpose and Importance

The first step in the threat modeling process is to assemble all resources necessary to understand the target system. Comprehensive resource assembly provides the foundation for effective threat analysis.

## Required Resources

Resources necessary for effective threat modeling include:

### Documentation

Complete and current documentation describing the system architecture, design decisions, operational requirements, and deployment configuration. Documentation provides essential context for threat analysis.

### Experts

Subject matter experts possessing deep knowledge of the system, including:

- System architects and designers
- Development team members
- Operations and infrastructure specialists
- Security professionals with domain knowledge

Experts provide context, clarification, and domain-specific insights during threat analysis.

### Source Code

The actual source code for all relevant software modules. Access to source code enables detailed analysis of implementation decisions and potential vulnerabilities.

## Strategic Approach to Resource Assembly

### Upfront Investment in Knowledge Acquisition

It is always a good idea to invest a significant amount of time up-front on knowledge acquisition activities. This initial investment—reviewing documentation, interviewing experts, studying source code—often saves considerable time downstream. Well-informed analysts can more quickly identify significant threats and avoid analysis dead-ends.

### Discovery of Missing Resources

The fact of the matter is that one cannot know what resources are needed until the threat modeling process is well under way. Initial analysis frequently reveals gaps in knowledge or missing documentation. These discoveries occur during active threat analysis rather than during advance planning.

### Process Postponement Due to Missing Resources

Frequently, the threat modeling process is postponed when it is discovered that needed answers or resources are not present. Missing critical information—whether documentation, expert availability, or source code access—can stall analysis. Organizations must plan for such resource gaps and establish procedures for obtaining missing information.

---

# Functional Decomposition

## Definition and Methodology

**Functional decomposition** is the process of breaking down a system into its functional components and understanding how data flows through these components. Functional decomposition is typically performed using **data flow diagrams (DFD)**.

## Primary Objective

The key aspect of functional decomposition is to understand the boundaries of untrusted and trusted components. This understanding enables better comprehension of the attack surface of an application—the set of all possible entry points and pathways through which an attacker could potentially compromise the system.

## What Data Flow Diagrams Do NOT Represent

Understanding the limitations of data flow diagrams is essential to proper interpretation:

### Algorithm Representation

The algorithm is not represented in a DFD. In other words, the DFD does not describe **how** the program works. Rather, the DFD describes **how data flows through** the system. Internal computational logic and algorithmic processes are abstracted away.

### Complete Function Enumeration

All functions are not listed in a DFD. This is because not all functions communicate with data from the outside world. Internal functions that operate solely on data already within the system may not appear in the DFD if they do not represent entry points or components of security significance.

### Data Representation Details

Details of the data representation are not described in a DFD. The DFD describes the state of data as it flows through the system (indicated by the labels near the arrows), but does not describe the exact format or binary representation of the data itself.

### Data Storage Location

The location of where data is stored is represented in a DFD. Specifically, any user data or any system assets are represented in a DFD to show where critical data resides.

---

# Data Flow Diagram Components

Data flow diagrams employ specific visual elements to represent different aspects of system architecture and data movement.

---

# Interactors

## Definition

**Interactors** are agents existing outside the system boundary. Interactors represent the external entities that interact with the system.

## Role and Function

Interactors provide input to the system and consume output from the system. They serve as the interface between the external environment and the internal system.

## Types of Interactors

### Users as Interactors

Users are common interactors, serving dual roles: they both consume output from the system and generate input to the system. Users represent the human interface to the application.

### Network Interactors

Network interactors represent external systems or services communicating with the application over network connections. Network interactors can consume output, generate input, or perform both functions.

### Program-to-Program Interactors

When two programs interact through application programming interfaces (APIs), message passing, or file interfaces, they serve as interactors to each other. Each program is external to the other and represents a distinct system boundary.

---

# Flow

## Definition

**Flow** represents the movement of data from one location to another. Data flows originate from and terminate at an interactor, a processing node, or a data store.

## Data Type Labeling

Data flows are labeled with descriptive information indicating the type or nature of data being transmitted:

### Textual Data Example

When a textual password is being sent from one location to another, the flow is labeled "Password" to indicate that plaintext password data is in transit.

### Binary Data Example

When binary data is sent between locations, the data type is labeled with the appropriate data type designation. For example, when a boolean value is transmitted, the flow is labeled "bool."

## Data Type or Instance Representation

Either pass the data type (such as bool, int, string) or a variable representing an instance of the data type. This labeling enables understanding of what type of data is flowing through each pathway in the system.

---

# Processors

## Definition

A **DFD processor** is a location in a program where data is transformed or where checks are performed. Processors represent the functional units that operate on data.

## Processor Function

Processors perform active operations on data:

- **Data Transformation**: Converting data from one format, structure, or representation to another
- **Check Operations**: Performing validation, verification, or security checks on data

## Data Flow Initiation

Often data flows are initiated by a process. Processes can read data from storage or from interactors and initiate flows to downstream components. The "Read" operation represents the initiation of data flows by a processor.

---

# Storage

## Definition

**Storage** represents data at rest. Storage elements in DFDs indicate locations where data persists between processing operations.

## Critical Security Consideration

It is important to realize that although we may think data may be accessible only through a small number of known interfaces, it can often be accessed through unexpected means. Data storage locations may have multiple access pathways, some of which are not formally documented or intended. These unexpected access pathways represent potential vulnerabilities.

## Examples of Storage

Storage in DFDs includes:

- Database repositories
- File storage systems
- Caches and temporary storage
- Any location where data persists

---

# Trust Boundaries

## Definition

**Trust boundaries** represent areas of differing levels of security or trust. Trust boundaries delineate regions where different security policies, access controls, or privilege levels apply.

## Purpose

Trust boundaries help analysts understand where the level of trust changes within a system. Crossing a trust boundary represents moving from one security context to another.

## Trust Boundary Introduction—Control Mechanisms

Often a trust boundary is included if part of the program has been controlled by an authentication or access control mechanism. Control mechanisms that enforce trust boundaries include:

### Authentication Control Example

A part of the user interface verifying passwords would introduce a trust boundary. The password verification mechanism enforces a boundary between unauthenticated and authenticated contexts.

### Access Control Example

Access control mechanisms that restrict which users can access which resources establish trust boundaries between different privilege levels or authorization contexts.

## Visual Representation

Trust boundaries are typically represented in DFDs using dashed boundary lines that enclose the components within the trusted region. The boundary line visually separates trusted from untrusted areas.

---

# Data Flow Diagram Example Analysis

The slides present a data flow diagram representing a simple program with one class (a password class). This example illustrates:

## Interactor Identification

The diagram identifies a **User** as an external interactor providing input (commands) and receiving output (yes/no responses).

## Processing Elements

The diagram shows:

- **UI processor**: Handling user commands and responses
- **set processor**: Storing password data (with transformation to hashed form)
- **get processor**: Retrieving password data and performing verification

## Data Flow Paths

Data flows are identified:

- "commands" flowing from User to UI
- "plaintext password" flowing from UI to set processor
- "Hashed data" flowing from set processor to password class storage
- "bool" (verification result) flowing from get processor back to UI
- "yes/no" response flowing from UI back to User

## Storage Component

The diagram identifies the **Password class** as the storage component containing hashed password data.

## Trust Boundary

A trust boundary (dashed box) encompasses the Password class and related processors, indicating that these components operate within a trusted region protected by authentication mechanisms.

---

# Introduction to STRIDE Threat Categorization

## Importance of Threat Classification

Understanding the different types of threat agents and their potential impacts on an organization is a very important activity. Systematic threat categorization enables security professionals to comprehensively identify and analyze security risks.

## STRIDE Taxonomy Development

The S.T.R.I.D.E. taxonomy was developed in 2002 by Microsoft Corporation. The taxonomy was developed to:

- Enable software engineers to more accurately categorize threats
- Enable software engineers to more systematically identify defects in code they are evaluating

## Relationship to the CIA Model

The S.T.R.I.D.E. model is an elaboration of the more familiar Confidentiality, Integrity, Availability (CIA) model. While the CIA model provides a high-level framework for information security, STRIDE facilitates more accurate identification of security assets and specific vulnerability types through greater granularity and detail.

## Components of STRIDE Taxonomy

The S.T.R.I.D.E. taxonomy comprises six distinct threat components:

- **Spoofing**
- **Tampering**
- **Repudiation**
- **Information Disclosure**
- **Denial of Service**
- **Elevation of Privilege**

## Detailed Taxonomy Benefits

When a software engineer is analyzing a given system for vulnerabilities, it is often helpful to use a more detailed taxonomy than the CIA framework. To this end, the S.T.R.I.D.E. system was developed to provide systematic categorization of specific threat types and vulnerability categories.

---

# Spoofing—First Component of STRIDE

## Definition of Spoofing

**Spoofing identity** is pretending to be someone other than who you really are. Spoofing involves impersonating another entity—typically through misrepresentation of identity or credentials—to gain unauthorized access to resources or data.

## Common Spoofing Attack Method

A common spoofing method involves getting access to someone else's passwords and then using them to access data as if the attacker were that person. By obtaining legitimate credentials, the attacker can impersonate the legitimate user.

## Sequential Nature of Spoofing Attacks

Spoofing attacks frequently lead to other types of attacks. Initial spoofing that establishes a foothold in a system can serve as the foundation for subsequent more serious attacks.

## Examples of Spoofing Attacks

### IP Address Masking

Masking a real IP address so another IP address can gain access to something that otherwise would have been restricted. By spoofing the IP address, an attacker can bypass IP-based access controls.

### Login Screen Mimicry

Writing a program to mimic a login screen for the purpose of capturing authentication information. This social engineering attack presents a fake login interface to users, capturing their credentials when they attempt to authenticate.

## Real-World Spoofing Examples

Real-world spoofing attacks include:

- **Phishing pages**: Fraudulent websites designed to mimic legitimate services and capture user credentials
- **Phishing SMS**: Text message-based attacks attempting to deceive users into revealing sensitive information
- **Microsoft Tech Support Scam**: Social engineering attacks impersonating Microsoft support personnel to gain access to user systems

---

# Tampering—Second Component of STRIDE

## Definition of Tampering

**Tampering** involves changing data in some way. Tampering attacks modify data without authorization, either destroying data or modifying legitimate data to serve attacker purposes.

## Types of Tampering

Tampering can involve:

- **Deleting critical data**: Complete removal of essential system or user data
- **Modifying legitimate data**: Alteration of existing data to serve attacker objectives

## Examples of Tampering Attacks

### Network Transmission Interception and Modification

Someone intercepting a transmission over a network and modifying the content before sending it on to the recipient. This man-in-the-middle attack alters legitimate data in transit.

### Program Logic Modification via Malware

Using malware to modify the program logic of a host so malicious code is executed every time the host program is loaded. This persistent tampering ensures that the attack continues across multiple program executions.

### Unauthorized Webpage Modification

Modifying the contents of a webpage without authorization. Attackers gain control of web content to spread malware, steal credentials, or conduct fraud.

---

# Repudiation—Third Component of STRIDE

## Definition of Repudiation

**Repudiation** is the process of denying or disavowing an action. Repudiation attacks involve hiding one's tracks—removing or falsifying evidence of actions taken.

## Concealment of Attack Evidence

The final stages of an attack sometimes include modifying logs to hide the fact that the attacker accessed the system at all. By eliminating audit trails, attackers deny responsibility for their actions and avoid detection.

## Repudiation as Special Tampering Category

Note that repudiation is a special type of tampering attack. Repudiation involves tampering with audit and logging systems to remove evidence of unauthorized actions.

## Examples of Repudiation Attacks

### Log File Modification

Changing log files so actions cannot be traced. By altering audit logs, attackers remove evidence of their unauthorized access and activities.

### Denial of Transaction Receipt

A user who purchases an item might have to sign for the item upon receipt. The vendor can then use the signed receipt as evidence that the user did receive the package. This would allow the card owner not to deny the purchase and prevent obtaining a refund.

In the absence of such evidence, a user could claim they never received the package and demand a refund, denying responsibility for the purchase even though they actually received and retain the item.

---

# Information Disclosure—Fourth Component of STRIDE

## Definition of Information Disclosure

**Information disclosure** occurs when a user's confidential data is exposed to individuals against the wishes of the owner of the information. Information disclosure violates the confidentiality principle, exposing private data without authorization.

## Media Attention and Visibility

Often times, these attacks receive a great deal of media attention, bringing visibility to the breached organization and public awareness of the security failure.

## Causes of Information Disclosure

These disclosures have been the results of both malicious attacks and human factors. Not all information disclosure results from deliberate hacking; some arises from carelessness, misconfiguration, or inadvertent exposure.

## Examples of Information Disclosure Attacks

### Ashley Madison Data Breach

The Ashley Madison data breach leaked more than 25 gigabytes of company data, including user details. This major information disclosure incident exposed sensitive personal information of millions of users.

### Unauthorized Information Sharing from Co-workers

Getting information from co-workers that is not supposed to be shared. Social engineering or internal threats lead to unauthorized disclosure of confidential information.

### Plaintext Network Eavesdropping

Someone watching a network and viewing confidential information transmitted in plaintext. Network-based attacks that capture unencrypted data in transit enable attackers to access sensitive information.

---

# Denial of Service—Fifth Component of STRIDE

## Definition of Denial of Service

**Denial of Service (DoS)** is another common type of attack involving making service unavailable to legitimate users. DoS attacks degrade or eliminate system availability.

## Attack Scope and Diversity

DoS attacks can target a wide variety of services, including:

- **Computational resources (via DDoS)**: Distributed Denial of Service attacks that overwhelm system processing capacity
- **Data (via ransomware)**: Attacks that encrypt or destroy data, making it inaccessible
- **Communication channels (via Zone Poisoning)**: DNS-based attacks that corrupt routing information
- **User attention (SPAM)**: Flooding users with unwanted communications to prevent legitimate use

## Prevalence of DoS Attacks

Many organizations, including national governments, have been victims of denial of service attacks. DoS attacks represent a widespread threat affecting organizations of all types and sizes.

## Examples of Denial of Service Attacks

### Türk Telekom and Garanti BBVA Cyberattack

Türk Telekom and Garanti BBVA, one of the country's largest private banks, reported they came under a cyberattack on 27th October 2019. This high-profile DoS attack targeted critical telecommunications and financial infrastructure.

---

# Elevation of Privilege—Sixth Component of STRIDE

## Definition of Elevation of Privilege

**Elevation of privilege** occurs when a non-privileged user gains privileged access and thereby acquires sufficient access to compromise or destroy the entire system. Elevation of privilege represents a critical vulnerability enabling system takeover.

## System Defense Penetration

Elevation-of-privilege threats include those in which an attacker has effectively penetrated all system defenses and become part of the trusted system itself. Once privileged access is obtained, the attacker operates with the authority of the compromised privileged account.

## Cascading Attack Potential

Elevation of privilege can lead to almost any other type of attack and involves finding a way to do things that are normally prohibited. Once administrative or privileged access is obtained, the attacker can conduct virtually any attack against the system.

## Examples of Elevation of Privilege Attacks

### Buffer Overrun Attack

A buffer overrun attack allows an unprivileged application to execute arbitrary code, granting much greater access than was intended. By exploiting memory management vulnerabilities, attackers escape the sandbox restrictions of unprivileged applications.

### User Account Privilege Escalation

A user with limited privileges modifies her account to add more privileges, thereby allowing her to use an application that requires those privileges. By exploiting access control vulnerabilities, unprivileged users grant themselves additional capabilities.

---

# Attack Chaining and Threat Trees

## Multi-Stage Attack Nature

In most cases, a single attack can yield other attacks. Attackers frequently chain multiple attack vectors together, using initial compromise to enable subsequent, more serious attacks.

## Elevation to Repudiation Chain Example

For example, an attacker able to elevate his privilege to an administrator can normally go on to delete the logs associated with the attack. In this scenario, an elevation of privilege attack can also lead to a repudiation attack. The attacker first gains administrative access, then uses that access to cover their tracks by removing audit logs.

## Attack (Threat) Trees

**Attack (threat) trees** are graphical representations of the sequential steps and dependencies in multi-stage attack scenarios. Threat trees provide systematic analysis of how attackers progress from initial access to final objectives.

## Value of Threat Trees

There are many reasons why threat trees are important and useful tools:

### Root Attack Identification

Threat trees enable analysts to easily see the root attack that is the source of the problem. By identifying the initial vulnerability or attack vector, security professionals can prioritize remediation efforts.

### Cascading Attack Visualization

Threat trees enable analysts to see all the attacks that are likely to follow if the root attack is successful. Understanding the attack progression helps identify critical intervention points.

### Attacker Pathway Understanding

Threat trees give us a good idea of the path the attacker will follow to get to the high value assets. By understanding the attacker's progression, defenders can focus protection on critical pathways.

## Complexity of Threat Trees

Threat trees can involve several stages and be quite involved.

### E-Commerce Breach Example

For example, an attacker notices that unintended information is made available on an e-commerce site. The attack progression follows these stages:

**Stage One—Information Disclosure:**
From this disclosure, the attacker is able to impersonate a normal customer. Initial access is gained through information disclosure vulnerability.

**Stage Two—Spoofing:**
The attacker impersonates a legitimate customer with minimal privileges.

**Stage Three—Privilege Escalation:**
With this minimal amount of privilege, the attacker pokes around and finds a way to change the user's role to administrator. Initial access facilitates discovery of elevation of privilege vulnerability.

**Stage Four—Full Compromise:**
Once in this state (with administrative privileges), the attacker can:

- **Tampering/Repudiation**: Wipe the logs to hide evidence of the attack
- **Account Hijacking**: Create a new account for himself so he can re-enter the system at will
- **Information Disclosure**: Sell confidential information to the highest bidder
- **Denial of Service**: Shut down the site at will

### Threat Tree Remediation

Defense strategies must attempt to address every step of the threat tree. If any single step in the attack chain can be prevented, the entire attack sequence can be halted. Security professionals should identify and prioritize mitigation of critical steps in threat chains.

---

# Introduction to Threat Ranking

## Importance of Threat Ranking

Ranking potential threats for a software system requires a fair amount of subjective judgment. The threat ranking process is fundamentally important to effective security resource allocation.

## Challenge of Infinite Threat Scenarios

Within any given system, an infinite number of threats exist. Some of these threats correspond to real vulnerabilities present in the system, while others do not represent genuine security risks. This distinction necessitates a systematic approach to threat prioritization.

## Variable Impact Assessment

The level of damage caused by a successful exploit can vary significantly depending on various factors affecting system integrity, data confidentiality, and operational availability. Different threats pose different magnitudes of risk.

## Resource Prioritization Rationale

It is important to focus resources on significant threats rather than wasting time on those of little security value. The process of ranking threats enables organizations to allocate limited security resources to the highest-impact security risks.

## D.R.E.A.D. Model Framework

The D.R.E.A.D. model can be used to make threat ranking judgments in a systematic and organized manner. D.R.E.A.D. comprises five assessment criteria: Damage potential, Reproducibility, Exploitability, Affected users, and Discoverability.

---

# Overview of the D.R.E.A.D. Model

## Development and Purpose

The D.R.E.A.D. model was developed by Microsoft to accomplish threat ranking in a well-organized fashion. The model provides a structured methodology for evaluating and prioritizing security threats.

## Assessment Methodology

A risk rating is arrived at by systematically asking the following questions for each identified threat:

- **Damage potential**: How great is the damage if the vulnerability is exploited?
- **Reproducibility**: How easy is it to reproduce the attack?
- **Exploitability**: How easy is it to launch an attack?
- **Affected users**: As a rough percentage, how many users are affected?
- **Discoverability**: How easy is it to find the vulnerability?

---

# Damage Potential Component

## Definition and Purpose

The damage potential component describes the severity of consequences if an attack succeeds. In other words, damage potential represents the worst case scenario resulting from successful exploitation.

## Assessment Scale

This component of threats is rated on the worst case scenario, with numerical values ranging from 0 to 10:

| Score  | Assessment Level    | Description                                             |
| :----: | :------------------ | :------------------------------------------------------ |
| **10** | Maximum Damage      | Asset completely destroyed or compromised.              |
| **8**  | Significant Access  | Little access to asset but possibly recoverable.        |
| **6**  | Moderate Disruption | Significant disruption or asset not playing a key role. |
| **4**  | User Inconvenience  | Inconvenience to the user.                              |
| **2**  | Minor Annoyance     | Slight annoyance or unimportant asset.                  |
| **0**  | No Impact           | No damage whatsoever.                                   |

---

# Reproducibility Component

## Definition and Distinction

Reproducibility is the probability that an attacker can successfully carry out a known exploit. Reproducibility specifically measures the consistency and predictability of attack success.

## Differentiation from Related Concepts

Reproducibility must be distinguished from related but distinct threat assessment concepts:

- **Reproducibility** is not the chance that the attacker can learn of the exploit (this is discoverability)
- **Reproducibility** is not the amount of effort required to conduct the attack (this is exploitability)
- **Reproducibility** is specifically the chance that the attack will succeed or happen again once discovered

## Assessment Scale

This component is rated on the ability of an attacker to predictably exploit a vulnerability:

| Score  | Difficulty Level        | Description                                                               |
| :----: | :---------------------- | :------------------------------------------------------------------------ |
| **10** | Trivial Reproducibility | Just a web browser and address bar is sufficient, without authentication. |
| **5**  | Moderate Difficulty     | One or two steps required; may need to be an authorized user.             |
| **0**  | Very Difficult          | Very hard or impossible, even for administrators of the application.      |

## Contextual Example

If, for example, a given wireless network is only vulnerable during a solar storm which occurs every decade, the reproducibility risk will be quite low. The infrequency of the vulnerability condition results in low reproducibility scoring.

---

# Exploitability Component

## Definition

The exploitability component of D.R.E.A.D. refers to how much effort is required to successfully complete an attack. Exploitability measures the practical difficulty and resource requirements for attacking a system.

## Assessment Scale

Exploitability is rated on a scale of 0 to 10:

| Score  | Effort Level            | Description                                                                          |
| :----: | :---------------------- | :----------------------------------------------------------------------------------- |
| **10** | No Effort               | Absolutely no effort is required.                                                    |
| **8**  | Readily Available Tools | Access to some readily-available tools.                                              |
| **6**  | Specialized Expertise   | Skilled cracker or inside information.                                               |
| **4**  | Organized Effort        | A concerted effort by a large corporation can succeed.                               |
| **2**  | Extreme Difficulty      | Requires a breakthrough in technology and/or a large number of computers.            |
| **0**  | Prohibitive Cost        | Takes a large number of supercomputers years to achieve costing billions of dollars. |

---

# Affected Users Component

## Definition and Nature

The affected users component of D.R.E.A.D. is purely a business category. It measures the scope of the user population exposed to a particular vulnerability.

## Computational Requirement

This component can only be computed if it is known what percentage of the likely user base will have their system configured in such a way as to expose the vulnerability. The assessment requires understanding of user environment configurations.

## Context-Dependent Priority

The same absolute number of affected users may yield vastly different priorities depending on the overall user base. If 10 people out of 5 million users are vulnerable to a given attack, the affected users value is low, and the threat priority is correspondingly reduced. However, if 10 out of 20 users are vulnerable, this represents a much higher percentage and becomes a much higher priority threat.

## Assessment Scale

Affected users is rated on a scale of 0 to 10:

| Score  | Exposure Level     | Description              |
| :----: | :----------------- | :----------------------- |
| **10** | Universal Exposure | All users.               |
| **5**  | Partial User Base  | Some users, but not all. |
| **0**  | No Affected Users  | None.                    |

---

# Discoverability Component

## Definition

The discoverability component of D.R.E.A.D. refers to the likelihood that an attacker will be able to discover that a given vulnerability exists on a system. Discoverability measures the ease with which attackers can identify and locate vulnerable systems.

## Assessment Scale

Discoverability is rated on a scale of 0 to 10:

| Score  | Difficulty Level    | Description                                                                                               |
| :----: | :------------------ | :-------------------------------------------------------------------------------------------------------- |
| **10** | Immediately Visible | The information is visible in the Web browser address bar or in form.                                     |
| **9**  | Public Knowledge    | Such details of faults are already in the public domain and can be easily discovered using search engine. |
| **5**  | Moderate Difficulty | Can figure it out by guessing or monitoring network traces.                                               |
| **0**  | Extremely Difficult | Very hard to impossible; requires source code or administrative access.                                   |

## Bad Scale—Avoiding Absolute Language

The slides emphasize a critical caveat: "Never say never" when assessing discoverability. The following table demonstrates improper discoverability assessment that should be avoided:

| Score  | Improper Assessment                                                                         |
| :----: | :------------------------------------------------------------------------------------------ |
| **10** | "The key is in the lock" or the threat is obvious to everyone.                              |
| **8**  | Most attackers will come up with the attack in a short amount of time.                      |
| **6**  | Thought it is not obvious, it can be found with some thought or reasoning.                  |
| **4**  | Extremely subtle or requires a large amount of creative thinking.                           |
| **2**  | A breakthrough in thinking is required, or access to highly confidential insider knowledge. |
| **0**  | "There is no way" to discover this vulnerability.                                           |

These assessments should be avoided because they employ vague qualitative language, absolute statements, or subjective terminology lacking measurable criteria. Proper discoverability assessment must use concrete, observable criteria rather than abstract or absolute language.

---

# Practical Application—Threat Assessment Example

## Example Scenario

The following example demonstrates how a driver designer might assess a hypothetical denial-of-service attack on a disk drive system. This practical application illustrates the complete D.R.E.A.D. assessment methodology.

## Assessment Table

The example provides a structured assessment across all five D.R.E.A.D. criteria:

| DREAD Criterion      |  Score  | Comments                                                                |
| :------------------- | :-----: | :---------------------------------------------------------------------- |
| **Damage Potential** |    8    | Disrupts work temporarily, but causes no permanent damage or data loss. |
| **Reproducibility**  |   10    | Causes the device to fail every time.                                   |
| **Exploitability**   |    7    | Requires a focused effort to determine the command sequence.            |
| **Affected Users**   |   10    | Affects every model of this device on the market.                       |
| **Discoverability**  |   10    | Assumes that every potential threat will be discovered.                 |
| **Total**            | **9.0** | **Mitigating this problem is high priority.**                           |

## Risk Rating Calculation

To calculate the overall risk rating for a threat, follow these steps:

1. **Assign scores**: Rate each threat from 1 to 10 on all 5 D.R.E.A.D. assessment criteria
2. **Sum the scores**: Add all five scores together (8 + 10 + 7 + 10 + 10 = 45)
3. **Calculate average**: Divide the total by 5 (the number of criteria) → 45 ÷ 5 = 9.0
4. **Interpret result**: The result is a numeric score between 1 and 10 for each threat

## Score Interpretation

**High scores indicate serious threats.**

In the example provided, the calculated score of 9.0 represents a critical threat requiring immediate remediation efforts. The threshold for priority classification is: **Mitigating this problem is high priority.**

## Customization of D.R.E.A.D.

The D.R.E.A.D. model can be customized for specific organizational contexts and risk tolerances. Organizations may add new definitions or modifications of weightage to the criteria, adjusting the model to reflect their particular security priorities, operational constraints, and risk profiles.

---

# Mitigation Planning

## Purpose of Threat Ranking

The purpose of ranking threats is to create an ordered list enabling systematic assessment of vulnerabilities. This prioritization establishes the foundation for effective resource allocation in security remediation.

## Sequential Remediation Approach

Working from the most severe vulnerabilities based on their D.R.E.A.D. scores, security professionals exercise a response plan and re-evaluate the risk. This iterative process ensures that remediation efforts target the highest-impact threats first.

## Risk Reduction Objective

Generally speaking, security teams continue working down the threat list until the overall risk to the system reaches an acceptable level or the organization has exhausted the resources allocated for security. The primary goal is to reduce risk and make the product more secure, not to eliminate all vulnerability.

## Ongoing Nature of Security

The job of threat mitigation is never done because vulnerabilities will always exist. Instead, the objective is progressive risk reduction and continuous security improvement throughout the system lifecycle.

---

# Mitigation Mapping Framework

## Documentation of Mitigation Plans

With a list of ranked threats, security professionals can document a high-level mitigation plan by mapping threats to potential vulnerabilities in the software system. This mapping creates explicit connections between identified threats and appropriate security controls.

## Threat-to-Control Mapping

The following table presents the relationship between STRIDE threat categories and corresponding security control mechanisms:

| STRIDE Threat              | Security Principle | Mitigation Controls                                                                                                           |
| :------------------------- | :----------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| **Spoofing**               | Authentication     | Basic Authentication, Digest authentication, Cookie authentication, Kerberos authentication, Hashes, Digital signature, IPSec |
| **Tampering**              | Integrity          | Digital signature, Message Authentication Code                                                                                |
| **Repudiation**            | Non-Repudiation    | Strong Authentication, Secure logging and auditing                                                                            |
| **Information Disclosure** | Confidentiality    | Encryption                                                                                                                    |
| **Denial of Service**      | Availability       | Filtering, Quotas, High availability design                                                                                   |
| **Elevation of Privilege** | Authorization      | Permissions, Input validation                                                                                                 |

---

# Security Design Reviews

## Iterative Nature of Design Reviews

Security design reviews are typically iterative in nature. They begin with high-level architecture analysis and progressively dive deeper into examination of individual components and modules of the software system.

## Review Tools and Methodologies

Threat modeling and design reviews can leverage three distinct approaches:

- Commercial off-the-shelf tools
- Custom in-house software
- Simple checklists

## Contextual Judgment in Security Reviews

Personnel must use their best judgment based on multiple organizational and environmental factors:

- The environment in which the system operates
- The organizational structure and security governance
- Existing processes and established practices

This context-dependent approach ensures that security review methodologies align with organizational realities and capabilities.

## Design Review Process Flow

The security design review phase operates within the broader software development lifecycle. The design review process generates key inputs for subsequent development and testing phases, producing documented categorization and ranking of threats along with high-level mitigation strategies.

---

# Development (Coding) Phase

## Implementation-Related Vulnerabilities

Activities in the development phase often generate implementation-related vulnerabilities. Code development represents a critical juncture where design decisions are translated into executable software, introducing potential security flaws.

## Key Mitigation Processes

Static analysis and peer review are two key processes to mitigate or minimize implementation-related vulnerabilities. These complementary approaches address different vulnerability detection challenges.

## Static Analysis

### Definition and Purpose

Static analysis involves the use of automated tools to find issues within the source code itself. This approach examines code without executing it, identifying potential vulnerabilities through pattern matching and code analysis.

### Static Analysis Functions

Static analysis tools perform multiple analytical functions:

| Analysis Function                     | Purpose                                                                           |
| :------------------------------------ | :-------------------------------------------------------------------------------- |
| **Bug finding (quality perspective)** | Identifies coding errors and quality defects affecting functionality and security |
| **Style checks**                      | Enforces coding standards and conventions ensuring consistent code quality        |
| **Type checks**                       | Validates type consistency and catches type-related errors                        |
| **Security vulnerability review**     | Specifically identifies known security vulnerability patterns and anti-patterns   |

### Tool Characteristics

Static analysis tools tend to have a high percentage of false positives, meaning they frequently flag code sections that are not actually vulnerable. However, they are very efficient at catching the low-hanging vulnerabilities that plague most application software, including:

- Lack of input validation
- SQL injection vulnerabilities
- Cross-site scripting (XSS) issues
- Other common implementation flaws

---

# Peer Review

## Limitations of Automated Analysis

Static analysis cannot, however, detect all types of vulnerabilities or security policy violations. Automated tools lack the contextual understanding and human judgment necessary to identify complex logic flaws or policy violations specific to the organization's security requirements.

## Peer Review Process Definition

A peer review process is manual code examination conducted by developers other than the code's author. Peer review is far more time-consuming than automated analysis, requiring substantial human effort and expertise.

## Quality and Security Control

Despite its resource intensity, peer review is an excellent control mechanism to ensure the quality and security of the code base. Human reviewers can identify subtle logic errors, security implications, and compliance issues that automated tools cannot detect.

## Peer Review Execution

Developers review each other's code and provide feedback to the owners (original coders) of the different modules so they can make appropriate changes to fix the flaws discovered during the review. This collaborative process ensures shared responsibility for code quality and security.

---

# Testing Phase

## Critical Role of Testing

The test phase is critical for discovering vulnerabilities that were not discovered and fixed earlier in the development lifecycle. Testing represents the last major opportunity to identify security flaws before production deployment.

## Security Test Case Development

The security team uses all the assumptions and business processes captured during earlier phases to create several security test cases. These test cases are specifically designed to exercise security-relevant functionality and identify deviations from security requirements.

## Test Execution

The software is loaded and operated in the test environment and tested against each of the test cases. This controlled environment enables systematic evaluation of security controls and vulnerability identification without affecting production systems.

## Dynamic Analysis Methodology

Dynamic analysis consists of using automated tools to test for security vulnerabilities. Dynamic analysis examines running code, observing behavior and detecting anomalies that indicate security weaknesses.

## Iterative Testing Process

These tests are iterative in nature and result in a list of vulnerabilities that are then ranked for and prioritized. The testing process continues cyclically, with each iteration addressing discovered vulnerabilities and validating remediation efforts.

## Testing Phase Deliverables

The testing phase produces specific security-focused outputs:

| Input                                                                                                    | Process                                  | Output                                                                                                  |
| :------------------------------------------------------------------------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| Inputs from previous phases<br/>• Requirements documentation<br/>• Software deployed in test environment | Security Test Cases<br/>Dynamic analysis | Security test cases document<br/>Prioritized list of Vulnerabilities from automated and manual analysis |

---

# Testing Methods

## Dynamic Application Security Testing (DAST)

**Definition**: Automated black-box testing that simulates external attacks on a running application.

**Characteristics**:

- Operates without access to source code
- Treats the application as a "black box"
- Simulates external attacker behavior

**Detection Capabilities**: Detects issues like XSS, SQL injection, and authentication flaws.

## Fuzz Testing (Fuzzing)

**Definition**: Sends random, malformed, or unexpected inputs to a program to discover crashes or vulnerabilities.

**Effectiveness**: Effective for uncovering memory corruption, buffer overflows, and input validation bugs.

**Methodology**: By providing unexpected or malformed input, fuzzing exposes how the application handles edge cases and invalid data.

## Interactive Application Security Testing (IAST)

**Definition**: Monitors application behavior during normal usage (e.g., functional testing).

**Feedback Mechanism**: Provides real-time feedback by analyzing code, configuration, and data flow while the app runs.

**Advantage**: Integrates security testing with functional testing, identifying vulnerabilities during normal operational scenarios.

## Penetration Testing (Pentesting)

**Definition**: Simulated manual attack on the live application to exploit vulnerabilities.

**Testing Variants**: Can be black-box, white-box, or gray-box depending on the tester's knowledge of the system:

- **Black-box**: No prior knowledge of system architecture or implementation
- **White-box**: Complete access to source code and system design
- **Gray-box**: Limited knowledge of system internals

## Authentication and Session Management Testing

**Scope**: Tests for flaws in login, logout, session timeout, token handling, and access controls.

**Focus Areas**: Specifically evaluates authentication mechanisms and session state management security.

## Business Logic Testing

**Definition**: Focuses on finding security flaws in the application's workflow, such as bypassing intended processes or rules.

**Purpose**: Identifies logical inconsistencies and process violations that bypass intended security controls.

## API Security Testing

**Methodology**: Dynamically tests exposed APIs for issues like broken authentication, insecure data exposure, and injection attacks.

**Scope**: Specifically targets application programming interfaces that serve as external system interfaces.

## Stress Testing

### Resource Exhaustion

**Questions Addressed**:

- How does the system handle excessive CPU, memory, disk, or network usage?
- Can attackers exploit this to crash the system?

**Purpose**: Evaluates system stability under extreme resource conditions.

### Denial of Service (DoS) Risks

**Questions Addressed**:

- Does the system fail gracefully, or does it become unavailable when overloaded?

**Purpose**: Assesses availability and resilience under DoS attack conditions.

### Authentication Throttling

**Questions Addressed**:

- Can brute-force login attempts be rate-limited under stress?

**Purpose**: Verifies that authentication security controls remain effective during high-load conditions.

### Security Logging Failures

**Questions Addressed**:

- Under heavy load, are security logs still written and monitored properly?

**Purpose**: Ensures that security monitoring and audit logging continue functioning when system resources are exhausted.

---

# Deployment Phase Overview

## Position in the SDLC

The deployment phase is the final phase of the Software Development Life Cycle (SDLC). Deployment represents the culmination of all preceding security activities and the transition of the application from controlled development and testing environments to production operations.

## Changes Advisory Board (CAB)

Deployment is a key part of changes advisory board (CAB). A CAB offers the multiple perspectives necessary to ensure good decision making. The CAB provides governance and oversight for deployment decisions, integrating diverse organizational viewpoints.

## Change Management Integration

A CAB is an integral part of defined change management process designed to balance the need for change with the need to minimize inherent risks. The CAB ensures that deployment decisions account for both operational requirements and security considerations.

---

# Deployment Phase Activities

## Final Security Review

During the deployment phase, security subject-matter experts perform a final security review to ensure that the security risks identified during all the previous phases have been fixed or have a mitigation plan in place. This review serves as the final verification that identified vulnerabilities have been adequately addressed before production deployment.

## Application Security Monitoring and Response Planning

The development team coordinates with the release management and production support teams to create an application security monitoring and response plan. This coordination ensures that operational teams possess the capability and procedures necessary to detect and respond to security incidents in production.

## Deployment Phase Deliverables

The deployment phase produces specific security-focused outputs:

| Key Inputs                                                                     | Processes                                                                     | Key Deliverables                                                     |
| :----------------------------------------------------------------------------- | :---------------------------------------------------------------------------- | :------------------------------------------------------------------- |
| • Inputs from previous phases<br/>• Finalized application ready to be deployed | • Final Security Review<br/>• Application Security Monitoring & Response plan | • Security review sign-off<br/>• Security Monitoring & Response plan |

---

# Static Analysis (SAST) Versus Dynamic Analysis (DAST)

## Overview of Analysis Approaches

The differences between Static Application Security Testing (SAST) and Dynamic Application Security Testing (DAST) include where they run in the development cycle and what kinds of vulnerabilities they find. These complementary approaches address different vulnerability detection objectives and operate at different stages of the SDLC.

## Comprehensive SAST versus DAST Comparison

| Characteristic                      | SAST (White Box Security Testing)                          | DAST (Black Box Security Testing)                                |
| :---------------------------------- | :--------------------------------------------------------- | :--------------------------------------------------------------- |
| **Code Access Requirement**         | Requires source code                                       | Does not require source code                                     |
| **Execution Method**                | Analyzes the source code without executing the application | Analyzes by executing the application                            |
| **Perspective**                     | Tested from the inside out (developer approach)            | Tested from the outside in (hacker approach)                     |
| **Timing in SDLC**                  | Finds vulnerabilities earlier in the SDLC                  | Finds vulnerabilities towards the end of the SDLC                |
| **Remediation Cost**                | Less expensive to fix the vulnerabilities                  | More expensive to fix vulnerabilities                            |
| **Runtime Vulnerability Detection** | Cannot discover run-time vulnerabilities                   | Can find run-time and environment related issues                 |
| **Software Coverage**               | Typically supports all kinds of software                   | Typically scans only apps like web applications and web services |

## SAST Characteristics

### Definition

Static Application Security Testing (SAST), also referred to as white box security testing, involves analysis of source code without executing the application. SAST examines code directly to identify potential security flaws.

### Code Access Requirement

SAST requires access to source code. Analysis cannot be performed without direct access to the application's codebase.

### Analysis Perspective

SAST is tested from the inside out, representing a developer approach. Analysts examine the code from the perspective of internal system design and implementation.

### Timing Advantage

SAST finds vulnerabilities earlier in the SDLC, enabling early detection and remediation. Early identification reduces downstream costs.

### Cost Efficiency

Vulnerabilities identified through SAST are less expensive to fix because they are detected before implementation is complete and before dependencies on the vulnerable code have been established.

### Vulnerability Detection Limitations

SAST cannot discover run-time vulnerabilities that only manifest during application execution under specific conditions or with specific data.

### Software Support

SAST typically supports all kinds of software, including compiled applications, interpreted languages, and various frameworks and platforms.

## DAST Characteristics

### Definition

Dynamic Application Security Testing (DAST), also referred to as black box security testing, involves analysis by executing the application. DAST examines running code behavior to identify security flaws.

### Code Access Requirement

DAST does not require source code. Analysis is performed by interacting with the running application without knowledge of or access to internal implementation details.

### Analysis Perspective

DAST is tested from the outside in, representing a hacker approach. Analysts examine the application from an external attacker's perspective, simulating adversarial interaction.

### Timing in Development Lifecycle

DAST finds vulnerabilities towards the end of the SDLC. Testing occurs after application implementation when the application is in a deployable state.

### Remediation Cost

Vulnerabilities identified through DAST are more expensive to fix because they are discovered late in development, potentially after significant dependencies and integrations have been established.

### Runtime Vulnerability Detection

DAST can find run-time and environment related issues. This capability enables detection of vulnerabilities that only emerge during execution under specific operational conditions, configurations, or data states.

### Software Coverage

DAST typically scans only specific application types, particularly web applications and web services. DAST effectiveness varies significantly across different application architectures and technologies.

## Complementary Nature of SAST and DAST

SAST and DAST represent complementary security testing approaches. SAST provides early detection of code-level vulnerabilities through static analysis, while DAST identifies runtime and operational vulnerabilities through dynamic execution. Together, these approaches provide comprehensive vulnerability detection across different phases of the SDLC and different vulnerability categories, enabling organizations to identify and remediate security flaws from multiple analytical perspectives.

---

# Alternative Security Approaches for the SDLC

## Universal Applicability of Security Processes

These security processes are often just "common sense" improvements, and any organization can and should adopt them into its existing environment. Security integration represents practical, widely-applicable principles rather than complex or specialized methodologies.

## Organizational Customization

There is no one right way to implement these processes. Each organization will have to fine-tune and customize them for its specific development and operating environments. Implementation approaches must account for organizational structure, existing processes, technological infrastructure, and development culture.

## Iterative Implementation Models

Although the artifacts are laid out according to something that looks like a waterfall model, most organizations follow an iterative approach today. Phases will be cycled through more than once as the software evolves. This iterative methodology enables continuous security improvement and adaptation as systems mature and threat landscapes change.

---

# Security Touchpoints Ranked by Effectiveness

## Touchpoint Effectiveness Ranking

The following security touchpoints are ranked in order of effectiveness:

| Rank  | Security Touchpoint         |
| :---: | :-------------------------- |
| **1** | Code review                 |
| **2** | Architectural risk analysis |
| **3** | Penetration testing         |
| **4** | Risk-based security tests   |
| **5** | Abuse cases                 |
| **6** | Security requirements       |
| **7** | Security operations         |

## Ranking Context and Limitations

The ordering described reflects a bias developed over many years of applying these practices in code-centric organizations. The ordering will not be a perfect fit for every organization. Organizations must evaluate and prioritize touchpoints based on their specific development methodologies, organizational structure, risk tolerance, and available resources.

---

# Code Review (Tools)

## Artifact Type

**Artifact**: Code

## Risks Identified

**Example of risks found**: Buffer overflow on line 42.

Code review focuses on specific implementation vulnerabilities that can be precisely located and documented in source code.

## Focus and Scope

At the code level, the focus is on implementation bugs, especially those that static analysis tools that scan source code for common vulnerabilities can discover. Code review examines implementation details at the lowest level of abstraction.

## Effectiveness Limitations

Doing code review alone is an extremely useful activity, but given that this kind of review can only identify bugs, the best a code review can uncover is around 50% of the security problems. Code review cannot identify systemic or architectural flaws that emerge at higher levels of abstraction.

## Complementary Vulnerability Types

Security bugs, especially in C and C++, are a real problem. However, architectural flaws are just as big a problem. Code-level bug detection must be complemented by higher-level architectural analysis to achieve comprehensive security coverage.

---

# Architectural Risk Analysis

## Artifact Type

**Artifact**: Design and specification

## Risks Identified

**Examples of risks found**:

- Poor compartmentalization and protection of critical data
- Failure of a Web Service to authenticate calling code and its user and to make access control decisions based on proper context

Architectural analysis identifies system-level vulnerabilities and design flaws that transcend individual components.

## Architectural Coherence Requirement

At the design and architecture level, a system must be coherent and present a unified security front. All system components must work together to enforce consistent security policies and controls.

## Documentation and Analysis Activities

Designers, architects, and analysts should clearly document assumptions and identify possible attacks. Explicit documentation enables systematic threat identification and risk assessment at the architectural level.

## Risk Identification and Mitigation Planning

At this point, security analysts uncover and rank architectural flaws so that mitigation can begin. Early identification of architectural vulnerabilities enables incorporation of security into system design.

## Cost of Neglecting Architectural Analysis

Disregarding risk analysis at this level will lead to costly problems down the road. Architectural flaws discovered late in development or in production are exponentially more expensive to remediate than those identified during design phases.

---

# Penetration Testing

## Artifact Type

**Artifact**: System in its environment

## Risks Identified

**Example of risks found**: Poor handling of program state in Web interface

Penetration testing identifies vulnerabilities in systems operating within realistic production contexts.

## Usefulness and Conditions

Penetration testing is extremely useful, especially if an architectural risk analysis informs the tests. Testing that leverages prior architectural analysis is more targeted and comprehensive than blind penetration testing.

## Environmental Understanding

The advantage of penetration testing is that it gives a good understanding of fielded software in its real environment. Real-world operational contexts introduce complexity and vulnerability vectors not visible in isolated testing environments.

## Test Severity Assessment

Software that fails during the kind of canned black box testing practiced by prefab application security testing tools is truly bad. Failure to pass standard penetration testing indicates fundamental security failures.

## Test Result Interpretation

Thus, passing a low-octane penetration test reveals little about your actual security posture, but failing a canned penetration test indicates that you're in very deep trouble indeed. The severity of failure on standard penetration tests provides more meaningful security assessment than success on limited tests.

---

# Risk-Based Security Testing

## Artifact Type

**Artifact**: Units and system

## Risks Identified

**Example of risks found**: Extent of data leakage possible by leveraging data protection risk

Risk-based testing identifies vulnerabilities through systematic exploration of risk scenarios.

## Security Testing Strategies

Security testing must encompass two strategies:

- **(1) Testing of security functionality** with standard functional testing techniques
- **(2) Risk-based security testing** based on attack patterns, risk analysis results, and abuse cases

These complementary strategies ensure both functional correctness of security controls and robust behavior under adversarial conditions.

## Limitations of Standard Testing

Security problems aren't always apparent, even when you probe a system directly. Standard-issue quality assurance is unlikely to uncover all critical security issues because functional testing does not systematically explore security-relevant scenarios and attack patterns.

---

# Abuse Cases

## Artifact Type

**Artifact**: Requirements and use cases

## Risks Identified

**Example of risks found**: Susceptibility to well-known tampering attack

Abuse case analysis identifies vulnerabilities through attacker-centric scenario modeling.

## Purpose and Value

Building abuse cases is a great way to get into the mind of the attacker. Abuse cases enable requirements and design teams to systematically consider adversarial perspectives.

## Abuse Case Definition

Similar to use cases, abuse cases describe the system's behavior under attack. Building abuse cases requires explicit coverage of:

- What should be protected
- From whom
- And for how long

This explicit scope definition ensures comprehensive consideration of protection requirements across all threat models and time horizons.

---

# Security Requirements

## Artifact Type

**Artifact**: Requirements

## Risks Identified

**Example of risks found**: No explicit description of data protection needs

Insufficient or implicit security requirements represent a foundational vulnerability.

## Explicit Integration of Security

Security must be explicitly worked into the requirements level. Security cannot be an afterthought; it must be a primary concern from requirements definition forward.

## Comprehensive Security Requirements

Good security requirements cover both overt functional security and emergent characteristics:

- **Overt functional security**: Explicit security mechanisms, such as the use of applied cryptography
- **Emergent characteristics**: Properties best captured by abuse cases and attack patterns

Together, these dimensions ensure that security requirements address both deliberate security controls and systemic security properties.

## Complexity of Requirements Engineering

The art of identifying and maintaining security requirements is a complex undertaking that deserves broad treatment. Security requirements engineering demands specialized knowledge, iterative refinement, and continuous alignment with evolving threat landscapes.

---

# Security Operations

## Network and Software Security Integration

Software security can benefit greatly from network security. Integration of software security with operational security disciplines creates comprehensive security posture.

## Operational Team Involvement

Well-integrated security operations allow and encourage network security professionals to get involved in applying the touchpoints. Network security professionals provide experience and security wisdom that might otherwise be missing from the development team.

## Attack-Driven Learning

Attacks do happen, regardless of the strength of design and implementation. Understanding software behavior that leads to successful attack is an essential defensive technique. Real-world attack analysis provides insights into both attacker tactics and system vulnerabilities.

## Knowledge Feedback Loop

Knowledge gained by understanding attacks and exploits should be cycled back into software development. Operational security insights inform future development practices, requirements refinement, and architectural decisions, creating continuous improvement cycles.

---

# Consistency Across Security Approaches

## Comparative Framework Analysis

Multiple security frameworks and methodologies—including approaches from leading researchers and organizations—demonstrate substantial consistency in core principles and activities. This convergence indicates that fundamental security practices represent universal principles rather than vendor-specific or researcher-specific approaches.

## Framework Alignment

Different formulations of secure development practices (including those from academic research, commercial frameworks, and organizational standards) reflect similar core activities mapped to comparable SDLC phases. This alignment demonstrates the robustness and generalizability of established security touchpoints and practices across varied organizational and methodological contexts.
