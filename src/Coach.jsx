import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import ReactMarkdown from "react-markdown";


const Coach = () => {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('chatHistory');
    return savedMessages ? JSON.parse(savedMessages) : [
      {
        id: 1,
        text: "Hi! I'm your AI assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date(),
      },
    ];
  });
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const employeeData = localStorage.getItem("employeeData");
  const apiUrl = "https://agent.api.lyzr.app/v2/chat/";
  const lyzrApiKey = "lyzr-eH51wUqvcJY5fRl9yFZihZIx";
  const sessionId = "unique-session-id";

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(messages));
    console.log('Chat History:', messages);
  }, [messages]);

  const fetchAIResponse = async (userMessage) => {
    try {
      // const response = await fetch('https://response/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ message: userMessage }),
      // });

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "x-api-key": lyzrApiKey,
        },
        body: JSON.stringify({
          user_id: "harshit@lyzr.ai",
          agent_id: "6791e82f61f92e3cfefe1a97",
          session_id: sessionId,
          message: userMessage + employeeData.response,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }
      const data = await response.json();
      console.log('Response:',data );

      return data.response;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "Sorry, I couldn't process your request. Please try again later.";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    setIsTyping(true);

    try {
      const response = await fetchAIResponse(newMessage);
      const aiMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error handling message:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <h1 className="text-3xl font-bold pl-80 pt-3 pb-0">AI Coach</h1>
      <div className="flex-1 w-full mx-auto p-4 flex flex-col pl-80">
        <div className="bg-white rounded-lg shadow-lg flex-1 flex flex-col overflow-hidden">
          <div className="bg-white px-6 py-4 border-b border-gray-200">
            <h1 className="text-xl font-semibold text-gray-800">Chat with Your AI Coach</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4" style={{ maxHeight: '70vh' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown className="text-sm">{message.text}</ReactMarkdown>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200">
            <div className="flex space-x-4">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-6 py-3 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={!newMessage.trim()}
                className="bg-purple-600 text-white rounded-full p-3 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Coach;
