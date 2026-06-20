'use client';

import { useRef } from 'react';
import { FileText, Upload, CheckCircle2, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/components/portal/dashboard/data-context';
import { useToast, downloadFile } from '@/components/portal/dashboard/toast';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td } from '@/components/portal/dashboard/ui';
import { type DocumentRow } from '@/lib/portal/dashboard/demo';
import { fmtDate } from '@/lib/portal/dashboard/format';

const STATUS = {
  verified: { tone: 'success' as const, label: 'Verified', icon: CheckCircle2 },
  pending: { tone: 'warning' as const, label: 'Pending', icon: Clock },
  expired: { tone: 'danger' as const, label: 'Expired', icon: AlertTriangle },
  missing: { tone: 'danger' as const, label: 'Missing', icon: XCircle },
};

export default function DocumentsPage() {
  const { documents: docs } = useData();
  const toast = useToast();
  const fileInput = useRef<HTMLInputElement>(null);
  const verified = docs.filter((d) => d.status === 'verified').length;
  const action = docs.filter((d) => d.status === 'missing' || d.status === 'expired').length;

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) toast.success(`“${f.name}” uploaded — pending verification.`);
    e.target.value = '';
  }
  function viewDoc(d: DocumentRow) {
    downloadFile(`${d.name.replace(/[^\w.-]+/g, '_')}.txt`,
      `iClose document\n\n${d.name}\nType: ${d.kind}\nRelated to: ${d.related}\nStatus: ${d.status}\nUpdated: ${fmtDate(d.updatedIso)}\n`);
    toast.info(`Downloading “${d.name}”.`);
  }

  return (
    <>
      <input ref={fileInput} type="file" className="hidden" onChange={onPick} />
      <PageHeader title="Documents" subtitle="Your verified IDs, RERA forms and contracts — securely stored.">
        <Button variant="primary" size="sm" onClick={() => fileInput.current?.click()}><Upload className="h-4 w-4" /> Upload</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={FileText} label="Documents" value={String(docs.length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={CheckCircle2} label="Verified" value={String(verified)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Clock} label="Pending" value={String(docs.filter((d) => d.status === 'pending').length)} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={AlertTriangle} label="Need action" value={String(action)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      {action > 0 && (
        <div className="rounded-2xl border border-[#e11d48]/30 bg-[#e11d48]/[0.06] px-5 py-4 mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-[#c81e3f] shrink-0" />
          <p className="text-[13.5px] text-ink">{action} document{action > 1 ? 's' : ''} need your attention to keep deals moving.</p>
        </div>
      )}

      <Panel title="All documents">
        <Table head={<><Th>Document</Th><Th>Type</Th><Th>Related to</Th><Th>Status</Th><Th>Updated</Th><Th /></>}>
          {docs.map((d: DocumentRow) => {
            const s = STATUS[d.status];
            return (
              <tr key={d.id} className="hover:bg-mist/40">
                <Td><div className="flex items-center gap-2.5"><FileText className="h-4 w-4 text-graphite" /><span className="font-medium text-ink">{d.name}</span></div></Td>
                <Td><Badge tone="neutral">{d.kind}</Badge></Td>
                <Td className="text-graphite-dark">{d.related}</Td>
                <Td><Badge tone={s.tone}><s.icon className="h-3 w-3" /> {s.label}</Badge></Td>
                <Td className="text-graphite whitespace-nowrap">{fmtDate(d.updatedIso)}</Td>
                <Td><button onClick={() => (d.status === 'missing' || d.status === 'expired') ? fileInput.current?.click() : viewDoc(d)} className="text-[13px] text-accent hover:underline">{d.status === 'missing' || d.status === 'expired' ? 'Upload' : 'View'}</button></Td>
              </tr>
            );
          })}
        </Table>
      </Panel>
    </>
  );
}
