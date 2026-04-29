'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, MessageCircle, Map, Calendar, BookOpen } from 'lucide-react';
import { SettingsDialog } from '../settings/SettingsDialog';
import { MobileNav } from './MobileNav';

export function Navbar() {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const navItems = [
    { href: `/${locale}/chat`, label: 'Chat', icon: <MessageCircle className="w-5 h-5" /> },
    { href: `/${locale}/myth-buster`, label: 'Myth Buster', icon: <ShieldCheck className="w-5 h-5" /> },
    { href: `/${locale}/timeline`, label: 'Timeline', icon: <Calendar className="w-5 h-5" /> },
    { href: `/${locale}/booth`, label: 'Booth Finder', icon: <Map className="w-5 h-5" /> },
    { href: `/${locale}/education`, label: 'Education', icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-india-saffron flex items-center justify-center text-white font-bold">
            ED
          </div>
          <span className="font-bold text-xl text-india-navy hidden sm:inline-block">ElectionDosti</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map(item => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-india-saffron ${pathname.includes(item.href) ? 'text-india-saffron' : 'text-muted-foreground'}`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
          <div className="pl-4 border-l border-border flex items-center">
            <SettingsDialog />
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="flex md:hidden items-center gap-2">
          <SettingsDialog />
          <MobileNav items={navItems} />
        </div>
      </div>
    </nav>
  );
}
