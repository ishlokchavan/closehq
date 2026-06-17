'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { SmartImage } from './smart-image';

/**
 * Horizontal swipeable image gallery. Native horizontal scroll-snap so the
 * carousel captures left/right swipes while vertical swipes pass through to the
 * outer feed (touch-action: pan-x). Double-tap fires onDoubleTap + a heart burst.
 */
export function SwipeGallery({
  images,
  alt,
  priority = false,
  indicator = 'bars',
  onDoubleTap,
}: {
  images: string[];
  alt: string;
  priority?: boolean;
  indicator?: 'bars' | 'dots' | 'none';
  onDoubleTap?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const lastTap = useRef(0);
  const [idx, setIdx] = useState(0);
  const [burst, setBurst] = useState(0);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== idx) setIdx(next);
  }

  function onClick() {
    const now = Date.now();
    if (now - lastTap.current < 280) {
      onDoubleTap?.();
      setBurst((b) => b + 1);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }

  const multi = images.length > 1;

  return (
    <div className="relative h-full w-full">
      <div
        ref={ref}
        onScroll={onScroll}
        onClick={onClick}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        style={{ touchAction: 'pan-x' }}
      >
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative h-full w-full shrink-0 snap-center bg-mist"
          >
            <SmartImage
              src={src}
              alt={alt}
              fill
              priority={priority && i === 0}
              sizes="(max-width: 520px) 100vw, 520px"
              className="object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* progress bars (feed) */}
      {multi && indicator === 'bars' && (
        <div className="pointer-events-none absolute inset-x-4 top-3 flex gap-1.5">
          {images.map((src, i) => (
            <span
              key={src + i}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i === idx ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* dots (detail) */}
      {multi && indicator === 'dots' && (
        <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {images.map((src, i) => (
            <span
              key={src + i}
              className={`h-1.5 rounded-full transition-all ${
                i === idx ? 'w-6 bg-white' : 'w-1.5 bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* double-tap heart burst */}
      <AnimatePresence>
        {burst > 0 && (
          <motion.div
            key={burst}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.25, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Heart className="h-28 w-28 fill-white text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.45)]" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
