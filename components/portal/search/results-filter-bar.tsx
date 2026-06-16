'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEARCH_TABS, type SearchTabKey } from '@/lib/portal-config';

/** Compact filter sets per vertical (Proffer/PF results-bar style). */
const BAR: Record<SearchTabKey, { placeholder: string; filters: string[] }> = {
  properties: { placeholder: 'City, community or building', filters: ['Type', 'Beds & Baths', 'Price', 'Size'] },
  'new-releases': { placeholder: 'Location, project or developer', filters: ['Type', 'Handover By', 'Payment Plan', 'Price'] },
  transactions: { placeholder: 'Search for any location in Dubai', filters: ['Type', 'Beds', 'Date', 'Price'] },
  agents: { placeholder: 'Location or agent name', filters: ['Property type', 'Language', 'Nationality'] },
};

/**
 * Slim, sticky results header: vertical tabs + a search field + filter pills.
 * Keeps the focus on the map/results below (vs the big home hero).
 */
export function ResultsFilterBar({ active, defaultQuery = '' }: { active: SearchTabKey; defaultQuery?: string }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultQuery);
  const cfg = BAR[active];

  function onSearch() {
    const href = SEARCH_TABS.find((t) => t.key === active)!.href;
    router.push(query.trim() ? `${href}?q=${encodeURIComponent(query.trim())}` : href);
  }

  return (
    <div className="sticky top-14 z-40 bg-paper/90 backdrop-blur-xl border-b border-hairline/60">
      <div className="container-wide py-3 space-y-2.5">
        {/* Vertical tabs */}
        <div className="flex items-center gap-1 overflow-x-auto">
          {SEARCH_TABS.map((tab) => (
            <Link
              key={tab.key}
              href={tab.href}
              className={cn(
                'px-3 py-1.5 text-[13px] rounded-full whitespace-nowrap transition-colors',
                tab.key === active ? 'bg-accent/10 text-accent font-medium' : 'text-ink/70 hover:text-ink hover:bg-mist',
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {/* Search + filter pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder={cfg.placeholder}
              className="w-full h-10 ps-10 pe-3 rounded-full border border-hairline text-[14px] text-ink placeholder:text-graphite focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          {cfg.filters.map((f) => (
            <button
              key={f}
              type="button"
              className="hidden sm:inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-hairline text-[13px] text-ink/80 hover:border-ink/40 hover:text-ink transition-colors"
            >
              {f} <ChevronDown className="h-3.5 w-3.5 opacity-60" />
            </button>
          ))}
          <button
            type="button"
            className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-full border border-hairline text-[13px] text-ink/80 hover:border-ink/40 hover:text-ink transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" /> More filters
          </button>
          <button
            type="button"
            onClick={onSearch}
            className="h-10 px-5 rounded-full text-[14px] font-medium text-white bg-accent hover:bg-accent-hover transition-colors"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
