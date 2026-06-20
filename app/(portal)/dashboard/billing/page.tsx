'use client';

import { CreditCard, Check, Download, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useToast, downloadFile } from '@/components/portal/dashboard/toast';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td, EmptyState } from '@/components/portal/dashboard/ui';
import { fmtAed, fmtDate } from '@/lib/portal/dashboard/format';

const PLANS = [
  { key: 'air', label: 'Air', price: 0, split: 100, features: ['Up to 5 active listings', 'Keep 100% commission', 'Lead inbox', 'Standard support'], current: false },
  { key: 'pro', label: 'Pro', price: 499, split: 100, features: ['Unlimited listings', 'Keep 100% commission', 'CRM + pipeline', 'Priority placement', 'Analytics'], current: true, star: true },
  { key: 'team', label: 'Team', price: 1499, split: 100, features: ['Everything in Pro', 'Up to 15 agents', 'Team analytics', 'Lead routing', 'Dedicated manager'], current: false },
];

const INVOICES = [
  { id: 'in1', no: 'INV-2026-0612', date: '2026-06-01', amount: 499, status: 'paid' as const },
  { id: 'in2', no: 'INV-2026-0511', date: '2026-05-01', amount: 499, status: 'paid' as const },
  { id: 'in3', no: 'INV-2026-0409', date: '2026-04-01', amount: 499, status: 'paid' as const },
];

export default function BillingPage() {
  const { persona } = usePersona();
  const toast = useToast();

  function downloadInvoice(i: typeof INVOICES[number]) {
    downloadFile(`${i.no}.txt`,
      `iClose — Invoice ${i.no}\nDate: ${fmtDate(i.date)}\nAmount: ${fmtAed(i.amount)}\nStatus: Paid\n\nThank you for being an iClose member.\n`);
    toast.info(`Downloading ${i.no}.`);
  }
  function downloadAll() {
    const csv = ['Invoice,Date,Amount (AED),Status', ...INVOICES.map((i) => `${i.no},${i.date},${i.amount},Paid`)].join('\n');
    downloadFile('iclose-invoices.csv', csv, 'text/csv');
    toast.success('Invoice history exported.');
  }

  if (persona === 'buyer_seller') {
    return (<><PageHeader title="Membership" /><Panel><EmptyState icon={Lock} title="Membership plans are for agents & agencies" body="Buying and selling on iClose is free — there’s nothing to bill here." /></Panel></>);
  }

  return (
    <>
      <PageHeader title={persona === 'agency' ? 'Membership & billing' : 'Membership'} subtitle="Your plan, usage and invoices.">
        <Button variant="outline" size="sm" onClick={downloadAll}><Download className="h-4 w-4" /> Invoices</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={CreditCard} label="Current plan" value="Pro" hint="Renews 1 Jul 2026" tint="bg-accent/10 text-accent" />
        <StatCard icon={CreditCard} label="Monthly" value={fmtAed(499)} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={CreditCard} label="Commission split" value="100%" hint="You keep it all" tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={CreditCard} label="Listings used" value="14 / ∞" tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mb-6">
        {PLANS.map((p) => (
          <div key={p.key} className={`card-surface p-6 relative ${p.current ? 'ring-2 ring-accent' : ''}`}>
            {p.star && <span className="absolute top-4 end-4"><Badge tone="accent">Most popular</Badge></span>}
            <p className="text-[15px] font-semibold text-ink">{p.label}</p>
            <p className="text-[28px] font-semibold text-ink mt-2">{p.price === 0 ? 'Free' : fmtAed(p.price)}<span className="text-[14px] text-graphite font-normal">{p.price === 0 ? '' : '/mo'}</span></p>
            <ul className="space-y-2 mt-4">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-graphite-dark"><Check className="h-4 w-4 text-[#067a55] shrink-0 mt-0.5" /> {f}</li>
              ))}
            </ul>
            <Button variant={p.current ? 'secondary' : 'primary'} size="md" className="w-full mt-5" disabled={p.current}
              onClick={() => !p.current && toast.info(`${p.label} selected — secure checkout opens here soon.`)}>{p.current ? 'Current plan' : 'Choose plan'}</Button>
          </div>
        ))}
      </div>

      <Panel title="Invoices">
        <Table head={<><Th>Invoice</Th><Th>Date</Th><Th>Amount</Th><Th>Status</Th><Th /></>}>
          {INVOICES.map((i) => (
            <tr key={i.id} className="hover:bg-mist/40">
              <Td className="font-medium">{i.no}</Td>
              <Td className="text-graphite-dark">{fmtDate(i.date)}</Td>
              <Td>{fmtAed(i.amount)}</Td>
              <Td><Badge tone="success">Paid</Badge></Td>
              <Td><button onClick={() => downloadInvoice(i)} className="text-[13px] text-accent hover:underline inline-flex items-center gap-1"><Download className="h-3.5 w-3.5" /> PDF</button></Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
