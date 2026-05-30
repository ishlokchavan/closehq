'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Check, TrendingUp, BadgePercent, Landmark, Building2 } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { ICloseFooter } from '@/components/sections/iclose-landing/iclose-footer';
import {
  PersonaIntro,
  PersonaFeatures,
  PersonaSteps,
  PersonaFacts,
  PersonaQuote,
  PersonaFaq,
  PersonaWaitlist,
} from '@/components/persona/persona-sections';
import personaStyles from '@/components/persona/persona.module.css';
import { BuyerCompare, BuyerScenarios } from './buyer-cards';
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

const DEVELOPERS = ['Emaar', 'DAMAC', 'Nakheel', 'Sobha', 'Meraas', 'Binghatti'];

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
          iClose gives UAE buyers the deep market intelligence to buy with
          confidence, then rebates the entire agent commission back to you.
          Off-plan or ready, every dirham goes in your pocket.
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

        {/* Abstract centerpiece + floating stat cards (CSS/JS, no image) */}
        <div className={styles.heroStage} aria-hidden="true">
          <div className={styles.orbWrap}>
            <motion.div
              className={styles.orb}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
            >
              <span className={styles.orbRing} />
              <span className={styles.orbRing2} />
              <span className={styles.orbGloss} />
              <span className={styles.orbBadge}>
                <span className={styles.orbBadgeNum}>100%</span>
                <span className={styles.orbBadgeLabel}>cashback</span>
              </span>
            </motion.div>
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

      {/* Developer trust strip */}
      <div className={styles.trust}>
        <div className={styles.trustLabel}>
          Coverage across the UAE&apos;s leading developers
        </div>
        <div className={styles.trustRow}>
          {DEVELOPERS.map((d) => (
            <span key={d} className={styles.trustItem}>
              {d}
            </span>
          ))}
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
      <PersonaIntro
        eyebrow="The real problem"
        heading={<>Buying in UAE without the right intel is expensive.</>}
        body={
          <>
            Most buyers walk into one of the world&apos;s most competitive
            property markets with nothing but a developer&apos;s sales pitch.
            That&apos;s not a strategy.
          </>
        }
        items={[
          {
            tag: 'Bias',
            title: 'Agents prioritise their commission.',
            body: "Not the project that's actually right for your goals or budget.",
          },
          {
            tag: 'Overwhelm',
            title: 'Hundreds of launches a year.',
            body: 'No easy way to compare quality, location ROI, developer track record, or real payment terms.',
          },
          {
            tag: 'Opacity',
            title: 'Commission baked into every deal.',
            body: 'Most buyers never see the breakdown, and never see a cent of it back.',
          },
          {
            tag: 'Risk',
            title: 'First-time + international buyers are exposed.',
            body: 'Navigating RERA rules, DLD fees, and developer credibility without a guide is a recipe for losses.',
          },
        ]}
      />

      <BuyerCompare />

      <BuyerScenarios />

      <PersonaFeatures
        eyebrow="What iClose gives you"
        heading={<>Everything you need to make the right call.</>}
        body={
          <>
            We built the platform we wish existed when buyers first entered
            this market. Unbiased, comprehensive, and built around your
            outcome, with the entire commission rebated back to you.
          </>
        }
        items={[
          {
            title: 'Project deep-dives.',
            body: 'Every active project in the UAE. Developer background, construction progress, community context, ROI data.',
          },
          {
            title: 'Floor plans & specs.',
            body: "Actual unit layouts, sizes, and finishing specs. Not just renders. Know what you're buying before you visit.",
          },
          {
            title: 'Payment plan breakdowns.',
            body: 'Side-by-side comparisons so you know which deal actually fits your cash flow.',
          },
          {
            title: 'Community intelligence.',
            body: 'Lifestyle, infrastructure, rental yields, and capital appreciation trends. By area, not just by tower.',
          },
          {
            title: 'Market reports.',
            body: 'Understand macro trends, supply pipelines, and where prices are heading.',
          },
          {
            title: 'Verified specialist access.',
            body: "When you're ready to move, our closers are certified and briefed. No cold handoffs.",
          },
        ]}
      />

      <div id="how">
        <PersonaSteps
          eyebrow="How it works"
          heading={<>From curious to confident buyer.</>}
          body={<>Four steps. No pressure. Move at your own pace.</>}
          steps={[
            {
              title: 'Access the platform.',
              body: 'Sign up free. Browse the full UAE project library. Developments, floor plans, pricing, community breakdowns, and market data. No agent contact required until you want it.',
            },
            {
              title: 'Get educated on your shortlist.',
              body: "Narrow down using iClose's comparison tools. Understand ROI trajectories, developer credibility, and payment plans before you speak to a salesperson.",
            },
            {
              title: 'Connect with a certified specialist.',
              body: "When you're ready to view or make an offer, we connect you with a specialist who knows your shortlist. You walk in informed. So the conversation is different.",
            },
            {
              title: 'Close and collect 100%.',
              body: "Because you're buying through iClose, the full commission we earn on the deal comes back to you as cashback. Confirmed upfront. Paid on transfer.",
            },
          ]}
        />
      </div>

      <PersonaFacts
        heading={<>Why this market. Why now.</>}
        items={[
          { stat: '8–12%', label: 'Average net rental yield. Among the highest globally' },
          { stat: '0%', label: 'Capital gains and income tax on UAE property earnings' },
          { stat: '170+', label: 'Nationalities actively buying. The most international market on earth' },
          { stat: 'AED 2M', label: 'Purchase threshold that qualifies you for a UAE Golden Visa' },
        ]}
      />

      <div id="reviews">
        <PersonaQuote
          quote="I spent three months comparing projects on my own and still felt unsure. iClose's platform had everything in one place. I made a decision in two weeks. And got the entire AED 40,000 commission back as cashback."
          name="Buyer"
          role="2BR apartment · Dubai Hills Estate"
        />
      </div>

      <div id="faq">
        <PersonaFaq
          heading={<>Frequently asked questions.</>}
          items={[
            {
              q: 'Is iClose free to use as a buyer?',
              a: "Yes. Accessing the platform, browsing projects, and using our market intelligence tools is completely free. You only engage our specialist service when you're ready to move, and that's when 100% of the commission comes back to you.",
            },
            {
              q: 'Do I need to be a UAE resident to buy?',
              a: 'No. Non-residents and international buyers can purchase freehold property in designated areas. A purchase above AED 2M can also qualify you for a UAE Golden Visa. iClose walks you through the full process.',
            },
            {
              q: 'How does the 100% cashback work?',
              a: 'When you close a deal through iClose, we rebate the entire agent commission we earn on the transaction back to you. The exact figure depends on the deal value and developer terms, but it is confirmed transparently before you sign anything.',
            },
            {
              q: 'What if I already have a project in mind?',
              a: "Even better. Look it up on the platform, get the full intelligence report, then connect with a specialist who knows that development. You'll know more than most buyers who walk in cold, and still get 100% cashback on close.",
            },
            {
              q: 'Is iClose for off-plan or secondary market too?',
              a: 'Both. Our specialists work across off-plan and secondary market transactions, and the 100% cashback applies on every deal.',
            },
          ]}
        />
      </div>

      <PersonaWaitlist
        defaultIntent="buyer"
        hideIntent
        heading={<>Your next property starts with the right intel.</>}
        body={
          <>
            Tell us a bit about you, and we&apos;ll line up your 100% cashback
            for your next purchase. No credit card, no commitment.
          </>
        }
      />

      <ICloseFooter />
      </div>
    </div>
  );
}
