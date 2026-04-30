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

// Static timeline data based on 2024 Indian General Election (18th Lok Sabha)
const electionData: Record<string, Array<{ id: string; nameEn: string; phase: number; pollDate: string; type: string }>> = {
  'Uttar Pradesh': [
    { id: 'up1', nameEn: 'Saharanpur', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'up2', nameEn: 'Kairana', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'up3', nameEn: 'Muzaffarnagar', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'up4', nameEn: 'Rampur', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'up5', nameEn: 'Sambhal', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'up6', nameEn: 'Firozabad', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'up7', nameEn: 'Mainpuri', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'up8', nameEn: 'Kannauj', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'up9', nameEn: 'Lucknow', phase: 5, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'up10', nameEn: 'Rae Bareli', phase: 5, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'up11', nameEn: 'Amethi', phase: 5, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'up12', nameEn: 'Varanasi', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'up13', nameEn: 'Allahabad', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'up14', nameEn: 'Gorakhpur', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
  ],
  'Maharashtra': [
    { id: 'mh1', nameEn: 'Mumbai North', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh2', nameEn: 'Mumbai North West', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh3', nameEn: 'Mumbai North East', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh4', nameEn: 'Mumbai North Central', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh5', nameEn: 'Mumbai South Central', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh6', nameEn: 'Mumbai South', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh7', nameEn: 'Pune', phase: 6, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'mh8', nameEn: 'Nashik', phase: 5, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'mh9', nameEn: 'Aurangabad', phase: 5, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'mh10', nameEn: 'Nagpur', phase: 4, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'mh11', nameEn: 'Amravati', phase: 4, pollDate: '2024-05-13', type: 'Lok Sabha' },
  ],
  'West Bengal': [
    { id: 'wb1', nameEn: 'Cooch Behar', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'wb2', nameEn: 'Alipurduars', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'wb3', nameEn: 'Jalpaiguri', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'wb4', nameEn: 'Darjeeling', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'wb5', nameEn: 'Kolkata North', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'wb6', nameEn: 'Kolkata South', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'wb7', nameEn: 'Jadavpur', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'wb8', nameEn: 'Diamond Harbour', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'wb9', nameEn: 'Howrah', phase: 7, pollDate: '2024-06-01', type: 'Lok Sabha' },
    { id: 'wb10', nameEn: 'Hooghly', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
  ],
  'Bihar': [
    { id: 'br1', nameEn: 'Aurangabad', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'br2', nameEn: 'Gaya', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'br3', nameEn: 'Nawada', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'br4', nameEn: 'Patna Sahib', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'br5', nameEn: 'Patliputra', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'br6', nameEn: 'Muzaffarpur', phase: 4, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'br7', nameEn: 'Sitamarhi', phase: 4, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'br8', nameEn: 'Madhubani', phase: 5, pollDate: '2024-05-20', type: 'Lok Sabha' },
    { id: 'br9', nameEn: 'Darbhanga', phase: 5, pollDate: '2024-05-20', type: 'Lok Sabha' },
  ],
  'Tamil Nadu': [
    { id: 'tn1', nameEn: 'Chennai North', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn2', nameEn: 'Chennai South', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn3', nameEn: 'Chennai Central', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn4', nameEn: 'Coimbatore', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn5', nameEn: 'Madurai', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn6', nameEn: 'Trichy', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn7', nameEn: 'Salem', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn8', nameEn: 'Erode', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn9', nameEn: 'Tirunelveli', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'tn10', nameEn: 'Vellore', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
  ],
  'Madhya Pradesh': [
    { id: 'mp1', nameEn: 'Bhopal', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'mp2', nameEn: 'Indore', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'mp3', nameEn: 'Gwalior', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'mp4', nameEn: 'Jabalpur', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'mp5', nameEn: 'Ujjain', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'mp6', nameEn: 'Ratlam', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'mp7', nameEn: 'Morena', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'mp8', nameEn: 'Khajuraho', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'mp9', nameEn: 'Damoh', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
    { id: 'mp10', nameEn: 'Satna', phase: 3, pollDate: '2024-05-07', type: 'Lok Sabha' },
  ],
  'Rajasthan': [
    { id: 'rj1', nameEn: 'Jaipur', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'rj2', nameEn: 'Jodhpur', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'rj3', nameEn: 'Udaipur', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'rj4', nameEn: 'Ajmer', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'rj5', nameEn: 'Bikaner', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'rj6', nameEn: 'Kota', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'rj7', nameEn: 'Alwar', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
  ],
  'Karnataka': [
    { id: 'ka1', nameEn: 'Bengaluru North', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'ka2', nameEn: 'Bengaluru South', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'ka3', nameEn: 'Bengaluru Central', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'ka4', nameEn: 'Mysuru', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'ka5', nameEn: 'Mangaluru', phase: 2, pollDate: '2024-04-26', type: 'Lok Sabha' },
    { id: 'ka6', nameEn: 'Hubli-Dharwad', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
    { id: 'ka7', nameEn: 'Gulbarga', phase: 1, pollDate: '2024-04-19', type: 'Lok Sabha' },
  ],
  'Andhra Pradesh': [
    { id: 'ap1', nameEn: 'Visakhapatnam', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'ap2', nameEn: 'Vijayawada', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'ap3', nameEn: 'Guntur', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'ap4', nameEn: 'Nellore', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'ap5', nameEn: 'Kurnool', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
    { id: 'ap6', nameEn: 'Tirupati', phase: 1, pollDate: '2024-05-13', type: 'Lok Sabha' },
  ],
  'Delhi': [
    { id: 'dl1', nameEn: 'Chandni Chowk', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl2', nameEn: 'North East Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl3', nameEn: 'East Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl4', nameEn: 'New Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl5', nameEn: 'North West Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl6', nameEn: 'West Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
    { id: 'dl7', nameEn: 'South Delhi', phase: 6, pollDate: '2024-05-25', type: 'Lok Sabha' },
  ],
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
          Find out when elections happened in your state — based on the 2024 Lok Sabha General Election schedule.
        </p>
      </header>

      <div className="max-w-md mx-auto py-4">
        <Select onValueChange={setSelectedState} value={selectedState}>
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
          <span>Showing 2024 Lok Sabha election data for <strong>{selectedState}</strong>. Results declared on June 4, 2024.</span>
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
