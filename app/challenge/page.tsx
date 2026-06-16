'use client';

import { useState, useEffect } from 'react';
import { places } from '@/data/places';
import { getUserData, markVisited, unmarkVisited, toggleWantToGo, isVisited, isWantToGo, getBadges } from '@/lib/storage';
import { Place } from '@/types';

const TOTAL = 111;

export default function ChallengePage() {
  const [userData, setUserData] = useState({ visited: [] as string[], wantToGo: [] as string[], adventure: [] as string[] });
  const [tab, setTab] = useState<'progress' | 'visited' | 'saved'>('progress');

  useEffect(() => {
    setUserData(getUserData());
  }, []);

  const refresh = () => setUserData(getUserData());

  const visitedPlaces = places.filter((p) => userData.visited.includes(p.id));
  const savedPlaces = places.filter((p) => userData.wantToGo.includes(p.id));
  const badges = getBadges(userData.visited, places);
  const earned = badges.filter((b) => b.earned);

  const pct = Math.round((userData.visited.length / TOTAL) * 100);

  return (
    <div className="min-h-screen bg-stone-50 pb-28">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-4 pt-6 pb-5">
        <h1 className="text-xl font-extrabold text-stone-800">⭐ The 111 Challenge</h1>
        <p className="text-stone-500 text-sm mt-1">Every place is worth showing a child.</p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-stone-700">
              {userData.visited.length} of {TOTAL} adventures completed
            </span>
            <span className="text-sm font-bold text-emerald-600">{pct}%</span>
          </div>
          <div className="h-3 bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

        {/* Badges */}
        {earned.length > 0 && (
          <div className="mt-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {earned.map((badge) => (
              <div key={badge.id} className="flex-shrink-0 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 flex items-center gap-2">
                <span className="text-xl">{badge.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-amber-800">{badge.name}</p>
                  <p className="text-xs text-amber-600">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {earned.length === 0 && (
          <div className="mt-3 text-xs text-stone-400">
            Mark your first place as visited to earn your first badge.
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200 bg-white px-4">
        {(['progress', 'visited', 'saved'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors border-b-2 ${
              tab === t ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-stone-400 hover:text-stone-600'
            }`}
          >
            {t === 'visited' ? `Visited (${userData.visited.length})` : t === 'saved' ? `Saved (${userData.wantToGo.length})` : 'All badges'}
          </button>
        ))}
      </div>

      <div className="px-4 py-5 max-w-sm mx-auto">
        {tab === 'progress' && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-stone-600 mb-4">All {badges.length} badges</h2>
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 flex items-center gap-4 ${
                  badge.earned
                    ? 'bg-amber-50 border-amber-200'
                    : 'bg-white border-stone-200 opacity-60'
                }`}
              >
                <span className="text-3xl">{badge.earned ? badge.emoji : '🔒'}</span>
                <div>
                  <p className="text-sm font-bold text-stone-800">{badge.name}</p>
                  <p className="text-xs text-stone-500 mt-0.5">{badge.description}</p>
                  {!badge.earned && <p className="text-xs text-stone-400 mt-1 italic">Keep exploring to unlock</p>}
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === 'visited' && (
          <div>
            {visitedPlaces.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">📍</div>
                <p className="text-stone-500 font-medium">No visits yet.</p>
                <p className="text-stone-400 text-sm mt-1">Mark places as visited from the map or adventure pages.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {visitedPlaces.map((place) => (
                  <PlaceRow
                    key={place.id}
                    place={place}
                    isVisited={true}
                    isWantToGo={isWantToGo(place.id)}
                    onVisitToggle={() => { unmarkVisited(place.id); refresh(); }}
                    onSaveToggle={() => { toggleWantToGo(place.id); refresh(); }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'saved' && (
          <div>
            {savedPlaces.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-4xl mb-3">🤍</div>
                <p className="text-stone-500 font-medium">Nothing saved yet.</p>
                <p className="text-stone-400 text-sm mt-1">Save places from the map to build your want-to-go list.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {savedPlaces.map((place) => (
                  <PlaceRow
                    key={place.id}
                    place={place}
                    isVisited={isVisited(place.id)}
                    isWantToGo={true}
                    onVisitToggle={() => { if (isVisited(place.id)) { unmarkVisited(place.id); } else { markVisited(place.id); } refresh(); }}
                    onSaveToggle={() => { toggleWantToGo(place.id); refresh(); }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceRow({
  place,
  isVisited,
  isWantToGo,
  onVisitToggle,
  onSaveToggle,
}: {
  place: Place;
  isVisited: boolean;
  isWantToGo: boolean;
  onVisitToggle: () => void;
  onSaveToggle: () => void;
}) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4">
      <div className="flex items-start gap-3">
        <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
          #{place.bookNumber}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-stone-800 text-sm">{place.title}</h3>
          <p className="text-stone-500 text-xs mt-0.5">{place.neighborhood}</p>
        </div>
      </div>
      <div className="flex gap-2 mt-3">
        <button
          onClick={onVisitToggle}
          className={`flex-1 text-xs font-semibold py-2 rounded-xl transition-all ${
            isVisited ? 'bg-emerald-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600'
          }`}
        >
          {isVisited ? '✓ Been here' : 'Mark visited'}
        </button>
        <button
          onClick={onSaveToggle}
          className={`flex-1 text-xs font-semibold py-2 rounded-xl transition-all ${
            isWantToGo ? 'bg-pink-500 text-white' : 'bg-stone-100 text-stone-600 hover:bg-pink-50 hover:text-pink-600'
          }`}
        >
          {isWantToGo ? '❤️ Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}
