'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

interface TopicCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  locale: string;
}

export function TopicCard({ id, title, description, icon, locale }: TopicCardProps) {
  return (
    <Link href={`/${locale}/education/${id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer border-india-saffron/20 group h-full">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <div className="p-2 bg-india-saffron/10 rounded-lg text-india-saffron group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <CardTitle className="text-xl text-india-navy">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
