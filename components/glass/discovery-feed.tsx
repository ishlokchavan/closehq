'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, MapPin, Sparkles } from 'lucide-react';
import { EXPERIENCE_LISTINGS, formatAed } from '@/lib/glass/experience-data';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { useSaved } from './saved-store';
import { SwipeCard } from './swipe-card';

export function DiscoveryFeed() {
  const { decisions, save, pass, savedRefs } = useSaved();
  const [matched, setMatched] = useState<ExperienceListing | null>(null);

  function handleSave(listing: ExperienceListing) {
    const firstTime = decisions[listing.reference] !== 'saved';
    save(listing.reference);
    if (firstTime) setMatched(listing);
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-black">
      {/* Top glass bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="lg-glass-strong lg-specular pointer-events-auto flex items-center justify-between rounded-full py-2 pl-4 pr-2">
          <div className="flex items-center gap-2 text-white">
            <Sparkles className="h-[18px] w-[18px] text-journey-buyer" aria-hidden />
            <span className="text-[15px] font-semibold tracking-tight">Discover</span>
            <span className="flex items-center gap-0.5 text-[13px] text-white/65">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> Dubai
            </span>
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-full bg-white/85 px-3 text-[13px] font-medium text-ink active:scale-95"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
          </button>
        </div>
      </header>

      {/* Vertical Reels-style feed of swipeable cards */}
      <div className="lg-snap-y no-scrollbar h-full w-full overflow-y-scroll overscroll-y-contain">
        {EXPERIENCE_LISTINGS.map((listing) => (
          <SwipeCard
            key={listing.reference}
            listing={listing}
            decided={decisions[listing.reference] ?? null}
            onSave={() => handleSave(listing)}
            onPass={() => pass(listing.reference)}
          />
        ))}
        {/* End cap */}
        <section className="lg-snap-start flex h-[100svh] snap-start flex-col items-center justify-center gap-4 bg-gradient-to-b from-zinc-900 to-black px-8 text-center">
          <p className="text-2xl font-semibold tracking-tight text-white">
            You&rsquo;re all caught up
          </p>
          <p className="max-w-xs text-[15px] text-white/60">
            {savedRefs.length > 0
              ? `You shortlisted ${savedRefs.length} ${savedRefs.length === 1 ? 'home' : 'homes'}. Review them anytime.`
              : 'Swipe right on a home to start your shortlist.'}
          </p>
          <Link
            href="/experience/saved"
            className="lg-glass-strong lg-specular mt-2 rounded-full px-6 py-3 text-[15px] font-medium text-white active:scale-95"
          >
            View shortlist
          </Link>
        </section>
      </div>

      {/* "It's a match" celebration */}
      <AnimatePresence>
        {matched && (
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMatched(null)}
          >
            <div className="absolute inset-0 bg-black/55 backdrop-blur-md" />
            <motion.div
              className="lg-glass-strong lg-specular relative z-10 w-full max-w-sm rounded-[28px] p-6 text-center"
              initial={{ scale: 0.8, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-journey-buyer">
                It&rsquo;s a match
              </p>
              <div className="mx-auto mt-4 h-44 w-full overflow-hidden rounded-2xl">
                <Image
                  src={matched.gallery[0]}
                  alt={matched.title}
                  width={400}
                  height={260}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 text-[19px] font-semibold tracking-tight text-white">
                {matched.title}
              </h3>
              <p className="mt-1 text-[15px] text-white/70">
                {formatAed(matched.priceAed)} · {matched.community}
              </p>
              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  onClick={() => setMatched(null)}
                  className="flex-1 rounded-full bg-white/15 py-3 text-[15px] font-medium text-white active:scale-95"
                >
                  Keep browsing
                </button>
                <Link
                  href={`/experience/property/${matched.reference}`}
                  className="flex-1 rounded-full bg-journey-buyer py-3 text-[15px] font-semibold text-ink active:scale-95"
                >
                  View home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
