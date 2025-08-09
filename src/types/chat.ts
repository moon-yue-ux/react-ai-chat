export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isTyping: boolean;
  inputValue: string;
}

export interface AIResponse {
  text: string;
  delay?: number;
}