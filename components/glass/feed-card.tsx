'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  Share2,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  BadgeCheck,
  Coins,
  ChevronRight,
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed, formatCredits } from '@/lib/glass/experience-data';
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

export function FeedCard({
  listing,
  saved,
  onToggleSave,
}: {
  listing: ExperienceListing;
  saved: boolean;
  onToggleSave: () => void;
}) {
  const [burst, setBurst] = useState(0);
  const lastTap = useRef(0);
  const href = `/experience/property/${listing.reference}`;
  const who = listing.developerName ?? listing.agentName ?? 'iClose';

  function doubleTapToSave() {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      if (!saved) {
        onToggleSave();
        haptic(18);
      }
      setBurst((b) => b + 1);
    }
    lastTap.current = now;
  }

  return (
    <article className="border-b border-hairline/60 bg-paper pb-3">
      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-2.5">
        <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-mist text-[12px] font-semibold text-ink">
          {who
            .split(' ')
            .map((w) => w[0])
            .slice(0, 2)
            .join('')}
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-[13.5px] font-semibold text-ink">
            {listing.community}
          </p>
          <p className="truncate text-[12px] text-graphite">{listing.city}</p>
        </div>
        <span className="rounded-full bg-mist px-2.5 py-1 text-[11px] font-medium capitalize text-graphite-dark">
          {listing.completion === 'off_plan' ? 'Off-plan' : 'Ready'}
        </span>
      </div>

      {/* Media */}
      <div
        className="relative aspect-[4/5] w-full cursor-pointer select-none overflow-hidden bg-mist"
        onClick={doubleTapToSave}
      >
        <Link href={href} aria-label={listing.title}>
          <SmartImage
            src={listing.cover}
            alt={listing.title}
            fill
            sizes="(max-width: 520px) 100vw, 520px"
            className="object-cover"
            draggable={false}
          />
        </Link>

        {/* hook + verified chips */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between">
          <span className="lg-glass-light rounded-full px-2.5 py-1 text-[11.5px] font-medium text-ink">
            {listing.hook}
          </span>
          {listing.isVerified && (
            <span className="lg-glass-light flex items-center gap-1 rounded-full px-2 py-1 text-[11.5px] font-medium text-ink">
              <BadgeCheck className="h-3.5 w-3.5 text-journey-listing" /> Verified
            </span>
          )}
        </div>

        {/* double-tap heart burst */}
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
              <Heart className="h-24 w-24 fill-white text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 px-3.5 pt-3">
        <button
          type="button"
          onClick={onToggleSave}
          aria-label={saved ? 'Remove from saved' : 'Save'}
          className="active:scale-90"
        >
          <Heart
            className={`h-7 w-7 transition-colors ${
              saved ? 'fill-rose-500 text-rose-500' : 'text-ink'
            }`}
            strokeWidth={1.9}
          />
        </button>
        <button type="button" aria-label="Share" className="active:scale-90">
          <Share2 className="h-[25px] w-[25px] text-ink" strokeWidth={1.9} />
        </button>
        <Link
          href={href}
          className="ml-auto flex items-center gap-0.5 text-[13px] font-medium text-accent"
        >
          Details <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Info */}
      <div className="px-3.5 pt-2.5">
        <div className="flex items-center gap-2.5">
          <p className="text-[22px] font-semibold leading-none tracking-tight text-ink">
            {formatAed(listing.priceAed)}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-accent/10 px-2.5 py-1 text-[12.5px] font-semibold text-accent">
            <Coins className="h-3.5 w-3.5" /> {formatCredits(listing.credit.credits)} credits
          </span>
        </div>
        <h2 className="mt-1.5 line-clamp-1 text-[14.5px] font-medium text-ink">
          {listing.title}
        </h2>
        <p className="mt-0.5 flex items-center gap-1 text-[13px] text-graphite">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-1">
            {[listing.building, listing.community].filter(Boolean).join(', ')}
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
      </div>
    </article>
  );
}
