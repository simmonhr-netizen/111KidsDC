# 111 Kids DC

A mobile-first family adventure app for Washington, DC, based on Austin Graff's book.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Content Status

All 13 placeholder entries in `data/places.ts` are written in Austin Graff's voice but are **not licensed book content**. Each entry is marked `permissionStatus: 'placeholder'`.

Before publishing:
- Replace `shortDescription`, `longDescription`, and `parentTip` with approved text
- Set `permissionStatus: 'approved'`
- Add `sourcePage` from the book

## Adding New Places

Edit `data/places.ts`. Each place follows the `Place` type in `types/index.ts`. Fields:
- Required: `id`, `title`, `slug`, `bookNumber`, `shortDescription`, `longDescription`, `address`, `latitude`, `longitude`, `neighborhood`, `priceCategory`, `ageRange`, `tags`, `indoorOutdoor`
- Optional but important: `parentTip`, `hoursNotes`, `website`, `metroNearby`, `parkingNotes`

## Structure

```
app/           → Pages (home, map, adventure, challenge)
components/    → Nav, PlaceCard, FilterBar, MapView
data/          → places.ts (all content lives here)
lib/           → storage.ts (localStorage), adventure.ts (itinerary logic)
types/         → index.ts (TypeScript types)
```

## Tech

- Next.js 15, TypeScript, Tailwind CSS
- Leaflet (free, no API key needed)
- localStorage for visited/saved/adventure lists
- No backend required for MVP
