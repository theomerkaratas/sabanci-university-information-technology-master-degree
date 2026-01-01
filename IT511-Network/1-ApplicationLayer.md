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