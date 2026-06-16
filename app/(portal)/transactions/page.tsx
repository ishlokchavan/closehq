import type { Metadata } from 'next';
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';
import { ResultsFilterBar } from '@/components/portal/search/results-filter-bar';
import type { FilterParams } from '@/components/portal/use-listing-filters';
import { cn } from '@/lib/utils';
import { getTransactions } from '@/lib/portal/transactions';
import { getFilterOptions } from '@/lib/portal/filters';

export const metadata: Metadata = {
  title: 'Dubai Property Transactions & Sold Prices | iClose',
  description:
    'Explore real Dubai property transactions and historical sold prices by area, building and community. Track price trends before you buy or sell.',
};

export default async function TransactionsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const str = (k: string) => (typeof sp[k] === 'string' && sp[k] ? (sp[k] as string) : undefined);
  const q = str('q');
  const activeKind: 'sold' | 'rented' = str('tab') === 'rented' ? 'rented' : 'sold';
  const type = str('type');
  const beds = str('beds');
  const minPrice = Number(str('minPrice')) || 0;
  const maxPrice = Number(str('maxPrice')) || Infinity;

  const [allKind, options] = await Promise.all([
    getTransactions({ kind: activeKind, q }),
    getFilterOptions(),
  ]);

  // Client-style filters applied server-side over the kind/q result set.
  const txns = allKind.filter((t) => {
    if (type && t.propertyType.toLowerCase() !== type) return false;
    if (beds) {
      if (beds === 'Studio' ? t.bedrooms !== 0 : beds === '5+' ? (t.bedrooms ?? 0) < 5 : t.bedrooms !== Number(beds)) return false;
    }
    if (t.priceAed < minPrice || t.priceAed > maxPrice) return false;
    return true;
  });

  const params: FilterParams = { tab: activeKind };
  for (const [k, v] of Object.entries({ q, type, beds, minPrice: str('minPrice'), maxPrice: str('maxPrice') })) {
    if (typeof v === 'string' && v) params[k] = v;
  }

  const max = Math.max(1, ...txns.map((t) => t.priceAed));
  const avg = txns.length ? Math.round(txns.reduce((s, t) => s + t.priceAed, 0) / txns.length) : 0;

  return (
    <>
      <ResultsFilterBar active="transactions" defaultQuery={q ?? ''} params={params} options={options} />
      <section className="container-wide py-6 space-y-6">
        {/* Sold / Rented toggle */}
        <div className="inline-flex items-center gap-1 p-1 rounded-full bg-mist">
          {(['sold', 'rented'] as const).map((k) => (
            <Link
              key={k}
              href={`/transactions?${new URLSearchParams({ ...params, tab: k }).toString()}`}
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
