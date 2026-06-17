import { SEED_LISTINGS } from '@/lib/portal/seed-listings';
import type { Listing } from '@/lib/portal/listing-types';
import { CREDIT_AED_RATE, aedToCredits } from '@/lib/portal/credits';

/**
 * Experience-only enrichment of the canonical /properties listings.
 *
 * The seed data (the same list shown on /properties) ships with
 * `coverImageUrl: null`. The Liquid Glass prototype is image-first, so each
 * listing is mapped to a *genuinely matching* photo here (penthouse -> penthouse,
 * villa -> villa, office -> office) rather than a generic type pool. Imagery is
 * kept inside the (glass) feature so the production data layer is untouched.
 *
 * Hosts (images.unsplash.com) are already whitelisted in next.config images.
 */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Per-listing curated galleries, keyed by reference. First image is the hero. */
const IMAGES: Record<string, string[]> = {
  // 2-bed Downtown apartment, Burj Khalifa view
  'IC-1001': ['photo-1545324418-cc1a3fa10c00', 'photo-1502672260266-1c1ef2d93688', 'photo-1512453979798-5ea266f8880c'],
  // Marina-facing 1-bed, high floor
  'IC-1002': ['photo-1560448204-e02f11c3d0e2', 'photo-1493809842364-78817add7ffb', 'photo-1518684079-3c830dcef090'],
  // 4-bed signature villa on the Palm, beachfront + pool
  'IC-1003': ['photo-1613490493576-7fde63acd811', 'photo-1512917774080-9991f1c4c750', 'photo-1600596542815-ffad4c1539a9'],
  // Off-plan studio in JVC (Binghatti)
  'IC-1004': ['photo-1522708323590-d24dbb6b0267', 'photo-1505693416388-ac5ce068fe85', 'photo-1493809842364-78817add7ffb'],
  // 3-bed townhouse, Dubai Hills, park-facing
  'IC-1005': ['photo-1576941089067-2de3c901e126', 'photo-1600585154340-be6161a56a0c', 'photo-1600566753086-00f18fb6b3ea'],
  // Furnished 2-bed, canal views, Business Bay
  'IC-1006': ['photo-1493809842364-78817add7ffb', 'photo-1567496898669-ee935f5f647a', 'photo-1582672060674-bc2bd808a8b5'],
  // Penthouse, Dubai Creek Harbour, panoramic + private lift
  'IC-1007': ['photo-1600607687920-4e2a09cf159d', 'photo-1600047509807-ba8f99d2cdde', 'photo-1546412414-e1885259563a'],
  // DIFC office, fitted & ready
  'IC-1008': ['photo-1497366216548-37526070297c', 'photo-1497366811353-6870744d04b2', 'photo-1524758631624-e2822e304c36'],
  // 5-bed villa, Arabian Ranches, garden + pool
  'IC-1009': ['photo-1512917774080-9991f1c4c750', 'photo-1564013799919-ab600027ffc6', 'photo-1600585154340-be6161a56a0c'],
  // Creek Bay by Emaar, waterfront apartments
  'IC-1010': ['photo-1486406146926-c627a92ad1ab', 'photo-1567496898669-ee935f5f647a', 'photo-1582672060674-bc2bd808a8b5'],
  // DAMAC Islands, lagoons + beaches
  'IC-1011': ['photo-1507525428034-b723cf961d3e', 'photo-1600596542815-ffad4c1539a9', 'photo-1505764706515-aa95265c5abc'],
  // The Brooks at Sobha Sanctuary, green community
  'IC-1012': ['photo-1560185007-cde436f6a4d0', 'photo-1545324418-cc1a3fa10c00', 'photo-1448630360428-65456885c650'],
  // Yas Park Views by Aldar, Abu Dhabi
  'IC-1013': ['photo-1560448204-e02f11c3d0e2', 'photo-1460317442991-0ec209397118', 'photo-1493809842364-78817add7ffb'],
  // Aljada by Arada, Sharjah
  'IC-1014': ['photo-1486406146926-c627a92ad1ab', 'photo-1502672260266-1c1ef2d93688', 'photo-1448630360428-65456885c650'],
  // Falcon Island by Al Hamra, RAK, beachfront villas
  'IC-1015': ['photo-1613490493576-7fde63acd811', 'photo-1507525428034-b723cf961d3e', 'photo-1600596542815-ffad4c1539a9'],
  // Retail unit, Business Bay, glass frontage
  'IC-1016': ['photo-1441986300917-64674bd600d8', 'photo-1567958451986-2de427a4a0be', 'photo-1486406146926-c627a92ad1ab'],
};

const FALLBACK = ['photo-1512453979798-5ea266f8880c', 'photo-1518684079-3c830dcef090'];

/**
 * Commission rate iClose rebates as credits. Off-plan rates mirror the real
 * developer rates in the live DB; ready/secondary uses the standard brokerage
 * commission the buyer saves by going commission-free.
 */
const DEV_COMMISSION: Record<string, number> = {
  Binghatti: 6.5,
  Emaar: 5,
  Damac: 6,
  Sobha: 5,
  Aldar: 5,
  Arada: 5,
  'Al Hamra': 5,
  Meraas: 5.5,
};

export interface CreditAward {
  /** Commission % rebated as credits. */
  pct: number;
  /** Redeemable AED value of the award. */
  valueAed: number;
  /** Credit count (1 credit = 0.5 AED) — the big, motivating number. */
  credits: number;
}

export function creditAward(listing: Listing): CreditAward {
  const pct =
    listing.completion === 'off_plan'
      ? DEV_COMMISSION[listing.developerName ?? ''] ?? 5
      : 2;
  const valueAed = Math.round((listing.priceAed * pct) / 100);
  return { pct, valueAed, credits: aedToCredits(valueAed) };
}

export interface ExperienceListing extends Listing {
  gallery: string[];
  hook: string;
  credit: CreditAward;
}

function hookFor(listing: Listing): string {
  if (listing.completion === 'off_plan') {
    return listing.paymentPlan
      ? `Off-plan · ${listing.paymentPlan} plan`
      : 'New off-plan release';
  }
  if (listing.priceAed >= 15_000_000) return 'Trophy home';
  if (listing.amenities.some((a) => /beach|water|sea/i.test(a))) return 'Waterfront';
  if (listing.amenities.some((a) => /landmark|burj|view/i.test(a))) return 'Landmark views';
  return listing.isVerified ? 'Verified listing' : 'Fresh to market';
}

export const EXPERIENCE_LISTINGS: ExperienceListing[] = SEED_LISTINGS.map(
  (listing) => ({
    ...listing,
    gallery: (IMAGES[listing.reference] ?? FALLBACK).map((id) => U(id)),
    hook: hookFor(listing),
    credit: creditAward(listing),
  }),
);

export function getExperienceListing(
  reference: string,
): ExperienceListing | undefined {
  return EXPERIENCE_LISTINGS.find((l) => l.reference === reference);
}

/** Off-plan releases, surfaced as the "Launches" stories rail. */
export const EXPERIENCE_LAUNCHES = EXPERIENCE_LISTINGS.filter(
  (l) => l.completion === 'off_plan',
);

/** Compact AED formatter — "AED 3.2M" / "AED 620K". */
export function formatAed(value: number): string {
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    return `AED ${m % 1 === 0 ? m : m.toFixed(1)}M`;
  }
  if (value >= 1_000) return `AED ${Math.round(value / 1_000)}K`;
  return `AED ${value}`;
}

/** Credits with thousands separators — "150,000". */
export function formatCredits(credits: number): string {
  return credits.toLocaleString('en-US');
}

export { CREDIT_AED_RATE };
