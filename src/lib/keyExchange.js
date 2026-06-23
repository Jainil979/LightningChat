// src/lib/keyExchange.js
// Key‑exchange functions running on the main thread (no worker, no transfer issues)

import nacl from 'tweetnacl';
import { encode, decode } from '@msgpack/msgpack';

// ---------- Web Crypto helpers (same as worker, but used directly) ----------
async function hmacSHA256(key, data) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, data);
  return new Uint8Array(sig);
}

async function hkdf(sharedSecret, salt, info, length) {
  const ikm = await crypto.subtle.importKey('raw', sharedSecret, 'HKDF', false, ['deriveBits']);
  const params = { name: 'HKDF', hash: 'SHA-256', salt, info };
  const derived = await crypto.subtle.deriveBits(params, ikm, length * 8);
  return new Uint8Array(derived);
}

const INFO_ROOT_CK = new TextEncoder().encode('lightningchat-root-chain-key-v1');
const SALT = new Uint8Array(32);

/**
 * Full key exchange from the initiator’s side.
 * @param {Uint8Array} mySecretKey - our ephemeral secret
 * @param {Uint8Array} peerPublicKey - peer’s ephemeral public key
 * @param {number} myUserId
 * @param {number} peerId
 * @returns {{ sending: Uint8Array, receiving: Uint8Array }}
 */
export async function completeKeyExchange(mySecretKey, peerPublicKey, myUserId, peerId) {
  const shared = nacl.scalarMult(mySecretKey, peerPublicKey);
  const rootCK = await hkdf(shared, SALT, INFO_ROOT_CK, 32);

  // Fork rootCK
  const ckLower = await hmacSHA256(rootCK, new Uint8Array([3]));
  const ckHigher = await hmacSHA256(rootCK, new Uint8Array([4]));

  const sending = myUserId < peerId ? ckLower : ckHigher;
  const receiving = myUserId < peerId ? ckHigher : ckLower;

  // Wipe sensitive data
  shared.fill(0);
  rootCK.fill(0);

  return { sending, receiving };
}

/**
 * Build a key‑exchange INIT packet.
 */
export function buildKeyExchangeInit(publicKey) {
  return encode({ type: 1, ephPub: publicKey });
}

/**
 * Build a key‑exchange REPLY packet.
 */
export function buildKeyExchangeReply(publicKey) {
  return encode({ type: 2, ephPub: publicKey });
}

/**
 * Decode a key‑exchange packet.
 */
export function decodeKeyExchangePacket(data) {
  return decode(new Uint8Array(data));
}