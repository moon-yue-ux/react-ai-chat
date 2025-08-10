import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageSquare, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ChatInterface.css';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}
// GraphQL 响应类型
interface AIResponse {
  data?: {
    askAI: {
      response: string
    }
  }
  errors?: Array<{
    message: string
  }>
}
// GraphQL 查询语句
const ASK_AI_QUERY = `
  query AskAI($input: String!) {
    askAI(input: $input) {
      response
    }
  }
`;
const GRAPHQL_ENDPOINT = '/api/graphql';
const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '你好！我是AI助手，很高兴为你服务。有什么我可以帮助你的吗？',
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);



  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch(GRAPHQL_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: ASK_AI_QUERY,
          variables: {
            input: userMessage.text,
          },
        }),
      });
      const result: AIResponse = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: result.data?.askAI.response || '抱歉，我现在无法回答这个问题。',
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
    }  catch (error) {
      console.log(error, 'error=====')
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: '抱歉，发生了错误。请稍后重试。',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      console.error('Error:', error);
    } finally {
      setIsTyping(false);
    }
    
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <div className="header-content">
          <div className="header-icon">
            <Sparkles className="sparkle-icon" />
            <Bot className="bot-icon" />
          </div>
          <div className="header-text">
            <h1>AI 聊天助手</h1>
            <p>智能对话，随时为您服务</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="messages-container">
        <div className="messages-wrapper">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.isUser ? 'user' : 'ai'}`}
            >
              <div className="message-avatar">
                {message.isUser ? (
                  <User className="avatar-icon" />
                ) : (
                  <Bot className="avatar-icon" />
                )}
              </div>
              <div className="message-content">
                <div className="message-text">
                  {message.isUser ? (
                    message.text
                  ) : (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  )}
                </div>
                <div className="message-time">
                  {message.timestamp.toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message ai">
              <div className="message-avatar">
                <Bot className="avatar-icon" />
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
      </div>

      {/* Input */}
      <div className="input-container">
        <div className="input-wrapper">
          <div className="input-field">
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="输入你的消息..."
              className="message-input"
              disabled={isTyping}
              rows={1}
            />
            <button
              onClick={handleSendMessage}
              disabled={inputValue.trim() === '' || isTyping}
              className="send-button"
            >
              <Send className="send-icon" />
            </button>
          </div>
          <div className="input-footer">
            <MessageSquare className="footer-icon" />
            <span>按 Enter 发送消息，Shift + Enter 换行</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;