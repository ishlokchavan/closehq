import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SavedStoreProvider } from '@/components/glass/saved-store';
import { SignalStoreProvider } from '@/components/glass/signal-store';
import { ExperienceProvider } from '@/components/glass/experience-provider';
import { GlassTabBar } from '@/components/glass/glass-tab-bar';
import { AuthProvider } from '@/components/portal/auth-provider';
import { getExperienceListings } from '@/lib/glass/get-experience';

export const metadata: Metadata = {
  title: 'Discover · iClose',
  description: 'Explore UAE homes and earn iClose credits — an immersive experience.',
};

/**
 * Instant app shell — paints immediately so there's never a black screen while
 * the feed data loads. The branded wordmark + soft pulse reads as a native
 * launch screen; the real content streams in over the top via Suspense.
 */
function ExperienceSkeleton() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-paper">
      <span className="text-[26px] font-semibold tracking-tight text-ink/90" style={{ letterSpacing: '-0.03em' }}>
        iClose
      </span>
      <div className="mt-5 h-1 w-24 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-ink/40" />
      </div>
    </div>
  );
}

/** Async island: fetches the feed and mounts the client providers around it. */
async function ExperienceContent({ children }: { children: React.ReactNode }) {
  const listings = await getExperienceListings();
  return (
    <ExperienceProvider listings={listings}>
      <SignalStoreProvider>
        <SavedStoreProvider>
          {children}
          <GlassTabBar />
        </SavedStoreProvider>
      </SignalStoreProvider>
    </ExperienceProvider>
  );
}

export default function GlassLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100svh] w-full justify-center overflow-hidden bg-fog">
      <div className="pointer-events-none absolute -left-40 top-0 h-[55vh] w-[55vh] rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[55vh] w-[55vh] rounded-full bg-journey-offplan/15 blur-[130px]" />

      <main className="relative h-[100svh] w-full max-w-[520px] overflow-hidden bg-paper text-ink shadow-[0_0_80px_rgba(0,0,0,0.12)]">
        <AuthProvider>
          <Suspense fallback={<ExperienceSkeleton />}>
            <ExperienceContent>{children}</ExperienceContent>
          </Suspense>
        </AuthProvider>
      </main>
    </div>
  );
}
