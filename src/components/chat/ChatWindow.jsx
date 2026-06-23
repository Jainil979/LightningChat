// src/components/chat/ChatWindow.jsx
import { useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';          // 👈 new import
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const ChatWindow = ({
  activeContact,
  messages,
  onSendMessage,
  onMenuClick,
  onAddContact,
  onVideoCall,
  onVoiceCall,
  isTyping,            // 👈 new prop
  onTypingStart,        // 👈 new prop
}) => {
  const messagesEndRef = useRef(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => { scrollToBottom(); }, [messages , isTyping]);

  const handleSend = (text) => {
    if (onSendMessage) onSendMessage(text);
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0)?.toUpperCase() || '';
    const last = parts.length > 1 ? parts[1]?.charAt(0)?.toUpperCase() : '';
    return `${first}${last}`;
  };

  const getLastSeenText = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const dateStr = date.toLocaleDateString([], {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const timeStr = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return `last seen ${dateStr}, ${timeStr}`;
  };

  if (!activeContact) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md"
        >
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <i className="fas fa-comments text-primary text-4xl"></i>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Welcome to <span className="gradient-text">LightningChat</span>
          </h2>
          <p className="text-color text-sm sm:text-base mb-8">
            Select a conversation from the sidebar or add a new contact to start a private,
            peer‑to‑peer encrypted chat.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onAddContact}
              className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-6 py-3 rounded-xl font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <i className="fas fa-plus"></i>
              <span>Add Contact</span>
            </button>
            <button
              onClick={onMenuClick}
              className="lg:hidden border-2 border-primary text-primary px-6 py-3 rounded-xl font-semibold hover:bg-primary hover:text-dark-bg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-users"></i>
              <span>View Contacts</span>
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="chat-header flex items-center justify-between py-2.5 px-4 sm:py-3.5 sm:px-5">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden text-white hover:text-white transition-colors mr-2"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#3BEDB2] flex items-center justify-center text-[#0C1624] font-bold text-xs sm:text-sm border-2 border-border-color flex-shrink-0">
            {getInitials(activeContact.name)}
          </div>
          <div>
            <div className="font-semibold text-sm sm:text-base text-white leading-tight">
              {activeContact.name}
            </div>
            <div
              className={`text-xs leading-tight ${
                activeContact.online ? 'text-online-green' : 'text-gray-text'
              }`}
            >
              {activeContact.online
                ? 'Online'
                : activeContact.lastSeen
                ? getLastSeenText(activeContact.lastSeen)
                : 'Offline'}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Video call button */}
          <button
            onClick={onVideoCall}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <i className="fas fa-video text-primary text-xs sm:text-sm"></i>
          </button>

          {/* Voice call button */}
          <button
            onClick={onVoiceCall}
            className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <i className="fas fa-phone text-primary text-xs sm:text-sm"></i>
          </button>
        </div>
      </div>
      <div className="chat-messages flex-1 !h-auto">
        {messages.map((msg) => (
          <MessageBubble
            key={msg.id}
            message={msg}
            contactName={activeContact.name}
            userName={user ? `${user.firstName} ${user.lastName}` : 'You'}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Typing indicator – only when the active contact is typing */}
      {isTyping && (
        <div className="px-4 pb-2">
          <TypingIndicator />
        </div>
      )}

      <ChatInput onSend={handleSend} onTypingStart={onTypingStart} />
    </div>
  );
};

export default ChatWindow;