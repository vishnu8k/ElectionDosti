'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Settings, Moon, Sun, Type } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/lib/i18n/config';

export function SettingsDialog() {
  const router = useRouter();
  const pathname = usePathname();
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isHC = document.documentElement.classList.contains('high-contrast');
    setHighContrast(isHC);
    const isLF = document.documentElement.classList.contains('large-font');
    setFontSize(isLF ? 'large' : 'normal');
  }, [isOpen]);

  const toggleHighContrast = () => {
    document.documentElement.classList.toggle('high-contrast');
    setHighContrast(!highContrast);
  };

  const toggleFontSize = () => {
    document.documentElement.classList.toggle('large-font');
    setFontSize(fontSize === 'normal' ? 'large' : 'normal');
  };

  const changeLanguage = (newLocale: string) => {
    const parts = pathname.split('/');
    if (locales.includes(parts[1])) {
      parts[1] = newLocale;
      router.push(parts.join('/') || '/');
    } else {
      router.push(`/${newLocale}${pathname}`);
    }
    setIsOpen(false);
  };

  const currentLocale = pathname.split('/')[1] || 'en';

  const languageNames: Record<string, string> = {
    'en': 'English', 'hi': 'हिंदी (Hindi)', 'ta': 'தமிழ் (Tamil)', 
    'te': 'తెలుగు (Telugu)', 'kn': 'ಕನ್ನಡ (Kannada)', 'bn': 'বাংলা (Bengali)'
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="p-2 hover:bg-muted rounded-md" aria-label="Settings">
        <Settings className="w-5 h-5" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-india-navy">Accessibility & Settings</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Language</h3>
            <div className="grid grid-cols-2 gap-2">
              {locales.map(l => (
                <Button 
                  key={l}
                  variant={currentLocale === l ? 'default' : 'outline'}
                  onClick={() => changeLanguage(l)}
                  className={currentLocale === l ? 'bg-india-navy text-white' : ''}
                >
                  {languageNames[l]}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Display</h3>
            <div className="flex gap-4">
              <Button 
                variant="outline" 
                className="flex-1 flex gap-2"
                onClick={toggleHighContrast}
              >
                {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {highContrast ? 'Normal Contrast' : 'High Contrast'}
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 flex gap-2"
                onClick={toggleFontSize}
              >
                <Type className="w-4 h-4" />
                {fontSize === 'normal' ? 'Large Text' : 'Normal Text'}
              </Button>
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
