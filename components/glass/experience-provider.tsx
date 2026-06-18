'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ExperienceListing } from '@/lib/glass/experience-data';

interface ExperienceValue {
  listings: ExperienceListing[];
  launches: ExperienceListing[];
  byRef: (reference: string) => ExperienceListing | undefined;
}

const ExperienceContext = createContext<ExperienceValue | null>(null);

export function ExperienceProvider({
  listings: initial,
  children,
}: {
  listings: ExperienceListing[];
  children: React.ReactNode;
}) {
  // Render instantly from the seeded listings, then quietly upgrade to live
  // data once fetched — never blocking first paint on the network.
  const [listings, setListings] = useState(initial);

  useEffect(() => {
    let alive = true;
    fetch('/api/glass/listings')
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { listings?: ExperienceListing[] } | null) => {
        if (alive && data?.listings?.length) setListings(data.listings);
      })
      .catch(() => {
        /* keep the seeded listings */
      });
    return () => {
      alive = false;
    };
  }, []);

  const value = useMemo<ExperienceValue>(
    () => ({
      listings,
      launches: listings.filter((l) => l.completion === 'off_plan'),
      byRef: (reference) => listings.find((l) => l.reference === reference),
    }),
    [listings],
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience(): ExperienceValue {
  const ctx = useContext(ExperienceContext);
  if (!ctx) throw new Error('useExperience must be used within <ExperienceProvider>');
  return ctx;
}
