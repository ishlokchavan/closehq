import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { ResultsFilterBar } from '@/components/portal/search/results-filter-bar';
import { cn } from '@/lib/utils';
import { getTransactions } from '@/lib/portal/transactions';

export const metadata: Metadata = {
  title: 'Dubai Property Transactions & Sold Prices | iClose',
  description:
    'Explore real Dubai property transactions and historical sold prices by area, building and community. Track price trends before you buy or sell.',
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const { q, tab } = await searchParams;
  const activeKind: 'sold' | 'rented' = tab === 'rented' ? 'rented' : 'sold';
  const txns = await getTransactions({ kind: activeKind, q });

  const max = Math.max(1, ...txns.map((t) => t.priceAed));
  const avg = txns.length ? Math.round(txns.reduce((s, t) => s + t.priceAed, 0) / txns.length) : 0;

  return (
    <>
      <ResultsFilterBar active="transactions" defaultQuery={q ?? ''} params={{ tab: activeKind, ...(q ? { q } : {}) }} />
      <section className="container-wide py-6 space-y-6">
        {/* Sold / Rented toggle */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-mist">
          {(['sold', 'rented'] as const).map((k) => (
            <Link
              key={k}
              href={`/transactions?tab=${k}${q ? `&q=${encodeURIComponent(q)}` : ''}`}
              className={cn(
                'px-4 py-1.5 text-[13px] rounded-full capitalize transition-colors',
                activeKind === k ? 'bg-paper text-ink shadow-card font-medium' : 'text-graphite hover:text-ink',
              )}
            >
              {k}
            </Link>
          ))}
        </div>

        <p className="text-[14px] text-graphite">
          {txns.length} {txns.length === 1 ? 'transaction' : 'transactions'}
          {q ? <> in “{q}”</> : null}
          {avg > 0 && <> · avg AED {avg.toLocaleString('en-US')}</>}
        </p>

        {/* Price trend (per record) */}
        <div className="card-surface p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-graphite" />
            <span className="text-[14px] text-ink font-medium">Price spread</span>
          </div>
          <div className="h-48 rounded-xl bg-mist flex items-end gap-2 p-4">
            {txns.map((t) => (
              <div
                key={t.id}
                title={`${t.community} · AED ${t.priceAed.toLocaleString('en-US')}`}
                className="flex-1 rounded-t bg-accent/70 hover:bg-accent transition-colors"
                style={{ height: `${Math.max(6, (t.priceAed / max) * 100)}%` }}
              />
            ))}
          </div>
        </div>

        {/* Transactions table */}
        <div className="card-surface overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-hairline/60 text-[12px] uppercase tracking-wide text-graphite">
            <span className="col-span-2">Date</span>
            <span className="col-span-5">Building / Community</span>
            <span className="col-span-2">Type</span>
            <span className="col-span-1 text-center">Beds</span>
            <span className="col-span-2 text-end">Price (AED)</span>
          </div>
          {txns.map((t) => (
            <div key={t.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-hairline/40 last:border-0 text-[14px]">
              <span className="col-span-2 text-graphite">{t.date}</span>
              <span className="col-span-5 text-ink">
                {[t.building, t.community].filter(Boolean).join(', ')}
              </span>
              <span className="col-span-2 text-graphite-dark">{t.propertyType}</span>
              <span className="col-span-1 text-center text-graphite-dark">
                {t.bedrooms === 0 ? 'Studio' : t.bedrooms ?? '—'}
              </span>
              <span className="col-span-2 text-end text-ink font-medium">{t.priceAed.toLocaleString('en-US')}</span>
            </div>
          ))}
          {txns.length === 0 && (
            <div className="px-6 py-10 text-center text-[14px] text-graphite-dark">
              No transactions match your search yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
