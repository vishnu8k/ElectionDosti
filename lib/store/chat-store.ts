import { create } from 'zustand';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

interface ChatStore {
  messages: ChatMessage[];
  isTyping: boolean;
  addMessage: (message: ChatMessage) => void;
  updateMessage: (id: string, text: string, isStreaming: boolean) => void;
  setTyping: (status: boolean) => void;
  clearChat: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  updateMessage: (id, text, isStreaming) => set((state) => ({
    messages: state.messages.map(msg => 
      msg.id === id ? { ...msg, text: msg.text + text, isStreaming } : msg
    )
  })),
  setTyping: (status) => set({ isTyping: status }),
  clearChat: () => set({ messages: [] })
}));
