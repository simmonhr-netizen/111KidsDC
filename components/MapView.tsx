'use client';

import { useEffect, useRef } from 'react';
import { Place } from '@/types';

interface MapViewProps {
  places: Place[];
  onSelectPlace: (place: Place) => void;
  userLocation?: [number, number];
}

export default function MapView({ places, onSelectPlace, userLocation }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    // Dynamically import Leaflet to avoid SSR issues
    import('leaflet').then((L) => {
      // Fix default marker icons for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      if (mapInstanceRef.current) return; // already initialized

      const map = L.map(mapRef.current!, {
        center: [38.9072, -77.0369], // Washington DC
        zoom: 12,
        zoomControl: true,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add place markers
      places.forEach((place) => {
        const customIcon = L.divIcon({
          html: `<div class="map-pin" data-number="${place.bookNumber}">
            <div class="pin-bubble">
              <span class="pin-number">${place.bookNumber}</span>
            </div>
            <div class="pin-tip"></div>
          </div>`,
          className: '',
          iconSize: [36, 44],
          iconAnchor: [18, 44],
          popupAnchor: [0, -44],
        });

        const marker = L.marker([place.latitude, place.longitude], { icon: customIcon })
          .addTo(map)
          .on('click', () => onSelectPlace(place));

        markersRef.current.push(marker);
      });

      // Add user location marker if available
      if (userLocation) {
        const userIcon = L.divIcon({
          html: `<div class="user-pin">📍</div>`,
          className: '',
          iconSize: [30, 30],
          iconAnchor: [15, 30],
        });
        L.marker(userLocation, { icon: userIcon }).addTo(map);
        map.setView(userLocation, 13);
      }
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers when places change (e.g. filters)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      // Remove old markers
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];

      // Add filtered markers
      places.forEach((place) => {
        const customIcon = L.divIcon({
          html: `<div class="map-pin">
            <div class="pin-bubble">
              <span class="pin-number">${place.bookNumber}</span>
            </div>
            <div class="pin-tip"></div>
          </div>`,
          className: '',
          iconSize: [36, 44],
          iconAnchor: [18, 44],
        });

        const marker = L.marker([place.latitude, place.longitude], { icon: customIcon })
          .addTo(mapInstanceRef.current!)
          .on('click', () => onSelectPlace(place));

        markersRef.current.push(marker);
      });
    });
  }, [places, onSelectPlace]);

  return (
    <>
      <style>{`
        .map-pin { display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        .pin-bubble {
          background: #10b981;
          border: 2.5px solid white;
          border-radius: 50%;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
          transition: transform 0.15s;
        }
        .map-pin:hover .pin-bubble { transform: scale(1.15); background: #059669; }
        .pin-number { color: white; font-size: 11px; font-weight: 700; }
        .pin-tip {
          width: 0; height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-top: 8px solid #10b981;
          margin-top: -1px;
        }
        .user-pin { font-size: 26px; line-height: 1; filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3)); }
        .leaflet-container { font-family: inherit; }
      `}</style>
      <div ref={mapRef} className="w-full h-full rounded-2xl overflow-hidden" />
    </>
  );
}
