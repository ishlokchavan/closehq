import type { Metadata } from 'next';
import { SavedStoreProvider } from '@/components/glass/saved-store';
import { GlassTabBar } from '@/components/glass/glass-tab-bar';

export const metadata: Metadata = {
  title: 'Discover · iClose',
  description: 'Swipe through Dubai homes — an immersive Liquid Glass experience.',
};

export default function GlassLayout({ children }: { children: React.ReactNode }) {
  return (
    <SavedStoreProvider>
      {/* Ambient backdrop frames the mobile column on larger screens. */}
      <div className="relative flex min-h-[100svh] w-full justify-center overflow-hidden bg-zinc-950">
        <div className="pointer-events-none absolute -left-40 top-0 h-[60vh] w-[60vh] rounded-full bg-journey-buyer/20 blur-[120px]" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[60vh] w-[60vh] rounded-full bg-journey-offplan/20 blur-[120px]" />

        {/* Mobile-first column. The whole experience lives inside this frame. */}
        <main className="relative h-[100svh] w-full max-w-[520px] overflow-hidden bg-black text-white shadow-[0_0_80px_rgba(0,0,0,0.6)]">
          {children}
          <GlassTabBar />
        </main>
      </div>
    </SavedStoreProvider>
  );
}
