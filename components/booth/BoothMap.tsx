'use client';

import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface Booth {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
}

interface BoothMapProps {
  userLocation: { lat: number; lng: number } | null;
  booths: Booth[];
  selectedBooth: Booth | null;
  onBoothSelect: (booth: Booth) => void;
}

export function BoothMap({ userLocation, booths, selectedBooth, onBoothSelect }: BoothMapProps) {
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  const center = selectedBooth
    ? { lat: selectedBooth.lat, lng: selectedBooth.lng }
    : userLocation || defaultCenter;
  const zoom = userLocation ? 14 : 5;

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden border shadow-sm">
      <APIProvider apiKey={apiKey}>
        <Map
          key={`${center.lat}-${center.lng}`}
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="electiondosti_booth_map"
          gestureHandling={'greedy'}
          disableDefaultUI={false}
        >
          {userLocation && (
            <AdvancedMarker position={userLocation} title="Your Location">
              <Pin background="#000080" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          )}

          {booths.map((booth) => (
            <AdvancedMarker
              key={booth.id}
              position={{ lat: booth.lat, lng: booth.lng }}
              title={booth.name}
              onClick={() => onBoothSelect(booth)}
            >
              <Pin
                background={selectedBooth?.id === booth.id ? '#FF3300' : '#FF9933'}
                borderColor="#ffffff"
                glyphColor="#ffffff"
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
