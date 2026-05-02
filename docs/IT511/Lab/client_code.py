from socket import *
import time

serverName = "127.0.0.1"
serverPort = 12000

clientSocket = socket(AF_INET, SOCK_DGRAM)
clientSocket.settimeout(1)

for seq in range(1, 11):
    send_time = time.time()
    message = f"Ping {seq} {send_time}"

    try:
        clientSocket.sendto(message.encode(), (serverName, serverPort))
        response, serverAddress = clientSocket.recvfrom(1024)
        rtt = time.time() - send_time
        print(f"Reply from {serverAddress}: {response.decode()} | RTT = {rtt:.4f} sec")

    except timeout:
        print("Request timed out")

clientSocket.close()
