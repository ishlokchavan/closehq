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
} from 'lucide-react';
import { useSaved } from '@/components/glass/saved-store';

export default function ProfilePage() {
  const { decisions, savedRefs, reset } = useSaved();
  const passedCount = Object.values(decisions).filter((d) => d === 'passed').length;
  const seen = Object.keys(decisions).length;

  return (
    <div className="no-scrollbar h-[100svh] overflow-y-scroll px-4 pb-40 pt-[max(20px,env(safe-area-inset-top))]">
      {/* Identity */}
      <header className="mb-5 mt-2 flex items-center gap-4">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-journey-buyer to-journey-offplan text-[22px] font-semibold text-ink">
          G
        </span>
        <div>
          <h1 className="text-[22px] font-semibold tracking-tight text-white">
            Guest
          </h1>
          <p className="text-[14px] text-white/55">Sign in to sync your shortlist</p>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-4 grid grid-cols-3 gap-2.5">
        <Stat icon={<Heart className="h-5 w-5" />} value={savedRefs.length} label="Saved" />
        <Stat icon={<X className="h-5 w-5" />} value={passedCount} label="Passed" />
        <Stat icon={<Sparkles className="h-5 w-5" />} value={seen} label="Seen" />
      </section>

      {/* Menu */}
      <section className="lg-glass overflow-hidden rounded-[22px]">
        <Row href="/experience/saved" icon={<Heart className="h-[18px] w-[18px]" />} label="My shortlist" trailing={`${savedRefs.length}`} />
        <Divider />
        <Row href="/experience/launches" icon={<Sparkles className="h-[18px] w-[18px]" />} label="New launches" />
        <Divider />
        <Row href="#" icon={<FileText className="h-[18px] w-[18px]" />} label="My deals" trailing="0" />
        <Divider />
        <Row href="#" icon={<Wallet className="h-[18px] w-[18px]" />} label="Credits & rewards" trailing="0" />
        <Divider />
        <Row href="#" icon={<Settings className="h-[18px] w-[18px]" />} label="Settings" />
      </section>

      <button
        type="button"
        onClick={reset}
        className="lg-glass mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-[14px] font-medium text-white/80 active:scale-[0.98]"
      >
        <RotateCcw className="h-4 w-4" />
        Reset my swipes
      </button>

      <p className="mt-5 text-center text-[12px] text-white/35">
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
    <div className="lg-glass flex flex-col items-center gap-1 rounded-[18px] py-4">
      <span className="text-journey-buyer">{icon}</span>
      <span className="text-[22px] font-semibold leading-none text-white">{value}</span>
      <span className="text-[12px] text-white/45">{label}</span>
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
    <Link
      href={href}
      className="flex items-center gap-3 px-4 py-3.5 text-white active:bg-white/5"
    >
      <span className="text-white/70">{icon}</span>
      <span className="flex-1 text-[15px] font-medium">{label}</span>
      {trailing && <span className="text-[14px] text-white/45">{trailing}</span>}
      <ChevronRight className="h-4 w-4 text-white/35" />
    </Link>
  );
}

function Divider() {
  return <div className="mx-4 h-px bg-white/8" />;
}
