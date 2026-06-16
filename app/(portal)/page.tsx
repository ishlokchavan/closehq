import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SearchTabs } from '@/components/portal/search/search-tabs';
import type { JourneyKey } from '@/lib/portal-config';

export const metadata: Metadata = {
  title: 'iClose — Never Pay Commission to Buy, Sell, or Close',
  description:
    'Search Dubai property, off-plan new releases, transactions and agents. Buy, sell and close real estate in the UAE without paying commission.',
};

interface HomeCard {
  tint: JourneyKey;
  title: string;
  body: string;
  href: string;
  cta: string;
}

const HOME_CARDS: HomeCard[] = [
  { tint: 'buy', title: 'Buy with zero commission', body: 'Browse ready and off-plan homes and keep 100% of the agent commission.', href: '/buy', cta: 'How to buy' },
  { tint: 'sell', title: 'Sell without commission', body: 'List as the owner, reach verified buyers and close on your terms.', href: '/sell', cta: 'How to sell' },
  { tint: 'close', title: 'Close & keep 100% commission', body: 'Freelancers, agents and agencies list, manage and close on the platform.', href: '/close', cta: 'How to close' },
];

const TINT_BAR: Record<JourneyKey, string> = {
  buy: 'bg-journey-buyer',
  sell: 'bg-journey-seller',
  close: 'bg-journey-agent',
};

export default function PortalHomePage() {
  return (
    <>
      {/* Off-plan / credits notification bar (one of several entry points to credits). */}
      <Link
        href="/developers"
        className="block bg-journey-offplan/20 hover:bg-journey-offplan/30 transition-colors"
      >
        <div className="container-wide py-2 text-center text-[13px] text-ink">
          Investing in Off-Plan? Get special pricing &amp; credits
          <span className="text-accent ml-1.5 inline-flex items-center gap-0.5">
            Learn more <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </Link>

      {/* Hero + tabbed search */}
      <section className="container-wide pt-12 pb-8 text-center">
        <h1 className="display-lg max-w-4xl mx-auto text-balance">
          Never Pay Commission to <span className="font-bold">Buy</span>,{' '}
          <span className="font-bold">Sell</span>, or <span className="font-bold">Close</span> Ever Again!
        </h1>
        <p className="subhead mt-4 max-w-2xl mx-auto">
          Search Dubai property, off-plan new releases, transactions and agents — all in one place.
        </p>
        <div className="mt-9">
          <SearchTabs active="properties" />
        </div>
      </section>

      {/* Journey cards */}
      <section className="container-wide pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOME_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card-surface overflow-hidden group hover:shadow-card-hover transition-shadow"
            >
              <div className={`h-1.5 ${TINT_BAR[card.tint]}`} />
              <div className="p-6">
                <h2 className="text-[20px] font-semibold text-ink" style={{ letterSpacing: '-0.02em' }}>
                  {card.title}
                </h2>
                <p className="text-[14px] text-graphite-dark mt-2">{card.body}</p>
                <span className="applelink mt-4 text-[14px] inline-flex">
                  {card.cta}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
