import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Youtube, MessageSquare } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'How can I assist you today?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const isYouTubeURL = (text) => {
    return text.includes('youtube.com') || text.includes('youtu.be');
  };

  const simulateResponse = async (userMessage) => {
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    let response = '';

    if (isYouTubeURL(userMessage)) {
      response = `I've analyzed the YouTube video you provided. Here's a summary:\n\n📝 **Video Summary:**\nThis appears to be an educational video related to your coursework. The video covers key concepts that align with your curriculum.\n\n🔑 **Key Points:**\n• Important theoretical foundations\n• Practical applications and examples\n• Problem-solving techniques\n• Real-world implementations\n\n💡 **Study Tips:**\n• Take notes on the main concepts\n• Practice the examples shown\n• Review related textbook chapters\n• Attempt practice problems\n\nWould you like me to explain any specific concept from the video?`;
    } else {
      const responses = [
        `Great question! Let me help you understand this concept better.\n\n🎯 **Key Concept:**\nThis topic is fundamental to your understanding of the subject. Here's a breakdown:\n\n• **Definition:** The core principle involves...\n• **Applications:** This is commonly used in...\n• **Examples:** Consider scenarios where...\n• **Tips:** Remember to focus on...\n\nWould you like me to elaborate on any specific aspect?`,

        `I can help you with that topic! Here's what you need to know:\n\n📚 **Study Approach:**\n• Start with the basic definitions\n• Understand the underlying principles\n• Work through solved examples\n• Practice with different problem types\n\n🔍 **Key Areas to Focus:**\n• Theoretical foundations\n• Practical applications\n• Common problem patterns\n• Exam-relevant topics\n\nNeed help with any specific problems?`,

        `Excellent topic to explore! Let me break this down for you:\n\n✨ **Core Understanding:**\nThis concept builds upon previous modules and is essential for upcoming topics.\n\n🎯 **Learning Strategy:**\n• Review prerequisite concepts\n• Follow step-by-step solutions\n• Create summary notes\n• Test your understanding with problems\n\nWhat specific aspect would you like me to explain further?`
      ];

      response = responses[Math.floor(Math.random() * responses.length)];
    }

    setIsTyping(false);

    const botMessage = {
      id: Date.now().toString(),
      text: response,
      isUser: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
      isYouTubeRequest: isYouTubeURL(inputText)
    };

    setMessages(prev => [...prev, userMessage]);
    const messageText = inputText;
    setInputText('');

    await simulateResponse(messageText);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Bot size={20} />
          <span>SP-GPT Assistant</span>
        </div>
        <div className="chatbot-features">
          <div className="feature-badge">
            <Youtube size={14} />
            <span>Video Summary</span>
          </div>
          <div className="feature-badge">
            <MessageSquare size={14} />
            <span>Q&A</span>
          </div>
        </div>
      </div>

      <div className="chatbot-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.isUser ? 'user' : 'bot'}`}>
            <div className="message-avatar">
              {message.isUser ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-content">
              <div className="message-text">
                {message.isYouTubeRequest && (
                  <div className="youtube-indicator">
                    <Youtube size={16} />
                    <span>YouTube URL detected</span>
                  </div>
                )}
                {message.text.split('\n').map((line, index) => (
                  <React.Fragment key={index}>
                    {line}
                    {index < message.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              <div className="message-timestamp">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="message bot">
            <div className="message-avatar">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <div className="input-container">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask a question or paste a YouTube URL for summary..."
            rows={1}
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="send-button"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="input-hint">
          💡 Tip: Paste a YouTube URL for video summary or ask any study-related question
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
