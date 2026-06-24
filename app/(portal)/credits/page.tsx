import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, Users, Tag, BadgeCheck, Wallet, Gift, Receipt, Landmark,
  Coins, DollarSign, Plane, Smartphone, Gem, ShoppingBag, UtensilsCrossed, CreditCard, ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MeshGradient } from '@/components/portal/mesh-gradient';
import { EARN_METHODS, REDEEM_FORMATS, type IconKey } from '@/lib/portal/credits';

export const metadata: Metadata = {
  title: 'iClose Credits — Earn & Redeem',
  description:
    'iClose Credits are your reward currency. Earn them on off-plan investments, referrals and deals — then redeem as AED, USD, USDT or a gift of your choice.',
};

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  building: Building2, users: Users, tag: Tag, badge: BadgeCheck,
  wallet: Wallet, gift: Gift, receipt: Receipt, bank: Landmark,
  coins: Coins, dollar: DollarSign, plane: Plane, device: Smartphone,
  gem: Gem, shopping: ShoppingBag, dining: UtensilsCrossed, card: CreditCard,
};

export default function CreditsPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <MeshGradient className="-top-24" />
        <div className="relative container-wide pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-journey-offplan/20 px-3.5 py-1.5 text-[13px] text-ink mb-5">
            <Wallet className="h-4 w-4" /> iClose Credits
          </span>
          <h1 className="display-lg max-w-3xl mx-auto text-balance">Earn credits. Redeem them your way.</h1>
          <p className="subhead mt-5 max-w-2xl mx-auto">
            Credits are iClose&apos;s reward currency. Earn them on off-plan investments, referrals and
            deals — then redeem them in whatever format suits you.
          </p>

          {/* Redemption formats — what credits can become */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {REDEEM_FORMATS.map((f) => {
              const Icon = ICONS[f.iconKey];
              return (
                <div key={f.key} className="card-surface px-4 py-5 text-center">
                  <span className={`inline-flex items-center justify-center h-11 w-11 rounded-full mb-3 ${f.tint}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="text-[18px] font-semibold text-ink">{f.label}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-9">
            <Link href="/credits/redeem">
              <Button variant="primary" size="lg">See redemption options <ArrowRight className="h-4 w-4 rtl:rotate-180" /></Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How to earn */}
      <section className="container-wide pb-20 pt-4">
        <h2 className="display-sm text-center mb-10">How to earn credits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {EARN_METHODS.map((method) => {
            const Icon = ICONS[method.iconKey];
            return (
              <div key={method.title} className="card-surface p-6">
                <span className="flex items-center justify-center h-11 w-11 rounded-full bg-journey-offplan/15 mb-4">
                  <Icon className="h-5 w-5 text-ink" />
                </span>
                <h3 className="text-[16px] font-semibold text-ink" style={{ letterSpacing: '-0.015em' }}>{method.title}</h3>
                <p className="text-[14px] text-graphite-dark mt-2">{method.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-wide pb-24">
        <div className="rounded-apple bg-ink text-white px-8 py-12 text-center">
          <h2 className="display-sm text-white">Ready to put your credits to work?</h2>
          <p className="mt-3 text-[16px] text-white/70 max-w-xl mx-auto">
            Cash out as AED, USD or USDT — or treat yourself to a gift.
          </p>
          <Link href="/credits/redeem" className="inline-block mt-6">
            <Button variant="primary" size="lg">Redeem credits</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
