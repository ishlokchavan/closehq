'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, X, Heart, Coins, Check } from 'lucide-react';
import { useExperience } from './experience-provider';
import { useSaved } from './saved-store';
import { formatAed, formatCredits } from '@/lib/glass/experience-data';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { SmartImage } from './smart-image';

type Completion = '' | 'ready' | 'off_plan';
const BED_CHIPS = ['Studio', '1', '2', '3', '4+'];
const TYPES = ['apartment', 'villa', 'townhouse', 'penthouse', 'office', 'retail'] as const;

export function SearchExplore() {
  const { listings } = useExperience();
  const { isSaved, toggleSave } = useSaved();

  const [q, setQ] = useState('');
  const [completion, setCompletion] = useState<Completion>('');
  const [beds, setBeds] = useState('');
  const [sheet, setSheet] = useState(false);
  const [types, setTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const activeFilters =
    types.length + (maxPrice ? 1 : 0) + (verifiedOnly ? 1 : 0);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return listings.filter((l) => {
      if (query) {
        const hay = [l.title, l.community, l.building, l.city, l.developerName]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (completion && l.completion !== completion) return false;
      if (beds) {
        if (beds === 'Studio' && l.bedrooms !== 0) return false;
        else if (beds === '4+' && (l.bedrooms ?? 0) < 4) return false;
        else if (!['Studio', '4+'].includes(beds) && l.bedrooms !== Number(beds))
          return false;
      }
      if (types.length && !types.includes(l.propertyType)) return false;
      if (maxPrice && l.priceAed > maxPrice) return false;
      if (verifiedOnly && !l.isVerified) return false;
      return true;
    });
  }, [listings, q, completion, beds, types, maxPrice, verifiedOnly]);

  return (
    <div className="relative h-[100svh] overflow-hidden bg-paper">
      {/* Sticky search header */}
      <div className="absolute inset-x-0 top-0 z-20 bg-paper/80 px-4 pb-2 pt-[max(16px,env(safe-area-inset-top))] backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <label className="flex h-11 flex-1 items-center gap-2 rounded-full bg-mist px-4">
            <Search className="h-[18px] w-[18px] text-graphite" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search community, project, city…"
              className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-graphite"
            />
            {q && (
              <button type="button" onClick={() => setQ('')} aria-label="Clear">
                <X className="h-4 w-4 text-graphite" />
              </button>
            )}
          </label>
          <button
            type="button"
            onClick={() => setSheet(true)}
            aria-label="Filters"
            className={`relative flex h-11 w-11 items-center justify-center rounded-full ${
              activeFilters ? 'bg-ink text-white' : 'bg-mist text-ink'
            }`}
          >
            <SlidersHorizontal className="h-[19px] w-[19px]" />
            {activeFilters > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-white ring-2 ring-white">
                {activeFilters}
              </span>
            )}
          </button>
        </div>

        {/* Quick chips */}
        <div className="no-scrollbar mt-2.5 flex gap-2 overflow-x-auto">
          <Chip active={completion === ''} onClick={() => setCompletion('')}>
            All
          </Chip>
          <Chip active={completion === 'ready'} onClick={() => setCompletion('ready')}>
            Ready
          </Chip>
          <Chip
            active={completion === 'off_plan'}
            onClick={() => setCompletion('off_plan')}
          >
            Off-plan
          </Chip>
          <span className="my-1 w-px shrink-0 bg-hairline" />
          {BED_CHIPS.map((b) => (
            <Chip key={b} active={beds === b} onClick={() => setBeds(beds === b ? '' : b)}>
              {b === 'Studio' ? b : `${b} bed`}
            </Chip>
          ))}
        </div>
      </div>

      {/* Results grid */}
      <div className="no-scrollbar h-full overflow-y-scroll px-3 pb-28 pt-[136px]">
        <p className="px-1 pb-2 pt-1 text-[13px] text-graphite">
          {results.length} {results.length === 1 ? 'home' : 'homes'}
        </p>
        {results.length === 0 ? (
          <div className="mt-16 text-center text-[14px] text-graphite">
            No homes match. Try clearing a filter.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((l) => (
              <GridCard
                key={l.reference}
                listing={l}
                saved={isSaved(l.reference)}
                onToggleSave={() => toggleSave(l.reference)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Filters sheet */}
      {sheet && (
        <FilterSheet
          types={types}
          setTypes={setTypes}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          verifiedOnly={verifiedOnly}
          setVerifiedOnly={setVerifiedOnly}
          resultCount={results.length}
          onClose={() => setSheet(false)}
          onReset={() => {
            setTypes([]);
            setMaxPrice(0);
            setVerifiedOnly(false);
          }}
        />
      )}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
        active ? 'bg-ink text-white' : 'bg-mist text-graphite-dark'
      }`}
    >
      {children}
    </button>
  );
}

function GridCard({
  listing,
  saved,
  onToggleSave,
}: {
  listing: ExperienceListing;
  saved: boolean;
  onToggleSave: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hairline/60 bg-paper">
      <Link href={`/experience/property/${listing.reference}`}>
        <div className="relative aspect-square bg-mist">
          <SmartImage
            src={listing.cover}
            alt={listing.title}
            fill
            sizes="50vw"
            className="object-cover"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              onToggleSave();
            }}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            className="lg-glass-light absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full active:scale-90"
          >
            <Heart
              className={`h-[17px] w-[17px] ${saved ? 'fill-rose-500 text-rose-500' : 'text-ink'}`}
            />
          </button>
        </div>
      </Link>
      <div className="p-2.5">
        <p className="text-[15px] font-semibold leading-none tracking-tight text-ink">
          {formatAed(listing.priceAed)}
        </p>
        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-accent/10 px-1.5 py-0.5 text-[11px] font-semibold text-accent">
          <Coins className="h-3 w-3" /> {formatCredits(listing.credit.credits)}
        </span>
        <p className="mt-1 line-clamp-1 text-[12px] text-graphite">
          {listing.community}, {listing.city}
        </p>
      </div>
    </div>
  );
}

const PRICE_OPTIONS = [
  { label: 'Any', value: 0 },
  { label: '≤ 1M', value: 1_000_000 },
  { label: '≤ 2M', value: 2_000_000 },
  { label: '≤ 5M', value: 5_000_000 },
  { label: '≤ 10M', value: 10_000_000 },
];

function FilterSheet({
  types,
  setTypes,
  maxPrice,
  setMaxPrice,
  verifiedOnly,
  setVerifiedOnly,
  resultCount,
  onClose,
  onReset,
}: {
  types: string[];
  setTypes: (v: string[]) => void;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (v: boolean) => void;
  resultCount: number;
  onClose: () => void;
  onReset: () => void;
}) {
  function toggleType(t: string) {
    setTypes(types.includes(t) ? types.filter((x) => x !== t) : [...types, t]);
  }

  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close filters"
        onClick={onClose}
        className="absolute inset-0 bg-ink/30 backdrop-blur-sm"
      />
      <div className="relative max-h-[80%] overflow-y-auto rounded-t-[28px] bg-paper p-5 pb-8">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-hairline" />
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[20px] font-semibold tracking-tight text-ink">Filters</h2>
          <button type="button" onClick={onClose} aria-label="Close">
            <X className="h-6 w-6 text-graphite" />
          </button>
        </div>

        <h3 className="mb-2 text-[14px] font-semibold text-ink">Property type</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => toggleType(t)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-medium capitalize transition-colors ${
                types.includes(t) ? 'bg-ink text-white' : 'bg-mist text-graphite-dark'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <h3 className="mb-2 text-[14px] font-semibold text-ink">Max price</h3>
        <div className="mb-5 flex flex-wrap gap-2">
          {PRICE_OPTIONS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => setMaxPrice(p.value)}
              className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors ${
                maxPrice === p.value ? 'bg-ink text-white' : 'bg-mist text-graphite-dark'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setVerifiedOnly(!verifiedOnly)}
          className="mb-6 flex w-full items-center justify-between rounded-2xl bg-mist px-4 py-3.5"
        >
          <span className="text-[15px] font-medium text-ink">Verified listings only</span>
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${
              verifiedOnly ? 'bg-ink text-white' : 'bg-paper text-transparent'
            }`}
          >
            <Check className="h-4 w-4" />
          </span>
        </button>

        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={onReset}
            className="flex-1 rounded-full border border-hairline bg-paper py-3.5 text-[15px] font-medium text-ink active:scale-[0.98]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-[2] rounded-full bg-ink py-3.5 text-[15px] font-semibold text-white active:scale-[0.98]"
          >
            Show {resultCount} homes
          </button>
        </div>
      </div>
    </div>
  );
}
