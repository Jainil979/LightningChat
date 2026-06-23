// src/components/chat/ChatInput.jsx
import { useState, useRef, useEffect } from 'react';
import EmojiPicker, { Theme } from 'emoji-picker-react';

const ChatInput = ({ onSend, onTypingStart }) => {
  const [text, setText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const inputRef = useRef(null);
  const pickerRef = useRef(null);
  const throttleRef = useRef({ lastSent: 0, timeoutId: null, idleTimeoutId: null });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText('');
    // Clear typing state
    clearTimeout(throttleRef.current.idleTimeoutId);
    clearTimeout(throttleRef.current.timeoutId);
    throttleRef.current.lastSent = 0;
  };

  useEffect(() => {
    return () => {
      clearTimeout(throttleRef.current.idleTimeoutId);
      clearTimeout(throttleRef.current.timeoutId);
    };
  }, []);

  // Close picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        !event.target.closest('.emoji-toggle-btn')
      ) {
        setShowEmoji(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEmojiClick = (emojiObject) => {
    setText((prev) => prev + emojiObject.emoji);
    inputRef.current?.focus();
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);

    if (value.trim().length === 0) {
      // User cleared input – cancel idle timeout, don't send anything
      clearTimeout(throttleRef.current.idleTimeoutId);
      return;
    }

    const now = Date.now();
    const { lastSent, timeoutId } = throttleRef.current;

    // First keystroke sends immediately; then at most every 2 seconds
    if (!timeoutId && (!lastSent || now - lastSent >= 2000)) {
      throttleRef.current.lastSent = now;
      if (onTypingStart) onTypingStart();

      // Cooldown: block further sends for 2 seconds
      throttleRef.current.timeoutId = setTimeout(() => {
        throttleRef.current.timeoutId = null;
      }, 2000);
    }

    // Reset the idle timer – after 2 seconds of no typing, reset lastSent
    clearTimeout(throttleRef.current.idleTimeoutId);
    throttleRef.current.idleTimeoutId = setTimeout(() => {
      throttleRef.current.lastSent = 0;
    }, 2000);
  };

  return (
    <div className="chat-input-area py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-5 relative">
      {/* Custom CSS overrides – injected only while picker is shown */}
      {showEmoji && (
        <style>{`
          .EmojiPickerReact {
            --epr-picker-padding: 12px !important;
          }
          .EmojiPickerReact .epr-category-btn:hover {
            border-color: #3bedb2 !important;
            outline: none;
          }
        `}</style>
      )}

      {/* Emoji Picker */}
      {showEmoji && (
        <div
          ref={pickerRef}
          className="absolute bottom-full right-2 sm:right-4 mb-3 z-50"
          style={{
            borderRadius: '1rem',
            overflow: 'hidden',
            border: '1px solid #2e333b',
            '--epr-bg-color': '#0d121f',
            '--epr-category-label-bg-color': '#0d121f',
            '--epr-text-color': '#ffffff',
            '--epr-hover-bg-color': 'rgba(59, 237, 178, 0.08)',
            '--epr-focus-bg-color': 'rgba(59, 237, 178, 0.15)',
            '--epr-picker-border-color': 'transparent',
            '--epr-category-icon-active-color': '#3bedb2',
            '--epr-search-input-bg-color': '#0b1524',
            '--epr-search-input-bg-color-active': '#0b1524',
            '--epr-search-input-text-color': '#ffffff',
            '--epr-search-input-placeholder-color': '#9b9c9e',
            '--epr-search-border-color': '#2e333b',
            '--epr-highlight-color': '#3bedb2',
            '--epr-emoji-size': '26px',
            '--epr-emoji-gap': '8px',
            '--epr-header-padding' : '13px',
            scrollbarColor: '#3bedb2 transparent',
          }}
        >
          <EmojiPicker
            onEmojiClick={handleEmojiClick}
            theme={Theme.DARK}
            width={350}
            height={395}
            searchPlaceholder="Search emoji..."
            lazyLoadEmojis={true}
            skinTonesDisabled={false}
          />
        </div>
      )}

      <div className="chat-input-wrapper flex flex-wrap items-center gap-1 sm:gap-2">
        {/* Attachment button */}
        <button
          type="button"
          className="action-button attachment max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <i className="fas fa-paperclip text-xs sm:text-sm text-black"></i>
        </button>

        {/* Text input */}
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your secure message..."
          className="chat-input flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-full px-3 py-2 sm:py-2 text-white sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary/50 transition"
          value={text}
          onChange={handleChange}
        />

        {/* Emoji toggle button */}
        <button
          type="button"
          onClick={() => setShowEmoji((prev) => !prev)}
          className="emoji-toggle-btn action-button emoji max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
        >
          <i className="far fa-smile text-xs sm:text-sm text-black"></i>
        </button>

        {/* Send button – always visible */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="action-button send max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary transition-colors"
        >
          <i className="fas fa-paper-plane text-xs sm:text-sm text-black"></i>
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
















// src/components/chat/ChatInput.jsx
// import { useState, useRef, useEffect } from 'react';
// import EmojiPicker, { Theme } from 'emoji-picker-react';

// const ChatInput = ({ onSend, onRecordAudio }) => {
//   const [text, setText] = useState('');
//   const [showEmoji, setShowEmoji] = useState(false);
//   const inputRef = useRef(null);
//   const pickerRef = useRef(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!text.trim()) return;
//     onSend(text.trim());
//     setText('');
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         pickerRef.current &&
//         !pickerRef.current.contains(event.target) &&
//         !event.target.closest('.emoji-toggle-btn')
//       ) {
//         setShowEmoji(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleEmojiClick = (emojiObject) => {
//     setText((prev) => prev + emojiObject.emoji);
//     inputRef.current?.focus();
//   };

//   return (
//     <div className="chat-input-area py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-5 relative">
//       {showEmoji && (
//         <style>{`
//           .EmojiPickerReact {
//             --epr-picker-padding: 12px !important;
//           }
//           .EmojiPickerReact .epr-category-btn:hover {
//             border-color: #3bedb2 !important;
//             outline: none;
//           }
//         `}</style>
//       )}

//       {showEmoji && (
//         <div
//           ref={pickerRef}
//           className="absolute bottom-full right-2 sm:right-4 mb-3 z-50"
//           style={{
//             borderRadius: '1rem',
//             overflow: 'hidden',
//             border: '1px solid #2e333b',
//             '--epr-bg-color': '#0d121f',
//             '--epr-category-label-bg-color': '#0d121f',
//             '--epr-text-color': '#ffffff',
//             '--epr-hover-bg-color': 'rgba(59, 237, 178, 0.08)',
//             '--epr-focus-bg-color': 'rgba(59, 237, 178, 0.15)',
//             '--epr-picker-border-color': 'transparent',
//             '--epr-category-icon-active-color': '#3bedb2',
//             '--epr-search-input-bg-color': '#0b1524',
//             '--epr-search-input-bg-color-active': '#0b1524',
//             '--epr-search-input-text-color': '#ffffff',
//             '--epr-search-input-placeholder-color': '#9b9c9e',
//             '--epr-search-border-color': '#2e333b',
//             '--epr-highlight-color': '#3bedb2',
//             '--epr-emoji-size': '26px',
//             '--epr-emoji-gap': '8px',
//             '--epr-header-padding' : '13px',
//             scrollbarColor: '#3bedb2 transparent',
//           }}
//         >
//           <EmojiPicker
//             onEmojiClick={handleEmojiClick}
//             theme={Theme.DARK}
//             width={350}
//             height={395}
//             searchPlaceholder="Search emoji..."
//             lazyLoadEmojis={true}
//             skinTonesDisabled={false}
//           />
//         </div>
//       )}

//       <div className="chat-input-wrapper flex flex-wrap items-center gap-1 sm:gap-2">
//         <button
//           type="button"
//           className="action-button attachment max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
//         >
//           <i className="fas fa-paperclip text-xs sm:text-sm text-black"></i>
//         </button>

//         <input
//           ref={inputRef}
//           type="text"
//           placeholder="Type your secure message..."
//           className="chat-input flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-full px-3 py-2 sm:py-2 text-white sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary/50 transition"
//           value={text}
//           onChange={(e) => setText(e.target.value)}
//         />

//         <button
//           type="button"
//           onClick={() => setShowEmoji((prev) => !prev)}
//           className="emoji-toggle-btn action-button emoji max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
//         >
//           <i className="far fa-smile text-xs sm:text-sm text-black"></i>
//         </button>

//         {text.trim() ? (
//           <button
//             type="submit"
//             onClick={handleSubmit}
//             className="action-button send max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary transition-colors"
//           >
//             <i className="fas fa-paper-plane text-xs sm:text-sm text-black"></i>
//           </button>
//         ) : (
//           <button
//             type="button"
//             onClick={onRecordAudio}
//             className="action-button recording max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
//           >
//             <i className="fas fa-microphone text-xs sm:text-sm text-black"></i>
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatInput;