import type { Metadata } from 'next';
import { SearchHero } from '@/components/portal/search/search-hero';
import { ListingCard } from '@/components/portal/listing-card';
import { getListings } from '@/lib/portal/listings';

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
  // Properties sub-tabs: All / Off-plan / Ready
  const completion = tab === 'off-plan' ? 'off_plan' : tab === 'ready' ? 'ready' : undefined;
  const listings = await getListings({ purpose: 'sale', completion, q });

  return (
    <>
      <SearchHero
        active="properties"
        title="Properties"
        subtitle="Ready and secondary-market homes across Dubai and the UAE — never pay commission to buy."
      />
      <section className="container-wide pb-20">
        <p className="text-[14px] text-graphite mb-5">
          {listings.length} {listings.length === 1 ? 'property' : 'properties'}
          {q ? <> for “{q}”</> : null}
        </p>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="card-mist rounded-apple px-6 py-10 text-center text-[14px] text-graphite-dark">
            No properties match your search yet. Try a different community or filter.
          </div>
        )}
      </section>
    </>
  );
}
