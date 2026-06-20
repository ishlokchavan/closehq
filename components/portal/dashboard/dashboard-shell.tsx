'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu, X, Bell, ChevronDown, Check, LogOut, Loader2, Search, ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { useAuth } from '@/components/portal/auth-provider';
import { usePersona } from '@/components/portal/dashboard/persona-context';
import { useToast } from '@/components/portal/dashboard/toast';
import { Avatar } from '@/components/portal/dashboard/ui';
import { initials } from '@/lib/portal/dashboard/format';
import { NAV, PERSONAS, personaMeta, type Persona } from '@/lib/portal/dashboard/persona';
import {
  getSaved, getViewings, getEnquiries, getListings, getDeals, getLeads, getClients, getAgents,
} from '@/lib/portal/dashboard/demo';

/** Literal tint classes (Tailwind JIT can't see interpolated class names). */
const TINT_BG: Record<Persona, string> = {
  buyer_seller: 'bg-journey-buyer/30',
  agent: 'bg-journey-agent/30',
  agency: 'bg-journey-seller/30',
};

/** Live-ish badge counts shown next to nav items. */
function badgeCounts(persona: Persona): Record<string, number> {
  return {
    saved: getSaved().length,
    viewings: getViewings(persona).filter((v) => v.status === 'scheduled').length,
    enquiries: getEnquiries().filter((e) => e.status === 'awaiting').length,
    listings: getListings(persona).filter((l) => l.status === 'active').length,
    deals: getDeals(persona).filter((d) => d.status === 'active').length,
    leads: getLeads(persona).filter((l) => l.stage === 'New' || l.stage === 'Contacted').length,
    clients: getClients(persona).filter((c) => c.status === 'Active').length,
    agents: getAgents(persona).filter((a) => a.status === 'active').length,
  };
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const { persona, ready } = usePersona();
  const pathname = usePathname();
  const router = useRouter();
  const toast = useToast();
  const [mobileNav, setMobileNav] = useState(false);
  const [search, setSearch] = useState('');

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = search.trim();
    router.push(q ? `/properties?q=${encodeURIComponent(q)}` : '/properties');
  }

  if (loading || !ready) {
    return (
      <div className="container-wide py-32 flex justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-graphite" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container-wide py-28 text-center">
        <h1 className="display-sm">Sign in to open your dashboard</h1>
        <p className="subhead mt-3">Manage your properties, deals, leads and payouts in one place.</p>
        <Link href="/login" className="inline-block mt-6"><Button variant="primary" size="lg">Sign in</Button></Link>
      </div>
    );
  }

  const meta = user.user_metadata ?? {};
  const name = (meta.full_name as string) || (meta.name as string) || user.email?.split('@')[0] || 'there';
  const groups = NAV[persona];
  const counts = badgeCounts(persona);

  const SidebarContent = (
    <nav className="flex flex-col gap-6 px-3 py-5">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="px-3 mb-1.5 text-[11px] uppercase tracking-[0.08em] text-graphite/80">{group.title}</p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = pathname === item.href;
              const count = item.badge ? counts[item.badge] : undefined;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileNav(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-xl px-3 py-2 text-[14px] transition-colors',
                      active ? 'bg-ink text-white font-medium' : 'text-ink/80 hover:bg-mist',
                    )}
                  >
                    <item.icon className={cn('h-[18px] w-[18px] shrink-0', active ? 'text-white' : 'text-graphite')} />
                    <span className="flex-1">{item.label}</span>
                    {!!count && (
                      <span className={cn('inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-[11px] font-medium',
                        active ? 'bg-white/20 text-white' : 'bg-mist text-graphite-dark')}>
                        {count}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="bg-fog min-h-[calc(100vh-3.5rem)]">
      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex flex-col w-64 shrink-0 border-e border-hairline/60 bg-paper sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          {SidebarContent}
          <div className="mt-auto p-3">
            <PersonaSwitcher />
          </div>
        </aside>

        {/* Mobile drawer */}
        {mobileNav && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink/30" onClick={() => setMobileNav(false)} />
            <div className="absolute inset-y-0 start-0 w-72 bg-paper shadow-elevated flex flex-col overflow-y-auto">
              <div className="flex items-center justify-between px-4 py-3 border-b border-hairline/60">
                <Logo variant="dark" />
                <button onClick={() => setMobileNav(false)} aria-label="Close menu" className="h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-mist">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {SidebarContent}
              <div className="mt-auto p-3"><PersonaSwitcher /></div>
            </div>
          </div>
        )}

        {/* Main column */}
        <div className="flex-1 min-w-0">
          {/* Top bar */}
          <div className="sticky top-14 z-30 bg-paper/85 backdrop-blur-xl border-b border-hairline/60">
            <div className="flex items-center gap-3 px-4 sm:px-6 h-14">
              <button onClick={() => setMobileNav(true)} aria-label="Open menu" className="lg:hidden h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-mist">
                <Menu className="h-5 w-5" />
              </button>
              <form onSubmit={submitSearch} className="hidden sm:flex items-center gap-2 h-9 px-3 rounded-full bg-mist text-graphite text-[13px] flex-1 max-w-xs">
                <button type="submit" aria-label="Search"><Search className="h-4 w-4" /></button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search properties, clients, deals…" className="bg-transparent flex-1 outline-none placeholder:text-graphite" />
              </form>
              <div className="flex-1 sm:hidden" />
              <Link href="/" className="hidden sm:inline-flex items-center gap-1 text-[13px] text-graphite-dark hover:text-ink">
                View site <ExternalLink className="h-3.5 w-3.5" />
              </Link>
              <button onClick={() => toast.info('You’re all caught up — no new notifications.')} aria-label="Notifications" className="relative h-9 w-9 inline-flex items-center justify-center rounded-full hover:bg-mist">
                <Bell className="h-[18px] w-[18px] text-ink" />
                <span className="absolute top-2 end-2 h-2 w-2 rounded-full bg-[#e11d48] ring-2 ring-paper" />
              </button>
              <UserMenu name={name} email={user.email ?? ''} avatar={(meta.avatar_url as string) || (meta.picture as string) || null} onSignOut={signOut} />
            </div>
          </div>

          {/* Page body */}
          <main className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1400px] mx-auto">{children}</main>
        </div>
      </div>
    </div>
  );
}

/** Persona switcher — the key control for previewing/recording each dashboard. */
function PersonaSwitcher() {
  const { persona, setPersona } = usePersona();
  const [open, setOpen] = useState(false);
  const m = personaMeta(persona);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full flex items-center gap-2.5 rounded-xl border border-hairline px-3 py-2.5 hover:border-ink/30 transition-colors text-start"
      >
        <span className={cn('h-8 w-8 rounded-lg inline-flex items-center justify-center text-[12px] font-semibold text-ink', TINT_BG[persona])}>
          {initials(m.short)}
        </span>
        <span className="flex-1 min-w-0">
          <span className="block text-[11px] text-graphite leading-none">Viewing as</span>
          <span className="block text-[13.5px] font-medium text-ink truncate mt-0.5">{m.label}</span>
        </span>
        <ChevronDown className={cn('h-4 w-4 text-graphite transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full mb-2 inset-x-0 z-20 card-surface shadow-elevated p-1.5">
            <p className="px-2.5 py-1.5 text-[11px] uppercase tracking-[0.06em] text-graphite">Switch dashboard</p>
            {PERSONAS.map((p) => (
              <button
                key={p.key}
                onClick={() => { setPersona(p.key); setOpen(false); }}
                className="w-full flex items-start gap-2.5 rounded-lg px-2.5 py-2 hover:bg-mist text-start transition-colors"
              >
                <span className={cn('h-7 w-7 rounded-lg inline-flex items-center justify-center text-[11px] font-semibold text-ink shrink-0', TINT_BG[p.key])}>
                  {initials(p.short)}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-[13.5px] font-medium text-ink">{p.label}</span>
                  <span className="block text-[12px] text-graphite mt-0.5 leading-snug">{p.description}</span>
                </span>
                {persona === p.key && <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function UserMenu({ name, email, avatar, onSignOut }: { name: string; email: string; avatar: string | null; onSignOut: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button onClick={() => setOpen((s) => !s)} className="flex items-center gap-2 rounded-full hover:bg-mist ps-1 pe-2 py-1 transition-colors">
        <Avatar name={name} src={avatar} size={30} />
        <ChevronDown className="h-3.5 w-3.5 text-graphite" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute end-0 top-full mt-2 z-20 w-56 card-surface shadow-elevated p-1.5">
            <div className="px-3 py-2 border-b border-hairline/60 mb-1">
              <p className="text-[13px] font-medium text-ink truncate">{name}</p>
              <p className="text-[12px] text-graphite truncate">{email}</p>
            </div>
            <Link href="/dashboard/settings" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-[14px] text-ink hover:bg-mist">Settings</Link>
            <Link href="/" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-[14px] text-ink hover:bg-mist">Back to site</Link>
            <button onClick={() => { onSignOut(); setOpen(false); }} className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-[14px] text-ink hover:bg-mist text-start">
              <LogOut className="h-4 w-4 text-graphite" /> Sign out
            </button>
          </div>
        </>
      )}
    </div>
  );
}
