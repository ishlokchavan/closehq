'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
} from 'lucide-react';
import type { ExperienceListing } from '@/lib/glass/experience-data';
import { formatAed } from '@/lib/glass/experience-data';
import { useSaved } from './saved-store';

export function PropertyDetail({ listing }: { listing: ExperienceListing }) {
  const router = useRouter();
  const { isSaved, toggleSave } = useSaved();
  const [photo, setPhoto] = useState(0);
  const saved = isSaved(listing.reference);

  const mapsHref =
    listing.latitude && listing.longitude
      ? `https://www.google.com/maps/search/?api=1&query=${listing.latitude},${listing.longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${listing.community}, ${listing.city}`,
        )}`;

  return (
    <div className="no-scrollbar h-[100svh] overflow-y-scroll bg-zinc-950 pb-32">
      {/* Hero gallery */}
      <div className="relative h-[64svh] w-full">
        {listing.gallery.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={listing.title}
            fill
            priority={i === 0}
            sizes="(max-width: 520px) 100vw, 520px"
            className={`object-cover transition-opacity duration-500 ${
              i === photo ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-28 lg-scrim-t" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-zinc-950 to-transparent" />

        {/* Top controls */}
        <div className="absolute inset-x-4 top-[max(16px,env(safe-area-inset-top))] flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Back"
            className="lg-glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white active:scale-90"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Share"
              className="lg-glass-strong flex h-11 w-11 items-center justify-center rounded-full text-white active:scale-90"
            >
              <Share2 className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              onClick={() => toggleSave(listing.reference)}
              aria-label={saved ? 'Remove from shortlist' : 'Add to shortlist'}
              className={`flex h-11 w-11 items-center justify-center rounded-full active:scale-90 ${
                saved ? 'bg-journey-buyer text-ink' : 'lg-glass-strong text-white'
              }`}
            >
              <Heart className={`h-[18px] w-[18px] ${saved ? 'fill-ink' : ''}`} />
            </button>
          </div>
        </div>

        {/* Gallery dots */}
        <div className="absolute inset-x-0 bottom-24 flex justify-center gap-1.5">
          {listing.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              aria-label={`Photo ${i + 1}`}
              onClick={() => setPhoto(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === photo ? 'w-6 bg-white' : 'w-1.5 bg-white/45'
              }`}
            />
          ))}
        </div>

        {/* Price overlay */}
        <div className="absolute inset-x-5 bottom-6">
          <div className="flex items-center gap-2">
            <span className="lg-glass-dark rounded-full px-3 py-1 text-[12px] font-medium text-white">
              {listing.hook}
            </span>
            {listing.isVerified && (
              <span className="lg-glass-dark flex items-center gap-1 rounded-full px-2.5 py-1 text-[12px] font-medium text-white">
                <BadgeCheck className="h-3.5 w-3.5 text-journey-seller" /> Verified
              </span>
            )}
          </div>
          <p className="mt-3 text-[34px] font-semibold leading-none tracking-tight text-white">
            {formatAed(listing.priceAed)}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="relative z-10 -mt-3 space-y-4 px-4">
        <section>
          <h1 className="text-[21px] font-semibold leading-tight tracking-tight text-white">
            {listing.title}
          </h1>
          <p className="mt-1.5 flex items-center gap-1 text-[14px] text-white/60">
            <MapPin className="h-4 w-4" /> {listing.building ? `${listing.building}, ` : ''}
            {listing.community}, {listing.city}
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
            <span className="text-[11px] text-white/45"> sqft</span>
          </SpecTile>
        </section>

        {/* Off-plan payment plan */}
        {listing.completion === 'off_plan' && (
          <section className="lg-glass space-y-3 rounded-[22px] p-4">
            <div className="flex items-center gap-2 text-white">
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
        <section className="lg-glass rounded-[22px] p-4">
          <h2 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
            About this home
          </h2>
          <p className="text-[14px] leading-relaxed text-white/70">
            {listing.description}
          </p>
        </section>

        {/* Amenities */}
        {listing.amenities.length > 0 && (
          <section>
            <h2 className="mb-2 px-1 text-[15px] font-semibold tracking-tight text-white">
              Amenities
            </h2>
            <div className="flex flex-wrap gap-2">
              {listing.amenities.map((a) => (
                <span
                  key={a}
                  className="lg-glass rounded-full px-3 py-1.5 text-[13px] text-white/85"
                >
                  {a}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Map */}
        <section className="lg-glass overflow-hidden rounded-[22px]">
          <div className="relative h-40 bg-gradient-to-br from-zinc-800 to-zinc-700">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />
            <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-journey-buyer/30 lg-animate-float">
              <MapPin className="h-7 w-7 fill-journey-buyer text-ink" />
            </span>
          </div>
          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-3.5 text-[14px] text-white active:bg-white/5"
          >
            <span className="flex items-center gap-2">
              <Navigation className="h-4 w-4 text-journey-buyer" />
              {listing.community}, {listing.city}
            </span>
            <span className="text-[13px] text-journey-buyer">Open in Maps</span>
          </a>
        </section>

        {/* Agent / source */}
        <section className="lg-glass flex items-center gap-3 rounded-[22px] p-3.5">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-[16px] font-semibold text-white">
            {(listing.agentName ?? listing.developerName ?? 'iC')
              .split(' ')
              .map((w) => w[0])
              .slice(0, 2)
              .join('')}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-medium text-white">
              {listing.agentName ?? listing.developerName ?? 'iClose listing'}
            </p>
            <p className="truncate text-[13px] text-white/55">
              {listing.agencyName ??
                (listing.source === 'owner' ? 'Listed by owner · no commission' : 'Developer direct')}
            </p>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-[12px] text-white/70">
            {listing.reference}
          </span>
        </section>
      </div>

      {/* Sticky glass CTA */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 px-4 pb-[max(20px,env(safe-area-inset-bottom))]">
        <div className="lg-glass-strong lg-specular pointer-events-auto flex items-center gap-2.5 rounded-full p-2">
          <button
            type="button"
            onClick={() => toggleSave(listing.reference)}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              saved ? 'bg-journey-buyer text-ink' : 'bg-white/12 text-white'
            }`}
            aria-label={saved ? 'Saved' : 'Save'}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-ink' : ''}`} />
          </button>
          <Link
            href="/experience/saved"
            className="flex h-12 flex-1 items-center justify-center rounded-full bg-white text-[15px] font-semibold text-ink active:scale-[0.98]"
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
    <div className="lg-glass flex flex-col items-center gap-1 rounded-[18px] py-3.5">
      <span className="text-journey-buyer">{icon}</span>
      <span className="text-[18px] font-semibold leading-none text-white">
        {children}
      </span>
      <span className="text-[11px] text-white/45">{label}</span>
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
    <div className="rounded-2xl bg-white/5 p-3">
      <span className="flex items-center gap-1.5 text-[12px] text-white/50">
        {icon}
        {label}
      </span>
      <p className="mt-1 text-[16px] font-semibold text-white">{children}</p>
    </div>
  );
}
