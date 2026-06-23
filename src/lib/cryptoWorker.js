// src/lib/cryptoWorker.js
let worker = null;
let reqId = 0;
const pending = new Map();

function getWorker() {
  if (!worker) {
    worker = new Worker(new URL('../workers/crypto.worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = (e) => {
      const { id, result, error } = e.data;
      const { resolve, reject } = pending.get(id);
      pending.delete(id);
      if (error) reject(new Error(error));
      else resolve(result);
    };
    worker.onerror = () => {
      for (const [id, { reject }] of pending) {
        reject(new Error('Worker error'));
        pending.delete(id);
      }
    };
  }
  return worker;
}

function callWorker(action, payload, transfer = []) {
  return new Promise((resolve, reject) => {
    const id = ++reqId;
    pending.set(id, { resolve, reject });
    getWorker().postMessage({ id, action, payload }, transfer);
  });
}

export const generateKeyPair = () => callWorker('GENERATE_KEYPAIR');
export const computeSharedSecret = (secretKey, peerPublicKey) =>
  callWorker('COMPUTE_SHARED', { secretKey, peerPublicKey });
export const deriveRootChainKey = (sharedSecret) =>
  callWorker('DERIVE_ROOT', { sharedSecret });
export const forkRootChainKey = (rootCK, myId, peerId) =>
  callWorker('FORK_ROOT', { rootCK, myId, peerId });
export const encrypt = (messageObj, chainKey, index) =>
  callWorker('ENCRYPT', { messageObj, chainKey, index });
export const decrypt = (ciphertext, chainKey, messageIndex, nextIndex) =>
  callWorker('DECRYPT', { ciphertext, chainKey, messageIndex, nextIndex });
export const encryptSymmetric = (messageObj, key, counter) =>
  callWorker('ENCRYPT_SYMMETRIC', { messageObj, key, counter });
export const decryptSymmetric = (ciphertext, key, counter) =>
  callWorker('DECRYPT_SYMMETRIC', { ciphertext, key, counter });

// New random-nonce functions
export const encryptSymmetricRandom = (messageObj, key) =>
  callWorker('ENCRYPT_SYMMETRIC_RANDOM', { messageObj, key });
export const decryptSymmetricRandom = (ciphertext, key, nonce) =>
  callWorker('DECRYPT_SYMMETRIC_RANDOM', { ciphertext, key, nonce });