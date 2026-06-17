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
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;
    if (mapInstanceRef.current) return;

    import('leaflet').then((L) => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const map = L.map(mapRef.current!, { center: [38.9072, -77.0369], zoom: 13, zoomControl: false });
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;
      addMarkers(L, map, places, onSelectPlace);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
        userMarkerRef.current = null;
      }
    };
  }, []);

  // Update place markers when filters change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      addMarkers(L, mapInstanceRef.current, places, onSelectPlace);
    });
  }, [places, onSelectPlace]);

  // Update user location marker
  useEffect(() => {
    if (!mapInstanceRef.current || !userLocation) return;
    import('leaflet').then((L) => {
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      const userIcon = L.divIcon({
        html: `
          <div style="position:relative;width:24px;height:24px;">
            <div style="
              position:absolute;inset:0;
              background:rgba(59,130,246,0.25);
              border-radius:50%;
              animation:pulse 2s ease-out infinite;
            "></div>
            <div style="
              position:absolute;inset:4px;
              background:#3b82f6;
              border:2.5px solid white;
              border-radius:50%;
              box-shadow:0 2px 6px rgba(0,0,0,0.3);
            "></div>
          </div>
          <style>
            @keyframes pulse {
              0% { transform: scale(1); opacity: 0.8; }
              100% { transform: scale(3); opacity: 0; }
            }
          </style>
        `,
        className: '',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      userMarkerRef.current = L.marker(userLocation, { icon: userIcon }).addTo(mapInstanceRef.current);
      mapInstanceRef.current.setView(userLocation, 14);
    });
  }, [userLocation]);

  function addMarkers(L: any, map: any, pts: Place[], onSelect: (p: Place) => void) {
    pts.forEach((place) => {
      const icon = L.divIcon({
        html: `<div style="background:#10b981;border:2.5px solid white;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.3);cursor:pointer;font-size:11px;font-weight:700;color:white;font-family:-apple-system,sans-serif">${place.bookNumber}</div>`,
        className: '',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      });
      const marker = L.marker([place.latitude, place.longitude], { icon }).addTo(map).on('click', () => onSelect(place));
      markersRef.current.push(marker);
    });
  }

  return (
    <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }} />
  );
}
