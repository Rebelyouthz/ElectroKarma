# ElectroKarma — Advanced Setup Guide

## Overview
Real-time network security monitor with live device detection and network management.  
No simulation. All scans and actions are executed on your real network.

---

## Requirements

### System tools (install separately)
| Tool | Windows | Linux |
|------|---------|-------|
| nmap | https://nmap.org/download.html | `sudo apt install nmap` |
| npcap | https://npcap.com (needed for scapy on Windows) | built-in |
| aircrack-ng | optional | `sudo apt install aircrack-ng` |
| bluez | — | `sudo apt install bluez` |

### Python packages
```bash
pip install -r requirements.txt
```

---

## Running on Windows (as Administrator)
1. Install nmap + npcap
2. Open PowerShell **as Administrator**
3. `cd electrokarma-web\backend`
4. `pip install -r requirements.txt`
5. `python -m uvicorn main:app --host 0.0.0.0 --port 8000`
6. Open browser: `http://localhost:3000` (frontend) or `http://localhost:8000` (API)

## Running on Linux (as root)
1. `sudo apt install nmap bluez`
2. `sudo pip install -r requirements.txt`
3. `sudo python -m uvicorn main:app --host 0.0.0.0 --port 8000`

---

## Features

### Scanning
| Endpoint | What it does | Requires |
|----------|-------------|---------|
| POST /api/scan/network | nmap ARP scan of local subnet + ARP table | nmap |
| GET /api/scan/wifi | Nearby WiFi networks (SSID, BSSID, signal) | nmcli/netsh |
| POST /api/scan/bluetooth | BLE + Classic Bluetooth devices | bleak, hcitool |
| GET /api/devices/{ip}/details | OS fingerprint, open ports, services | nmap, admin |

### Device Management
| Endpoint | What it does | Requires |
|----------|-------------|---------|
| POST /api/manage/wifi-disconnect | Send deauth frames (kicks device from WiFi) | scapy + monitor mode |
| POST /api/manage/wifi-block-continuous | Persistent deauth flood in background | scapy + monitor mode |
| POST /api/manage/firewall-block | iptables (Linux) or Windows Firewall block | root/admin |
| POST /api/manage/arp-isolate | ARP cache poisoning — cuts device off network | scapy |
| POST /api/manage/bluetooth-interfere | l2ping flood to BT device | Linux + hci0 adapter |
| POST /api/manage/stop-all | Stop all background operations + remove firewall rules | — |

### WiFi Deauth Notes
- Requires a WiFi adapter that supports **monitor mode**
- On Linux: `sudo ip link set IFACE down && sudo iw IFACE set monitor control && sudo ip link set IFACE up`
- On Windows: npcap must be installed, adapter must support promiscuous mode
- Without monitor mode: use ARP-isolate + Firewall block instead (work on any adapter)

---

## Legal Notice
Use only on networks you own or have explicit written authorization to test.
