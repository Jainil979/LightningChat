// src/components/chat/ChatSidebar.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightningChatLogo from '../common/LightningChatLogo';
import { useAuth } from '../../context/AuthContext';

const ChatSidebar = ({
  contacts,
  activeContact,
  onSelectContact,
  onAddContact,
  onProfileOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0)?.toUpperCase() || '';
    const last = parts.length > 1 ? parts[1]?.charAt(0)?.toUpperCase() : '';
    return `${first}${last}`;
  };

  // Filter contacts case‑insensitively
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredContacts = normalizedQuery
    ? contacts.filter((c) => c.name.toLowerCase().includes(normalizedQuery))
    : contacts;

  return (
    <div className="h-full flex flex-col">
      <div className="p-5 border-b border-border-color flex items-center justify-between">
        <div className="scale-[0.98] origin-left">
          <LightningChatLogo />
        </div>
        <button
          onClick={onClose}
          className="lg:hidden text-white/95 hover:text-white transition-colors"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <div className="p-4 space-y-3">
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-text text-sm"></i>
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-dark-bg border border-[#5c6368] rounded-xl text-white placeholder-gray-text text-sm outline-none focus:border-primary transition-colors"
          />
        </div>
        <button
          onClick={onAddContact}
          className="w-full bg-primary/10 border border-primary/20 text-primary rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/20 transition-colors flex items-center justify-center gap-2"
        >
          <i className="fas fa-plus"></i>
          <span>Add Contact</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto chat-sidebar-scroll px-2 space-y-1">
        <AnimatePresence>
          {/* No contacts at all */}
          {contacts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center px-6 py-10"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-user-friends text-primary text-3xl"></i>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">No contacts yet</h3>
              <p className="text-white/80 text-sm mb-5">
                Add someone by email to start a private, encrypted conversation.
              </p>
              <button
                onClick={onAddContact}
                className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Add Contact
              </button>
            </motion.div>
          ) : filteredContacts.length === 0 ? (
            /* Search returned no results */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center px-6 py-10"
            >
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                <i className="fas fa-search text-primary text-3xl"></i>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">No contacts found</h3>
              <p className="text-white/80 text-sm mb-5">
                Try a different name or add a new contact.
              </p>
              <button
                onClick={onAddContact}
                className="bg-gradient-to-r from-primary to-primary-dark text-dark-bg px-5 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
              >
                Add Contact
              </button>
            </motion.div>
          ) : (
            filteredContacts.map((chat, idx) => (
              <motion.div
                key={chat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelectContact(chat.id)}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors group ${
                  activeContact === chat.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-card-bg/60'
                }`}
              >
                {/* Wrapper for initials + online dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#3BEDB2] flex items-center justify-center text-[#0C1624] font-bold text-sm border-2 border-border-color">
                    {getInitials(chat.name)}
                  </div>
                  {chat.online && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-primary rounded-full border-2 border-darker-bg" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-white font-semibold truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-text ml-2 flex-shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-gray-text text-sm truncate">{chat.lastMessage}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* User's own profile at bottom */}
      <div className="p-4 border-t border-border-color">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#3BEDB2] flex items-center justify-center text-[#0C1624] font-bold text-sm border-2 border-border-color flex-shrink-0">
            {user ? getInitials(`${user.firstName} ${user.lastName}`) : '?'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">
              {user ? `${user.firstName} ${user.lastName}` : 'You'}
            </p>
            <p className="text-[#4aecb6] text-xs">Online</p>
          </div>
          <button
            onClick={onProfileOpen}
            className="text-white/90 hover:text-white transition-colors"
          >
            <i className="fas fa-cog"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;