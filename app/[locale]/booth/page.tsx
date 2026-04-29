'use client';

import React, { useState } from 'react';
import { BoothMap } from '@/components/booth/BoothMap';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function BoothFinderPage() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [booths, setBooths] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLocateMe = () => {
    setIsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          
          setBooths([
            { id: '1', name: 'Primary School Booth A', lat: loc.lat + 0.005, lng: loc.lng + 0.005, address: 'Main Road, City' },
            { id: '2', name: 'Community Center Booth', lat: loc.lat - 0.003, lng: loc.lng + 0.008, address: 'Cross Street, City' },
            { id: '3', name: 'High School Booth B', lat: loc.lat + 0.008, lng: loc.lng - 0.004, address: 'Park Avenue, City' }
          ]);
          setIsLoading(false);
        },
        (error) => {
          console.error(error);
          setIsLoading(false);
          alert('Could not access your location. Please check your browser permissions.');
        }
      );
    } else {
      setIsLoading(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 min-h-[calc(100vh-4rem)]">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4">
        <div>
          <h1 className="text-3xl font-bold text-india-navy tracking-tight flex items-center gap-3">
            <MapPin className="w-8 h-8 text-india-saffron" />
            Find Your Polling Booth
          </h1>
          <p className="text-muted-foreground mt-2">Discover polling stations near your current location.</p>
        </div>
        <Button onClick={handleLocateMe} disabled={isLoading} className="bg-india-navy hover:bg-india-navy/90 text-white">
          <Navigation className="w-4 h-4 mr-2" />
          Locate Me
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BoothMap userLocation={userLocation} booths={booths} />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Nearby Booths</h3>
          {booths.length > 0 ? (
            booths.map(booth => (
              <Card key={booth.id}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-india-navy">{booth.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{booth.address}</p>
                  <Button variant="outline" size="sm" className="w-full mt-3 text-india-saffron border-india-saffron">
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
              Click &apos;Locate Me&apos; to see booths near you.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
