'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import { useExperience } from './experience-provider';
import { useSaved } from './saved-store';
import { FeedCard } from './feed-card';
import { SmartImage } from './smart-image';

export function DiscoveryFeed() {
  const { listings, launches } = useExperience();
  const { isSaved, toggleSave } = useSaved();
  const [condensed, setCondensed] = useState(false);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-paper">
      {/* Condensing glass app bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 px-3 pt-[max(8px,env(safe-area-inset-top))]">
        <div
          className={`lg-glass-light pointer-events-auto flex items-center justify-between rounded-[22px] px-4 transition-all duration-300 ${
            condensed ? 'py-1.5' : 'py-2.5'
          }`}
        >
          <span
            className={`font-semibold tracking-tight text-ink transition-all duration-300 ${
              condensed ? 'text-[17px]' : 'text-[22px]'
            }`}
          >
            iClose
          </span>
          <div className="flex items-center gap-1">
            <Link
              href="/experience/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink active:scale-90"
            >
              <Search className="h-[21px] w-[21px]" strokeWidth={2} />
            </Link>
            <Link
              href="/experience/saved"
              aria-label="Saved"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink active:scale-90"
            >
              <Heart className="h-[21px] w-[21px]" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </header>

      {/* Scroll feed */}
      <div
        className="no-scrollbar h-full w-full overflow-y-scroll pb-28"
        onScroll={(e) => setCondensed(e.currentTarget.scrollTop > 56)}
      >
        <div style={{ height: 'calc(env(safe-area-inset-top) + 60px)' }} />

        {/* Stories rail — off-plan launches */}
        {launches.length > 0 && (
          <section className="no-scrollbar flex gap-3.5 overflow-x-auto px-4 pb-3">
            {launches.map((l) => (
              <Link
                key={l.reference}
                href={`/experience/launches?start=${l.reference}`}
                className="flex w-[68px] shrink-0 flex-col items-center gap-1.5"
              >
                <span className="rounded-full bg-gradient-to-tr from-accent to-journey-offplan p-[2.5px]">
                  <span className="block rounded-full bg-paper p-[2.5px]">
                    <span className="relative block h-[58px] w-[58px] overflow-hidden rounded-full bg-mist">
                      <SmartImage
                        src={l.cover}
                        alt={l.developerName ?? l.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                  </span>
                </span>
                <span className="w-full truncate text-center text-[11px] text-graphite-dark">
                  {l.developerName ?? l.community}
                </span>
              </Link>
            ))}
          </section>
        )}

        {/* Property feed */}
        {listings.map((listing) => (
          <FeedCard
            key={listing.reference}
            listing={listing}
            saved={isSaved(listing.reference)}
            onToggleSave={() => toggleSave(listing.reference)}
          />
        ))}

        <p className="px-6 py-8 text-center text-[13px] text-graphite-light">
          You&rsquo;re all caught up · {listings.length} homes
        </p>
      </div>
    </div>
  );
}
