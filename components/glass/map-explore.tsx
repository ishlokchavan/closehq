'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, useDragControls, useMotionValue, animate } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { useExperience } from './experience-provider';
import { SmartImage } from './smart-image';
import { formatAed } from '@/lib/glass/experience-data';
import type { ExperienceListing } from '@/lib/glass/experience-data';

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '';
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? 'DEMO_MAP_ID';
const DUBAI = { lat: 25.13, lng: 55.22 };

// Sheet snap heights
const SHEET_PEEK = 192; // px visible above tab bar when collapsed
const CHIP_BAR_H = 108; // approx chip bar height incl. safe area

const CHIPS = [
  { key: 'all',      label: 'All' },
  { key: 'buy',      label: 'Buy' },
  { key: 'offplan',  label: 'Off-Plan' },
  { key: 'releases', label: 'New Releases' },
] as const;

type ChipKey = typeof CHIPS[number]['key'];

function applyChip(listings: ExperienceListing[], chip: ChipKey): ExperienceListing[] {
  switch (chip) {
    case 'buy':      return listings.filter(l => l.purpose === 'sale' && l.completion === 'ready');
    case 'offplan':  return listings.filter(l => l.completion === 'off_plan');
    case 'releases': return listings.filter(l => l.completion === 'off_plan' && l.source === 'developer');
    default:         return listings;
  }
}

function pricePin(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  return `${Math.round(n / 1000)}K`;
}

// ─── Chip bar ────────────────────────────────────────────────────────────────

function ChipBar({
  chip,
  onChange,
}: {
  chip: ChipKey;
  onChange: (k: ChipKey) => void;
}) {
  return (
    <div
      className="absolute inset-x-0 top-0 z-20 bg-paper/90 backdrop-blur-md"
      style={{ paddingTop: 'calc(env(safe-area-inset-top) + 10px)' }}
    >
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-3 pt-1">
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

        {/* Filters button */}
        <button
          type="button"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink/65 shadow-sm active:scale-95"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Filters
        </button>
      </div>
    </div>
  );
}

// ─── Live Google Map ──────────────────────────────────────────────────────────

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
          const sel = active?.reference === l.reference;
          return (
            <AdvancedMarker
              key={l.reference}
              position={{ lat: l.latitude, lng: l.longitude }}
              onClick={() => onSelect(l)}
            >
              <span
                className={`whitespace-nowrap rounded-full px-2.5 py-[5px] text-[11px] font-semibold shadow-md transition-all ${
                  sel ? 'scale-110 bg-ink text-white' : 'bg-white text-ink ring-1 ring-ink/10'
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

// ─── Map placeholder (no API key) ────────────────────────────────────────────

function MapPlaceholder() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-ink/5">
      <p className="text-[13px] font-medium text-ink/30">Map loads with a Google Maps API key</p>
    </div>
  );
}

// ─── Draggable bottom sheet ───────────────────────────────────────────────────

function BottomSheet({
  listings,
  active,
}: {
  listings: ExperienceListing[];
  active: ExperienceListing | null;
}) {
  const [vh, setVh] = useState(812);
  const [expanded, setExpanded] = useState(false);
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const initialised = useRef(false);

  useEffect(() => {
    const h = window.innerHeight;
    setVh(h);
    if (!initialised.current) {
      y.set(h - SHEET_PEEK);
      initialised.current = true;
    }
  }, [y]);

  const peekY = vh - SHEET_PEEK;
  const expandY = CHIP_BAR_H;

  const snapTo = useCallback(
    (target: number) => {
      animate(y, target, { type: 'spring', damping: 30, stiffness: 280 });
      setExpanded(target === expandY);
    },
    [y, expandY],
  );

  function handleDragEnd(_: unknown, info: { offset: { y: number }; velocity: { y: number } }) {
    const collapse = info.velocity.y > 400 || (info.offset.y > 80 && info.velocity.y >= 0);
    snapTo(collapse ? peekY : expandY);
  }

  return (
    <motion.div
      className="absolute inset-x-0 top-0 z-30 flex flex-col overflow-hidden rounded-t-[24px] bg-paper"
      style={{
        y,
        height: vh,
        boxShadow: '0 -4px 32px rgba(0,0,0,0.13)',
      }}
      drag="y"
      dragControls={dragControls}
      dragListener={false}
      dragConstraints={{ top: expandY, bottom: peekY }}
      dragElastic={0.06}
      onDragEnd={handleDragEnd}
    >
      {/* ── Handle + header — this area initiates drag ── */}
      <div
        className="shrink-0 touch-none select-none"
        onPointerDown={(e) => dragControls.start(e)}
      >
        {/* Pill handle */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-10 rounded-full bg-ink/12" />
        </div>

        {/* Count row */}
        <div className="flex items-center justify-between px-5 pb-3">
          <span className="text-[15px] font-semibold text-ink">
            {listings.length} home{listings.length !== 1 ? 's' : ''}
          </span>
          <button
            type="button"
            className="text-[13px] font-medium text-accent active:opacity-70"
            onClick={() => snapTo(expanded ? peekY : expandY)}
          >
            {expanded ? 'Show map' : 'Show list'}
          </button>
        </div>
      </div>

      {/* ── Scrollable listing cards ── */}
      <div className="no-scrollbar flex-1 overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+80px)]">
        <div className="flex flex-col gap-3">
          {listings.map(l => (
            <Link
              key={l.reference}
              href={`/experience/property/${l.reference}`}
              className={`flex gap-3.5 rounded-2xl border bg-white p-3 shadow-sm transition-colors active:scale-[0.99] ${
                active?.reference === l.reference
                  ? 'border-ink/25 shadow-[0_2px_12px_rgba(0,0,0,0.10)]'
                  : 'border-ink/[0.07]'
              }`}
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
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Root component ───────────────────────────────────────────────────────────

export function MapExplore() {
  const { listings } = useExperience();
  const [chip, setChip] = useState<ChipKey>('all');
  const [active, setActive] = useState<ExperienceListing | null>(null);

  const visible = useMemo(() => applyChip(listings, chip), [listings, chip]);

  const handleChip = useCallback((k: ChipKey) => {
    setChip(k);
    setActive(null);
  }, []);

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-paper">
      {/* Full-screen map layer */}
      <div className="absolute inset-0">
        {API_KEY ? (
          <LiveMap
            listings={visible}
            active={active}
            onSelect={setActive}
            onDeselect={() => setActive(null)}
          />
        ) : (
          <MapPlaceholder />
        )}
      </div>

      {/* Chip bar — floats above map */}
      <ChipBar chip={chip} onChange={handleChip} />

      {/* Bottom sheet — draggable over the map */}
      <BottomSheet listings={visible} active={active} />
    </div>
  );
}
