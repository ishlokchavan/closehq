import type { Metadata } from 'next';
import { TrendingUp } from 'lucide-react';
import { SearchHero } from '@/components/portal/search/search-hero';
import { ComingSoonNote } from '@/components/portal/listing-skeleton';

export const metadata: Metadata = {
  title: 'Dubai Property Transactions & Sold Prices | iClose',
  description:
    'Explore real Dubai property transactions and historical sold prices by area, building and community. Track price trends before you buy or sell.',
};

export default function TransactionsPage() {
  return (
    <>
      <SearchHero
        active="transactions"
        title="Transactions"
        subtitle="Explore historical sold prices and trends by area, building or community — know the market before you move."
      />
      <section className="container-wide pb-20 space-y-5">
        <ComingSoonNote>
          A DLD-style sold-price explorer. Transaction records and price-trend charts are populated
          from the data layer next.
        </ComingSoonNote>

        {/* Price-trend chart placeholder */}
        <div className="card-surface p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-graphite" />
            <span className="text-[14px] text-ink font-medium">Price trend</span>
          </div>
          <div className="h-48 rounded-xl bg-mist flex items-end gap-2 p-4">
            {[40, 55, 48, 62, 70, 66, 78, 85].map((h, i) => (
              <div key={i} className="flex-1 rounded-t bg-hairline" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        {/* Transactions table placeholder */}
        <div className="card-surface overflow-hidden">
          <div className="grid grid-cols-4 gap-4 px-6 py-3 border-b border-hairline/60 text-[12px] uppercase tracking-wide text-graphite">
            <span>Date</span>
            <span>Building / Area</span>
            <span>Type</span>
            <span className="text-right">Price (AED)</span>
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 px-6 py-4 border-b border-hairline/40 last:border-0">
              <div className="h-3 w-20 rounded bg-mist" />
              <div className="h-3 w-40 rounded bg-mist" />
              <div className="h-3 w-16 rounded bg-mist" />
              <div className="h-3 w-24 rounded bg-mist justify-self-end" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
