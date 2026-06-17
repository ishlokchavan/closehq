'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BadgePercent,
  Coins,
  ShieldCheck,
  Building2,
  Home,
  Tag,
  Handshake,
} from 'lucide-react';
import { SmartImage } from './smart-image';

const INTRO_KEY = 'closehq.glass.intro.v1';
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7';

const HERO_IMG = `${CDN}/hf_20260617_003721_84f0c343-e903-4323-a3da-3cc2b40e1caf.png`;
const BUY_IMG = `${CDN}/hf_20260616_222225_d0f4e2b8-36a6-46aa-9625-324f1714414c.png`;
const SELL_IMG = `${CDN}/hf_20260616_222230_e9003974-fd28-47cb-9667-44b1485ce165.png`;
const CLOSE_IMG = `${CDN}/hf_20260616_222236_b69f84e1-cbcb-452d-841d-63c07a0ada81.png`;

const DO_CARDS = [
  { img: BUY_IMG, Icon: Home, label: 'Buy', badge: '0% commission · 100% cashback', line: 'Earn credits worth real money on every home.' },
  { img: SELL_IMG, Icon: Tag, label: 'Sell', badge: 'List free', line: 'Sell direct to buyers, without paying commission.' },
  { img: CLOSE_IMG, Icon: Handshake, label: 'Close', badge: 'Keep 100%', line: 'List or close a deal and keep the full commission.' },
];

const USPS = [
  { Icon: BadgePercent, title: 'Zero commission', line: 'Buy, sell or close — you never pay a cut.' },
  { Icon: Coins, title: 'Cashback credits', line: 'Earn iClose credits worth real money on every deal.' },
  { Icon: ShieldCheck, title: 'Verified listings', line: 'Real, RERA-checked homes. No fake leads.' },
  { Icon: Building2, title: 'Off-plan launches', line: 'Early access and special pricing on new launches.' },
];

const STEPS = 3;

/**
 * First-run brand intro — a swipeable "what / who / what's-in-it" story shown
 * once, before the taste picker. Three purpose-built slides: the commission
 * headline, what you can do (buy/sell/close), and the platform USPs.
 * Self-contained (own localStorage flag, no route dependency).
 */
export function IntroStory() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(INTRO_KEY)) setOpen(true);
    } catch {
      /* storage unavailable — skip the intro */
    }
  }, []);

  if (!open) return null;

  function finish() {
    try {
      localStorage.setItem(INTRO_KEY, '1');
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  function go(n: number) {
    const el = ref.current;
    if (el) el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' });
  }

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const n = Math.round(el.scrollLeft / el.clientWidth);
    if (n !== idx) setIdx(n);
  }

  const last = idx === STEPS - 1;

  return (
    <div className="absolute inset-0 z-[80] bg-black text-white">
      {/* progress bars + skip */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-3 px-5 pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex flex-1 gap-1.5">
          {Array.from({ length: STEPS }).map((_, i) => (
            <span
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-colors ${i <= idx ? 'bg-white' : 'bg-white/30'}`}
            />
          ))}
        </div>
        <button type="button" onClick={finish} className="text-[13px] font-medium text-white/80 active:scale-95">
          Skip
        </button>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        style={{ touchAction: 'pan-x' }}
      >
        {/* ── Slide 1 · Hero headline ───────────────────────────── */}
        <section className="relative h-full w-full shrink-0 snap-center">
          <SmartImage src={HERO_IMG} alt="" fill priority sizes="(max-width: 520px) 100vw, 520px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/40" />
          <div className="absolute inset-x-0 bottom-44 px-7">
            <span className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/70">iClose</span>
            <h1 className="mt-3 text-[34px] font-semibold leading-[1.08] tracking-tight">
              Never Pay Commission to <span className="text-accent">Buy</span>,{' '}
              <span className="text-accent">Sell</span>, Or <span className="text-accent">Close</span> Ever Again!
            </h1>
            <p className="mt-3 text-[15px] text-white/75">
              The commission-free way to move property in the UAE.
            </p>
          </div>
        </section>

        {/* ── Slide 2 · What you can do ─────────────────────────── */}
        <section className="relative h-full w-full shrink-0 snap-center overflow-hidden bg-ink">
          <div className="flex h-full flex-col px-6 pb-40 pt-[max(64px,calc(env(safe-area-inset-top)+52px))]">
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight">
              One app. Three ways to win.
            </h2>
            <p className="mt-1.5 text-[15px] text-white/65">Whichever side you’re on, the cut stays yours.</p>

            <div className="mt-6 flex flex-col gap-3">
              {DO_CARDS.map(({ img, Icon, label, badge, line }) => (
                <div key={label} className="relative h-[104px] overflow-hidden rounded-3xl">
                  <SmartImage src={img} alt="" fill sizes="(max-width: 520px) 100vw, 520px" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
                  <div className="absolute inset-0 flex flex-col justify-center gap-1 px-5">
                    <div className="flex items-center gap-2">
                      <Icon className="h-[18px] w-[18px] text-white" />
                      <span className="text-[19px] font-semibold tracking-tight">{label}</span>
                      <span className="rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-ink">{badge}</span>
                    </div>
                    <p className="max-w-[17rem] text-[13px] text-white/80">{line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Slide 3 · Why iClose (USPs) ───────────────────────── */}
        <section className="relative h-full w-full shrink-0 snap-center overflow-hidden bg-ink">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/25 blur-[120px]" />
          <div className="flex h-full flex-col px-6 pb-40 pt-[max(64px,calc(env(safe-area-inset-top)+52px))]">
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight">Why iClose?</h2>
            <p className="mt-1.5 text-[15px] text-white/65">Built to put money back in your pocket.</p>

            <div className="mt-6 flex flex-col gap-3.5">
              {USPS.map(({ Icon, title, line }) => (
                <div key={title} className="flex items-start gap-3.5 rounded-2xl bg-white/[0.06] p-3.5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/20 text-accent">
                    <Icon className="h-[22px] w-[22px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold tracking-tight">{title}</p>
                    <p className="text-[13.5px] leading-snug text-white/70">{line}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* bottom control */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-7 pb-[max(26px,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => (last ? finish() : go(idx + 1))}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-[16px] font-semibold text-ink active:scale-[0.99]"
        >
          {last ? 'Start exploring' : 'Next'}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
