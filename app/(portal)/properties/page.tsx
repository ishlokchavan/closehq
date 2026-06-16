import type { Metadata } from 'next';
import { SearchHero } from '@/components/portal/search/search-hero';
import { PropertyResults } from '@/components/portal/property-results';
import { getListings } from '@/lib/portal/listings';
import { getLocale } from '@/lib/i18n/server';

export const metadata: Metadata = {
  title: 'Properties for Sale in Dubai | iClose',
  description:
    'Search ready and secondary-market properties across Dubai and the UAE. Filter by community, property type, beds, price and amenities.',
};

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const { q, tab } = await searchParams;
  const locale = await getLocale();
  // Properties sub-tabs: All / Off-plan / Ready
  const completion = tab === 'off-plan' ? 'off_plan' : tab === 'ready' ? 'ready' : undefined;
  const listings = await getListings({ purpose: 'sale', completion, q }, locale);

  return (
    <>
      <SearchHero
        active="properties"
        title="Properties"
        subtitle="Ready and secondary-market homes across Dubai and the UAE — never pay commission to buy."
      />
      <section className="container-wide pb-20">
        <PropertyResults listings={listings} title={q ? `Properties for “${q}”` : 'Properties for sale in Dubai'} />
      </section>
    </>
  );
}
