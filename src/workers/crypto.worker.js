// src/workers/crypto.worker.js
import nacl from 'tweetnacl';
import { encode, decode } from '@msgpack/msgpack';

async function hmacSHA256(key, data) {
  const cryptoKey = await crypto.subtle.importKey('raw', key, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
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
const MESSAGE_KEY_SEED = new Uint8Array([1]);
const CHAIN_KEY_SEED = new Uint8Array([2]);

function wipeBytes(bytes) { if (bytes) bytes.fill(0); }

async function advanceRatchet(chainKey) {
  const mk = await hmacSHA256(chainKey, MESSAGE_KEY_SEED);
  const nck = await hmacSHA256(chainKey, CHAIN_KEY_SEED);
  return { messageKey: mk, nextChainKey: nck };
}

self.onmessage = async (e) => {
  const { id, action, payload } = e.data;
  let result;
  const transfer = [];

  try {
    switch (action) {
      case 'GENERATE_KEYPAIR': {
        const kp = nacl.box.keyPair();
        result = { publicKey: kp.publicKey, secretKey: kp.secretKey };
        transfer.push(kp.publicKey.buffer, kp.secretKey.buffer);
        break;
      }
      case 'COMPUTE_SHARED': {
        const shared = nacl.scalarMult(payload.secretKey, payload.peerPublicKey);
        result = shared;
        transfer.push(shared.buffer);
        wipeBytes(payload.secretKey);
        break;
      }
      case 'DERIVE_ROOT': {
        const rootCK = await hkdf(payload.sharedSecret, SALT, INFO_ROOT_CK, 32);
        result = rootCK;
        transfer.push(rootCK.buffer);
        wipeBytes(payload.sharedSecret);
        break;
      }
      case 'FORK_ROOT': {
        const { rootCK, myId, peerId } = payload;
        const ckLower = await hmacSHA256(rootCK, new Uint8Array([3]));
        const ckHigher = await hmacSHA256(rootCK, new Uint8Array([4]));
        const sending = myId < peerId ? ckLower : ckHigher;
        const receiving = myId < peerId ? ckHigher : ckLower;
        result = { sending, receiving };
        transfer.push(sending.buffer, receiving.buffer);
        wipeBytes(rootCK);
        break;
      }
      case 'ENCRYPT': {
        const { messageObj, chainKey, index } = payload;
        const plaintext = encode(messageObj);
        const { messageKey, nextChainKey } = await advanceRatchet(chainKey);
        const newIndex = index + 1;
        const nonce = new Uint8Array(24);
        new DataView(nonce.buffer).setUint32(0, newIndex, false);
        const ciphertext = nacl.secretbox(plaintext, nonce, messageKey);
        result = { ciphertext, nextChainKey, index: newIndex };
        transfer.push(ciphertext.buffer, nextChainKey.buffer);
        wipeBytes(messageKey, plaintext);
        break;
      }
      case 'DECRYPT': {
        const { ciphertext, chainKey, messageIndex, nextIndex } = payload;
        const ratchet = { chainKey, nextIndex };
        while (ratchet.nextIndex < messageIndex) {
          const { nextChainKey } = await advanceRatchet(ratchet.chainKey);
          ratchet.chainKey = nextChainKey;
          ratchet.nextIndex++;
        }
        if (ratchet.nextIndex !== messageIndex) throw new Error('stale');
        const { messageKey, nextChainKey } = await advanceRatchet(ratchet.chainKey);
        const nonce = new Uint8Array(24);
        new DataView(nonce.buffer).setUint32(0, messageIndex, false);
        const plaintext = nacl.secretbox.open(ciphertext, nonce, messageKey);
        wipeBytes(messageKey);
        if (!plaintext) throw new Error('auth fail');
        const decoded = decode(plaintext);
        wipeBytes(plaintext);
        result = { messageObj: decoded, nextChainKey, nextIndex: ratchet.nextIndex + 1 };
        transfer.push(nextChainKey.buffer);
        break;
      }
      // ---- NEW: Random nonce symmetric encrypt/decrypt ----
      case 'ENCRYPT_SYMMETRIC_RANDOM': {
        const { messageObj, key } = payload;
        const plaintext = encode(messageObj);
        const nonce = new Uint8Array(24);
        crypto.getRandomValues(nonce);
        const ciphertext = nacl.secretbox(plaintext, nonce, key);
        result = { nonce, ciphertext };
        transfer.push(nonce.buffer, ciphertext.buffer);
        wipeBytes(plaintext);
        break;
      }
      case 'DECRYPT_SYMMETRIC_RANDOM': {
        const { ciphertext, key, nonce } = payload;
        const plaintext = nacl.secretbox.open(ciphertext, nonce, key);
        if (!plaintext) throw new Error('auth fail');
        const decoded = decode(plaintext);
        wipeBytes(plaintext);
        result = { messageObj: decoded };
        break;
      }
      // ---- Keep old symmetric actions for compatibility (not used anymore) ----
      case 'ENCRYPT_SYMMETRIC': {
        const { messageObj, key, counter } = payload;
        const plaintext = encode(messageObj);
        const nonce = new Uint8Array(24);
        new DataView(nonce.buffer).setUint32(0, counter, false);
        const ciphertext = nacl.secretbox(plaintext, nonce, key);
        result = ciphertext;
        transfer.push(ciphertext.buffer);
        wipeBytes(plaintext);
        break;
      }
      case 'DECRYPT_SYMMETRIC': {
        const { ciphertext, key, counter } = payload;
        const nonce = new Uint8Array(24);
        new DataView(nonce.buffer).setUint32(0, counter, false);
        const plaintext = nacl.secretbox.open(ciphertext, nonce, key);
        if (!plaintext) throw new Error('auth fail');
        const decoded = decode(plaintext);
        wipeBytes(plaintext);
        result = { messageObj: decoded };
        break;
      }
      default:
        throw new Error(`Unknown action: ${action}`);
    }
    self.postMessage({ id, result }, transfer);
  } catch (error) {
    console.error('Worker action error:', action, error);
    self.postMessage({ id, error: error.message });
  }
};