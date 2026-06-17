import { SEED_LISTINGS } from '@/lib/portal/seed-listings';
import type { Listing } from '@/lib/portal/listing-types';
import { CREDIT_AED_RATE, aedToCredits } from '@/lib/portal/credits';

/**
 * Experience-only enrichment of the canonical /properties listings.
 *
 * Listings come from the live `listings` table (iclose-academy-db) via
 * lib/portal/listings. Each row already carries a real `cover_image_url`. This
 * module adds the credit award + a one-line hook, and provides a hardcoded
 * cover fallback (the same cloudfront assets) so images still render locally /
 * at build time when no Supabase env is configured.
 */

/** Real cover assets keyed by reference — mirror of listings.cover_image_url. */
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7';
const COVER: Record<string, string> = {
  'IC-1001': `${CDN}/hf_20260617_002543_e188c27d-1f7f-41a3-9c26-76506147c6bc.png`,
  'IC-1002': `${CDN}/hf_20260617_002613_eb69892f-76ef-47ca-a325-f100e334818b.png`,
  'IC-1003': `${CDN}/hf_20260617_003721_84f0c343-e903-4323-a3da-3cc2b40e1caf.png`,
  'IC-1004': `${CDN}/hf_20260617_003731_d8169d74-7b17-4791-85f8-ad305d55f30f.png`,
  'IC-1005': `${CDN}/hf_20260617_003744_5e42a364-7075-48e6-b157-892501c6d8fd.png`,
  'IC-1006': `${CDN}/hf_20260617_003752_1a2077a1-e714-44c0-bd9f-320587367ebc.png`,
  'IC-1007': `${CDN}/hf_20260617_003758_9cd1e39c-34f7-4254-b957-2794b4fd56b3.png`,
  'IC-1008': `${CDN}/hf_20260617_003803_581d9c91-c1f7-4d15-82a0-fbf278dda5c2.png`,
  'IC-1009': `${CDN}/hf_20260617_003812_a0b696ba-39a6-4ce8-b9ce-f142f281ecf1.png`,
  'IC-1010': `${CDN}/hf_20260617_003818_5feff738-8da5-43c6-b04f-58c3252212b4.png`,
  'IC-1011': `${CDN}/hf_20260617_003825_03c046dc-5c3c-4edc-ad64-c1bee05bdc1d.png`,
  'IC-1012': `${CDN}/hf_20260617_003833_cb9eb297-439b-4d90-969e-253590919c91.png`,
  'IC-1013': `${CDN}/hf_20260617_003839_2eff0b07-0f63-4bf6-aeb9-c6f2d09df01e.png`,
  'IC-1014': `${CDN}/hf_20260617_003850_49dffc4f-2d9d-438f-8cd6-9e5722f8377e.png`,
  'IC-1015': `${CDN}/hf_20260617_003856_e005de4e-b563-4f1b-9698-43052d25240b.png`,
  'IC-1016': `${CDN}/hf_20260617_003911_5c9fdb4b-ac4a-4cae-9f3a-f3d494dd6bfc.png`,
};
const FALLBACK_COVER =
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80';

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
  pct: number;
  valueAed: number;
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
  cover: string;
  /** Carousel images. Currently just the cover until galleries are generated. */
  images: string[];
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

/** Map a live (or seed) listing into the experience shape. */
export function toExperienceListing(listing: Listing): ExperienceListing {
  const cover = listing.coverImageUrl ?? COVER[listing.reference] ?? FALLBACK_COVER;
  return {
    ...listing,
    cover,
    images: [cover],
    hook: hookFor(listing),
    credit: creditAward(listing),
  };
}

/** Fallback dataset (seed) used only if the live table is empty/unreachable. */
export const FALLBACK_EXPERIENCE_LISTINGS: ExperienceListing[] =
  SEED_LISTINGS.map(toExperienceListing);

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
