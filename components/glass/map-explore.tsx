'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useExperience } from './experience-provider';
import { SmartImage } from './smart-image';
import { formatAed } from '@/lib/glass/experience-data';
import type { ExperienceListing } from '@/lib/glass/experience-data';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID';
const DUBAI = { lat: 25.13, lng: 55.22 };
const HEADER_OFFSET = 'calc(env(safe-area-inset-top) + 52px)';

const CHIPS = [
  { key: 'all',      label: 'All' },
  { key: 'buy',      label: 'Buy' },
  { key: 'offplan',  label: 'Off-Plan' },
  { key: 'releases', label: 'New Releases' },
  { key: 'rent',     label: 'Rent' },
] as const;

type ChipKey = typeof CHIPS[number]['key'];

function applyChip(listings: ExperienceListing[], chip: ChipKey): ExperienceListing[] {
  switch (chip) {
    case 'buy':      return listings.filter(l => l.purpose === 'sale' && l.completion === 'ready');
    case 'offplan':  return listings.filter(l => l.completion === 'off_plan');
    case 'releases': return listings.filter(l => l.completion === 'off_plan' && l.source === 'developer');
    case 'rent':     return listings.filter(l => l.purpose === 'rent');
    default:         return listings;
  }
}

function pricePin(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return `${Math.round(n / 1000)}K`;
}

/** Chip filter bar — shared between map and fallback views. */
function ChipBar({ chip, onChange, count }: { chip: ChipKey; onChange: (k: ChipKey) => void; count: number }) {
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 bg-paper/90 backdrop-blur-md"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 10px)' }}
    >
      <div className="flex items-center justify-between px-5 pb-1.5">
        <span className="text-[17px] font-semibold tracking-tight text-ink">Map</span>
        <span className="text-[13px] text-ink/40">{count} home{count !== 1 ? 's' : ''}</span>
      </div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-3 pt-1">
        {CHIPS.map(c => (
          <button
            key={c.key}
            type="button"
            onClick={() => onChange(c.key)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-all active:scale-95 ${
              chip === c.key
                ? 'bg-ink text-white shadow-md'
                : 'border border-ink/10 bg-white text-ink/65 shadow-sm'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Slide-up card shown when a pin is tapped. */
function ListingCard({ listing, onClose }: { listing: ExperienceListing; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        key={listing.reference}
        className="absolute inset-x-4 z-30 pb-[max(80px,calc(env(safe-area-inset-bottom)+72px))]"
        style={{ bottom: 0 }}
        initial={{ y: 140, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 140, opacity: 0 }}
        transition={{ type: 'spring', damping: 26, stiffness: 260 }}
      >
        <div className="flex gap-3 overflow-hidden rounded-2xl bg-white p-3 shadow-[0_8px_36px_rgba(0,0,0,0.16)]">
          {/* Cover */}
          <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
            <SmartImage src={listing.cover} alt="" fill sizes="72px" className="object-cover" />
          </div>
          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
            <div className="min-w-0">
              <p className="line-clamp-1 text-[14px] font-semibold text-ink">{listing.title}</p>
              <p className="mt-0.5 text-[12px] text-ink/45">{listing.community ?? listing.city}</p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-bold text-ink">{formatAed(listing.priceAed)}</span>
              <Link
                href={`/experience/property/${listing.reference}`}
                className="rounded-full bg-ink px-3.5 py-1.5 text-[12px] font-semibold text-white active:scale-95"
              >
                View →
              </Link>
            </div>
          </div>
          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2.5 top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-ink/8 active:scale-90"
          >
            <X className="h-3.5 w-3.5 text-ink/50" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/** Full-screen Google Maps view with price pins. */
function LiveMap({
  listings,
  active,
  onSelect,
  onDeselect,
}: {
  listings: ExperienceListing[];
  active: ExperienceListing | null;
  onSelect: (l: ExperienceListing) => void;
  onDeselect: () => void;
}) {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        mapId={MAP_ID}
        defaultCenter={DUBAI}
        defaultZoom={11}
        gestureHandling="greedy"
        disableDefaultUI
        className="h-full w-full"
        onClick={onDeselect}
      >
        {listings.map(l => {
          if (l.latitude == null || l.longitude == null) return null;
          const isActive = active?.reference === l.reference;
          return (
            <AdvancedMarker
              key={l.reference}
              position={{ lat: l.latitude, lng: l.longitude }}
              onClick={() => onSelect(l)}
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-md transition-all ${
                  isActive
                    ? 'bg-ink text-white scale-110'
                    : 'bg-white text-ink ring-1 ring-ink/10'
                }`}
              >
                {pricePin(l.priceAed)}
              </span>
            </AdvancedMarker>
          );
        })}
      </Map>
    </APIProvider>
  );
}

/** Fallback when no Maps API key: scrollable property cards below chip bar. */
function CardFallback({ listings, onSelect }: { listings: ExperienceListing[]; onSelect: (l: ExperienceListing) => void }) {
  return (
    <div
      className="no-scrollbar absolute inset-0 overflow-y-auto px-5"
      style={{ paddingTop: `calc(env(safe-area-inset-top) + 108px)`, paddingBottom: 'calc(env(safe-area-inset-bottom) + 80px)' }}
    >
      {/* Map placeholder band */}
      <div className="mb-5 flex h-44 items-center justify-center overflow-hidden rounded-3xl bg-ink/5">
        <div className="flex flex-col items-center gap-2 text-ink/30">
          <MapPin className="h-8 w-8" />
          <span className="text-[13px] font-medium">Map loads with a Google Maps API key</span>
        </div>
      </div>

      <p className="mb-3 text-[13px] font-medium text-ink/40">{listings.length} result{listings.length !== 1 ? 's' : ''}</p>

      <div className="flex flex-col gap-3.5">
        {listings.map(l => (
          <button
            key={l.reference}
            type="button"
            onClick={() => onSelect(l)}
            className="flex gap-3.5 rounded-2xl border border-ink/[0.07] bg-white p-3 shadow-sm text-left active:scale-[0.99]"
          >
            <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-xl">
              <SmartImage src={l.cover} alt="" fill sizes="68px" className="object-cover" />
            </div>
            <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
              <div>
                <p className="line-clamp-1 text-[14px] font-semibold text-ink">{l.title}</p>
                <p className="mt-0.5 text-[12px] text-ink/45">{l.community ?? l.city}</p>
              </div>
              <p className="text-[15px] font-bold text-ink">{formatAed(l.priceAed)}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export function MapExplore() {
  const { listings } = useExperience();
  const [chip, setChip] = useState<ChipKey>('all');
  const [active, setActive] = useState<ExperienceListing | null>(null);

  const visible = useMemo(
    () => applyChip(listings, chip),
    [listings, chip],
  );

  const handleChip = useCallback((k: ChipKey) => {
    setChip(k);
    setActive(null);
  }, []);

  const hasMaps = Boolean(API_KEY);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-paper">
      <ChipBar chip={chip} onChange={handleChip} count={visible.length} />

      {hasMaps ? (
        <LiveMap
          listings={visible}
          active={active}
          onSelect={setActive}
          onDeselect={() => setActive(null)}
        />
      ) : (
        <CardFallback listings={visible} onSelect={setActive} />
      )}

      {/* Bottom card */}
      {active && <ListingCard listing={active} onClose={() => setActive(null)} />}
    </div>
  );
}
