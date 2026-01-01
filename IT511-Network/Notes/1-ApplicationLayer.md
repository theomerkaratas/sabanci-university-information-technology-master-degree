## Application Layer
This is the top layer of the network protocol stack. It is where network applications and their application-layer protocol reside. Protocols at this layer define the format, order, and meaning of messages exchanged between applications, as well as the action taken on message transmission and receipt.

#### Creating Network App
Application development focuses on end systems, not the network core (routers, switchers). Developers write programs that run on different end systems and communicate over the network.

#### Client-Server Paradigm
In the client-server arch, there is an always-on host called the server, which provides a permanent service. Clients are hosts that contact the server to communicate and consume the service.

**Server:** has a permanent IP address and is always on, ready to receive requests. often in data centers, for scaling

**Client:** Initiates contact with the server. It may connect intermittently and often uses a dynamically assigned IP address. Clients do not communicate directly with each other in this model.

This model centralizes management and data storage on the server. It can become a bottleneck if a single server is overwhelmed, requiring scaling techniques.

**Example:** HTTP (Web), IMAP (email retrieval), FTP (file transfer)

#### Peer-to-Peer (P2P) Architecture
In a peer-to-peer arch, there is no dedicated, always-on server. Instead, peers (end systems) communicate directly with each other. Each peer acts as both a client and a server.

**Key Advantage:** Self scalability

**Key Challenges:** Peers are often intermittently connected (`churn`) and change IP addresses. This makes management complex, requiring protocols to locate resources and maintain connectivity in a dynamic environment.

## Sockets
A socket is an interface between an application process and the transport layer protocol within an end system. It acts as a local "door" through which a process sends and receives network messages

**Analogy:** The sending process pushes a message out through its socket (the door). The underlying operating system's transport infrastructure (like TCP or UDP) takes over on the other side of the door to deliver the message to the destination process's socket. Communication requires a pair of sockets: one at the sender, one at the receiver.

**Control:** The application developer controls what is sent into and received from the socket. The operating system controls the complex transport protocols and network interface on the other side of the socket.

#### Addressing Processes
**Process Identifier:** To receive messages, a process needs a unique identifier.

**IP Address Limitation:** A host's IP address alone is insufficient because many processes (applications) can run on the same host.

**Complete Address:** A process is uniquely identified by the combination of the **host's IP address** and a **port number**. The port number specifies the specific process (application) on that host.

**Port Examples:**
- HTTP server typically uses port **80**.
- SMTP mail server typically uses port **25**.

#### Application-Layer Protocol Definition
An application-layer protocol defines the rules for communication between application processes, including:
- **Types of Messages:** The kind of messages exchanged (e.g., request, response).
- **Message Syntax:** The structure and format of the messages (how fields are arranged and delimited).
- **Message Semantics:** The meaning of the information within each field (what a request or response signifies).
- **Rules:** The timing and conditions for sending messages and responding to them.
- **Open vs. Proprietary:** Protocols like HTTP and SMTP are **open** (defined in public RFCs for interoperability), while protocols like Zoom are often **proprietary**.

#### Transfer Service for Application
Applications have different requirements from the underlying transport layer service:
- **Data Integrity/Reliability:** Does the app require all data to be received correctly (e.g., file transfer) or can it tolerate some loss (e.g., real-time audio)?
- **Timing/Latency:** Does the app require low delay to be functional (e.g., online gaming, VoIP)?
- **Throughput/Bandwidth:** Does the app require a minimum guaranteed bandwidth (e.g., video streaming) or is it "elastic" and can work with whatever is available (e.g., email)?
- **Security:** Does the app need encryption, data integrity, and authentication?

#### Transport Service Requirements
- **No Loss, Elastic, Not Time-Sensitive:** File transfer, email, web documents. These use reliable, connection-oriented protocols.
- **Loss-Tolerant, Time-Sensitive, Specific Bandwidth Needs:** Real-time audio/video, interactive games. These can tolerate some packet loss but require low delay.
- **Mixed Requirements:** Text messaging requires no loss, is elastic in bandwidth, and has some timing constraints (should be fast, but not real-time like gaming).

#### Internet Transport Protocol

**TCP (Transmission Control Protocol) Service:**
- **Reliable, in-order data delivery.***
- *Flow Control** (prevents overwhelming the receiver).
- **Congestion Control** (prevents overwhelming the network).
- **Connection-oriented** (requires handshake setup).
- **Does not provide:** Timing guarantees, minimum throughput, or built-in security.

**UDP (User Datagram Protocol) Service:**
- **Unreliable data transfer.** No guarantees of delivery, order, or non-duplication.
- **Connectionless.** No setup delay.
- **Does not provide:** Reliability, flow control, congestion control, timing, throughput guarantees, security.

#### Internet Applications and Transport Protocols
- **TCP for Reliability:** FTP (file transfer), SMTP (email), HTTP (web) use TCP for its reliable data transfer.
- **UDP or TCP for Multimedia:** Internet telephony and streaming often use RTP over UDP for low latency, though some streaming uses HTTP/TCP. Interactive games often use UDP for speed.
- **Key Point:** The choice of transport protocol (TCP vs. UDP) is a fundamental design decision based on the application's requirements from Slide 4/5.

#### Securing TCP
Problem is standard ("Vanilla") TCP and UDP sockets send data in cleartext, including sensitive information like passwords, which is a major security risk. 

Solution is Transport Layer Security (TLS):
- It provides **encryption** for TCP connections.
- It ensures **data integrity** (data is not altered in transit).
- It provides **end-point authentication** (verifying the server's identity).

TLS is implemented at the application layer. Applications use TLS libraries (like OpenSSL) that, in turn, use TCP sockets. Data sent into a TLS-enabled "socket" is encrypted before traversing the network.

#### Web and HTTP
**Web Page Composition:** A web page is not a single file. It is a composite of multiple **objects**, each of which can be stored on different web servers.

**Objects:** These can be an HTML file, images (JPEG, PNG), scripts (JavaScript), applets (Java), audio/video files, etc.

**Structure:** The **base HTML file** is the main document. It contains references (via HTML tags) to other objects embedded in the page.

**URL (Uniform Resource Locator):** Each object is addressable by a URL. The URL format: `http://host_name/path_name`. For example, in `www.someschool.edu/someDept/pic.gif`, `www.someschool.edu` is the **host name** and `/someDept/pic.gif` is the **path name** to the object on that host.

#### Hypertext Transfer Protocol (HTTP)
It is the application-layer protocol of the World Wide Web. It defines how messages are formatted and transmitted between web clients and servers.

**Client/Server Model:***
- *Client:** A web browser (e.g., Firefox, Safari) that requests objects via HTTP messages.
- **Server:** A web server (e.g., Apache, Nginx) that sends objects in HTTP response messages.

**Basic Interaction:** The browser (client) sends an **HTTP request** for an object. The web server sends back an **HTTP response** containing the requested object.

HTTP relies on TCP as its underlying transport protocol for reliable data transfer. The typical process:
1. Client initiates a TCP connection to the server on port 80 (the default HTTP port).
2. Server accepts the TCP connection.
3. HTTP messages are exchanged over this established connection.
4. The TCP connection is closed.

##### HTTP is Stateless:
A fundamental characteristic of the basic HTTP protocol. The server does not retain any information ("state") about past client requests. Each request is processed independently, without knowledge of previous interactions. This simplifies server design but makes complex transactions (like shopping carts) impossible without additional mechanisms.

#### HTTP Connections: Two Types
- **Non-persistent HTTP (HTTP/1.0 default):** For each object transfer, a separate TCP connection is opened, used, and then closed. If a page has 10 images, 11 separate TCP connections are required (1 for the base HTML + 10 for the images).
- **Persistent HTTP (HTTP/1.1 default):** A single TCP connection is opened and left open. Multiple objects (the base HTML and all its referenced objects) can be sent over this single connection between the same client and server. The connection is closed after a period of inactivity or by explicit instruction.

#### Non-persistent HTTP: Example
This two-slide sequence illustrates the steps for fetching a page (`home.index`) with 10 embedded images using non-persistent HTTP:
1. Client initiates a TCP connection to the server.
2. Client sends an HTTP `GET` request for the `home.index` file.
3. Server receives the request, fetches the file, and sends it back in an HTTP response.
4. Server closes the TCP connection.
5. Client receives the HTML file, parses it, and finds 10 references to JPEG images.
6. **Steps 1-4 are repeated 10 more times**, once for each JPEG image. This leads to significant overhead.

#### Non-persistent HTTP: Response Time
**RTT (Round-Trip Time):** The time it takes for a small packet to travel from client to server and back.
**Response Time Calculation (per object):**
- **1 RTT** to initiate the TCP connection (SYN, SYN-ACK).
- **1 RTT** for the HTTP request and the beginning of the HTTP response to return.
- **File transmission time** for the actual object data.
**Total:** `2 RTT + file transmission time` per object.

#### Persistent HTTP (HTTP 1.1)

**Problems with Non-persistent HTTP:**
- High latency: 2 RTTs per object.
- High OS overhead for managing many TCP connections.
- Browsers work around it by opening multiple parallel connections, which strains servers.
**Solution - Persistent HTTP:**
- The server keeps the TCP connection open after sending the initial response.
- The client can send subsequent requests for referenced objects immediately over this existing connection.
- **Major Benefit:** Dramatically reduces response time. After the initial page fetch (2 RTTs), referenced objects can be fetched with as little as **1 RTT each** (just the request/response cycle, no new connection setup).

#### HTTP Request Message

**Message Types:** HTTP defines **request** and **response** messages. They are in human-readable ASCII format.

**Request Message Format:**
- **Request Line:** The first line. Contains the **method** (e.g., GET, POST), the **URL** of the requested object, and the **HTTP version** (e.g., HTTP/1.1).
- **Header Lines:** Provide additional information about the request (e.g., `Host:`, `User-Agent:`, `Connection:`).
- A blank line (carriage return + line feed) marks the end of the headers.
- **Entity Body:** Optional. Used with methods like POST to send data to the server.

#### Other HTTP Request Messages
- **POST:** Used to send data _to_ the server, typically from web forms. The user's input is placed in the **entity body** of the request.
- **HEAD:** Asks the server to send only the _headers_ of the response for a given URL, not the actual object. Useful for checking metadata or links.
- **PUT:** Used to _upload_ a new file/object to the server. The content in the entity body replaces the file at the specified URL.
- **GET (with Query String):** Although primarily for retrieval, GET can also send limited data to the server by appending it to the URL after a `?` (e.g., `.../search?term=monkeys`). This data is part of the URL in the request line.

#### HTTP Response Status Codes
A 3-digit code in the first line (status line) of the server's response indicates the result of the request.

Key examples:
- **200 OK:** Request succeeded. The requested object follows.
- **301 Moved Permanently:** The object has a new permanent URL, provided in the `Location:` header.
- **400 Bad Request:** The server could not understand the request (malformed syntax).
- **404 Not Found:** The requested document was not found on this server.
- **505 HTTP Version Not Supported:** The server does not support the HTTP protocol version used in the request.

#### Maintaining User/Server State: Cookies

HTTP is stateless, but many web applications need to track user activity across multiple page requests ("maintain state"). HTTP cookies enable us to do this. A cookie is a small piece of data created by the server and stored on the client's browser.

**Four Components:**
1. A `Set-Cookie:` header in the server's **HTTP response** (sends a unique ID to the client).
2. A `Cookie:` header in the client's subsequent **HTTP requests** (sends the ID back to the server).
3. A **cookie file** on the user's host, managed by the browser.
4. A **back-end database** on the web server that maps cookie IDs to user-specific information.

On first visit, the server assigns a cookie ID (e.g., 1678). The browser stores it. On every future visit to that site, the browser automatically includes the cookie ID in its requests, allowing the server to "recognize" the user.

#### **HTTP Cookies: Comments**
Uses for Cookies:
- **Authorization:** Keeping users logged in across pages.
- **Shopping Carts:** Remembering items a user has selected.
- **Recommendations:** Tracking user preferences and browsing history on a site.
- **User Session State:** Maintaining settings for web applications like email.

**How State is Maintained:** State is kept **at protocol endpoints** (server database 
and client's cookie file) and carried **in messages** (the cookie header lines).

**Privacy Concern:** Cookies allow sites to track a user's activity _on their site_. **Third-party persistent cookies** (often from advertisers) can be used to track a user's identity and behavior _across multiple, different websites_, raising significant privacy issues.

#### GDPR (EU General Data Protection Regulation) and Cookies
- GDPR Stance: The European Union's GDPR recognizes that cookies, especially when combined with other data, can be used to create profiles and identify individuals.
- Legal Classification: Therefore, such cookies are considered personal data.
- User Consent Requirement: Under GDPR, websites must obtain the user's explicit, informed consent before placing non-essential cookies (especially tracking cookies) on their device. This is why you see "cookie consent" banners on EU websites.
- User Control: The regulation gives users explicit control over whether their personal data (including cookies) can be collected and processed.

## Web Caches
A web cache (or proxy server) is an intermediate network entity that stores copies of recently requested web objects. Its primary goal is to satisfy client requests without needing to contact the distant origin server every time.

How It Works:
1. A user configures their browser to send all HTTP requests to a local web cache.
2. For each request:
  - Cache Hit: If the requested object is stored in the cache and is fresh, the cache returns it directly to the client.
  - Cache Miss: If the object is not in the cache (or is stale), the cache acts as a client, requests the object from the origin server, stores a copy, and then forwards it to the original client.

A web cache acts as both a server (to the requesting client) and a client (to the origin server).

**Cache Control:** The origin server controls how its content is cached using HTTP response headers like:
- `Cache-Control: max-age=<seconds>`: Tells the cache how long it can serve the object without checking for updates.
- `Cache-Control: no-cache:` Tells the cache it must validate with the origin server before serving a cached copy.

**Benefits of Caching:**
1. Reduced Response Time: The cache is geographically or network-topologically closer to the client than the origin server. 
2. Reduced Bandwidth: Decreases traffic on an institution's expensive access link to the wider internet.
3. Content Delivery Leveling: Allows smaller content providers to handle high demand more effectively by offloading traffic to distributed caches.

#### Caching Example and Calculation
There are a couple of quantitative comparison of solutions to a network bottleneck problem.
1. **Buy a Faster Link:** Increase the access link capacity.
2. **Install a Web Cache:** Install a cheap web cache inside the institutional network.

#### Browser Caching: Conditional GET

The goal is to avoid transferring an object the browser already has if it hasn't changed on the server. This saves bandwidth and time.

**Mechanism:**
1. The browser stores cached objects along with the date it received them from the server.
2. When the object might be stale, the browser sends a conditional GET request with an `If-modified-since: <date>` header.

**Server Response:**
- `304 Not Modified`: If the object hasn't changed since that date, the server sends this empty response. The browser uses its cached copy.
- `200 OK` with new data: If the object has changed, the server sends the full new object.

> This protocol ensures cached data is kept fresh without the overhead of transmitting unchanged objects repeatedly.

#### HTTP/2
- **Primary Goal:** Decrease delay when loading web pages that require multiple objects (HTML, CSS, images, scripts).
- HTTP/1.1 Limitation: While it allowed multiple requests over a single persistent TCP connection (pipelining), it mandated First-Come-First-Served (FCFS) order for server responses.
- The Problem – Head-of-Line (HOL) Blocking:
  - If a large object (e.g., a video) is requested first, smaller objects requested later must wait in line behind it for transmission.
  - If a TCP packet is lost, the entire connection stalls for retransmission, blocking all pending objects, not just the one with the lost packet.
- HTTP/2 Approach: Increases server flexibility in sending objects. While core protocol semantics (methods, status codes) remain the same as HTTP/1.1, it introduces major changes to how data is framed and delivered over the connection.

#### HTTP/2: Mitigating HOL Blocking
##### Problem:
- Scenario: A client requests one large object (O₁) and three smaller objects (O₂, O₃, O₄) over an HTTP/1.1 pipelined connection.
- HTTP/1.1 Behavior: The server sends the objects back in the exact order they were requested (FCFS). Even though O₂, O₃, and O₄ are ready and small, they are stuck behind the large O₁ file.
- Result: The browser cannot process/display O₂, O₃, O₄ until the transmission of O₁ is complete, increasing page load time.
##### Solution:
- Core Mechanism: Multiplexing. Objects are broken down into smaller frames.
- HTTP/2 Behavior: The server can interleave frames from different objects on the single TCP connection.
- Result in the Scenario: Frames from the smaller objects (O₂, O₃, O₄) can be sent between frames of the large object (O₁). This allows the browser to receive, process, and display the smaller objects much sooner. O₁ is delivered only slightly later.
- Benefit: Significantly reduces HOL blocking and improves page load performance.

#### HTTP/2 to HTTP/3
Remaining Problems with HTTP/2 over TCP:
1. Packet Loss Recovery: Since all multiplexed streams share a single TCP connection, the loss of any single TCP packet causes the entire connection to stall for retransmission, blocking all objects (streams). This reintroduces a form of HOL blocking at the transport layer.
2. Incentive for Parallel Connections: To work around this, browsers often open multiple parallel TCP connections (as they did with HTTP/1.1), defeating part of HTTP/2's efficiency goal.
3. No Built-in Security: Runs over plain TCP, requiring a separate TLS handshake for encryption (HTTPS).

#### HTTP/3
- Transport Change: Abandons TCP. Instead, it runs over QUIC, a modern transport protocol built on UDP.
- Key Benefits:
  - Per-Object/Stream Control: QUIC implements loss recovery and congestion control per stream, not per connection. The loss of a packet in one stream does not stall others.
  - Integrated Security: Encryption (TLS 1.3) is a mandatory, integral part of the QUIC protocol, reducing connection setup time.
  - Faster Setup: Combines cryptographic and transport handshakes, often allowing data transmission in "0-RTT" or "1-RTT".
- Evolution: HTTP/3 is essentially the HTTP/2 semantics mapped onto the new QUIC transport layer, solving the underlying transport-layer issues of HTTP/2.

## QUIC: Quick UDP Internet Connections

QUIC (Quick UDP Internet Connections) is an application-layer protocol that runs on top of UDP (instead of TCP). It was designed primarily to improve the performance of HTTP traffic.

**Architecture Comparison:**
- Traditional Stack (HTTP/2 over TCP): `HTTP/2 -> TLS (for security) -> TCP -> IP`
- QUIC Stack: `HTTP/3 -> QUIC -> UDP -> IP`

> By moving transport-layer functionalities (like reliability, congestion control, and security) into an application-layer protocol over UDP, QUIC avoids the inherent limitations and delays of TCP.

#### QUIC's Core Functionality

QUIC re-implements key transport-layer mechanisms within its own design:
- Error and Congestion Control: QUIC incorporates algorithms for reliable data transfer and network congestion management that are conceptually similar to TCP's well-known mechanisms. However, they are implemented in user-space (as part of QUIC) rather than in the operating system's kernel (like TCP).
- Connection Establishment: A major goal is to reduce setup time. QUIC aims to combine the establishment of reliability, congestion control state, authentication, and encryption into a single, integrated handshake.

#### QUIC Connection Establishment (1-RTT)

**The Problem with TCP+TLS (HTTP/2):**
- It requires two sequential handshakes:
  1. TCP Handshake: 1 RTT to establish the reliable transport connection.
  2. TLS Handshake: Requires at least 1 more RTT (ClientHello, ServerHello, etc.) to establish a secure, encrypted channel.

Total: At least 2 RTTs of delay before application data (HTTP) can be sent.

**QUIC's Solution (1-RTT Handshake):**

- QUIC integrates the TLS 1.3 handshake directly into its own connection setup.
- In the first flight of messages, it simultaneously establishes the cryptographic context and the transport parameters.
- Result: Application data can often begin flowing after just 1 RTT. This combines what were two separate layers (transport + security) into one streamlined process.

#### QUIC: 0-RTT Connection Establishment

For even faster subsequent connections to the same server, QUIC implements 0-RTT.

**How it Works:**
1. First Connection: At the end of the initial QUIC connection, the server provides the client with a session ticket (cryptographic material) that is cached by the client.
2. Subsequent Connection: When the client reconnects, it can immediately use this cached session ticket to encrypt and authenticate data in its very first packet.

Benefit: This allows the client to send application data immediately (0 RTT) along with the new connection request. The trade-off is a slight reduction in security guarantees (replay protection) for this early data, but it provides a significant performance boost for repeat visits.

## E-mail

The email system is a major network application built on a client-server architecture with three core components.

**Components:**
1. User Agents (UA): Also known as "mail readers" or clients (e.g., Outlook, Apple Mail, webmail interfaces). They allow users to compose, edit, read, and manage email messages. They typically store messages on a central mail server.
2. Mail Servers: The infrastructure's backbone. They maintain mailboxes (incoming messages) for each user and manage message queues for outgoing mail.
3. SMTP (Simple Mail Transfer Protocol): The application-layer protocol used for transferring email messages between mail servers and from a user agent to its outgoing mail server.

#### E-mail: Mail Servers

**Mail Server Functions:**
- Mailbox: Storage for incoming messages destined for a specific user.
- Message Queue: A holding area for outgoing messages that are waiting to be sent to other mail servers.

**SMTP's Role:** SMTP operates between mail servers. The server initiating the transfer acts as an SMTP client, and the receiving server acts as an SMTP server. This is a push protocol—the sender proactively delivers the message.

#### SMTP RFC (5321)
- SMTP uses TCP on port 25 for reliable delivery.
- **Direct Transfer:** It involves a direct connection from the sending mail server (client role) to the receiving mail server (server role).

Three Transfer Phases:
1. Handshaking (Greeting): Exchange of greetings and server capabilities.
2. Message Transfer: The actual sending of the email message.
3. Closure: Terminating the connection.

Protocol Style: Like HTTP, it is a text-based, command/response protocol. Commands (e.g., `HELO`, `MAIL` `FROM`, `RCPT TO`, `DATA`) are sent by the client, and the server replies with numeric status codes and phrases (e.g., `220`, `250` `OK`).

**IMAP:** Allows users to access and manage emails directly on the server. Messages stay on the server and sync across devices.

**POP3:** Downloads emails from the server to the local device, usually removing them from the server afterward.

#### Scenario: Emma Sends an Email to David

1. Composition: Emma uses her User Agent (e.g., Gmail) to write an email to david@university.edu
2. Submission to Outgoing Server: Emma’s User Agent uses SMTP to send the message to her own mail server. The message is placed in the server’s outgoing mail queue.
3. Server-to-Server Connection: The SMTP client running on Emma’s mail server opens a TCP connection to David’s mail server (university.edu).
4. Message Relay: Emma’s mail server transfers the email to David’s mail server using SMTP over this direct TCP connection.
5. Delivery to Mailbox: David’s mail server receives the message and stores it in David’s mailbox.
7. Retrieval: Later, David uses his User Agent (e.g., Outlook or a mobile mail app) to retrieve the message from his mailbox using a mail access protocol such as IMAP or POP3 (not SMTP).

#### SMTP: Observations & Comparison with HTTP

**Fundamental Difference:**
- HTTP is a pull protocol: The client (browser) initiates requests to pull data from a server.
- SMTP is a push protocol: The sending server pushes data to the receiving server.

**Similarities:** Both are text-based, use status codes, and can use persistent connections.

**Key SMTP Characteristics:**
- Can bundle multiple objects (e.g., text and attachments) into a single multipart message.
- Historically required message content (header and body) to be in 7-bit ASCII, which is why non-text attachments need encoding (like Base64).
- Uses the sequence CRLF.CRLF (a single dot on a line by itself) to mark the end of the message body.

# DNS: Domain Name System

The Internet uses IP addresses (32/128-bit numbers) for routing, but we use domain names (e.g., cs.umass.edu). A system is needed to map between these two identifiers.

**DNS is:**
- A distributed, hierarchical database implemented across many name servers.
- An application-layer protocol used by hosts and DNS servers to resolve (translate) names into addresses and vice versa.

It is a core Internet function, yet it is implemented at the application layer. This places complexity at the network's "edge" rather than in the core infrastructure.

#### DNS Services & Why a Distributed Design?

**DNS Services:**
- Primary: Hostname to IP address translation.
- Host Aliasing: Mapping a simple alias (e.g., www.google.com) to a complex canonical hostname.
- Mail Server Aliasing: Mapping a domain's mail address (e.g., @gmail.com) to its actual mail server cluster.
- Load Distribution: Distributing requests among multiple replicated servers (e.g., a web farm) by returning different IP addresses for the same domain name.

**Why Not Centralized?** A single, centralized DNS server would be a single point of failure, a massive traffic bottleneck, and geographically distant for many users, making it slow and impossible to maintain. It does not scale.

#### A Distributed, Hierarchical Database

**Hierarchical Structure:**
- Root DNS Servers: The top of the hierarchy (.).
- Top-Level Domain (TLD) Servers: Responsible for domains like `.com`, `.org`, `.edu`, and country codes (`.uk`, `.jp`).
- Authoritative DNS Servers: Owned by organizations or their providers. Hold the definitive ("authoritative") mappings for their hosts.

**Resolution Process (Simplified): To find www.amazon.com:**
1. Client asks Root: "Where is .com?"
2. Root replies: "Ask this .com TLD server."
3. Client asks .com TLD: "Where is amazon.com?"
4. TLD replies: "Ask this amazon.com authoritative server."
5. Client asks Authoritative server: "What is the IP for www?"
6. Authoritative server replies with the IP address.

#### DNS: Root Name Servers

- The root servers are the starting point of the DNS hierarchy. They are the "contact of last resort" for any name server that doesn't have a cached answer.
- The Internet cannot function without them. They are a primary target for attacks, leading to the development of DNSSEC (DNS Security Extensions) for authentication and integrity.
- Managed by ICANN (Internet Corporation for Assigned Names and Numbers).
- There are 13 logical root server identities (A through M), but each is highly replicated worldwide using anycast for resilience and load distribution.

#### Top-Level Domain (TLD) and Authoritative Servers

- TLD Servers manage the next level below root (e.g., `.com`, `.org`, `.edu`, `.uk`). Companies like Verisign (for `.com`) or Educause (for `.edu`) operate these.
- Authoritative DNS Servers: The final source of truth for a specific domain (e.g., `google.com`). An organization runs these servers (or pays a provider to) to publish the IP addresses of its public hosts (`www`, `mail`, etc.).

#### Local DNS Name Servers

- This is the first stop for any DNS query from a host. Typically provided by your ISP, company, or university.
- It acts as a proxy for the host. It checks its local cache. If the answer isn't cached, it forwards the query into the DNS hierarchy on the host's behalf.
- The local DNS server is not part of the strict hierarchy but is essential for the resolution process and performance (caching).

#### DNS Name Resolution: Iterated vs. Recursive Query

##### Iterative Query
- The contacted server replies with the best answer it has, which is often the address of another server to ask next.
- Example Flow: `Local Server -> Root (reply: "ask .com") -> Local Server -> .com TLD (reply: "ask amazon.com") -> Local Server -> amazon.com (reply: IP)`

**Burden:** The querying server (local DNS) does most of the work.

##### Recursive Query
- The contacted server must obtain the mapping on behalf of the requester and return the final answer.
- Example Flow: `Local Server (asks Root) -> Root (asks .com) -> .com (asks amazon.com) -> amazon.com (replies to .com) -> .com (replies to Root) -> Root (replies to Local Server)`

**Burden:** Places heavy load on the higher-level servers (Root, TLD). Therefore, Root and TLD servers typically do not support recursive queries to avoid overload.

#### Caching DNS Information

- The purpose is to dramatically improve response time and reduce load on the DNS hierarchy.
- Mechanism: Any DNS server (especially local servers) caches the mappings it learns. Subsequent queries for the same name can be answered immediately from the cache.
- Time-to-Live (TTL): Each cached record has an expiration time (TTL) set by the authoritative server. After the TTL expires, the entry must be refreshed.
- Consequence: DNS provides best-effort, eventually consistent mapping. If an IP address changes, the old address may still be served from caches worldwide until all TTLs expire.

#### DNS Records

- Resource Records (RRs): The fundamental data units stored in DNS. Format: (Name, Value, Type, TTL).

**Key Record Types:**
- **Type A**: `Name` = Hostname, `Value` = IPv4 Address.
- **Type NS**: `Name` = Domain (e.g., ibm.com), `Value` = Hostname of the authoritative name server for that domain.
- **Type CNAME**: `Name` = Alias (e.g., www.ibm.com), `Value` = Canonical (real) hostname.
- **Type MX**: `Name` = Domain, Value = Hostname of the `SMTP` mail server for that domain. (Has a priority field).

#### DNS Protocol Messages

- DNS uses a single message format for both queries and replies.

**Message Header Fields:**
- **Identification**: A 16-bit ID to match queries with their replies.
- **Flags**: Indicate if it's a query/reply, if recursion is desired/available, and if the reply is authoritative.
- **Counters**: Number of questions, answer RRs, authority RRs, and additional RRs in the message.

**Message Sections:**
- **Question Section**: Contains the query (name, type of record requested).
- **Answer Section**: Contains the Resource Records (RRs) that answer the question.
- **Authority Section**: Contains RRs that point to authoritative name servers.
- **Additional Section**: Contains other "helpful" RRs (e.g., the IP address of an authoritative server listed in the Authority section).

<--------2 bytes------> <------2 bytes------->
+----------------------+----------------------+
|     identification   |        flags         |
+----------------------+----------------------+
|     # questions      |    # answer RRs      |
+----------------------+----------------------+
|   # authority RRs    |  # additional RRs    |
+---------------------------------------------+
|      questions (variable # of questions)    |
+---------------------------------------------+
|         answers (variable # of RRs)         |
+---------------------------------------------+
|        authority (variable # of RRs)        |
+---------------------------------------------+
|     additional info (variable # of RRs)     |
+---------------------------------------------+

#### DNS Security

- Major Threats:
  - DDoS Attacks: Flooding DNS servers (especially Root or TLD) with traffic. Mitigated by filtering, caching (which bypasses root), and massive replication.
  - Spoofing / Cache Poisoning: Tricking a DNS server into accepting and caching a fake reply, redirecting users to malicious sites. Mitigated by DNSSEC, which adds cryptographic authentication to DNS records.
  - Targeting TLDs: Attacking TLD servers (.com) is considered more dangerous than attacking root, as they are more critical for daily operations.

# Socket Programming

Two Fundamental Transport Services:
- UDP Sockets: Provide an interface to unreliable, connectionless datagram service. Messages have boundaries.
- TCP Sockets: Provide an interface to reliable, connection-oriented, byte-stream service. Data is a continuous stream without inherent message boundaries.

Demonstration Application: A simple client-server echo application with modification.
1. Client: Reads a line of text from the user (keyboard) and sends it to the server.
2. Server: Receives the data, converts all characters to uppercase.
3. Server: Sends the modified (uppercase) data back to the client.
4. Client: Receives the modified data and displays it on the screen.

#### Socket Programming with UDP – Key Characteristics

- **Connectionless**: There is no initial handshake (connection setup) between the client and server before data is exchanged.
- **Addressing**: The sender must explicitly attach the destination IP address and port number to each individual datagram it sends.
- **Receiver Information**: The receiver can extract the sender's IP address and port number from each received datagram, allowing it to know where to send a reply.
- **Service Model**: From the application's viewpoint, UDP provides unreliable transfer of discrete datagrams (groups of bytes).
  - **Possible Issues**: Datagrams may be lost, delivered out of order, or arrive duplicated.
  - **Application Responsibility**: The application itself must handle these issues if reliability is required.
