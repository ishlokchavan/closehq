import type { Listing } from './listing-types';

/**
 * Seed listings used until the Supabase `listings` table is populated.
 * Real, representative Dubai data (no scraped third-party content); imagery is
 * left as placeholders per the current design decision.
 */
export const SEED_LISTINGS: Listing[] = [
  {
    id: 'seed-1', reference: 'IC-1001',
    title: '2-bed apartment with Burj Khalifa view', description: 'Bright two-bedroom in the heart of Downtown with floor-to-ceiling windows and a fitted kitchen.',
    purpose: 'sale', completion: 'ready', category: 'residential', propertyType: 'apartment', source: 'owner',
    city: 'Dubai', community: 'Downtown Dubai', building: 'Burj Vista',
    bedrooms: 2, bathrooms: 3, areaSqft: 1340, priceAed: 3200000,
    isVerified: true, coverImageUrl: null, amenities: ['Pool', 'Gym', 'Concierge'],
  },
  {
    id: 'seed-2', reference: 'IC-1002',
    title: 'Marina-facing 1-bed, high floor', description: 'High-floor one-bedroom overlooking the marina promenade, walking distance to the tram.',
    purpose: 'sale', completion: 'ready', category: 'residential', propertyType: 'apartment', source: 'developer',
    city: 'Dubai', community: 'Dubai Marina', building: 'Marina Gate',
    bedrooms: 1, bathrooms: 2, areaSqft: 820, priceAed: 1850000,
    isVerified: true, coverImageUrl: null, amenities: ['Pool', 'Gym', 'Beach access'],
  },
  {
    id: 'seed-3', reference: 'IC-1003',
    title: '4-bed signature villa on the Palm', description: 'Beachfront signature villa with private pool and direct sea access on Palm Jumeirah.',
    purpose: 'sale', completion: 'ready', category: 'residential', propertyType: 'villa', source: 'owner',
    city: 'Dubai', community: 'Palm Jumeirah', building: 'Signature Villas',
    bedrooms: 4, bathrooms: 5, areaSqft: 5200, priceAed: 22500000,
    isVerified: true, coverImageUrl: null, amenities: ['Private pool', 'Beach access', 'Maid room'],
  },
  {
    id: 'seed-4', reference: 'IC-1004',
    title: 'Off-plan studio in JVC', description: 'Smart studio in a new off-plan release with a flexible payment plan and handover in 2027.',
    purpose: 'sale', completion: 'off_plan', category: 'residential', propertyType: 'apartment', source: 'developer',
    city: 'Dubai', community: 'Jumeirah Village Circle', building: 'Binghatti Amber',
    bedrooms: 0, bathrooms: 1, areaSqft: 410, priceAed: 620000,
    isVerified: false, coverImageUrl: null, amenities: ['Pool', 'Gym'],
    handoverBy: 'Q2 2027', paymentPlan: '70/30', developerName: 'Binghatti', developerLogo: '/images/developers/binghatti.png',
  },
  {
    id: 'seed-5', reference: 'IC-1005',
    title: '3-bed townhouse in Dubai Hills', description: 'Family townhouse facing the park, close to Dubai Hills Mall and the golf course.',
    purpose: 'sale', completion: 'ready', category: 'residential', propertyType: 'townhouse', source: 'owner',
    city: 'Dubai', community: 'Dubai Hills Estate', building: 'Maple',
    bedrooms: 3, bathrooms: 4, areaSqft: 2100, priceAed: 4350000,
    isVerified: true, coverImageUrl: null, amenities: ['Park view', 'Community pool', 'Garden'],
  },
  {
    id: 'seed-6', reference: 'IC-1006',
    title: 'Business Bay 2-bed for rent', description: 'Furnished two-bedroom with canal views, available now on a yearly contract.',
    purpose: 'rent', completion: 'ready', category: 'residential', propertyType: 'apartment', source: 'owner',
    city: 'Dubai', community: 'Business Bay', building: 'Peninsula',
    bedrooms: 2, bathrooms: 2, areaSqft: 1100, priceAed: 165000,
    isVerified: true, coverImageUrl: null, amenities: ['Canal view', 'Gym', 'Furnished'],
  },
  {
    id: 'seed-7', reference: 'IC-1007',
    title: 'Penthouse at Dubai Creek Harbour', description: 'Off-plan penthouse with panoramic creek and skyline views; signature tower.',
    purpose: 'sale', completion: 'off_plan', category: 'residential', propertyType: 'penthouse', source: 'developer',
    city: 'Dubai', community: 'Dubai Creek Harbour', building: 'Creek Edge',
    bedrooms: 4, bathrooms: 5, areaSqft: 3800, priceAed: 12800000,
    isVerified: false, coverImageUrl: null, amenities: ['Skyline view', 'Private lift', 'Pool'],
    handoverBy: 'Q4 2027', paymentPlan: '80/20', developerName: 'Emaar', developerLogo: '/images/developers/emaar.svg',
  },
  {
    id: 'seed-8', reference: 'IC-1008',
    title: 'DIFC office, fitted & ready', description: 'Grade-A fitted office floor in DIFC, ready for occupation with covered parking.',
    purpose: 'rent', completion: 'ready', category: 'commercial', propertyType: 'office', source: 'developer',
    city: 'Dubai', community: 'DIFC', building: 'Index Tower',
    bedrooms: null, bathrooms: 2, areaSqft: 3400, priceAed: 850000,
    isVerified: true, coverImageUrl: null, amenities: ['Fitted', 'Covered parking', 'Reception'],
  },
  {
    id: 'seed-9', reference: 'IC-1009',
    title: '5-bed villa in Arabian Ranches', description: 'Upgraded five-bedroom family villa on a large plot with a private garden and pool.',
    purpose: 'sale', completion: 'ready', category: 'residential', propertyType: 'villa', source: 'owner',
    city: 'Dubai', community: 'Arabian Ranches', building: 'Alvorada',
    bedrooms: 5, bathrooms: 6, areaSqft: 6100, priceAed: 9750000,
    isVerified: true, coverImageUrl: null, amenities: ['Private pool', 'Garden', 'Maid room'],
  },
  {
    id: 'seed-10', reference: 'IC-1010',
    title: 'Creek Bay by Emaar', description: 'Waterfront 1–3 bedroom apartments at Dubai Creek Harbour with skyline and creek views.',
    purpose: 'sale', completion: 'off_plan', category: 'residential', propertyType: 'apartment', source: 'developer',
    city: 'Dubai', community: 'Dubai Creek Harbour', building: 'Creek Bay',
    bedrooms: 1, bathrooms: 1, areaSqft: 720, priceAed: 1797888,
    isVerified: true, coverImageUrl: null, amenities: ['Pool', 'Gym', 'Waterfront'],
    handoverBy: 'Q1 2028', paymentPlan: '90/10', developerName: 'Emaar', developerLogo: '/images/developers/emaar.svg',
  },
  {
    id: 'seed-11', reference: 'IC-1011',
    title: 'DAMAC Islands', description: 'Off-plan townhouses and villas in a new island community with lagoons and beaches.',
    purpose: 'sale', completion: 'off_plan', category: 'residential', propertyType: 'townhouse', source: 'developer',
    city: 'Dubai', community: 'DAMAC Islands', building: 'Islands',
    bedrooms: 4, bathrooms: 5, areaSqft: 2400, priceAed: 2490000,
    isVerified: true, coverImageUrl: null, amenities: ['Lagoon', 'Beach access', 'Clubhouse'],
    handoverBy: 'Q4 2028', paymentPlan: '75/25', developerName: 'Damac', developerLogo: '/images/developers/damac.svg',
  },
  {
    id: 'seed-12', reference: 'IC-1012',
    title: 'The Brooks at Sobha Sanctuary', description: 'Premium off-plan apartments and villas in a green master community.',
    purpose: 'sale', completion: 'off_plan', category: 'residential', propertyType: 'apartment', source: 'developer',
    city: 'Dubai', community: 'Sobha Sanctuary', building: 'The Brooks',
    bedrooms: 2, bathrooms: 3, areaSqft: 1250, priceAed: 3995908,
    isVerified: true, coverImageUrl: null, amenities: ['Pool', 'Gym', 'Park'],
    handoverBy: 'Q2 2029', paymentPlan: '60/40', developerName: 'Sobha', developerLogo: '/images/developers/sobha.svg',
  },
];

export function filterSeed(filters: { purpose?: string; completion?: string; q?: string; limit?: number } = {}): Listing[] {
  let out = SEED_LISTINGS;
  if (filters.purpose) out = out.filter((l) => l.purpose === filters.purpose);
  if (filters.completion) out = out.filter((l) => l.completion === filters.completion);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    out = out.filter((l) =>
      [l.community, l.building, l.city, l.title].filter(Boolean).some((v) => v!.toLowerCase().includes(q)),
    );
  }
  return filters.limit ? out.slice(0, filters.limit) : out;
}
