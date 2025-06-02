

import socket
import threading
from datetime import datetime

HOST = '127.0.0.1'
PORT = 1243

staff_number = 0
log_file = "StaffLoggingDetails.txt"
lock = threading.Lock()

def log_event(event, count):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    entry = f"{timestamp}, {event}, Staff inside: {count}\n"
    print(entry.strip())
    with open(log_file, "a") as file:
        file.write(entry)

def handle_client(conn, addr):
    global staff_number
    print(f"✔️ Device with address:  {addr} connected.")
    try:
        while True:
            data = conn.recv(1024).decode()
            if not data:
                break

            data = data.strip()
            with lock:
                if data == "Entrance made":
                    staff_number += 1
                    log_event("Staff entered", staff_number)
                    conn.sendall(f"ACK ENTRY, Staff count: {staff_number}\n".encode())

                elif data == "Exit made":
                    if staff_number > 0:
                        staff_number -= 1
                    log_event("Staff exited", staff_number)
                    conn.sendall(f"ACK EXIT, Staff count: {staff_number}\n".encode())

                elif data == "Emergency":
                    staff_number = 0
                    log_event("Emergency exit opened - cleared staff count", staff_number)
                    conn.sendall("Staff count reset to 0\n".encode())

                else:
                    conn.sendall(f"Unknown command: {data}\n".encode())

    except Exception as e:
        print(f"An error occurred {e}")
    finally:
        print(f"❌Connection terminated: 🤖{addr} disconnected.")
        conn.close()

def start_server():
    print("🛫TCP SERVER INITIATING...")
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((HOST, PORT))
    server.listen()
    print(f"🐘Server listening on {HOST}:{PORT}")

    while True:
        conn, addr = server.accept()
        client_thread = threading.Thread(target=handle_client, args=(conn, addr))
        client_thread.start()

if __name__ == "__main__":
    start_server()