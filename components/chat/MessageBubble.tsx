'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Bot, User } from 'lucide-react';
import { speakText } from '@/lib/voice/tts-client';
import { ChatMessage } from '@/lib/store/chat-store';

interface MessageBubbleProps {
  message: ChatMessage;
  language: string;
}

export function MessageBubble({ message, language }: MessageBubbleProps) {
  const isModel = message.role === 'model';
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayTTS = async () => {
    if (isPlaying || message.isStreaming) return;
    setIsPlaying(true);
    try {
      await speakText(message.text, language);
    } catch (error) {
      console.error('TTS error:', error);
    } finally {
      setIsPlaying(false);
    }
  };

  return (
    <div className={`flex w-full ${isModel ? 'justify-start' : 'justify-end'} mb-4`}>
      <div className={`flex max-w-[80%] ${isModel ? 'flex-row' : 'flex-row-reverse'} items-end gap-2`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isModel ? 'bg-india-saffron text-white' : 'bg-india-navy text-white'}`}>
          {isModel ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className={`relative px-4 py-3 rounded-2xl ${isModel ? 'bg-card text-card-foreground shadow-sm rounded-bl-sm border border-border' : 'bg-primary text-primary-foreground rounded-br-sm shadow-md'}`}>
          <div className="whitespace-pre-wrap text-sm leading-relaxed break-words">
            {message.text}
            {message.isStreaming && <span className="inline-block w-1 h-4 ml-1 bg-current animate-pulse align-middle" />}
          </div>
          
          {isModel && !message.isStreaming && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute -right-10 bottom-0 h-8 w-8 text-muted-foreground hover:text-foreground"
              onClick={handlePlayTTS}
              disabled={isPlaying}
              aria-label="Play text-to-speech"
            >
              {isPlaying ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
