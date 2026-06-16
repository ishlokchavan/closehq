import type { Metadata } from 'next';
import { SearchHero } from '@/components/portal/search/search-hero';
import { ListingSkeleton, ComingSoonNote } from '@/components/portal/listing-skeleton';

export const metadata: Metadata = {
  title: 'Properties for Sale in Dubai | iClose',
  description:
    'Search ready and secondary-market properties across Dubai and the UAE. Filter by community, property type, beds, price and amenities.',
};

export default function PropertiesPage() {
  return (
    <>
      <SearchHero
        active="properties"
        title="Properties"
        subtitle="Ready and secondary-market homes across Dubai and the UAE — never pay commission to buy."
      />
      <section className="container-wide pb-20">
        <div className="mb-5">
          <ComingSoonNote>
            Listings are populated from the <code>listings</code> data layer (next build step). The
            search and filters above are the live shell.
          </ComingSoonNote>
        </div>
        <ListingSkeleton count={9} />
      </section>
    </>
  );
}
