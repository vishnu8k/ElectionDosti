'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square } from 'lucide-react';
import { SpeechRecognitionService } from '@/lib/voice/speech-recognition';

interface VoiceMicButtonProps {
  onTranscriptComplete: (text: string) => void;
  language: string;
}

export function VoiceMicButton({ onTranscriptComplete, language }: VoiceMicButtonProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognitionService | null>(null);

  useEffect(() => {
    try {
      recognitionRef.current = new SpeechRecognitionService(
        (text, isFinal) => {
          if (isFinal) {
            onTranscriptComplete(text);
            setIsRecording(false);
          }
        },
        (error) => {
          console.error("Speech Recognition Error:", error);
          setIsRecording(false);
        }
      );
    } catch {
      setIsSupported(false);
    }
  }, [onTranscriptComplete]);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      if (recognitionRef.current) {
        recognitionRef.current.start(language);
        setIsRecording(true);
      } else {
        alert("Speech recognition is not supported in this browser.");
      }
    }
  };

  if (!isSupported) {
    return null; 
  }

  return (
    <Button 
      variant={isRecording ? "destructive" : "default"}
      size="icon" 
      onClick={toggleRecording}
      className={`rounded-full shadow-lg transition-all ${isRecording ? 'animate-pulse' : ''}`}
      aria-label={isRecording ? "Stop recording" : "Start voice input"}
    >
      {isRecording ? <Square className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
    </Button>
  );
}
