'use client';

import { Eye, Plus, Calendar, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useData } from '@/components/portal/dashboard/data-context';
import { PageHeader, Panel, StatCard, Badge, Avatar } from '@/components/portal/dashboard/ui';
import { type Viewing, type Tone } from '@/lib/portal/dashboard/demo';
import { fmtDateTime } from '@/lib/portal/dashboard/format';

const STATUS: Record<Viewing['status'], { tone: Tone; label: string }> = {
  scheduled: { tone: 'accent', label: 'Scheduled' },
  completed: { tone: 'success', label: 'Completed' },
  cancelled: { tone: 'neutral', label: 'Cancelled' },
  no_show: { tone: 'danger', label: 'No-show' },
};

export default function ViewingsPage() {
  const { persona } = usePersona();
  const { viewings } = useData();
  const upcoming = viewings.filter((v) => v.status === 'scheduled').sort((a, b) => +new Date(a.whenIso) - +new Date(b.whenIso));
  const past = viewings.filter((v) => v.status !== 'scheduled');

  return (
    <>
      <PageHeader title="Viewings" subtitle={persona === 'buyer_seller' ? 'Your property viewings and appointments.' : 'Schedule and track viewings with your clients.'}>
        <Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Schedule viewing</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Calendar} label="Upcoming" value={String(upcoming.length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={Eye} label="Completed" value={String(viewings.filter((v) => v.status === 'completed').length)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Eye} label="This week" value={String(upcoming.length)} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={Eye} label="No-shows" value={String(viewings.filter((v) => v.status === 'no_show').length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Upcoming" subtitle={`${upcoming.length} scheduled`}>
          <ul className="space-y-3">
            {upcoming.map((v) => (
              <li key={v.id} className="flex items-center gap-3 rounded-xl border border-hairline/70 p-3">
                <span className="flex flex-col items-center justify-center h-12 w-12 rounded-xl bg-accent/10 text-accent shrink-0">
                  <span className="text-[10px] uppercase">{new Date(v.whenIso).toLocaleDateString('en-GB', { month: 'short' })}</span>
                  <span className="text-[16px] font-semibold leading-none">{new Date(v.whenIso).getDate()}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{v.property}</p>
                  <p className="text-[12px] text-graphite inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {v.community}</p>
                </div>
                <div className="text-end">
                  <p className="text-[12.5px] text-ink whitespace-nowrap">{fmtDateTime(v.whenIso)}</p>
                  <p className="text-[12px] text-graphite">{persona === 'buyer_seller' ? v.ownerAgent : v.client}</p>
                </div>
              </li>
            ))}
            {upcoming.length === 0 && <p className="text-[13px] text-graphite text-center py-8">No upcoming viewings.</p>}
          </ul>
        </Panel>

        <Panel title="History">
          <ul className="space-y-3">
            {past.map((v) => (
              <li key={v.id} className="flex items-center gap-3">
                <Avatar name={persona === 'buyer_seller' ? (v.ownerAgent ?? '') : v.client} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{v.property}</p>
                  <p className="text-[12px] text-graphite">{v.community} · {fmtDateTime(v.whenIso)}</p>
                </div>
                <Badge tone={STATUS[v.status].tone}>{STATUS[v.status].label}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
