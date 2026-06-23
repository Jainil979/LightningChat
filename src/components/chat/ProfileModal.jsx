// src/components/chat/ProfileModal.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/userService';   // 👈 new import

const ProfileModal = ({ isOpen, onClose }) => {
  const { user, logout, updateUser } = useAuth();            // 👈 destructure updateUser
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [visible, setVisible] = useState(false);

  // Sync visibility for CSS transition
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Reset fields when modal opens with current user data
  useEffect(() => {
    if (isOpen && user) {
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
      setError('');
      setSuccess('');
    }
  }, [isOpen, user]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setError('Both fields are required.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      // Call the blazing‑fast protobuf API (authFetch handles refresh)
      const updated = await updateProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });

      // Update the in‑memory user immediately – no extra network call
      updateUser({
        firstName: updated.firstName,
        lastName: updated.lastName,
      });

      setSuccess('Profile updated successfully.');
    } catch (err) {
      setError(err.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate('/');
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
        className={`glass-effect rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl w-full max-w-md relative transform ${
          isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        } transition-all duration-200 ease-out`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button (plain X) */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-gray-text hover:text-white transition-colors"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
            <i className="fas fa-user-circle text-dark-bg text-2xl"></i>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Your <span className="gradient-text">Profile</span>
          </h2>
          <p className="text-color">Manage your account details</p>
        </div>

        {/* Email (read-only) */}
        <div className="mb-4">
          <label className="text-gray-text text-sm mb-1 block">Email</label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm"></i>
            <div className="w-full pl-11 pr-4 py-3 bg-dark-bg/60 border border-border-color rounded-xl text-white truncate">
              {user?.email || 'Not available'}
            </div>
          </div>
        </div>

        {/* First Name */}
        <div className="mb-4">
          <label className="text-gray-text text-sm mb-1 block">First Name</label>
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm"></i>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-dark-bg/60 border border-border-color rounded-xl text-white placeholder-gray-text outline-none focus:border-primary transition"
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="mb-4">
          <label className="text-gray-text text-sm mb-1 block">Last Name</label>
          <div className="relative">
            <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-text text-sm"></i>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-dark-bg/60 border border-border-color rounded-xl text-white placeholder-gray-text outline-none focus:border-primary transition"
            />
          </div>
        </div>

        {/* Success / Error messages */}
        {error && (
          <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 rounded-lg p-3 mb-4">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-primary text-sm bg-primary/10 rounded-lg p-3 mb-4">
            <i className="fas fa-check-circle"></i>
            <span>{success}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-dark-bg font-semibold py-3.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:brightness-110 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? (
              <>
                <i className="fas fa-spinner fa-spin text-dark-bg"></i>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <i className="fas fa-save text-dark-bg"></i>
                <span>Save Changes</span>
              </>
            )}
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => { handleClose(); navigate('/'); }}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-white/10 to-white/5 border border-white/10 text-white hover:from-white/20 hover:to-white/10 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-home"></i>
              <span>Home</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex-1 py-3 rounded-xl font-semibold bg-gradient-to-r from-red-500/20 to-red-500/10 border border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-red-500/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <i className="fas fa-sign-out-alt"></i>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;