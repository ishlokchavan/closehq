'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Heart, Eye, Wallet, Building2, Target, Handshake, BadgeDollarSign, Users,
  TrendingUp, Plus, Search, MessagesSquare, UserPlus, CheckCircle2, Circle,
  ArrowRight, Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/components/portal/auth-provider';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useData } from '@/components/portal/dashboard/data-context';
import { personaMeta } from '@/lib/portal/dashboard/persona';
import {
  StatCard, Panel, Badge, Dot, Avatar, BarChart, TONE,
} from '@/components/portal/dashboard/ui';
import {
  getListings, getSaved, getEnquiries, getAgents,
  getCommission, getActivity, getTasks, getAnalytics, creditsBalance, DEAL_STAGES,
} from '@/lib/portal/dashboard/demo';
import { creditsToAed } from '@/lib/portal/credits';
import { fmtAed, fmtNum, timeAgo, fmtDateTime } from '@/lib/portal/dashboard/format';

export default function DashboardOverview() {
  const { user } = useAuth();
  const { persona } = usePersona();
  const meta = personaMeta(persona);
  const name = ((user?.user_metadata?.full_name as string) || (user?.user_metadata?.name as string) || user?.email?.split('@')[0] || 'there').split(' ')[0];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-[13px] text-graphite">{greeting()}, {name} 👋</p>
          <h1 className="text-[26px] sm:text-[30px] font-semibold text-ink mt-1" style={{ letterSpacing: '-0.02em' }}>
            Your {meta.short} dashboard
          </h1>
          <p className="text-[14px] text-graphite-dark mt-1.5 max-w-2xl">{meta.description}</p>
        </div>
        <Badge tone="accent" className="px-3 py-1.5">{meta.label}</Badge>
      </div>

      {persona === 'buyer_seller' && <BuyerOverview />}
      {persona === 'agent' && <AgentOverview />}
      {persona === 'agency' && <AgencyOverview />}
    </>
  );
}

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

// ===========================================================================
// Buyer / Seller
// ===========================================================================
function BuyerOverview() {
  const { viewings } = useData();
  const saved = getSaved();
  const enquiries = getEnquiries();
  const listings = getListings('buyer_seller');
  const credits = creditsBalance();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Heart} label="Saved properties" value={String(saved.length)} delta={12} tint="bg-journey-buyer/25 text-[#b51e9e]" />
        <StatCard icon={Eye} label="Upcoming viewings" value={String(viewings.filter((v) => v.status === 'scheduled').length)} tint="bg-accent/10 text-accent" />
        <StatCard icon={Wallet} label="Credits & cashback" value={fmtAed(creditsToAed(credits), { compact: true })} hint={`${fmtNum(credits)} credits`} delta={8} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Building2} label="Active listings" value={String(listings.filter((l) => l.status === 'active').length)} tint="bg-journey-agent/30 text-[#b45309]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Saved properties" subtitle="Shortlist with live price changes" action={<Link href="/dashboard/saved" className="text-[13px] text-accent hover:underline">View all</Link>}>
            <div className="grid sm:grid-cols-2 gap-4 -m-1 p-1">
              {saved.slice(0, 4).map((s) => (
                <Link key={s.id} href="/dashboard/saved" className="flex gap-3 rounded-xl border border-hairline/70 p-2.5 hover:shadow-card transition-shadow">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.coverImageUrl ?? ''} alt="" className="h-16 w-20 rounded-lg object-cover bg-mist shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13.5px] font-medium text-ink truncate">{s.title}</p>
                    <p className="text-[12px] text-graphite">{s.community}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[13px] font-semibold text-ink">{fmtAed(s.priceAed, { compact: true })}</span>
                      {s.priceChange !== 0 && (
                        <Badge tone={s.priceChange < 0 ? 'success' : 'warning'}>{s.priceChange < 0 ? '↓' : '↑'} {fmtAed(Math.abs(s.priceChange), { compact: true })}</Badge>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Panel>

          <Panel title="Upcoming viewings" action={<Link href="/dashboard/viewings" className="text-[13px] text-accent hover:underline">Calendar</Link>}>
            <ul className="divide-y divide-hairline/50 -my-2">
              {viewings.filter((v) => v.status === 'scheduled').map((v) => (
                <li key={v.id} className="flex items-center gap-3 py-3">
                  <span className="flex flex-col items-center justify-center h-11 w-11 rounded-xl bg-mist text-ink shrink-0">
                    <Eye className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-medium text-ink truncate">{v.property}</p>
                    <p className="text-[12px] text-graphite">{v.community} · with {v.ownerAgent}</p>
                  </div>
                  <span className="text-[12.5px] text-graphite-dark whitespace-nowrap">{fmtDateTime(v.whenIso)}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <div className="space-y-6">
          <QuickActions persona="buyer_seller" />
          <TaskList persona="buyer_seller" />
          <ActivityFeed persona="buyer_seller" />
        </div>
      </div>

      <Panel title="Recent enquiries" action={<Link href="/dashboard/enquiries" className="text-[13px] text-accent hover:underline">All enquiries</Link>}>
        <ul className="divide-y divide-hairline/50 -my-2">
          {enquiries.map((e) => (
            <li key={e.id} className="flex items-center gap-3 py-3">
              <MessagesSquare className="h-4 w-4 text-graphite shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] text-ink truncate">{e.property} <span className="text-graphite">· {e.community}</span></p>
                <p className="text-[12px] text-graphite">{e.channel} · {e.agent}</p>
              </div>
              <EnquiryBadge status={e.status} />
              <span className="text-[12px] text-graphite whitespace-nowrap hidden sm:block">{timeAgo(e.sentIso)}</span>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}

// ===========================================================================
// Agent
// ===========================================================================
function AgentOverview() {
  const { leads, deals } = useData();
  const listings = getListings('agent');
  const commission = getCommission('agent');
  const analytics = getAnalytics('agent');

  const activeLeads = leads.filter((l) => l.stage !== 'Won' && l.stage !== 'Lost').length;
  const pipelineValue = deals.filter((d) => d.status === 'active').reduce((s, d) => s + d.valueAed, 0);
  const commYtd = commission.reduce((s, c) => s + c.netAed, 0);
  const activeListings = listings.filter((l) => l.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Target} label="Active leads" value={String(activeLeads)} delta={18} tint="bg-accent/10 text-accent" />
        <StatCard icon={Handshake} label="Pipeline value" value={fmtAed(pipelineValue, { compact: true })} hint={`${deals.filter((d) => d.status === 'active').length} live deals`} delta={9} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={BadgeDollarSign} label="Commission (YTD)" value={fmtAed(commYtd, { compact: true })} hint="You keep 100%" delta={23} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Building2} label="Active listings" value={String(activeListings)} tint="bg-journey-buyer/25 text-[#b51e9e]" />
      </div>

      <PipelineSnapshot />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Hot leads" subtitle="Highest-scoring leads needing a touch" action={<Link href="/dashboard/leads" className="text-[13px] text-accent hover:underline">All leads</Link>}>
            <ul className="divide-y divide-hairline/50 -my-2">
              {[...leads].sort((a, b) => b.score - a.score).slice(0, 5).map((l) => (
                <li key={l.id} className="flex items-center gap-3 py-3">
                  <Avatar name={l.name} size={36} />
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-medium text-ink truncate">{l.name}</p>
                    <p className="text-[12px] text-graphite truncate">{l.interest} · {fmtAed(l.budgetAed, { compact: true })}</p>
                  </div>
                  <ScorePill score={l.score} />
                  <span className="text-[12px] text-graphite whitespace-nowrap hidden sm:block">{timeAgo(l.lastTouchIso)}</span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Leads this year" subtitle="New leads per month">
            <BarChart data={analytics.leadsByMonth} tone="accent" />
          </Panel>
        </div>

        <div className="space-y-6">
          <QuickActions persona="agent" />
          <TaskList persona="agent" />
          <ActivityFeed persona="agent" />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Agency
// ===========================================================================
function AgencyOverview() {
  const { deals } = useData();
  const agents = getAgents('agency');
  const listings = getListings('agency');
  const analytics = getAnalytics('agency');

  const activeAgents = agents.filter((a) => a.status === 'active').length;
  const pipelineValue = deals.filter((d) => d.status === 'active').reduce((s, d) => s + d.valueAed, 0);
  const revenueYtd = agents.reduce((s, a) => s + a.ytdRevenueAed, 0);
  const activeListings = listings.filter((l) => l.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Active agents" value={String(activeAgents)} hint={`${agents.length} on the team`} tint="bg-accent/10 text-accent" />
        <StatCard icon={Building2} label="Active listings" value={String(activeListings)} delta={6} tint="bg-journey-buyer/25 text-[#b51e9e]" />
        <StatCard icon={Handshake} label="Pipeline value" value={fmtAed(pipelineValue, { compact: true })} hint={`${deals.filter((d) => d.status === 'active').length} live deals`} delta={14} tint="bg-journey-agent/30 text-[#b45309]" />
        <StatCard icon={TrendingUp} label="Revenue (YTD)" value={fmtAed(revenueYtd, { compact: true })} delta={21} tint="bg-journey-seller/30 text-[#067a55]" />
      </div>

      <PipelineSnapshot />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Panel title="Team performance" subtitle="Agents by YTD revenue" action={<Link href="/dashboard/agents" className="text-[13px] text-accent hover:underline">Manage team</Link>}>
            <ul className="divide-y divide-hairline/50 -my-2">
              {[...agents].filter((a) => a.status === 'active').sort((a, b) => b.ytdRevenueAed - a.ytdRevenueAed).map((a) => {
                const top = agents.reduce((m, x) => Math.max(m, x.ytdRevenueAed), 1);
                return (
                  <li key={a.id} className="flex items-center gap-3 py-3">
                    <Avatar name={a.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-[13.5px] font-medium text-ink truncate">{a.name}</p>
                        <span className="text-[13px] font-semibold text-ink">{fmtAed(a.ytdRevenueAed, { compact: true })}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="block h-1.5 flex-1 rounded-full bg-mist overflow-hidden">
                          <span className="block h-full rounded-full bg-accent" style={{ width: `${(a.ytdRevenueAed / top) * 100}%` }} />
                        </span>
                        <span className="text-[11px] text-graphite whitespace-nowrap">{a.listings} listings · {a.activeDeals} deals</span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Leads generated" subtitle="Across the team, per month">
            <BarChart data={analytics.leadsByMonth} tone="accent" />
          </Panel>
        </div>

        <div className="space-y-6">
          <QuickActions persona="agency" />
          <TaskList persona="agency" />
          <ActivityFeed persona="agency" />
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Shared overview widgets
// ===========================================================================
function PipelineSnapshot() {
  const { deals } = useData();
  const byStage = DEAL_STAGES.map((stage) => ({
    stage,
    deals: deals.filter((d) => d.stage === stage),
  }));
  return (
    <Panel title="Deal pipeline" subtitle="Live deals by stage" action={<Link href="/dashboard/deals" className="text-[13px] text-accent hover:underline">Open board</Link>}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {byStage.map((s, i) => {
          const value = s.deals.reduce((sum, d) => sum + d.valueAed, 0);
          return (
            <div key={s.stage} className="rounded-xl border border-hairline/70 p-3">
              <div className="flex items-center gap-1.5">
                <Dot tone={i === DEAL_STAGES.length - 1 ? 'success' : 'accent'} />
                <span className="text-[11.5px] text-graphite truncate">{s.stage}</span>
              </div>
              <p className="text-[20px] font-semibold text-ink mt-1.5">{s.deals.length}</p>
              <p className="text-[11.5px] text-graphite">{value ? fmtAed(value, { compact: true }) : '—'}</p>
            </div>
          );
        })}
      </div>
    </Panel>
  );
}

function QuickActions({ persona }: { persona: 'buyer_seller' | 'agent' | 'agency' }) {
  const actions = {
    buyer_seller: [
      { href: '/properties', icon: Search, title: 'Search properties', body: 'Find your next home' },
      { href: '/sell/list/new', icon: Plus, title: 'List a property', body: 'Sell commission-free' },
      { href: '/dashboard/credits', icon: Wallet, title: 'Redeem cashback', body: 'Use your credits' },
    ],
    agent: [
      { href: '/sell/list/new', icon: Plus, title: 'Add a listing', body: 'Publish in minutes' },
      { href: '/dashboard/leads', icon: UserPlus, title: 'Add a lead', body: 'Log a new enquiry' },
      { href: '/dashboard/deals', icon: Handshake, title: 'Open pipeline', body: 'Move deals forward' },
    ],
    agency: [
      { href: '/dashboard/agents', icon: UserPlus, title: 'Invite an agent', body: 'Grow your team' },
      { href: '/sell/list/new', icon: Plus, title: 'Add a listing', body: 'Publish inventory' },
      { href: '/dashboard/leads', icon: Target, title: 'Route leads', body: 'Assign to agents' },
    ],
  }[persona];
  return (
    <Panel title="Quick actions">
      <div className="space-y-2.5 -m-1 p-1">
        {actions.map((a) => (
          <Link key={a.title} href={a.href} className="flex items-center gap-3 rounded-xl border border-hairline/70 p-3 hover:border-ink/30 hover:shadow-card transition-all">
            <span className="flex items-center justify-center h-9 w-9 rounded-full bg-accent/10 text-accent shrink-0"><a.icon className="h-[18px] w-[18px]" /></span>
            <span className="flex-1 min-w-0">
              <span className="block text-[13.5px] font-medium text-ink">{a.title}</span>
              <span className="block text-[12px] text-graphite">{a.body}</span>
            </span>
            <ArrowRight className="h-4 w-4 text-graphite" />
          </Link>
        ))}
      </div>
    </Panel>
  );
}

function TaskList({ persona }: { persona: 'buyer_seller' | 'agent' | 'agency' }) {
  const [tasks, setTasks] = useState(getTasks(persona));
  const toggle = (id: string) => setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  const open = tasks.filter((t) => !t.done).length;
  return (
    <Panel title="Tasks" subtitle={`${open} to do`}>
      <ul className="space-y-1 -m-1 p-1">
        {tasks.map((t) => (
          <li key={t.id}>
            <button onClick={() => toggle(t.id)} className="w-full flex items-start gap-2.5 rounded-lg px-2 py-2 hover:bg-mist text-start transition-colors">
              {t.done ? <CheckCircle2 className="h-[18px] w-[18px] text-[#059669] shrink-0 mt-0.5" /> : <Circle className="h-[18px] w-[18px] text-graphite shrink-0 mt-0.5" />}
              <span className="flex-1 min-w-0">
                <span className={cn('block text-[13.5px]', t.done ? 'text-graphite line-through' : 'text-ink')}>{t.label}</span>
                <span className="text-[12px] text-graphite">{t.due}</span>
              </span>
              {!t.done && t.priority === 'high' && <Badge tone="danger">High</Badge>}
            </button>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ActivityFeed({ persona }: { persona: 'buyer_seller' | 'agent' | 'agency' }) {
  const items = getActivity(persona);
  return (
    <Panel title="Activity">
      <ul className="space-y-3.5 -m-1 p-1">
        {items.map((a) => (
          <li key={a.id} className="flex gap-3">
            <span className={cn('mt-1 h-2 w-2 rounded-full shrink-0', TONE[a.tone].dot)} />
            <div className="min-w-0">
              <p className="text-[13px] text-ink leading-snug">{a.text}</p>
              <p className="text-[11.5px] text-graphite mt-0.5">{timeAgo(a.whenIso)}</p>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ScorePill({ score }: { score: number }) {
  const tone = score >= 85 ? 'success' : score >= 70 ? 'warning' : 'neutral';
  return <Badge tone={tone}><Sparkles className="h-3 w-3" /> {score}</Badge>;
}

function EnquiryBadge({ status }: { status: string }) {
  const map: Record<string, { tone: 'neutral' | 'info' | 'success' | 'warning'; label: string }> = {
    awaiting: { tone: 'warning', label: 'Awaiting reply' },
    replied: { tone: 'info', label: 'Replied' },
    viewing_booked: { tone: 'success', label: 'Viewing booked' },
    closed: { tone: 'neutral', label: 'Closed' },
  };
  const s = map[status] ?? map.closed;
  return <Badge tone={s.tone}>{s.label}</Badge>;
}
