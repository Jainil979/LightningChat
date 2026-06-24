// src/pages/Chat.jsx
import { useState, useEffect, useCallback, useRef } from 'react';
import ChatSidebar from '../components/chat/ChatSidebar';
import ChatWindow from '../components/chat/ChatWindow';
import AddContactModal from '../components/chat/AddContactModal';
import ProfileModal from '../components/chat/ProfileModal';
import VideoCallOverlay from '../components/chat/VideoCallOverlay';
import VoiceCallOverlay from '../components/chat/VoiceCallOverlay';
import IncomingCallModal from '../components/chat/IncomingCallModal';
import db from '../db';
import useWebSocket from '../hooks/useWebSocket';
import { useAuth } from '../context/AuthContext';
import { decode } from '@msgpack/msgpack';
import { VideoCallManager } from '../services/videoCallService';
import { encodeTypingToTarget } from '../utils/binaryProtocol';   // 👈 new import
import OfflineCallModal from '../components/chat/OfflineCallModal';

// ---------- Helpers (outside component to keep stable) ----------
const truncate = (text) => (text.length > 28 ? text.slice(0, 28) + '...' : text);
const formatTime = (ts) => new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);

  // ---------- Unified call states ----------
  const [activeCall, setActiveCall] = useState(null);   // { type: 'video'|'voice', localStream, remoteStream }
  const [incomingCall, setIncomingCall] = useState(null); // { name, userId, senderId, callType }

  // ---------- Typing indicator state ----------
  const [typingPeerId, setTypingPeerId] = useState(null);   // 👈 new

  const [offlineCallModal, setOfflineCallModal] = useState(false);
  const [offlineCallName, setOfflineCallName] = useState('');

  const { user } = useAuth();
  const { send } = useWebSocket();          // binary WebSocket sender
  const activeContactRef = useRef(null);

  // Refs that always hold the latest call state (used inside stable event listeners)
  const activeCallRef = useRef(activeCall);
  const incomingCallRef = useRef(incomingCall);
  useEffect(() => { activeCallRef.current = activeCall; }, [activeCall]);
  useEffect(() => { incomingCallRef.current = incomingCall; }, [incomingCall]);

  // Keep activeContactRef in sync
  useEffect(() => {
    activeContactRef.current = activeContact;
  }, [activeContact]);

  // ---------- Load contacts with last message ----------
  const loadContacts = useCallback(async () => {
    if (!user) return;

    const allContacts = await db.contacts.toArray();

    const list = await Promise.all(
      allContacts.map(async (c) => {
        const ids = [Number(user.userId), c.u].sort((a, b) => a - b);
        const p = ids.join('_');
        const convo = await db.convos.where('p').equals(p).first();

        let lastMessage = 'No messages yet';
        let time = '';

        if (convo) {
          const msgs = await db.msgs
            .where('cid')
            .equals(convo.cid)
            .sortBy('t');           // uses [cid+t] index, returns sorted ascending

          if (msgs.length > 0) {
            const lastMsg = msgs[msgs.length - 1];
            const d = decode(lastMsg.d);
            const text = d.b || '';
            lastMessage = text.length > 28 ? text.slice(0, 28) + '...' : text;
            time = formatTime(lastMsg.t);
          }
        }

        return {
          id: c.u,
          name: c.name,
          online: c.o,
          lastSeen: c.ls,
          lastMessage,
          time,
        };
      })
    );

    setContacts(list);
  }, [user]);

  useEffect(() => {
    loadContacts();
    window.addEventListener('presence-updated', loadContacts);
    return () => window.removeEventListener('presence-updated', loadContacts);
  }, [loadContacts]);

  // ------------------------------------------------------------------
  //  Wait for the global ChatService to be ready, then attach callbacks
  // ------------------------------------------------------------------
  useEffect(() => {
    const onReady = () => {
      if (!window.__chatService) return;

      // Attach incoming message callback
      window.__chatService.onMessageCallback = (senderId, msgObj) => {
        const currentActive = activeContactRef.current;
        setMessages((prev) =>
          currentActive === senderId
            ? [
                ...prev,
                {
                  id: msgObj.id,
                  sender: 'them',
                  text: msgObj.body,
                  time: formatTime(msgObj.ts),
                  sent: false,
                  status: 1, // delivered
                },
              ]
            : prev
        );

        // Instantly update sidebar last message for the sender
        setContacts((prev) =>
          prev.map((c) =>
            c.id === senderId
              ? { ...c, lastMessage: truncate(msgObj.body || ''), time: formatTime(msgObj.ts) }
              : c
          )
        );
      };

      // Update online status from already loaded contacts
      contacts.forEach((c) =>
        window.__chatService.setOnlineStatus(c.id, c.online)
      );

      // If a contact is already selected, make the service aware
      if (activeContact) {
        window.__chatService.setActiveChat(activeContact);
      }
    };

    if (window.__chatService) {
      onReady();
    }

    window.addEventListener('chatservice-ready', onReady);
    return () => {
      window.removeEventListener('chatservice-ready', onReady);
    };
  }, [contacts, activeContact]);

  // Update online statuses in the service whenever contacts change
  useEffect(() => {
    if (!window.__chatService) return;
    contacts.forEach((c) =>
      window.__chatService.setOnlineStatus(c.id, c.online)
    );
  }, [contacts]);

  // Keep the service informed about which chat is currently open
  useEffect(() => {
    if (window.__chatService) {
      if (activeContact) {
        window.__chatService.setActiveChat(activeContact);
      } else {
        window.__chatService.clearActiveChat();
      }
    }
    return () => {
      if (window.__chatService) {
        window.__chatService.clearActiveChat();
      }
    };
  }, [activeContact]);

  // ------------------------------------------------------------------
  //  Real‑time message status updates
  // ------------------------------------------------------------------
  useEffect(() => {
    const handler = (e) => {
      const { peerId, updates } = e.detail;
      if (activeContact === peerId) {
        setMessages((prev) => {
          const updated = [...prev];
          for (const { msgId, newStatus } of updates) {
            const idx = updated.findIndex((m) => m.id === msgId);
            if (idx !== -1) {
              updated[idx] = { ...updated[idx], status: newStatus };
            }
          }
          return updated;
        });
      }
    };

    window.addEventListener('message-status-changed', handler);
    return () =>
      window.removeEventListener('message-status-changed', handler);
  }, [activeContact]);

  // ------------------------------------------------------------------
  //  Load messages when activeContact changes
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!activeContact || !user) return;
    (async () => {
      const ids = [Number(user.userId), activeContact].sort((a, b) => a - b);
      const p = ids.join('_');
      const convo = await db.convos.where('p').equals(p).first();
      if (!convo) {
        setMessages([]);
        return;
      }
      const rows = await db.msgs.where('cid').equals(convo.cid).sortBy('t');
      setMessages(
        rows.map((r) => {
          const d = decode(r.d);
          return {
            id: r.id,
            sender: d.s === Number(user.userId) ? 'You' : 'them',
            text: d.b,
            time: formatTime(r.t),
            sent: d.s === Number(user.userId),
            status: d.st || 0,
          };
        })
      );
    })();
  }, [activeContact, user]);

  // ------------------------------------------------------------------
  //  Call helpers (video + voice)
  // ------------------------------------------------------------------

  // Generic start call function
  const startCall = useCallback((mediaType) => {
    if (!activeContact || activeCallRef.current) return;

    const contact = contacts.find(c => c.id === activeContact);
    if (!contact) return;

    // Show offline modal and stop if the peer is offline
    if (!contact.online) {
      setOfflineCallName(contact.name);
      setOfflineCallModal(true);
      return;
    }

    const myName = user ? `${user.firstName} ${user.lastName}` : 'You';
    const manager = new VideoCallManager(send, Number(user.userId));
    manager.onLocalStream = (stream) =>
      setActiveCall((prev) =>
        prev ? { ...prev, localStream: stream } : { type: mediaType, localStream: stream, remoteStream: null }
      );
    manager.onRemoteStream = (stream) =>
      setActiveCall((prev) =>
        prev ? { ...prev, remoteStream: stream } : { type: mediaType, localStream: null, remoteStream: stream }
      );
    manager.onCallEnded = () => {
      setActiveCall(null);
      window.__videoCallManager = null;
    };
    manager.onError = (err) => {
      console.error(`${mediaType} call error:`, err);
      setActiveCall(null);
      window.__videoCallManager = null;
    };
    window.__videoCallManager = manager;
    manager.startCall(activeContact, myName, mediaType);
    setActiveCall({ type: mediaType, localStream: null, remoteStream: null });
  }, [activeContact, user, send, contacts]);

  const startVideoCall = useCallback(() => startCall('video'), [startCall]);
  const startVoiceCall = useCallback(() => startCall('voice'), [startCall]);

  // Use a ref for the temporary manager so we don't lose it
  const tempManagerRef = useRef(null);

  // Stable incoming offer listener – never re‑attached
  useEffect(() => {
    const handler = () => {
      if (activeCallRef.current || incomingCallRef.current) return;
      const offerData = window.pendingVideoOffer;
      if (!offerData) return;

      const tempManager = new VideoCallManager(send, Number(user.userId));
      const callerInfo = tempManager.receiveOffer(offerData.senderId, offerData.payload);
      if (callerInfo) {
        setIncomingCall({ ...callerInfo, senderId: offerData.senderId });
        tempManagerRef.current = tempManager;
      }
      window.pendingVideoOffer = null;
    };
    window.addEventListener('incoming-video-offer', handler);
    return () => window.removeEventListener('incoming-video-offer', handler);
  }, [send, user]);   // stable dependencies only – no call state

  // Accept incoming call (video or voice)
  const acceptIncomingCall = useCallback(async () => {
    if (!incomingCall || !tempManagerRef.current) return;
    const manager = tempManagerRef.current;
    tempManagerRef.current = null;
    window.__videoCallManager = manager;

    const callType = incomingCall.callType || 'video';
    manager.onLocalStream = (stream) =>
      setActiveCall((prev) =>
        prev ? { ...prev, localStream: stream } : { type: callType, localStream: stream, remoteStream: null }
      );
    manager.onRemoteStream = (stream) =>
      setActiveCall((prev) =>
        prev ? { ...prev, remoteStream: stream } : { type: callType, localStream: null, remoteStream: stream }
      );
    manager.onCallEnded = () => {
      setActiveCall(null);
      window.__videoCallManager = null;
    };
    manager.onError = (err) => {
      console.error(`${callType} call error:`, err);
      setActiveCall(null);
      window.__videoCallManager = null;
    };

    setIncomingCall(null);
    setActiveCall({ type: callType, localStream: null, remoteStream: null });
    await manager.acceptIncomingCall();
  }, [incomingCall, send, user]);

  // Decline incoming call
  const declineIncomingCall = useCallback(() => {
    if (tempManagerRef.current) {
      tempManagerRef.current.declineIncomingCall();
      tempManagerRef.current = null;
    }
    setIncomingCall(null);
  }, []);

  // Hang up current call
  const hangUpCall = useCallback(() => {
    if (window.__videoCallManager) {
      window.__videoCallManager.hangUp();
    }
  }, []);

  // ------------------------------------------------------------------
  //  Typing indicator handlers
  // ------------------------------------------------------------------
  // Listen for incoming typing events
  useEffect(() => {
    const handler = (e) => {
      const { userId } = e.detail;
      setTypingPeerId(userId);
      // Auto‑clear after 3 seconds if no further typing events arrive
      setTimeout(() => setTypingPeerId(prev => prev === userId ? null : prev), 3000);
    };
    window.addEventListener('typing-indicator', handler);
    return () => window.removeEventListener('typing-indicator', handler);
  }, []);

  // Send typing signal when the user starts typing
  const handleTypingStart = useCallback(() => {
    if (activeContact) {
      const frame = encodeTypingToTarget(activeContact);
      send(frame);
    }
  }, [activeContact, send]);

  // ------------------------------------------------------------------
  //  User actions (chat)
  // ------------------------------------------------------------------
  const handleSelectContact = useCallback(
    (id) => {
      setActiveContact(id);
      setShowSidebar(false);
      const contact = contacts.find((c) => c.id === id);
      if (contact && window.__chatService) {
        window.__chatService.openChat(id);
      }
    },
    [contacts]
  );

  const handleSendMessage = useCallback(
    (text) => {
      if (!activeContact || !window.__chatService) return;
      const msgId = crypto.randomUUID();
      const ts = Date.now();

      setMessages((prev) => [
        ...prev,
        {
          id: msgId,
          sender: 'You',
          text,
          time: formatTime(ts),
          sent: true,
          status: 0, // pending
        },
      ]);

      // Instantly update sidebar last message for the active contact
      setContacts((prev) =>
        prev.map((c) =>
          c.id === activeContact
            ? { ...c, lastMessage: truncate(text), time: formatTime(ts) }
            : c
        )
      );

      // Pass the same id and timestamp so the service uses them
      window.__chatService.sendMessage(activeContact, text, { msgId, ts });
    },
    [activeContact]
  );

  const handleAddContact = useCallback((contact) => {
    setContacts((prev) =>
      prev.find((c) => c.id === contact.id) ? prev : [...prev, contact]
    );
    setActiveContact(contact.id);
    setShowAddModal(false);
  }, []);

  // ------------------------------------------------------------------
  //  Render
  // ------------------------------------------------------------------
  return (
    <div className="h-screen flex bg-dark-bg overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-darker-bg border-r border-border-color transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ChatSidebar
          contacts={contacts}
          activeContact={activeContact}
          onSelectContact={handleSelectContact}
          onAddContact={() => setShowAddModal(true)}
          onProfileOpen={() => setShowProfileModal(true)}
          onClose={() => setShowSidebar(false)}
        />
      </div>
      {showSidebar && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
      <div className="flex-1 flex flex-col min-w-0">
        <ChatWindow
          activeContact={contacts.find((c) => c.id === activeContact)}
          messages={messages}
          onSendMessage={handleSendMessage}
          onMenuClick={() => setShowSidebar(true)}
          onAddContact={() => setShowAddModal(true)}
          onVideoCall={startVideoCall}
          onVoiceCall={startVoiceCall}
          isTyping={typingPeerId === activeContact}         // 👈 new
          onTypingStart={handleTypingStart}                 // 👈 new
        />
      </div>
      <AddContactModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddContact}
      />
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      {/* Video call overlay */}
      {activeCall && activeCall.type === 'video' && (
        <VideoCallOverlay
          localStream={activeCall.localStream}
          remoteStream={activeCall.remoteStream}
          onHangUp={hangUpCall}
        />
      )}

      {/* Voice call overlay */}
      {activeCall && activeCall.type === 'voice' && (
        <VoiceCallOverlay
          localStream={activeCall.localStream}
          remoteStream={activeCall.remoteStream}
          contactName={activeContact ? contacts.find(c => c.id === activeContact)?.name : ''}
          onHangUp={hangUpCall}
        />
      )}

      {/* Incoming call modal */}
      <IncomingCallModal
        isOpen={!!incomingCall}
        callerName={incomingCall?.name || 'Unknown'}
        callType={incomingCall?.callType || 'video'}
        onAccept={acceptIncomingCall}
        onDecline={declineIncomingCall}
      />

      {/* Offline call modal */}
      <OfflineCallModal
        isOpen={offlineCallModal}
        contactName={offlineCallName}
        onClose={() => setOfflineCallModal(false)}
      />
    </div>
  );
};

export default Chat;