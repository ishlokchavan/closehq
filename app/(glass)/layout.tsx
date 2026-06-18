import type { Metadata } from 'next';
import { SavedStoreProvider } from '@/components/glass/saved-store';
import { SignalStoreProvider } from '@/components/glass/signal-store';
import { ExperienceProvider } from '@/components/glass/experience-provider';
import { GlassTabBar } from '@/components/glass/glass-tab-bar';
import { AuthProvider } from '@/components/portal/auth-provider';
import { FALLBACK_EXPERIENCE_LISTINGS } from '@/lib/glass/experience-data';

export const metadata: Metadata = {
  title: 'Discover · iClose',
  description: 'Explore UAE homes and earn iClose credits — an immersive experience.',
};

/**
 * The experience shell renders with ZERO server-side awaits — the feed is
 * seeded from baked-in data so the screen paints instantly (TikTok/Instagram
 * model: instant shell, never blocked on a network round-trip). Live listings
 * are layered in client-side by ExperienceProvider once it mounts, so a slow
 * or cold database can never hold up first paint.
 */
export default function GlassLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-[100svh] w-full justify-center overflow-hidden bg-fog">
      <div className="pointer-events-none absolute -left-40 top-0 h-[55vh] w-[55vh] rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[55vh] w-[55vh] rounded-full bg-journey-offplan/15 blur-[130px]" />

      <main className="relative h-[100svh] w-full max-w-[520px] overflow-hidden bg-paper text-ink shadow-[0_0_80px_rgba(0,0,0,0.12)]">
        <AuthProvider>
          <ExperienceProvider listings={FALLBACK_EXPERIENCE_LISTINGS}>
            <SignalStoreProvider>
              <SavedStoreProvider>
                {children}
                <GlassTabBar />
              </SavedStoreProvider>
            </SignalStoreProvider>
          </ExperienceProvider>
        </AuthProvider>
      </main>
    </div>
  );
}
