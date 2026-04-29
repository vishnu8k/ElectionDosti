'use client';

import React, { useEffect, useRef } from 'react';
import { useChatStore } from '@/lib/store/chat-store';
import { MessageBubble } from '@/components/chat/MessageBubble';
import { ChatInput } from '@/components/chat/ChatInput';
import { v4 as uuidv4 } from 'uuid';

export default function ChatPage({ params: { locale } }: { params: { locale: string } }) {
  const { messages, isTyping, addMessage, updateMessage, setTyping } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    const userMsgId = uuidv4();
    addMessage({ id: userMsgId, role: 'user', text });
    
    const modelMsgId = uuidv4();
    addMessage({ id: modelMsgId, role: 'model', text: '', isStreaming: true });
    setTyping(true);

    try {
      const history = messages.slice(-10).map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, language: locale, history })
      });

      if (!response.ok) throw new Error('Failed to fetch chat response');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          updateMessage(modelMsgId, '', false);
          break;
        }
        const chunk = decoder.decode(value, { stream: true });
        updateMessage(modelMsgId, chunk, true);
      }
    } catch (error) {
      console.error('Chat stream error:', error);
      updateMessage(modelMsgId, '\n\n**Error:** Sorry, I encountered an issue while generating the response. Please try again.', false);
    } finally {
      setTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-4xl mx-auto w-full bg-background border-x border-b shadow-sm relative mt-8 rounded-t-xl overflow-hidden">
      <header className="px-6 py-4 border-b bg-india-saffron/10 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-india-saffron flex items-center justify-center text-white font-bold shadow-md">
          ED
        </div>
        <div>
          <h1 className="text-lg font-semibold text-india-navy">ElectionDosti Chat</h1>
          <p className="text-xs text-muted-foreground">Your 24/7 AI Election Companion</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4 opacity-50">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center text-4xl">
              🇮🇳
            </div>
            <p className="max-w-xs text-sm">
              Ask me anything about the Indian electoral process, verifying myths, finding your polling booth, and more!
            </p>
          </div>
        )}
        
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} language={locale} />
        ))}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSend={handleSend} language={locale} disabled={isTyping} />
    </div>
  );
}
