'use client';

import { useMemo, useState } from 'react';
import { Target, Search, Plus, Phone, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useData } from '@/components/portal/dashboard/data-context';
import { CreateRecordModal } from '@/components/portal/dashboard/create-record-modal';
import { PageHeader, Panel, StatCard, Badge, Avatar, Table, Th, Td, EmptyState } from '@/components/portal/dashboard/ui';
import { LEAD_STAGES, type LeadStage, type Tone } from '@/lib/portal/dashboard/demo';
import { fmtAed, timeAgo } from '@/lib/portal/dashboard/format';

const STAGE_TONE: Record<LeadStage, Tone> = {
  New: 'accent', Contacted: 'info', Qualified: 'info', Viewing: 'warning',
  Negotiating: 'warning', Won: 'success', Lost: 'danger',
};

export default function LeadsPage() {
  const { persona } = usePersona();
  const { leads: all, live } = useData();
  const [stage, setStage] = useState<LeadStage | 'All'>('All');
  const [q, setQ] = useState('');
  const [adding, setAdding] = useState(false);

  const rows = useMemo(() => all.filter((l) =>
    (stage === 'All' || l.stage === stage) &&
    (q === '' || `${l.name} ${l.interest} ${l.source}`.toLowerCase().includes(q.toLowerCase())),
  ), [all, stage, q]);

  if (persona === 'buyer_seller') {
    return (
      <>
        <PageHeader title="Leads" />
        <Panel><EmptyState icon={Lock} title="Leads are for agents & agencies" body="As a buyer or seller you'll find your conversations under Enquiries instead." /></Panel>
      </>
    );
  }

  const newCount = all.filter((l) => l.stage === 'New').length;
  const qualified = all.filter((l) => l.stage === 'Qualified' || l.stage === 'Viewing' || l.stage === 'Negotiating').length;
  const won = all.filter((l) => l.stage === 'Won').length;
  const convRate = Math.round((won / all.length) * 100);

  return (
    <>
      <PageHeader title="Leads" subtitle={persona === 'agency' ? 'Every lead across your team — route, qualify and convert.' : 'Your enquiries — qualify and move them into deals.'}>
        {live.leads && <Badge tone="success"><span className="h-1.5 w-1.5 rounded-full bg-[#059669]" /> Live</Badge>}
        <Button variant="primary" size="sm" onClick={() => setAdding(true)}><Plus className="h-4 w-4" /> Add lead</Button>
      </PageHeader>
      <CreateRecordModal kind="lead" open={adding} onClose={() => setAdding(false)} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Target} label="New leads" value={String(newCount)} tint="bg-accent/10 text-accent" />
        <StatCard icon={Target} label="In progress" value={String(qualified)} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={Target} label="Won" value={String(won)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Target} label="Conversion" value={`${convRate}%`} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <Panel
        action={(
          <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-mist text-graphite text-[13px]">
            <Search className="h-4 w-4" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search leads…" className="bg-transparent outline-none placeholder:text-graphite w-32 sm:w-44" />
          </div>
        )}
        title={`${rows.length} leads`}
      >
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {(['All', ...LEAD_STAGES] as const).map((s) => (
            <button key={s} onClick={() => setStage(s)}
              className={cn('px-3 py-1.5 rounded-full text-[13px] transition-colors', stage === s ? 'bg-ink text-white' : 'bg-mist text-ink/70 hover:text-ink')}>
              {s}
            </button>
          ))}
        </div>

        <Table head={<><Th>Lead</Th><Th>Interest</Th><Th>Budget</Th><Th>Source</Th>{persona === 'agency' && <Th>Owner</Th>}<Th>Score</Th><Th>Stage</Th><Th>Last touch</Th><Th /></>}>
          {rows.map((l) => (
            <tr key={l.id} className="hover:bg-mist/40">
              <Td>
                <div className="flex items-center gap-2.5">
                  <Avatar name={l.name} size={34} />
                  <div className="min-w-0">
                    <p className="font-medium text-ink truncate">{l.name}</p>
                    <p className="text-[12px] text-graphite truncate">{l.email}</p>
                  </div>
                </div>
              </Td>
              <Td className="text-graphite-dark">{l.interest}</Td>
              <Td className="font-medium">{fmtAed(l.budgetAed, { compact: true })}</Td>
              <Td className="text-graphite-dark">{l.source}</Td>
              {persona === 'agency' && <Td className="text-graphite-dark">{l.ownerAgent}</Td>}
              <Td><Badge tone={l.score >= 85 ? 'success' : l.score >= 70 ? 'warning' : 'neutral'}>{l.score}</Badge></Td>
              <Td><Badge tone={STAGE_TONE[l.stage]}>{l.stage}</Badge></Td>
              <Td className="text-graphite whitespace-nowrap">{timeAgo(l.lastTouchIso)}</Td>
              <Td>
                <div className="flex items-center gap-1">
                  <a href={`tel:${l.phone}`} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-mist" aria-label="Call"><Phone className="h-4 w-4 text-graphite" /></a>
                  <a href={`mailto:${l.email}`} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-mist" aria-label="Email"><Mail className="h-4 w-4 text-graphite" /></a>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
