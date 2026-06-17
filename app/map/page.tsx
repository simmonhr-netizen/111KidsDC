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
            <button onClick={handleLocate} style={{ fontSize: 12, fontWeight: 700, background: userLocation ? '#f0fdf4' : '#f5f5f4', color: userLocation ? '#059669' : '#57534e', border: `1px solid ${userLocation ? '#a7f3d0' : '#e7e5e4'}`, borderRadius: 999, padding: '6px 12px', cursor: 'pointer' }}>
              📍 {userLocation ? 'Located!' : 'Near me'}
            </button>
            <button onClick={() => { setSelectedPlace(null); setView(view === 'map' ? 'list' : 'map'); }} style={{ fontSize: 12, fontWeight: 700, background: '#f5f5f4', color: '#57534e', border: '1px solid #e7e5e4', borderRadius: 999, padding: '6px 12px', cursor: 'pointer' }}>
              {view === 'map' ? '📋 List' : '🗺️ Map'}
            </button>
          </div>
        </div>

        {/* Transport mode — only shows after location is set */}
        {userLocation && (
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            {(['walking', 'car', 'metro'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setTransportMode(mode)}
                style={{ fontSize: 11, fontWeight: 700, borderRadius: 999, padding: '4px 10px', border: '1px solid', cursor: 'pointer', transition: 'all 0.15s', background: transportMode === mode ? '#5b7fd4' : 'white', color: transportMode === mode ? 'white' : '#57534e', borderColor: transportMode === mode ? '#5b7fd4' : '#e7e5e4' }}
              >
                {mode === 'walking' ? '🚶 Walk' : mode === 'car' ? '🚗 Drive' : '🚇 Metro'}
              </button>
            ))}
          </div>
        )}

        <FilterBar active={activeFilters} onToggle={handleToggleFilter} />
        <p style={{ fontSize: 11, color: '#a8a29e', marginTop: 6, marginBottom: 0 }}>{filtered.length} places</p>
      </div>

      {/* Map / List */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative', padding: view === 'map' ? 8 : 0, minHeight: 0, paddingBottom: view === 'map' ? 72 : 0 }}>
        {view === 'map' ? (
          <div style={{ width: '100%', height: '100%' }}>
            <MapView places={filtered} onSelectPlace={setSelectedPlace} userLocation={userLocation ?? undefined} />
          </div>
        ) : (
          <div style={{ overflowY: 'auto', height: '100%', padding: '12px 16px 100px' }}>
            {filtered.map((place) => (
              <div key={place.id} onClick={() => setSelectedPlace(place)}
                style={{ background: 'white', borderRadius: 12, border: '1px solid #e7e5e4', padding: 14, marginBottom: 10, cursor: 'pointer' }}>
                <div style={{ display: 'flex', gap: 10 }}>
                  <span style={{ background: '#d1fae5', color: '#065f46', fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 999, flexShrink: 0, alignSelf: 'flex-start' }}>#{place.bookNumber}</span>
                  <div>
                    <p style={{ fontWeight: 700, fontSize: 14, color: '#1c1917', margin: 0 }}>{place.title}</p>
                    <p style={{ fontSize: 12, color: '#78716c', margin: '2px 0 0' }}>{place.neighborhood}</p>
                    <p style={{ fontSize: 12, color: '#57534e', margin: '4px 0 0' }}>{place.shortDescription}</p>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', paddingTop: 60 }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                <p style={{ color: '#78716c', fontWeight: 600 }}>No places match those filters.</p>
                <button onClick={() => setActiveFilters([])} style={{ marginTop: 10, color: '#10b981', fontSize: 14, textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Clear filters</button>
              </div>
            )}
          </div>
        )}

        {selectedPlace && (
          <div
            onClick={() => setSelectedPlace(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 12px 90px' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 420 }}>
              <PlaceCard
                place={selectedPlace}
                onClose={() => setSelectedPlace(null)}
                userLocation={userLocation ?? undefined}
                transportMode={transportMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: '#78716c' }}>Loading...</div>}>
      <MapPageContent />
    </Suspense>
  );
}
