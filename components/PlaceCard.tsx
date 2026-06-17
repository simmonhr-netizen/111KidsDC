'use client';

import { useState, useEffect } from 'react';
import { Place } from '@/types';
import { markVisited, unmarkVisited, toggleWantToGo, toggleAdventure, isVisited, isWantToGo, isInAdventure } from '@/lib/storage';

interface PlaceCardProps {
  place: Place;
  onClose?: () => void;
  compact?: boolean;
  userLocation?: [number, number];
  transportMode?: 'walking' | 'car' | 'metro';
}

const priceLabel = { free: 'Free', low: '$', medium: '$$', high: '$$$' };
const priceColor = { free: 'text-emerald-600 bg-emerald-50', low: 'text-amber-600 bg-amber-50', medium: 'text-orange-600 bg-orange-50', high: 'text-red-600 bg-red-50' };

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) ** 2 + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function getTravelTime(miles: number, mode: 'walking' | 'car' | 'metro'): string {
  let mins: number;
  if (mode === 'walking') mins = Math.round(miles * 20);
  else if (mode === 'car') mins = Math.round(miles * 4 + 3);
  else mins = Math.round(miles * 5 + 8); // metro includes walk + wait
  if (mins < 1) mins = 1;
  return mins < 60 ? `~${mins} min` : `~${Math.round(mins / 60)}h ${mins % 60}m`;
}

const modeLabel = { walking: 'walk', car: 'drive', metro: 'by Metro' };
const modeEmoji = { walking: '🚶', car: '🚗', metro: '🚇' };

export default function PlaceCard({ place, onClose, compact = false, userLocation, transportMode = 'car' }: PlaceCardProps) {
  const [visited, setVisited] = useState(false);
  const [wantToGo, setWantToGo] = useState(false);
  const [inAdventure, setInAdventure] = useState(false);

  useEffect(() => {
    setVisited(isVisited(place.id));
    setWantToGo(isWantToGo(place.id));
    setInAdventure(isInAdventure(place.id));
  }, [place.id]);

  const handleVisited = () => {
    if (visited) { unmarkVisited(place.id); setVisited(false); }
    else { markVisited(place.id); setVisited(true); }
  };

  const distanceInfo = userLocation ? (() => {
    const miles = getDistance(userLocation[0], userLocation[1], place.latitude, place.longitude);
    const time = getTravelTime(miles, transportMode);
    return { miles: miles.toFixed(1), time };
  })() : null;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-sm w-full">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-4 relative">
        {onClose && (
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/20 rounded-full w-7 h-7 flex items-center justify-center text-white hover:bg-white/30 transition-colors">✕</button>
        )}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">#{place.bookNumber}</span>
          {visited && <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full">Been there! ✓</span>}
          {distanceInfo && (
            <span className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-full">
              {modeEmoji[transportMode]} {distanceInfo.miles} mi · {distanceInfo.time} {modeLabel[transportMode]}
            </span>
          )}
        </div>
        <h3 className="text-white font-bold text-lg mt-2 leading-tight">{place.title}</h3>
        <p className="text-white/80 text-sm mt-1">{place.neighborhood}</p>
      </div>

      <div className="p-4">
        <p className="text-stone-600 text-sm leading-relaxed">{place.shortDescription}</p>

        <div className="flex flex-wrap gap-2 mt-3">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${priceColor[place.priceCategory]}`}>{priceLabel[place.priceCategory]}</span>
          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-sky-50 text-sky-600 capitalize">{place.indoorOutdoor}</span>
          {place.rainyDayFriendly && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-50 text-blue-600">☂️ Rainy Day</span>}
          {place.strollerFriendly && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-purple-50 text-purple-600">👶 Stroller OK</span>}
          {place.bathroomAvailable && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-stone-100 text-stone-600">🚻 Bathrooms</span>}
          {place.foodNearby && <span className="text-xs font-semibold px-2 py-1 rounded-full bg-orange-50 text-orange-600">🍕 Food nearby</span>}
        </div>

        <div className="mt-3 text-xs text-stone-500">
          <span className="font-medium">Best for: </span>
          {place.ageRange.includes('all') ? 'All ages' : place.ageRange.join(', ')}
        </div>

        <div className="mt-2 text-xs text-stone-400 flex items-start gap-1">
          <span>📍</span><span>{place.address}</span>
        </div>

        {place.parentTip && !compact && (
          <div className="mt-3 bg-amber-50 rounded-xl p-3">
            <p className="text-xs text-amber-800"><span className="font-semibold">💡 Parent tip: </span>{place.parentTip}</p>
          </div>
        )}

        {place.metroNearby && !compact && (
          <div className="mt-2 text-xs text-stone-500 flex items-start gap-1">
            <span>🚇</span><span>{place.metroNearby}</span>
          </div>
        )}

        <div className="mt-4 grid grid-cols-3 gap-2">
          <button onClick={handleVisited} className={`text-xs font-semibold py-2 px-2 rounded-xl transition-all ${visited ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600'}`}>
            {visited ? '✓ Been here!' : '📍 Been here?'}
          </button>
          <button onClick={() => { toggleWantToGo(place.id); setWantToGo(!wantToGo); }} className={`text-xs font-semibold py-2 px-2 rounded-xl transition-all ${wantToGo ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-pink-50 hover:text-pink-600'}`}>
            {wantToGo ? '❤️ Saved!' : '🤍 Save'}
          </button>
          <button onClick={() => { toggleAdventure(place.id); setInAdventure(!inAdventure); }} className={`text-xs font-semibold py-2 px-2 rounded-xl transition-all ${inAdventure ? 'bg-teal-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-teal-50 hover:text-teal-600'}`}>
            {inAdventure ? '🧭 Added!' : '+ Adventure'}
          </button>
        </div>
      </div>
    </div>
  );
}
