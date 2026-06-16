'use client';

export type FilterKey = 'free' | 'indoor' | 'outdoor' | 'rainy-day' | 'toddlers' | 'big-kids' | 'stroller-friendly' | 'bathrooms';

const FILTERS: { key: FilterKey; label: string; emoji: string }[] = [
  { key: 'free', label: 'Free', emoji: '💚' },
  { key: 'indoor', label: 'Indoor', emoji: '🏠' },
  { key: 'outdoor', label: 'Outdoor', emoji: '🌿' },
  { key: 'rainy-day', label: 'Rainy day', emoji: '☂️' },
  { key: 'toddlers', label: 'Toddlers', emoji: '👶' },
  { key: 'big-kids', label: 'Big kids', emoji: '🧒' },
  { key: 'stroller-friendly', label: 'Stroller', emoji: '🍼' },
  { key: 'bathrooms', label: 'Bathrooms', emoji: '🚻' },
];

interface FilterBarProps {
  active: FilterKey[];
  onToggle: (key: FilterKey) => void;
}

export default function FilterBar({ active, onToggle }: FilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {FILTERS.map((f) => {
        const isActive = active.includes(f.key);
        return (
          <button
            key={f.key}
            onClick={() => onToggle(f.key)}
            className={`flex-shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
              isActive
                ? 'bg-emerald-500 text-white border-emerald-500'
                : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300'
            }`}
          >
            <span>{f.emoji}</span>
            <span>{f.label}</span>
          </button>
        );
      })}
    </div>
  );
}
