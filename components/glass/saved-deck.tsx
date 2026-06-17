'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, BedDouble, Maximize, Trash2, ArrowRight } from 'lucide-react';
import { EXPERIENCE_LISTINGS, formatAed } from '@/lib/glass/experience-data';
import { useSaved } from './saved-store';

export function SavedDeck() {
  const { savedRefs, decisions, pass } = useSaved();
  const [expanded, setExpanded] = useState(false);

  const saved = EXPERIENCE_LISTINGS.filter((l) => decisions[l.reference] === 'saved');

  return (
    <div className="no-scrollbar h-[100svh] overflow-y-scroll px-4 pb-40 pt-[max(20px,env(safe-area-inset-top))]">
      <header className="mb-5 mt-2 flex items-end justify-between">
        <div>
          <h1 className="text-[30px] font-semibold tracking-tight text-white">
            Shortlist
          </h1>
          <p className="mt-1 text-[14px] text-white/55">
            {saved.length === 0
              ? 'Homes you save will stack up here'
              : `${saved.length} ${saved.length === 1 ? 'home' : 'homes'} saved`}
          </p>
        </div>
        {saved.length > 1 && (
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="lg-glass rounded-full px-4 py-2 text-[13px] font-medium text-white active:scale-95"
          >
            {expanded ? 'Stack' : 'Spread'}
          </button>
        )}
      </header>

      {saved.length === 0 ? (
        <EmptyState />
      ) : (
        <div
          className="relative"
          style={{
            // When collapsed the cards overlap like a Wallet stack.
            height: expanded ? 'auto' : `${180 + (saved.length - 1) * 64}px`,
          }}
        >
          <AnimatePresence initial={false}>
            {saved.map((listing, i) => (
              <motion.div
                key={listing.reference}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={expanded ? 'mb-3' : 'absolute inset-x-0'}
                style={expanded ? undefined : { top: i * 64, zIndex: i }}
              >
                <SavedCard
                  reference={listing.reference}
                  title={listing.title}
                  price={formatAed(listing.priceAed)}
                  community={listing.community ?? ''}
                  city={listing.city}
                  beds={listing.bedrooms}
                  area={listing.areaSqft}
                  image={listing.gallery[0]}
                  onRemove={() => pass(listing.reference)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {saved.length > 0 && (
        <div className="mt-6">
          <Link
            href="/experience"
            className="lg-glass-strong lg-specular flex items-center justify-center gap-2 rounded-full py-4 text-[15px] font-semibold text-white active:scale-95"
          >
            Start a no-commission deal
            <ArrowRight className="h-[18px] w-[18px]" />
          </Link>
        </div>
      )}

      <p className="mt-3 text-center text-[12px] text-white/35">
        Saved locally on this device · {savedRefs.length} total
      </p>
    </div>
  );
}

function SavedCard({
  reference,
  title,
  price,
  community,
  city,
  beds,
  area,
  image,
  onRemove,
}: {
  reference: string;
  title: string;
  price: string;
  community: string;
  city: string;
  beds: number | null;
  area: number | null;
  image: string;
  onRemove: () => void;
}) {
  return (
    <div className="lg-glass lg-specular relative overflow-hidden rounded-[26px] p-3">
      <Link href={`/experience/property/${reference}`} className="flex gap-3">
        <div className="h-[120px] w-[110px] shrink-0 overflow-hidden rounded-2xl">
          <Image
            src={image}
            alt={title}
            width={220}
            height={240}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0 flex-1 py-1">
          <p className="text-[20px] font-semibold leading-none tracking-tight text-white">
            {price}
          </p>
          <h3 className="mt-1.5 line-clamp-2 text-[14px] font-medium leading-snug text-white/90">
            {title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-[12px] text-white/55">
            <MapPin className="h-3 w-3" /> {community}, {city}
          </p>
          <div className="mt-2 flex gap-3 text-[12px] text-white/70">
            {beds !== null && (
              <span className="flex items-center gap-1">
                <BedDouble className="h-3.5 w-3.5" />
                {beds === 0 ? 'Studio' : `${beds} bed`}
              </span>
            )}
            {area !== null && (
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {area.toLocaleString()} sqft
              </span>
            )}
          </div>
        </div>
      </Link>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove from shortlist"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white/80 backdrop-blur active:scale-90"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="lg-glass mt-6 flex flex-col items-center gap-4 rounded-[28px] px-6 py-14 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-journey-buyer/20">
        <Heart className="h-7 w-7 text-journey-buyer" />
      </span>
      <p className="text-[17px] font-semibold text-white">No saved homes yet</p>
      <p className="max-w-[240px] text-[14px] text-white/55">
        Swipe right or tap the heart on a home you love and it&rsquo;ll appear here.
      </p>
      <Link
        href="/experience"
        className="mt-1 rounded-full bg-journey-buyer px-6 py-3 text-[15px] font-semibold text-ink active:scale-95"
      >
        Start discovering
      </Link>
    </div>
  );
}
