'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Info,
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed } from '@/lib/glass/experience-data';

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

  const rotate = useTransform(x, [-220, 220], [-9, 9]);
  const likeOpacity = useTransform(x, [20, 130], [0, 1]);
  const passOpacity = useTransform(x, [-20, -130], [0, 1]);
  const tintLike = useTransform(x, [0, 160], [0, 0.32]);
  const tintPass = useTransform(x, [0, -160], [0, 0.32]);

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
    <motion.article
      className="lg-snap-start relative flex h-[100svh] w-full snap-start items-stretch justify-center overflow-hidden"
    >
      {/* Draggable card layer. touch-action pan-y keeps vertical feed scroll. */}
      <motion.div
        className="relative h-full w-full"
        style={{ x, rotate, touchAction: 'pan-y' }}
        drag="x"
        dragDirectionLock
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.6}
        onDragEnd={onDragEnd}
      >
        {/* Gallery */}
        <div
          className="absolute inset-0 cursor-pointer select-none"
          onClick={tapGallery}
        >
          {listing.gallery.map((src, i) => (
            <Image
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
        </div>

        {/* Drag tints */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-journey-listing"
          style={{ opacity: tintLike }}
        />
        <motion.div
          className="pointer-events-none absolute inset-0 bg-rose-500"
          style={{ opacity: tintPass }}
        />

        {/* Scrims for legibility */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-44 lg-scrim-t" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] lg-scrim-b" />

        {/* Gallery progress */}
        <div className="pointer-events-none absolute inset-x-4 top-3 flex gap-1.5">
          {listing.gallery.map((src, i) => (
            <span
              key={src}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i === photo ? 'bg-white' : 'bg-white/35'
              }`}
            />
          ))}
        </div>

        {/* Top chips */}
        <div className="pointer-events-none absolute inset-x-4 top-7 flex items-center justify-between">
          <span className="lg-glass-dark rounded-full px-3 py-1.5 text-[12px] font-medium tracking-tight text-white">
            {listing.hook}
          </span>
          {listing.isVerified && (
            <span className="lg-glass-dark flex items-center gap-1 rounded-full px-2.5 py-1.5 text-[12px] font-medium text-white">
              <BadgeCheck className="h-4 w-4 text-journey-seller" aria-hidden />
              Verified
            </span>
          )}
        </div>

        {/* LIKE / PASS stamps */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="pointer-events-none absolute left-6 top-24 -rotate-12 rounded-2xl border-[3px] border-journey-listing px-4 py-1.5 text-3xl font-extrabold tracking-tight text-journey-listing"
        >
          SAVE
        </motion.div>
        <motion.div
          style={{ opacity: passOpacity }}
          className="pointer-events-none absolute right-6 top-24 rotate-12 rounded-2xl border-[3px] border-rose-400 px-4 py-1.5 text-3xl font-extrabold tracking-tight text-rose-400"
        >
          PASS
        </motion.div>

        {/* Decided badge */}
        {decided && (
          <div className="pointer-events-none absolute right-4 top-20 lg-animate-pop">
            <span
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold ${
                decided === 'saved'
                  ? 'bg-journey-listing text-ink'
                  : 'lg-glass-dark text-white/80'
              }`}
            >
              {decided === 'saved' ? (
                <>
                  <Heart className="h-4 w-4 fill-ink" aria-hidden /> Shortlisted
                </>
              ) : (
                <>
                  <X className="h-4 w-4" aria-hidden /> Passed
                </>
              )}
            </span>
          </div>
        )}

        {/* Info block */}
        <div className="absolute inset-x-0 bottom-0 px-5 pb-36">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[28px] font-semibold leading-none tracking-tight text-white">
                {formatAed(listing.priceAed)}
              </p>
              <h2 className="mt-2 line-clamp-2 text-[17px] font-medium leading-snug text-white/95">
                {listing.title}
              </h2>
              <p className="mt-1.5 flex items-center gap-1 text-[14px] text-white/75">
                <MapPin className="h-3.5 w-3.5" aria-hidden />
                {listing.community}, {listing.city}
              </p>
            </div>
            {listing.developerLogo && (
              <span className="lg-glass shrink-0 rounded-2xl p-2">
                <Image
                  src={listing.developerLogo}
                  alt={listing.developerName ?? ''}
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
              </span>
            )}
          </div>

          {/* Spec chips */}
          <div className="mt-4 flex flex-wrap gap-2">
            {listing.bedrooms !== null && (
              <Spec icon={<BedDouble className="h-4 w-4" />}>
                {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bed`}
              </Spec>
            )}
            {listing.bathrooms !== null && (
              <Spec icon={<Bath className="h-4 w-4" />}>{listing.bathrooms} bath</Spec>
            )}
            {listing.areaSqft !== null && (
              <Spec icon={<Maximize className="h-4 w-4" />}>
                {listing.areaSqft.toLocaleString()} sqft
              </Spec>
            )}
          </div>
        </div>
      </motion.div>

      {/* Action rail (over the card, not draggable) */}
      <div className="pointer-events-none absolute bottom-36 right-4 z-10 flex flex-col items-center gap-3">
        <ActionButton label="Pass" onClick={() => commit('passed')} tone="dark">
          <X className="h-6 w-6" strokeWidth={2.4} />
        </ActionButton>
        <Link
          href={`/experience/property/${listing.reference}`}
          className="pointer-events-auto lg-glass-strong lg-specular flex h-12 w-12 items-center justify-center rounded-full text-white active:scale-95"
          aria-label="View details"
        >
          <Info className="h-5 w-5" />
        </Link>
        <ActionButton
          label="Shortlist"
          onClick={() => commit('saved')}
          tone="like"
        >
          <Heart
            className={`h-7 w-7 ${decided === 'saved' ? 'fill-ink' : ''}`}
            strokeWidth={2.2}
          />
        </ActionButton>
      </div>
    </motion.article>
  );
}

function Spec({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <span className="lg-glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium text-white">
      {icon}
      {children}
    </span>
  );
}

function ActionButton({
  children,
  label,
  onClick,
  tone,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  tone: 'dark' | 'like';
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`pointer-events-auto lg-specular flex items-center justify-center rounded-full transition-transform active:scale-90 ${
        tone === 'like'
          ? 'h-16 w-16 bg-journey-listing text-ink shadow-[0_8px_28px_rgba(90,224,155,0.5)]'
          : 'lg-glass-strong h-14 w-14 text-white'
      }`}
    >
      {children}
    </button>
  );
}
