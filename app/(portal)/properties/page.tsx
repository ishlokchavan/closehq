import type { Metadata } from 'next';
import { ResultsFilterBar } from '@/components/portal/search/results-filter-bar';
import { PropertyResults } from '@/components/portal/property-results';
import type { FilterParams } from '@/components/portal/use-listing-filters';
import { getListings } from '@/lib/portal/listings';
import { getFilterOptions } from '@/lib/portal/filters';
import { getLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Properties for Sale in Dubai | iClose',
  description:
    'Search ready and secondary-market properties across Dubai and the UAE. Filter by community, property type, beds, price and amenities.',
};

const FILTER_KEYS = ['q', 'source', 'type', 'beds', 'baths', 'minPrice', 'maxPrice', 'minSize', 'maxSize', 'completion', 'verified'] as const;

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const params: FilterParams = {};
  for (const k of FILTER_KEYS) {
    const v = sp[k];
    if (typeof v === 'string' && v) params[k] = v;
  }

  const locale = await getLocale();
  const q = params.q;
  const [listings, options] = await Promise.all([
    getListings({ purpose: 'sale', q }, locale),
    getFilterOptions(),
  ]);

  return (
    <>
      <ResultsFilterBar active="properties" defaultQuery={q ?? ''} params={params} options={options} />
      <section className="container-wide py-6">
        <PropertyResults
          listings={listings}
          title={q ? `Properties for “${q}”` : 'Properties for sale in Dubai'}
          params={params}
        />
      </section>
    </>
  );
}
