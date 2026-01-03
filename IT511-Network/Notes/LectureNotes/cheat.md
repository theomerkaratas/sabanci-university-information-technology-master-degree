#### IP Datagram Format
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

#### IP Addressing: Introduction
- **IP Address**: A 32-bit identifier assigned to each interface of a host or router.
- **Interface**: The connection point between a device and a physical link.
- **Key Points:**
  - Routers have multiple interfaces (and thus multiple IP addresses).
  - Hosts typically have one or two interfaces (e.g., Ethernet and Wi-Fi).
- **Dotted-Decimal Notation**: Human-readable format (e.g., 223.1.1.1), where each number represents 8 bits (an octet) of the 32-bit address.

#### Subnets
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