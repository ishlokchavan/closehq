'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SEARCH_TABS, type SearchTabKey } from '@/lib/portal-config';
import { useI18n } from '@/components/i18n/locale-provider';
import type { Messages } from '@/lib/i18n/dictionaries';

type SubKey = keyof Messages['search']['sub'];

interface VerticalConfig {
  /** In-card sub-tabs: localized label key + stable query-param value. */
  subTabs?: { key: SubKey; param: string }[];
  /** Leading toggle pill — 'residential' resolves from messages, else literal. */
  segment?: 'residential' | string;
  filters: string[];
  withLocationIcon?: boolean;
}

/** Per-vertical search-card config — mirrors the Property Finder home behaviour. */
const CONFIG: Record<SearchTabKey, VerticalConfig> = {
  properties: {
    subTabs: [
      { key: 'all', param: 'all' },
      { key: 'offplan', param: 'off-plan' },
      { key: 'ready', param: 'ready' },
    ],
    segment: 'residential',
    filters: ['Property type', 'Beds & Baths', 'Price', 'Amenities', 'Area (sqft)'],
  },
  'new-releases': {
    withLocationIcon: true,
    filters: ['Property type', 'Bedrooms', 'Price', 'Amenities', 'Delivery date'],
  },
  transactions: {
    subTabs: [
      { key: 'sold', param: 'sold' },
      { key: 'rented', param: 'rented' },
    ],
    filters: [],
  },
  agents: {
    subTabs: [
      { key: 'agents', param: 'agents' },
      { key: 'companies', param: 'companies' },
    ],
    segment: 'Residential For Sale',
    filters: ['Property type', 'Language', 'Nationality'],
  },
};

/**
 * Home search hero. The top tabs swap the card IN PLACE (no navigation);
 * only the Search button routes to the vertical's results page — matching
 * Property Finder's home behaviour.
 */
export function SearchPanel({ initial = 'properties' }: { initial?: SearchTabKey }) {
  const router = useRouter();
  const { messages } = useI18n();
  const m = messages.search;
  const [active, setActive] = useState<SearchTabKey>(initial);
  const [subTab, setSubTab] = useState(0);
  const [query, setQuery] = useState('');

  const config = CONFIG[active];
  const segmentLabel = config.segment === 'residential' ? m.residential : config.segment;

  function onSelectTab(key: SearchTabKey) {
    setActive(key);
    setSubTab(0);
  }

  function onSearch() {
    const tab = SEARCH_TABS.find((t) => t.key === active)!;
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    const sub = config.subTabs?.[subTab];
    if (sub) params.set('tab', sub.param);
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
              {m.tabs[tab.key === 'new-releases' ? 'newReleases' : tab.key]}
            </button>
          ))}
        </div>
      </div>

      {/* Search card */}
      <div className="card-surface shadow-card p-4 sm:p-5 text-start">
        {/* In-card sub-tabs */}
        {config.subTabs && (
          <div className="flex items-center gap-6 border-b border-hairline/60 mb-4">
            {config.subTabs.map((sub, i) => (
              <button
                key={sub.key}
                type="button"
                onClick={() => setSubTab(i)}
                className={cn(
                  'pb-2.5 -mb-px text-[14px] border-b-2 transition-colors',
                  i === subTab ? 'border-accent text-ink font-medium' : 'border-transparent text-graphite hover:text-ink',
                )}
              >
                {m.sub[sub.key]}
              </button>
            ))}
          </div>
        )}

        {/* Search field + button */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            {config.withLocationIcon ? (
              <MapPin className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
            ) : (
              <Search className="absolute start-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-graphite" />
            )}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && onSearch()}
              placeholder={m.ph[active === 'new-releases' ? 'newReleases' : active]}
              className="w-full h-11 ps-10 pe-3 rounded-full border border-hairline text-[15px] text-ink placeholder:text-graphite focus:outline-none focus:ring-2 focus:ring-accent/40"
            />
          </div>
          <button
            type="button"
            onClick={onSearch}
            className="h-11 px-6 rounded-full text-[15px] font-medium text-white bg-accent hover:bg-accent-hover active:bg-accent-dark transition-colors"
          >
            {m.search}
          </button>
        </div>

        {/* Filter pills */}
        {(segmentLabel || config.filters.length > 0) && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {segmentLabel && <FilterPill label={segmentLabel} active />}
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
