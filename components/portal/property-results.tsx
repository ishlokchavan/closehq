'use client';

import { useMemo, useState } from 'react';
import { Map as MapIcon, List as ListIcon, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ListingCard } from '@/components/portal/listing-card';
import { PropertyMap, MAPS_ENABLED } from '@/components/portal/property-map';
import { useListingFilters, type FilterParams } from '@/components/portal/use-listing-filters';
import type { Listing } from '@/lib/portal/listing-types';

type Source = 'all' | 'owner' | 'developer';
type View = 'list' | 'map';

const TYPE_LABEL: Record<Listing['propertyType'], string> = {
  apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', penthouse: 'Penthouse',
  plot: 'Plot', office: 'Office', retail: 'Retail',
};

function priceShort(n: number): string {
  return n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`;
}

function matchBeds(l: Listing, beds: string): boolean {
  if (l.bedrooms == null) return false;
  if (beds === 'Studio') return l.bedrooms === 0;
  if (beds === '5+') return l.bedrooms >= 5;
  return l.bedrooms === Number(beds);
}
function matchBaths(l: Listing, baths: string): boolean {
  if (l.bathrooms == null) return false;
  if (baths === '5+') return l.bathrooms >= 5;
  return l.bathrooms === Number(baths);
}

/** Decorative pin positions over the placeholder map. */
const PIN_POS: { top: string; left: string }[] = [
  { top: '22%', left: '30%' }, { top: '38%', left: '62%' }, { top: '55%', left: '40%' },
  { top: '30%', left: '78%' }, { top: '68%', left: '58%' }, { top: '48%', left: '20%' },
  { top: '72%', left: '32%' }, { top: '60%', left: '80%' },
];

/** Proffer/PF-style results: source tabs, type quick-filters, Map/List toggle. */
export function PropertyResults({ listings, title, params }: { listings: Listing[]; title: string; params: FilterParams }) {
  const { get, setParams } = useListingFilters(params);
  const [view, setView] = useState<View>('list');

  const source = (get('source') as Source) || 'all';
  const type = get('type') ?? '';
  const beds = get('beds') ?? '';
  const baths = get('baths') ?? '';
  const minPrice = Number(get('minPrice')) || 0;
  const maxPrice = Number(get('maxPrice')) || Infinity;
  const minSize = Number(get('minSize')) || 0;
  const maxSize = Number(get('maxSize')) || Infinity;
  const completion = get('completion') ?? '';
  const verified = get('verified') === 'true';

  const bySource = useMemo(
    () => (source === 'all' ? listings : listings.filter((l) => l.source === source)),
    [listings, source],
  );

  const filtered = useMemo(
    () =>
      bySource.filter((l) => {
        if (type && l.propertyType !== type) return false;
        if (beds && !matchBeds(l, beds)) return false;
        if (baths && !matchBaths(l, baths)) return false;
        if (l.priceAed < minPrice || l.priceAed > maxPrice) return false;
        const area = l.areaSqft ?? 0;
        if (area < minSize || area > maxSize) return false;
        if (completion && l.completion !== completion) return false;
        if (verified && !l.isVerified) return false;
        return true;
      }),
    [bySource, type, beds, baths, minPrice, maxPrice, minSize, maxSize, completion, verified],
  );

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
              onClick={() => setParams({ source: s === 'all' ? null : s })}
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
          onClick={() => setParams({ type: null })}
          className={cn('text-[14px]', !type ? 'text-accent font-medium' : 'text-ink/80 hover:text-accent')}
        >
          All <span className="text-graphite">{bySource.length}</span>
        </button>
        {(Object.keys(TYPE_LABEL) as Listing['propertyType'][])
          .filter((t) => (typeCounts[t] ?? 0) > 0)
          .map((t) => (
            <button
              key={t}
              onClick={() => setParams({ type: t })}
              className={cn('text-[14px]', type === t ? 'text-accent font-medium' : 'text-ink/80 hover:text-accent')}
            >
              {TYPE_LABEL[t]} <span className="text-graphite">{typeCounts[t]}</span>
            </button>
          ))}
      </div>

      {/* Results */}
      {view === 'map' ? (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Map pane — real Google Map when configured, else placeholder pins */}
          <div className="lg:col-span-3 relative rounded-apple bg-[#eaeef0] h-[560px] overflow-hidden">
            {MAPS_ENABLED ? (
              <PropertyMap listings={filtered} />
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center text-graphite/60">
                  <span className="inline-flex items-center gap-2 text-[13px]"><MapPin className="h-4 w-4" /> Map view</span>
                </div>
                {filtered.slice(0, 8).map((l, i) => (
                  <span
                    key={l.id}
                    className="absolute rounded-full bg-accent text-white text-[12px] font-medium px-2.5 py-1 shadow-card -translate-x-1/2 -translate-y-1/2"
                    style={PIN_POS[i % PIN_POS.length]}
                  >
                    From {priceShort(l.priceAed)}
                  </span>
                ))}
              </>
            )}
          </div>
          {/* Side panel: "X Listings" + scrollable cards */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[15px] font-medium text-ink">{filtered.length} Listings for Buy</span>
            </div>
            <div className="space-y-4 max-h-[520px] overflow-auto pe-1">
              {filtered.map((l) => <ListingCard key={l.id} listing={l} />)}
            </div>
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
