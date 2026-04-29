'use client';

import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavProps {
  items: Array<{ href: string; label: string; icon: React.ReactNode }>;
}

export function MobileNav({ items }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="p-2 hover:bg-muted rounded-md" aria-label="Menu">
        <Menu className="w-6 h-6" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[250px] sm:w-[300px] flex flex-col gap-6 pt-12">
        {items.map(item => (
          <Link 
            key={item.href} 
            href={item.href}
            onClick={() => setOpen(false)}
            className={`flex items-center gap-4 text-lg font-medium transition-colors p-2 rounded-md ${pathname.includes(item.href) ? 'bg-india-saffron/10 text-india-saffron' : 'text-foreground hover:bg-muted'}`}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
