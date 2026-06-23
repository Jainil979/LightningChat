// src/hooks/useWebSocket.js
import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getWsTicket } from '../services/authService';
import db from '../db';
import {
  encodeSubscribe,
  decodeMessage,
  decodeSignalFromServer,
  decodeKeyExchangeFromServer,
  decodeRelayFromServer,
  decodeAckFromServer,
  decodeVideoSignalFromServer,
  TYPE_PRESENCE,
  TYPE_SIGNAL,
  TYPE_KEY_EXCHANGE_INIT,
  TYPE_KEY_EXCHANGE_REPLY,
  TYPE_RELAY,
  TYPE_DELIVERY_ACK,
  TYPE_READ_ACK,
  TYPE_VIDEO_SIGNAL,
  VIDEO_OFFER,
  TYPE_TYPING , decodeTypingFromServer
} from '../utils/binaryProtocol';
import { ChatService } from '../services/chatService';

const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3001'; // 'ws:///10.191.183.33:3001';  
const RECONNECT_DELAY = 5000;
const MAX_RETRIES = 10; // prevent infinite reconnect loops

export default function useWebSocket() {
  const { isAuthenticated, user } = useAuth();
  const wsRef = useRef(null);
  const reconnectTimerRef = useRef(null);
  const retryCountRef = useRef(0);

  // Keep a ref that mirrors the latest authentication state
  const isAuthenticatedRef = useRef(isAuthenticated);
  useEffect(() => {
    isAuthenticatedRef.current = isAuthenticated;
    // Reset retry count whenever auth state changes
    if (!isAuthenticated) {
      retryCountRef.current = 0;
    }
  }, [isAuthenticated]);

  const sendSubscribe = useCallback(async () => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return;
    const all = await db.contacts.toArray();
    const ids = all.map(c => Number(c.u));
    wsRef.current.send(encodeSubscribe(ids));
  }, []);

  const send = useCallback((data) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(data);
    }
  }, []);

  const connect = useCallback(async () => {
    // 1. Immediately abort if logged out
    if (!isAuthenticatedRef.current) return;

    // 2. Abort if we've exceeded max retries
    if (retryCountRef.current >= MAX_RETRIES) {
      console.warn('Max reconnect retries reached – stopping');
      return;
    }

    try {
      const ticket = await getWsTicket();
      // Re-check auth after async ticket fetch
      if (!isAuthenticatedRef.current) return;

      const ws = new WebSocket(`${WS_URL}?ticket=${encodeURIComponent(ticket)}`);
      ws.binaryType = 'arraybuffer';

      ws.onopen = async () => {
        // Successfully connected – reset retry counter
        retryCountRef.current = 0;

        await sendSubscribe();

        if (user && !window.__chatService) {
          const service = new ChatService(send, Number(user.userId));
          window.__chatService = service;

          const allContacts = await db.contacts.toArray();
          allContacts.forEach(c => service.setOnlineStatus(c.u, c.o));

          window.dispatchEvent(new CustomEvent('chatservice-ready'));
        }
      };

      ws.onmessage = async (event) => {
        try {
          const decoded = decodeMessage(event.data);
          const { type, payload } = decoded;

          if (type === TYPE_PRESENCE) {
            const { userId, status, lastSeen } = payload;
            const contact = await db.contacts.get(Number(userId));
            if (contact) {
              const newOnline = status === 'online';
              if (contact.o !== newOnline || (newOnline ? false : contact.ls !== (lastSeen || Date.now()))) {
                await db.contacts.put({
                  ...contact,
                  o: newOnline,
                  ls: newOnline ? null : (lastSeen || Date.now()),
                });
                window.dispatchEvent(new CustomEvent('presence-updated'));
                if (newOnline) {
                  window.dispatchEvent(new CustomEvent('peer-online', { detail: { userId } }));
                }
              }
              if (window.__chatService) {
                window.__chatService.setOnlineStatus(userId, newOnline);
              }
            }
          } 
          else if (type === TYPE_TYPING) {
            const { senderId } = decodeTypingFromServer(event.data);
            window.dispatchEvent(new CustomEvent('typing-indicator', { detail: { userId: senderId } }));
          }
          else if (type === TYPE_KEY_EXCHANGE_INIT || type === TYPE_KEY_EXCHANGE_REPLY) {
            const { senderId, subType, payload: kePayload } = decodeKeyExchangeFromServer(event.data);
            if (window.__chatService) {
              window.__chatService.handleKeyExchange(senderId, subType, kePayload);
            }
          } else if (type === TYPE_RELAY) {
            const { senderId, payload: relayPayload } = decodeRelayFromServer(event.data);
            if (window.__chatService) {
              window.__chatService.handleRelay(senderId, relayPayload);
            }
          } else if (type === TYPE_DELIVERY_ACK || type === TYPE_READ_ACK) {
            const { senderId, ackType, msgId } = decodeAckFromServer(event.data);   // now returns msgId
            if (window.__chatService) {
              if (ackType === TYPE_DELIVERY_ACK) {
                window.__chatService.handleDeliveryAck(senderId, msgId);
              } else if (ackType === TYPE_READ_ACK) {
                window.__chatService.handleReadAck(senderId, msgId);
              }
            }
          } else if (type === TYPE_VIDEO_SIGNAL) {
            const { senderId, subType, payload: videoPayload } = decodeVideoSignalFromServer(event.data);
            if (subType === VIDEO_OFFER) {
              window.pendingVideoOffer = { senderId, subType, payload: videoPayload };
              window.dispatchEvent(new CustomEvent('incoming-video-offer', { detail: { senderId } }));
            } else {
              if (window.__videoCallManager) {
                window.__videoCallManager.handleSignal(senderId, subType, videoPayload);
              }
            }
          }
        } catch { /* ignore malformed */ }
      };

      ws.onclose = () => {
        // Only reconnect if still authenticated and we haven't hit the limit
        if (isAuthenticatedRef.current && retryCountRef.current < MAX_RETRIES) {
          retryCountRef.current += 1;
          reconnectTimerRef.current = setTimeout(connect, RECONNECT_DELAY);
        }
      };

      ws.onerror = () => ws.close();

      wsRef.current = ws;
    } catch {
      // Only retry if still authenticated and under the limit
      if (isAuthenticatedRef.current && retryCountRef.current < MAX_RETRIES) {
        retryCountRef.current += 1;
        reconnectTimerRef.current = setTimeout(connect, RECONNECT_DELAY);
      }
    }
  }, [sendSubscribe, send, user]);

  useEffect(() => {
    const handler = () => sendSubscribe();
    window.addEventListener('contacts-changed', handler);
    return () => window.removeEventListener('contacts-changed', handler);
  }, [sendSubscribe]);

  useEffect(() => {
    if (isAuthenticated) {
      // Reset retry count when user logs in
      retryCountRef.current = 0;
      connect();
    } else {
      clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      if (window.__chatService) {
        window.__chatService = null;
      }
      retryCountRef.current = 0;
    }
    return () => {
      clearTimeout(reconnectTimerRef.current);
      if (wsRef.current) wsRef.current.close();
    };
  }, [isAuthenticated, connect]);

  return { send };
}