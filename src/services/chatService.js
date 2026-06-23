// src/services/chatService.js
import {
  encodeKeyExchangeToTarget,
  encodeRelayToTarget,
  encodeAckToTarget,
  TYPE_KEY_EXCHANGE_INIT,
  TYPE_KEY_EXCHANGE_REPLY,
  TYPE_DELIVERY_ACK,
  TYPE_READ_ACK,
} from '../utils/binaryProtocol.js';
import {
  generateKeyPair,
  encryptSymmetricRandom,
  decryptSymmetricRandom,
} from '../lib/cryptoWorker.js';
import {
  completeKeyExchange,
  buildKeyExchangeInit,
  buildKeyExchangeReply,
} from '../lib/keyExchange.js';
import { encode, decode } from '@msgpack/msgpack';
import db from '../db/index.js';

const MSG_ENCRYPTED_CHAT = 0x02;

export class ChatService {
  constructor(sendFn, userId) {
    this.sendFn = sendFn;
    this.myUserId = userId;
    this.sessionKeys = new Map();         // peerId → { sending, receiving }
    this.ephKeys = new Map();             // peerId → { secretKey }
    this.keyExchangeDone = new Set();     // peerIds with completed key exchange
    this.onlineStatus = new Map();        // peerId → boolean
    this.activeChatPeerId = null;         // currently open chat (or null)
    this.onMessageCallback = null;        // (senderId, msgObj) => void
    this.keyExchangePromises = new Map(); // peerId → { promise, resolve }

    window.__chatService = this;
    this._readyPromise = this._loadSessions();
  }

  // -------------------- PERSISTENCE --------------------
  async _loadSessions() {
    const all = await db.sessions.toArray();
    for (const s of all) {
      this.sessionKeys.set(s.peerId, {
        sending: s.sending,
        receiving: s.receiving,
      });
      this.keyExchangeDone.add(s.peerId);
    }
  }

  async _saveSession(peerId) {
    await this._readyPromise;
    const keys = this.sessionKeys.get(peerId);
    if (!keys) return;
    await db.sessions.put({
      peerId,
      sending: keys.sending,
      receiving: keys.receiving,
    });
  }

  // -------------------- ONLINE / OFFLINE --------------------
  setOnlineStatus(peerId, online) {
    const wasOffline = !this.onlineStatus.get(peerId);
    this.onlineStatus.set(peerId, online);
    if (online && wasOffline) {
      this._flushPending(peerId);
    }
  }

  // -------------------- PUBLIC API --------------------
  async openChat(peerId) {
    await this._readyPromise;
    // Send read receipt for all unseen messages when the user opens the chat
    this._sendReadAck(peerId);
    if (!this.sessionKeys.has(peerId)) {
      this._startKeyExchange(peerId);
    }
  }

  setActiveChat(peerId) {
    this.activeChatPeerId = peerId;
    if (peerId != null) {
      this._sendReadAck(peerId);
    }
  }

  clearActiveChat() {
    this.activeChatPeerId = null;
  }

  async sendMessage(peerId, text, { msgId, ts } = {}) {
    await this._readyPromise;
    const keys = this.sessionKeys.get(peerId);
    if (!keys) {
      console.warn('No session key for', peerId);
      return;
    }
    const msgObj = {
      id: msgId || crypto.randomUUID(),
      ts: ts || Date.now(),
      body: text,
      type: 'text',
    };

    // Store locally with status 0 (pending)
    await this._storeMessage(msgObj, peerId, 0);

    if (!this.onlineStatus.get(peerId)) return;

    // Encrypt with random nonce
    const { nonce, ciphertext } = await encryptSymmetricRandom(msgObj, keys.sending);

    // Build inner frame: [type][24‑byte nonce][ciphertext]
    const innerFrame = new Uint8Array(1 + 24 + ciphertext.length);
    innerFrame[0] = MSG_ENCRYPTED_CHAT;
    innerFrame.set(nonce, 1);
    innerFrame.set(ciphertext, 25);

    const relayFrame = encodeRelayToTarget(peerId, innerFrame);
    this.sendFn(relayFrame);

    // Mark as delivered locally
    await this._markMessageSent(peerId, msgObj);
    this._dispatchStatusChange(peerId, [{ msgId: msgObj.id, newStatus: 1 }]);
  }

  // -------------------- ENCRYPTION & RELAY (for pending messages) --------------------
  async _sendEncrypted(peerId, msgObj, keys) {
    const { nonce, ciphertext } = await encryptSymmetricRandom(msgObj, keys.sending);

    const innerFrame = new Uint8Array(1 + 24 + ciphertext.length);
    innerFrame[0] = MSG_ENCRYPTED_CHAT;
    innerFrame.set(nonce, 1);
    innerFrame.set(ciphertext, 25);

    const relayFrame = encodeRelayToTarget(peerId, innerFrame);
    this.sendFn(relayFrame);
  }

  // -------------------- PENDING MESSAGES FLUSH --------------------
  async _flushPending(peerId) {
    await this._readyPromise;

    if (!this.keyExchangeDone.has(peerId)) {
      await this._startKeyExchange(peerId);
      const pendingExchange = this.keyExchangePromises.get(peerId);
      if (pendingExchange) await pendingExchange.promise;
    }

    const keys = this.sessionKeys.get(peerId);
    if (!keys) return;

    const cid = await this._getOrCreateConversation(peerId);
    const all = await db.msgs.where('cid').equals(cid).sortBy('t');
    const updates = [];

    for (const row of all) {
      const payload = decode(row.d);
      if (payload.s === this.myUserId && payload.st === 0) {
        const msgObj = {
          id: row.id,
          ts: row.t,
          body: payload.b,
          type: payload.t || 'text',
        };
        await this._sendEncrypted(peerId, msgObj, keys);
        payload.st = 1;
        await db.msgs.put({
          cid: row.cid,
          t: row.t,
          id: row.id,
          d: encode(payload),
        });
        updates.push({ msgId: row.id, newStatus: 1 });
      }
    }

    if (updates.length > 0) this._dispatchStatusChange(peerId, updates);
  }

  // -------------------- KEY EXCHANGE --------------------
  async handleKeyExchange(senderId, subType, payload) {
    await this._readyPromise;
    if (this.keyExchangeDone.has(senderId)) return;
    const packet = decode(payload);

    if (subType === TYPE_KEY_EXCHANGE_INIT) {
      const myKeys = await generateKeyPair();
      this.ephKeys.set(senderId, { secretKey: myKeys.secretKey });
      const { sending, receiving } = await completeKeyExchange(
        myKeys.secretKey,
        packet.ephPub,
        this.myUserId,
        senderId
      );
      this.sessionKeys.set(senderId, { sending, receiving });
      this.keyExchangeDone.add(senderId);
      await this._saveSession(senderId);

      const pendingExchange = this.keyExchangePromises.get(senderId);
      if (pendingExchange) {
        pendingExchange.resolve();
        this.keyExchangePromises.delete(senderId);
      }

      await this._flushPending(senderId);

      const replyPayload = buildKeyExchangeReply(myKeys.publicKey);
      const replyFrame = encodeKeyExchangeToTarget(
        senderId,
        TYPE_KEY_EXCHANGE_REPLY,
        replyPayload
      );
      this.sendFn(replyFrame);
      this.ephKeys.delete(senderId);
    } else if (subType === TYPE_KEY_EXCHANGE_REPLY) {
      const stored = this.ephKeys.get(senderId);
      if (!stored) return;
      const { sending, receiving } = await completeKeyExchange(
        stored.secretKey,
        packet.ephPub,
        this.myUserId,
        senderId
      );
      this.sessionKeys.set(senderId, { sending, receiving });
      this.keyExchangeDone.add(senderId);
      await this._saveSession(senderId);

      const pendingExchange = this.keyExchangePromises.get(senderId);
      if (pendingExchange) {
        pendingExchange.resolve();
        this.keyExchangePromises.delete(senderId);
      }

      await this._flushPending(senderId);
      this.ephKeys.delete(senderId);
    }
  }

  // -------------------- INCOMING RELAY --------------------
  async handleRelay(senderId, innerFrame) {
    await this._readyPromise;
    const keys = this.sessionKeys.get(senderId);
    if (!keys) return;

    const nonce = innerFrame.slice(1, 25);
    const ciphertext = innerFrame.slice(25);

    try {
      const { messageObj } = await decryptSymmetricRandom(ciphertext, keys.receiving, nonce);
      // Store with status 1 (delivered)
      await this._storeMessage({ ...messageObj, s: senderId }, senderId, 1);

      // Send delivery ACK
      this._sendDeliveryAck(senderId, messageObj.id);

      if (this.onMessageCallback) {
        this.onMessageCallback(senderId, messageObj);
      }

      // If the user is currently viewing this chat, send read ACK immediately
      if (senderId === this.activeChatPeerId) {
        this._sendReadAck(senderId);
      }
    } catch (e) {
      console.error('Decryption failed', e);
    }
  }

  // -------------------- ACKNOWLEDGEMENTS --------------------
  _sendDeliveryAck(peerId, msgId) {
    if (!msgId) return;
    const frame = encodeAckToTarget(peerId, TYPE_DELIVERY_ACK, msgId);
    this.sendFn(frame);
  }

  // Looks up the most recent received message from the peer in IndexedDB
  // and sends a READ_ACK with that message's ID.
  // This single ACK will mark all older delivered messages as read.
  async _sendReadAck(peerId) {
    await this._readyPromise;
    const cid = await this._getOrCreateConversation(peerId);

    // Find the most recent message received FROM this peer
    const all = await db.msgs
      .where('cid')
      .equals(cid)
      .sortBy('t');

    // Walk from the end to find the last message we received
    let msgId = null;
    for (let i = all.length - 1; i >= 0; i--) {
      const d = decode(all[i].d);
      if (d.s === peerId) {
        msgId = all[i].id;
        break;
      }
    }

    if (!msgId) return;   // nothing received yet

    const frame = encodeAckToTarget(peerId, TYPE_READ_ACK, msgId);
    this.sendFn(frame);
  }

  async handleDeliveryAck(senderId, msgId) {
    if (!msgId) return;
    await this._readyPromise;
    const cid = await this._getOrCreateConversation(senderId);
    const row = await db.msgs.where({ cid, id: msgId }).first();
    if (row) {
      const payload = decode(row.d);
      if (payload.s === this.myUserId && payload.st === 0) {
        payload.st = 1;
        await db.msgs.put({ cid: row.cid, t: row.t, id: row.id, d: encode(payload) });
        this._dispatchStatusChange(senderId, [{ msgId, newStatus: 1 }]);
      }
    }
  }

  async handleReadAck(senderId, msgId) {
    if (!msgId) return;
    await this._readyPromise;
    const cid = await this._getOrCreateConversation(senderId);

    // Get the timestamp of the referenced message
    const refRow = await db.msgs.where({ cid, id: msgId }).first();
    if (!refRow) return;
    const refTimestamp = refRow.t;

    // Mark ALL our messages up to that timestamp as read (st=2)
    const all = await db.msgs.where('cid').equals(cid).sortBy('t');
    const updates = [];

    for (const row of all) {
      const payload = decode(row.d);
      if (payload.s === this.myUserId && payload.st < 2 && row.t <= refTimestamp) {
        payload.st = 2;
        await db.msgs.put({ cid: row.cid, t: row.t, id: row.id, d: encode(payload) });
        updates.push({ msgId: row.id, newStatus: 2 });
      }
    }

    if (updates.length > 0) {
      this._dispatchStatusChange(senderId, updates);
    }
  }

  _dispatchStatusChange(peerId, updates) {
    window.dispatchEvent(
      new CustomEvent('message-status-changed', {
        detail: { peerId, updates },
      })
    );
  }

  // -------------------- INTERNAL HELPERS --------------------
  async _startKeyExchange(peerId) {
    await this._readyPromise;

    if (this.keyExchangePromises.has(peerId)) return;

    let resolve;
    const promise = new Promise((r) => { resolve = r; });
    this.keyExchangePromises.set(peerId, { promise, resolve });

    const myKeys = await generateKeyPair();
    this.ephKeys.set(peerId, { secretKey: myKeys.secretKey });
    const initPayload = buildKeyExchangeInit(myKeys.publicKey);
    const frame = encodeKeyExchangeToTarget(
      peerId,
      TYPE_KEY_EXCHANGE_INIT,
      initPayload
    );
    this.sendFn(frame);
  }

  async _storeMessage(msgObj, peerId, status) {
    const cid = await this._getOrCreateConversation(peerId);
    if (cid != null) {
      const senderId = msgObj.s != null ? msgObj.s : this.myUserId;
      await db.msgs.put({
        cid,
        t: msgObj.ts,
        id: msgObj.id,
        d: encode({ s: senderId, b: msgObj.body, st: status, t: msgObj.type || 'text' }),
      });
    }
  }

  async _markMessageSent(peerId, msgObj) {
    const cid = await this._getOrCreateConversation(peerId);
    const row = await db.msgs.get({ cid, t: msgObj.ts, id: msgObj.id });
    if (row) {
      const payload = decode(row.d);
      payload.st = 1;
      await db.msgs.put({ cid: row.cid, t: row.t, id: row.id, d: encode(payload) });
    }
  }

  async _getOrCreateConversation(peerId) {
    const ids = [this.myUserId, peerId].sort((a, b) => a - b);
    const p = ids.join('_');
    let convo = await db.convos.where('p').equals(p).first();
    if (convo) return convo.cid;
    return await db.convos.put({ p });
  }
}