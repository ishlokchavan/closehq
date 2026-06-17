'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Heart,
  Share2,
  BedDouble,
  Bath,
  Maximize,
  MapPin,
  BadgeCheck,
  CalendarClock,
  Wallet,
  Building2,
  Navigation,
  Coins,
  Info,
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed, formatCredits } from '@/lib/glass/experience-data';
import { useSaved } from './saved-store';
import { SmartImage } from './smart-image';

export function PropertyDetail({ listing }: { listing: ExperienceListing }) {
  const router = useRouter();
  const { isSaved, toggleSave } = useSaved();
  const saved = isSaved(listing.reference);
  const { credits } = listing.credit;

  const mapsHref =
    listing.latitude && listing.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${listing.community}, ${listing.city}`,
        )}`;

  return (
    <div className="no-scrollbar h-[100svh] overflow-y-scroll bg-paper pb-28">
      {/* Hero gallery */}
      <div className="relative h-[52svh] w-full bg-mist">
        <SmartImage
          src={listing.cover}
          alt={listing.title}
          fill
          priority
          sizes="(max-width: 520px) 100vw, 520px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 lg-scrim-t" />

        {/* Top controls */}
        <div className="absolute inset-x-4 top-[max(16px,env(safe-area-inset-top))] flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="lg-glass-light flex h-11 w-11 items-center justify-center rounded-full text-ink active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Share"
              className="lg-glass-light flex h-11 w-11 items-center justify-center rounded-full text-ink active:scale-90"
            >
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => toggleSave(listing.reference)}
              aria-label={saved ? 'Remove from shortlist' : 'Add to shortlist'}
              className={`flex h-11 w-11 items-center justify-center rounded-full active:scale-90 ${
                saved ? 'bg-ink text-white' : 'lg-glass-light text-ink'
              }`}
            >
              <Heart className={`h-[18px] w-[18px] ${saved ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>

      </div>

      {/* Body */}
      <div className="space-y-4 px-4 pt-5">
        <section>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium text-graphite-dark">
              {listing.hook}
            </span>
            {listing.isVerified && (
              <span className="flex items-center gap-1 rounded-full bg-mist px-2.5 py-1 text-[12px] font-medium text-graphite-dark">
                <BadgeCheck className="h-3.5 w-3.5 text-journey-listing" /> Verified
              </span>
            )}
          </div>
          <p className="mt-3 text-[32px] font-semibold leading-none tracking-tight text-ink">
            {formatAed(listing.priceAed)}
          </p>
          <h1 className="mt-2 text-[19px] font-semibold leading-tight tracking-tight text-ink">
            {listing.title}
          </h1>
          <p className="mt-1.5 flex items-center gap-1 text-[14px] text-graphite">
            <MapPin className="h-4 w-4" /> {listing.building ? `${listing.building}, ` : ''}
            {listing.community}, {listing.city}
          </p>
        </section>

        {/* Credits panel — plain English, no AED figure (lives on rewards page) */}
        <section className="overflow-hidden rounded-[22px] border border-accent/15 bg-accent/[0.06]">
          <div className="flex items-center gap-2.5 px-4 py-3.5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/15">
              <Coins className="h-5 w-5 text-accent" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[12px] text-graphite">Buy this home and get</p>
              <p className="text-[20px] font-semibold leading-tight tracking-tight text-accent">
                {formatCredits(credits)} iClose credits
              </p>
            </div>
            <Link
              href="/credits"
              aria-label="How credits work"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent active:scale-90"
            >
              <Info className="h-4 w-4" />
            </Link>
          </div>
          <p className="border-t border-accent/15 px-4 py-2.5 text-[12px] text-graphite-dark">
            Credits are yours to keep and spend on iClose. Tap the info icon to
            see what they&rsquo;re worth and how to use them.
          </p>
        </section>

        {/* Spec grid */}
        <section className="grid grid-cols-3 gap-2.5">
          <SpecTile icon={<BedDouble className="h-5 w-5" />} label="Bedrooms">
            {listing.bedrooms === 0 ? 'Studio' : listing.bedrooms ?? '—'}
          </SpecTile>
          <SpecTile icon={<Bath className="h-5 w-5" />} label="Bathrooms">
            {listing.bathrooms ?? '—'}
          </SpecTile>
          <SpecTile icon={<Maximize className="h-5 w-5" />} label="Area">
            {listing.areaSqft ? `${(listing.areaSqft / 1000).toFixed(1)}k` : '—'}
            <span className="text-[11px] text-graphite"> sqft</span>
          </SpecTile>
        </section>

        {/* Off-plan payment plan */}
        {listing.completion === 'off_plan' && (
          <section className="space-y-3 rounded-[22px] border border-hairline/70 bg-paper p-4">
            <div className="flex items-center gap-2 text-ink">
              <Building2 className="h-[18px] w-[18px] text-journey-offplan" />
              <span className="text-[15px] font-semibold tracking-tight">
                {listing.developerName ?? 'New release'}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {listing.paymentPlan && (
                <InfoRow icon={<Wallet className="h-4 w-4" />} label="Payment plan">
                  {listing.paymentPlan}
                </InfoRow>
              )}
              {listing.handoverBy && (
                <InfoRow icon={<CalendarClock className="h-4 w-4" />} label="Handover">
                  {listing.handoverBy}
                </InfoRow>
              )}
            </div>
          </section>
        )}

        {/* Description */}
        <section className="rounded-[22px] border border-hairline/70 bg-paper p-4">
          <h2 className="mb-2 text-[15px] font-semibold tracking-tight text-ink">
            About this home
          </h2>
          <p className="text-[14px] leading-relaxed text-graphite-dark">
            {listing.description}
          </p>
        </section>

        {/* Amenities */}
        {listing.amenities.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 text-[15px] font-semibold tracking-tight text-ink">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-hairline/70 bg-paper px-3 py-1.5 text-[13px] text-graphite-dark"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Map */}
        <section className="overflow-hidden rounded-[22px] border border-hairline/70">
          <div className="relative h-40 bg-mist">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent/15 lg-animate-float">
              <MapPin className="h-7 w-7 fill-accent text-white" />
            </span>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between bg-paper px-4 py-3.5 text-[14px] text-ink active:bg-mist"
          >
            <span className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-accent" />
              {listing.community}, {listing.city}
            </span>
            <span className="text-[13px] text-accent">Open in Maps</span>
          </a>
        </section>

        {/* Agent / source */}
        <section className="flex items-center gap-3 rounded-[22px] border border-hairline/70 bg-paper p-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-mist text-[16px] font-semibold text-ink">
            {(listing.agentName ?? listing.developerName ?? 'iC')
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium text-ink">
              {listing.agentName ?? listing.developerName ?? 'iClose listing'}
            </p>
            <p className="truncate text-[13px] text-graphite">
              {listing.agencyName ??
                (listing.source === 'owner'
                  ? 'Listed by owner · commission-free'
                  : 'Developer direct')}
            </p>
          </div>
          <span className="rounded-full bg-mist px-3 py-1 text-[12px] text-graphite-dark">
            {listing.reference}
          </span>
        </section>
      </div>

      {/* Sticky CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
        <div className="lg-glass-light pointer-events-auto flex items-center gap-2.5 rounded-full p-2">
          <button
            type="button"
            onClick={() => toggleSave(listing.reference)}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              saved ? 'bg-ink text-white' : 'bg-mist text-ink'
            }`}
            aria-label={saved ? 'Saved' : 'Save'}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-white' : ''}`} />
          </button>
          <Link
            href="/experience/saved"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white active:scale-[0.98]"
          >
            Request a viewing
          </Link>
        </div>
      </div>
    </div>
  );
}

function SpecTile({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-[18px] border border-hairline/70 bg-paper py-3.5">
      <span className="text-graphite">{icon}</span>
      <span className="text-[18px] font-semibold leading-none text-ink">{children}</span>
      <span className="text-[11px] text-graphite">{label}</span>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-mist p-3">
      <span className="flex items-center gap-1.5 text-[12px] text-graphite">
        {icon}
        {label}
      </span>
      <p className="mt-1 text-[16px] font-semibold text-ink">{children}</p>
    </div>
  );
}
