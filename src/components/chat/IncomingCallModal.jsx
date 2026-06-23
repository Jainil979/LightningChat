// src/components/chat/IncomingCallModal.jsx
import { motion, AnimatePresence } from 'framer-motion';

const IncomingCallModal = ({ isOpen, callerName, callType, onAccept, onDecline }) => {
  const isVoice = callType === 'voice';

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
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-5">
              <i className={`fas ${isVoice ? 'fa-phone' : 'fa-video'} text-dark-bg text-2xl`}></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {isVoice ? 'Voice Call' : 'Video Call'}
            </h2>
            <p className="text-color text-lg mb-8">
              <span className="text-white font-semibold">{callerName}</span> is calling you
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={onDecline}
                className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center transition"
              >
                <i className="fas fa-phone-slash text-white text-xl"></i>
              </button>
              <button
                onClick={onAccept}
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center transition"
              >
                <i className={`fas ${isVoice ? 'fa-phone' : 'fa-video'} text-white text-xl`}></i>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IncomingCallModal;