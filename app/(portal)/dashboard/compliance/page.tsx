'use client';

import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, Lock } from 'lucide-react';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td, Avatar, EmptyState } from '@/components/portal/dashboard/ui';
import { getAgents } from '@/lib/portal/dashboard/demo';
import { fmtDate } from '@/lib/portal/dashboard/format';

const ORG = [
  { id: 'o1', name: 'Trade Licence (DED)', ref: 'CN-1043829', status: 'valid', expiry: '2027-03-14' },
  { id: 'o2', name: 'RERA Brokerage Registration', ref: 'ORN-28104', status: 'valid', expiry: '2026-11-02' },
  { id: 'o3', name: 'Establishment Card', ref: 'EC-99214', status: 'expiring', expiry: '2026-07-30' },
  { id: 'o4', name: 'VAT Registration (FTA)', ref: 'TRN-100xxxxx', status: 'valid', expiry: '—' },
];

export default function CompliancePage() {
  const { persona } = usePersona();

  if (persona !== 'agency') {
    return (<><PageHeader title="Compliance" /><Panel><EmptyState icon={Lock} title="Compliance centre is for agencies" body="Trade licence, RERA registration and agent verification are managed here at the brokerage level." /></Panel></>);
  }

  const agents = getAgents(persona);
  const verified = agents.filter((a) => a.rera !== 'pending' && a.status === 'active').length;

  return (
    <>
      <PageHeader title="Compliance" subtitle="Keep your brokerage and agents RERA-compliant — never miss a renewal." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={ShieldCheck} label="Org documents" value={`${ORG.filter((o) => o.status === 'valid').length}/${ORG.length}`} hint="Valid" tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={CheckCircle2} label="Verified agents" value={`${verified}/${agents.length}`} tint="bg-accent/10 text-accent" />
        <StatCard icon={Clock} label="Expiring soon" value={String(ORG.filter((o) => o.status === 'expiring').length)} hint="Within 60 days" tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={AlertTriangle} label="Action needed" value={String(agents.filter((a) => a.rera === 'pending').length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Panel title="Brokerage documents">
          <Table head={<><Th>Document</Th><Th>Reference</Th><Th>Status</Th><Th>Expiry</Th></>}>
            {ORG.map((o) => (
              <tr key={o.id} className="hover:bg-mist/40">
                <Td className="font-medium">{o.name}</Td>
                <Td className="text-graphite-dark">{o.ref}</Td>
                <Td><Badge tone={o.status === 'valid' ? 'success' : 'warning'}>{o.status === 'valid' ? 'Valid' : 'Expiring'}</Badge></Td>
                <Td className="text-graphite whitespace-nowrap">{o.expiry === '—' ? '—' : fmtDate(o.expiry)}</Td>
              </tr>
            ))}
          </Table>
        </Panel>

        <Panel title="Agent RERA status">
          <ul className="divide-y divide-hairline/50 -my-2">
            {agents.map((a) => (
              <li key={a.id} className="flex items-center gap-3 py-3">
                <Avatar name={a.name} size={34} />
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-medium text-ink truncate">{a.name}</p>
                  <p className="text-[12px] text-graphite">{a.rera === 'pending' ? 'BRN not submitted' : a.rera}</p>
                </div>
                <Badge tone={a.rera === 'pending' ? 'danger' : 'success'}>{a.rera === 'pending' ? 'Action needed' : 'Verified'}</Badge>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
