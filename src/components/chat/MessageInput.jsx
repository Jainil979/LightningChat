import { useState } from "react";
import { FiSend, FiMic, FiPaperclip } from "react-icons/fi";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <div className="p-4 bg-dark/80 border-t border-white/10 flex gap-3">
      <button className="text-content hover:text-primary"><FiPaperclip size={22} /></button>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} placeholder="Type a message..." className="flex-1 bg-black/30 rounded-full px-4 py-2 text-white outline-none" />
      <button className="text-content hover:text-primary"><FiMic size={22} /></button>
      <button onClick={handleSend} className="bg-primary text-dark p-2 rounded-full hover:scale-105 transition"><FiSend size={20} /></button>
    </div>
  );
};

export default MessageInput;