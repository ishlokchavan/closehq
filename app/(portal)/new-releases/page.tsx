import type { Metadata } from 'next';
import { Sparkles } from 'lucide-react';
import { ResultsFilterBar } from '@/components/portal/search/results-filter-bar';
import { ProjectCard } from '@/components/portal/project-card';
import { getListings } from '@/lib/portal/listings';

export const metadata: Metadata = {
  title: 'New Releases & Off-Plan Projects in Dubai | iClose',
  description:
    'Discover new off-plan launches in Dubai. Filter by handover date, payment plan and completion. Invest in off-plan for special pricing and credits.',
};

export default async function NewReleasesPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const listings = await getListings({ completion: 'off_plan', q });

  return (
    <>
      <ResultsFilterBar active="new-releases" defaultQuery={q ?? ''} />
      <section className="container-wide py-6">
        {/* Ask iExpert assistant entry (renamed from the competitor's "Ask Scout") */}
        <div className="mb-6 flex items-center gap-3 card-surface px-5 py-4">
          <span className="flex items-center justify-center h-9 w-9 rounded-full bg-journey-offplan/20">
            <Sparkles className="h-4 w-4 text-ink" />
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

        <p className="text-[14px] text-graphite mb-5">
          {listings.length} off-plan {listings.length === 1 ? 'project' : 'projects'} in UAE
          {q ? <> for “{q}”</> : null}
        </p>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {listings.map((listing) => (
              <ProjectCard key={listing.id} project={listing} />
            ))}
          </div>
        ) : (
          <div className="card-mist rounded-apple px-6 py-10 text-center text-[14px] text-graphite-dark">
            No off-plan projects match your search yet.
          </div>
        )}
      </section>
    </>
  );
}
