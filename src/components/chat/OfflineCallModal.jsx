// src/components/chat/OfflineCallModal.jsx
import { motion, AnimatePresence } from 'framer-motion';

const OfflineCallModal = ({ isOpen, contactName, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="glass-effect rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-2xl w-full max-w-sm text-center"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-red-400/20 to-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-red-400/30">
              <i className="fas fa-user-slash text-red-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Unable to Call</h2>
            <p className="text-color text-base mb-8">
              <span className="text-white font-semibold">{contactName}</span> is currently offline.
              Please try again when they are online.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-primary to-primary-dark text-dark-bg font-semibold py-3 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary/30"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineCallModal;