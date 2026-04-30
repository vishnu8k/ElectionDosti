'use client';

import React from 'react';
import { TopicCard } from '@/components/education/TopicCard';
import { BookOpen, FileText, Fingerprint, CalendarCheck, ShieldCheck, Users, Scale, Globe, Vote, Info } from 'lucide-react';

export default function EducationPage({ params: { locale } }: { params: { locale: string } }) {
  const topics = [
    {
      id: 'voter-registration',
      title: 'Voter Registration',
      description: 'Learn how to register to vote, check your name in the electoral roll, and get your Voter ID card.',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'evm-vvpat',
      title: 'EVM & VVPAT',
      description: 'Understand how Electronic Voting Machines and Voter Verifiable Paper Audit Trails work and why they are secure.',
      icon: <Fingerprint className="w-6 h-6" />
    },
    {
      id: 'election-process',
      title: 'The Election Process',
      description: 'A step-by-step guide to how elections are announced, conducted, and results declared in India.',
      icon: <CalendarCheck className="w-6 h-6" />
    },
    {
      id: 'voter-rights',
      title: 'Voter Rights & Duties',
      description: 'Know your constitutional rights as a citizen and your responsibilities on election day.',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 'model-code-of-conduct',
      title: 'Model Code of Conduct',
      description: 'Learn what rules political parties and candidates must follow during election campaigns.',
      icon: <ShieldCheck className="w-6 h-6" />
    },
    {
      id: 'election-commission',
      title: 'Election Commission of India',
      description: 'Discover the role, powers, and structure of the independent body that conducts free and fair elections.',
      icon: <Scale className="w-6 h-6" />
    },
    {
      id: 'nota',
      title: 'NOTA – None of the Above',
      description: 'Understand when and why you can use NOTA, and what happens when NOTA gets the most votes.',
      icon: <Vote className="w-6 h-6" />
    },
    {
      id: 'election-phases',
      title: 'Multi-Phase Elections',
      description: 'Why Indian elections are held in multiple phases and how the schedule is decided across states.',
      icon: <Globe className="w-6 h-6" />
    },
    {
      id: 'candidate-eligibility',
      title: 'Candidate Eligibility',
      description: 'Who can contest elections in India? Learn about age, citizenship, and disqualification rules.',
      icon: <Users className="w-6 h-6" />
    },
    {
      id: 'electoral-roll',
      title: 'Electoral Roll & EPIC',
      description: 'How the voter list is prepared, updated, and how to correct errors in your electoral roll entry.',
      icon: <Info className="w-6 h-6" />
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
