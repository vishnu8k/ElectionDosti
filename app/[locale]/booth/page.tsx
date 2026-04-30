'use client';

import React, { useState } from 'react';
import { BoothMap } from '@/components/booth/BoothMap';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface Booth {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

export default function BoothFinderPage() {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [booths, setBooths] = useState<Booth[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBooth, setSelectedBooth] = useState<Booth | null>(null);

  const handleLocateMe = () => {
    setIsLoading(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const loc = { lat: position.coords.latitude, lng: position.coords.longitude };
          setUserLocation(loc);
          setSelectedBooth(null);

          // Simulate nearby booths relative to user location
          const nearbyBooths: Booth[] = [
            { id: '1', name: 'Primary School Booth A', lat: loc.lat + 0.005, lng: loc.lng + 0.005, address: 'Main Road, City' },
            { id: '2', name: 'Community Center Booth', lat: loc.lat - 0.003, lng: loc.lng + 0.008, address: 'Cross Street, City' },
            { id: '3', name: 'High School Booth B', lat: loc.lat + 0.008, lng: loc.lng - 0.004, address: 'Park Avenue, City' },
            { id: '4', name: 'Town Hall Booth C', lat: loc.lat - 0.006, lng: loc.lng - 0.003, address: 'Town Hall Road, City' },
          ];
          setBooths(nearbyBooths);
          setIsLoading(false);
        },
        (error) => {
          console.error(error);
          setIsLoading(false);
          alert('Could not access your location. Please check your browser permissions.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      setIsLoading(false);
      alert('Geolocation is not supported by your browser.');
    }
  };

  const handleGetDirections = (booth: Booth) => {
    // Open Google Maps with directions from user location to booth
    const origin = userLocation
      ? `${userLocation.lat},${userLocation.lng}`
      : 'My+Location';
    const destination = `${booth.lat},${booth.lng}`;
    const url = `https://www.google.com/maps/dir/${origin}/${destination}`;
    window.open(url, '_blank', 'noopener,noreferrer');
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
          {isLoading ? 'Locating...' : 'Locate Me'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BoothMap
            userLocation={userLocation}
            booths={booths}
            selectedBooth={selectedBooth}
            onBoothSelect={(booth) => setSelectedBooth(booth)}
          />
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-lg border-b pb-2">Nearby Booths</h3>
          {booths.length > 0 ? (
            booths.map(booth => (
              <Card
                key={booth.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-md ${selectedBooth?.id === booth.id ? 'ring-2 ring-india-saffron' : ''}`}
                onClick={() => setSelectedBooth(booth)}
              >
                <CardContent className="p-4">
                  <h4 className="font-medium text-india-navy">{booth.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{booth.address}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3 text-india-saffron border-india-saffron hover:bg-india-saffron hover:text-white"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(booth);
                    }}
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-muted/30 rounded-xl border border-dashed">
              <MapPin className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>Click &apos;Locate Me&apos; to see booths near you.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
