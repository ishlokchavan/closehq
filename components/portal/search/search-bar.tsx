'use client';

import { useState } from 'react';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SearchBarConfig {
  placeholder: string;
  /** Filter pills shown under the search field. */
  filters: string[];
  accent: 'red' | 'green';
  /** Optional leading pill that toggles category (e.g. Residential ⇄ Commercial). */
  segment?: string;
  withLocationIcon?: boolean;
}

const ACCENT_BTN: Record<'red' | 'green', string> = {
  red: 'bg-journey-flag text-white hover:bg-journey-flag/90',
  green: 'bg-journey-listing text-white hover:bg-journey-listing/90',
};

/**
 * Presentational search bar for a portal vertical. Filters are non-functional
 * placeholders for now (the shell); they wire to real query params in a later pass.
 */
export function SearchBar({ config }: { config: SearchBarConfig }) {
  const [query, setQuery] = useState('');

  return (
    <div className="card-surface shadow-card p-3 sm:p-4">
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
            placeholder={config.placeholder}
            className="w-full h-11 pl-10 pr-3 rounded-full bg-mist text-[15px] text-ink placeholder:text-graphite focus:outline-none focus:ring-2 focus:ring-accent/40"
          />
        </div>
        <button
          type="button"
          className={cn('h-11 px-6 rounded-full text-[15px] font-medium transition-colors', ACCENT_BTN[config.accent])}
        >
          Search
        </button>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        {config.segment && <FilterPill label={config.segment} active />}
        {config.filters.map((filter) => (
          <FilterPill key={filter} label={filter} />
        ))}
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
        active
          ? 'border-accent text-accent'
          : 'border-hairline text-ink/80 hover:border-ink/40 hover:text-ink',
      )}
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
    </button>
  );
}
