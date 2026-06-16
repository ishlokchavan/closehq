'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { FilterDropdown } from './filter-dropdown';
import { useListingFilters, type FilterParams } from '@/components/portal/use-listing-filters';
import type { FilterOptions } from '@/lib/portal/filters';

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'h-9 min-w-[44px] px-3 rounded-full border text-[13px] transition-colors',
        active ? 'border-accent text-accent bg-accent/5 font-medium' : 'border-hairline text-ink/80 hover:border-ink/40',
      )}
    >
      {children}
    </button>
  );
}

/** Functional filter dropdowns for the Properties results bar (URL + DB-backed options). */
export function PropertyFilterDropdowns({ params, options }: { params: FilterParams; options: FilterOptions }) {
  const { get, setParams } = useListingFilters(params);

  const type = get('type');
  const beds = get('beds');
  const baths = get('baths');
  const minPrice = get('minPrice');
  const maxPrice = get('maxPrice');
  const minSize = get('minSize');
  const maxSize = get('maxSize');
  const completion = get('completion');
  const verified = get('verified') === 'true';

  const typeLabel = options.propertyTypes.find((t) => t.value === type)?.label;
  const bedBathLabel = beds || baths ? `${beds ? `${beds} bed` : ''}${beds && baths ? ' · ' : ''}${baths ? `${baths} bath` : ''}` : null;
  const priceLabel = minPrice || maxPrice ? `${minPrice || '0'}–${maxPrice || '∞'}` : null;
  const sizeLabel = minSize || maxSize ? `${minSize || '0'}–${maxSize || '∞'} sqft` : null;
  const moreCount = (completion ? 1 : 0) + (verified ? 1 : 0);

  return (
    <>
      {/* Type */}
      <FilterDropdown label={type && typeLabel ? typeLabel : 'Type'} active={!!type} width="sm:w-56">
        {(close) => (
          <div className="grid grid-cols-1 gap-0.5">
            {options.propertyTypes.map((t) => (
              <button
                key={t.value || 'all'}
                type="button"
                onClick={() => { setParams({ type: t.value || null }); close(); }}
                className={cn(
                  'text-start px-3 py-2.5 rounded-lg text-[14px] hover:bg-mist transition-colors',
                  type === t.value ? 'text-accent font-medium' : 'text-ink',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </FilterDropdown>

      {/* Beds & Baths */}
      <FilterDropdown label={bedBathLabel ?? 'Beds & Baths'} active={!!(beds || baths)} width="sm:w-72">
        {() => (
          <div className="space-y-4">
            <div>
              <p className="text-[12px] text-graphite mb-2">Bedrooms</p>
              <div className="flex flex-wrap gap-2">
                <Chip active={!beds} onClick={() => setParams({ beds: null })}>Any</Chip>
                {options.beds.map((b) => (
                  <Chip key={b} active={beds === b} onClick={() => setParams({ beds: b })}>{b}</Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[12px] text-graphite mb-2">Bathrooms</p>
              <div className="flex flex-wrap gap-2">
                <Chip active={!baths} onClick={() => setParams({ baths: null })}>Any</Chip>
                {options.baths.map((b) => (
                  <Chip key={b} active={baths === b} onClick={() => setParams({ baths: b })}>{b}</Chip>
                ))}
              </div>
            </div>
          </div>
        )}
      </FilterDropdown>

      {/* Price */}
      <FilterDropdown label={priceLabel ?? 'Price'} active={!!(minPrice || maxPrice)}>
        {(close) => <RangePanel unit="AED" minKey="minPrice" maxKey="maxPrice" minVal={minPrice} maxVal={maxPrice} setParams={setParams} close={close} />}
      </FilterDropdown>

      {/* Size */}
      <FilterDropdown label={sizeLabel ?? 'Size'} active={!!(minSize || maxSize)}>
        {(close) => <RangePanel unit="sqft" minKey="minSize" maxKey="maxSize" minVal={minSize} maxVal={maxSize} setParams={setParams} close={close} />}
      </FilterDropdown>

      {/* More filters */}
      <FilterDropdown label={moreCount ? `More filters (${moreCount})` : 'More filters'} active={moreCount > 0} width="sm:w-64">
        {() => (
          <div className="space-y-4">
            <div>
              <p className="text-[12px] text-graphite mb-2">Completion</p>
              <div className="flex flex-wrap gap-2">
                {options.completion.map((c) => (
                  <Chip key={c.label} active={completion === c.value} onClick={() => setParams({ completion: c.value || null })}>{c.label}</Chip>
                ))}
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-[14px] text-ink">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#0071e3]"
                checked={verified}
                onChange={(e) => setParams({ verified: e.target.checked ? 'true' : null })}
              />
              Verified listings only
            </label>
          </div>
        )}
      </FilterDropdown>
    </>
  );
}

function RangePanel({
  unit, minKey, maxKey, minVal, maxVal, setParams, close,
}: {
  unit: string; minKey: string; maxKey: string; minVal: string; maxVal: string;
  setParams: (u: Record<string, string | null>) => void; close: () => void;
}) {
  const [lo, setLo] = useState(minVal);
  const [hi, setHi] = useState(maxVal);
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          inputMode="numeric"
          value={lo}
          onChange={(e) => setLo(e.target.value.replace(/\D/g, ''))}
          placeholder={`Min ${unit}`}
          className="w-full h-10 px-3 rounded-xl border border-hairline text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
        <span className="text-graphite">–</span>
        <input
          inputMode="numeric"
          value={hi}
          onChange={(e) => setHi(e.target.value.replace(/\D/g, ''))}
          placeholder={`Max ${unit}`}
          className="w-full h-10 px-3 rounded-xl border border-hairline text-[14px] focus:outline-none focus:ring-2 focus:ring-accent/40"
        />
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={() => { setLo(''); setHi(''); setParams({ [minKey]: null, [maxKey]: null }); close(); }} className="text-[13px] text-graphite hover:text-ink">Clear</button>
        <button type="button" onClick={() => { setParams({ [minKey]: lo || null, [maxKey]: hi || null }); close(); }} className="h-9 px-4 rounded-full bg-accent text-white text-[13px] font-medium hover:bg-accent-hover">Apply</button>
      </div>
    </div>
  );
}
