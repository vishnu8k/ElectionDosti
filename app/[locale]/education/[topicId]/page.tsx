'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Volume2 } from 'lucide-react';
import Link from 'next/link';
import { speakText } from '@/lib/voice/tts-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contentMap: Record<string, any> = {
  'voter-registration': {
    title: 'Voter Registration',
    content: "To register to vote in India, you must be an Indian citizen, 18 years of age or older on the qualifying date (January 1st of the year of revision of electoral roll). You can apply online via the National Voters' Service Portal (NVSP) by filling Form 6, or offline by submitting it to the Electoral Registration Officer of your constituency."
  },
  'evm-vvpat': {
    title: 'EVM & VVPAT',
    content: "EVM stands for Electronic Voting Machine. It consists of a Control Unit and a Balloting Unit. VVPAT stands for Voter Verifiable Paper Audit Trail. When you cast your vote, a paper slip is printed containing the serial number, name, and symbol of the candidate you voted for. It is visible for 7 seconds through a transparent window."
  },
  'election-process': {
    title: 'The Election Process',
    content: "The election process begins with the notification by the ECI. Candidates file nominations, followed by scrutiny and withdrawal. Then campaigns take place, ending 48 hours before polling. On polling day, citizens vote using EVMs. Finally, counting occurs on a designated day, and results are declared."
  },
  'voter-rights': {
    title: 'Voter Rights & Duties',
    content: "You have the right to know about candidates, the right to vote secretly, and the right to choose NOTA (None of the Above) if you do not prefer any candidate. It is your duty to vote ethically, without being influenced by money, muscle power, or caste/religion affiliations."
  }
};

export default function TopicPage({ params: { locale, topicId } }: { params: { locale: string, topicId: string } }) {
  const data = contentMap[topicId] || { title: 'Topic Not Found', content: 'This topic does not exist.' };

  const handlePlayAudio = () => {
    speakText(data.content, locale);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <Link href={`/${locale}/education`}>
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Topics
        </Button>
      </Link>
      
      <div className="bg-card p-6 md:p-10 rounded-2xl shadow-sm border space-y-6">
        <div className="flex items-center justify-between border-b pb-6">
          <h1 className="text-3xl font-bold text-india-navy">{data.title}</h1>
          <Button variant="outline" size="icon" onClick={handlePlayAudio} aria-label="Listen to article" className="rounded-full text-india-saffron border-india-saffron">
            <Volume2 className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="prose prose-lg max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
          {data.content}
        </div>
      </div>
    </div>
  );
}
