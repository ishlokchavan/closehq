'use client';

import { BadgeDollarSign, Download, TrendingUp, Lock, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td, BarChart, EmptyState } from '@/components/portal/dashboard/ui';
import { getCommission, getAnalytics } from '@/lib/portal/dashboard/demo';
import { fmtAed, fmtDate } from '@/lib/portal/dashboard/format';

export default function CommissionPage() {
  const { persona } = usePersona();

  if (persona === 'buyer_seller') {
    return (<><PageHeader title="Commission" /><Panel><EmptyState icon={Lock} title="Commission tracking is for agents & agencies" body="As a buyer or seller, head to Credits & cashback to see what you’ve earned." /></Panel></>);
  }

  const rows = getCommission(persona);
  const analytics = getAnalytics(persona);
  const total = rows.reduce((s, r) => s + r.netAed, 0);
  const paid = rows.filter((r) => r.status === 'paid').reduce((s, r) => s + r.netAed, 0);
  const pending = rows.filter((r) => r.status !== 'paid').reduce((s, r) => s + r.netAed, 0);

  const earnings = analytics.leadsByMonth.map((m) => ({ label: m.label, value: Math.round(m.value * (persona === 'agency' ? 9 : 6)) }));

  return (
    <>
      <PageHeader title={persona === 'agency' ? 'Commission & revenue' : 'Commission'} subtitle={persona === 'agency' ? 'Brokerage revenue across every closed deal.' : 'Every dirham you’ve earned — you keep 100%.'}>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" /> Statement</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={BadgeDollarSign} label="Earned (YTD)" value={fmtAed(total, { compact: true })} delta={23} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Wallet} label="Paid out" value={fmtAed(paid, { compact: true })} tint="bg-accent/10 text-accent" />
        <StatCard icon={Wallet} label="Pending" value={fmtAed(pending, { compact: true })} hint="Processing" tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={TrendingUp} label="Platform fee" value="AED 0" hint="0% commission cut" tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <Panel title="Earnings by month" className="lg:col-span-2"><BarChart data={earnings} tone="success" height={180} /></Panel>
        <Panel title="The iClose difference" bodyClassName="space-y-3">
          <div className="rounded-xl bg-journey-seller/15 p-4">
            <p className="text-[13px] text-graphite-dark">On iClose you keep</p>
            <p className="text-[34px] font-semibold text-[#067a55] leading-tight">100%</p>
            <p className="text-[13px] text-graphite-dark">of your commission. No agency split, no platform cut.</p>
          </div>
          <p className="text-[12.5px] text-graphite">Traditional brokerages take 30–50%. Across your YTD earnings that’s <span className="font-semibold text-ink">{fmtAed(total * 0.4, { compact: true })}</span> you didn’t lose.</p>
        </Panel>
      </div>

      <Panel title="Commission statements">
        <Table head={<><Th>Period</Th><Th>Deal</Th><Th>Gross</Th><Th>Platform fee</Th><Th>Net (you keep)</Th><Th>Status</Th><Th>Date</Th></>}>
          {rows.map((r) => (
            <tr key={r.id} className="hover:bg-mist/40">
              <Td className="font-medium">{r.period}</Td>
              <Td className="text-graphite-dark">{r.deal}</Td>
              <Td>{fmtAed(r.grossAed)}</Td>
              <Td className="text-[#067a55]">AED 0</Td>
              <Td className="font-semibold">{fmtAed(r.netAed)}</Td>
              <Td><Badge tone={r.status === 'paid' ? 'success' : r.status === 'processing' ? 'info' : 'warning'}>{r.status}</Badge></Td>
              <Td className="text-graphite whitespace-nowrap">{fmtDate(r.dateIso)}</Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
