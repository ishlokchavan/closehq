'use client';

import Link from 'next/link';
import { MessagesSquare, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/portal/dashboard/toast';
import { PageHeader, Panel, StatCard, Badge, Table, Th, Td } from '@/components/portal/dashboard/ui';
import { getEnquiries, type EnquiryRow, type Tone } from '@/lib/portal/dashboard/demo';
import { timeAgo } from '@/lib/portal/dashboard/format';

const STATUS: Record<EnquiryRow['status'], { tone: Tone; label: string }> = {
  awaiting: { tone: 'warning', label: 'Awaiting reply' },
  replied: { tone: 'info', label: 'Replied' },
  viewing_booked: { tone: 'success', label: 'Viewing booked' },
  closed: { tone: 'neutral', label: 'Closed' },
};

export default function EnquiriesPage() {
  const toast = useToast();
  const enquiries = getEnquiries();
  const awaiting = enquiries.filter((e) => e.status === 'awaiting').length;
  const booked = enquiries.filter((e) => e.status === 'viewing_booked').length;

  return (
    <>
      <PageHeader title="Enquiries" subtitle="Conversations with agents about properties you’re interested in.">
        <Link href="/properties"><Button variant="outline" size="sm"><Search className="h-4 w-4" /> Find properties</Button></Link>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={MessagesSquare} label="Total enquiries" value={String(enquiries.length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={MessagesSquare} label="Awaiting reply" value={String(awaiting)} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={MessagesSquare} label="Viewings booked" value={String(booked)} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={MessagesSquare} label="Closed" value={String(enquiries.filter((e) => e.status === 'closed').length)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <Panel title={`${enquiries.length} enquiries`}>
        <Table head={<><Th>Property</Th><Th>Agent</Th><Th>Channel</Th><Th>Status</Th><Th>Sent</Th><Th /></>}>
          {enquiries.map((e) => (
            <tr key={e.id} className="hover:bg-mist/40">
              <Td><p className="font-medium text-ink">{e.property}</p><p className="text-[12px] text-graphite">{e.community}</p></Td>
              <Td className="text-graphite-dark">{e.agent}</Td>
              <Td><Badge tone="neutral">{e.channel}</Badge></Td>
              <Td><Badge tone={STATUS[e.status].tone}>{STATUS[e.status].label}</Badge></Td>
              <Td className="text-graphite whitespace-nowrap">{timeAgo(e.sentIso)}</Td>
              <Td><button onClick={() => toast.info(`Opening your conversation with ${e.agent}…`)} className="text-[13px] text-accent hover:underline">Open chat</button></Td>
            </tr>
          ))}
        </Table>
      </Panel>
    </>
  );
}
