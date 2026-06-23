// src/components/home/ChatPreview.jsx

import { useState, useRef, useEffect } from 'react';

const initialMessages = [
  {
    id: 1,
    sender: 'Sarah',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
    text: 'Hey! I just sent you the encrypted document. Can you review it? 🔒',
    time: '2:30 PM',
    sent: false,
  },
  {
    id: 2,
    sender: 'You',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=You&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
    text: 'Got it! The end-to-end encryption worked perfectly. I\'ll review it now.',
    time: '2:32 PM',
    sent: true,
  },
  {
    id: 3,
    sender: 'Sarah',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
    text: 'Great! Love that it works right in the browser with no downloads needed 🎉',
    time: '2:33 PM',
    sent: false,
  },
  {
    id: 4,
    sender: 'You',
    avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=You&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
    text: 'Yes! And all messages are encrypted end-to-end. Try sending me another file.',
    time: '2:34 PM',
    sent: true,
  },
];

const ChatPreview = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage = {
      id: Date.now(),
      sender: 'You',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=You&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
      text: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sent: true,
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput('');

    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const replies = [
        "Thanks for your message! All messages are end-to-end encrypted.",
        "Secure message received! This is how LightningChat protects your privacy.",
        "Your message is now protected with military-grade encryption.",
        "Message delivered securely! Try sending another to see real-time encryption.",
      ];
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        sender: 'Sarah',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=3bedb2,29c091,1a9e7c&scale=90',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sent: false,
      }]);
    }, 2000);
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === 'Enter') sendMessage();
  // };

  return (
    <div className="chat-container w-full max-w-md mx-auto lg:max-w-none">
      {/* Header */}
      <div className="chat-header flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <img
            src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=3bedb2,29c091,1a9e7c&scale=90"
            alt="Sarah"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover border-2 border-border-color"
          />
          <div>
            <div className="font-semibold text-sm sm:text-base text-white">Sarah Johnson</div>
            <div className="text-xs sm:text-sm text-online-green">Online</div>
          </div>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
            <i className="fas fa-video text-primary text-xs sm:text-sm"></i>
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary/20 transition-colors">
            <i className="fas fa-phone text-primary text-xs sm:text-sm"></i>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages h-60 sm:h-72 lg:h-[340px]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-start mb-4 ${msg.sent ? '' : ''}`}> {/* justify-end */}
            {!msg.sent && (
              <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover mr-2 sm:mr-3 mt-1 flex-shrink-0 border border-border-color" />
            )}
            <div className={msg.sent ? '' : ''}> {/* text-right */}
              <div className={`message-sender text-xs sm:text-sm ${msg.sent ? 'text-right' : ''}`}>{msg.sender}</div>
              <div className={`message-bubble ${msg.sent ? 'sent' : 'received'} text-sm sm:text-base`}>
                <p>{msg.text}</p>
                <div className={`message-time-container ${msg.sent ? '' : ''} text-xs`}> {/* sent */}
                  <span className="message-time">{msg.time}</span>
                  <span className="double-tick">
                    <span className="tick"></span>
                    <span className="tick second-tick"></span>
                  </span>
                </div>
              </div>
            </div>
            {msg.sent && (
              <img src={msg.avatar} alt={msg.sender} className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover ml-2 sm:ml-3 mt-1 flex-shrink-0 border border-border-color" />
            )}
          </div>
        ))}

        {typing && (
          <div className="flex items-start mb-4">
            <img
              src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah&backgroundColor=3bedb2,29c091,1a9e7c&scale=90"
              alt="Sarah"
              className="w-7 h-7 sm:w-9 sm:h-9 rounded-full object-cover mr-2 sm:mr-3 mt-1 flex-shrink-0 border border-border-color"
            />
            <div>
              <div className="message-sender text-xs sm:text-sm">Sarah</div>
              <div className="typing-indicator">
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area – Responsive Fixes */}
      <div className="chat-input-area py-2 px-2 sm:py-3 sm:px-4 md:py-4 md:px-5">
        <div className="chat-input-wrapper flex flex-wrap items-center gap-1 sm:gap-2">
          {/* Attachment button */}
          <button className="action-button attachment max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
            <i className="fas fa-paperclip text-xs sm:text-sm text-black"></i>
          </button>

          {/* Text input - grows, shrinks, no overflow */}
          <input
            type="text"
            placeholder="Type your secure message..."
            className="chat-input flex-1 min-w-[120px] bg-white/10 border border-white/20 rounded-full px-3 py-2 sm:py-2 text-white sm:text-sm placeholder:text-gray-400 focus:outline-none focus:border-primary/50 transition"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // onKeyPress={handleKeyPress}
          />

          {/* Right side icons */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* <button className="action-button emoji max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <i className="far fa-smile text-xs sm:text-sm text-primary"></i>
            </button> */}
            <button className="action-button emoji max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary hover:bg-primary/80 transition-colors">
              <i className="far fa-smile text-xs sm:text-sm text-black"></i>
            </button>
            <button className="action-button recording max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors">
              <i className="fas fa-microphone text-xs sm:text-sm text-black"></i>
            </button>
            <button
              className="action-button send max-[640px]:w-9 max-[640px]:h-9 sm:w-9 sm:h-9 flex items-center justify-center rounded-full bg-primary transition-colors">
              <i className="fas fa-paper-plane text-xs sm:text-sm text-black"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;