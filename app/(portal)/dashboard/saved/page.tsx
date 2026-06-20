'use client';

import Link from 'next/link';
import { Heart, Search, Bell, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, StatCard, Badge } from '@/components/portal/dashboard/ui';
import { getSaved } from '@/lib/portal/dashboard/demo';
import { fmtAed, fmtNum, timeAgo } from '@/lib/portal/dashboard/format';

export default function SavedPage() {
  const saved = getSaved();
  const dropped = saved.filter((s) => s.priceChange < 0).length;
  const value = saved.reduce((s, x) => s + x.priceAed, 0);

  return (
    <>
      <PageHeader title="Saved properties" subtitle="Your shortlist with live price movements and alerts.">
        <Link href="/properties"><Button variant="outline" size="sm"><Search className="h-4 w-4" /> Browse more</Button></Link>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <StatCard icon={Heart} label="Saved" value={String(saved.length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
        <StatCard icon={Bell} label="Price drops" value={String(dropped)} hint="On your shortlist" tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Heart} label="Shortlist value" value={fmtAed(value, { compact: true })} tint="bg-accent/10 text-accent" />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {saved.map((s) => (
          <div key={s.id} className="card-surface overflow-hidden group">
            <Link href="/properties" className="block relative h-44 bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {s.coverImageUrl && <img src={s.coverImageUrl} alt="" className="h-full w-full object-cover" />}
              {s.priceChange !== 0 && (
                <div className="absolute top-3 start-3"><Badge tone={s.priceChange < 0 ? 'success' : 'warning'} className="bg-paper/90 backdrop-blur">{s.priceChange < 0 ? 'Price dropped' : 'Price up'} {fmtAed(Math.abs(s.priceChange), { compact: true })}</Badge></div>
              )}
              <button className="absolute top-3 end-3 h-8 w-8 inline-flex items-center justify-center rounded-full bg-paper/90 backdrop-blur hover:bg-paper" aria-label="Remove"><Trash2 className="h-4 w-4 text-[#c81e3f]" /></button>
            </Link>
            <div className="p-4">
              <span className="text-[11px] text-graphite font-medium">{s.ref}</span>
              <p className="text-[14.5px] font-semibold text-ink mt-1 truncate">{s.title}</p>
              <p className="text-[12.5px] text-graphite">{s.community}</p>
              <p className="text-[16px] font-semibold text-ink mt-1.5">{fmtAed(s.priceAed)}</p>
              <p className="text-[12px] text-graphite mt-0.5">{s.beds !== null && `${s.beds === 0 ? 'Studio' : `${s.beds} bed`} · `}{s.baths} bath · {fmtNum(s.areaSqft)} sqft</p>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline/60">
                <span className="text-[12px] text-graphite">Saved {timeAgo(s.savedIso)}</span>
                <Link href="/properties" className="text-[13px] text-accent hover:underline">View</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
