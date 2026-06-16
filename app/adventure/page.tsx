'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AdventureForm, GeneratedItinerary } from '@/types';
import { places } from '@/data/places';
import { generateItinerary } from '@/lib/adventure';
import PlaceCard from '@/components/PlaceCard';

const defaultForm: AdventureForm = {
  childAge: '5',
  startingLocation: '',
  timeAvailable: '2hours',
  budget: 'free',
  mood: 'burn-energy',
  transportation: 'car',
};

function AdventureContent() {
  const searchParams = useSearchParams();
  const moodParam = searchParams.get('mood') as AdventureForm['mood'] | null;

  const [form, setForm] = useState<AdventureForm>({ ...defaultForm, mood: moodParam || defaultForm.mood });
  const [itinerary, setItinerary] = useState<GeneratedItinerary | null>(null);
  const [expandedStop, setExpandedStop] = useState<string | null>(null);

  const handleGenerate = () => {
    const result = generateItinerary(places, form);
    setItinerary(result);
    setExpandedStop(null);
  };

  const handleReset = () => {
    setItinerary(null);
    setExpandedStop(null);
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-28">
      <div className="bg-white border-b border-stone-200 px-4 pt-6 pb-4">
        <h1 className="text-xl font-extrabold text-stone-800">🧭 Build an Adventure</h1>
        <p className="text-stone-500 text-sm mt-1">Tell us about your crew and we&apos;ll plan the day.</p>
      </div>

      {!itinerary ? (
        <form className="px-4 py-6 max-w-sm mx-auto space-y-5" onSubmit={(e) => { e.preventDefault(); handleGenerate(); }}>
          {/* Child age */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">How old is your kid?</label>
            <input
              type="number"
              min="0"
              max="17"
              value={form.childAge}
              onChange={(e) => setForm({ ...form, childAge: e.target.value })}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              placeholder="e.g. 4"
            />
          </div>

          {/* Starting location */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Starting from where? (optional)</label>
            <input
              type="text"
              value={form.startingLocation}
              onChange={(e) => setForm({ ...form, startingLocation: e.target.value })}
              className="w-full border border-stone-200 rounded-xl px-4 py-3 text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
              placeholder="e.g. Dupont Circle, Capitol Hill..."
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">How much time do you have?</label>
            <div className="grid grid-cols-2 gap-2">
              {([['1hour', '1 hour'], ['2hours', '2 hours'], ['halfday', 'Half day'], ['fullday', 'Full day']] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, timeAvailable: val })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.timeAvailable === val ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">Budget?</label>
            <div className="grid grid-cols-2 gap-2">
              {([['free', '💚 Free'], ['under25', '💛 Under $25'], ['under50', '🧡 Under $50'], ['flexible', '✨ Flexible']] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, budget: val })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.budget === val ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Mood */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">What&apos;s the vibe today?</label>
            <div className="grid grid-cols-2 gap-2">
              {([
                ['burn-energy', '⚡ Burn energy'],
                ['calm', '🍃 Calm activity'],
                ['educational', '🧠 Educational'],
                ['food-fun', '🍕 Food + fun'],
                ['rainy-day', '☂️ Rainy day'],
                ['impress', '🏛️ Impress family'],
              ] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, mood: val })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.mood === val ? 'bg-amber-400 text-white border-amber-400' : 'bg-white text-stone-600 border-stone-200 hover:border-amber-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Transportation */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 mb-2">How are you getting around?</label>
            <div className="grid grid-cols-3 gap-2">
              {([['walking', '🚶 Walking'], ['car', '🚗 Car'], ['metro', '🚇 Metro']] as const).map(([val, label]) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setForm({ ...form, transportation: val })}
                  className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${form.transportation === val ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-stone-600 border-stone-200 hover:border-sky-300'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-2xl text-base transition-colors shadow-md"
          >
            Plan my adventure →
          </button>
        </form>
      ) : (
        <div className="px-4 py-6 max-w-sm mx-auto">
          {/* Itinerary header */}
          <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 text-white mb-5">
            <p className="text-white/70 text-sm capitalize">{itinerary.totalTime} adventure</p>
            <h2 className="text-xl font-extrabold mt-1 leading-tight">{itinerary.title}</h2>
            <p className="text-white/80 text-sm mt-1">{itinerary.subtitle}</p>
          </div>

          {/* Tips */}
          {itinerary.tips.length > 0 && (
            <div className="bg-amber-50 rounded-xl p-4 mb-5">
              {itinerary.tips.map((tip, i) => (
                <p key={i} className="text-xs text-amber-800 mt-1 first:mt-0">{tip}</p>
              ))}
            </div>
          )}

          {/* Stops */}
          <div className="space-y-3">
            {itinerary.stops.map((stop, i) => (
              <div key={stop.place.id}>
                <button
                  className="w-full text-left bg-white rounded-xl border border-stone-200 p-4 hover:shadow-md transition-shadow"
                  onClick={() => setExpandedStop(expandedStop === stop.place.id ? null : stop.place.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="bg-emerald-500 text-white text-sm font-bold w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-stone-800 text-sm">{stop.place.title}</h3>
                      <p className="text-stone-500 text-xs mt-0.5">{stop.note}</p>
                    </div>
                    <span className="text-stone-300 text-sm">{expandedStop === stop.place.id ? '▲' : '▼'}</span>
                  </div>
                </button>
                {expandedStop === stop.place.id && (
                  <div className="mt-2">
                    <PlaceCard place={stop.place} compact />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="mt-6 w-full text-sm text-stone-500 border border-stone-200 py-3 rounded-xl hover:bg-stone-100 transition-colors"
          >
            ← Start over
          </button>
        </div>
      )}
    </div>
  );
}

export default function AdventurePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen text-stone-500">Loading...</div>}>
      <AdventureContent />
    </Suspense>
  );
}
