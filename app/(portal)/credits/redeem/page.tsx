import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2, Users, Tag, BadgeCheck, Wallet, Gift, Receipt, Landmark,
  Coins, DollarSign, Plane, Smartphone, Gem, ShoppingBag, UtensilsCrossed, CreditCard, ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { REDEEM_FORMATS, GIFT_OPTIONS, type IconKey } from '@/lib/portal/credits';

export const metadata: Metadata = {
  title: 'Redeem iClose Credits',
  description:
    'Redeem iClose Credits your way — cash out as AED, USD or USDT, or turn them into travel, tech, gold, shopping and dining gifts.',
};

const ICONS: Record<IconKey, React.ComponentType<{ className?: string }>> = {
  building: Building2, users: Users, tag: Tag, badge: BadgeCheck,
  wallet: Wallet, gift: Gift, receipt: Receipt, bank: Landmark,
  coins: Coins, dollar: DollarSign, plane: Plane, device: Smartphone,
  gem: Gem, shopping: ShoppingBag, dining: UtensilsCrossed, card: CreditCard,
};

export default function CreditsRedeemPage() {
  return (
    <div className="container-wide py-12">
      <Link href="/credits" className="inline-flex items-center gap-1 text-[14px] text-graphite hover:text-ink mb-5">
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> Back to credits
      </Link>

      <header className="mb-10">
        <h1 className="display-md">Redeem your credits, your way</h1>
        <p className="subhead mt-3 max-w-2xl">
          Choose the format that suits you — cash, crypto or a gift. Pick one, and we&apos;ll handle
          the rest.
        </p>
      </header>

      {/* Cash & crypto formats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {REDEEM_FORMATS.map((f) => {
          const Icon = ICONS[f.iconKey];
          return (
            <article key={f.key} className="card-surface p-6">
              <span className={`flex items-center justify-center h-12 w-12 rounded-2xl mb-4 ${f.tint}`}>
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="text-[20px] font-semibold text-ink">{f.label}</h2>
              <p className="text-[14px] text-graphite-dark mt-1.5">{f.tagline}</p>
            </article>
          );
        })}
      </div>

      {/* Gift showcase */}
      <div className="mt-12">
        <div className="flex items-center gap-2.5 mb-1.5">
          <Gift className="h-5 w-5 text-[#b51e9e]" />
          <h2 className="text-[22px] font-semibold text-ink" style={{ letterSpacing: '-0.02em' }}>Or treat yourself</h2>
        </div>
        <p className="text-[14.5px] text-graphite-dark mb-6 max-w-2xl">
          Prefer something you can unwrap? Redeem credits for any of these — and we keep adding more.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GIFT_OPTIONS.map((g) => {
            const Icon = ICONS[g.iconKey];
            return (
              <article key={g.title} className="card-surface p-6 flex items-start gap-4 hover:shadow-card-hover transition-shadow">
                <span className={`flex items-center justify-center h-12 w-12 rounded-2xl shrink-0 ${g.tint}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-[16px] font-semibold text-ink" style={{ letterSpacing: '-0.015em' }}>{g.title}</h3>
                  <p className="text-[13.5px] text-graphite-dark mt-1">{g.body}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="card-mist rounded-apple px-6 py-5 mt-10 text-[13px] text-graphite-dark">
        Redemption availability and minimums depend on your account verification and the chosen
        format. Sign in to see your live balance and redeem.
      </div>

      <div className="mt-8">
        <Link href="/login">
          <Button variant="primary" size="lg">Sign in to redeem</Button>
        </Link>
      </div>
    </div>
  );
}
