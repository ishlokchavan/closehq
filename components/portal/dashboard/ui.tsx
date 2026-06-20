import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { initials } from '@/lib/portal/dashboard/format';
import type { Tone } from '@/lib/portal/dashboard/demo';

// ---------------------------------------------------------------------------
// Tone system — one source of truth for status colours across the dashboard.
// ---------------------------------------------------------------------------
export const TONE: Record<Tone, { badge: string; dot: string; text: string; bar: string }> = {
  neutral: { badge: 'bg-mist text-graphite-dark', dot: 'bg-graphite', text: 'text-graphite-dark', bar: 'bg-graphite' },
  info: { badge: 'bg-[#a3bcff]/20 text-[#2b50c8]', dot: 'bg-[#3b66e0]', text: 'text-[#2b50c8]', bar: 'bg-[#3b66e0]' },
  success: { badge: 'bg-[#9effe0]/30 text-[#067a55]', dot: 'bg-[#059669]', text: 'text-[#067a55]', bar: 'bg-[#059669]' },
  warning: { badge: 'bg-[#ffcc9c]/30 text-[#b45309]', dot: 'bg-[#ea7317]', text: 'text-[#b45309]', bar: 'bg-[#ea7317]' },
  danger: { badge: 'bg-[#ff4d4f]/12 text-[#c81e3f]', dot: 'bg-[#e11d48]', text: 'text-[#c81e3f]', bar: 'bg-[#e11d48]' },
  accent: { badge: 'bg-accent/10 text-accent', dot: 'bg-accent', text: 'text-accent', bar: 'bg-accent' },
};

export function Badge({ tone = 'neutral', children, className }: { tone?: Tone; children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-medium whitespace-nowrap', TONE[tone].badge, className)}>
      {children}
    </span>
  );
}

export function Dot({ tone = 'neutral' }: { tone?: Tone }) {
  return <span className={cn('inline-block h-1.5 w-1.5 rounded-full', TONE[tone].dot)} />;
}

// ---------------------------------------------------------------------------
// Page header
// ---------------------------------------------------------------------------
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div>
        <h1 className="text-[26px] sm:text-[30px] font-semibold text-ink" style={{ letterSpacing: '-0.02em' }}>{title}</h1>
        {subtitle && <p className="text-[14px] text-graphite-dark mt-1.5 max-w-2xl">{subtitle}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Stat card
// ---------------------------------------------------------------------------
export function StatCard({ icon: Icon, label, value, delta, hint, tint = 'bg-accent/10 text-accent' }: {
  icon: LucideIcon; label: string; value: string; delta?: number; hint?: string; tint?: string;
}) {
  return (
    <div className="card-surface p-5">
      <div className="flex items-center justify-between">
        <span className={cn('flex items-center justify-center h-9 w-9 rounded-full', tint)}>
          <Icon className="h-[18px] w-[18px]" />
        </span>
        {typeof delta === 'number' && (
          <span className={cn('inline-flex items-center gap-0.5 text-[12px] font-medium', delta >= 0 ? 'text-[#067a55]' : 'text-[#c81e3f]')}>
            {delta >= 0 ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="text-[28px] font-semibold text-ink mt-3" style={{ letterSpacing: '-0.02em' }}>{value}</p>
      <p className="text-[13px] text-graphite-dark mt-0.5">{label}</p>
      {hint && <p className="text-[12px] text-graphite mt-1.5">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Panel (card with header)
// ---------------------------------------------------------------------------
export function Panel({ title, subtitle, action, children, className, bodyClassName }: {
  title?: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; className?: string; bodyClassName?: string;
}) {
  return (
    <section className={cn('card-surface overflow-hidden', className)}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 px-5 py-4 border-b border-hairline/60">
          <div>
            {title && <h2 className="text-[15px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>{title}</h2>}
            {subtitle && <p className="text-[12.5px] text-graphite mt-0.5">{subtitle}</p>}
          </div>
          {action}
        </header>
      )}
      <div className={cn('p-5', bodyClassName)}>{children}</div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Table primitives
// ---------------------------------------------------------------------------
export function Table({ head, children }: { head: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[13.5px] border-collapse">
        <thead>
          <tr className="text-start text-[12px] uppercase tracking-[0.06em] text-graphite border-b border-hairline/60">{head}</tr>
        </thead>
        <tbody className="divide-y divide-hairline/50">{children}</tbody>
      </table>
    </div>
  );
}
export function Th({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <th className={cn('font-medium text-start py-2.5 pe-4 whitespace-nowrap', className)}>{children}</th>;
}
export function Td({ children, className }: { children?: React.ReactNode; className?: string }) {
  return <td className={cn('py-3 pe-4 align-middle text-ink', className)}>{children}</td>;
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------
export function Avatar({ name, src, size = 36 }: { name: string; src?: string | null; size?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-mist text-graphite-dark font-medium overflow-hidden shrink-0"
      style={{ height: size, width: size, fontSize: size * 0.36 }}
    >
      {src
        // eslint-disable-next-line @next/next/no-img-element
        ? <img src={src} alt="" className="h-full w-full object-cover" />
        : initials(name)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Progress + funnel + bar chart
// ---------------------------------------------------------------------------
export function Progress({ value, max = 100, tone = 'accent' }: { value: number; max?: number; tone?: Tone }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <span className="block h-1.5 w-full rounded-full bg-mist overflow-hidden">
      <span className={cn('block h-full rounded-full', TONE[tone].bar)} style={{ width: `${pct}%` }} />
    </span>
  );
}

export function BarChart({ data, tone = 'accent', height = 140 }: { data: { label: string; value: number }[]; tone?: Tone; height?: number }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex-1 flex flex-col items-center gap-1.5 justify-end h-full">
          <span className="text-[11px] text-graphite-dark font-medium">{d.value}</span>
          <span className={cn('w-full rounded-t-md transition-all', TONE[tone].bar)} style={{ height: `${(d.value / max) * (height - 34)}px` }} />
          <span className="text-[11px] text-graphite">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Funnel({ data }: { data: { label: string; value: number }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="space-y-2.5">
      {data.map((d) => (
        <div key={d.label}>
          <div className="flex items-center justify-between text-[12.5px] mb-1">
            <span className="text-ink">{d.label}</span>
            <span className="text-graphite">{d.value}%</span>
          </div>
          <span className="block h-2 w-full rounded-full bg-mist overflow-hidden">
            <span className="block h-full rounded-full bg-accent" style={{ width: `${(d.value / max) * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------
export function EmptyState({ icon: Icon, title, body, action }: { icon: LucideIcon; title: string; body?: string; action?: React.ReactNode }) {
  return (
    <div className="text-center py-14 px-6">
      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-mist mb-4">
        <Icon className="h-5 w-5 text-graphite" />
      </span>
      <h3 className="text-[15px] font-semibold text-ink">{title}</h3>
      {body && <p className="text-[13px] text-graphite-dark mt-1.5 max-w-sm mx-auto">{body}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick action tile
// ---------------------------------------------------------------------------
export function ActionTile({ href, icon: Icon, title, body }: { href: string; icon: LucideIcon; title: string; body: string }) {
  return (
    <Link href={href} className="card-surface p-5 group hover:shadow-card-hover transition-shadow flex items-start gap-3.5">
      <span className="flex items-center justify-center h-10 w-10 rounded-full bg-accent/10 text-accent shrink-0">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <span>
        <span className="block text-[14.5px] font-semibold text-ink">{title}</span>
        <span className="block text-[13px] text-graphite-dark mt-0.5">{body}</span>
      </span>
    </Link>
  );
}
