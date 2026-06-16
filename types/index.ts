export type IndoorOutdoor = 'indoor' | 'outdoor' | 'both';
export type PriceCategory = 'free' | 'low' | 'medium' | 'high';
export type AgeRange = 'toddler' | 'preschool' | 'school-age' | 'tween' | 'all';

export interface Place {
  id: string;
  title: string;
  slug: string;
  bookNumber: number;
  shortDescription: string;
  longDescription: string;
  address: string;
  latitude: number;
  longitude: number;
  neighborhood: string;
  website?: string;
  hoursNotes?: string;
  priceCategory: PriceCategory;
  ageRange: AgeRange[];
  tags: string[];
  indoorOutdoor: IndoorOutdoor;
  rainyDayFriendly: boolean;
  strollerFriendly: boolean;
  bathroomAvailable: boolean;
  foodNearby: boolean;
  metroNearby?: string;
  parkingNotes?: string;
  parentTip?: string;
  imageUrl?: string;
  sourcePage?: number;
  permissionStatus: 'pending' | 'approved' | 'placeholder';
}

export interface UserData {
  visited: string[];
  wantToGo: string[];
  adventure: string[];
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  earned: boolean;
}

export interface AdventureForm {
  childAge: string;
  startingLocation: string;
  timeAvailable: '1hour' | '2hours' | 'halfday' | 'fullday';
  budget: 'free' | 'under25' | 'under50' | 'flexible';
  mood: 'burn-energy' | 'calm' | 'educational' | 'food-fun' | 'rainy-day' | 'impress';
  transportation: 'walking' | 'car' | 'metro';
}

export interface ItineraryStop {
  place: Place;
  order: number;
  note: string;
}

export interface GeneratedItinerary {
  title: string;
  subtitle: string;
  stops: ItineraryStop[];
  totalTime: string;
  tips: string[];
}
