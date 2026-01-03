##### Network Layer: Data Plane vs. Control Plane
**Data Plane (Per-router, Local):**
- The forwarding function. It's a local, per-router operation.
- **Job**: Decide how to handle a datagram arriving on an input port (typically: send it to which output port?).
- Operates on short timescales (nanoseconds per packet).
**Control Plane (Network-wide):**
- The routing function. Determines the contents of the forwarding tables.
- **Job**: Compute the paths (routes) that datagrams should take through the network.
- Operates on longer timescales (seconds, minutes).

**Two Control Plane Approaches:**
- **Traditional (Per-router)**: Routing algorithms run in each router (e.g., OSPF, BGP).
- **Software-Defined Networking (SDN)**: Routing logic runs in a remote, centralized controller that programs the routers' forwarding tables.

##### Per-Router Control Plane (Traditional Approach)
- **Architecture**: Each router runs its own routing algorithm software (e.g., OSPF daemon).
- **Process**: Routers exchange routing messages with each other. Each router's algorithm computes its own forwarding table based on this distributed information.
- **Flow**: Control plane (routing algorithm) populates the forwarding table. The data plane (forwarding hardware) consults this table for every packet.

##### Software-Defined Networking (SDN) Control Plane
- **Architecture**: Decouples the control and data planes. A remote, centralized controller (logically centralized, often physically distributed for reliability) computes the routes for the entire network.
- **Process**: The controller communicates with simple forwarding agents in each router (via a protocol like OpenFlow). It computes and installs the forwarding table entries into the routers.
**Benefit**: Enables more flexible, programmable, and manageable networks compared to the distributed, per-router approach.

##### Router Architecture Overview
- **Input Ports**: Perform physical/link-layer functions, lookup, and forwarding.
- **Output Ports**: Buffer and transmit packets.
- **Switching Fabric**: The internal "network" that connects input ports to output ports (e.g., via a crossbar, shared memory, or bus).
- **Routing Processor**: Executes the control plane software (routing protocols, management). Operates on a slow, millisecond timescale.
- **Forwarding Hardware**: Executes the data plane functions (table lookup, switching). Must operate at extremely high speed (nanoseconds, "line speed") to handle incoming packet rates.

##### Input Port Functions
**Processing Steps at an Input Port:**
1. **Physical Layer**: Bit-level reception.
2. **Link Layer**: Frame processing (e.g., Ethernet decapsulation, error check).
3. **Lookup & Forwarding (Critical Step)**: Examine the network-layer header (e.g., IP destination address) and perform a lookup in the forwarding table to determine the output port for this packet. This must happen at line speed.

**Two Forwarding Paradigms:**
- **Destination-Based Forwarding (Traditional)**: Lookup based only on the destination IP address.
- **Generalized Forwarding (SDN/OpenFlow)**: Lookup can be based on any combination of header fields (source/dest IP, port, protocol, etc.), enabling more complex policies (e.g., firewalling, load balancing).

**Queueing**: If packets arrive faster than they can be forwarded into the switching fabric, they are queued at the input port, which can lead to delays and loss.

##### Destination-Based Forwarding & Longest Prefix Matching (LPM)
- **The Problem**: IP addresses are not assigned in neat, contiguous blocks that align with table entries. A destination address may match multiple table entries of different lengths.
- **Solution**: Longest Prefix Matching (LPM). The forwarding table contains entries with IP prefixes (e.g., 11001000 00010111 00010*** ********). When looking up a destination address, the router selects the entry with the longest (most specific) matching prefix.

> **Longest Prefix Matching**: when looking for forwarding table entry for given destination address, use longest address prefix that matches destination address.

**Example:**

<img src="longest_prefix_matching_1.png" width="500">

- Address: `11001000 00010111 00010110 10100001`
  - Matches Prefix 0 (00010***): 21-bit match.
  - Matches Prefix 2 (00011***): Does NOT match.
  - **Result**: Use interface 0 (longest matching prefix).

<img src="longest_prefix_matching_2.png" width="300">

- Address: `11001000 00010111 00011000 10101010`
- Matches Prefix 1 (00011000): 24-bit match.
- Matches Prefix 2 (00011***): 21-bit match.
- **Result**: Use interface 1 (longest matching prefix is 24 bits).

<img src="longest_prefix_matching_3.png" width="300">

**Why LPM?** It allows for hierarchical, aggregated routing. A more specific route (longer prefix) overrides a less specific one (shorter prefix). This is fundamental to how Internet routing scales.

##### Network Layer: Internet Protocol Stack
<img src="internet_protocol_stack.png" width="300">

- **IP Protocol**: The core. Defines the datagram format, addressing scheme (IP addresses), and packet handling conventions (e.g., forwarding, fragmentation).
- **Routing Protocols (OSPF, BGP) / SDN Controller**: Implement the control plane. They populate the forwarding table with the information IP needs to forward packets.
- **ICMP Protocol**: Used for error reporting (e.g., "Destination Unreachable") and router signaling (e.g., ping, traceroute). It's a helper protocol that works alongside IP.
- **Forwarding Table**: The data plane's "cheat sheet," filled by the control plane, used by IP to make per-packet forwarding decisions.

##### IP Datagram Format
- **Version (4 bits)**: IP version (e.g., 4 for IPv4).
- **Header Length (4 bits)**: Length of IP header in 32-bit words (typically 5, meaning 20 bytes, if no options).
- **Type of Service (8 bits)**: Historically for QoS; now used for Differentiated Services (DiffServ) and Explicit Congestion Notification (ECN).
- **Total Length (16 bits)**: Length of the entire datagram (header + data) in bytes. Maximum is 65,535 bytes.
- **Identifier, Flags, Fragment Offset (16+3+13 bits)**: Used for fragmentation and reassembly of packets that are too large for a link's MTU.
- **Time to Live (TTL - 8 bits)**: Decremented by each router. Packet is discarded if TTL reaches 0, preventing infinite loops.
- **Protocol (8 bits)**: Identifies the upper-layer protocol (e.g., 6 for TCP, 17 for UDP) for demultiplexing.
- **Header Checksum (16 bits)**: Error-check for the header only (not the data). Recalculated at each hop.
- **Source & Destination IP Address (32 bits each)**: The fundamental identifiers.
- **Options (variable)**: Rarely used. Can include features like record route, timestamp.
- **Data/Payload**: The transport-layer segment (TCP/UDP) being carried.
- **Overhead Note**: Significant overhead: 20 bytes for IP + 20 for TCP = 40 bytes before application data.

##### IP Addressing: Introduction
- **IP Address**: A 32-bit identifier assigned to each interface of a host or router.
- **Interface**: The connection point between a device and a physical link.
- **Key Points:**
  - Routers have multiple interfaces (and thus multiple IP addresses).
  - Hosts typically have one or two interfaces (e.g., Ethernet and Wi-Fi).
- **Dotted-Decimal Notation**: Human-readable format (e.g., 223.1.1.1), where each number represents 8 bits (an octet) of the 32-bit address.

##### Subnets
- **Definition**: A subnet is a group of device interfaces that can communicate directly with each other at the link layer without passing through a router. (Physically isolated network segments).
- **How to Identify Subnets**: Mentally "detach" each interface from its device. Each isolated "island" of connected interfaces forms a subnet.
- **IP Address Structure within a Subnet**: An IP address can be divided into two parts:
  - **Subnet Part (High-order bits)**: Common to all devices on the same subnet.
  - **Host Part (Low-order bits)**: Unique to each device within the subnet.
- **Subnet Address**: Represented using CIDR notation: `a.b.c.d/x`, where `x` is the number of bits in the subnet part. Example: `223.1.1.0/24` (subnet part is first 24 bits; host part is last 8 bits). The subnet address itself typically has all host bits set to 0.

### IP addressing: CIDR
- **CIDR (Classless Inter-Domain Routing)**: The modern, flexible addressing scheme that replaced the rigid class-based (A, B, C) system.
- **Key Feature**: The subnet prefix length (`/x`) is variable and explicitly specified. This allows for efficient allocation of address blocks of any size.
- **Format**: `a.b.c.d/x`. Example: `200.23.16.0/23` means the first 23 bits identify the network/subnet, and the remaining 9 bits identify hosts within it.
```
<----------- subnet part ------------>   <-- host part -->
11001000       00010111       00010000       00000000
```

##### How to Get an IP Address? (DHCP)
**Two Questions:**
1. Host gets its IP address: Via manual configuration or, more commonly, DHCP.
2. Network gets its subnet prefix: Allocated by an ISP from a larger block.

**DHCP (Dynamic Host Configuration Protocol):**
- **Purpose**: Allow a host to dynamically obtain an IP address, subnet mask, default gateway, and DNS server info when joining a network. Enables "plug-and-play" networking.
- **Process:**
  1. DHCP Discover: Host broadcasts "Is there a DHCP server?"
  2. DHCP Offer: Server(s) respond with a proposed IP address.
  3. DHCP Request: Host broadcasts a request to use a specific offered address.
  4. DHCP ACK: Server confirms and commits the lease.
- **Lease**: Addresses are loaned for a period and can be reclaimed, enabling reuse.
- **Server Location**: Often resides in the local router.

##### How a Network Gets Its Address Block
- **Process**: An organization (e.g., a company, university) obtains a block of IP addresses from its upstream Internet Service Provider (ISP).
- **Example**: An ISP has a large block (`200.23.16.0/20`). It can subdivide this block into smaller chunks (e.g., `/23` blocks) and allocate them to different customer organizations.
- **Hierarchical Allocation**: This creates a hierarchy: **IANA -> Regional Internet Registries (RIRs) -> ISPs -> Organizations -> Hosts**. This hierarchy is crucial for scalable routing.

### Network-Layer Functions
##### Review & Control Plane Approaches
**Review of Key Functions:**
- **Data Plane (Forwarding)**: The local, per-packet action of moving a packet from a router's input port to its output port. This is the "how" of packet movement.
- **Control Plane (Routing)**: The network-wide process of determining the end-to-end paths that packets should follow. This is the "where" decision that populates forwarding tables.
**Two Architectures for the Control Plane:**
1. **Per-Router Control (Traditional)**: Each router runs its own distributed routing algorithm (e.g., OSPF, BGP) and computes its own forwarding table independently, by communicating with its neighbors.
2.  **Logically Centralized Control (Software-Defined Networking - SDN)**: The control logic is separated from the routers and runs in a centralized (or logically centralized) remote controller. This controller computes the routes for the entire network and programs the routers' forwarding tables.

##### Per-Router Control Plane (Traditional Architecture)
**Decentralized & Distributed**: The control plane functionality is replicated in every router.
**How it Works:**
1. Each router runs a routing algorithm daemon (e.g., an OSPF process).
2. These daemons exchange routing protocol messages with each other to learn about network topology and paths.
3. Based on this distributed information, each router's algorithm independently computes its own forwarding table.
4. The data plane (forwarding hardware) in each router consults this locally computed table for every packet.
**Analogy**: Like a group of drivers each planning their own route using a map and talking to other drivers, rather than having a central dispatcher.

##### Software-Defined Networking (SDN) Control Plane
**Centralized Intelligence, Simplified Switches**: The core innovation of SDN is the separation of the control plane from the data plane.
**How it Works:**
1. A remote controller (which can be physically distributed for reliability but is logically centralized) holds the "big picture" of the network.
2. Routers become simple forwarding devices (data plane only) that expose a standardized API (e.g., OpenFlow).
3. The controller runs the network-wide routing logic and computes all forwarding tables.
4. The controller installs these table entries into the routers via the southbound API.

**Benefits (Implied):**
- **Programmability**: Network behavior can be changed easily by updating controller software.
- **Centralized Management**: Easier to implement consistent policies, traffic engineering, and innovation.
- **Simpler Switches**: Router hardware can be cheaper and less complex.

### Routing Fundamentals & Algorithm Classification

- Objective: The fundamental goal is to find a "good" path through a network of routers from a source host to a destination host.
- Path: A sequence of routers the packet will traverse.
- Good: Can be defined by different metrics: shortest (least cost), fastest (lowest delay), or least congested. This is a central and challenging problem in networking.

##### Graph abstraction: link costs

Modeling the Network: For algorithmic purposes, a network is abstracted as a graph **G = (N, E)**
**N**: Set of nodes (routers) => { u, v, w, x, y, z }
**E**: Set of edges (communication links) => { (u,v), (u,x), (v,x), (v,w), (x,w), (x,y), (w,y), (w,z), (y,z) }
**Link Cost ($c_{a,b}$)**: Each link has an associated cost. This can be static (e.g., always 1, or inversely related to bandwidth) or dynamic (reflecting current congestion). A cost of ∞ means no direct connection.

<img src="link_cost_graph.png" width="300">

##### Routing algorithm classification
Routing algorithms can be classified based on **the information they use** and **how often routing information changes**.

######## 1. Classification Based on Information Scope:
**Global (Link-State Algorithm)**
- Each router has a **complete view of the entire network topology**.
- Routers know:
  - All nodes in the network  
  - All links between nodes  
  - The cost of each link  
- Routers independently compute the **shortest path** to every destination using **Dijkstra’s algorithm**.
- Information is distributed using **link-state advertisements (LSAs)**, which are flooded to all routers.
Key Characteristics:
- Fast convergence  
- High memory and CPU usage  
- Accurate and consistent routing tables  
Examples:
- OSPF (Open Shortest Path First)  
- IS-IS  
**Decentralized (Distance-Vector Algorithm)**
- Each router knows only:
  - The cost to its **direct neighbors**
  - The distance vectors received from those neighbors
- Routers exchange routing information **periodically** with neighbors.
- Paths are calculated using the **Bellman-Ford algorithm**.
Key Characteristics:
- Slower convergence  
- Lower computation and memory requirements  
- Susceptible to routing loops and the *count-to-infinity* problem  
Example:
- RIP (Routing Information Protocol)

######## 2. Classification Based on Change Rate:
**Static**: 
**Static Routing**
- Routes are manually configured by administrators.
- No automatic updates when topology changes.
- Suitable for small, stable networks.
Advantages:
- Low overhead  
- Predictable behavior  
Disadvantages:
- Not scalable
- Routes change very slowly (e.g., manual configuration).
- No automatic failure recovery 

**Dynamic Routing**
- Routes are automatically updated in response to network changes such as:
  - Link failures  
  - Congestion  
  - Topology updates  
- Uses routing protocols to exchange information.
- Periodic updates or in response to link cost changes
Advantages:
- Adaptive and fault-tolerant
- Routers change more quickly
- Suitable for large and complex networks  
Examples:
- Distance Vector: RIP  
- Link State: OSPF, IS-IS 

#### Summary Table
| Category      | Knowledge Scope | Algorithm       | Update Method       | Examples       |
|---------------|-----------------|-----------------|---------------------|----------------|
| Global        | Full topology   | Dijkstra        | Link-state flooding | OSPF, IS-IS    |
| Decentralized | Neighbors only  | Bellman-Ford    | Periodic updates    | RIP            |
| Static        | Fixed routes    | Manual          | None                | Static routing |
| Dynamic       | Adaptive        | Algorithm-based | Automatic           | OSPF, RIP      |