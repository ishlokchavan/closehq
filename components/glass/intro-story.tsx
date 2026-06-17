'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Coins, ShieldCheck } from 'lucide-react';
import { SmartImage } from './smart-image';

const INTRO_KEY = 'closehq.glass.intro.v1';
const CDN = 'https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7';

const SLIDES = [
  {
    img: `${CDN}/hf_20260616_222225_d0f4e2b8-36a6-46aa-9625-324f1714414c.png`,
    eyebrow: 'Welcome to iClose',
    title: 'Buy, sell & close — without ever paying commission.',
    sub: '0% commission. 100% cashback. On every deal.',
    Icon: BadgeCheck,
  },
  {
    img: `${CDN}/hf_20260616_222230_e9003974-fd28-47cb-9667-44b1485ce165.png`,
    eyebrow: 'iClose credits',
    title: 'Earn real cashback on every home.',
    sub: 'Collect iClose credits toward your purchase — yours to keep.',
    Icon: Coins,
  },
  {
    img: `${CDN}/hf_20260616_222236_b69f84e1-cbcb-452d-841d-63c07a0ada81.png`,
    eyebrow: 'End to end',
    title: 'Verified homes. The whole deal in one place.',
    sub: 'View, offer and close — and deal with the seller direct.',
    Icon: ShieldCheck,
  },
];

/**
 * First-run brand intro — a 10-second, swipeable "what & why" story shown once,
 * before the taste picker. Self-contained (its own localStorage flag, no route
 * dependency), so it works wherever the experience lives. "How it works" deep-
 * links to the full explainer for anyone who wants depth.
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

  const last = idx === SLIDES.length - 1;

  return (
    <div className="absolute inset-0 z-[80] bg-black">
      {/* progress bars + skip */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-center gap-3 px-5 pt-[max(16px,env(safe-area-inset-top))]">
        <div className="flex flex-1 gap-1.5">
          {SLIDES.map((s, i) => (
            <span
              key={s.title}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i <= idx ? 'bg-white' : 'bg-white/35'
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={finish}
          className="text-[13px] font-medium text-white/80 active:scale-95"
        >
          Skip
        </button>
      </div>

      <div
        ref={ref}
        onScroll={onScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        style={{ touchAction: 'pan-x' }}
      >
        {SLIDES.map(({ img, eyebrow, title, sub, Icon }) => (
          <div key={title} className="relative h-full w-full shrink-0 snap-center bg-black">
            <SmartImage src={img} alt="" fill priority sizes="(max-width: 520px) 100vw, 520px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/35" />
            <div className="absolute inset-x-0 bottom-44 px-7 text-white">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-[12px] font-semibold backdrop-blur-sm">
                <Icon className="h-3.5 w-3.5" /> {eyebrow}
              </span>
              <h2 className="mt-3 text-[30px] font-semibold leading-[1.12] tracking-tight">{title}</h2>
              <p className="mt-2.5 max-w-[19rem] text-[16px] leading-snug text-white/85">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* bottom controls */}
      <div className="absolute inset-x-0 bottom-0 px-7 pb-[max(26px,env(safe-area-inset-bottom))]">
        <button
          type="button"
          onClick={() => (last ? finish() : go(idx + 1))}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-white py-4 text-[16px] font-semibold text-ink active:scale-[0.99]"
        >
          {last ? 'Start exploring' : 'Next'}
          <ArrowRight className="h-[18px] w-[18px]" />
        </button>
        <div className="mt-3 text-center">
          <Link href="/for-buyers" className="text-[13px] font-medium text-white/70 underline-offset-4 hover:underline">
            How it works
          </Link>
        </div>
      </div>
    </div>
  );
}
