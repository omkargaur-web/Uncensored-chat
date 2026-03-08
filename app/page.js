'use client';

import { useState } from 'react';
import ChatBox from '@/components/ChatBox';
import ImageUpload from '@/components/ImageUpload';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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
    setSelectedImage(base64);
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
      <h1 style={{ textAlign: 'center', color: '#333' }}>
        🤖 My Uncensored AI App
      </h1>

      {/* Screenshot Analysis Section */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>📸 Screenshot Analysis</h2>
        <ImageUpload onImageSelect={handleImageSelect} />
        {analysis && (
          <div style={{ 
            marginTop: '20px',
            padding: '15px',
            background: '#f0f0f0',
            borderRadius: '5px'
          }}>
            <strong>Analysis:</strong>
            <p style={{ whiteSpace: 'pre-wrap' }}>{analysis}</p>
          </div>
        )}
      </div>

      {/* Chat Section */}
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <h2>💬 Chat</h2>
        
        {/* Messages */}
        <div style={{ 
          minHeight: '200px', 
          maxHeight: '400px', 
          overflowY: 'auto',
          marginBottom: '20px',
          padding: '10px',
          background: '#f9f9f9',
          borderRadius: '5px'
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ 
              marginBottom: '10px',
              textAlign: msg.role === 'user' ? 'right' : 'left'
            }}>
              <div style={{
                display: 'inline-block',
                padding: '8px 12px',
                borderRadius: '15px',
                background: msg.role === 'user' ? '#0070f3' : '#e5e5e5',
                color: msg.role === 'user' ? 'white' : 'black',
                maxWidth: '70%'
              }}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <ChatBox onSendMessage={handleSendMessage} loading={loading} />
      </div>
    </div>
  );
        }
