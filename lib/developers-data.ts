/**
 * Developer directory seed data.
 *
 * Mirrors the planned Supabase `developers` table so the page is already
 * data-driven and swaps to a live query with no UI change:
 *   id, name, logo_url, discount_pct (nullable), tier, cta_target, sort_weight
 *
 * Rules (from spec):
 *  - `private_top` developers render first, then `private`, then `government`.
 *  - `government` (state-owned) developers HIDE the discount and show
 *    "Request details" instead.
 */

export type DeveloperTier = 'private_top' | 'private' | 'government';

export interface Developer {
  id: string;
  name: string;
  logo_url: string;
  /** Headline discount %, null for government / where not disclosed. */
  discount_pct: number | null;
  tier: DeveloperTier;
  /** CTA destination — handoff is form → CRM/email for now. */
  cta_target: string;
  sort_weight: number;
}

const TIER_ORDER: Record<DeveloperTier, number> = {
  private_top: 0,
  private: 1,
  government: 2,
};

const DEVELOPERS: Developer[] = [
  { id: 'emaar', name: 'Emaar', logo_url: '/images/developers/emaar.svg', discount_pct: 11, tier: 'private_top', cta_target: '/developers/enquire?dev=emaar', sort_weight: 10 },
  { id: 'damac', name: 'Damac', logo_url: '/images/developers/damac.svg', discount_pct: 9, tier: 'private_top', cta_target: '/developers/enquire?dev=damac', sort_weight: 20 },
  { id: 'sobha', name: 'Sobha', logo_url: '/images/developers/sobha.svg', discount_pct: 8, tier: 'private_top', cta_target: '/developers/enquire?dev=sobha', sort_weight: 30 },
  { id: 'binghatti', name: 'Binghatti', logo_url: '/images/developers/binghatti.png', discount_pct: 7, tier: 'private', cta_target: '/developers/enquire?dev=binghatti', sort_weight: 10 },
  { id: 'ellington', name: 'Ellington', logo_url: '/images/developers/ellington.png', discount_pct: 6, tier: 'private', cta_target: '/developers/enquire?dev=ellington', sort_weight: 20 },
  { id: 'meraas', name: 'Meraas', logo_url: '/images/developers/meraas.svg', discount_pct: null, tier: 'government', cta_target: '/developers/enquire?dev=meraas', sort_weight: 10 },
  { id: 'nakheel', name: 'Nakheel', logo_url: '/images/developers/nakheel.svg', discount_pct: null, tier: 'government', cta_target: '/developers/enquire?dev=nakheel', sort_weight: 20 },
];

/** Developers sorted by tier (private_top → private → government), then sort_weight. */
export function getDevelopers(): Developer[] {
  return [...DEVELOPERS].sort(
    (a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier] || a.sort_weight - b.sort_weight,
  );
}
