// src/components/chat/MessageBubble.jsx
const MessageBubble = ({ message, contactName, userName }) => {
  const isSent = message.sent;

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    const first = parts[0]?.charAt(0)?.toUpperCase() || '';
    const last = parts.length > 1 ? parts[1]?.charAt(0)?.toUpperCase() : '';
    return `${first}${last}`;
  };

  return (
    <div className={`flex items-start mb-4 ${isSent ? 'justify-end' : ''}`}>
      {!isSent && (
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#3BEDB2] flex items-center justify-center text-[#0C1624] font-bold text-xs sm:text-sm border-2 border-border-color flex-shrink-0 mr-2 sm:mr-3 mt-1">
          {getInitials(contactName)}
        </div>
      )}

      <div>
        <div className={`message-sender text-xs sm:text-sm ${isSent ? 'text-right' : ''}`}>
          {message.sender}
        </div>
        <div className={`message-bubble ${isSent ? 'sent' : 'received'} text-sm sm:text-base`}>
          <p className="break-words">{message.text}</p>
          {/* Time + double‑tick container */}
          <div className={`message-time-container text-xs flex items-center gap-1 whitespace-nowrap ${isSent ? 'justify-end' : ''}`}>
            <span className="message-time text-white/90">{message.time}</span>
            {message.sent && (
              <span className="double-tick flex-shrink-0">
                <span className="tick" style={{ borderColor: message.status >= 1 ? (message.status === 2 ? '#3bedb2' : '#9b9c9e') : '#9b9c9e' }}></span>
                {message.status >= 1 && (
                  <span className="tick second-tick" style={{ borderColor: message.status === 2 ? '#3bedb2' : '#9b9c9e' }}></span>
                )}
              </span>
            )}
            {/* <span className="double-tick flex-shrink-0">
              <span className="tick"></span>
              <span className="tick second-tick"></span>
            </span> */}
          </div>
        </div>
      </div>

      {isSent && (
        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#3BEDB2] flex items-center justify-center text-[#0C1624] font-bold text-xs sm:text-sm border-2 border-border-color flex-shrink-0 ml-2 sm:ml-3 mt-1">
          {getInitials(userName)}
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
