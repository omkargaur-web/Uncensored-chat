'use client';

import { useState } from 'react';
import ChatBox from '@/components/ChatBox';
import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState('');

  // Chat ke liye
  const handleSendMessage = async (message) => {
    setLoading(true);
    setMessages([...messages, { role: 'user', content: message }]);
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });
      
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (error) {
      alert('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  // Screenshot analyze ke liye
  const handleImageSelect = async (base64) => {
    setLoading(true);
    setAnalysis('Analyzing screenshot...');
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64 })
      });
      
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (error) {
      setAnalysis('Error: ' + error.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>🤖 My Uncensored AI App</h1>

      {/* Screenshot Analysis Section */}
      <div style={{ marginBottom: '40px' }}>
        <h2>📸 Screenshot Analysis</h2>
        <ImageUpload onImageSelect={handleImageSelect} />
        {analysis && (
          <div style={{ marginTop: '20px', padding: '15px', background: '#f0f0f0' }}>
            <strong>Analysis:</strong>
            <p>{analysis}</p>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div>
        <h2>💬 Chat</h2>
        <div style={{ minHeight: '300px', marginBottom: '20px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <strong>{msg.role === 'user' ? 'You: ' : 'AI: '}</strong>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <ChatBox onSendMessage={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
}
