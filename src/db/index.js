// src/db/index.js
import Dexie from 'dexie';

const db = new Dexie('LightningChat');

db.version(1).stores({
  contacts: 'u',
  convos:   '++cid, p',
  msgs:     '[cid+t+id], [cid+id], [cid+t]',   // three indexes for fast lookups
  sessions: 'peerId',
});

export default db;