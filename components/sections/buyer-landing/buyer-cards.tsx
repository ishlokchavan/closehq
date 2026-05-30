'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence, useInView, animate, type Variants } from 'framer-motion';
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
  Grid2x2,
  ScrollText,
  Play,
  Banknote,
  UserPlus,
  Send,
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

/* ----------------- TOOLS (phone app mock + value bento) ----------------- */

/* Tabs the in-phone screen auto-cycles through. Each carries its own little
   in-screen visual so the loop feels like a real app flipping documents. */
const phoneTabs = [
  { icon: <Grid2x2 size={15} strokeWidth={2.2} />, label: 'Floor' },
  { icon: <Map size={15} strokeWidth={2.2} />, label: 'Master' },
  { icon: <Banknote size={15} strokeWidth={2.2} />, label: 'Payment' },
  { icon: <ScrollText size={15} strokeWidth={2.2} />, label: 'Facts' },
];

/* The app screen: a phone that flips through project documents on a loop,
   with a tap ripple landing on the active tab. Pure CSS/SVG, no images —
   reads as a live app without a line of explanation. */
function PhoneMock() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % phoneTabs.length), 2200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className={styles.phone} aria-hidden="true">
      <div className={styles.phoneNotch} />
      <div className={styles.phoneScreen}>
        {/* app header */}
        <div className={styles.phoneHead}>
          <span className={styles.phoneDev}>EMAAR</span>
          <span className={styles.phoneProj}>Creek Vista</span>
          <span className={styles.phoneVerified}>
            <BadgeCheck size={11} strokeWidth={2.6} /> Verified
          </span>
        </div>

        {/* document tabs — active one highlights on the loop */}
        <div className={styles.phoneTabs}>
          {phoneTabs.map((t, i) => (
            <span
              key={t.label}
              className={`${styles.phoneTab} ${i === active ? styles.phoneTabOn : ''}`}
            >
              {t.icon}
              {t.label}
            </span>
          ))}
          {/* tap ripple that travels to the active tab */}
          <motion.span
            className={styles.phoneTap}
            animate={{
              left: `calc(${(active + 0.5) * (100 / phoneTabs.length)}% - 14px)`,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          >
            <motion.span
              className={styles.phoneTapRing}
              key={active}
              initial={{ scale: 0.4, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
            />
          </motion.span>
        </div>

        {/* content preview swaps per active tab */}
        <div className={styles.phoneBody}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.phaseInner}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease }}
            >
              {active === 0 && (
                /* Floor plan: a little unit layout grid */
                <div className={styles.phFloor}>
                  <span style={{ gridArea: '1 / 1 / 3 / 3' }} />
                  <span style={{ gridArea: '1 / 3 / 2 / 5' }} />
                  <span style={{ gridArea: '2 / 3 / 4 / 4' }} />
                  <span style={{ gridArea: '2 / 4 / 3 / 5' }} />
                  <span style={{ gridArea: '3 / 1 / 4 / 3' }} />
                  <span style={{ gridArea: '3 / 4 / 4 / 5' }} />
                </div>
              )}
              {active === 1 && (
                /* Master plan: clustered plots + a road */
                <div className={styles.phMaster}>
                  {Array.from({ length: 12 }).map((_, k) => (
                    <span key={k} data-x={k % 4} />
                  ))}
                </div>
              )}
              {active === 2 && (
                /* Payment plan: milestone bars */
                <div className={styles.phPay}>
                  {[
                    ['On booking', 20],
                    ['Construction', 40],
                    ['Handover', 40],
                  ].map(([k, v]) => (
                    <div className={styles.phPayRow} key={k as string}>
                      <span>{k}</span>
                      <span className={styles.phPayTrack}>
                        <motion.span
                          className={styles.phPayFill}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: (v as number) / 40 }}
                          transition={{ duration: 0.6, ease }}
                        />
                      </span>
                      <b>{v}%</b>
                    </div>
                  ))}
                </div>
              )}
              {active === 3 && (
                /* Factsheet: key/value spec rows */
                <div className={styles.phFacts}>
                  {[
                    ['Handover', 'Q4 2027'],
                    ['Size', '1,240 sqft'],
                    ['Price', 'AED 2.4M'],
                    ['Net yield', '8.6%'],
                  ].map(([k, v]) => (
                    <div className={styles.phFactRow} key={k}>
                      <span>{k}</span>
                      <b>{v}</b>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

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
          {/* Resource library — live app screen */}
          <motion.article
            className={`${styles.bentoCard} ${styles.bentoLib}`}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.55, ease }}
            {...cardHover}
          >
            <div className={styles.libGrid}>
              <div className={styles.libCopy}>
                <span className={styles.bentoEyebrow}>Everything, transparent</span>
                <h3 className={styles.bentoTitle}>Every document, every developer.</h3>
                <p className={styles.bentoFoot}>
                  Brochures, master &amp; cluster plans, factsheets, payment
                  plans. The full broker brief in your pocket.
                </p>
              </div>
              <PhoneMock />
            </div>
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
                { dev: 'Emaar', topic: 'Dubai Creek Harbour', meta: '9 min' },
                { dev: 'DAMAC', topic: 'Payment plan deep-dive', meta: '11 min' },
                { dev: 'Sobha', topic: 'Hartland II launch', meta: '8 min' },
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

/* ----------------- STEP FLOW (auto-advancing app demo) ----------------- */
const flowSteps = ['Register', 'Access', 'Inquire', 'Buy'];

/* Screen states, each a tiny in-app visual. The screen auto-advances through
   register -> platform -> inquiry (off-plan/secondary) -> close, looping so
   it reads like a screen-recording of the real app. Minimal text by design. */
function FlowScreen({ active }: { active: number }) {
  if (active === 0) {
    return (
      <div className={styles.fsBox}>
        <span className={styles.fsIcon}>
          <UserPlus size={18} strokeWidth={2.2} />
        </span>
        <span className={styles.fsHint}>Create your account</span>
        <div className={styles.fsField}>you@email.com</div>
        <div className={styles.fsBtn}>
          Register <Check size={14} strokeWidth={3} />
        </div>
        <span className={styles.fsNote}>Free · 60 seconds</span>
      </div>
    );
  }
  if (active === 1) {
    return (
      <div className={styles.fsBox}>
        <span className={styles.fsHint}>Your platform</span>
        <div className={styles.fsProjs}>
          {['Creek Vista', 'Marina Shores', 'Hartland II'].map((p, i) => (
            <motion.div
              className={styles.fsProj}
              key={p}
              initial={{ opacity: 0, x: 14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 + i * 0.12, ease }}
            >
              <span className={styles.fsProjThumb} />
              <span className={styles.fsProjMeta}>
                <b>{p}</b>
                <i>Off-plan · from AED 1.4M</i>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }
  if (active === 2) {
    return (
      <div className={styles.fsBox}>
        <span className={styles.fsHint}>New inquiry</span>
        <div className={styles.fsProj}>
          <span className={styles.fsProjThumb} />
          <span className={styles.fsProjMeta}>
            <b>Creek Vista · Unit 1204</b>
            <i>2BR · 1,240 sqft</i>
          </span>
        </div>
        <div className={styles.fsToggle}>
          <motion.span
            className={styles.fsToggleKnob}
            initial={false}
            animate={{ left: '4px' }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          />
          <span className={`${styles.fsToggleOpt} ${styles.fsToggleOn}`}>Off-plan</span>
          <span className={styles.fsToggleOpt}>Secondary</span>
        </div>
        <div className={styles.fsBtn}>
          Send inquiry <Send size={13} strokeWidth={2.4} />
        </div>
      </div>
    );
  }
  return (
    <div className={styles.fsBox}>
      <span className={styles.fsHint}>You close</span>
      <div className={styles.fsWin}>
        <span className={styles.fsWinTag}>
          <Building2 size={12} strokeWidth={2.4} /> Off-plan
        </span>
        <span className={styles.fsWinVal}>100% cashback</span>
      </div>
      <div className={styles.fsWin}>
        <span className={styles.fsWinTag}>
          <RotateCcw size={12} strokeWidth={2.4} /> Secondary
        </span>
        <span className={styles.fsWinVal}>AED 0 you pay</span>
      </div>
    </div>
  );
}

export function BuyerSteps() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduce) {
      setActive(3);
      return;
    }
    const id = setInterval(() => setActive((a) => (a + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [reduce]);

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
          <h2 className={styles.stepsHeading}>From sign-up to keys.</h2>
          <p className={styles.stepsSub}>
            Four steps, in your favour at every stage.
          </p>
        </motion.div>

        <motion.div
          className={styles.flow}
          initial={{ opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={inView}
          transition={{ duration: 0.6, ease }}
        >
          {/* App screen */}
          <div className={styles.flowPhone} aria-hidden="true">
            <div className={styles.flowNotch} />
            <div className={styles.flowScreen}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className={styles.flowState}
                  initial={{ opacity: 0, x: 26 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -26 }}
                  transition={{ duration: 0.35, ease }}
                >
                  <FlowScreen active={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step rail */}
          <div className={styles.flowRail}>
            <span className={styles.flowLine}>
              <motion.span
                className={styles.flowLineFill}
                animate={{ width: `${(active / 3) * 100}%` }}
                transition={{ duration: 0.5, ease }}
              />
            </span>
            <div className={styles.flowDots}>
              {flowSteps.map((label, i) => (
                <button
                  type="button"
                  key={label}
                  className={`${styles.flowDotItem} ${i <= active ? styles.flowDotOn : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={label}
                >
                  <span className={styles.flowDot}>
                    {i < active ? <Check size={13} strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={styles.flowDotLabel}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
