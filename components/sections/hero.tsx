'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface CubeProps {
  label: string;
  size: number;
  duration: number;
  delay: number;
  initRotX: number;
  initRotY: number;
}

function Cube({ label, size, duration, delay, initRotX, initRotY }: CubeProps) {
  const half = size / 2;

  const face = (transform: string, bg: string, showLabel = false) => (
    <div
      style={{
        position: 'absolute',
        width: size,
        height: size,
        transform,
        background: bg,
        border: '1px solid rgba(255,255,255,0.09)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
      }}
    >
      {showLabel && (
        <span
          style={{
            color: 'rgba(255,255,255,0.75)',
            fontSize: Math.max(10, size * 0.115),
            fontWeight: 500,
            letterSpacing: '-0.01em',
            textAlign: 'center',
            padding: '0 10px',
            lineHeight: 1.3,
            userSelect: 'none',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );

  return (
    <div style={{ width: size, height: size, perspective: `${size * 8}px` }}>
      <motion.div
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          position: 'relative',
        }}
        initial={{ rotateX: initRotX, rotateY: initRotY, opacity: 0 }}
        animate={{
          rotateX: [initRotX, initRotX + 360],
          rotateY: [initRotY, initRotY + 360],
          opacity: 1,
        }}
        transition={{
          rotateX: { duration, repeat: Infinity, ease: 'linear', delay },
          rotateY: { duration: duration * 0.85, repeat: Infinity, ease: 'linear', delay },
          opacity: { duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {face(`translateZ(${half}px)`,                      'rgba(255,255,255,0.06)', true)}
        {face(`rotateY(180deg) translateZ(${half}px)`,      'rgba(255,255,255,0.03)')}
        {face(`rotateY(90deg) translateZ(${half}px)`,       'rgba(255,255,255,0.04)')}
        {face(`rotateY(-90deg) translateZ(${half}px)`,      'rgba(255,255,255,0.05)')}
        {face(`rotateX(90deg) translateZ(${half}px)`,       'rgba(255,255,255,0.08)')}
        {face(`rotateX(-90deg) translateZ(${half}px)`,      'rgba(255,255,255,0.02)')}
      </motion.div>
    </div>
  );
}

const CUBES: {
  label: string; size: number; top: string; left: string;
  duration: number; delay: number; initRotX: number; initRotY: number;
}[] = [
  { label: 'Lawyer',          size: 112, top: '8%',  left: '22%', duration: 14, delay: 0,   initRotX: 10,  initRotY: 25  },
  { label: 'Accountant',      size: 88,  top: '5%',  left: '62%', duration: 10, delay: 0.6, initRotX: -20, initRotY: 15  },
  { label: 'Financial Adviser',size: 78, top: '15%', left: '-4%', duration: 11, delay: 0.3, initRotX: 30,  initRotY: -20 },
  { label: 'Investor',        size: 120, top: '31%', left: '44%', duration: 13, delay: 0.1, initRotX: -15, initRotY: 35  },
  { label: 'Family Office',   size: 92,  top: '34%', left: '8%',  duration: 9,  delay: 0.8, initRotX: 20,  initRotY: -10 },
  { label: 'Broker',          size: 84,  top: '56%', left: '58%', duration: 12, delay: 0.4, initRotX: -10, initRotY: 20  },
  { label: 'Asset Manager',   size: 98,  top: '58%', left: '16%', duration: 16, delay: 0.2, initRotX: 25,  initRotY: -30 },
  { label: 'Private Banker',  size: 76,  top: '74%', left: '40%', duration: 8,  delay: 1.0, initRotX: -25, initRotY: 10  },
  { label: 'Tax Adviser',     size: 82,  top: '72%', left: '70%', duration: 11, delay: 0.7, initRotX: 15,  initRotY: -20 },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-neutral-950">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-radial-[ellipse_at_70%_50%] from-white/[0.04] to-transparent" />
      </div>

      <div className="relative flex-1 flex items-center">
        <div className="container-wide w-full flex flex-col lg:flex-row lg:items-center gap-12 pt-28 pb-20 lg:pt-0 lg:pb-0 min-h-screen">

          {/* Left: content */}
          <div className="w-full lg:w-[48%] text-center lg:text-left flex flex-col items-center lg:items-start">

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7"
            >
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm text-[12px] text-white/80"
                style={{ letterSpacing: '-0.01em' }}
              >
                Now accepting founding members · Dubai secondary market
              </span>
            </motion.div>

            <h1 className="display-xl text-white text-balance">
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                The real estate community
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                for professionals.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 text-white/70 text-[18px] sm:text-[20px] leading-[1.5] text-balance max-w-xl"
              style={{ letterSpacing: '-0.015em' }}
            >
              The Dubai secondary market runs on the right expertise, the right relationships, and access to the right assets. iClose is where all three come together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex items-center gap-5 flex-wrap justify-center lg:justify-start"
            >
              <a
                href="#who"
                onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-ink text-[15px] font-medium hover:bg-white/90 transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                Find your place here
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
              <a
                href="/specialists"
                className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-[15px]"
                style={{ letterSpacing: '-0.01em' }}
              >
                Become a Specialist
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </motion.div>
          </div>

          {/* Right: 3D cube cluster (desktop only) */}
          <div className="hidden lg:block relative flex-1 self-stretch">
            {CUBES.map((c) => (
              <div
                key={c.label}
                className="absolute"
                style={{ top: c.top, left: c.left }}
              >
                <Cube
                  label={c.label}
                  size={c.size}
                  duration={c.duration}
                  delay={c.delay}
                  initRotX={c.initRotX}
                  initRotY={c.initRotY}
                />
              </div>
            ))}
          </div>

        </div>
      </div>

    </section>
  );
}
