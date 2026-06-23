// src/components/chat/AddContactModal.jsx
import { useState, useEffect } from 'react';
import { addContact } from '../../services/contactsService';
import db from '../../db';   // Dexie instance

const AddContactModal = ({ isOpen, onClose, onAdd }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) setVisible(true);
    else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => onClose();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Email is required.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const contact = await addContact(email.trim());
      const fullName = `${contact.firstName} ${contact.lastName}`;
      await db.contacts.put({
        u: contact.userId,
        name: fullName,
        o: false,
        ls: null,
      });

      window.dispatchEvent(new CustomEvent('contacts-changed'));
      
      onAdd({
        id: contact.userId,
        name: fullName,
        online: false,
        lastMessage: 'No messages yet',
        time: '',
      });
      setEmail('');
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Failed to add contact.');
      setLoading(false);
    }
  };

  if (!visible && !isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-200`}
      onClick={handleClose}
    >
      <div
        className={`glass-effect rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl w-full max-w-md transform relative ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        } transition-all duration-200 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-text hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-comments text-dark-bg text-2xl"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            New <span className="gradient-text">Conversation</span>
          </h2>
          <p className="text-color">Enter the email of the person you want to chat with privately.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email field – identical structure to signup form */}
          <div>
            <div className="relative">
              <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm sm:text-base"></i>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                required
                placeholder="Email address"
                className={`w-full pl-11 pr-4 py-3 sm:py-4 bg-dark-bg/60 border rounded-xl text-white placeholder-gray-text outline-none transition focus:ring-2 focus:ring-primary/20 ${
                  error ? 'border-red-400 focus:border-red-400' : 'border-border-color focus:border-primary'
                }`}
              />
            </div>
            {/* Error message outside relative container – no reserved space */}
            {error && (
              <p className="text-red-400 text-xs mt-1 ml-2 flex items-center gap-1">
                <i className="fas fa-exclamation-circle text-xs"></i>
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3.5 rounded-xl font-semibold border border-border-color text-gray-text hover:text-white hover:border-gray-text transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-primary to-primary-dark text-dark-bg font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin text-dark-bg"></i>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <i className="fas fa-search text-dark-bg"></i>
                  <span>Find User</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContactModal;