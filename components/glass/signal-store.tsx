'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import {
  SIGNAL_WEIGHTS,
  applySignal,
  rankUpcoming,
  scoreListing,
  type Affinity,
  type SignalType,
} from '@/lib/glass/recommender';
import { trackEvent, persistAffinity } from '@/lib/glass/track-event';

interface SignalState {
  affinity: Affinity;
  seen: Set<string>;
  dismissed: Set<string>;
  /** Record a signal for a listing (updates affinity + logs the event). */
  track: (type: SignalType, listing: ExperienceListing, dwellMs?: number) => void;
  score: (listing: ExperienceListing) => number;
  rank: (listings: ExperienceListing[]) => ExperienceListing[];
  reset: () => void;
}

const STORAGE_KEY = 'closehq.glass.affinity.v1';

const SignalContext = createContext<SignalState | null>(null);

export function SignalStoreProvider({ children }: { children: React.ReactNode }) {
  const [affinity, setAffinity] = useState<Affinity>({});
  const seenRef = useRef<Set<string>>(new Set());
  const dismissedRef = useRef<Set<string>>(new Set());
  const [, force] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as {
          affinity?: Affinity;
          seen?: string[];
          dismissed?: string[];
        };
        if (parsed.affinity) setAffinity(parsed.affinity);
        if (parsed.seen) seenRef.current = new Set(parsed.seen);
        if (parsed.dismissed) dismissedRef.current = new Set(parsed.dismissed);
      }
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  // Debounced server-side snapshot of affinity (additive table; for future ML).
  const persistTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (!hydrated) return;
    if (persistTimer.current) clearTimeout(persistTimer.current);
    persistTimer.current = setTimeout(() => persistAffinity(affinity), 1500);
    return () => {
      if (persistTimer.current) clearTimeout(persistTimer.current);
    };
  }, [affinity, hydrated]);

  const persist = useCallback((nextAffinity: Affinity) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          affinity: nextAffinity,
          seen: [...seenRef.current],
          dismissed: [...dismissedRef.current],
        }),
      );
    } catch {
      /* storage may be unavailable */
    }
  }, []);

  const track = useCallback<SignalState['track']>(
    (type, listing, dwellMs) => {
      const weight =
        type === 'dwell' && dwellMs
          ? Math.min(SIGNAL_WEIGHTS.dwell, Math.round(dwellMs / 1000) * 4)
          : SIGNAL_WEIGHTS[type];

      seenRef.current.add(listing.reference);
      if (type === 'dislike') dismissedRef.current.add(listing.reference);

      setAffinity((prev) => {
        const next = applySignal(prev, listing, weight);
        persist(next);
        return next;
      });
      force((n) => n + 1);
      trackEvent(type, listing.reference, weight, dwellMs);
    },
    [persist],
  );

  const score = useCallback(
    (listing: ExperienceListing) => scoreListing(affinity, listing),
    [affinity],
  );

  const rank = useCallback(
    (listings: ExperienceListing[]) =>
      rankUpcoming(listings, affinity, seenRef.current, dismissedRef.current),
    [affinity],
  );

  const reset = useCallback(() => {
    seenRef.current = new Set();
    dismissedRef.current = new Set();
    setAffinity({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    force((n) => n + 1);
  }, []);

  const value: SignalState = {
    affinity,
    seen: seenRef.current,
    dismissed: dismissedRef.current,
    track,
    score,
    rank,
    reset,
  };

  // Avoid a hydration flash of un-personalised order.
  if (!hydrated) {
    return (
      <SignalContext.Provider value={value}>{children}</SignalContext.Provider>
    );
  }
  return <SignalContext.Provider value={value}>{children}</SignalContext.Provider>;
}

export function useSignals(): SignalState {
  const ctx = useContext(SignalContext);
  if (!ctx) throw new Error('useSignals must be used within <SignalStoreProvider>');
  return ctx;
}
