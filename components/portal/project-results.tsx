'use client';

import { useMemo } from 'react';
import { ProjectCard } from '@/components/portal/project-card';
import { useListingFilters, type FilterParams } from '@/components/portal/use-listing-filters';
import type { Listing } from '@/lib/portal/listing-types';

function matchHandover(handoverBy: string | null | undefined, sel: string): boolean {
  if (!handoverBy) return false;
  const year = Number(handoverBy.replace(/\D/g, '').slice(-4));
  if (sel.endsWith('+')) return year >= Number(sel.replace('+', ''));
  return handoverBy.includes(sel);
}

/** Filtered New Releases grid (URL-backed: type, handover, paymentPlan, price). */
export function ProjectResults({ projects, params }: { projects: Listing[]; params: FilterParams }) {
  const { get } = useListingFilters(params);
  const type = get('type');
  const handover = get('handover');
  const plan = get('paymentPlan');
  const minPrice = Number(get('minPrice')) || 0;
  const maxPrice = Number(get('maxPrice')) || Infinity;

  const filtered = useMemo(
    () =>
      projects.filter((p) => {
        if (type && p.propertyType !== type) return false;
        if (handover && !matchHandover(p.handoverBy, handover)) return false;
        if (plan && p.paymentPlan !== plan) return false;
        if (p.priceAed < minPrice || p.priceAed > maxPrice) return false;
        return true;
      }),
    [projects, type, handover, plan, minPrice, maxPrice],
  );

  return (
    <div className="space-y-5">
      <p className="text-[14px] text-graphite">
        {filtered.length} off-plan {filtered.length === 1 ? 'project' : 'projects'} in UAE
      </p>
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => <ProjectCard key={p.id} project={p} />)}
        </div>
      ) : (
        <div className="card-mist rounded-apple px-6 py-10 text-center text-[14px] text-graphite-dark">
          No projects match these filters.
        </div>
      )}
    </div>
  );
}
