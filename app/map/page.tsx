'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Place } from '@/types';
import { places as allPlaces } from '@/data/places';
import PlaceCard from '@/components/PlaceCard';
import FilterBar, { FilterKey } from '@/components/FilterBar';

const MapView = dynamic(() => import('@/components/MapView'), {
  ssr: false,
  loading: () => (
    <div style={{ width: '100%', height: '100%', background: '#f0ede6', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 40 }}>🗺️</div>
      <p style={{ fontSize: 14, fontWeight: 700, color: '#78716c' }}>Loading map...</p>
    </div>
  ),
});

function filterPlaces(places: Place[], activeFilters: FilterKey[]): Place[] {
  if (activeFilters.length === 0) return places;
  return places.filter((p) =>
    activeFilters.every((f) => {
      if (f === 'free') return p.priceCategory === 'free';
      if (f === 'indoor') return p.indoorOutdoor === 'indoor' || p.indoorOutdoor === 'both';
      if (f === 'outdoor') return p.indoorOutdoor === 'outdoor' || p.indoorOutdoor === 'both';
      if (f === 'rainy-day') return p.rainyDayFriendly;
      if (f === 'toddlers') return p.ageRange.includes('toddler') || p.ageRange.includes('all');
      if (f === 'big-kids') return p.ageRange.includes('school-age') || p.ageRange.includes('tween') || p.ageRange.includes('all');
      if (f === 'stroller-friendly') return p.strollerFriendly;
      if (f === 'bathrooms') return p.bathroomAvailable;
      return true;
    })
  );
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') as FilterKey | null;
  const [activeFilters, setActiveFilters] = useState<FilterKey[]>(initialFilter ? [initialFilter] : []);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [transportMode, setTransportMode] = useState<'walking' | 'car' | 'metro'>('car');
  const [view, setView] = useState<'map' | 'list'>('map');

  const filtered = filterPlaces(allPlaces, activeFilters);

  const handleToggleFilter = (key: FilterKey) =>
    setActiveFilters((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);

  const handleLocate = () => {
    if (!navigator.geolocation) return alert('Location not supported on this device.');
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => alert('Could not get your location.')
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100dvh', background: '#fdf6e9' }}>
      {/* Top bar */}
      <div style={{ background: 'white', borderBottom: '1px solid #e7e5e4', padding: '12px 16px 10px', flexShrink: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h1 style={{ fontWeight: 900, fontSize: 18, color: '#1c1917', margin: 0 }}>🗺️ Explore DC</h1>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={handleLocate} style={{ fontSize: 12, fontWeight: 700, background: userLocation ? '#f0fdf4' : '#f5f5f4', color: userLocation ?
