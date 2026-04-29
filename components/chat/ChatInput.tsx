'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SendHorizontal } from 'lucide-react';
import { VoiceMicButton } from './VoiceMicButton';

interface ChatInputProps {
  onSend: (text: string) => void;
  language: string;
  disabled: boolean;
}

export function ChatInput({ onSend, language, disabled }: ChatInputProps) {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 bg-background border-t">
      <VoiceMicButton 
        language={language}
        onTranscriptComplete={(transcript) => {
          setText(prev => (prev ? `${prev} ${transcript}` : transcript));
        }}
      />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message here..."
        className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:ring-india-saffron focus-visible:ring-offset-0"
        disabled={disabled}
      />
      <Button 
        onClick={handleSend} 
        disabled={!text.trim() || disabled}
        size="icon"
        className="rounded-full bg-india-navy hover:bg-india-navy/90 text-white flex-shrink-0"
        aria-label="Send message"
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
}
