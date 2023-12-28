import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [userMessage, setUserMessage] = useState('');
  const [assistantMessage, setAssistantMessage] = useState('');

  const handleUserMessageChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/chat', {
        userMessage,
      });

      setAssistantMessage(response.data.assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      setAssistantMessage('Error communicating with the server.');
    }
  };

  return (
    <div>
      <h1>Chat with Assistant</h1>
      <div>
        <label>User Message:</label>
        <input type="text" value={userMessage} onChange={handleUserMessageChange} />
      </div>
      <div>
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
      {assistantMessage && (
        <div>
          <strong>Assistant:</strong> {assistantMessage}
        </div>
      )}
    </div>
  );
}

export default App;
