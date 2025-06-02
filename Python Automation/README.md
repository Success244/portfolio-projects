# 🛠️ IAPP301 Assignment 2 – Python and IoT Integration

This project is part of a university assignment for the IAPP301 module and demonstrates an IoT prototype using **Python** and **Cisco Packet Tracer**. It simulates access control, emergency handling, and office automation for a local business.

## 📦 Contents

- `ServerSide.py` – A Python TCP Server that manages staff tracking and logs events.
- `Assignment.pkt` – A Packet Tracer simulation file representing the physical IoT environment.

## 🔧 Features

### 🔌 TCP Server
- Logs entry, exit, and emergency events with timestamps.
- Maintains a count of staff members on the premises.
- Resets count to zero in case of an emergency.
- Prints real-time messages when access control or emergency modules connect.

### 🚪 Access Control Simulation
- Simulates a secure double-door entry and exit system with LEDs.
- Prevents multiple concurrent entries/exits.
- Communicates entry/exit events to the TCP server.

### 🚨 Emergency Exit Simulation
- Activates a siren when the emergency door is opened.
- Deactivates the siren when closed.
- Sends alerts to the TCP server to trigger a full evacuation log.

### 🏢 Office Automation
- Lights and fan activate when someone enters the room.
- Door can be locked/unlocked via toggle switch.
- Automation resets when the user leaves the room.

## 🧑‍🤝‍🧑 Group Info
This was a group project

## 📝 Notes
- Developed using Python and Cisco Packet Tracer.
- Designed according to IoT best practices and real-world scenarios.
- Part of a graded university assignment – do not reuse without permission.

---

