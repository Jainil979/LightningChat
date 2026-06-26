<h1 align="center">⚡ LightningChat</h1>

<p align="center">
  <strong>Offline-first • End-to-End Encrypted • Peer-to-Peer Messaging Platform</strong><br>
  React • Fastify • PostgreSQL • Protocol Buffers • WebRTC • Custom Binary Protocol
</p>

<p align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Fastify](https://img.shields.io/badge/Fastify-Node.js-000000?style=for-the-badge&logo=fastify)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql)
![Protocol Buffers](https://img.shields.io/badge/Protocol-Buffers-4285F4?style=for-the-badge)
![WebRTC](https://img.shields.io/badge/WebRTC-FF6F00?style=for-the-badge)
![MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

</p>

---

# Repository Links

| Repository | Description | Link |
|------------|-------------|------|
| **Frontend** | React + Vite client application with offline-first architecture, IndexedDB, WebRTC, and end-to-end encryption. | [GitHub Repository](https://github.com/Jainil979/LightningChat) |
| **REST API** | Fastify backend providing authentication, user management, contacts, profiles, and Protocol Buffers-based REST APIs. | [GitHub Repository](https://github.com/Jainil979/LightningChat-APIs) |
| **WebSocket Server** | High-performance uWebSockets.js relay implementing the custom binary protocol, presence, acknowledgements, and WebRTC signalling. | [GitHub Repository](https://github.com/Jainil979/LightningChat-Websocket) |

---

# Overview

LightningChat is a **full-stack real-time messaging platform** focused on **privacy, low latency, and efficient communication**.

The application combines an offline-first frontend, an optimized Protocol Buffer REST API, and a high-performance binary WebSocket server to provide secure messaging, encrypted media exchange, presence tracking, delivery acknowledgements, and peer-to-peer voice/video calling.

Unlike traditional chat applications that exchange JSON payloads, LightningChat uses a **custom binary protocol** for WebSocket communication and **Protocol Buffers** for REST APIs to reduce bandwidth usage and improve serialization performance.

The project is divided into three independent services:

- React Frontend
- Fastify REST API
- uWebSockets.js WebSocket Relay

---

# Architecture

```text
                    ┌────────────────────────────┐
                    │       React Frontend       │
                    │                            │
                    │  IndexedDB + Dexie         │
                    │  Web Workers              │
                    │  Encryption Engine        │
                    └─────────────┬──────────────┘
                                  │
                   HTTPS (Protocol Buffers)
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │       Fastify API          │
                    │                            │
                    │ JWT Authentication         │
                    │ Contacts                   │
                    │ User Profiles              │
                    └─────────────┬──────────────┘
                                  │
                             PostgreSQL
                                  │
                                  │
Binary WebSocket                  │
(Custom Protocol)                 │
                                  ▼
                    ┌────────────────────────────┐
                    │ uWebSockets.js Relay Server│
                    │                            │
                    │ Presence                   │
                    │ Message Relay              │
                    │ Call Signalling            │
                    └─────────────┬──────────────┘
                                  │
                     Encrypted Binary Frames
                                  │
                                  ▼
                         Other Connected Clients
```

---

# Key Features

## End-to-End Encrypted Messaging

- X3DH key agreement
- Double Ratchet algorithm
- Forward secrecy
- TweetNaCl cryptography
- Cryptographic operations executed inside Web Workers
- Server never accesses plaintext messages

---

## Custom Binary WebSocket Protocol

Instead of exchanging JSON frames, LightningChat uses a compact binary protocol designed specifically for real-time messaging.

Features include:

- Binary frame encoding
- Varint length prefixes
- Compact message types
- Low parsing overhead
- Reduced network bandwidth
- Efficient acknowledgement packets
- Binary signalling for WebRTC

---

## Protocol Buffers REST API

The REST API communicates exclusively using **Protocol Buffers** instead of JSON.

Benefits include:

- Smaller payload sizes
- Faster serialization
- Faster deserialization
- Strong schema validation
- Reduced network overhead

Implemented for:

- User Registration
- Login
- Authentication
- Contacts
- User Profiles

---

## Offline-First Architecture

LightningChat continues to function without an active internet connection.

Features include:

- IndexedDB persistence
- Dexie.js database layer
- Offline message queue
- Automatic synchronization
- Local conversation cache
- Session persistence

---

## Real-Time Messaging

Supports:

- One-to-one messaging
- Delivery acknowledgements
- Read receipts
- Typing indicators
- Online presence
- Last seen status
- Automatic reconnection

---

## Voice & Video Calling

Built using WebRTC.

Includes:

- Peer-to-peer communication
- Offer / Answer exchange
- ICE Candidate signalling
- STUN integration
- Binary WebSocket signalling
- Secure DTLS-SRTP media encryption

---

## Authentication & Security

Authentication system includes:

- JWT Access Tokens
- Refresh Tokens
- HttpOnly Cookies
- Automatic Token Refresh
- Token Rotation
- Secure Logout
- Password Hashing
- Protected API Routes

---

# Technology Stack

| Layer | Technologies |
|--------|--------------|
| Frontend | React 18, Vite, Tailwind CSS |
| Local Storage | IndexedDB, Dexie |
| Encryption | TweetNaCl, MessagePack |
| REST API | Fastify, Node.js |
| Database | PostgreSQL |
| Authentication | JWT, Refresh Tokens |
| Serialization | Protocol Buffers |
| WebSocket Server | uWebSockets.js |
| Communication | Custom Binary Protocol |
| Voice/Video | WebRTC |
| Deployment | Render, Vercel |
| Version Control | Git, GitHub |

---

# Project Structure

```text
lightningchat/

├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── api/
│   ├── routes/
│   ├── protobuf/
│   ├── database/
│   └── package.json
│
├── websocket/
│   ├── protocol/
│   ├── handlers/
│   ├── authentication/
│   └── package.json
│
├── docs/
│
└── README.md
```

---

# Core Components

## Frontend

Responsible for:

- User Interface
- Local Database
- Encryption
- Offline Queue
- API Communication
- WebSocket Communication
- WebRTC Integration

---

## REST API

Responsible for:

- User Registration
- Login
- Authentication
- Contacts
- Profile Management
- Token Management

---

## WebSocket Relay

Responsible for:

- Presence Updates
- Typing Indicators
- Message Relay
- Delivery Acknowledgements
- Read Receipts
- WebRTC Signalling

---

# Performance Optimizations

LightningChat incorporates several optimizations to improve responsiveness and reduce network usage.

| Optimization | Purpose |
|--------------|----------|
| Protocol Buffers | Efficient REST payload serialization |
| Binary WebSocket Frames | Reduced message size |
| Varint Encoding | Compact binary packets |
| IndexedDB | Fast local storage |
| Dexie.js | Indexed browser database |
| Web Workers | Non-blocking cryptographic operations |
| uWebSockets.js | High-performance WebSocket server |

---

# Running the Project

## Prerequisites

- Node.js 20+
- PostgreSQL
- Git

---

## Start REST API

```bash
cd lightningchat-api

npm install

npm run dev
```

---

## Start WebSocket Server

```bash
cd lightningchat-websocket

npm install

npm start
```

---

## Start Frontend

```bash
cd lightningchat-frontend

npm install

npm run dev
```

Open:

```
http://localhost:5173
```

---

# Future Enhancements

Planned improvements include:

- Group Chats
- File Sharing
- Push Notifications
- Multi-device Synchronization
- Screen Sharing
- TURN Server Integration
- Desktop Application
- Progressive Web App Enhancements

---

# License

This project is licensed under the **MIT License**.

---

# Author

**Your Name**

- GitHub: https://github.com/Jainil979
- LinkedIn: https://www.linkedin.com/in/jainil-soni-2871b7286

---

