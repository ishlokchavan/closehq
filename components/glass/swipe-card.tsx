'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  type PanInfo,
} from 'framer-motion';
import {
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  BadgeCheck,
  Heart,
  X,
  Coins,
  ArrowUpRight,
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed, formatCredits } from '@/lib/glass/experience-data';
import { SmartImage } from './smart-image';

const SWIPE_THRESHOLD = 110;

function haptic(ms = 12) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      /* no-op */
    }
  }
}

export function SwipeCard({
  listing,
  decided,
  onSave,
  onPass,
}: {
  listing: ExperienceListing;
  decided: 'saved' | 'passed' | null;
  onSave: () => void;
  onPass: () => void;
}) {
  const [photo, setPhoto] = useState(0);
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-220, 220], [-7, 7]);
  const likeOpacity = useTransform(x, [20, 130], [0, 1]);
  const passOpacity = useTransform(x, [-20, -130], [0, 1]);

  const photoCount = listing.gallery.length;

  function commit(decision: 'saved' | 'passed') {
    haptic(decision === 'saved' ? 18 : 8);
    if (decision === 'saved') onSave();
    else onPass();
    animate(x, 0, { type: 'spring', stiffness: 320, damping: 30 });
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x > SWIPE_THRESHOLD) commit('saved');
    else if (info.offset.x < -SWIPE_THRESHOLD) commit('passed');
    else animate(x, 0, { type: 'spring', stiffness: 320, damping: 30 });
  }

  function tapGallery(e: React.MouseEvent<HTMLDivElement>) {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const isLeft = e.clientX - left < width / 2;
    setPhoto((p) =>
      isLeft ? (p - 1 + photoCount) % photoCount : (p + 1) % photoCount,
    );
  }

  return (
    <article className="lg-snap-start relative flex h-[100svh] w-full snap-start items-stretch justify-center overflow-hidden bg-mist">
      <motion.div
        className="relative h-full w-full"
        style={{ x, rotate, touchAction: 'pan-y' }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.55}
        onDragEnd={onDragEnd}
      >
        {/* Photo */}
        <div
          className="absolute inset-0 cursor-pointer select-none"
          onClick={tapGallery}
        >
          {listing.gallery.map((src, i) => (
            <SmartImage
              key={src}
              src={src}
              alt={listing.title}
              fill
              priority={i === 0}
              sizes="(max-width: 520px) 100vw, 460px"
              className={`object-cover transition-opacity duration-500 ${
                i === photo ? 'opacity-100' : 'opacity-0'
              }`}
              draggable={false}
            />
          ))}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 lg-scrim-t" />
        </div>

        {/* Gallery progress */}
        <div className="pointer-events-none absolute inset-x-4 top-[max(14px,env(safe-area-inset-top))] flex gap-1.5">
          {listing.gallery.map((src, i) => (
            <span
              key={src}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i === photo ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Top chips */}
        <div className="pointer-events-none absolute inset-x-4 top-9 flex items-center justify-between">
          <span className="lg-glass-light rounded-full px-3 py-1.5 text-[12px] font-medium tracking-tight text-ink">
            {listing.hook}
          </span>
          {listing.isVerified && (
            <span className="lg-glass-light flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-ink">
              <BadgeCheck className="h-4 w-4 text-journey-listing" aria-hidden />
              Verified
            </span>
          )}
        </div>

        {/* LIKE / PASS stamps */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute left-6 top-24 -rotate-12 rounded-2xl border-[3px] border-journey-listing bg-white/70 px-4 py-1.5 text-3xl font-extrabold tracking-tight text-journey-listing backdrop-blur"
        >
          SAVE
        </motion.div>
        <motion.div
          style={{ opacity: passOpacity }}
          className="pointer-events-none absolute right-6 top-24 rotate-12 rounded-2xl border-[3px] border-rose-400 bg-white/70 px-4 py-1.5 text-3xl font-extrabold tracking-tight text-rose-400 backdrop-blur"
        >
          PASS
        </motion.div>

        {/* White info sheet */}
        <div className="absolute inset-x-0 bottom-0">
          {/* Action rail straddles the seam */}
          <div className="relative z-20 mx-auto flex -translate-y-1/2 items-center justify-center gap-5">
            <ActionButton label="Pass" onClick={() => commit('passed')} variant="ghost">
              <X className="h-6 w-6" strokeWidth={2.4} />
            </ActionButton>
            <ActionButton label="Shortlist" onClick={() => commit('saved')} variant="save">
              <Heart
                className={`h-8 w-8 ${decided === 'saved' ? 'fill-white' : ''}`}
                strokeWidth={2.2}
              />
            </ActionButton>
            <Link
              href={`/experience/property/${listing.reference}`}
              aria-label="View details"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_6px_20px_rgba(0,0,0,0.18)] transition-transform active:scale-90"
            >
              <ArrowUpRight className="h-6 w-6" strokeWidth={2.2} />
            </Link>
          </div>

          <div className="lg-sheet -mt-7 rounded-t-[30px] px-5 pb-28 pt-4">
            {/* Price + credits */}
            <div className="flex items-end justify-between gap-3">
              <p className="text-[30px] font-semibold leading-none tracking-tight text-ink">
                {formatAed(listing.priceAed)}
              </p>
              {decided && (
                <span
                  className={`mb-1 rounded-full px-2.5 py-1 text-[12px] font-semibold ${
                    decided === 'saved'
                      ? 'bg-journey-listing/15 text-journey-listing'
                      : 'bg-mist text-graphite'
                  }`}
                >
                  {decided === 'saved' ? 'Shortlisted' : 'Passed'}
                </span>
              )}
            </div>

            {/* Credits hook */}
            <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5">
              <Coins className="h-4 w-4 text-accent" aria-hidden />
              <span className="text-[13.5px] font-semibold tracking-tight text-accent">
                Earn {formatCredits(listing.credit.credits)} credits
              </span>
            </div>

            <h2 className="mt-3 line-clamp-1 text-[16px] font-medium text-ink">
              {listing.title}
            </h2>
            <p className="mt-1 flex items-center gap-1 text-[13.5px] text-graphite">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
              <span className="line-clamp-1">
                {[listing.building, listing.community, listing.city]
                  .filter(Boolean)
                  .join(', ')}
              </span>
            </p>

            {/* Specs */}
            <div className="mt-3 flex items-center gap-4 border-t border-hairline/70 pt-3 text-[13.5px] text-graphite-dark">
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
        </div>
      </motion.div>
    </article>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  variant,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  variant: 'ghost' | 'save';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`flex items-center justify-center rounded-full transition-transform active:scale-90 ${
        variant === 'save'
          ? 'h-[68px] w-[68px] bg-ink text-white shadow-[0_10px_30px_rgba(0,0,0,0.30)]'
          : 'h-14 w-14 bg-white text-ink shadow-[0_6px_20px_rgba(0,0,0,0.18)]'
      }`}
    >
      {children}
    </button>
  );
}
