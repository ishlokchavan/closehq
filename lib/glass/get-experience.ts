import { unstable_cache } from 'next/cache';
import { getListings, getListingByReference } from '@/lib/portal/listings';
import {
  toExperienceListing,
  FALLBACK_EXPERIENCE_LISTINGS,
  type ExperienceListing,
} from './experience-data';

/**
 * Server-side experience data. Reads the live `listings` table (same source as
 * /properties) plus the additive `listing_images` carousel table, enriching each
 * row with credits + hook. Falls back to seed/code maps when Supabase isn't
 * configured. Server components only — never import from a client component.
 */

function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** reference -> ordered carousel image URLs, from the live table. */
async function fetchCarouselImages(reference?: string): Promise<Record<string, string[]>> {
  if (!isSupabaseConfigured()) return {};
  try {
    const { supabase } = await import('@/lib/supabase');
    let query = supabase
      .from('listing_images')
      .select('reference,url,position')
      .order('position', { ascending: true });
    // Single-listing detail opens only need that listing's images — avoid a
    // full-table scan on every navigation.
    if (reference) query = query.eq('reference', reference);
    // Fail fast if Supabase is paused/unreachable rather than hanging the render.
    const { data, error } = await query.abortSignal(AbortSignal.timeout(2500));
    if (error || !data) return {};
    const map: Record<string, string[]> = {};
    for (const row of data as { reference: string; url: string }[]) {
      (map[row.reference] ??= []).push(row.url);
    }
    return map;
  } catch {
    return {};
  }
}

/**
 * Resolve with `fallback` after `ms` no matter what — a hard guarantee that a
 * paused/slow/unreachable Supabase can never block the render for more than a
 * couple of seconds, even if the query's own abort signal fails to cancel a
 * stuck connection.
 */
function withTimeout<T>(promise: Promise<T>, ms: number, fallback: T): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), ms)),
  ]);
}

/**
 * Cached so repeat loads don't re-hit Supabase on every request — the feed is
 * the same for everyone (personalisation is client-side), so a short server
 * cache makes navigation/refresh feel instant. Revalidates every 2 minutes.
 */
const loadExperienceListings = unstable_cache(
  async (locale: string): Promise<ExperienceListing[]> => {
    const live = (async () => {
      const [listings, extras] = await Promise.all([
        getListings({ purpose: 'sale', limit: 50 }, locale),
        fetchCarouselImages(),
      ]);
      if (!listings.length) return FALLBACK_EXPERIENCE_LISTINGS;
      return listings.map((l) => toExperienceListing(l, extras[l.reference]));
    })();
    return withTimeout(live, 3000, FALLBACK_EXPERIENCE_LISTINGS);
  },
  ['experience-listings'],
  { revalidate: 120, tags: ['experience-listings'] },
);

export function getExperienceListings(locale = 'en'): Promise<ExperienceListing[]> {
  return loadExperienceListings(locale);
}

export async function getExperienceLaunches(
  locale = 'en',
): Promise<ExperienceListing[]> {
  const all = await getExperienceListings(locale);
  return all.filter((l) => l.completion === 'off_plan');
}

export async function getExperienceListing(
  reference: string,
  locale = 'en',
): Promise<ExperienceListing | undefined> {
  const [listing, extras] = await Promise.all([
    getListingByReference(reference, locale),
    fetchCarouselImages(reference),
  ]);
  if (listing) return toExperienceListing(listing, extras[reference]);
  return FALLBACK_EXPERIENCE_LISTINGS.find((l) => l.reference === reference);
}
