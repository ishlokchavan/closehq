'use client';

import Link from 'next/link';
import { Wallet, Gift, Users, Building2, ArrowDownToLine, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PageHeader, Panel, StatCard, Badge } from '@/components/portal/dashboard/ui';
import { getCredits, creditsBalance } from '@/lib/portal/dashboard/demo';
import { creditsToAed } from '@/lib/portal/credits';
import { fmtAed, fmtNum, fmtDate } from '@/lib/portal/dashboard/format';

const EARN = [
  { icon: Building2, title: 'Invest in off-plan', body: 'Earn credits on every off-plan reservation, on top of special pricing.' },
  { icon: Users, title: 'Refer a friend', body: 'You both earn credits when someone you refer transacts.' },
  { icon: Gift, title: 'Complete verification', body: 'Verify your profile and documents to unlock bonus credits.' },
];

export default function CreditsPage() {
  const ledger = getCredits();
  const balance = creditsBalance();
  const earned = ledger.filter((c) => c.delta > 0).reduce((s, c) => s + c.delta, 0);
  const redeemed = Math.abs(ledger.filter((c) => c.delta < 0).reduce((s, c) => s + c.delta, 0));

  return (
    <>
      <PageHeader title="Credits & cashback" subtitle="1 credit = AED 0.50. Earn on every deal, redeem as cashback.">
        <Link href="/credits/redeem"><Button variant="primary" size="sm"><ArrowDownToLine className="h-4 w-4" /> Redeem</Button></Link>
      </PageHeader>

      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 rounded-2xl bg-ink text-white p-6 flex flex-col justify-between min-h-[180px]">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-white/70">Available balance</span>
            <Wallet className="h-5 w-5 text-white/70" />
          </div>
          <div>
            <p className="text-[34px] font-semibold leading-tight">{fmtNum(balance)} <span className="text-[18px] text-white/60">credits</span></p>
            <p className="text-[14px] text-white/70 mt-1">≈ {fmtAed(creditsToAed(balance))} cashback</p>
          </div>
        </div>
        <StatCard icon={Plus} label="Total earned" value={fmtNum(earned)} hint={`≈ ${fmtAed(creditsToAed(earned), { compact: true })}`} tint="bg-journey-seller/30 text-[#067a55]" />
        <StatCard icon={Minus} label="Total redeemed" value={fmtNum(redeemed)} hint={`≈ ${fmtAed(creditsToAed(redeemed), { compact: true })}`} tint="bg-journey-agent/30 text-[#b45309]" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel title="Activity" className="lg:col-span-2">
          <ul className="divide-y divide-hairline/50 -my-2">
            {ledger.map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                <span className={`flex items-center justify-center h-9 w-9 rounded-full ${c.delta > 0 ? 'bg-journey-seller/30 text-[#067a55]' : 'bg-mist text-graphite'}`}>
                  {c.delta > 0 ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] text-ink truncate">{c.reason}</p>
                  <p className="text-[12px] text-graphite">{fmtDate(c.dateIso)}</p>
                </div>
                <span className={`text-[14px] font-semibold ${c.delta > 0 ? 'text-[#067a55]' : 'text-ink'}`}>{c.delta > 0 ? '+' : ''}{fmtNum(c.delta)}</span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Earn more credits">
          <ul className="space-y-4">
            {EARN.map((e) => (
              <li key={e.title} className="flex gap-3">
                <span className="flex items-center justify-center h-9 w-9 rounded-full bg-accent/10 text-accent shrink-0"><e.icon className="h-[18px] w-[18px]" /></span>
                <div><p className="text-[13.5px] font-medium text-ink">{e.title}</p><p className="text-[12.5px] text-graphite mt-0.5">{e.body}</p></div>
              </li>
            ))}
          </ul>
          <Link href="/credits" className="mt-4 inline-flex"><Badge tone="accent">Learn how credits work →</Badge></Link>
        </Panel>
      </div>
    </>
  );
}
