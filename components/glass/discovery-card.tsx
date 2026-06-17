'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  Share2,
  X,
  Info,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  BadgeCheck,
  Coins,
  Sparkles,
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed, formatCredits } from '@/lib/glass/experience-data';
import { deterministicReason, likedPhrases } from '@/lib/glass/explain';
import { useSignals } from './signal-store';
import { SmartImage } from './smart-image';

function haptic(ms = 12) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* no-op */
    }
  }
}

export function DiscoveryCard({
  listing,
  active,
  saved,
  onToggleSave,
  onDislike,
  onShare,
  onDetails,
  headerOffset,
}: {
  listing: ExperienceListing;
  active: boolean;
  saved: boolean;
  onToggleSave: () => void;
  onDislike: () => void;
  onShare: () => void;
  onDetails: () => void;
  headerOffset: string;
}) {
  const [photo, setPhoto] = useState(0);
  const [burst, setBurst] = useState(0);
  const lastTap = useRef(0);
  const href = `/experience/property/${listing.reference}`;
  const count = listing.images.length;

  const { affinity } = useSignals();
  const [whyOpen, setWhyOpen] = useState(false);
  const [aiReason, setAiReason] = useState<string | null>(null);
  const fetched = useRef(false);

  async function openWhy() {
    setWhyOpen((o) => !o);
    if (fetched.current) return;
    fetched.current = true;
    try {
      const res = await fetch('/api/glass/why', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          liked: likedPhrases(affinity),
          listing: {
            title: listing.title,
            community: listing.community,
            city: listing.city,
            type: listing.propertyType,
            beds: listing.bedrooms,
            price: formatAed(listing.priceAed),
            hook: listing.hook,
            credits: formatCredits(listing.credit.credits),
          },
        }),
      });
      const data = (await res.json()) as { reason: string | null };
      if (data.reason) setAiReason(data.reason);
    } catch {
      /* keep the deterministic reason */
    }
  }

  function onPhotoTap(e: React.MouseEvent<HTMLDivElement>) {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      if (!saved) {
        onToggleSave();
        haptic(18);
      }
      setBurst((b) => b + 1);
      lastTap.current = 0;
      return;
    }
    lastTap.current = now;
    if (count > 1) {
      const { left, width } = e.currentTarget.getBoundingClientRect();
      const isLeft = e.clientX - left < width / 2;
      setPhoto((p) => (isLeft ? (p - 1 + count) % count : (p + 1) % count));
    }
  }

  return (
    <article className="lg-snap-start relative h-[100svh] w-full snap-start overflow-hidden bg-paper">
      <div
        className={`flex h-full flex-col transition-[filter,transform,opacity] duration-300 ${
          active ? '' : 'scale-[0.97] opacity-60 blur-[7px]'
        }`}
        style={{ paddingTop: headerOffset }}
      >
        {/* Media (≈3/4 height) */}
        <div
          className="relative flex-1 cursor-pointer select-none overflow-hidden bg-mist"
          onClick={onPhotoTap}
        >
          {listing.images.map((src, i) => (
            <SmartImage
              key={src + i}
              src={src}
              alt={listing.title}
              fill
              priority={i === 0 && active}
              sizes="(max-width: 520px) 100vw, 520px"
              className={`object-cover transition-opacity duration-300 ${
                i === photo ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 lg-scrim-t" />

          {/* carousel progress */}
          {count > 1 && (
            <div className="pointer-events-none absolute inset-x-4 top-3 flex gap-1.5">
              {listing.images.map((src, i) => (
                <span
                  key={src + i}
                  className={`h-[3px] flex-1 rounded-full ${
                    i === photo ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}

          {/* chips */}
          <div className="pointer-events-none absolute inset-x-4 top-5 flex items-center gap-2">
            <span className="lg-glass-light rounded-full px-2.5 py-1 text-[11.5px] font-medium text-ink">
              {listing.hook}
            </span>
            {listing.isVerified && (
              <span className="lg-glass-light flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium text-ink">
                <BadgeCheck className="h-3.5 w-3.5 text-journey-listing" /> Verified
              </span>
            )}
          </div>

          {/* TikTok-style right action rail */}
          <div className="absolute bottom-5 right-3 flex flex-col items-center gap-4">
            <RailButton
              label={saved ? 'Saved' : 'Save'}
              onClick={() => {
                onToggleSave();
                haptic(14);
              }}
            >
              <Heart
                className={`h-7 w-7 ${saved ? 'fill-rose-500 text-rose-500' : 'text-white'}`}
              />
            </RailButton>
            <RailButton label="Share" onClick={onShare}>
              <Share2 className="h-[26px] w-[26px] text-white" />
            </RailButton>
            <RailButton label="Not for me" onClick={onDislike}>
              <X className="h-7 w-7 text-white" strokeWidth={2.4} />
            </RailButton>
            <Link href={href} onClick={onDetails} aria-label="Details" className="active:scale-90">
              <span className="flex flex-col items-center gap-1">
                <Info className="h-[26px] w-[26px] text-white drop-shadow" />
                <span className="text-[11px] font-medium text-white drop-shadow">Info</span>
              </span>
            </Link>
          </div>

          {/* double-tap burst */}
          <AnimatePresence>
            {burst > 0 && (
              <motion.div
                key={burst}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.25, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <Heart className="h-28 w-28 fill-white text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info sheet (≈1/4) */}
        <div className="shrink-0 px-4 pb-[max(96px,calc(env(safe-area-inset-bottom)+88px))] pt-3">
          <Link href={href} onClick={onDetails}>
            <div className="flex items-center gap-2.5">
              <p className="text-[24px] font-semibold leading-none tracking-tight text-ink">
                {formatAed(listing.priceAed)}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[12.5px] font-semibold text-accent">
                <Coins className="h-3.5 w-3.5" /> {formatCredits(listing.credit.credits)} credits
              </span>
            </div>
            <h2 className="mt-1.5 line-clamp-1 text-[15px] font-medium text-ink">
              {listing.title}
            </h2>
            <p className="mt-0.5 flex items-center gap-1 text-[13px] text-graphite">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">
                {[listing.building, listing.community, listing.city]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </p>
            <div className="mt-2 flex items-center gap-4 text-[13px] text-graphite-dark">
              {listing.bedrooms !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <BedDouble className="h-4 w-4" />
                  {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms}
                </span>
              )}
              {listing.bathrooms !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <Bath className="h-4 w-4" />
                  {listing.bathrooms}
                </span>
              )}
              {listing.areaSqft !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <Maximize className="h-4 w-4" />
                  {listing.areaSqft.toLocaleString('en-US')} sqft
                </span>
              )}
            </div>
          </Link>

          {/* Why this fits you */}
          <button
            type="button"
            onClick={openWhy}
            aria-expanded={whyOpen}
            className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-mist px-3 py-1.5 text-[12.5px] font-medium text-graphite-dark active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Why this fits you
          </button>
          {whyOpen && (
            <p className="mt-2 rounded-2xl border border-accent/15 bg-accent/[0.06] px-3 py-2 text-[13px] leading-snug text-ink">
              {aiReason ?? deterministicReason(affinity, listing)}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

function RailButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex flex-col items-center gap-1 active:scale-90"
    >
      <span className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">{children}</span>
      <span className="text-[11px] font-medium text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
        {label}
      </span>
    </button>
  );
}
