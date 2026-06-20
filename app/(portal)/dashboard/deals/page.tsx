'use client';

import { useState } from 'react';
import { Handshake, LayoutGrid, List, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useData } from '@/components/portal/dashboard/data-context';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td, Dot } from '@/components/portal/dashboard/ui';
import { DEAL_STAGES } from '@/lib/portal/dashboard/demo';
import { fmtAed, fmtDate, timeAgo } from '@/lib/portal/dashboard/format';

export default function DealsPage() {
  const { persona } = usePersona();
  const { deals } = useData();
  const [view, setView] = useState<'board' | 'list'>('board');

  const active = deals.filter((d) => d.status === 'active');
  const pipelineValue = active.reduce((s, d) => s + d.valueAed, 0);
  const commission = active.reduce((s, d) => s + d.commissionAed, 0);
  const won = deals.filter((d) => d.status === 'won');
  const wonValue = won.reduce((s, d) => s + d.valueAed, 0);

  const isBuyer = persona === 'buyer_seller';

  return (
    <>
      <PageHeader
        title={isBuyer ? 'Offers & deals' : 'Deal pipeline'}
        subtitle={isBuyer ? 'Track your offers from enquiry to DLD transfer.' : 'Drag deals through every stage of the Dubai transaction flow.'}
      >
        <div className="inline-flex items-center rounded-full bg-mist p-1">
          <button onClick={() => setView('board')} className={cn('h-8 w-9 inline-flex items-center justify-center rounded-full', view === 'board' ? 'bg-paper shadow-card' : 'text-graphite')} aria-label="Board view"><LayoutGrid className="h-4 w-4" /></button>
          <button onClick={() => setView('list')} className={cn('h-8 w-9 inline-flex items-center justify-center rounded-full', view === 'list' ? 'bg-paper shadow-card' : 'text-graphite')} aria-label="List view"><List className="h-4 w-4" /></button>
        </div>
        {!isBuyer && <Button variant="primary" size="sm"><Plus className="h-4 w-4" /> New deal</Button>}
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Handshake} label="Live deals" value={String(active.length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={Handshake} label="Pipeline value" value={fmtAed(pipelineValue, { compact: true })} tint="bg-journey-agent/30 text-[#b45309]" />
        {!isBuyer && <StatCard icon={Handshake} label="Commission in play" value={fmtAed(commission, { compact: true })} hint="You keep 100%" tint="bg-journey-seller/30 text-[#067a55]" />}
        <StatCard icon={Handshake} label={isBuyer ? 'Closed' : 'Won this period'} value={fmtAed(wonValue, { compact: true })} hint={`${won.length} deals`} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      {view === 'board' ? (
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-1 px-1">
          {DEAL_STAGES.map((stage, i) => {
            const col = deals.filter((d) => d.stage === stage);
            const value = col.reduce((s, d) => s + d.valueAed, 0);
            return (
              <div key={stage} className="w-[280px] shrink-0">
                <div className="flex items-center justify-between px-1 mb-2.5">
                  <div className="flex items-center gap-2">
                    <Dot tone={i === DEAL_STAGES.length - 1 ? 'success' : 'accent'} />
                    <span className="text-[13px] font-semibold text-ink">{stage}</span>
                    <span className="text-[12px] text-graphite">{col.length}</span>
                  </div>
                  <span className="text-[11.5px] text-graphite">{value ? fmtAed(value, { compact: true }) : ''}</span>
                </div>
                <div className="space-y-2.5 bg-mist/50 rounded-2xl p-2 min-h-[120px]">
                  {col.map((d) => (
                    <div key={d.id} className="card-surface p-3.5 cursor-grab active:cursor-grabbing">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-graphite font-medium">{d.ref}</span>
                        {d.status === 'won' && <Badge tone="success">Won</Badge>}
                      </div>
                      <p className="text-[13.5px] font-medium text-ink mt-1">{d.property}</p>
                      <p className="text-[12px] text-graphite">{d.community}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <span className="text-[13px] font-semibold text-ink">{fmtAed(d.valueAed, { compact: true })}</span>
                        {!isBuyer && <span className="text-[11.5px] text-[#067a55]">+{fmtAed(d.commissionAed, { compact: true })}</span>}
                      </div>
                      <div className="flex items-center justify-between mt-2 pt-2.5 border-t border-hairline/60 text-[11.5px] text-graphite">
                        <span className="truncate">{d.client}</span>
                        <span className="whitespace-nowrap">{d.status === 'won' ? 'Closed' : fmtDate(d.closeIso)}</span>
                      </div>
                      {persona === 'agency' && <p className="text-[11px] text-graphite mt-1.5">Agent: {d.ownerAgent}</p>}
                    </div>
                  ))}
                  {col.length === 0 && <p className="text-[12px] text-graphite text-center py-6">No deals</p>}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Panel title={`${deals.length} deals`}>
          <Table head={<><Th>Ref</Th><Th>Property</Th><Th>Client</Th>{persona === 'agency' && <Th>Agent</Th>}<Th>Stage</Th><Th>Value</Th>{!isBuyer && <Th>Commission</Th>}<Th>Close</Th><Th>Updated</Th></>}>
            {deals.map((d) => (
              <tr key={d.id} className="hover:bg-mist/40">
                <Td className="text-graphite font-medium">{d.ref}</Td>
                <Td><p className="font-medium text-ink">{d.property}</p><p className="text-[12px] text-graphite">{d.community}</p></Td>
                <Td className="text-graphite-dark">{d.client}</Td>
                {persona === 'agency' && <Td className="text-graphite-dark">{d.ownerAgent}</Td>}
                <Td><Badge tone={d.status === 'won' ? 'success' : 'accent'}>{d.stage}</Badge></Td>
                <Td className="font-medium">{fmtAed(d.valueAed, { compact: true })}</Td>
                {!isBuyer && <Td className="text-[#067a55]">{fmtAed(d.commissionAed, { compact: true })}</Td>}
                <Td className="text-graphite-dark whitespace-nowrap">{d.status === 'won' ? '—' : fmtDate(d.closeIso)}</Td>
                <Td className="text-graphite whitespace-nowrap">{timeAgo(d.updatedIso)}</Td>
              </tr>
            ))}
          </Table>
        </Panel>
      )}
    </>
  );
}
