// // src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';

// export class WebRTCManager {
//   /**
//    * @param {function(Uint8Array):void} sendFn – sends a binary frame over WebSocket
//    */
//   constructor(sendFn) {
//     this.sendFn = sendFn;
//     this.peers = new Map();           // userId → RTCPeerConnection
//     this.channels = new Map();        // userId → RTCDataChannel
//     this.iceCandidates = new Map();   // userId → RTCIceCandidate[] (buffered)
//     this.connecting = new Set();      // userIds with in‑progress connection
//   }

//   /**
//    * Open a chat with a contact. If online, initiate WebRTC.
//    * @param {number} userId
//    * @param {boolean} isOnline
//    */
//   openChat(userId, isOnline) {
//     if (isOnline && !this.channels.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   /**
//    * Called when a peer comes online (presence event).
//    * @param {number} userId
//    */
//   onPeerOnline(userId) {
//     if (!this.channels.has(userId) && !this.connecting.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   /** Internal: create a peer connection and start the offer flow */
//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);

//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`DataChannel open with ${userId}`);
//       };

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, event.candidate.candidate));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC initiation failed', err);
//       this.connecting.delete(userId);
//     }
//   }

//   /**
//    * Process an incoming SIGNAL from a peer.
//    * @param {number} senderId
//    * @param {number} subType
//    * @param {string} payload – SDP or ICE candidate
//    */
//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`DataChannel open with ${senderId}`);
//         };
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, e.candidate.candidate));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const candidate = new RTCIceCandidate({
//         candidate: payload,
//         sdpMid: '0',
//         sdpMLineIndex: 0,
//       });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(candidate);
//       } else {
//         const buf = this.iceCandidates.get(senderId) || [];
//         buf.push(candidate);
//         this.iceCandidates.set(senderId, buf);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   /** Close all connections (called on page unmount / logout) */
//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//   }
// }



// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';

// export class WebRTCManager {
//   /**
//    * @param {function(Uint8Array):void} sendFn – sends a binary frame over WebSocket
//    */
//   constructor(sendFn) {
//     this.sendFn = sendFn;
//     this.peers = new Map();           // userId → RTCPeerConnection
//     this.channels = new Map();        // userId → RTCDataChannel
//     this.iceCandidates = new Map();   // userId → RTCIceCandidate[] (buffered)
//     this.connecting = new Set();      // userIds with in‑progress connection
//   }

//   /**
//    * Open a chat with a contact. If online, initiate WebRTC.
//    * @param {number} userId
//    * @param {boolean} isOnline
//    */
//   openChat(userId, isOnline) {
//     if (isOnline && !this.channels.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   /**
//    * Called when a peer comes online (presence event).
//    * @param {number} userId
//    */
//   onPeerOnline(userId) {
//     if (!this.channels.has(userId) && !this.connecting.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   /** Internal: create a peer connection and start the offer flow */
//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);

//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         console.log(`✅ WebRTC DataChannel established with user ${userId}`);
//         this.connecting.delete(userId);
        
//       };

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, event.candidate.candidate));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC initiation failed', err);
//       this.connecting.delete(userId);
//     }
//   }

//   /**
//    * Process an incoming SIGNAL from a peer.
//    * @param {number} senderId
//    * @param {number} subType
//    * @param {string} payload – SDP or ICE candidate
//    */
//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ WebRTC DataChannel established with user ${senderId}`);
//         };
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, e.candidate.candidate));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       // Note: sdpMid and sdpMLineIndex are hardcoded here; for complex SDP setups,
//       // extract them from the candidate string using a simple regex.
//       const candidate = new RTCIceCandidate({
//         candidate: payload,
//         sdpMid: '0',
//         sdpMLineIndex: 0,
//       });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(candidate);
//       } else {
//         const buf = this.iceCandidates.get(senderId) || [];
//         buf.push(candidate);
//         this.iceCandidates.set(senderId, buf);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   /** Close all connections (called on page unmount / logout) */
//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//   }
// }













// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// import db from '../db/index.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     if (isOnline && !this.channels.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     if (!this.channels.has(userId) && !this.connecting.has(userId)) {
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, event.candidate.candidate));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//           this._startKeyExchange(senderId);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, e.candidate.candidate));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const candidate = new RTCIceCandidate({
//         candidate: payload,
//         sdpMid: '0',
//         sdpMLineIndex: 0,
//       });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(candidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(candidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange ----
//   async _startKeyExchange(peerId) {
//     if (this.myUserId < peerId) {
//       const keys = await generateKeyPair();
//       this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//       const init = buildKeyExchangeInit(keys.publicKey);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//     }
//   }

//   async _handleKeyExchange(peerId, payload) {
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {
//       const myKeys = await generateKeyPair();
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//     } else if (packet.type === 2) {
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.ephKeys.delete(peerId);
//     }
//   }

//   // ---- Encrypted Messaging ----
//   async sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     // Store in IndexedDB
//     const cid = await this._getOrCreateConversation(peerId);
//     await db.msgs.put({
//       cid,
//       t: msgObj.ts,
//       id: msgObj.id,
//       d: encode({ s: this.myUserId, b: text, st: 0 })  // st=0 sent
//     });
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       // Store in IndexedDB
//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })  // st=1 received
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch { /* ignore */ }
//   }

//   _handleDataMessage(peerId, data) {
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//   }
// }

// // Tiny helpers (could be in a separate file, but placed here for simplicity)
// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }















// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// import db from '../db/index.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();   // userId → array of { msgObj, resolve, reject }
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId)
//     if (isOnline && !this.channels.has(userId)) {
//       console.log("Call Intiated");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     if (!this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, event.candidate.candidate));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//           this._startKeyExchange(senderId);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, e.candidate.candidate));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const candidate = new RTCIceCandidate({
//         candidate: payload,
//         sdpMid: '0',
//         sdpMLineIndex: 0,
//       });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(candidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(candidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange ----
//   async _startKeyExchange(peerId) {
//     if (this.myUserId < peerId) {
//       console.log("Started key exchange");
//       const keys = await generateKeyPair();
//       console.log("Keys : ", keys);
//       this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//       const init = buildKeyExchangeInit(keys.publicKey);
//       console.log("Build Init : ", init);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//     }
//   }

//   async _handleKeyExchange(peerId, payload) {
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {   // INIT received
//       console.log("Intial key exchange reciever");
//       const myKeys = await generateKeyPair();
//       console.log(myKeys);
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       // Flush any queued messages
//       this._flushPending(peerId);
//     } else if (packet.type === 2) { // REPLY received
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.ephKeys.delete(peerId);
//       // Flush any queued messages
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };

//     if (!ratchet) {
//       // Key exchange hasn't finished yet – queue the message
//       if (!this.pendingMessages.has(peerId)) {
//         this.pendingMessages.set(peerId, []);
//       }
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }

//     // Ratchet ready – send immediately
//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     // Store in IndexedDB
//     const cid = await this._getOrCreateConversation(peerId);
//     await db.msgs.put({
//       cid,
//       t: msgObj.ts,
//       id: msgObj.id,
//       d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })  // st=0 sent
//     });
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       // Store in IndexedDB
//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })  // st=1 received
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch { /* ignore */ }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//   }
// }

// // Tiny helpers
// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }











// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// import db from '../db/index.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId)
//     if (isOnline && !this.channels.has(userId)) {
//       console.log("Call Intiated");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     if (!this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           // Send full candidate info as JSON
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//           this._startKeyExchange(senderId);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange ----
//   async _startKeyExchange(peerId) {
//     if (this.myUserId < peerId) {
//       console.log("Started key exchange");
//       const keys = await generateKeyPair();
//       console.log("Keys : ", keys);
//       this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//       const init = buildKeyExchangeInit(keys.publicKey);
//       console.log("Build Init : ", init);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//     }
//   }

//   async _handleKeyExchange(peerId, payload) {
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {
//       console.log("Intial key exchange reciever");
//       const myKeys = await generateKeyPair();
//       console.log(myKeys);
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     } else if (packet.type === 2) {
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };

//     if (!ratchet) {
//       if (!this.pendingMessages.has(peerId)) {
//         this.pendingMessages.set(peerId, []);
//       }
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }
//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     const cid = await this._getOrCreateConversation(peerId);
//     await db.msgs.put({
//       cid,
//       t: msgObj.ts,
//       id: msgObj.id,
//       d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//     });
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch { /* ignore */ }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//   }
// }

// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }











// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// // import db from '../db/index.js';
// import db from '../db';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId)
//     // Only the lower user ID initiates the WebRTC connection
//     if (isOnline && this.myUserId < userId && !this.channels.has(userId)) {
//       console.log("Call Intiated (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     // Same rule: only lower ID initiates
//     if (this.myUserId < userId && !this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       console.log("Data channel : ", dc);
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         // Only the initiator (lower ID) starts key exchange
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//           // Receiver does NOT start key exchange – initiator already sent INIT
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange (initiator only) ----
//   async _startKeyExchange(peerId) {
//     console.log("Started key exchange (I am lower ID)");
//     if (this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const keys = await generateKeyPair();
//     console.log("Keys : ", keys);
//     this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//     const init = buildKeyExchangeInit(keys.publicKey);
//     console.log("Build Init : ", init);
//     this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//   }

//   async _handleKeyExchange(peerId, payload) {
//     if (this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {
//       console.log("Initial key exchange received (I am higher ID)");
//       const myKeys = await generateKeyPair();
//       console.log(myKeys);
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     } else if (packet.type === 2) {
//       console.log("Key exchange reply received (I am lower ID)");
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging (unchanged, but uses the ratchets now correctly) ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     console.log(ratchet);
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };
//     console.log(msgObj);

//     if (!ratchet) {
//       if (!this.pendingMessages.has(peerId)) {
//         this.pendingMessages.set(peerId, []);
//       }
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }

//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     const cid = await this._getOrCreateConversation(peerId);
//     console.log("cid : ",cid);
//     console.log("msgObj id : ",msgObj.id);
//     console.log("msgObj ts : ",msgObj.ts);

//     await db.msgs.put({
//       cid,
//       t: msgObj.ts,
//       id: msgObj.id,
//       d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//     });
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch { /* ignore */ }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     console.log("P : ",p);
//     let convo = await db.convos.where('p').equals(p).first();
//     console.log(convo);
//     if (convo) return convo.cid;

//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//   }
// }

// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }












// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// import db from '../db/index.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId)
//     // Only the lower user ID initiates the WebRTC connection
//     if (isOnline && this.myUserId < userId && !this.channels.has(userId)) {
//       console.log("Call Intiated (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     // Same rule: only lower ID initiates
//     if (this.myUserId < userId && !this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       console.log("Data channel : ", dc);
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         // Only the initiator (lower ID) starts key exchange
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//           // Receiver does NOT start key exchange – initiator already sent INIT
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange (initiator only) ----
//   async _startKeyExchange(peerId) {
//     console.log("Started key exchange (I am lower ID)");
//     // Already have ratchets – nothing to do
//     if (this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const keys = await generateKeyPair();
//     console.log("Keys : ", keys);
//     this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//     const init = buildKeyExchangeInit(keys.publicKey);
//     console.log("Build Init : ", init);
//     this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//   }

//   async _handleKeyExchange(peerId, payload) {
//     // Ignore if we already have ratchets for this peer
//     if (this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {
//       console.log("Initial key exchange received (I am higher ID)");
//       const myKeys = await generateKeyPair();
//       console.log(myKeys);
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     } else if (packet.type === 2) {
//       console.log("Key exchange reply received (I am lower ID)");
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     console.log(ratchet);
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };
//     console.log(msgObj);

//     if (!ratchet) {
//       // Key exchange hasn't finished yet – queue the message
//       if (!this.pendingMessages.has(peerId)) {
//         this.pendingMessages.set(peerId, []);
//       }
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }

//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     // Store in IndexedDB – wrapped in try/catch to prevent a crash
//     try {
//       const cid = await this._getOrCreateConversation(peerId);
//       if (cid != null) {
//         await db.msgs.put({
//           cid,
//           t: msgObj.ts,
//           id: msgObj.id,
//           d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//         });
//       }
//     } catch (err) {
//       console.error('Failed to store sent message in DB:', err);
//     }
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch { /* ignore */ }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     // Auto‑generates cid thanks to ++cid schema
//     const newCid = await db.convos.put({ p });
//     return newCid;
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//   }
// }

// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }















// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   computeSharedSecret,
//   deriveRootChainKey,
//   forkRootChainKey,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode, decode } from '@msgpack/msgpack';
// import db from '../db/index.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.keyExchangeDone = new Set();   // peerIds for which key exchange completed successfully
//     this.onMessageCallback = null;
//   }

//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId)
//     if (isOnline && this.myUserId < userId && !this.channels.has(userId)) {
//       console.log("Call Intiated (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     if (this.myUserId < userId && !this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     // Clean up any stale entry from a previous connection
//     if (this.peers.has(userId)) {
//       const oldPc = this.peers.get(userId);
//       oldPc.close();
//       this.peers.delete(userId);
//       this.channels.delete(userId);
//       this.iceCandidates.delete(userId);
//     }

//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       console.log("Data channel : ", dc);
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     let pc = this.peers.get(senderId);

//     // If a stale closed peer exists, discard it
//     if (pc && pc.connectionState === 'closed') {
//       this.peers.delete(senderId);
//       this.channels.delete(senderId);
//       this.iceCandidates.delete(senderId);
//       pc = null;
//     }

//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange ----
//   async _startKeyExchange(peerId) {
//     console.log("Started key exchange (I am lower ID)");
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId)) return;
//     const keys = await generateKeyPair();
//     console.log("Keys : ", keys);
//     this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//     const init = buildKeyExchangeInit(keys.publicKey);
//     console.log("Build Init : ", init);
//     this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//   }

//   async _handleKeyExchange(peerId, payload) {
//     // Ignore if already done or ratchets exist
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const packet = decode(new Uint8Array(payload));
//     if (packet.type === 1) {
//       console.log("Initial key exchange received (I am higher ID)");
//       const myKeys = await generateKeyPair();
//       console.log(myKeys);
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       const shared = await computeSharedSecret(myKeys.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       // Validate chain keys
//       if (!(sending instanceof Uint8Array) || !(receiving instanceof Uint8Array)) {
//         console.error('Invalid chain keys derived');
//         return;
//       }
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     } else if (packet.type === 2) {
//       console.log("Key exchange reply received (I am lower ID)");
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const shared = await computeSharedSecret(stored.secretKey, packet.ephPub);
//       const rootCK = await deriveRootChainKey(shared);
//       const { sending, receiving } = await forkRootChainKey(rootCK, this.myUserId, peerId);
//       if (!(sending instanceof Uint8Array) || !(receiving instanceof Uint8Array)) {
//         console.error('Invalid chain keys derived');
//         return;
//       }
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     console.log('sending ratchet:', ratchet ? 'exists' : 'undefined');
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };

//     if (!ratchet) {
//       if (!this.pendingMessages.has(peerId)) {
//         this.pendingMessages.set(peerId, []);
//       }
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }

//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     console.log('Encrypting with chainKey length:', ratchet.chainKey.length, 'index:', ratchet.index);
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     try {
//       const cid = await this._getOrCreateConversation(peerId);
//       if (cid != null) {
//         await db.msgs.put({
//           cid,
//           t: msgObj.ts,
//           id: msgObj.id,
//           d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//         });
//       }
//     } catch (err) {
//       console.error('Failed to store sent message in DB:', err);
//     }
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     console.log('receiving ratchet:', ratchet ? 'exists' : 'undefined');
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     console.log('Decrypting with chainKey length:', ratchet.chainKey.length, 'expecting index:', ratchet.nextIndex, 'got index:', idx);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch (e) {
//       console.error('Decryption failed:', e);
//     }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//     this.keyExchangeDone.clear();
//   }
// }

// function buildKeyExchangeInit(publicKey) {
//   return encode({ type: 1, ephPub: publicKey });
// }
// function buildKeyExchangeReply(publicKey) {
//   return encode({ type: 2, ephPub: publicKey });
// }












// // src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,          // still uses worker for key generation (fast, one‑time)
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode } from '@msgpack/msgpack';
// import db from '../db/index.js';
// import {
//   completeKeyExchange,
//   buildKeyExchangeInit,
//   buildKeyExchangeReply,
//   decodeKeyExchangePacket,
// } from '../lib/keyExchange.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.keyExchangeDone = new Set();
//     this.onMessageCallback = null;
//   }


//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId);
//     if (isOnline) {
//       const existing = this.channels.get(userId);
//       // Restart if no channel exists or the existing channel is stuck in "connecting"
//       if (!existing || existing.readyState !== 'open') {
//         console.log("Call Intiated");
//         this._initiateCall(userId);
//       }
//     }
//   }


//   // openChat(userId, isOnline) {
//   //   console.log("Online : " , isOnline , "User ID : ", userId)
//   //   // Always initiate if the contact is online and we don't already have a DataChannel
//   //   if (isOnline && !this.channels.has(userId)) {
//   //     console.log("Call Intiated");
//   //     this._initiateCall(userId);
//   //   }
//   // }

//   onPeerOnline(userId) {
//     if (this.myUserId < userId && !this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   async _initiateCall(userId) {
//     if (this.peers.has(userId)) {
//       const oldPc = this.peers.get(userId);
//       oldPc.close();
//       this.peers.delete(userId);
//       this.channels.delete(userId);
//       this.iceCandidates.delete(userId);
//     }
//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);
//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : " , pc)
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       console.log("Data channel : ", dc);
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));
//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//     }
//   }



//   async handleSignal(senderId, subType, payload) {
//     // If this is a new offer (SIGNAL_OFFER), always clean up any existing stale connection
//     if (subType === SIGNAL_OFFER) {
//       if (this.peers.has(senderId)) {
//         this.peers.get(senderId).close();
//         this.peers.delete(senderId);
//         this.channels.delete(senderId);
//         this.iceCandidates.delete(senderId);
//       }
//     }

//     let pc = this.peers.get(senderId);

//     // Create a new peer if none exists
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     // Process the signal as before …
//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }


//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---- Key Exchange (uses main thread) ----
//   async _startKeyExchange(peerId) {
//     console.log("Started key exchange (I am lower ID)");
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId)) return;
//     const keys = await generateKeyPair();
//     this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//     const init = buildKeyExchangeInit(keys.publicKey);
//     console.log("Build Init : ", init);
//     this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//   }

//   async _handleKeyExchange(peerId, payload) {
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const packet = decodeKeyExchangePacket(payload);
//     if (packet.type === 1) {
//       console.log("Initial key exchange received (I am higher ID)");
//       const myKeys = await generateKeyPair();
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
//       // Main‑thread key exchange
//       const { sending, receiving } = await completeKeyExchange(
//         myKeys.secretKey,
//         packet.ephPub,
//         this.myUserId,
//         peerId
//       );
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);
//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     } else if (packet.type === 2) {
//       console.log("Key exchange reply received (I am lower ID)");
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;
//       const { sending, receiving } = await completeKeyExchange(
//         stored.secretKey,
//         packet.ephPub,
//         this.myUserId,
//         peerId
//       );
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---- Encrypted Messaging (worker‑based encrypt/decrypt unchanged) ----
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     console.log('sending ratchet:', ratchet ? 'exists' : 'undefined');
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };
//     if (!ratchet) {
//       if (!this.pendingMessages.has(peerId)) this.pendingMessages.set(peerId, []);
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }
//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     console.log('Encrypting with chainKey length:', ratchet.chainKey.length, 'index:', ratchet.index);
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     try {
//       const cid = await this._getOrCreateConversation(peerId);
//       if (cid != null) {
//         await db.msgs.put({
//           cid,
//           t: msgObj.ts,
//           id: msgObj.id,
//           d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//         });
//       }
//     } catch (err) {
//       console.error('Failed to store sent message in DB:', err);
//     }
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     console.log('receiving ratchet:', ratchet ? 'exists' : 'undefined');
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     console.log('Decrypting with chainKey length:', ratchet.chainKey.length, 'expecting index:', ratchet.nextIndex, 'got index:', idx);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch (e) {
//       console.error('Decryption failed:', e);
//     }
//   }

//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ",header , " Payload : ",payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a,b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   cleanup() {
//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//     this.keyExchangeDone.clear();
//   }
// }








// src/services/webrtcService.js
// import {
//   SIGNAL_OFFER, SIGNAL_ANSWER, SIGNAL_ICE,
//   encodeSignalToTarget,
// } from '../utils/binaryProtocol.js';
// import {
//   generateKeyPair,
//   encrypt,
//   decrypt,
// } from '../lib/cryptoWorker.js';
// import { encode } from '@msgpack/msgpack';
// import db from '../db/index.js';
// import {
//   completeKeyExchange,
//   buildKeyExchangeInit,
//   buildKeyExchangeReply,
//   decodeKeyExchangePacket,
// } from '../lib/keyExchange.js';

// const MSG_KEY_EXCHANGE = 0x01;
// const MSG_ENCRYPTED_CHAT = 0x02;
// const OFFER_TIMEOUT_MS = 5000;

// export class WebRTCManager {
//   constructor(sendFn, userId) {
//     this.sendFn = sendFn;
//     this.myUserId = userId;
//     this.peers = new Map();
//     this.channels = new Map();
//     this.iceCandidates = new Map();
//     this.connecting = new Set();
//     this.sendingRatchet = new Map();
//     this.receivingRatchet = new Map();
//     this.ephKeys = new Map();
//     this.pendingMessages = new Map();
//     this.keyExchangeDone = new Set();
//     this.retryTimers = new Map();       // userId → setTimeout id
//     this.onMessageCallback = null;
//   }

//   // ---------------------------------------------------------------
//   //  PUBLIC API
//   // ---------------------------------------------------------------
//   openChat(userId, isOnline) {
//     console.log("Online : " , isOnline , "User ID : ", userId);
//     if (!isOnline) return;

//     const existing = this.channels.get(userId);
//     // Start if no channel exists, or the existing one is not yet open
//     if (!existing || existing.readyState !== 'open') {
//       console.log("Call Intiated");
//       this._initiateCall(userId);
//     }
//   }

//   onPeerOnline(userId) {
//     // We keep the lower‑ID rule here only to avoid double‑initiation
//     // when both sides receive the online event at the same time.
//     // The actual call will be placed by openChat anyway.
//     if (this.myUserId < userId && !this.channels.has(userId) && !this.connecting.has(userId)) {
//       console.log("On peer online (I am lower ID)");
//       this._initiateCall(userId);
//     }
//   }

//   // ---------------------------------------------------------------
//   //  WEBRTC HANDLING
//   // ---------------------------------------------------------------
//   async _initiateCall(userId) {
//     // 1. Clear any pending retry timer for this user
//     clearTimeout(this.retryTimers.get(userId));
//     this.retryTimers.delete(userId);

//     // 2. Clean up completely any previous connection
//     if (this.peers.has(userId)) {
//       this.peers.get(userId).close();
//       this.peers.delete(userId);
//       this.channels.delete(userId);
//       this.iceCandidates.delete(userId);
//       this.connecting.delete(userId);
//     }

//     if (this.peers.has(userId) || this.connecting.has(userId)) return;
//     this.connecting.add(userId);

//     try {
//       const pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       console.log("RTC connection : ", pc);
//       this.peers.set(userId, pc);
//       this.iceCandidates.set(userId, []);

//       const dc = pc.createDataChannel('chat', { ordered: true });
//       console.log("Data channel : ", dc);
//       this.channels.set(userId, dc);

//       dc.onopen = () => {
//         clearTimeout(this.retryTimers.get(userId));
//         this.retryTimers.delete(userId);
//         this.connecting.delete(userId);
//         console.log(`✅ DataChannel with ${userId}`);
//         this._startKeyExchange(userId);
//       };
//       dc.onmessage = (e) => this._handleDataMessage(userId, e.data);

//       pc.onicecandidate = (event) => {
//         if (event.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: event.candidate.candidate,
//             sdpMid: event.candidate.sdpMid,
//             sdpMLineIndex: event.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(userId, SIGNAL_ICE, icePayload));
//         }
//       };

//       // Create and send the offer
//       const offer = await pc.createOffer();
//       await pc.setLocalDescription(offer);
//       this.sendFn(encodeSignalToTarget(userId, SIGNAL_OFFER, pc.localDescription.sdp));

//       // 3. Set a retry timer – if the DataChannel doesn't open in 5s, retry the whole call
//       this.retryTimers.set(userId, setTimeout(() => {
//         if (this.channels.get(userId)?.readyState !== 'open') {
//           console.log('⚠️  Offer not answered, retrying for', userId);
//           this._initiateCall(userId);
//         }
//       }, OFFER_TIMEOUT_MS));

//     } catch (err) {
//       console.error('WebRTC init fail', err);
//       this.connecting.delete(userId);
//       clearTimeout(this.retryTimers.get(userId));
//       this.retryTimers.delete(userId);
//     }
//   }

//   async handleSignal(senderId, subType, payload) {
//     // ---------------------------------------------------------------
//     // 1. On a new offer, discard any stale connection for this peer
//     // ---------------------------------------------------------------
//     if (subType === SIGNAL_OFFER) {
//       if (this.peers.has(senderId)) {
//         this.peers.get(senderId).close();
//         this.peers.delete(senderId);
//         this.channels.delete(senderId);
//         this.iceCandidates.delete(senderId);
//         this.connecting.delete(senderId);
//       }
//     }

//     let pc = this.peers.get(senderId);

//     // ---------------------------------------------------------------
//     // 2. Create a new peer connection if none exists
//     // ---------------------------------------------------------------
//     if (!pc) {
//       pc = new RTCPeerConnection({
//         iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
//       });
//       this.peers.set(senderId, pc);
//       this.iceCandidates.set(senderId, []);

//       pc.ondatachannel = (event) => {
//         const ch = event.channel;
//         this.channels.set(senderId, ch);
//         ch.onopen = () => {
//           console.log(`✅ DataChannel with ${senderId}`);
//         };
//         ch.onmessage = (e) => this._handleDataMessage(senderId, e.data);
//       };

//       pc.onicecandidate = (e) => {
//         if (e.candidate) {
//           const icePayload = JSON.stringify({
//             candidate: e.candidate.candidate,
//             sdpMid: e.candidate.sdpMid,
//             sdpMLineIndex: e.candidate.sdpMLineIndex,
//           });
//           this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ICE, icePayload));
//         }
//       };
//     }

//     // ---------------------------------------------------------------
//     // 3. Process the signal
//     // ---------------------------------------------------------------
//     if (subType === SIGNAL_OFFER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: payload }));
//       const answer = await pc.createAnswer();
//       await pc.setLocalDescription(answer);
//       this.sendFn(encodeSignalToTarget(senderId, SIGNAL_ANSWER, pc.localDescription.sdp));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ANSWER) {
//       await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload }));
//       this._flushIce(senderId);
//     } else if (subType === SIGNAL_ICE) {
//       const { candidate, sdpMid, sdpMLineIndex } = JSON.parse(payload);
//       const iceCandidate = new RTCIceCandidate({ candidate, sdpMid, sdpMLineIndex });
//       if (pc.remoteDescription) {
//         pc.addIceCandidate(iceCandidate);
//       } else {
//         if (!this.iceCandidates.has(senderId)) this.iceCandidates.set(senderId, []);
//         this.iceCandidates.get(senderId).push(iceCandidate);
//       }
//     }
//   }

//   _flushIce(userId) {
//     const list = this.iceCandidates.get(userId);
//     if (list) {
//       list.forEach(c => this.peers.get(userId).addIceCandidate(c));
//       this.iceCandidates.set(userId, []);
//     }
//   }

//   // ---------------------------------------------------------------
//   //  KEY EXCHANGE (main thread)
//   // ---------------------------------------------------------------
//   async _startKeyExchange(peerId) {
//     console.log("Started key exchange (I am lower ID)");
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId)) return;

//     const keys = await generateKeyPair();
//     this.ephKeys.set(peerId, { secretKey: keys.secretKey });
//     const init = buildKeyExchangeInit(keys.publicKey);
//     console.log("Build Init : ", init);
//     this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...init]));
//   }

//   async _handleKeyExchange(peerId, payload) {
//     if (this.keyExchangeDone.has(peerId) || this.sendingRatchet.has(peerId) || this.receivingRatchet.has(peerId)) return;
//     const packet = decodeKeyExchangePacket(payload);

//     if (packet.type === 1) {
//       console.log("Initial key exchange received (I am higher ID)");
//       const myKeys = await generateKeyPair();
//       this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });

//       const { sending, receiving } = await completeKeyExchange(
//         myKeys.secretKey,
//         packet.ephPub,
//         this.myUserId,
//         peerId
//       );
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);

//       const reply = buildKeyExchangeReply(myKeys.publicKey);
//       console.log("Reply : ", reply);
//       this._sendRaw(peerId, new Uint8Array([MSG_KEY_EXCHANGE, ...reply]));
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);

//     } else if (packet.type === 2) {
//       console.log("Key exchange reply received (I am lower ID)");
//       const stored = this.ephKeys.get(peerId);
//       if (!stored) return;

//       const { sending, receiving } = await completeKeyExchange(
//         stored.secretKey,
//         packet.ephPub,
//         this.myUserId,
//         peerId
//       );
//       this.sendingRatchet.set(peerId, { chainKey: sending, index: 0 });
//       this.receivingRatchet.set(peerId, { chainKey: receiving, nextIndex: 1 });
//       this.keyExchangeDone.add(peerId);
//       this.ephKeys.delete(peerId);
//       this._flushPending(peerId);
//     }
//   }

//   // ---------------------------------------------------------------
//   //  ENCRYPTED MESSAGING
//   // ---------------------------------------------------------------
//   sendMessage(peerId, text) {
//     const ratchet = this.sendingRatchet.get(peerId);
//     console.log('sending ratchet:', ratchet ? 'exists' : 'undefined');
//     const msgObj = { id: crypto.randomUUID(), ts: Date.now(), body: text, type: 'text' };

//     if (!ratchet) {
//       if (!this.pendingMessages.has(peerId)) this.pendingMessages.set(peerId, []);
//       this.pendingMessages.get(peerId).push(msgObj);
//       return;
//     }
//     this._sendEncrypted(peerId, msgObj, ratchet);
//   }

//   async _sendEncrypted(peerId, msgObj, ratchet) {
//     console.log('Encrypting with chainKey length:', ratchet.chainKey.length, 'index:', ratchet.index);
//     const { ciphertext, nextChainKey, index } = await encrypt(msgObj, ratchet.chainKey, ratchet.index);
//     ratchet.chainKey = nextChainKey;
//     ratchet.index = index;

//     const frame = new Uint8Array(4 + ciphertext.length);
//     new DataView(frame.buffer).setUint32(0, index, false);
//     frame.set(ciphertext, 4);
//     const full = new Uint8Array(1 + frame.length);
//     full[0] = MSG_ENCRYPTED_CHAT;
//     full.set(frame, 1);
//     this._sendRaw(peerId, full);

//     try {
//       const cid = await this._getOrCreateConversation(peerId);
//       if (cid != null) {
//         await db.msgs.put({
//           cid,
//           t: msgObj.ts,
//           id: msgObj.id,
//           d: encode({ s: this.myUserId, b: msgObj.body, st: 0 })
//         });
//       }
//     } catch (err) {
//       console.error('Failed to store sent message in DB:', err);
//     }
//   }

//   _flushPending(peerId) {
//     const queue = this.pendingMessages.get(peerId);
//     if (!queue || queue.length === 0) return;
//     const ratchet = this.sendingRatchet.get(peerId);
//     if (!ratchet) return;
//     for (const msgObj of queue) {
//       this._sendEncrypted(peerId, msgObj, ratchet);
//     }
//     this.pendingMessages.set(peerId, []);
//   }

//   async _handleEncryptedMessage(peerId, data) {
//     const ratchet = this.receivingRatchet.get(peerId);
//     console.log('receiving ratchet:', ratchet ? 'exists' : 'undefined');
//     if (!ratchet || data.length < 4) return;
//     const idx = new DataView(data.buffer, data.byteOffset, 4).getUint32(0, false);
//     const ct = data.slice(4);
//     console.log('Decrypting with chainKey length:', ratchet.chainKey.length, 'expecting index:', ratchet.nextIndex, 'got index:', idx);
//     try {
//       const { messageObj, nextChainKey, nextIndex } = await decrypt(ct, ratchet.chainKey, idx, ratchet.nextIndex);
//       ratchet.chainKey = nextChainKey;
//       ratchet.nextIndex = nextIndex;

//       const cid = await this._getOrCreateConversation(peerId);
//       await db.msgs.put({
//         cid,
//         t: messageObj.ts,
//         id: messageObj.id,
//         d: encode({ s: peerId, b: messageObj.body, st: 1 })
//       });

//       if (this.onMessageCallback) {
//         this.onMessageCallback(peerId, messageObj);
//       }
//     } catch (e) {
//       console.error('Decryption failed:', e);
//     }
//   }

//   // ---------------------------------------------------------------
//   //  DATA CHANNEL MESSAGE ROUTER
//   // ---------------------------------------------------------------
//   _handleDataMessage(peerId, data) {
//     console.log("Peer ID : ", peerId);
//     const arr = new Uint8Array(data);
//     if (arr.length === 0) return;
//     const header = arr[0];
//     const payload = arr.slice(1);
//     console.log("Header : ", header, " Payload : ", payload);
//     if (header === MSG_KEY_EXCHANGE) this._handleKeyExchange(peerId, payload);
//     else if (header === MSG_ENCRYPTED_CHAT) this._handleEncryptedMessage(peerId, payload);
//   }

//   _sendRaw(peerId, data) {
//     const ch = this.channels.get(peerId);
//     console.log("Channel State : ", ch?.readyState);
//     if (ch?.readyState === 'open') ch.send(data);
//   }

//   // ---------------------------------------------------------------
//   //  INDEXEDDB CONVERSATION HELPERS
//   // ---------------------------------------------------------------
//   async _getOrCreateConversation(peerId) {
//     const ids = [this.myUserId, peerId].sort((a, b) => a - b);
//     const p = ids.join('_');
//     let convo = await db.convos.where('p').equals(p).first();
//     if (convo) return convo.cid;
//     return await db.convos.put({ p });
//   }

//   // ---------------------------------------------------------------
//   //  CLEANUP
//   // ---------------------------------------------------------------
//   cleanup() {
//     for (const timer of this.retryTimers.values()) clearTimeout(timer);
//     this.retryTimers.clear();

//     for (const pc of this.peers.values()) pc.close();
//     this.peers.clear();
//     this.channels.clear();
//     this.iceCandidates.clear();
//     this.connecting.clear();
//     this.ephKeys.clear();
//     this.sendingRatchet.clear();
//     this.receivingRatchet.clear();
//     this.pendingMessages.clear();
//     this.keyExchangeDone.clear();
//   }
// }