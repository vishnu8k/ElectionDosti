'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export type Verdict = 'TRUE' | 'FALSE' | 'PARTIALLY_TRUE';

interface MythVerdictCardProps {
  claim: string;
  verdict: Verdict;
  explanation: string;
  confidence: number;
}

export function MythVerdictCard({ claim, verdict, explanation, confidence }: MythVerdictCardProps) {
  const config = {
    TRUE: {
      color: 'text-india-green',
      bg: 'bg-india-green/10',
      border: 'border-india-green/20',
      icon: <CheckCircle className="w-8 h-8 text-india-green" />,
      label: 'True / Verified'
    },
    FALSE: {
      color: 'text-destructive',
      bg: 'bg-destructive/10',
      border: 'border-destructive/20',
      icon: <XCircle className="w-8 h-8 text-destructive" />,
      label: 'False / Fake News'
    },
    PARTIALLY_TRUE: {
      color: 'text-india-saffron',
      bg: 'bg-india-saffron/10',
      border: 'border-india-saffron/20',
      icon: <AlertTriangle className="w-8 h-8 text-india-saffron" />,
      label: 'Partially True / Needs Context'
    }
  };

  const current = config[verdict];

  return (
    <Card className={`mt-6 overflow-hidden border-2 ${current.border}`}>
      <CardHeader className={`${current.bg} border-b ${current.border} pb-4`}>
        <div className="flex items-center gap-3">
          {current.icon}
          <div>
            <CardTitle className={`text-xl font-bold ${current.color}`}>
              {current.label}
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              AI Confidence: {(confidence * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">The Claim</h3>
          <p className="text-foreground italic">&quot;{claim}&quot;</p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-1">The Facts</h3>
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">{explanation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
