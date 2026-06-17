'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal, MapPin, Coins } from 'lucide-react';
import { EXPERIENCE_LISTINGS, formatAed, formatCredits } from '@/lib/glass/experience-data';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { useSaved } from './saved-store';
import { SwipeCard } from './swipe-card';
import { SmartImage } from './smart-image';

export function DiscoveryFeed() {
  const { decisions, save, pass, savedRefs } = useSaved();
  const [matched, setMatched] = useState<ExperienceListing | null>(null);

  function handleSave(listing: ExperienceListing) {
    const firstTime = decisions[listing.reference] !== 'saved';
    save(listing.reference);
    if (firstTime) setMatched(listing);
  }

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-mist">
      {/* Top glass bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-4 pt-[max(12px,env(safe-area-inset-top))]">
        <div className="lg-glass-light pointer-events-auto flex items-center justify-between rounded-full py-2 pl-4 pr-2">
          <div className="flex items-center gap-2 text-ink">
            <span className="text-[16px] font-semibold tracking-tight">Discover</span>
            <span className="flex items-center gap-0.5 text-[13px] text-graphite">
              <MapPin className="h-3.5 w-3.5" aria-hidden /> UAE
            </span>
          </div>
          <button
            type="button"
            className="flex h-9 items-center gap-1.5 rounded-full bg-ink px-3.5 text-[13px] font-medium text-white active:scale-95"
          >
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
            Filters
          </button>
        </div>
      </header>

      {/* Vertical feed of swipeable cards */}
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
        <section className="lg-snap-start flex h-[100svh] snap-start flex-col items-center justify-center gap-4 bg-paper px-8 text-center">
          <p className="text-[24px] font-semibold tracking-tight text-ink">
            You&rsquo;re all caught up
          </p>
          <p className="max-w-xs text-[15px] text-graphite">
            {savedRefs.length > 0
              ? `You shortlisted ${savedRefs.length} ${savedRefs.length === 1 ? 'home' : 'homes'}. Review them and the credits you'd earn.`
              : 'Swipe right on a home to start your shortlist.'}
          </p>
          <Link
            href="/experience/saved"
            className="mt-2 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white active:scale-95"
          >
            View shortlist
          </Link>
        </section>
      </div>

      {/* "Shortlisted" credits moment */}
      <AnimatePresence>
        {matched && (
          <motion.div
            className="absolute inset-0 z-40 flex flex-col items-center justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMatched(null)}
          >
            <div className="absolute inset-0 bg-ink/40 backdrop-blur-md" />
            <motion.div
              className="relative z-10 w-full max-w-sm overflow-hidden rounded-[28px] bg-paper shadow-elevated"
              initial={{ scale: 0.85, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            >
              <div className="relative h-40 w-full">
                <SmartImage
                  src={matched.gallery[0]}
                  alt={matched.title}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <div className="p-5 text-center">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-graphite">
                  Added to shortlist
                </p>
                <h3 className="mt-2 text-[18px] font-semibold tracking-tight text-ink">
                  {matched.title}
                </h3>
                <p className="mt-0.5 text-[14px] text-graphite">
                  {formatAed(matched.priceAed)} · {matched.community}
                </p>

                <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-accent/10 py-3">
                  <Coins className="h-5 w-5 text-accent" />
                  <span className="text-[15px] font-semibold text-accent">
                    Earn {formatCredits(matched.credit.credits)} credits
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMatched(null)}
                    className="flex-1 rounded-full bg-mist py-3 text-[15px] font-medium text-ink active:scale-95"
                  >
                    Keep browsing
                  </button>
                  <Link
                    href={`/experience/property/${matched.reference}`}
                    className="flex-1 rounded-full bg-ink py-3 text-[15px] font-semibold text-white active:scale-95"
                  >
                    View home
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
