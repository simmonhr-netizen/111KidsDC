import { Place, AdventureForm, GeneratedItinerary, ItineraryStop } from '@/types';

// ============================================================
// ADVENTURE GENERATOR — Deterministic matching logic
// This is structured so AI recommendations can be layered in
// later. Replace the filterAndScore() function with an API
// call to get smart recommendations while keeping the same
// output shape (GeneratedItinerary).
// ============================================================

type MoodConfig = {
  label: string;
  tags: string[];
  preferIndoor: boolean;
  preferOutdoor: boolean;
};

const MOOD_CONFIG: Record<AdventureForm['mood'], MoodConfig> = {
  'burn-energy': {
    label: 'Burn Energy',
    tags: ['outdoor', 'water-play', 'park', 'splash-pad'],
    preferIndoor: false,
    preferOutdoor: true,
  },
  calm: {
    label: 'Calm Activity',
    tags: ['museum', 'art', 'plants', 'nature'],
    preferIndoor: true,
    preferOutdoor: false,
  },
  educational: {
    label: 'Educational',
    tags: ['educational', 'museum', 'science', 'history'],
    preferIndoor: false,
    preferOutdoor: false,
  },
  'food-fun': {
    label: 'Food + Fun',
    tags: ['food', 'market', 'neighborhood'],
    preferIndoor: false,
    preferOutdoor: false,
  },
  'rainy-day': {
    label: 'Rainy Day Rescue',
    tags: ['rainy-day', 'indoor', 'museum', 'play'],
    preferIndoor: true,
    preferOutdoor: false,
  },
  impress: {
    label: 'Impress Visiting Family',
    tags: ['classic-dc', 'free', 'educational', 'landmark'],
    preferIndoor: false,
    preferOutdoor: false,
  },
};

const STOP_COUNT: Record<AdventureForm['timeAvailable'], number> = {
  '1hour': 1,
  '2hours': 2,
  halfday: 3,
  fullday: 4,
};

const PRICE_MAX: Record<AdventureForm['budget'], string[]> = {
  free: ['free'],
  under25: ['free', 'low'],
  under50: ['free', 'low', 'medium'],
  flexible: ['free', 'low', 'medium', 'high'],
};

function scorePlace(place: Place, form: AdventureForm): number {
  let score = 0;
  const mood = MOOD_CONFIG[form.mood];
  const allowedPrices = PRICE_MAX[form.budget];

  // Price filter — hard exclude
  if (!allowedPrices.includes(place.priceCategory)) return -1;

  // Rainy day filter
  if (form.mood === 'rainy-day' && !place.rainyDayFriendly) score -= 5;
  if (form.mood === 'rainy-day' && place.rainyDayFriendly) score += 10;

  // Age range scoring
  const ageNum = parseInt(form.childAge, 10);
  if (!isNaN(ageNum)) {
    if (ageNum <= 2 && place.ageRange.includes('toddler')) score += 5;
    if (ageNum >= 3 && ageNum <= 5 && place.ageRange.includes('preschool')) score += 5;
    if (ageNum >= 6 && ageNum <= 9 && place.ageRange.includes('school-age')) score += 5;
    if (ageNum >= 10 && place.ageRange.includes('tween')) score += 5;
    if (place.ageRange.includes('all')) score += 2;
  }

  // Mood tag matching
  const matchingTags = mood.tags.filter((tag) => place.tags.includes(tag));
  score += matchingTags.length * 3;

  // Indoor/outdoor preference
  if (mood.preferIndoor && (place.indoorOutdoor === 'indoor' || place.indoorOutdoor === 'both')) score += 4;
  if (mood.preferOutdoor && (place.indoorOutdoor === 'outdoor' || place.indoorOutdoor === 'both')) score += 4;

  // Transportation — metro bonus
  if (form.transportation === 'metro' && place.metroNearby) score += 2;

  // Always good: bathrooms + stroller friendly
  if (place.bathroomAvailable) score += 1;
  if (place.strollerFriendly) score += 1;

  return score;
}

function getStopNote(order: number, place: Place, form: AdventureForm): string {
  if (order === 0) {
    return `Start your adventure here${form.transportation === 'metro' && place.metroNearby ? ` — hop off at ${place.metroNearby}` : ''}.`;
  }
  if (order === 1) {
    const transport = form.transportation === 'walking' ? 'Walk over' : form.transportation === 'metro' ? 'Take the Metro' : 'Drive';
    return `${transport} to your next stop — ${place.neighborhood} is next!`;
  }
  if (place.foodNearby) {
    return `Great time for a snack break — food is close by here.`;
  }
  return `Bonus stop if you still have energy left!`;
}

export function generateItinerary(places: Place[], form: AdventureForm): GeneratedItinerary {
  const stopCount = STOP_COUNT[form.timeAvailable];
  const moodLabel = MOOD_CONFIG[form.mood].label;

  // Score all places
  const scored = places
    .map((p) => ({ place: p, score: scorePlace(p, form) }))
    .filter((s) => s.score >= 0)
    .sort((a, b) => b.score - a.score);

  // Take top N, avoiding duplicates
  const selected = scored.slice(0, stopCount).map((s) => s.place);

  // If not enough matches, fill with any valid places
  if (selected.length < stopCount) {
    const remaining = places.filter((p) => !selected.find((s) => s.id === p.id));
    selected.push(...remaining.slice(0, stopCount - selected.length));
  }

  const stops: ItineraryStop[] = selected.map((place, i) => ({
    place,
    order: i,
    note: getStopNote(i, place, form),
  }));

  const timeLabel: Record<AdventureForm['timeAvailable'], string> = {
    '1hour': '1-hour',
    '2hours': '2-hour',
    halfday: 'half-day',
    fullday: 'full-day',
  };

  const neighborhood = form.startingLocation || 'DC';

  const tips: string[] = [];
  if (selected.some((p) => p.foodNearby)) tips.push('Food is available near your stops — no need to pack a big lunch.');
  if (selected.some((p) => p.bathroomAvailable)) tips.push('All stops on this adventure have bathrooms. ✓');
  if (selected.some((p) => p.strollerFriendly)) tips.push('This route is stroller-friendly.');
  if (form.mood === 'rainy-day') tips.push('Perfect for a rainy day — mostly indoor spots!');

  return {
    title: `Your ${timeLabel[form.timeAvailable]} ${moodLabel.toLowerCase()} adventure`,
    subtitle: `near ${neighborhood}`,
    stops,
    totalTime: timeLabel[form.timeAvailable],
    tips,
  };
}
