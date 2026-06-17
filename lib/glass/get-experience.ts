import { getListings, getListingByReference } from '@/lib/portal/listings';
import {
  toExperienceListing,
  FALLBACK_EXPERIENCE_LISTINGS,
  type ExperienceListing,
} from './experience-data';

/**
 * Server-side experience data. Reads the live `listings` table (the exact same
 * source as /properties) and enriches each row with credits + hook. Falls back
 * to the seed dataset only if the table is empty/unreachable, so the UI always
 * renders. Server components only — never import from a client component.
 */

export async function getExperienceListings(
  locale = 'en',
): Promise<ExperienceListing[]> {
  const listings = await getListings({ purpose: 'sale', limit: 50 }, locale);
  if (!listings.length) return FALLBACK_EXPERIENCE_LISTINGS;
  return listings.map(toExperienceListing);
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
  const listing = await getListingByReference(reference, locale);
  if (listing) return toExperienceListing(listing);
  return FALLBACK_EXPERIENCE_LISTINGS.find((l) => l.reference === reference);
}
