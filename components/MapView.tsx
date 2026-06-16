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

      if (userLocation) {
        const icon = L.divIcon({ html: '<div style="font-size:28px">📍</div>', className: '', iconSize: [28,28], iconAnchor: [14,28] });
        L.marker(userLocation, { icon }).addTo(map);
        map.setView(userLocation, 14);
      }
    });

    return () => {
      if (mapInstanceRef.current) { mapInstanceRef.current.remove(); mapInstanceRef.current = null; markersRef.current = []; }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    import('leaflet').then((L) => {
      markersRef.current.forEach((m) => m.remove());
      markersRef.current = [];
      addMarkers(L, mapInstanceRef.current, places, onSelectPlace);
    });
  }, [places, onSelectPlace]);

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

  return <div ref={mapRef} style={{ width: '100%', height: '100%', borderRadius: '16px', overflow: 'hidden' }} />;
}
