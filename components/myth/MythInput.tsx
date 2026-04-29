'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { VoiceMicButton } from '../chat/VoiceMicButton';

interface MythInputProps {
  onCheck: (claim: string) => void;
  language: string;
  disabled: boolean;
}

export function MythInput({ onCheck, language, disabled }: MythInputProps) {
  const [claim, setClaim] = useState('');

  const handleCheck = () => {
    if (claim.trim() && !disabled) {
      onCheck(claim.trim());
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCheck();
    }
  };

  return (
    <div className="flex items-center gap-3 p-4 bg-card rounded-xl shadow-sm border">
      <VoiceMicButton 
        language={language}
        onTranscriptComplete={(transcript) => {
          setClaim(prev => (prev ? `${prev} ${transcript}` : transcript));
        }}
      />
      <Input
        value={claim}
        onChange={(e) => setClaim(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Paste a WhatsApp forward or type a claim..."
        className="flex-1 bg-muted/50 border-transparent focus-visible:ring-india-saffron text-lg py-6"
        disabled={disabled}
      />
      <Button 
        onClick={handleCheck} 
        disabled={!claim.trim() || disabled}
        className="h-12 px-6 rounded-lg bg-india-navy hover:bg-india-navy/90 text-white font-semibold flex-shrink-0"
      >
        <Search className="w-5 h-5 mr-2" />
        Verify
      </Button>
    </div>
  );
}
