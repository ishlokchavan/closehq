'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useInView, animate, type Variants } from 'framer-motion';
import {
  Check,
  ArrowDownRight,
  TrendingUp,
  UserRound,
  Sparkles,
  Building2,
  RotateCcw,
  LineChart,
  Wallet,
  BadgeCheck,
  Map,
  Video,
  Mic,
  Calendar,
  FileText,
  Layers,
  Grid2x2,
  ScrollText,
  Play,
  Banknote,
} from 'lucide-react';
import styles from './buyer-landing.module.css';

const ease = [0.22, 1, 0.36, 1] as const;
const inView = { once: true, margin: '-12% 0px' } as const;

/* Count-up micro-animation. Animates from 0 → value the first time the
   number scrolls into view, formatted with thousands separators. */
function CountUp({ value, prefix = '' }: { value: number; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, margin: '-15% 0px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!seen) return;
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.2,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [seen, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display.toLocaleString('en-US')}
    </span>
  );
}

const rowsContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.12 } },
};
const rowItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.4, ease } },
};

type Row = { label: string; value: ReactNode };

function CardRows({ rows }: { rows: Row[] }) {
  return (
    <motion.div
      className={styles.rows}
      variants={rowsContainer}
      initial="hidden"
      whileInView="show"
      viewport={inView}
    >
      {rows.map((r, i) => (
        <motion.div className={styles.row} key={i} variants={rowItem}>
          <span className={styles.rowLabel}>{r.label}</span>
          <span className={styles.rowValue}>{r.value}</span>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* Hover lift only — the entrance `transition` on each card drives the
   timing, so we keep this to whileHover to avoid a duplicate key. */
const cardHover = {
  whileHover: { y: -6 },
};

/* ----------------- COMPARISON (bad vs good) ----------------- */
export function BuyerCompare() {
  return (
    <section className={styles.cmpSection} id="cashback">
      <div className={styles.cmpInner}>
        <motion.div
          className={styles.cmpHead}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          <span className={styles.cmpEyebrow}>The commission problem</span>
          <h2 className={styles.cmpHeading}>Never pay commission again.</h2>
          <p className={styles.cmpSub}>
            On a typical AED 2M ready secondary purchase, here&apos;s the
            difference between buying through a standard agent and buying
            through iClose.
          </p>
        </motion.div>

        <div className={styles.cmpGrid}>
          {/* Standard agent — the costly route */}
          <motion.article
            className={`${styles.card} ${styles.cardBad}`}
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease }}
            {...cardHover}
          >
            <div className={styles.cardHead}>
              <span className={`${styles.cardIcon} ${styles.cardIconBad}`}>
                <UserRound size={18} strokeWidth={2.2} />
              </span>
              <span className={styles.cardName}>Standard agent</span>
            </div>
            <CardRows
              rows={[
                { label: 'Deal value', value: 'AED 2,000,000' },
                { label: 'Buyer commission', value: '2%' },
                { label: 'You pay the agent', value: 'AED 40,000' },
              ]}
            />
            <div className={styles.result}>
              <span className={styles.resultLabel}>You pay</span>
              <div className={styles.resultRow}>
                <span className={styles.resultValue}>
                  AED <CountUp value={40000} />
                </span>
                <ArrowDownRight size={22} color="#c8392f" strokeWidth={2.4} />
              </div>
            </div>
          </motion.article>

          <motion.div
            className={styles.cmpVs}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={inView}
            transition={{ duration: 0.5, delay: 0.25, type: 'spring', bounce: 0.5 }}
          >
            vs
          </motion.div>

          {/* iClose — the win */}
          <motion.article
            className={`${styles.card} ${styles.cardGood}`}
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            {...cardHover}
          >
            <div className={styles.cardHead}>
              <span className={`${styles.cardIcon} ${styles.cardIconGood}`}>
                <Sparkles size={18} strokeWidth={2.2} />
              </span>
              <span className={styles.cardName}>iClose</span>
            </div>
            <CardRows
              rows={[
                { label: 'Deal value', value: 'AED 2,000,000' },
                { label: 'Buyer commission', value: '0%' },
                { label: 'You pay the agent', value: 'AED 0' },
              ]}
            />
            <div className={styles.result}>
              <span className={styles.resultLabel}>You pay</span>
              <div className={styles.resultRow}>
                <span className={styles.resultValue}>AED 0</span>
                <motion.span
                  className={styles.savePill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.45, delay: 0.5, ease }}
                >
                  <Check size={14} strokeWidth={3} /> Save AED 40,000
                </motion.span>
              </div>
            </div>
          </motion.article>
        </div>

        <p className={styles.cmpFoot}>
          Confirmed in writing before you sign. No surprises at transfer.
        </p>
      </div>
    </section>
  );
}

/* ----------------- SCENARIOS (two positive routes) ----------------- */
export function BuyerScenarios() {
  return (
    <section className={`${styles.cmpSection} ${styles.cmpSectionAlt}`}>
      <div className={styles.cmpInner}>
        <motion.div
          className={styles.cmpHead}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          <span className={styles.cmpEyebrow}>Two routes, both in your favour</span>
          <h2 className={styles.cmpHeading}>However you buy, you win.</h2>
          <p className={styles.cmpSub}>
            iClose works the same way whichever side of the market you&apos;re
            buying on. The economics just look different.
          </p>
        </motion.div>

        <div className={styles.scnGrid}>
          {/* Off-plan */}
          <motion.article
            className={`${styles.card} ${styles.cardGood}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease }}
            {...cardHover}
          >
            <span className={`${styles.scnBadge} ${styles.scnBadgeGreen}`}>
              <Building2 size={13} strokeWidth={2.4} /> Off-plan
            </span>
            <h3 className={styles.scnTitle}>You get 100% cashback</h3>
            <CardRows
              rows={[
                { label: 'Deal value', value: 'AED 2,000,000' },
                { label: 'Developer commission', value: '5% (AED 100,000)' },
                { label: 'iClose rebate to you', value: '100%' },
              ]}
            />
            <div className={styles.result}>
              <span className={styles.resultLabel}>You get back</span>
              <div className={styles.resultRow}>
                <span className={`${styles.resultValue} ${styles.resultValueGreen}`}>
                  AED <CountUp value={100000} />
                </span>
                <TrendingUp size={22} color="#34c759" strokeWidth={2.4} />
              </div>
            </div>
          </motion.article>

          {/* Secondary */}
          <motion.article
            className={`${styles.card} ${styles.cardGood}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, delay: 0.1, ease }}
            {...cardHover}
          >
            <span className={styles.scnBadge}>
              <RotateCcw size={13} strokeWidth={2.4} /> Secondary
            </span>
            <h3 className={styles.scnTitle}>You pay no commission</h3>
            <CardRows
              rows={[
                { label: 'Deal value', value: 'AED 2,000,000' },
                { label: 'Standard commission', value: '2% (AED 40,000)' },
                { label: 'iClose charges you', value: 'Nothing' },
              ]}
            />
            <div className={styles.result}>
              <span className={styles.resultLabel}>You save</span>
              <div className={styles.resultRow}>
                <span className={`${styles.resultValue} ${styles.resultValueGreen}`}>
                  AED <CountUp value={40000} />
                </span>
                <Check size={22} color="#34c759" strokeWidth={2.6} />
              </div>
            </div>
          </motion.article>
        </div>

        <p className={styles.cmpFoot}>
          Exact figures confirmed up front before you commit to any deal.
        </p>
      </div>
    </section>
  );
}

/* ----------------- STATEMENT (big headline + floating chips) ----------------- */
export function BuyerStatement() {
  const chip = (delay: number, dir: number) => ({
    initial: { opacity: 0, y: 16, scale: 0.92 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: inView,
    transition: { duration: 0.5, delay, ease },
    style: { ['--bob-x' as string]: `${dir}px` },
  });

  return (
    <section className={styles.stmtSection}>
      <div className={styles.stmtInner}>
        <motion.span
          className={styles.stmtTag}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, ease }}
        >
          Market intelligence
        </motion.span>

        <motion.h2
          className={styles.stmtHeading}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, delay: 0.05, ease }}
        >
          Turning UAE property data into{' '}
          <span className={styles.stmtHeadingAccent}>smarter buying decisions.</span>
        </motion.h2>

        {/* Floating accent chips around the headline */}
        <motion.div className={`${styles.stmtChip} ${styles.stmtChipA}`} {...chip(0.2, -6)}>
          <span className={`${styles.stmtChipIcon} ${styles.stmtChipIconGreen}`}>
            <LineChart size={16} strokeWidth={2.4} />
          </span>
          <span>
            <span className={styles.stmtChipLabel}>Capital growth</span>
            <span className={styles.stmtChipValue}>+18.4%</span>
          </span>
        </motion.div>

        <motion.div className={`${styles.stmtChip} ${styles.stmtChipB}`} {...chip(0.32, 7)}>
          <span className={`${styles.stmtChipIcon} ${styles.stmtChipIconBlue}`}>
            <Wallet size={16} strokeWidth={2.4} />
          </span>
          <span>
            <span className={styles.stmtChipLabel}>Cashback</span>
            <span className={`${styles.stmtChipValue} ${styles.stmtChipValueGreen}`}>
              AED 100,000
            </span>
          </span>
        </motion.div>

        <motion.div className={`${styles.stmtChip} ${styles.stmtChipC}`} {...chip(0.44, -5)}>
          <span className={`${styles.stmtChipIcon} ${styles.stmtChipIconInk}`}>
            <BadgeCheck size={16} strokeWidth={2.4} />
          </span>
          <span>
            <span className={styles.stmtChipLabel}>Verified deals</span>
            <span className={styles.stmtChipValue}>RERA-checked</span>
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------- TOOLS (feature row + mock-UI product cards) ----------------- */
/* Every resource a serious buyer needs for any project — the brief a broker
   would keep to themselves, opened up. Each chip lifts + reveals on hover. */
const resourceDocs = [
  { icon: <FileText size={16} strokeWidth={2.2} />, label: 'Brochure' },
  { icon: <Grid2x2 size={16} strokeWidth={2.2} />, label: 'Floor plan' },
  { icon: <Map size={16} strokeWidth={2.2} />, label: 'Master plan' },
  { icon: <Layers size={16} strokeWidth={2.2} />, label: 'Cluster plan' },
  { icon: <ScrollText size={16} strokeWidth={2.2} />, label: 'Factsheet' },
  { icon: <Banknote size={16} strokeWidth={2.2} />, label: 'Payment plan' },
];

export function BuyerTools() {
  return (
    <section className={styles.toolsSection}>
      <div className={styles.toolsInner}>
        <motion.div
          className={styles.toolsHead}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          <h2 className={styles.toolsHeading}>Buy like an insider.</h2>
          <p className={styles.toolsLede}>
            Keep the commission. See every project, every document, every
            developer, all in one place.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className={styles.bento}>
          {/* Resource library (large) */}
          <motion.article
            className={`${styles.bentoCard} ${styles.bentoLib}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease }}
            {...cardHover}
          >
            <div className={styles.bentoHead}>
              <span className={styles.bentoEyebrow}>Everything, transparent</span>
              <h3 className={styles.bentoTitle}>Every document. Every developer.</h3>
            </div>
            <motion.div
              className={styles.docGrid}
              variants={rowsContainer}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              {resourceDocs.map((d) => (
                <motion.div className={styles.docChip} key={d.label} variants={rowItem}>
                  <span className={styles.docChipIcon}>{d.icon}</span>
                  <span>{d.label}</span>
                </motion.div>
              ))}
            </motion.div>
            <p className={styles.bentoFoot}>
              Brochures, master &amp; cluster plans, factsheets, payment plans.
              The full broker brief, no gatekeeping.
            </p>
          </motion.article>

          {/* Cashback */}
          <motion.article
            className={`${styles.bentoCard} ${styles.bentoCash}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, delay: 0.08, ease }}
            {...cardHover}
          >
            <span className={styles.bentoEyebrow}>You keep the commission</span>
            <div className={styles.cashRows}>
              <div className={styles.cashRow}>
                <div className={styles.cashRowTop}>
                  <span className={styles.cashTag}>
                    <Building2 size={13} strokeWidth={2.4} /> Off-plan
                  </span>
                  <span className={styles.cashStrike}>was 5%</span>
                </div>
                <div className={styles.cashBig}>
                  <span className={styles.cashNum}>
                    <CountUp value={100} />%
                  </span>
                  <span className={styles.cashCap}>cashback to you</span>
                </div>
              </div>
              <div className={styles.cashDivider} />
              <div className={styles.cashRow}>
                <div className={styles.cashRowTop}>
                  <span className={styles.cashTag}>
                    <RotateCcw size={13} strokeWidth={2.4} /> Secondary
                  </span>
                  <span className={styles.cashStrike}>was 2%</span>
                </div>
                <div className={styles.cashBig}>
                  <span className={styles.cashNum}>AED 0</span>
                  <span className={styles.cashCap}>you pay</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Expert sessions */}
          <motion.article
            className={`${styles.bentoCard} ${styles.bentoSessions}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, delay: 0.16, ease }}
            {...cardHover}
          >
            <span className={styles.bentoEyebrow}>Learn from the source</span>
            <h3 className={styles.bentoTitle}>Sessions with developer RMs.</h3>
            <div className={styles.sessionList}>
              {[
                { dev: 'Emaar', topic: 'Dubai Creek Harbour', meta: '32 min' },
                { dev: 'DAMAC', topic: 'Payment plan deep-dive', meta: '24 min' },
                { dev: 'Sobha', topic: 'Hartland II launch', meta: '28 min' },
              ].map((s, i) => (
                <div className={styles.sessionRow} key={s.dev}>
                  <span className={styles.sessionPlay} data-i={i}>
                    <Play size={11} strokeWidth={0} fill="currentColor" />
                  </span>
                  <span className={styles.sessionMeta}>
                    <span className={styles.sessionName}>{s.dev}</span>
                    <span className={styles.sessionTopic}>{s.topic}</span>
                  </span>
                  <span className={styles.sessionDur}>{s.meta}</span>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ----------------- STEPS (numbered timeline + onboarding media card) ----------------- */
const buyerSteps = [
  {
    n: '01',
    title: 'Browse the market.',
    body: 'Sign up free. Explore every UAE project, floor plan, and price. No agent contact until you want it.',
  },
  {
    n: '02',
    title: 'Shortlist with confidence.',
    body: 'Compare ROI, developers, and payment plans before you speak to anyone.',
  },
  {
    n: '03',
    title: 'Match with a specialist.',
    body: 'A certified closer, briefed on your shortlist, takes it from view to offer.',
  },
  {
    n: '04',
    title: 'Close and collect 100%.',
    body: 'The full commission comes back to you as cashback. Paid on transfer.',
  },
];

export function BuyerSteps() {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.stepsInner}>
        <motion.div
          className={styles.stepsHead}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          <span className={styles.stepsEyebrow}>How it works</span>
          <h2 className={styles.stepsHeading}>Four steps. No pressure.</h2>
          <p className={styles.stepsSub}>
            From browsing to keys, in your favour at every stage.
          </p>
        </motion.div>

        {/* Onboarding media card — pure CSS mock of a call/session UI */}
        <motion.div
          className={styles.onboard}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          <div className={styles.onboardScreen}>
            <span className={styles.onboardLive}>
              <span className={styles.onboardLiveDot} /> Live session
            </span>

            {/* main "video" tile */}
            <div className={styles.onboardMain}>
              <span className={styles.onboardAvatarLg}>SA</span>
            </div>

            {/* self "video" tile */}
            <div className={styles.onboardSelf}>
              <span className={styles.onboardAvatarSm}>You</span>
            </div>

            {/* floating session info card */}
            <div className={styles.onboardInfo}>
              <span className={styles.onboardInfoIcon}>
                <Calendar size={15} strokeWidth={2.4} />
              </span>
              <span>
                <span className={styles.onboardInfoTitle}>Onboarding session</span>
                <span className={styles.onboardInfoMeta}>Today · 13:00–13:45</span>
              </span>
            </div>

            {/* control bar */}
            <div className={styles.onboardBar}>
              <span className={styles.onboardCtrl}>
                <Mic size={16} strokeWidth={2.2} />
              </span>
              <span className={`${styles.onboardCtrl} ${styles.onboardCtrlActive}`}>
                <Video size={16} strokeWidth={2.2} />
              </span>
              <span className={styles.onboardCtrl}>
                <Check size={16} strokeWidth={2.6} />
              </span>
            </div>
          </div>
        </motion.div>

        {/* numbered step timeline */}
        <div className={styles.stepsGrid}>
          {buyerSteps.map((s, i) => (
            <motion.div
              className={styles.stepItem}
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.5, delay: i * 0.08, ease }}
            >
              <span className={styles.stepNum}>{s.n}</span>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepBody}>{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
