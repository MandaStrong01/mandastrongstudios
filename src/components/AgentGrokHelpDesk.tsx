import React, { useState } from 'react';
import { Bot, Zap, MessageCircle, HelpCircle } from 'lucide-react';

interface AgentGrokHelpDeskProps {
  onBack: () => void;
  onNext: () => void;
}

export const AgentGrokHelpDesk: React.FC<AgentGrokHelpDeskProps> = ({ onBack, onNext }) => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'agent',
      text: "Hello! I'm Agent Grok, your 24/7 AI assistant for MandaStrong Studio. How can I help you today?",
      time: 'Just now'
    }
  ]);

  const faqs = [
    'How do I export my video?',
    'What video formats are supported?',
    'How do I add text to my video?',
    'Can I use custom fonts?',
    'How do I adjust audio levels?',
    'What are the render quality options?'
  ];

  const commonTopics = [
    { name: 'Video Editing Basics', color: 'bg-purple-600' },
    { name: 'Audio & Music', color: 'bg-gray-800' },
    { name: 'Effects & Transitions', color: 'bg-gray-800' },
    { name: 'Export & Rendering', color: 'bg-gray-800' },
    { name: 'Troubleshooting', color: 'bg-gray-800' }
  ];

  const serviceStatus = [
    { name: 'API Services', status: 'Operational' },
    { name: 'Render Queue', status: 'Operational' },
    { name: 'File Storage', status: 'Operational' }
  ];

  const sendMessage = () => {
    if (!message.trim()) return;

    setChatMessages([...chatMessages, {
      id: chatMessages.length + 1,
      sender: 'user',
      text: message,
      time: 'Just now'
    }]);

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: prev.length + 1,
        sender: 'agent',
        text: "I'm here to help! Let me look that up for you...",
        time: 'Just now'
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bot className="text-purple-400" size={32} />
            <h1 className="text-2xl font-black">AGENT GROK - 24/7 HELP DESK</h1>
          </div>
          <div className="flex gap-3">
            <button onClick={onBack} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              ← Back
            </button>
            <button onClick={onNext} className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg font-bold transition">
              Next →
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                    <Bot className="text-purple-600" size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-xl">Agent Grok</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span>Online & Ready to Help</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                  <Zap className="text-yellow-300" size={20} />
                  <span className="font-bold">Instant Responses</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 mb-6">
              <div className="bg-black rounded-lg p-6 h-80 overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] ${msg.sender === 'agent' ? 'bg-purple-900' : 'bg-gray-800'} rounded-lg p-4`}>
                      {msg.sender === 'agent' && (
                        <p className="font-bold mb-2 text-sm text-purple-400">Agent Grok</p>
                      )}
                      <p className="text-sm">{msg.text}</p>
                      <p className="text-xs text-gray-500 mt-2">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your question here..."
                  className="flex-1 bg-black border-2 border-purple-600 rounded-lg px-4 py-3 text-white"
                />
                <button
                  onClick={sendMessage}
                  className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition"
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="text-purple-400" size={24} />
                <h3 className="text-xl font-black">Frequently Asked Questions</h3>
              </div>
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    className="w-full text-left bg-gray-800 hover:bg-gray-700 border-2 border-gray-700 hover:border-purple-600 px-4 py-3 rounded-lg transition"
                  >
                    {faq}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6 mb-6">
              <h3 className="text-purple-400 font-bold mb-4">Common Topics</h3>
              <div className="space-y-2">
                {commonTopics.map((topic, index) => (
                  <button
                    key={index}
                    className={`w-full ${topic.color} hover:opacity-80 px-6 py-4 rounded-lg font-bold transition`}
                  >
                    {topic.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-purple-600 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center mb-4">
                <MessageCircle className="text-white" size={48} />
              </div>
              <h3 className="text-xl font-black text-center mb-2">Need Human Support?</h3>
              <p className="text-center text-sm mb-4">Our support team is available 24/7 for complex issues</p>
              <button className="w-full bg-white text-purple-900 hover:bg-gray-100 py-3 rounded-lg font-bold transition">
                Contact Support Team
              </button>
            </div>

            <div className="bg-gray-900 border-2 border-gray-800 rounded-xl p-6">
              <h3 className="text-purple-400 font-bold mb-4">Service Status</h3>
              <div className="space-y-3">
                {serviceStatus.map((service, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm">{service.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <span className="text-sm text-green-400 font-bold">{service.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
