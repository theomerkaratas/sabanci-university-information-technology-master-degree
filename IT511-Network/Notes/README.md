**Layers**: App -> Transport -> Network -> Link -> Physical
**App**: Provides network services to user apps. HTTP, FTP, DNS
**Transport**: Ensure end to end communication handles reliability and error control. TCP & UDP
**Network**: Handles routing and packet forwarding between networks. Determines best path for data. IP
**Link**: Transfer data between directly connected nodes. HandlesMAC addressing, Ethernet, WiFi
**Physical**: Transmit raw bits over physical medium. Defines cables, voltages

**TCP**: Connection oriented, reliable, error checking, ordered data delivery, slower
**UDP**: Connections, no guarantee, no error recovery, faster, used for streaming

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

