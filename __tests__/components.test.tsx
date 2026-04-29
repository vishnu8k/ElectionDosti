import React from 'react';
import { render, screen } from '@testing-library/react';
import { TopicCard } from '@/components/education/TopicCard';
import { MythVerdictCard } from '@/components/myth/MythVerdictCard';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

describe('UI Components', () => {
  it('renders TopicCard correctly', () => {
    render(
      <TopicCard 
        id="test-id"
        title="Test Title"
        description="Test Description"
        icon={<span>Icon</span>}
        locale="en"
      />
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders MythVerdictCard correctly (TRUE)', () => {
    render(
      <MythVerdictCard 
        claim="The election is tomorrow."
        verdict="TRUE"
        explanation="This is true."
        confidence={0.95}
      />
    );
    expect(screen.getByText('True / Verified')).toBeInTheDocument();
    expect(screen.getByText('This is true.')).toBeInTheDocument();
  });
});
