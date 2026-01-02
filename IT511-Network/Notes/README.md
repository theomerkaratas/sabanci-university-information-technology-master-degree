**Layers**: App -> Transport -> Network -> Link -> Physical
**App**: Provides network services to user apps. HTTP, FTP, DNS
**Transport**: Ensure end to end communication handles reliability and error control. TCP & UDP
**Network**: Handles routing and packet forwarding between networks. Determines best path for data. IP
**Link**: Transfer data between directly connected nodes. HandlesMAC addressing, Ethernet, WiFi
**Physical**: Transmit raw bits over physical medium. Defines cables, voltages

Circuit switched networks provide guaranteed bandwidth and constant delay, making them more reliable for real-time
Packet switching hosts break app layer messages into packets
**Packet transmission delay**: takes L/R second to transmit L-bit packet into link at R bps
Store and forward entire packet must arrive at router before it can be transmitted on next link
Circuit switching FDM (Frequency Division Multiplexing) and TDS (Time Division Multiplexing)
**FDM**: optical, electromagnetic, frequency divided into frequency band. each call allocated its own hand, can transmit at max rate of that narrow band
**TDM**: each call allocated periodic slot, can transmit at max rate

**Server**: has a permanent IP address and is always on, ready to receive requests. often in data centers, for scaling
**Client**: Initiates contact with the server. It may connect intermittently and often uses a dynamically assigned IP address. Clients do not communicate directly with each other in this model.
**Peer-to-Peer (P2P) Architecture**: In a peer-to-peer architecture, there is no dedicated, always-on server. Instead, peers (end systems) communicate directly with each other. Each peer acts as both a client and a server.

**Sockets:** A socket is an interface between an application process and the transport layer protocol within an end system. It acts as a local "door" through which a process sends and receives network messages
The application developer controls what is sent into and received from the socket. The operating system controls the complex transport protocols and network interface on the other side of the socket.

**Application-Layer Protocol Definition**
An application-layer protocol defines the rules for communication between application processes, including:
Types of Messages: The kind of messages exchanged (e.g., request, response).
Message Syntax: The structure and format of the messages (how fields are arranged and delimited).
Message Semantics: The meaning of the information within each field (what a request or response signifies).
Rules: The timing and conditions for sending messages and responding to them.
Open vs. Proprietary: Protocols like HTTP and SMTP are open (defined in public RFCs for interoperability), while protocols like Zoom are often proprietary.

**Internet Transport Protocol**
**TCP (Transmission Control Protocol) Service:**
Reliable, in-order data delivery.
Flow Control* (prevents overwhelming the receiver).
Congestion Control (prevents overwhelming the network).
Connection-oriented (requires handshake setup).
Does not provide: Timing guarantees, minimum throughput, or built-in security.

**UDP (User Datagram Protocol) Service:**
Unreliable data transfer. No guarantees of delivery, order, or non-duplication.
Connectionless. No setup delay.
Does not provide: Reliability, flow control, congestion control, timing, throughput guarantees, security.
Internet Applications and Transport Protocols
TCP for Reliability: FTP (file transfer), SMTP (email), HTTP (web) use TCP for its reliable data transfer.
UDP or TCP for Multimedia: Internet telephony and streaming often use RTP over UDP for low latency, though some streaming uses HTTP/TCP. Interactive games often use UDP for speed.

**Securing TCP**
Problem is standard ("Vanilla") TCP and UDP sockets send data in cleartext, including sensitive information like passwords, which is a major security risk.
Solution is Transport Layer Security (TLS):
It provides encryption for TCP connections.
It ensures data integrity (data is not altered in transit).
It provides end-point authentication (verifying the server's identity).
TLS is implemented at the application layer. Applications use TLS libraries (like OpenSSL) that, in turn, use TCP sockets. Data sent into a TLS-enabled "socket" is encrypted before traversing the network.

**Web and HTTP**
Web Page Composition: A web page is not a single file. It is a composite of multiple objects, each of which can be stored on different web servers.
Objects: These can be an HTML file, images (JPEG, PNG), scripts (JavaScript), applets (Java), audio/video files, etc.
Structure: The base HTML file is the main document. It contains references (via HTML tags) to other objects embedded in the page.
URL (Uniform Resource Locator): Each object is addressable by a URL. The URL format: http://host_name/path_name. For example, in www.someschool.edu/someDept/pic.gif, www.someschool.edu is the host name and /someDept/pic.gif is the path name to the object on that host.

**Hypertext Transfer Protocol (HTTP)**
It is the application-layer protocol of the World Wide Web. It defines how messages are formatted and transmitted between web clients and servers.
Client/Server Model:
Client: A web browser (e.g., Firefox, Safari) that requests objects via HTTP messages.
Server: A web server (e.g., Apache, Nginx) that sends objects in HTTP response messages.
HTTP relies on TCP as its underlying transport protocol for reliable data transfer. The typical process:
1. Client initiates a TCP connection to the server on port 80 (the default HTTP port).
2. Server accepts the TCP connection.
3. HTTP messages are exchanged over this established connection.
4. The TCP connection is closed.

**HTTP is Stateless:**
A fundamental characteristic of the basic HTTP protocol. The server does not retain any information ("state") about past client requests. Each request is processed independently, without knowledge of previous interactions. This simplifies server design but makes complex transactions (like shopping carts) impossible without additional mechanisms.