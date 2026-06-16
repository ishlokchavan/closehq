'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { SEARCH_TABS, type SearchTabKey } from '@/lib/portal-config';
import { SearchBar, type SearchBarConfig } from './search-bar';

/** Per-vertical search bar configuration (matches the product spec table). */
export const SEARCH_CONFIG: Record<SearchTabKey, SearchBarConfig> = {
  properties: {
    placeholder: 'City, community or building',
    segment: 'Residential',
    filters: ['Property type', 'Beds & Baths', 'Price', 'Amenities', 'Area (sqft)'],
    accent: 'red',
  },
  'new-releases': {
    placeholder: 'Enter location',
    withLocationIcon: true,
    filters: ['Residential', 'Handover By', 'Payment Plan', '% Completion'],
    accent: 'green',
  },
  transactions: {
    placeholder: 'Area, building or community',
    segment: 'Sales',
    filters: ['Property type', 'Beds', 'Date range', 'Price'],
    accent: 'red',
  },
  agents: {
    placeholder: 'Location or agent name',
    segment: 'Residential For Sale',
    filters: ['Property type', 'Language', 'Nationality'],
    accent: 'red',
  },
};

/**
 * Home search hero: a tab strip across the four portal verticals plus the
 * active vertical's search bar. Tabs route to the dedicated vertical pages.
 */
export function SearchTabs({ active }: { active: SearchTabKey }) {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-mist">
          {SEARCH_TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                'px-4 py-1.5 text-[14px] rounded-full transition-colors',
                tab.key === active
                  ? 'bg-paper text-ink shadow-card font-medium'
                  : 'text-ink/70 hover:text-ink',
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
      <SearchBar config={SEARCH_CONFIG[active]} />
    </div>
  );
}
