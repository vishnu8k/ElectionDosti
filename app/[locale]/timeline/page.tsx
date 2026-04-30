'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Info } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Projected timeline data based on upcoming 2026 State Assembly Elections
const electionData: Record<string, Array<{ id: string; nameEn: string; phase: number; pollDate: string; type: string }>> = {
  'Tamil Nadu': [
    { id: 'tn1', nameEn: 'Chennai District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn2', nameEn: 'Coimbatore District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn3', nameEn: 'Madurai District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn4', nameEn: 'Tiruchirappalli District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn5', nameEn: 'Salem District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn6', nameEn: 'Tirunelveli District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'tn7', nameEn: 'Erode District', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
  ],
  'West Bengal': [
    { id: 'wb1', nameEn: 'Bankura & Purulia', phase: 1, pollDate: '2026-03-27', type: 'Assembly' },
    { id: 'wb2', nameEn: 'Paschim Medinipur', phase: 2, pollDate: '2026-04-01', type: 'Assembly' },
    { id: 'wb3', nameEn: 'Howrah & Hooghly', phase: 3, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'wb4', nameEn: 'Cooch Behar & Alipurduar', phase: 4, pollDate: '2026-04-10', type: 'Assembly' },
    { id: 'wb5', nameEn: 'Darjeeling & Jalpaiguri', phase: 5, pollDate: '2026-04-17', type: 'Assembly' },
    { id: 'wb6', nameEn: 'North 24 Parganas', phase: 6, pollDate: '2026-04-22', type: 'Assembly' },
    { id: 'wb7', nameEn: 'Kolkata & South 24 Parganas', phase: 7, pollDate: '2026-04-26', type: 'Assembly' },
    { id: 'wb8', nameEn: 'Birbhum & Murshidabad', phase: 8, pollDate: '2026-04-29', type: 'Assembly' },
  ],
  'Kerala': [
    { id: 'kl1', nameEn: 'Thiruvananthapuram', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'kl2', nameEn: 'Ernakulam', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'kl3', nameEn: 'Kozhikode', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'kl4', nameEn: 'Thrissur', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'kl5', nameEn: 'Malappuram', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
  ],
  'Assam': [
    { id: 'as1', nameEn: 'Upper Assam', phase: 1, pollDate: '2026-03-27', type: 'Assembly' },
    { id: 'as2', nameEn: 'Barak Valley & Central Assam', phase: 2, pollDate: '2026-04-01', type: 'Assembly' },
    { id: 'as3', nameEn: 'Lower Assam', phase: 3, pollDate: '2026-04-06', type: 'Assembly' },
  ],
  'Puducherry': [
    { id: 'py1', nameEn: 'Puducherry Region', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'py2', nameEn: 'Karaikal Region', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
    { id: 'py3', nameEn: 'Mahe & Yanam', phase: 1, pollDate: '2026-04-06', type: 'Assembly' },
  ]
};

const stateList = Object.keys(electionData).sort();

const phaseColors: Record<number, string> = {
  1: 'bg-red-100 text-red-700 border-red-200',
  2: 'bg-orange-100 text-orange-700 border-orange-200',
  3: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  4: 'bg-green-100 text-green-700 border-green-200',
  5: 'bg-teal-100 text-teal-700 border-teal-200',
  6: 'bg-blue-100 text-blue-700 border-blue-200',
  7: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function TimelinePage() {
  const [selectedState, setSelectedState] = useState<string>('');
  const constituencies = selectedState ? (electionData[selectedState] || []) : [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <header className="text-center space-y-4 pt-8">
        <div className="w-16 h-16 bg-india-saffron/10 rounded-full flex items-center justify-center mx-auto text-india-saffron">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-india-navy tracking-tight">Election Timeline</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Find out when elections are happening in your state — based on the upcoming 2026 State Assembly Elections schedule.
        </p>
      </header>

      <div className="max-w-md mx-auto py-4">
        <Select onValueChange={(v: string | null) => v && setSelectedState(v)} value={selectedState}>
          <SelectTrigger className="h-12 text-lg">
            <SelectValue placeholder="Select your State" />
          </SelectTrigger>
          <SelectContent>
            {stateList.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedState && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/30 rounded-lg p-3 border border-dashed">
          <Info className="w-4 h-4 flex-shrink-0" />
          <span>Showing projected 2026 Assembly election data for <strong>{selectedState}</strong>. Actual dates may vary when announced by ECI.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {constituencies.map((c) => (
          <Card key={c.id} className="border-l-4 border-l-india-saffron hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                {c.nameEn}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center gap-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${phaseColors[c.phase] || 'bg-gray-100 text-gray-700'}`}>
                  Phase {c.phase}
                </span>
                <span className="font-bold text-india-navy text-sm">
                  {new Date(c.pollDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">{c.type} Constituency</div>
            </CardContent>
          </Card>
        ))}
        {selectedState && constituencies.length === 0 && (
          <div className="col-span-2 text-center text-muted-foreground py-8">
            No constituency data found for this state.
          </div>
        )}
      </div>
    </div>
  );
}
