// src/utils/binaryProtocol.js

// ---------- Varint helpers ----------
function encodeVarint(value) {
  const bytes = [];
  while (value >= 0x80) {
    bytes.push((value % 0x80) | 0x80);
    value = Math.floor(value / 0x80);
  }
  bytes.push(value & 0x7f);
  return new Uint8Array(bytes);
}

function decodeVarint(arr, offset) {
  let result = 0, shift = 0, pos = offset;
  while (pos < arr.length) {
    const byte = arr[pos++];
    result += (byte & 0x7f) * (2 ** shift);
    if (!(byte & 0x80)) break;
    shift += 7;
  }
  return { value: result, length: pos - offset };
}

// ---------- Types ----------
export const TYPE_SUBSCRIBE = 0x01;
export const TYPE_PRESENCE  = 0x02;
export const TYPE_SIGNAL    = 0x03;
export const TYPE_RELAY     = 0x04;
export const TYPE_KEY_EXCHANGE_INIT  = 0x05;
export const TYPE_KEY_EXCHANGE_REPLY = 0x06;

// ---------- SUBSCRIBE ----------
export function encodeSubscribe(userIds) {
  const count = userIds.length;
  let totalLen = 2;
  const encoded = userIds.map(id => {
    const enc = encodeVarint(id);
    totalLen += enc.length;
    return enc;
  });
  const buf = new Uint8Array(totalLen);
  let offset = 0;
  buf[offset++] = TYPE_SUBSCRIBE;
  buf[offset++] = count;
  for (const enc of encoded) {
    buf.set(enc, offset);
    offset += enc.length;
  }
  return buf;
}

// ---------- PRESENCE decode ----------
export function decodeMessage(buffer) {
  const arr = new Uint8Array(buffer);
  const type = arr[0];
  if (type === TYPE_SUBSCRIBE) {
    const count = arr[1];
    const ids = [];
    let offset = 2;
    for (let i = 0; i < count; i++) {
      const { value, length } = decodeVarint(arr, offset);
      ids.push(value);
      offset += length;
    }
    return { type, payload: ids };
  }
  if (type === TYPE_PRESENCE) {
    const status = arr[1] === 1;
    let offset = 2;
    const { value: userId, length: idLen } = decodeVarint(arr, offset);
    offset += idLen;
    let lastSeen = null;
    if (!status && offset < arr.length) {
      const { value: ts, length: tsLen } = decodeVarint(arr, offset);
      lastSeen = ts;
      offset += tsLen;
    }
    return { type, payload: { userId, status: status ? 'online' : 'offline', lastSeen } };
  }
  // For other types return the raw type
  return { type, payload: null };
}

// ---------- SIGNAL (unchanged) ----------
export const SIGNAL_OFFER  = 0x01;
export const SIGNAL_ANSWER = 0x02;
export const SIGNAL_ICE    = 0x03;

export function encodeSignalToTarget(targetUserId, subType, payloadUtf8) {
  const targetBytes = encodeVarint(targetUserId);
  const enc = new TextEncoder();
  const payloadBytes = enc.encode(payloadUtf8);
  const len = payloadBytes.length;
  const headerSize = 1 + targetBytes.length + 1 + 2;
  const buf = new Uint8Array(headerSize + len);
  let offset = 0;
  buf[offset++] = TYPE_SIGNAL;
  buf.set(targetBytes, offset); offset += targetBytes.length;
  buf[offset++] = subType;
  buf[offset++] = (len >> 8) & 0xFF;
  buf[offset++] = len & 0xFF;
  buf.set(payloadBytes, offset);
  return buf;
}

export function decodeSignalFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  let offset = 1;
  const { value: senderId, length: idLen } = decodeVarint(arr, offset);
  offset += idLen;
  const subType = arr[offset++];
  const payloadLen = (arr[offset] << 8) | arr[offset + 1];
  offset += 2;
  const decoder = new TextDecoder();
  const payload = decoder.decode(arr.slice(offset, offset + payloadLen));
  return { senderId, subType, payload };
}

// ---------- RELAY ----------
export function encodeRelayToTarget(targetUserId, encryptedPayload) {
  const targetBytes = encodeVarint(targetUserId);
  const buf = new Uint8Array(1 + targetBytes.length + encryptedPayload.length);
  let offset = 0;
  buf[offset++] = TYPE_RELAY;
  buf.set(targetBytes, offset); offset += targetBytes.length;
  buf.set(encryptedPayload, offset);
  return buf;
}

export function decodeRelayFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  let offset = 1; // skip type
  const { value: senderId, length: idLen } = decodeVarint(arr, offset);
  offset += idLen;
  const payload = arr.slice(offset);
  return { senderId, payload };
}

// ---------- KEY EXCHANGE (binary payload) ----------
export function encodeKeyExchangeToTarget(targetUserId, subType, payloadBytes) {
  const targetBytes = encodeVarint(targetUserId);
  const buf = new Uint8Array(1 + targetBytes.length + payloadBytes.length);
  let offset = 0;
  buf[offset++] = subType;
  buf.set(targetBytes, offset); offset += targetBytes.length;
  buf.set(payloadBytes, offset);
  return buf;
}

export function decodeKeyExchangeFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  const subType = arr[0];
  let offset = 1;
  const { value: senderId, length: idLen } = decodeVarint(arr, offset);
  offset += idLen;
  const payload = arr.slice(offset);
  return { senderId, subType, payload };
}

// ---------- ACKS (updated for message IDs) ----------
export const TYPE_DELIVERY_ACK = 0x07;
export const TYPE_READ_ACK     = 0x08;

/**
 * Encode an ACK frame (client → server).
 * Layout: [type byte][varint targetUserId][2‑byte length][UTF‑8 msgId]
 */
export function encodeAckToTarget(targetUserId, ackType, msgId) {
  const targetBytes = encodeVarint(targetUserId);
  const enc = new TextEncoder();
  const msgBytes = enc.encode(msgId);
  const len = msgBytes.length;
  const buf = new Uint8Array(1 + targetBytes.length + 2 + len);
  let offset = 0;
  buf[offset++] = ackType;
  buf.set(targetBytes, offset); offset += targetBytes.length;
  buf[offset++] = (len >> 8) & 0xFF;
  buf[offset++] = len & 0xFF;
  buf.set(msgBytes, offset);
  return buf;
}

/**
 * Decode an ACK frame from server.
 * Returns { senderId, ackType, msgId }
 */
export function decodeAckFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  const ackType = arr[0];
  let offset = 1;
  const { value: senderId, length: idLen } = decodeVarint(arr, offset);
  offset += idLen;
  const msgLen = (arr[offset] << 8) | arr[offset + 1];
  offset += 2;
  const decoder = new TextDecoder();
  const msgId = decoder.decode(arr.slice(offset, offset + msgLen));
  return { senderId, ackType, msgId };
}

// ---------- VIDEO CALL SIGNALS ----------
export const TYPE_VIDEO_SIGNAL = 0x10;
export const VIDEO_OFFER   = 0x01;
export const VIDEO_ANSWER  = 0x02;
export const VIDEO_ICE     = 0x03;
export const VIDEO_HANGUP  = 0x04;

export function encodeVideoSignalToTarget(targetUserId, subType, payloadUtf8) {
  const targetBytes = encodeVarint(targetUserId);
  const enc = new TextEncoder();
  const payloadBytes = enc.encode(payloadUtf8);
  const len = payloadBytes.length;
  const headerSize = 1 + targetBytes.length + 1 + 2;
  const buf = new Uint8Array(headerSize + len);
  let offset = 0;
  buf[offset++] = TYPE_VIDEO_SIGNAL;
  buf.set(targetBytes, offset); offset += targetBytes.length;
  buf[offset++] = subType;
  buf[offset++] = (len >> 8) & 0xFF;
  buf[offset++] = len & 0xFF;
  buf.set(payloadBytes, offset);
  return buf;
}

export function decodeVideoSignalFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  let offset = 1; // skip type
  const { value: senderId, length: idLen } = decodeVarint(arr, offset);
  offset += idLen;
  const subType = arr[offset++];
  const payloadLen = (arr[offset] << 8) | arr[offset + 1];
  offset += 2;
  const decoder = new TextDecoder();
  const payload = decoder.decode(arr.slice(offset, offset + payloadLen));
  return { senderId, subType, payload };
}


export const TYPE_TYPING = 0x09;

/**
 * Encode typing signal (client → server)
 * Layout: [0x09][varint targetUserId]
 */
export function encodeTypingToTarget(targetUserId) {
  const targetBytes = encodeVarint(targetUserId);
  const buf = new Uint8Array(1 + targetBytes.length);
  buf[0] = TYPE_TYPING;
  buf.set(targetBytes, 1);
  return buf;
}

/**
 * Decode typing signal from server
 * Layout: [0x09][varint senderUserId]
 */
export function decodeTypingFromServer(buffer) {
  const arr = new Uint8Array(buffer);
  let offset = 1; // skip type
  const { value: senderId, length } = decodeVarint(arr, offset);
  return { senderId };
}