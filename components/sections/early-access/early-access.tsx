'use client';

import { useState, type FormEvent } from 'react';
import styles from './early-access.module.css';

type Audience = 'buyers' | 'agents';

const CONTENT: Record<
  Audience,
  {
    headline1: string;
    headline2: string;
    sub: string;
    proof: string;
    disclaimer: string;
    /* Front phone home screen — audience specific: agents see the
       commission-earned view, buyers see the commission-saved view. */
    homeImg: string;
    homeAlt: string;
  }
> = {
  agents: {
    headline1: 'Tired of splitting commission',
    headline2: 'on your personal leads?',
    sub: "Stop splitting your hard-earned money. Over 300 agents from the UAE's top agencies are already keeping 100% of their commission on every single deal. Join them and maximize your earnings with iClose today.",
    proof: '300+ UAE agents keeping 100% of their commission',
    disclaimer:
      'Your privacy is our top priority. We use protocol Sian-2025, a military-grade security system to keep you anonymous.',
    homeImg: '/images/early-access-home.png',
    homeAlt: 'iClose agent home showing commission earned',
  },
  buyers: {
    headline1: 'Want to buy real estate',
    headline2: 'without involving an agent?',
    sub: "Already know what you want to buy? Skip the agent fees. We'll close your ready or off-plan deal directly and secure exclusive agent-free discounts you can't get anywhere else.",
    proof: '0% commission on secondary · up to 12% credit back on off‑plan',
    disclaimer:
      'We buy properties we cannot sell within 90 days. (Terms and conditions apply)',
    homeImg: '/images/early-access-home-buyer.png',
    homeAlt: 'iClose buyer home showing estimated commission saved',
  },
};

export function EarlyAccess() {
  const [audience, setAudience] = useState<Audience>('buyers');
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const c = CONTENT[audience];

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/early-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, audience }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || 'Something went wrong. Please try again.');
      }
      setJoined(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.shell}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            iClose<span style={{ color: '#c6ff3d' }}>.</span>
          </div>
          <div className={styles.navLinks}>
            <button
              type="button"
              onClick={() => setAudience('agents')}
              className={`${styles.navBtn} ${
                audience === 'agents' ? styles.navBtnActive : ''
              }`}
            >
              <span className={styles.forPrefix}>For </span>Agents
            </button>
            <span className={styles.navSep} aria-hidden="true">
              •
            </span>
            <button
              type="button"
              onClick={() => setAudience('buyers')}
              className={`${styles.navBtn} ${
                audience === 'buyers' ? styles.navBtnActive : ''
              }`}
            >
              <span className={styles.forPrefix}>For </span>Buyers
            </button>
          </div>
        </nav>

        <div className={styles.heroGrid}>
          <div className={styles.copyCol}>
            <div className={styles.copyText}>
              <div className={styles.badge}>
                <span className={styles.badgeDot} />
                Early access · iOS
              </div>

              <h1 className={styles.h1}>
                <span className={styles.h1Line1}>{c.headline1}</span>
                <span className={styles.h1Line2}>{c.headline2}</span>
              </h1>
            </div>

            <div className={styles.copyCta}>
            <p className={styles.sub}>{c.sub}</p>

            <div id="early" className={styles.earlyWrap}>
              {joined ? (
                <div className={styles.joinedCard}>
                  <span className={styles.joinedTick}>✓</span>
                  <span className={styles.joinedText}>
                    You&apos;re on the list. We&apos;ll email your invite.
                  </span>
                </div>
              ) : (
                <form className={styles.form} onSubmit={submit} noValidate>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                  />
                  <button
                    type="submit"
                    className={styles.submit}
                    disabled={submitting}
                  >
                    {submitting ? 'Sending…' : 'Get Early Access'}
                  </button>
                  {error && <p className={styles.formError}>{error}</p>}
                </form>
              )}
            </div>

            <div className={styles.storeRow}>
              <a href="#early" className={styles.storeBtn}>
                <svg
                  width="22"
                  height="26"
                  viewBox="0 0 20 24"
                  fill="#fff"
                  aria-hidden="true"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <span className={styles.storeMeta}>
                  <span className={styles.storeSmall}>Available on the</span>
                  <span className={styles.storeBig}>App Store</span>
                </span>
              </a>
              <span className={styles.storeNote}>Android coming soon</span>
            </div>
          </div>

            <div className={styles.copyFoot}>
              <div className={styles.proof}>
                <span className={styles.proofDot} />
                {c.proof}
              </div>

              <p className={styles.disclaimer}>{c.disclaimer}</p>
            </div>
          </div>

          <div className={styles.phoneStack}>
            <div className={styles.phoneScene}>
              <div aria-hidden="true" className={styles.glow} />
              <div className={styles.phoneA}>
                <div className={styles.tiltA}>
                  <div className={styles.frameOuterA}>
                    <div className={styles.frameInner}>
                      <div className={styles.screen}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/images/early-access-calculator.png"
                          alt="iClose commission calculator"
                          className={styles.screenImg}
                        />
                        <div className={styles.notch}>
                          <span className={styles.notchCam} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.phoneB}>
                <div className={styles.tiltB}>
                  <div className={styles.frameOuterB}>
                    <div className={styles.frameInner}>
                      <div className={styles.screen}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={c.homeImg}
                          alt={c.homeAlt}
                          className={styles.screenImg}
                        />
                        <div className={styles.notch}>
                          <span className={styles.notchCam} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
