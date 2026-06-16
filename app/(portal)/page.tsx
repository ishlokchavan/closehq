import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SearchPanel } from '@/components/portal/search/search-panel';
import { MeshGradient } from '@/components/portal/mesh-gradient';
import { getI18n } from '@/lib/i18n/server';
import type { JourneyKey } from '@/lib/portal-config';

export const metadata: Metadata = {
  title: 'iClose — Never Pay Commission to Buy, Sell, or Close',
  description:
    'Search Dubai property, off-plan new releases, transactions and agents. Buy, sell and close real estate in the UAE without paying commission.',
};

const HOME_CARDS: { tint: JourneyKey; titleKey: 'buy' | 'sell' | 'close'; ctaKey: 'buyCta' | 'sellCta' | 'closeCta'; body: string; href: string }[] = [
  { tint: 'buy', titleKey: 'buy', ctaKey: 'buyCta', body: 'Browse ready and off-plan homes and keep 100% of the agent commission.', href: '/buy' },
  { tint: 'sell', titleKey: 'sell', ctaKey: 'sellCta', body: 'List as the owner, reach verified buyers and close on your terms.', href: '/sell' },
  { tint: 'close', titleKey: 'close', ctaKey: 'closeCta', body: 'Freelancers, agents and agencies list, manage and close on the platform.', href: '/close' },
];

const TINT_BAR: Record<JourneyKey, string> = {
  buy: 'bg-journey-buyer',
  sell: 'bg-journey-seller',
  close: 'bg-journey-agent',
};

export default async function PortalHomePage() {
  const { locale, messages } = await getI18n();
  const t = messages.home;

  return (
    <>
      {/* Hero + tabbed search over the mesh-gradient wash (Figma mid-fi) */}
      <section className="relative overflow-hidden">
        <MeshGradient className="-top-24" />
        <div className="relative container-wide pt-20 pb-20 text-center">
          <h1 className="display-lg max-w-4xl mx-auto text-balance">
            {locale === 'en' ? (
              <>
                Never Pay Commission to <span className="font-bold">Buy</span>,{' '}
                <span className="font-bold">Sell</span>, or <span className="font-bold">Close</span> Ever Again!
              </>
            ) : (
              t.heroTitle
            )}
          </h1>
          <p className="subhead mt-5 max-w-2xl mx-auto">
            {t.heroSub}
            <Link href="/developers" className="applelink ms-1.5 text-[15px] align-baseline">
              {t.learnMore} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </p>
          <div className="mt-12">
            <SearchPanel initial="properties" />
          </div>
        </div>
      </section>

      {/* Journey cards */}
      <section className="container-wide pb-24 -mt-4">
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
                  {t.cards[card.titleKey]}
                </h2>
                <p className="text-[14px] text-graphite-dark mt-2">{card.body}</p>
                <span className="applelink mt-4 text-[14px] inline-flex">
                  {t.cards[card.ctaKey]}
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
