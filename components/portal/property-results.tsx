'use client';

import { useMemo, useState } from 'react';
import { Map as MapIcon, List as ListIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListingCard } from '@/components/portal/listing-card';
import type { Listing } from '@/lib/portal/listing-types';

type Source = 'all' | 'owner' | 'developer';
type View = 'list' | 'map';

const TYPE_LABEL: Record<Listing['propertyType'], string> = {
  apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', penthouse: 'Penthouse',
  plot: 'Plot', office: 'Office', retail: 'Retail',
};

/** Proffer/PF-style results: source tabs, type quick-filters, Map/List toggle. */
export function PropertyResults({ listings, title }: { listings: Listing[]; title: string }) {
  const [source, setSource] = useState<Source>('all');
  const [view, setView] = useState<View>('list');
  const [type, setType] = useState<Listing['propertyType'] | 'all'>('all');

  const bySource = useMemo(
    () => (source === 'all' ? listings : listings.filter((l) => l.source === source)),
    [listings, source],
  );
  const filtered = useMemo(
    () => (type === 'all' ? bySource : bySource.filter((l) => l.propertyType === type)),
    [bySource, type],
  );

  // Type counts (over the source-filtered set)
  const typeCounts = useMemo(() => {
    const counts: Partial<Record<Listing['propertyType'], number>> = {};
    bySource.forEach((l) => { counts[l.propertyType] = (counts[l.propertyType] ?? 0) + 1; });
    return counts;
  }, [bySource]);

  return (
    <div className="space-y-5">
      {/* Title + Map/List toggle */}
      <div className="flex items-center justify-between gap-4">
        <h2 className="display-sm">{title}</h2>
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-mist">
          {(['map', 'list'] as View[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                'inline-flex items-center gap-1.5 px-3.5 py-1.5 text-[13px] rounded-full capitalize transition-colors',
                view === v ? 'bg-paper text-ink shadow-card font-medium' : 'text-graphite hover:text-ink',
              )}
            >
              {v === 'map' ? <MapIcon className="h-3.5 w-3.5" /> : <ListIcon className="h-3.5 w-3.5" />} {v}
            </button>
          ))}
        </div>
      </div>

      {/* Source tabs + count */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-mist">
          {(['all', 'owner', 'developer'] as Source[]).map((s) => (
            <button
              key={s}
              onClick={() => setSource(s)}
              className={cn(
                'px-4 py-1.5 text-[13px] rounded-full capitalize transition-colors',
                source === s ? 'bg-accent text-white font-medium' : 'text-ink/70 hover:text-ink',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="text-[14px] text-graphite">
          {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
        </span>
      </div>

      {/* Type quick-filters */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-y border-hairline/60 py-3">
        <button
          onClick={() => setType('all')}
          className={cn('text-[14px]', type === 'all' ? 'text-accent font-medium' : 'text-ink/80 hover:text-accent')}
        >
          All <span className="text-graphite">{bySource.length}</span>
        </button>
        {(Object.keys(TYPE_LABEL) as Listing['propertyType'][])
          .filter((t) => (typeCounts[t] ?? 0) > 0)
          .map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={cn('text-[14px]', type === t ? 'text-accent font-medium' : 'text-ink/80 hover:text-accent')}
            >
              {TYPE_LABEL[t]} <span className="text-graphite">{typeCounts[t]}</span>
            </button>
          ))}
      </div>

      {/* Results */}
      {view === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-apple bg-mist min-h-[420px] flex items-center justify-center text-graphite">
            <span className="inline-flex items-center gap-2 text-[14px]"><MapPin className="h-4 w-4" /> Map view</span>
          </div>
          <div className="space-y-4 max-h-[640px] overflow-auto pe-1">
            {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      ) : filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
        </div>
      ) : (
        <div className="card-mist rounded-apple px-6 py-10 text-center text-[14px] text-graphite-dark">
          No properties match these filters.
        </div>
      )}
    </div>
  );
}
