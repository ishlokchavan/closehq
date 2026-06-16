'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEARCH_TABS, type SearchTabKey } from '@/lib/portal-config';

interface VerticalConfig {
  /** In-card sub-tabs (e.g. All / Off-plan / Ready). */
  subTabs?: string[];
  placeholder: string;
  /** Leading toggle pill (e.g. Residential ⇄ Commercial). */
  segment?: string;
  filters: string[];
  accent: 'red' | 'green';
  withLocationIcon?: boolean;
}

/** Per-vertical search-card config — mirrors the Property Finder home behaviour. */
const CONFIG: Record<SearchTabKey, VerticalConfig> = {
  properties: {
    subTabs: ['All', 'Off-plan', 'Ready'],
    placeholder: 'City, community or building',
    segment: 'Residential',
    filters: ['Property type', 'Beds & Baths', 'Price', 'Amenities', 'Area (sqft)'],
    accent: 'red',
  },
  'new-releases': {
    placeholder: 'Location, project or developer',
    withLocationIcon: true,
    filters: ['Property type', 'Bedrooms', 'Price', 'Amenities', 'Delivery date'],
    accent: 'green',
  },
  transactions: {
    subTabs: ['Sold', 'Rented'],
    placeholder: 'Search for any location in Dubai',
    filters: [],
    accent: 'red',
  },
  agents: {
    subTabs: ['Agents', 'Companies'],
    placeholder: 'Enter location or agent name',
    segment: 'Residential For Sale',
    filters: ['Property type', 'Language', 'Nationality'],
    accent: 'red',
  },
};

const ACCENT_BTN: Record<'red' | 'green', string> = {
  red: 'bg-journey-flag text-white hover:bg-journey-flag/90',
  green: 'bg-journey-listing text-white hover:bg-journey-listing/90',
};

/**
 * Home search hero. The top tabs swap the card IN PLACE (no navigation);
 * only the Search button routes to the vertical's results page — matching
 * Property Finder's home behaviour.
 */
export function SearchPanel({ initial = 'properties' }: { initial?: SearchTabKey }) {
  const router = useRouter();
  const [active, setActive] = useState<SearchTabKey>(initial);
  const [subTab, setSubTab] = useState(0);
  const [query, setQuery] = useState('');

  const config = CONFIG[active];

  function onSelectTab(key: SearchTabKey) {
    setActive(key);
    setSubTab(0);
  }

  function onSearch() {
    const tab = SEARCH_TABS.find((t) => t.key === active)!;
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    const sub = config.subTabs?.[subTab];
    if (sub) params.set('tab', sub.toLowerCase());
    const qs = params.toString();
    router.push(qs ? `${tab.href}?${qs}` : tab.href);
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Vertical tabs — switch the card in place */}
      <div className="flex items-center justify-center mb-4">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-paper shadow-card">
          {SEARCH_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => onSelectTab(tab.key)}
              className={cn(
                'px-4 py-1.5 text-[14px] rounded-full transition-colors',
                tab.key === active ? 'bg-accent/10 text-accent font-medium' : 'text-ink/70 hover:text-ink',
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search card */}
      <div className="card-surface shadow-card p-4 sm:p-5 text-left">
        {/* In-card sub-tabs */}
        {config.subTabs && (
          <div className="flex items-center gap-6 border-b border-hairline/60 mb-4">
            {config.subTabs.map((label, i) => (
              <button
                key={label}
                type="button"
                onClick={() => setSubTab(i)}
                className={cn(
                  'pb-2.5 -mb-px text-[14px] border-b-2 transition-colors',
                  i === subTab ? 'border-accent text-ink font-medium' : 'border-transparent text-graphite hover:text-ink',
                )}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Search field + button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {config.withLocationIcon ? (
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
            ) : (
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
            )}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder={config.placeholder}
              className="w-full h-11 pl-10 pr-3 rounded-full border border-hairline text-[15px] text-ink placeholder:text-graphite focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <button
            type="button"
            onClick={onSearch}
            className={cn('h-11 px-6 rounded-full text-[15px] font-medium transition-colors', ACCENT_BTN[config.accent])}
          >
            Search
          </button>
        </div>

        {/* Filter pills */}
        {(config.segment || config.filters.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {config.segment && <FilterPill label={config.segment} active />}
            {config.filters.map((filter) => (
              <FilterPill key={filter} label={filter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border text-[13px] transition-colors',
        active ? 'border-accent text-accent' : 'border-hairline text-ink/80 hover:border-ink/40 hover:text-ink',
      )}
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
    </button>
  );
}
