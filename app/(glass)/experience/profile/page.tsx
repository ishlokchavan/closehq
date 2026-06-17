'use client';

import Link from 'next/link';
import {
  Heart,
  X,
  Sparkles,
  Wallet,
  FileText,
  Settings,
  ChevronRight,
  RotateCcw,
  Coins,
} from 'lucide-react';
import { useSaved } from '@/components/glass/saved-store';
import { EXPERIENCE_LISTINGS, formatCredits } from '@/lib/glass/experience-data';

export default function ProfilePage() {
  const { decisions, savedRefs, reset } = useSaved();
  const passedCount = Object.values(decisions).filter((d) => d === 'passed').length;
  const seen = Object.keys(decisions).length;

  const pendingCredits = EXPERIENCE_LISTINGS.filter(
    (l) => decisions[l.reference] === 'saved',
  ).reduce((sum, l) => sum + l.credit.credits, 0);

  return (
    <div className="no-scrollbar h-[100svh] overflow-y-scroll bg-mist px-4 pb-40 pt-[max(20px,env(safe-area-inset-top))]">
      {/* Identity */}
      <header className="mb-5 mt-2 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-[22px] font-semibold text-white">
          G
        </span>
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-ink">Guest</h1>
          <p className="text-[14px] text-graphite">Sign in to sync your shortlist</p>
        </div>
      </header>

      {/* Credits balance */}
      <section className="mb-4 rounded-[22px] bg-ink p-5 text-white">
        <div className="flex items-center gap-2 text-white/70">
          <Coins className="h-4 w-4 text-journey-offplan" />
          <span className="text-[13px]">iClose credits balance</span>
        </div>
        <p className="mt-1.5 text-[34px] font-semibold leading-none tracking-tight">0</p>
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[13px] text-white/60">
            {formatCredits(pendingCredits)} credits available across your shortlist
          </span>
          <Link href="/experience/saved" className="text-[13px] font-medium text-journey-offplan">
            View
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-4 grid grid-cols-3 gap-2.5">
        <Stat icon={<Heart className="h-5 w-5" />} value={savedRefs.length} label="Saved" />
        <Stat icon={<X className="h-5 w-5" />} value={passedCount} label="Passed" />
        <Stat icon={<Sparkles className="h-5 w-5" />} value={seen} label="Seen" />
      </section>

      {/* Menu */}
      <section className="card-surface overflow-hidden">
        <Row href="/experience/saved" icon={<Heart className="h-[18px] w-[18px]" />} label="My shortlist" trailing={`${savedRefs.length}`} />
        <Divider />
        <Row href="/experience/launches" icon={<Sparkles className="h-[18px] w-[18px]" />} label="New launches" />
        <Divider />
        <Row href="#" icon={<FileText className="h-[18px] w-[18px]" />} label="My deals" trailing="0" />
        <Divider />
        <Row href="#" icon={<Wallet className="h-[18px] w-[18px]" />} label="Credits & rewards" />
        <Divider />
        <Row href="#" icon={<Settings className="h-[18px] w-[18px]" />} label="Settings" />
      </section>

      <button
        type="button"
        onClick={reset}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-hairline bg-paper py-3.5 text-[14px] font-medium text-graphite-dark active:scale-[0.98]"
      >
        <RotateCcw className="h-4 w-4" />
        Reset my swipes
      </button>

      <p className="mt-5 text-center text-[12px] text-graphite-light">
        Liquid Glass concept · iClose experience
      </p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="card-surface flex flex-col items-center gap-1 py-4">
      <span className="text-graphite">{icon}</span>
      <span className="text-[22px] font-semibold leading-none text-ink">{value}</span>
      <span className="text-[12px] text-graphite">{label}</span>
    </div>
  );
}

function Row({
  href,
  icon,
  label,
  trailing,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  trailing?: string;
}) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3.5 text-ink active:bg-mist">
      <span className="text-graphite-dark">{icon}</span>
      <span className="flex-1 text-[15px] font-medium">{label}</span>
      {trailing && <span className="text-[14px] text-graphite">{trailing}</span>}
      <ChevronRight className="h-4 w-4 text-graphite-light" />
    </Link>
  );
}

function Divider() {
  return <div className="mx-4 h-px bg-hairline/70" />;
}
