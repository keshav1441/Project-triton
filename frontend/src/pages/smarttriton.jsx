import React, { useState, useRef, useEffect } from 'react';
import SendIcon from '@mui/icons-material/Send';

const SmartTriton = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I’m Smart Triton — how can I assist you with ship routing today?' }
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { from: 'user', text: input };
    const botReply = { from: 'bot', text: "Got it! I'm processing that for you... 🌊" };

    setMessages((prev) => [...prev, userMessage, botReply]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      {/* Header */}
<div className="bg-white p-6 rounded-xl shadow mb-4 flex flex-col items-center gap-2">
  <div className="text-4xl">🤖</div>
  <h1 className="text-3xl font-bold text-blue-900 text-center">Smart Triton AI Chatbot</h1>
  <p className="text-md text-gray-600 text-center">
    Ask anything related to ship routing, weather, performance, etc.
  </p>
</div>


      {/* Chat Window */}
      <div className="flex-grow bg-white rounded-xl shadow p-4 overflow-y-auto space-y-3 mb-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg text-sm ${
                msg.from === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex items-center bg-white p-2 rounded-xl shadow">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="flex-grow p-2 outline-none text-sm"
        />
        <button
          onClick={handleSend}
          className="p-2 rounded-full text-blue-600 hover:bg-blue-100 transition"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default SmartTriton;
