'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function S2Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
      {/* Background image — very dark */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-night.jpg"
          alt="Dubai skyline"
          fill
          priority
          quality={85}
          className="object-cover object-center scale-105"
          style={{ filter: 'brightness(0.18) saturate(0.6)' }}
        />
        {/* Radial glow centre */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_60%,rgba(232,184,75,0.06),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-accent/40 bg-gold-accent/10 text-gold-accent text-sm font-semibold tracking-wide uppercase"
            style={{ letterSpacing: '0.06em', fontSize: '11px' }}
          >
            ✦ Dubai's #1 Independent Brokerage Platform
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-black leading-none text-balance"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8.5rem)',
            letterSpacing: '-0.04em',
            lineHeight: 0.92,
          }}
        >
          Close More.
          <br />
          <span className="text-gold-accent">Keep More.</span>
        </motion.h1>

        {/* Subhead */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 text-white/60 max-w-2xl text-balance leading-relaxed"
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.375rem)', letterSpacing: '-0.015em' }}
        >
          iClose is Dubai's independent brokerage platform. Work anonymously, access deal desk support, and keep up to 100% of every commission you earn.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <a
            href="#apply"
            onClick={() => trackEvent('cta_click', { source: 'hero_primary_s2' })}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black font-bold text-base hover:bg-white/90 active:scale-95 transition-all"
            style={{ letterSpacing: '-0.015em' }}
          >
            Start for Free
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </a>
          <a
            href="#how"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/25 text-white font-medium text-base hover:border-white/50 hover:bg-white/5 transition-all"
            style={{ letterSpacing: '-0.015em' }}
          >
            See how it works
          </a>
        </motion.div>

        {/* Micro trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex items-center justify-center gap-6 flex-wrap"
        >
          {[
            '✓ No card required',
            '✓ Anonymous, always',
            '✓ 60%+ commission from day one',
          ].map((item) => (
            <span key={item} className="text-white/35 text-sm font-medium" style={{ letterSpacing: '-0.01em' }}>
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
