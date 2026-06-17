import { notFound } from 'next/navigation';
import { PropertyDetail } from '@/components/glass/property-detail';
import {
  EXPERIENCE_LISTINGS,
  getExperienceListing,
} from '@/lib/glass/experience-data';

export function generateStaticParams() {
  return EXPERIENCE_LISTINGS.map((l) => ({ reference: l.reference }));
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const listing = getExperienceListing(reference);
  if (!listing) notFound();
  return <PropertyDetail listing={listing} />;
}
