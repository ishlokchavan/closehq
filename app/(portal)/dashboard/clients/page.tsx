'use client';

import { useMemo, useState } from 'react';
import { UserSquare2, Search, Plus, Phone, Mail, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { PageHeader, Panel, StatCard, Badge, Avatar, Table, Th, Td, EmptyState } from '@/components/portal/dashboard/ui';
import { getClients, type Client } from '@/lib/portal/dashboard/demo';
import { fmtAed, timeAgo } from '@/lib/portal/dashboard/format';

const TYPES: (Client['type'] | 'All')[] = ['All', 'Buyer', 'Seller', 'Investor', 'Tenant', 'Landlord'];

export default function ClientsPage() {
  const { persona } = usePersona();
  const all = getClients(persona);
  const [type, setType] = useState<Client['type'] | 'All'>('All');
  const [q, setQ] = useState('');

  const rows = useMemo(() => all.filter((c) =>
    (type === 'All' || c.type === type) &&
    (q === '' || `${c.name} ${c.email}`.toLowerCase().includes(q.toLowerCase())),
  ), [all, type, q]);

  if (persona === 'buyer_seller') {
    return (<><PageHeader title="Clients" /><Panel><EmptyState icon={Lock} title="Clients are for agents & agencies" body="This is where agents manage their buyer and seller relationships." /></Panel></>);
  }

  const active = all.filter((c) => c.status === 'Active').length;
  const portfolio = all.reduce((s, c) => s + c.valueAed, 0);

  return (
    <>
      <PageHeader title="Clients" subtitle={persona === 'agency' ? 'Your team’s full client book.' : 'Your buyers, sellers and investors in one CRM.'}>
        <Button variant="primary" size="sm"><Plus className="h-4 w-4" /> Add client</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={UserSquare2} label="Total clients" value={String(all.length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={UserSquare2} label="Active" value={String(active)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={UserSquare2} label="Portfolio value" value={fmtAed(portfolio, { compact: true })} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={UserSquare2} label="Repeat clients" value={String(all.filter((c) => c.deals >= 2).length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <Panel
        title={`${rows.length} clients`}
        action={(
          <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-mist text-graphite text-[13px]">
            <Search className="h-4 w-4" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search clients…" className="bg-transparent outline-none placeholder:text-graphite w-32 sm:w-44" />
          </div>
        )}
      >
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {TYPES.map((t) => (
            <button key={t} onClick={() => setType(t)} className={cn('px-3 py-1.5 rounded-full text-[13px] transition-colors', type === t ? 'bg-ink text-white' : 'bg-mist text-ink/70 hover:text-ink')}>{t}</button>
          ))}
        </div>
        <Table head={<><Th>Client</Th><Th>Type</Th><Th>Status</Th>{persona === 'agency' && <Th>Agent</Th>}<Th>Value</Th><Th>Deals</Th><Th>Last contact</Th><Th /></>}>
          {rows.map((c) => (
            <tr key={c.id} className="hover:bg-mist/40">
              <Td><div className="flex items-center gap-2.5"><Avatar name={c.name} size={34} /><div className="min-w-0"><p className="font-medium text-ink truncate">{c.name}</p><p className="text-[12px] text-graphite truncate">{c.email}</p></div></div></Td>
              <Td><Badge tone="info">{c.type}</Badge></Td>
              <Td><Badge tone={c.status === 'Active' ? 'success' : c.status === 'Nurturing' ? 'warning' : 'neutral'}>{c.status}</Badge></Td>
              {persona === 'agency' && <Td className="text-graphite-dark">{c.ownerAgent}</Td>}
              <Td className="font-medium">{fmtAed(c.valueAed, { compact: true })}</Td>
              <Td className="text-graphite-dark">{c.deals}</Td>
              <Td className="text-graphite whitespace-nowrap">{timeAgo(c.lastContactIso)}</Td>
              <Td>
                <div className="flex items-center gap-1">
                  <a href={`tel:${c.phone}`} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-mist" aria-label="Call"><Phone className="h-4 w-4 text-graphite" /></a>
                  <a href={`mailto:${c.email}`} className="h-8 w-8 inline-flex items-center justify-center rounded-full hover:bg-mist" aria-label="Email"><Mail className="h-4 w-4 text-graphite" /></a>
                </div>
              </Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
