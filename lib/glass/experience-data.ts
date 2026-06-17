import { SEED_LISTINGS } from '@/lib/portal/seed-listings';
import type { Listing } from '@/lib/portal/listing-types';

/**
 * Experience-only enrichment of the seed listings.
 *
 * The seed data ships with `coverImageUrl: null` (imagery was left as a
 * placeholder decision in the portal). The Liquid Glass prototype is
 * image-first, so we attach a curated gallery per listing here — kept entirely
 * inside the (glass) feature so the production data layer is untouched.
 *
 * Hosts (images.unsplash.com) are already whitelisted in next.config images.
 */

const U = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Pools of architecture / interior photography, picked per property type. */
const GALLERIES: Record<string, string[][]> = {
  apartment: [
    ['photo-1502672260266-1c1ef2d93688', 'photo-1560448204-e02f11c3d0e2', 'photo-1522708323590-d24dbb6b0267'],
    ['photo-1545324418-cc1a3fa10c00', 'photo-1493809842364-78817add7ffb', 'photo-1484154218962-a197022b5858'],
    ['photo-1567496898669-ee935f5f647a', 'photo-1556912172-45b7abe8b7e1', 'photo-1505693416388-ac5ce068fe85'],
  ],
  villa: [
    ['photo-1613490493576-7fde63acd811', 'photo-1600596542815-ffad4c1539a9', 'photo-1600585154340-be6161a56a0c'],
    ['photo-1564013799919-ab600027ffc6', 'photo-1512917774080-9991f1c4c750', 'photo-1600607687939-ce8a6c25118c'],
  ],
  townhouse: [
    ['photo-1576941089067-2de3c901e126', 'photo-1600566753086-00f18fb6b3ea', 'photo-1600210492486-724fe5c67fb0'],
  ],
  penthouse: [
    ['photo-1600607687920-4e2a09cf159d', 'photo-1600047509807-ba8f99d2cdde', 'photo-1600566753190-17f0baa2a6c3'],
  ],
  office: [
    ['photo-1497366754035-f200968a6e72', 'photo-1497366811353-6870744d04b2', 'photo-1524758631624-e2822e304c36'],
  ],
  retail: [
    ['photo-1441986300917-64674bd600d8', 'photo-1567958451986-2de427a4a0be'],
  ],
  plot: [
    ['photo-1500382017468-9049fed747ef', 'photo-1470770841072-f978cf4d019e'],
  ],
};

/** Dubai skyline hero shots reused as a fallback / variety. */
const SKYLINE = [
  'photo-1512453979798-5ea266f8880c',
  'photo-1518684079-3c830dcef090',
  'photo-1546412414-e1885259563a',
  'photo-1582672060674-bc2bd808a8b5',
];

export interface ExperienceListing extends Listing {
  /** Resolved hero/gallery imagery for the immersive feed + detail. */
  gallery: string[];
  /** One-line hook shown on the swipe card. */
  hook: string;
}

function galleryFor(listing: Listing, index: number): string[] {
  const pool = GALLERIES[listing.propertyType] ?? GALLERIES.apartment;
  const set = pool[index % pool.length];
  const skyline = SKYLINE[index % SKYLINE.length];
  return [...set.map((id) => U(id)), U(skyline)];
}

function hookFor(listing: Listing): string {
  if (listing.completion === 'off_plan') {
    return listing.paymentPlan
      ? `Off-plan · ${listing.paymentPlan} payment plan`
      : 'New off-plan release';
  }
  if (listing.priceAed >= 15_000_000) return 'Trophy home · ultra-prime';
  if (listing.amenities.some((a) => /beach|water|sea/i.test(a))) return 'Waterfront living';
  if (listing.amenities.some((a) => /landmark|burj|view/i.test(a))) return 'Landmark views';
  return listing.isVerified ? 'Verified listing' : 'Fresh to market';
}

export const EXPERIENCE_LISTINGS: ExperienceListing[] = SEED_LISTINGS.map(
  (listing, i) => ({
    ...listing,
    gallery: galleryFor(listing, i),
    hook: hookFor(listing),
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
