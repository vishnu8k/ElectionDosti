'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TimelinePage() {
  const [states, setStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [constituencies, setConstituencies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setStates(['Uttar Pradesh', 'Maharashtra', 'West Bengal', 'Bihar', 'Tamil Nadu', 'Madhya Pradesh']);
  }, []);

  const handleStateChange = async (value: string | null) => {
    if (!value) return;
    setSelectedState(value);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/timeline?state=${encodeURIComponent(value)}`);
      const data = await res.json();
      setConstituencies(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 min-h-[calc(100vh-4rem)]">
      <header className="text-center space-y-4 pt-8">
        <div className="w-16 h-16 bg-india-saffron/10 rounded-full flex items-center justify-center mx-auto text-india-saffron">
          <Calendar className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-india-navy tracking-tight">Election Timeline</h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Find out exactly when the elections are happening in your state and constituency.
        </p>
      </header>

      <div className="max-w-md mx-auto py-6">
        <Select onValueChange={handleStateChange} value={selectedState}>
          <SelectTrigger className="h-12 text-lg">
            <SelectValue placeholder="Select your State" />
          </SelectTrigger>
          <SelectContent>
            {states.map(state => (
              <SelectItem key={state} value={state}>{state}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="w-10 h-10 border-4 border-india-saffron border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {constituencies.map((c: any) => (
            <Card key={c.id} className="border-l-4 border-l-india-saffron">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  {c.nameEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-3 rounded-md flex justify-between items-center">
                  <span className="text-sm font-medium">Phase {c.phase}</span>
                  <span className="font-bold text-india-navy">{new Date(c.pollDate).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
          {selectedState && constituencies.length === 0 && (
             <div className="col-span-2 text-center text-muted-foreground py-8">
               No constituency data found for this state in the database yet.
             </div>
          )}
        </div>
      )}
    </div>
  );
}
