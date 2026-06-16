'use client';

import { useState, useEffect, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { Place } from '@/types';
import { places as allPlaces } from '@/data/places';
import PlaceCard from '@/components/PlaceCard';
import FilterBar, { FilterKey } from '@/components/FilterBar';

// Leaflet must be loaded client-side only
const MapView = dynamic(() => import('@/components/MapView'), { ssr: false });

function filterPlaces(places: Place[], activeFilters: FilterKey[]): Place[] {
  if (activeFilters.length === 0) return places;
  return places.filter((p) => {
    return activeFilters.every((f) => {
      if (f === 'free') return p.priceCategory === 'free';
      if (f === 'indoor') return p.indoorOutdoor === 'indoor' || p.indoorOutdoor === 'both';
      if (f === 'outdoor') return p.indoorOutdoor === 'outdoor' || p.indoorOutdoor === 'both';
      if (f === 'rainy-day') return p.rainyDayFriendly;
      if (f === 'toddlers') return p.ageRange.includes('toddler') || p.ageRange.includes('all');
      if (f === 'big-kids') return p.ageRange.includes('school-age') || p.ageRange.includes('tween') || p.ageRange.includes('all');
      if (f === 'stroller-friendly') return p.strollerFriendly;
      if (f === 'bathrooms') return p.bathroomAvailable;
      return true;
    });
  });
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function MapPageContent() {
  const searchParams = useSearchParams();
  const initialFilter = searchParams.get('filter') as FilterKey | null;

  const [activeFilters, setActiveFilters] = useState<FilterKey[]>(initialFilter ? [initialFilter] : []);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [view, setView] = useState<'map' | 'list'>('map');

  const filtered = filterPlaces(allPlaces, activeFilters);

  const handleToggleFilter = (key: FilterKey) => {
    setActiveFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleLocate = () => {
    if (!navigator.geolocation) return alert('Location not supported on this device.');
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => alert('Could not get your location. Check your browser permissions.')
    );
  };

  return (
    <div className="flex flex-col h-screen bg-stone-50">
      {/* Top bar */}
      <div className="bg-white border-b border-stone-200 px-4 pt-4 pb-3 space-y-3 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-extrabold text-stone-800">🗺️ Explore DC</h1>
          <div className="flex gap-2">
            <button
              onClick={handleLocate}
              className="text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1.5 rounded-full hover:bg-emerald-100 transition-colors"
            >
              📍 Near me
            </button>
            <button
              onClick={() => setView(view === 'map' ? 'list' : 'map')}
              className="text-xs font-semibold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full hover:bg-stone-200 transition-colors"
            >
              {view === 'map' ? '📋 List' : '🗺️ Map'}
            </button>
          </div>
        </div>
        <FilterBar active={activeFilters} onToggle={handleToggleFilter} />
        <p className="text-xs text-stone-400">{filtered.length} places</p>
      </div>

      {/* Map or List */}
      <div className="flex-1 overflow-hidden relative">
        {view === 'map' ? (
          <div className="w-full h-full p-2">
            <MapView
              places={filtered}
              onSelectPlace={setSelectedPlace}
              userLocation={userLocation ?? undefined}
            />
          </div>
        ) : (
          <div className="overflow-y-auto h-full px-4 py-4 pb-28 space-y-3">
            {filtered.map((place) => (
              <div key={place.id} onClick={() => setSelectedPlace(place)} className="cursor-pointer">
                <div className="bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                      #{place.bookNumber}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-stone-800 text-sm">{place.title}</h3>
                      <p className="text-stone-500 text-xs mt-0.5">{place.neighborhood}</p>
                      <p className="text-stone-600 text-xs mt-1 line-clamp-2">{place.shortDescription}</p>
                      {userLocation && (
                        <p className="text-xs text-emerald-600 mt-1 font-medium">
                          📍 {getDistance(userLocation[0], userLocation[1], place.latitude, place.longitude).toFixed(1)} mi away
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🔍</div>
                <p className="text-stone-500 font-medium">No places match those filters.</p>
                <button onClick={() => setActiveFilters([])} className="mt-3 text-sm text-emerald-600 underline">Clear filters</button>
              </div>
            )}
          </div>
        )}

        {/* Place card overlay */}
        {selectedPlace && (
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center z-20 p-4 pb-6" onClick={() => setSelectedPlace(null)}>
            <div onClick={(e) => e.stopPropagation()}>
              <PlaceCard place={selectedPlace} onClose={() => setSelectedPlace(null)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-stone-500">Loading map...</div>}>
      <MapPageContent />
    </Suspense>
  );
}
