'use client';

import React from 'react';
import { TopicCard } from '@/components/education/TopicCard';
import { BookOpen, FileText, Fingerprint, CalendarCheck } from 'lucide-react';

export default function EducationPage({ params: { locale } }: { params: { locale: string } }) {
  const topics = [
    {
      id: 'voter-registration',
      title: 'Voter Registration',
      description: 'Learn how to register to vote, check your name in the electoral roll, and get your Voter ID.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'evm-vvpat',
      title: 'EVM & VVPAT',
      description: 'Understand how Electronic Voting Machines and Voter Verifiable Paper Audit Trails work.',
      icon: <Fingerprint className="w-6 h-6" />
    },
    {
      id: 'election-process',
      title: 'The Election Process',
      description: 'A step-by-step guide to how elections are conducted in India.',
      icon: <CalendarCheck className="w-6 h-6" />
    },
    {
      id: 'voter-rights',
      title: 'Voter Rights & Duties',
      description: 'Know your rights as a citizen and your responsibilities on election day.',
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <header className="text-center space-y-4 pt-8">
        <h1 className="text-3xl md:text-4xl font-bold text-india-navy tracking-tight">Election Education Library</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Empower yourself with knowledge. Read simplified guides based directly on the Election Commission of India&apos;s guidelines.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
        {topics.map(topic => (
          <TopicCard 
            key={topic.id}
            id={topic.id}
            title={topic.title}
            description={topic.description}
            icon={topic.icon}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
