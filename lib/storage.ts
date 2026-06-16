import { UserData, Badge } from '@/types';

const STORAGE_KEY = '111kidsdc_user';

const defaultUserData: UserData = {
  visited: [],
  wantToGo: [],
  adventure: [],
};

export function getUserData(): UserData {
  if (typeof window === 'undefined') return defaultUserData;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultUserData;
    return JSON.parse(raw);
  } catch {
    return defaultUserData;
  }
}

export function saveUserData(data: UserData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function markVisited(placeId: string): UserData {
  const data = getUserData();
  if (!data.visited.includes(placeId)) {
    data.visited.push(placeId);
    saveUserData(data);
  }
  return data;
}

export function unmarkVisited(placeId: string): UserData {
  const data = getUserData();
  data.visited = data.visited.filter((id) => id !== placeId);
  saveUserData(data);
  return data;
}

export function toggleWantToGo(placeId: string): UserData {
  const data = getUserData();
  if (data.wantToGo.includes(placeId)) {
    data.wantToGo = data.wantToGo.filter((id) => id !== placeId);
  } else {
    data.wantToGo.push(placeId);
  }
  saveUserData(data);
  return data;
}

export function toggleAdventure(placeId: string): UserData {
  const data = getUserData();
  if (data.adventure.includes(placeId)) {
    data.adventure = data.adventure.filter((id) => id !== placeId);
  } else {
    data.adventure.push(placeId);
  }
  saveUserData(data);
  return data;
}

export function isVisited(placeId: string): boolean {
  const data = getUserData();
  return data.visited.includes(placeId);
}

export function isWantToGo(placeId: string): boolean {
  const data = getUserData();
  return data.wantToGo.includes(placeId);
}

export function isInAdventure(placeId: string): boolean {
  const data = getUserData();
  return data.adventure.includes(placeId);
}

// Badge logic — derived from visited places and tags
export function getBadges(visitedIds: string[], allPlaces: { id: string; tags: string[] }[]): Badge[] {
  const visitedPlaces = allPlaces.filter((p) => visitedIds.includes(p.id));
  const allTags = visitedPlaces.flatMap((p) => p.tags);

  const hasTag = (tag: string) => allTags.includes(tag);
  const visitedCount = visitedIds.length;

  return [
    {
      id: 'first-adventure',
      name: 'First Adventure',
      emoji: '🌟',
      description: 'Checked off your first place!',
      earned: visitedCount >= 1,
    },
    {
      id: 'rainy-day-rescuer',
      name: 'Rainy Day Rescuer',
      emoji: '☂️',
      description: 'Visited 3 rainy-day spots',
      earned: visitedPlaces.filter((p) => p.tags.includes('rainy-day')).length >= 3,
    },
    {
      id: 'museum-kid',
      name: 'Museum Kid',
      emoji: '🏛️',
      description: 'Explored 3 museums',
      earned: visitedPlaces.filter((p) => p.tags.includes('museum')).length >= 3,
    },
    {
      id: 'outdoor-explorer',
      name: 'Outdoor Explorer',
      emoji: '🌿',
      description: 'Visited 3 outdoor spots',
      earned: visitedPlaces.filter((p) => p.tags.includes('outdoor')).length >= 3,
    },
    {
      id: 'dc-super-parent',
      name: 'DC Super Parent',
      emoji: '🦸',
      description: 'Completed 25 adventures!',
      earned: visitedCount >= 25,
    },
    {
      id: 'free-ranger',
      name: 'Free Ranger',
      emoji: '💚',
      description: 'Visited 5 free spots',
      earned: visitedPlaces.filter((p) => p.tags.includes('free')).length >= 5,
    },
    {
      id: 'waterfront-wanderer',
      name: 'Waterfront Wanderer',
      emoji: '🌊',
      description: 'Hit 2 waterfront spots',
      earned: visitedPlaces.filter((p) => p.tags.includes('waterfront') || p.tags.includes('water-play')).length >= 2,
    },
  ];
}
