import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SearchPanel } from '@/components/portal/search/search-panel';
import { MeshGradient } from '@/components/portal/mesh-gradient';
import { getFilterOptions } from '@/lib/portal/filters';
import { getI18n } from '@/lib/i18n/server';
import type { LocaleCode } from '@/lib/i18n/config';
import type { Messages } from '@/lib/i18n/dictionaries';

export const metadata: Metadata = {
  title: 'iClose — Never Pay Commission to Buy, Sell, or Close',
  description:
    'Search Dubai property, off-plan new releases, transactions and agents. Buy, sell and close real estate in the UAE without paying commission.',
};

// Generated Dubai real-estate imagery. To move to owned storage:
//   1) run `bash scripts/fetch-home-images.sh` (downloads to public/images/home)
//   2) commit the PNGs and set LOCAL_IMAGES = true below.
const LOCAL_IMAGES = false;
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7';
const IMG = (local: string, remote: string) => (LOCAL_IMAGES ? `/images/home/${local}` : `${CDN}/${remote}`);
const HOME_CARDS: { href: string; cta: string; image: string }[] = [
  { href: '/buy', cta: 'Looking To Buy?', image: IMG('buy.png', 'hf_20260616_222225_d0f4e2b8-36a6-46aa-9625-324f1714414c.png') },
  { href: '/sell', cta: 'Looking To Sell?', image: IMG('sell.png', 'hf_20260616_222230_e9003974-fd28-47cb-9667-44b1485ce165.png') },
  { href: '/close', cta: 'Want to List or Close?', image: IMG('close.png', 'hf_20260616_222236_b69f84e1-cbcb-452d-841d-63c07a0ada81.png') },
];

/** The commission headline — bold Buy/Sell/Close in English, plain otherwise. */
function CommissionHeadline({ locale, t, className }: { locale: LocaleCode; t: Messages['home']; className?: string }) {
  if (locale === 'en') {
    return (
      <span className={className}>
        Never Pay Commission to <span className="font-bold">Buy</span>,{' '}
        <span className="font-bold">Sell</span>, Or <span className="font-bold">Close</span> Ever Again!
      </span>
    );
  }
  return <span className={className}>{t.heroTitle}</span>;
}

export default async function PortalHomePage() {
  const { locale, messages } = await getI18n();
  const filterOptions = await getFilterOptions();
  const t = messages.home;

  return (
    <>
      {/* Hero + tabbed search over the mesh-gradient wash (Figma mid-fi) */}
      {/* Clip only the gradient layer (not the section) so open search dropdowns aren't cut off. */}
      <section className="relative">
        <div className="absolute inset-0 overflow-hidden">
          <MeshGradient className="-top-24" />
        </div>
        <div className="relative container-wide pt-20 pb-20 text-center">
          <h1 className="display-lg max-w-4xl mx-auto text-balance">
            <CommissionHeadline locale={locale} t={t} />
          </h1>
          <p className="subhead mt-5 max-w-2xl mx-auto">
            {t.heroSub}
            <Link href="/credits" className="applelink ms-1.5 text-[15px] align-baseline">
              {t.learnMore} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </Link>
          </p>
          <div className="mt-12">
            <SearchPanel initial="properties" options={filterOptions} />
          </div>
        </div>
      </section>

      {/* Journey cards — image card with overlay, repeated headline + CTA */}
      <section className="container-wide pb-24 -mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOME_CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group relative overflow-hidden rounded-apple min-h-[230px] flex flex-col items-center justify-center text-center p-8 shadow-card hover:shadow-card-hover transition-shadow"
            >
              {/* Generated Dubai imagery + dark overlay for legibility */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={card.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />

              <div className="relative">
                <h2 className="text-[22px] sm:text-[24px] leading-tight font-medium text-white max-w-xs mx-auto" style={{ letterSpacing: '-0.02em' }}>
                  <CommissionHeadline locale={locale} t={t} />
                </h2>
                <p className="mt-4 text-[15px] text-white/85">
                  {card.cta}{' '}
                  <span className="inline-flex items-center gap-0.5 text-accent font-medium group-hover:underline">
                    {t.learnMore} <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
