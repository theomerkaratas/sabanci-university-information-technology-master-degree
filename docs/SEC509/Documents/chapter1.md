# Software Ubiquity and Modern Dependency

## The Importance of Software Today

Modern society relies completely on software. For systems to be reliable, they must meet two main criteria:

- **Functional Correctness**: The software must work as intended.
- **Continuous Availability**: Systems must remain accessible at all times.

## Consequences of Software Failure

When software fails, organizations face severe consequences:

- **Financial Impact**: Significant loss of revenue.
- **Reputational Damage**: Negative media coverage, loss of customer trust, and falling stock prices.

## Understanding Vulnerabilities

A **vulnerability** is a design or code defect that allows attackers to make the software behave unexpectedly.

- **Exploitation**: Attackers can take control of a system locally or remotely, often turning it into a **bot** (or zombie).
- **Security vs. Other Issues**: Vulnerabilities specifically affect security. They are different from common **bugs** (errors in logic) or **misconfigurations** (errors in setup).

| Term                 | Definition                                          |
| :------------------- | :-------------------------------------------------- |
| **Vulnerability**    | A weakness that can be exploited by an attacker.    |
| **Bug**              | A code error that causes incorrect behavior.        |
| **Exploit**          | Using a vulnerability to gain unauthorized control. |
| **Bot / Zombie**     | A compromised system controlled by an attacker.     |
| **Misconfiguration** | Errors in software installation or settings.        |

## Prevalence and Impact

Security flaws are found in almost all modern devices, including phones, cars, and even smart appliances. Thousands of new vulnerabilities are discovered and patched every year.

## Root Causes of Insecure Software

1. **Education Gaps**: Most programmers are not formally taught secure coding practices.
2. **Late Exposure**: Developers often learn about security requirements only after they start working professionally.
3. **Weak Testing**: Software is usually tested for normal use, but rarely for how it handles malicious input or attacks.
4. **Competing Priorities**: Under pressure, developers often prioritize core features over security and reliability.

## The Economic Cost of Security

Global companies spend millions annually to identify vulnerabilities and reduce risk. Beyond direct security spending, system downtime caused by attacks leads to massive business losses.

---

# Dimensions of Cybersecurity: The McCumber Cube

The **McCumber Cube** is a framework used to manage cybersecurity by addressing three key dimensions simultaneously:

1. **Information States**: Data exists in three states:
   - **In Transit**: Moving through a network.
   - **At Rest**: Stored on disks or memory.
   - **In Process**: Being used by the system. _Most vulnerabilities occur during this state._

2. **Security Characteristics (CIA Triad)**:
   - **Confidentiality**: Ensuring only authorized users access data (using encryption and physical security).
   - **Integrity**: Ensuring data is not changed or corrupted (using hashing and digital signatures).
   - **Availability**: Ensuring systems remain accessible (protecting against bugs and Denial of Service attacks).
   - _Supporting goals_: Authentication, Authorization, Auditing, and Nonrepudiation.

3. **Security Measures**: Implementing protection through **Technology**, **Policies**, and **Education** (training people).

## Software Resilience

Resilience is the ability of a system to minimize the impact of disruptive events. A resilient system is designed to **anticipate, absorb, adapt, and recover** from attacks or failures quickly.

## Functional vs. Nonfunctional Requirements

- **Functional Requirements**: Define **what** the software does (specific features and actions).
- **Nonfunctional Requirements (NFRs)**: Define **how** the system performs (security, reliability, and quality).
  - **The Testing Gap**: Many developers fail to test for NFRs, focusing only on features. This oversight often leaves systems vulnerable to stress and attacks.

### Key NFR Families

- **Availability**: Categorized as High Availability, Continuous Operations, or Continuous Availability (no downtime).
- **Efficiency**: How well the system uses resources like CPU, memory, and bandwidth.
- **Manageability**: Built through **high cohesion** (focused modules) and **loose coupling** (independent components) to allow flexible updates.
- **Maintainability**: The ease of fixing bugs or adapting the software after it is deployed.
- **Performance**: Measured by transaction speed, volume, and the number of concurrent users.
- **Portability**: The ability to move software across different hardware or operating systems.
- **Scalability**: The system's ability to handle increasing demand (more users or data) without losing performance.

## Integrating Security into Development (S-SDLC)

The most effective way to build secure software is to integrate a security mindset into the entire **Software Development Life Cycle (SDLC)**.

- **Cost Impact**: According to **Barry Boehm’s metric**, fixing a defect during the "Requirements" phase is exponentially cheaper than fixing it after the software is released.
- **Development Models**: Whether an organization uses **Waterfall** (sequential steps) or **Agile** (iterative cycles), security processes must be present at every stage.

---

# Security Integration in the SDLC

## High-Level Overview

Security and resilience must be integrated into every stage of the **Software Development Life Cycle (SDLC)**:

- **Requirements**: Define security and privacy standards.
- **Design**: Perform threat modeling and architectural reviews.
- **Development**: Use static analysis and peer code reviews.
- **Testing**: Execute security-focused test cases and dynamic analysis.
- **Deployment**: Conduct a final security audit and establish monitoring plans.

The outputs of these processes provide recommendations for improving system architecture, code quality, and deployment configurations.

## The Requirements Phase

Security is a primary requirement, not an afterthought. Analysts and designers must be familiar with:

- **Compliance & Policies**: Internal security policies, privacy standards, and external regulations (e.g., PCI DSS, GDPR).
- **Mapping Goals**: Aligning nonfunctional requirements with core goals like Confidentiality, Integrity, Availability, and Auditing.
- **Key Questions**: Determine where data is stored, how it is accessed, how it is transmitted, and what privileges users require.

The phase ends with a prioritized list of security requirements and key design goals.

## The Design Phase

This phase focuses on identifying flaws before implementation.

- **Expert Involvement**: Security specialists help prevent structural weaknesses in architecture.
- **Vulnerability Types**:
  - **Design-Related**: Fundamental flaws in the system's structure.
  - **Implementation-Related**: Errors that occur during coding (e.g., poor input validation).

### Threat Modeling

Threat modeling is a structured, repeatable process used to identify potential attack vectors.

- **Systematic & Adversarial**: It uses a formal model to analyze "abuse cases"—how an attacker might exploit the system—rather than just focusing on intended use.
- **Holistic Perspective**: It examines the entire environment and integrated application behavior rather than individual components in isolation.

### Modeling Approaches

The starting point of threat modeling depends on the chosen approach:

- **Asset-centric**: Starts with the data or assets that need protection.
- **Attacker-centric**: Focuses on the motivations and strategies of potential attackers.
- **Application-centric**: Focuses on the software's functionality and internal data flows.

# Threat Modeling Approaches

## 1. Asset-Centric (Risk-Centric)

This approach prioritizes the protection of valuable organizational resources, such as customer databases or intellectual property.

- **Process**: Enumerate key assets, visualize their connections and data flows, and identify potential vulnerabilities for each.
- **Pros**: Directly addresses business priorities and is highly favored by auditors.
- **Cons**: Mapping abstract assets to specific software components can be complex and time-consuming for developers.
- **Examples**: PASTA, TRIKE.

## 2. Attacker-Centric

Practitioners adopt an "offensive mindset" to find weaknesses, essentially thinking like a hacker.

- **Pros**: Engaging for security professionals (like penetration testers) and makes threats feel concrete and tangible.
- **Cons**: Highly subjective; results depend heavily on the analyst's personal experience. It may focus on dramatic scenarios while overlooking common technical flaws.

## 3. Application-Centric

This approach focuses on the software’s architecture and internal data flows. It is the preferred method for development teams.

- **Pros**: Builds a shared understanding of the system across the team and helps identify context-specific threats.
- **Cons**: Success depends on thorough documentation. Developers may also find it difficult to critically analyze their own work for security flaws.

---

# The Threat Modeling Process

## Step-by-Step Overview

A detailed threat model typically follows these four core stages:

1. **Application Diagramming**: Creating a visual map of the architecture (e.g., a Data Flow Diagram).
2. **Threat Enumeration**: Identifying risks using frameworks like **STRIDE** or the **OWASP Top 10**.
3. **Threat Ranking**: Prioritizing risks based on severity (e.g., using the **DREAD** model).
4. **Mitigation Planning**: Developing and implementing security controls to address the risks.

## Assembling Resources

The success of a threat model depends on gathering the right information before starting:

- **Documentation**: Accurate architectural and design records provide essential context.
- **Experts**: Input from architects, developers, and operations specialists is crucial for accuracy.
- **Source Code**: Direct access to the code allows for a deeper analysis of implementation flaws.
- **Strategy**: Investing time in "knowledge acquisition" early on prevents dead-ends. It is common to discover missing information mid-process, which may require pausing the analysis to fill those gaps.

# Functional Decomposition and DFDs

## Overview

**Functional decomposition** is the process of breaking a system into its core components to map data flow and identify the **attack surface** (all possible entry points for an attacker). This is primarily achieved through **Data Flow Diagrams (DFDs)**.

### Key DFD Principles

- **What they show**: The movement of data, processing points, and where critical information is stored.
- **What they do NOT show**: Internal algorithms (how code works), specific data formats (binary details), or internal functions that do not interact with external input.

## DFD Components

1.  **Interactors**: External entities such as users, remote systems, or other programs (via APIs) that provide input or consume output.
2.  **Flow**: The movement of data between components, labeled with descriptive types (e.g., "Plaintext Password" or "String").
3.  **Processors**: Areas where data is transformed (e.g., hashing) or where security checks are performed.
4.  **Storage**: Data at rest, such as databases or files. These are critical security points because they may have undocumented access pathways.
5.  **Trust Boundaries**: Regions where security policies or trust levels change (e.g., moving from an unauthenticated UI to a protected database). Crossing these boundaries usually requires authentication.

---

# STRIDE Threat Categorization

Developed by Microsoft, **STRIDE** is a granular taxonomy used to systematically identify and categorize software defects. It builds upon the CIA triad (Confidentiality, Integrity, Availability) to provide a more detailed framework for engineers.

### 1. Spoofing

Impersonating a user or system to gain unauthorized access.

- **Examples**: Phishing, IP masking, and creating "mimic" login screens to steal credentials.

### 2. Tampering

The unauthorized modification or deletion of data, either while it is stored or in transit.

- **Examples**: Man-in-the-middle (MITM) network attacks or using malware to alter a program's execution logic.

### 3. Repudiation

Denying that an action occurred by hiding or falsifying evidence (e.g., audit logs).

- **Examples**: Deleting logs after a breach or falsely claiming a transaction was never received to obtain a refund.

### 4. Information Disclosure

The exposure of confidential information to unauthorized individuals.

- **Examples**: Large-scale data breaches, social engineering among co-workers, and eavesdropping on unencrypted network traffic.ess sensitive information.

---

### 5. Denial of Service (DoS)

DoS attacks aim to make a service unavailable to legitimate users by degrading or eliminating system availability.

- **Scope**: Includes overwhelming processing power (DDoS), encrypting files (Ransomware), or corrupting network routing (DNS poisoning).
- **Impact**: These attacks can cripple major financial and telecommunications infrastructure.

### 6. Elevation of Privilege

This occurs when an unprivileged user gains administrative access, often resulting in a complete system takeover.

- **Risks**: Privileged access allows attackers to bypass all defenses and execute virtually any other type of attack.
- **Examples**: Exploiting memory vulnerabilities (Buffer Overruns) or manipulating account permissions.

---

# Attack Chaining and Threat Trees

## Multi-Stage Attacks

Attackers frequently "chain" multiple vulnerabilities. For example, an initial **Elevation of Privilege** might be used to facilitate **Repudiation** by deleting audit logs to hide evidence of the intrusion.

## Threat Trees

Threat trees are graphical representations used to analyze the sequential steps of an attack.

- **Purpose**: They help identify the "root attack," visualize cascading consequences, and pinpoint critical intervention points where a defense strategy can stop the entire chain.

---

# Threat Ranking: The D.R.E.A.D. Model

Because resources are finite, organizations must prioritize threats using a systematic framework. The **D.R.E.A.D.** model scores threats on a scale of 0 to 10 across five categories:

1.  **Damage Potential**: The severity of the consequences if the attack succeeds.
2.  **Reproducibility**: How easily and consistently the attack can be repeated.
3.  **Exploitability**: The level of effort, expertise, or resources required to launch the attack.
4.  **Affected Users**: The percentage of the user base exposed to the vulnerability.
5.  **Discoverability**: The likelihood that an attacker will find the flaw (with the rule "Never say never").

### Risk Assessment

The final risk rating is the average of these five scores. High scores indicate critical threats that demand immediate attention and resource allocation.
# Mitigation Strategies and Mapping

## Mitigation Planning
The goal of threat ranking is to guide remediation in a logical order. Organizations prioritize the most severe threats based on their DREAD scores, aiming for an **acceptable level of risk** rather than absolute security. This is an ongoing process throughout the system's lifecycle.

## Threat-to-Control Mapping
The **STRIDE** model helps map threats to fundamental security principles and appropriate controls:

| STRIDE Threat | Security Principle | Mitigation Controls |
| :--- | :--- | :--- |
| **Spoofing** | Authentication | MFA, Hashing, Digital Signatures, IPSec |
| **Tampering** | Integrity | Message Authentication Codes (MAC), Signatures |
| **Repudiation** | Non-Repudiation | Secure logging, Auditing, Strong Authentication |
| **Information Disclosure** | Confidentiality | Encryption (at rest and in transit) |
| **Denial of Service** | Availability | Filtering, Quotas, High-availability design |
| **Elevation of Privilege** | Authorization | RBAC, Permissions, Input validation |

## Security Design Reviews
These reviews are iterative, scaling from architecture to individual modules. They rely on automated tools, checklists, and expert judgment tailored to the organization's unique environment and governance.

---

# Secure SDLC Phases: Development and Testing

## Development Phase (Coding)
Focuses on minimizing implementation-related vulnerabilities through:
1.  **Static Analysis (SAST)**: Automated tools scan source code for common flaws (SQLi, XSS). They are efficient for "low-hanging fruit" but prone to false positives.
2.  **Peer Review**: Manual inspection by other developers. While time-consuming, it is essential for identifying complex logic errors and policy violations that tools miss.

## Testing Phase (Verification)
Validation occurs through specialized security test cases and dynamic analysis:
- **DAST**: Automated black-box testing of a running application.
- **Fuzzing**: Providing malformed inputs to trigger crashes or memory corruption.
- **IAST**: Monitors behavior and data flow in real-time during functional testing.
- **Penetration Testing**: Simulated manual attacks (Black, White, or Gray-box).
- **Stress Testing**: Evaluating resilience against resource exhaustion and Denial of Service (DoS).

---

# Deployment and Analysis Methodologies

## Deployment Phase
The final stage focuses on governance and operational readiness:
- **Change Advisory Board (CAB)**: Balances organizational change with risk management.
- **Final Security Review**: Verification by experts that all identified risks are addressed.
- **Monitoring & Response**: Establishing plans for incident detection and production support.

## Strategic Comparison: SAST vs. DAST
| Feature | SAST (White Box) | DAST (Black Box) |
| :--- | :--- | :--- |
| **Target** | Source Code (Inside-out) | Running App (Outside-in) |
| **SDLC Phase** | Early (Development) | Late (Testing/Staging) |
| **Cost** | Lower (Early fix) | Higher (Late fix) |
| **Strengths** | Implementation bugs | Runtime/Environment issues |

## Flexible Security Integration
Security integration is a "common sense" improvement that should be customized to each organization. Most organizations use an iterative approach, cycling through these phases to ensure continuous security improvement as the software matures.# Security Touchpoints Ranked by Effectiveness

While effectiveness varies by organization, the following activities are generally ranked by their ability to reduce software risk:

1.  **Code Review**: Targeted analysis of source code to find implementation bugs (e.g., buffer overflows). While highly effective, it only uncovers about 50% of total security problems because it misses design-level flaws.
2.  **Architectural Risk Analysis**: A design-centric review that identifies systemic vulnerabilities, such as poor data isolation, before they are implemented in the code.
3.  **Penetration Testing**: Probing the system in its actual production environment. Success on basic automated tests is a minimum baseline; failure indicates a critical security breakdown.
4.  **Risk-Based Security Testing**: A strategy that combines functional security testing (e.g., login logic) with adversarial probes based on known attack patterns.
5.  **Abuse Cases**: Modeling the system from an attacker's perspective to determine what needs protection, from whom, and for how long.
6.  **Security Requirements**: Explicitly defining security goals early in the project, covering both specific mechanisms (e.g., encryption) and systemic resilience.
7.  **Security Operations**: Integrating software defense with network security. Lessons from real-world attacks must be cycled back into the SDLC to improve future development.

## Framework Consistency
Despite differences in terminology, leading security frameworks across academic, commercial, and organizational sectors are remarkably consistent, sharing these core principles and activities.
