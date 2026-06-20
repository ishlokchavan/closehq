'use client';

import { useState } from 'react';
import { Users, UserPlus, Search, Star, Building2, Handshake, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useToast } from '@/components/portal/dashboard/toast';
import { RowMenu } from '@/components/portal/dashboard/row-menu';
import { PageHeader, Panel, StatCard, Badge, Avatar, EmptyState } from '@/components/portal/dashboard/ui';
import { getAgents } from '@/lib/portal/dashboard/demo';
import { fmtAed } from '@/lib/portal/dashboard/format';

export default function AgentsPage() {
  const { persona } = usePersona();
  const toast = useToast();
  const agents = getAgents(persona);
  const [q, setQ] = useState('');

  function inviteAgent() {
    if (typeof window === 'undefined') return;
    const email = window.prompt('Invite an agent by email:');
    if (email && /.+@.+\..+/.test(email)) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent('Join our team on iClose')}&body=${encodeURIComponent('Hi,\n\nI’d like to invite you to join our brokerage on iClose. Sign up at https://iclose.ae/signup and I’ll add you to the team.\n\nThanks')}`;
      toast.success(`Invitation drafted for ${email}.`);
    } else if (email) {
      toast.error('That doesn’t look like a valid email.');
    }
  }
  function copyEmail(email: string) {
    navigator.clipboard?.writeText(email).then(() => toast.success('Email copied.'), () => toast.error('Could not copy.'));
  }

  if (persona !== 'agency') {
    return (<><PageHeader title="Agents" /><Panel><EmptyState icon={Lock} title="Team management is for agencies" body="Switch to the Agency dashboard to invite agents, route leads and track team performance." /></Panel></>);
  }

  const rows = agents.filter((a) => `${a.name} ${a.email} ${a.areas.join(' ')}`.toLowerCase().includes(q.toLowerCase()));
  const activeAgents = agents.filter((a) => a.status === 'active');
  const revenue = agents.reduce((s, a) => s + a.ytdRevenueAed, 0);
  const listings = agents.reduce((s, a) => s + a.listings, 0);

  return (
    <>
      <PageHeader title="Agents" subtitle="Invite agents, manage permissions and track performance across your brokerage.">
        <Button variant="primary" size="sm" onClick={inviteAgent}><UserPlus className="h-4 w-4" /> Invite agent</Button>
      </PageHeader>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon={Users} label="Active agents" value={String(activeAgents.length)} hint={`${agents.length} total`} tint="bg-accent/10 text-accent" />
        <StatCard icon={Building2} label="Team listings" value={String(listings)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
        <StatCard icon={Handshake} label="Active deals" value={String(agents.reduce((s, a) => s + a.activeDeals, 0))} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={Star} label="Revenue (YTD)" value={fmtAed(revenue, { compact: true })} tint="bg-journey-seller/30 text-[#067a55]" />
      </div>

      <Panel
        title={`${rows.length} agents`}
        action={(
          <div className="flex items-center gap-2 h-9 px-3 rounded-full bg-mist text-graphite text-[13px]">
            <Search className="h-4 w-4" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search agents…" className="bg-transparent outline-none placeholder:text-graphite w-32 sm:w-44" />
          </div>
        )}
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {rows.map((a) => (
            <div key={a.id} className="rounded-2xl border border-hairline/70 p-4 hover:shadow-card transition-shadow">
              <div className="flex items-start gap-3">
                <Avatar name={a.name} size={44} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-[14.5px] font-semibold text-ink truncate">{a.name}</p>
                    <RowMenu items={[
                      { label: 'Email agent', onClick: () => { window.location.href = `mailto:${a.email}`; } },
                      { label: 'Copy email', onClick: () => copyEmail(a.email) },
                      { label: 'Reassign leads', onClick: () => toast.info(`Lead reassignment for ${a.name} is coming soon.`) },
                      { label: a.status === 'active' ? 'Suspend agent' : 'Reactivate agent', onClick: () => toast.info(`${a.name} ${a.status === 'active' ? 'suspended' : 'reactivated'} (demo).`), danger: a.status === 'active' },
                    ]} />
                  </div>
                  <p className="text-[12px] text-graphite truncate">{a.email}</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Badge tone={a.role === 'Team Lead' ? 'accent' : 'neutral'}>{a.role}</Badge>
                    <Badge tone={a.status === 'active' ? 'success' : a.status === 'invited' ? 'warning' : 'danger'}>{a.status === 'invited' ? 'Invited' : a.status === 'active' ? 'Active' : 'Suspended'}</Badge>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <Stat label="Listings" value={String(a.listings)} />
                <Stat label="Deals" value={String(a.activeDeals)} />
                <Stat label="YTD" value={fmtAed(a.ytdRevenueAed, { compact: true })} />
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-hairline/60 text-[12px] text-graphite">
                <span className="truncate">{a.rera === 'pending' ? 'RERA pending' : a.rera}</span>
                {a.rating > 0 && <span className="inline-flex items-center gap-1 text-ink"><Star className="h-3.5 w-3.5 fill-[#f5b301] text-[#f5b301]" /> {a.rating.toFixed(1)}</span>}
              </div>
              {a.areas.length > 0 && <p className="text-[11.5px] text-graphite mt-2 truncate">{a.areas.join(' · ')}</p>}
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-mist py-2">
      <p className="text-[14px] font-semibold text-ink">{value}</p>
      <p className="text-[11px] text-graphite">{label}</p>
    </div>
  );
}
