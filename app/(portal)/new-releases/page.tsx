import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { SearchHero } from '@/components/portal/search/search-hero';
import { ListingSkeleton, ComingSoonNote } from '@/components/portal/listing-skeleton';

export const metadata: Metadata = {
  title: 'New Releases & Off-Plan Projects in Dubai | iClose',
  description:
    'Discover new off-plan launches in Dubai. Filter by handover date, payment plan and completion. Invest in off-plan for special pricing and credits.',
};

export default function NewReleasesPage() {
  return (
    <>
      <SearchHero
        active="new-releases"
        title="New Releases"
        subtitle="Off-plan launches from Dubai's leading developers — special pricing, payment plans and credits."
      />
      <section className="container-wide pb-20">
        {/* Ask iExpert assistant entry (renamed from the competitor's "Ask Scout") */}
        <div className="mb-5 flex items-center gap-3 card-surface px-5 py-4">
          <span className="flex items-center justify-center h-9 w-9 rounded-full bg-journey-offplan/20">
            <Sparkles className="h-4.5 w-4.5 text-ink" />
          </span>
          <div>
            <p className="text-[15px] text-ink font-medium" style={{ letterSpacing: '-0.01em' }}>
              Ask iExpert
            </p>
            <p className="text-[13px] text-graphite">
              Get matched to off-plan projects that fit your budget and goals.
            </p>
          </div>
        </div>
        <div className="mb-5">
          <ComingSoonNote>
            New-project cards (Property Finder <code>/new-projects</code>–class feature set) are
            populated from the data layer next.
          </ComingSoonNote>
        </div>
        <ListingSkeleton count={6} />
      </section>
    </>
  );
}
