'use client';

import React, { useState } from 'react';
import { MythInput } from '@/components/myth/MythInput';
import { MythVerdictCard, Verdict } from '@/components/myth/MythVerdictCard';
import { ShieldAlert } from 'lucide-react';
import { db } from '@/lib/db/dexie';
import { v4 as uuidv4 } from 'uuid';

interface MythResult {
  verdict: Verdict;
  explanation: string;
  confidence: number;
}

export default function MythBusterPage({ params: { locale } }: { params: { locale: string } }) {
  const [claim, setClaim] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MythResult | null>(null);
  const [error, setError] = useState('');

  const handleCheckMyth = async (newClaim: string) => {
    setIsLoading(true);
    setClaim(newClaim);
    setResult(null);
    setError('');

    try {
      const response = await fetch('/api/myth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: newClaim, language: locale })
      });

      if (!response.ok) {
        throw new Error('Failed to verify the claim.');
      }

      const data: MythResult = await response.json();
      setResult(data);

      try {
        await db.myths.put({
          mythId: uuidv4(),
          claimEn: newClaim,
          claimHi: '', claimTa: '', claimTe: '',
          verdict: data.verdict,
          keywords: newClaim.toLowerCase().split(' ').filter(w => w.length > 3),
          explanationEn: data.explanation,
          explanationHi: '',
          sourceUrl: ''
        });
      } catch (cacheError) {
        console.warn('Failed to cache myth', cacheError);
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred while fact-checking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <header className="text-center space-y-4 pt-8">
        <div className="w-16 h-16 bg-india-saffron/10 rounded-full flex items-center justify-center mx-auto text-india-saffron">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-india-navy tracking-tight">Election Fact-Checker</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Received a suspicious message on WhatsApp? Unsure about a voting rule? Paste it below to verify its authenticity instantly.
        </p>
      </header>

      <MythInput onCheck={handleCheckMyth} language={locale} disabled={isLoading} />

      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12 space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-india-saffron border-t-transparent animate-spin" />
          <p className="text-muted-foreground font-medium">Analyzing claim against ECI guidelines...</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-center">
          {error}
        </div>
      )}

      {result && !isLoading && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <MythVerdictCard 
            claim={claim}
            verdict={result.verdict}
            explanation={result.explanation}
            confidence={result.confidence}
          />
        </div>
      )}

      {!result && !isLoading && !error && (
        <div className="py-12 text-center opacity-40">
          <p>Common topics: EVM tampering, voter registration deadlines, required IDs</p>
        </div>
      )}
    </div>
  );
}
