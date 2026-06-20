'use client';

import { BarChart3, TrendingUp, Target, Eye, Lock } from 'lucide-react';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { PageHeader, Panel, StatCard, BarChart, Funnel, EmptyState, TONE } from '@/components/portal/dashboard/ui';
import { cn } from '@/lib/utils';
import { getAnalytics, getListings } from '@/lib/portal/dashboard/demo';
import { fmtNum } from '@/lib/portal/dashboard/format';

export default function AnalyticsPage() {
  const { persona } = usePersona();

  if (persona === 'buyer_seller') {
    return (<><PageHeader title="Analytics" /><Panel><EmptyState icon={Lock} title="Analytics are for agents & agencies" body="Performance dashboards live here once you start listing and closing on iClose." /></Panel></>);
  }

  const a = getAnalytics(persona);
  const listings = getListings(persona);
  const views = listings.reduce((s, l) => s + l.views, 0);
  const leads = listings.reduce((s, l) => s + l.leads, 0);
  const totalArea = a.topAreas.reduce((s, x) => s + x.value, 0);

  return (
    <>
      <PageHeader title="Analytics" subtitle={persona === 'agency' ? 'How your brokerage is performing across the funnel.' : 'Your performance — traffic, leads and conversion.'} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Eye} label="Listing views" value={fmtNum(views)} delta={11} tint="bg-accent/10 text-accent" />
        <StatCard icon={Target} label="Leads" value={fmtNum(leads)} delta={7} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={TrendingUp} label="View → lead" value={`${Math.round((leads / Math.max(views, 1)) * 100)}%`} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={BarChart3} label="Lead → close" value="12%" delta={3} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title="Leads over time" className="lg:col-span-2"><BarChart data={a.leadsByMonth} tone="accent" height={200} /></Panel>
        <Panel title="Conversion funnel"><Funnel data={a.conversion} /></Panel>

        <Panel title="Lead sources" className="lg:col-span-1">
          <ul className="space-y-3">
            {a.sourceMix.map((s) => (
              <li key={s.label}>
                <div className="flex items-center justify-between text-[13px] mb-1"><span className="text-ink">{s.label}</span><span className="text-graphite">{s.value}%</span></div>
                <span className="block h-2 w-full rounded-full bg-mist overflow-hidden"><span className={cn('block h-full rounded-full', TONE[s.tone].bar)} style={{ width: `${s.value}%` }} /></span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Top areas" subtitle="By deal volume" className="lg:col-span-2">
          <ul className="space-y-3">
            {a.topAreas.map((area) => (
              <li key={area.label} className="flex items-center gap-3">
                <span className="text-[13px] text-ink w-40 shrink-0 truncate">{area.label}</span>
                <span className="block h-2 flex-1 rounded-full bg-mist overflow-hidden"><span className="block h-full rounded-full bg-accent" style={{ width: `${(area.value / totalArea) * 100}%` }} /></span>
                <span className="text-[12.5px] text-graphite w-8 text-end">{area.value}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
