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
