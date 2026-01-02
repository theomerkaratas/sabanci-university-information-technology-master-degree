Layers: App -> Transport -> Network -> Link -> Physical
App: Provides network services to user apps. HTTP, FTP, DNS
Transport: Ensure end to end communication handles reliability and error control. TCP & UDP
Network: Handles routing and packet forwarding between networks. Determines best path for data. IP
Link: Transfer data between directly connected nodes. HandlesMAC addressing, Ethernet, WiFi
Physical: Transmit raw bits over physical medium. Defines cables, voltages

TCP: Connection oriented, reliable, error checking, ordered data delivery, slower
UDP: Connections, no guarantee, no error recovery, faster, used for streaming

Circuit switched networks provide guaranteed bandwidth and constant delay, making them more reliable for real-time
Packet switching hosts break app layer messages into packets
Packet transmission delay: takes L/R second to transmit L-bit packet into link at R bps
Store and forward entire packet must arrive at router before it can be transmitted on next link
Circuit switching FDM (Frequency Division Multiplexing) and TDS (Time Division Multiplexing)
FDM: optical, electromagnetic, frequency divided into frequency band. each call allocated its own hand, can transmit at max rate of that narrow band
TDM: each call allocated periodic slot, can transmit at max rate
