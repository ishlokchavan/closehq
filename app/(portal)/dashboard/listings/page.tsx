'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Building2, Plus, Eye, Target, Heart, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useToast } from '@/components/portal/dashboard/toast';
import { RowMenu } from '@/components/portal/dashboard/row-menu';
import { PageHeader, StatCard, Badge } from '@/components/portal/dashboard/ui';
import { getListings, type ListingRow, type Tone } from '@/lib/portal/dashboard/demo';
import { fmtAed, fmtNum, timeAgo } from '@/lib/portal/dashboard/format';

const STATUS_TONE: Record<ListingRow['status'], Tone> = {
  active: 'success', draft: 'neutral', pending_review: 'warning', sold: 'info', archived: 'neutral',
};
const STATUS_LABEL: Record<ListingRow['status'], string> = {
  active: 'Active', draft: 'Draft', pending_review: 'In review', sold: 'Sold', archived: 'Archived',
};

export default function ListingsPage() {
  const { persona } = usePersona();
  const toast = useToast();
  const all = getListings(persona);
  const [status, setStatus] = useState<ListingRow['status'] | 'all'>('all');
  const [q, setQ] = useState('');

  function copyLink(l: ListingRow) {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/properties/${l.ref}` : '';
    navigator.clipboard?.writeText(url).then(() => toast.success('Listing link copied.'), () => toast.error('Could not copy link.'));
  }

  const rows = useMemo(() => all.filter((l) =>
    (status === 'all' || l.status === status) &&
    (q === '' || `${l.title} ${l.community} ${l.ref}`.toLowerCase().includes(q.toLowerCase())),
  ), [all, status, q]);

  const active = all.filter((l) => l.status === 'active');
  const views = all.reduce((s, l) => s + l.views, 0);
  const leads = all.reduce((s, l) => s + l.leads, 0);

  const isBuyer = persona === 'buyer_seller';

  return (
    <>
      <PageHeader
        title={isBuyer ? 'My listings' : persona === 'agency' ? 'Agency listings' : 'My listings'}
        subtitle={isBuyer ? 'Manage the properties you’re selling — commission-free.' : persona === 'agency' ? 'Every property across your team.' : 'Your live inventory, drafts and performance.'}
      >
        <Link href="/sell/list/new"><Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add listing</Button></Link>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Building2} label="Active listings" value={String(active.length)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Eye} label="Total views" value={fmtNum(views)} delta={11} tint="bg-accent/10 text-accent" />
        <StatCard icon={Target} label="Leads generated" value={fmtNum(leads)} delta={7} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={Building2} label="All listings" value={String(all.length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {(['all', 'active', 'draft', 'pending_review', 'sold'] as const).map((s) => (
            <button key={s} onClick={() => setStatus(s)} className={cn('px-3 py-1.5 rounded-full text-[13px] transition-colors', status === s ? 'bg-ink text-white' : 'bg-mist text-ink/70 hover:text-ink')}>
              {s === 'all' ? 'All' : STATUS_LABEL[s]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-mist text-graphite text-[13px]">
          <Search className="h-4 w-4" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search listings…" className="bg-transparent outline-none placeholder:text-graphite w-32 sm:w-44" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {rows.map((l) => (
          <div key={l.id} className="card-surface overflow-hidden group">
            <div className="relative h-40 bg-mist">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              {l.coverImageUrl && <img src={l.coverImageUrl} alt="" className="h-full w-full object-cover" />}
              <div className="absolute top-3 start-3"><Badge tone={STATUS_TONE[l.status]} className="bg-paper/90 backdrop-blur">{STATUS_LABEL[l.status]}</Badge></div>
              <div className="absolute top-3 end-3">
                <RowMenu
                  triggerClassName="h-8 w-8 inline-flex items-center justify-center rounded-full bg-paper/90 backdrop-blur hover:bg-paper"
                  iconClassName="h-4 w-4 text-ink"
                  items={[
                    { label: 'Copy link', onClick: () => copyLink(l) },
                    { label: 'Preview', onClick: () => { if (typeof window !== 'undefined') window.open(`/properties/${l.ref}`, '_blank'); } },
                    { label: 'Edit listing', onClick: () => toast.info(`Editing “${l.title}” — editor opening soon.`) },
                    { label: l.status === 'active' ? 'Mark as sold' : 'Archive', onClick: () => toast.info('Status update saved (demo).') },
                  ]}
                />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-graphite font-medium">{l.ref}</span>
                {persona === 'agency' && <span className="text-[11px] text-graphite">{l.ownerAgent}</span>}
              </div>
              <p className="text-[14.5px] font-semibold text-ink mt-1 truncate">{l.title}</p>
              <p className="text-[12.5px] text-graphite">{l.community}</p>
              <p className="text-[16px] font-semibold text-ink mt-1.5">{fmtAed(l.priceAed)}</p>
              <p className="text-[12px] text-graphite mt-0.5">
                {l.beds !== null && `${l.beds === 0 ? 'Studio' : `${l.beds} bed`} · `}{l.baths} bath · {fmtNum(l.areaSqft)} sqft
              </p>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-hairline/60 text-[12px] text-graphite-dark">
                <span className="inline-flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {fmtNum(l.views)}</span>
                <span className="inline-flex items-center gap-1"><Target className="h-3.5 w-3.5" /> {l.leads}</span>
                <span className="inline-flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> {l.savedBy}</span>
                <span className="ms-auto text-graphite">{timeAgo(l.updatedIso)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
