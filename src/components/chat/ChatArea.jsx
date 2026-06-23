import { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { FiMoreVertical, FiPhone, FiVideo } from "react-icons/fi";

const ChatArea = ({ chat }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey! How's it going?", isOwn: false, time: "10:30 AM" },
    { id: 2, text: "All good! Working on the new feature.", isOwn: true, time: "10:32 AM" },
  ]);

  const handleSend = (text) => {
    const newMsg = { id: Date.now(), text, isOwn: true, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    // simulate reply after 1s
    setTimeout(() => {
      const reply = { id: Date.now()+1, text: "That's awesome! Keep going 💪", isOwn: false, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-dark/30">
      {chat ? (
        <>
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-dark/50">
            <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center font-bold text-primary">{chat.avatar}</div><div><h3 className="text-white font-semibold">{chat.name}</h3><span className="text-content text-xs">Online</span></div></div>
            <div className="flex gap-4 text-content"><FiVideo size={20} className="hover:text-primary" /><FiPhone size={20} className="hover:text-primary" /><FiMoreVertical size={20} className="hover:text-primary" /></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map(msg => <MessageBubble key={msg.id} message={msg} isOwn={msg.isOwn} />)}
          </div>
          <MessageInput onSend={handleSend} />
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center"><div><img src="/src/assets/hero.png" alt="No chat" className="w-40 opacity-50 mx-auto" /><h3 className="text-primary text-xl mt-4">Select a conversation</h3><p className="text-content">Choose a chat from the sidebar</p></div></div>
      )}
    </div>
  );
};

export default ChatArea;