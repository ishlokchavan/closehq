import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ImageIcon, BedDouble, Bath, Maximize, BadgeCheck, MapPin, ChevronLeft,
  Building2, Tag, ShieldCheck, Phone, Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getListingByReference, getListingReferences, formatPriceAed } from '@/lib/portal/listings';
import type { Listing } from '@/lib/portal/listing-types';

const TYPE_LABEL: Record<Listing['propertyType'], string> = {
  apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse', penthouse: 'Penthouse',
  plot: 'Plot', office: 'Office', retail: 'Retail',
};

export async function generateStaticParams() {
  const refs = await getListingReferences();
  return refs.map((reference) => ({ reference }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ reference: string }>;
}): Promise<Metadata> {
  const { reference } = await params;
  const listing = await getListingByReference(reference);
  if (!listing) return { title: 'Listing not found | iClose' };
  return {
    title: `${listing.title} | iClose`,
    description: listing.description || `${listing.title} in ${listing.community ?? listing.city}.`,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const listing = await getListingByReference(reference);
  if (!listing) notFound();

  const location = [listing.building, listing.community, listing.city].filter(Boolean).join(', ');

  return (
    <div className="container-wide py-8">
      <Link href="/properties" className="inline-flex items-center gap-1 text-[14px] text-graphite hover:text-ink mb-5">
        <ChevronLeft className="h-4 w-4" /> Back to results
      </Link>

      {/* Gallery — placeholder imagery per design */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mb-8">
        <div className="lg:col-span-3 relative aspect-[16/9] rounded-apple bg-mist flex items-center justify-center overflow-hidden">
          {listing.coverImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={listing.coverImageUrl} alt={listing.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <ImageIcon className="h-10 w-10 text-hairline" />
          )}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="rounded-full bg-ink/80 text-white text-[12px] px-3 py-1">
              {listing.completion === 'off_plan' ? 'Off-plan' : 'Ready'}
            </span>
            {listing.isVerified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-paper/90 text-ink text-[12px] px-3 py-1">
                <BadgeCheck className="h-3.5 w-3.5 text-journey-listing" /> Verified
              </span>
            )}
          </div>
        </div>
        <div className="hidden lg:flex flex-col gap-3">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex-1 aspect-[4/3] rounded-apple bg-mist flex items-center justify-center">
              <ImageIcon className="h-7 w-7 text-hairline" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2">
          <span className="text-[13px] text-graphite uppercase tracking-wide">{TYPE_LABEL[listing.propertyType]}</span>
          <h1 className="display-sm mt-1">{formatPriceAed(listing.priceAed, listing.purpose)}</h1>
          <p className="text-[18px] text-ink mt-2">{listing.title}</p>
          <p className="flex items-center gap-1.5 text-[15px] text-graphite mt-1">
            <MapPin className="h-4 w-4" /> {location}
          </p>

          {/* Specs */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 mt-6 py-5 border-y border-hairline/60 text-[15px] text-ink">
            {listing.bedrooms != null && (
              <span className="inline-flex items-center gap-2">
                <BedDouble className="h-5 w-5 text-graphite" />
                {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} Beds`}
              </span>
            )}
            {listing.bathrooms != null && (
              <span className="inline-flex items-center gap-2"><Bath className="h-5 w-5 text-graphite" />{listing.bathrooms} Baths</span>
            )}
            {listing.areaSqft != null && (
              <span className="inline-flex items-center gap-2">
                <Maximize className="h-5 w-5 text-graphite" />{listing.areaSqft.toLocaleString('en-US')} sqft
              </span>
            )}
            <span className="inline-flex items-center gap-2"><Tag className="h-5 w-5 text-graphite" />Ref. {listing.reference}</span>
          </div>

          {/* Description */}
          {listing.description && (
            <section className="mt-7">
              <h2 className="text-[18px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.015em' }}>Description</h2>
              <p className="text-[15px] text-graphite-dark leading-relaxed">{listing.description}</p>
            </section>
          )}

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <section className="mt-7">
              <h2 className="text-[18px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.015em' }}>Amenities</h2>
              <div className="flex flex-wrap gap-2">
                {listing.amenities.map((a) => (
                  <span key={a} className="rounded-full border border-hairline px-3.5 py-1.5 text-[13px] text-ink/80">{a}</span>
                ))}
              </div>
            </section>
          )}

          {/* Map placeholder */}
          <section className="mt-7">
            <h2 className="text-[18px] font-semibold text-ink mb-3" style={{ letterSpacing: '-0.015em' }}>Location</h2>
            <div className="aspect-[16/7] rounded-apple bg-mist flex items-center justify-center text-graphite">
              <span className="inline-flex items-center gap-2 text-[14px]"><MapPin className="h-4 w-4" /> {location}</span>
            </div>
          </section>
        </div>

        {/* Sidebar: zero-commission + enquire */}
        <aside className="lg:col-span-1">
          <div className="card-surface p-6 lg:sticky lg:top-20">
            <div className="flex items-center gap-2 rounded-xl bg-journey-buyer/15 px-3.5 py-2.5 mb-5">
              <ShieldCheck className="h-4 w-4 text-ink shrink-0" />
              <span className="text-[13px] text-ink">Buy with <strong>0% commission</strong> &amp; 100% cashback</span>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <span className="flex items-center justify-center h-12 w-12 rounded-full bg-mist text-hairline">
                <Building2 className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[14px] text-ink font-medium">iClose</p>
                <p className="text-[12px] text-graphite">Verified listing partner</p>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <Link href={`/buy?ref=${listing.reference}`}>
                <Button variant="primary" size="md" className="w-full">
                  <Mail className="h-4 w-4" /> Enquire now
                </Button>
              </Link>
              <Link href={`/buy?ref=${listing.reference}`}>
                <Button variant="outline" size="md" className="w-full">
                  <Phone className="h-4 w-4" /> Request a call
                </Button>
              </Link>
            </div>
            <p className="text-[12px] text-graphite mt-4 text-center">
              We&apos;ll connect you with the iClose team — no commission, ever.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
