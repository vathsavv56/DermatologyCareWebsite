import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Bot, User, Clock } from 'lucide-react';

// Google Gemini AI API configuration
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatSupportProps {
  onPageChange: (page: string) => void;
}

const ChatSupport: React.FC<ChatSupportProps> = ({ onPageChange }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "🙏 Namaste! I'm Dr. AI, your virtual dermatology assistant. I'm here to help you with any skin care questions or appointment bookings. How may I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickReplies = [
    "How to book appointment?",
    "Find dermatologists near me",
    "Skin care tips",
    "Emergency consultation",
    "Insurance coverage",
    "Telemedicine options"
  ];

  const botResponses: { [key: string]: string } = {
    "hello": "🙏 Namaste! I'm Dr. AI, your dedicated dermatology assistant. I can help you find the best skin specialists across India, book appointments, or answer your skin care questions. What would you like to know?",
    "appointment": "📅 Booking is super easy! Just click 'Find Hospitals' → Select your city → Choose a dermatologist → Pick your preferred time slot. We have 500+ certified doctors across 150+ hospitals in India!",
    "hours": "🕐 Our partner hospitals operate 24/7! Most dermatologists are available Mon-Sat, 9 AM to 6 PM. Many also offer evening and weekend slots for your convenience.",
    "insurance": "💳 Most of our partner hospitals accept major insurance plans including CGHS, ECHS, and private insurers. Please verify with your chosen hospital during booking.",
    "emergency": "🚨 For urgent skin emergencies like severe allergic reactions, rapidly spreading rashes, or suspicious mole changes, please visit the nearest emergency room or call 102 immediately!",
    "telemedicine": "💻 Yes! We offer secure video consultations with certified dermatologists. Perfect for follow-ups, prescription renewals, and non-emergency consultations from home.",
    "tips": "✨ Daily skin care tips: Use sunscreen SPF 30+, moisturize twice daily, drink plenty of water, eat antioxidant-rich foods, and avoid harsh scrubbing. Need personalized advice? Book a consultation!",
    "default": "🤔 That's a great question! For personalized medical advice, I recommend consulting with one of our board-certified dermatologists. Shall I help you find one in your area?"
  };

  // Simulate online status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1); // 90% uptime simulation
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    for (const [key, response] of Object.entries(botResponses)) {
      if (key !== 'default' && lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return botResponses.default;
  };

  // Function to call Google Gemini AI API
  const getGeminiResponse = async (message: string): Promise<string> => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your-gemini-api-key-here') {
      console.warn('Gemini API key not configured, using fallback responses');
      return getResponse(message);
    }

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are Dr. AI, a professional dermatology assistant for an Indian healthcare platform. 
              Respond to this patient query in a helpful, professional manner. Keep responses concise and relevant to dermatology.
              Always suggest consulting with certified dermatologists for serious concerns.
              Patient query: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Gemini API error:', error);
      // Fallback to predefined responses
      return getResponse(message);
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || newMessage.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    // Get AI response with typing delay
    setTimeout(() => {
      const aiResponse = await getGeminiResponse(messageText);
      
      const botResponse: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[calc(100vh-8rem)] border border-slate-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isOnline ? 'bg-green-400' : 'bg-red-400'}`}></div>
              </div>
              <div className="relative z-10">
                <h1 className="text-2xl font-bold">Dr. AI - Live Support</h1>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  <p className="text-blue-100 font-medium">
                    {isOnline ? 'Online • Instant responses' : 'Reconnecting...'}
                  {isOnline ? (GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key-here' ? 'Online • AI-Powered' : 'Online • Smart responses') : 'Reconnecting...'}
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-slate-50 to-white" style={{ height: 'calc(100% - 220px)' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div className={`flex items-start space-x-3 max-w-sm lg:max-w-lg`}>
                  {message.sender === 'bot' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                  )}
                  
                  <div>
                    <div
                      className={`px-5 py-4 rounded-2xl shadow-md ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md'
                          : 'bg-white text-gray-900 rounded-bl-md border border-slate-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                    <div className="flex items-center mt-2 space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500 font-medium">{formatTime(message.timestamp)}</span>
                    </div>
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                      <User className="w-5 h-5 text-green-600" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-md shadow-md border border-slate-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          <div className="px-6 py-4 border-t bg-gradient-to-r from-slate-50 to-blue-50">
            <p className="text-xs text-gray-600 mb-3 font-semibold">
              💬 Quick responses {GEMINI_API_KEY && GEMINI_API_KEY !== 'your-gemini-api-key-here' ? '(AI-Powered)' : '(Smart Replies)'}:
            </p>
            <div className="flex flex-wrap gap-2 max-h-20 overflow-y-auto">
              {quickReplies.map((reply, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(reply)}
                  className="bg-white text-gray-700 text-xs px-4 py-2 rounded-full border border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-6 border-t bg-white">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about skin care or appointments..."
                className="flex-1 px-5 py-4 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm font-medium shadow-sm"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={!newMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-2xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSupport;