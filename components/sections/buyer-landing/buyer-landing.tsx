'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Check, TrendingUp, BadgePercent, Landmark, Building2 } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ICloseFooter } from '@/components/sections/iclose-landing/iclose-footer';
import {
  PersonaQuote,
  PersonaFaq,
  PersonaWaitlist,
} from '@/components/persona/persona-sections';
import personaStyles from '@/components/persona/persona.module.css';
import { BuyerCompare, BuyerTools, BuyerSteps } from './buyer-cards';
import styles from './buyer-landing.module.css';

const ease = [0.22, 1, 0.36, 1] as const;

/* In-page navigation. Buyer-only — every link is an anchor to a section
   on this single page, so crawlers only ever see one route. */
const NAV_LINKS = [
  { href: '#top', label: 'Home' },
  { href: '#how', label: 'How it works' },
  { href: '#cashback', label: 'Cashback' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#faq', label: 'FAQ' },
];

const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/hello-iclose/30min';

/* Developer coverage strip. Each mark is a custom abstract glyph (not the
   developer's official trademarked logo) paired with the wordmark, styled
   like the reference partner bar. Drop official SVGs into
   /public/images/developers and swap `mark` for an <img> to go pixel-exact. */
const DEVELOPERS: { name: string; mark: ReactNode }[] = [
  {
    name: 'Emaar',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M10 1.5 18 6v8l-8 4.5L2 14V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 6.5 14 9v2l-4 2.5L6 11V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'DAMAC',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <rect x="2.6" y="2.6" width="14.8" height="14.8" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M7 7h3.2a3 3 0 0 1 0 6H7z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Nakheel',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          <path d="M10 18V9" />
          <path d="M10 9C10 5 7 3 3.5 3.5 5 6 7 8 10 9" />
          <path d="M10 9c0-4 3-6 6.5-5.5C15 6 13 8 10 9" />
          <path d="M10 10.5c-2-1.5-4.5-1-6 .5 2 1 4 1 6-.5" />
          <path d="M10 10.5c2-1.5 4.5-1 6 .5-2 1-4 1-6-.5" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Sobha',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M10 1.8 17.5 6v8L10 18.2 2.5 14V6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M12.5 7.5c-1.6-1.2-4.2-.6-4.2 1.3 0 2 3.6 1.6 3.6 3.6 0 1.9-2.7 2.4-4.3 1.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Meraas',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <path d="M3 17V7l3.5-3.5L10 7l3.5-3.5L17 7v10" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Binghatti',
    mark: (
      <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true">
        <g stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
          <path d="M4 7.5h12" />
          <path d="M4 12.5h12" />
          <path d="M8 3.5 6 16.5" />
          <path d="M14 3.5l-2 13" />
        </g>
      </svg>
    ),
  },
];

function BuyerNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
        <div className={styles.navBrand}>
          <Logo />
        </div>

        <div className={styles.navCenter}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>

        <div className={styles.navRight}>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navGhost}
          >
            Book a call
          </a>
          <button type="button" className={styles.navSolid} data-get-started="buyer">
            Get started
          </button>
        </div>

        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className={styles.navBurger}
          onClick={() => setOpen((s) => !s)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.mobileSheet}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <div className={styles.mobileSheetCtas}>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navGhost}
                onClick={() => setOpen(false)}
              >
                Book a call
              </a>
              <button
                type="button"
                className={styles.navSolid}
                data-get-started="buyer"
                onClick={() => setOpen(false)}
              >
                Get started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function FloatingCard({
  cls,
  icon,
  label,
  value,
  valueGreen,
  delay,
}: {
  cls: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  valueGreen?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className={`${styles.fcard} ${cls}`}
      initial={{ opacity: 0, scale: 0.85, y: 18 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {icon}
      <span>
        <span className={styles.fcardLabel}>{label}</span>
        <span
          className={`${styles.fcardValue} ${valueGreen ? styles.fcardValueGreen : ''}`}
          style={{ display: 'block' }}
        >
          {value}
        </span>
      </span>
    </motion.div>
  );
}

function BuyerHero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.heroInner}>
        <motion.span
          className={styles.heroEyebrow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className={styles.heroEyebrowDot} aria-hidden="true" />
          100% cashback for UAE property buyers
        </motion.span>

        <motion.h1
          className={styles.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Buy smarter.{' '}
          <span className={styles.heroTitleAccent}>Get 100% of the commission back.</span>
        </motion.h1>

        <motion.p
          className={styles.heroSub}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
        >
          Deep market intelligence, then the entire agent commission rebated
          back to you. Off-plan or ready.
        </motion.p>

        <motion.div
          className={styles.heroCtas}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
        >
          <button type="button" className={styles.btnPrimary} data-get-started="buyer">
            Get started
          </button>
          <a href="#how" className={styles.btnGhost}>
            See how it works <span aria-hidden="true">→</span>
          </a>
        </motion.div>

        {/* Abstract centerpiece + floating stat cards */}
        <div className={styles.heroStage} aria-hidden="true">
          {/* Dashed elliptical orbit rings behind the flower (Elegostra-style) */}
          <svg
            className={styles.orbits}
            viewBox="0 0 1000 520"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            <g transform="rotate(-9 500 260)" fill="none" strokeWidth="1.5">
              <ellipse cx="500" cy="260" rx="478" ry="190" stroke="rgba(0,113,227,0.16)" />
              <ellipse
                cx="500"
                cy="260"
                rx="372"
                ry="142"
                stroke="rgba(110,110,125,0.30)"
                strokeDasharray="1.5 10"
                strokeLinecap="round"
              />
              <ellipse
                cx="500"
                cy="260"
                rx="262"
                ry="98"
                stroke="rgba(0,113,227,0.14)"
                strokeDasharray="1.5 10"
                strokeLinecap="round"
              />
            </g>
          </svg>

          <div className={styles.orbWrap}>
            <motion.img
              src="/images/spiral-flower.webp"
              alt=""
              className={styles.orbFlower}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
            />
          </div>

          <FloatingCard
            cls={styles.fcardA}
            delay={0.4}
            icon={
              <span className={`${styles.fcardIcon} ${styles.fcardIconGreen}`}>
                <Check size={17} strokeWidth={2.6} />
              </span>
            }
            label="Cashback received"
            value="AED 100,000"
            valueGreen
          />
          <FloatingCard
            cls={styles.fcardB}
            delay={0.5}
            icon={
              <span className={`${styles.fcardIcon} ${styles.fcardIconBlue}`}>
                <TrendingUp size={17} strokeWidth={2.4} />
              </span>
            }
            label="Net rental yield"
            value="8–12% p.a."
          />
          <FloatingCard
            cls={styles.fcardC}
            delay={0.6}
            icon={
              <span className={`${styles.fcardIcon} ${styles.fcardIconInk}`}>
                <BadgePercent size={17} strokeWidth={2.2} />
              </span>
            }
            label="You pay the agent"
            value="0% commission"
          />
          <FloatingCard
            cls={styles.fcardD}
            delay={0.7}
            icon={
              <span className={`${styles.fcardIcon} ${styles.fcardIconBlue}`}>
                <Landmark size={17} strokeWidth={2.2} />
              </span>
            }
            label="AED 2M+ purchase"
            value="Golden Visa eligible"
          />
          <FloatingCard
            cls={styles.fcardE}
            delay={0.8}
            icon={
              <span className={`${styles.fcardIcon} ${styles.fcardIconInk}`}>
                <Building2 size={17} strokeWidth={2.2} />
              </span>
            }
            label="Coverage"
            value="Off-plan · Ready"
          />
        </div>
      </div>

      {/* Developer trust strip — floating white card with logo lockups */}
      <div className={styles.trust}>
        <div className={styles.trustBar}>
          {DEVELOPERS.map((d) => (
            <div className={styles.trustItem} key={d.name}>
              <span className={styles.trustMark}>{d.mark}</span>
              <span className={styles.trustName}>{d.name}</span>
            </div>
          ))}
        </div>
        <div className={styles.trustLabel}>
          Coverage across the UAE&apos;s leading developers
        </div>
      </div>
    </section>
  );
}

export function BuyerLanding() {
  return (
    <div className={styles.root}>
      <BuyerNav />

      <BuyerHero />

      {/* The Persona* sections + footer rely on CSS custom properties
          (--text, --bg-dark, --border, etc.) defined on persona's own
          .root. PersonaChrome supplies that wrapper on /for-buyers; here
          we replicate it so the highlighted cards and footer resolve
          their colours correctly instead of rendering washed-out. */}
      <div className={personaStyles.root}>
      <BuyerCompare />

      <BuyerTools />

      <div id="how">
        <BuyerSteps />
      </div>

      <div id="reviews">
        <PersonaQuote
          quote="Everything in one place. I decided in two weeks, and got the entire AED 40,000 commission back as cashback."
          name="Buyer"
          role="2BR apartment · Dubai Hills Estate"
        />
      </div>

      <div id="faq">
        <PersonaFaq
          heading={<>Frequently asked questions.</>}
          items={[
            {
              q: 'Is iClose free to use?',
              a: 'Yes. Browsing projects and market intelligence is free. You only engage a specialist when you’re ready to move, and that’s when 100% of the commission comes back to you.',
            },
            {
              q: 'How does the 100% cashback work?',
              a: 'We rebate the entire agent commission we earn on your deal back to you, confirmed in writing before you sign.',
            },
            {
              q: 'Off-plan or secondary?',
              a: 'Both. The 100% cashback applies on every deal, off-plan or ready.',
            },
          ]}
        />
      </div>

      <PersonaWaitlist
        defaultIntent="buyer"
        hideIntent
        heading={<>Ready to buy smarter?</>}
        body={<>Tell us a bit about you. We&apos;ll line up your 100% cashback.</>}
      />

      <ICloseFooter tagline="The smarter way to buy UAE property. Get 100% of the agent commission back on every deal — off-plan or ready." />
      </div>
    </div>
  );
}
