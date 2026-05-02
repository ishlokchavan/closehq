'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1920&q=80&auto=format&fit=crop';

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-ink grain">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Dubai skyline at dusk seen from a luxury balcony"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient veils */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/30 to-transparent"
        />
      </div>

      {/* Vertical side label */}
      <div className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-bone/40 v-text">
        <span>Dubai · UAE</span>
        <span className="h-px w-12 bg-bone/20" />
        <span>Est. 2025</span>
      </div>

      {/* Content */}
      <div className="container-x relative pt-32 md:pt-36 pb-20 min-h-[100svh] flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 mb-10 md:mb-14"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-gold animate-shimmer" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-bone/70">
            Built for closers in Dubai
          </span>
        </motion.div>

        <div className="flex-1 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-8">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="display-lg text-bone text-balance"
            >
              Close Dubai deals
              <br />
              <span className="italic font-normal text-gold">on your terms.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-xl text-base md:text-lg text-bone/70 leading-relaxed text-pretty"
            >
              Up to <span className="text-bone font-medium">90% commission</span>,
              advance on SPA, and zero monthly fees. A platform built for
              freelance agents and connectors who want to keep what they earn.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#apply"
                onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
              >
                <Button variant="gold" size="lg" className="w-full sm:w-auto">
                  Start closing deals
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', { source: 'hero_secondary' })
                }
              >
                <Button variant="ghost" size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="h-4 w-4" />
                  Speak on WhatsApp
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right rail KPIs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-4 grid grid-cols-3 lg:grid-cols-1 gap-px bg-bone/10 border border-bone/10 backdrop-blur-sm"
          >
            {[
              { kpi: '90%', label: 'Max commission' },
              { kpi: '48h', label: 'Avg payout' },
              { kpi: '0', label: 'Monthly fees' },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-ink/40 backdrop-blur-md p-5 lg:p-6"
              >
                <div className="font-display text-3xl lg:text-4xl text-bone font-light tracking-tight">
                  {item.kpi}
                </div>
                <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
                  {item.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-bone/40"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <span className="h-10 w-px bg-gradient-to-b from-bone/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
