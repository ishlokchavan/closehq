/**
 * Curated list of Dubai communities / areas used to power the landing search
 * autocomplete (typeahead). Config-driven so it can later be replaced by a live
 * list from the database without touching the UI. Keep alphabetical-ish by
 * popularity; the matcher is substring + case-insensitive.
 */
export const DUBAI_LOCATIONS: string[] = [
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'Jumeirah Village Circle (JVC)',
  'Business Bay',
  'Dubai Hills Estate',
  'Dubai Creek Harbour',
  'DIFC',
  'Arabian Ranches',
  'Jumeirah Beach Residence (JBR)',
  'Jumeirah Lakes Towers (JLT)',
  'Emaar Beachfront',
  'Bluewaters Island',
  'City Walk',
  'Jumeirah',
  'Al Barsha',
  'The Springs',
  'The Meadows',
  'Emirates Hills',
  'Damac Hills',
  'Dubai Sports City',
  'Dubai Silicon Oasis',
  'International City',
  'Mirdif',
  'Deira',
  'Bur Dubai',
  'Al Furjan',
  'Discovery Gardens',
  'Town Square',
  'Arjan',
  'Jumeirah Golf Estates',
  'Tilal Al Ghaf',
  'Sobha Hartland',
  'Mohammed Bin Rashid City (MBR City)',
  'Dubai Production City',
  'Dubai Studio City',
  'Motor City',
  'The Greens',
  'The Views',
  'Barsha Heights (Tecom)',
  'Palm Jebel Ali',
  'Dubai Islands',
  'Madinat Jumeirah Living',
  'Dubai South',
  'Expo City',
  "Za'abeel",
  'Al Wasl',
  'Umm Suqeim',
];

/** Top matches for a typeahead query (substring, case-insensitive). */
export function matchLocations(query: string, limit = 7): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts: string[] = [];
  const contains: string[] = [];
  for (const loc of DUBAI_LOCATIONS) {
    const l = loc.toLowerCase();
    if (l.startsWith(q)) starts.push(loc);
    else if (l.includes(q)) contains.push(loc);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}
