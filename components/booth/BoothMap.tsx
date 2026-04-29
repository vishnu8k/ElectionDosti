'use client';

import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

interface BoothMapProps {
  userLocation: { lat: number; lng: number } | null;
  booths: Array<{ id: string; name: string; lat: number; lng: number; address: string }>;
}

export function BoothMap({ userLocation, booths }: BoothMapProps) {
  const defaultCenter = { lat: 20.5937, lng: 78.9629 };
  const center = userLocation || defaultCenter;
  const zoom = userLocation ? 14 : 5;

  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY || '';

  return (
    <div className="w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden border shadow-sm">
      <APIProvider apiKey={apiKey}>
        <Map
          defaultCenter={center}
          defaultZoom={zoom}
          mapId="electiondosti_booth_map"
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        >
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <Pin background="#000080" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          )}

          {booths.map((booth) => (
            <AdvancedMarker key={booth.id} position={{ lat: booth.lat, lng: booth.lng }}>
              <Pin background="#FF9933" borderColor="#ffffff" glyphColor="#ffffff" />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
