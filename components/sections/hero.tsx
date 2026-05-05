'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { whatsappLink } from '@/lib/site-config';
import { trackEvent } from '@/lib/analytics';

const HERO_IMAGE = '/images/hero-luxury.jpg';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-white">
      {/* Background image with light overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Dubai luxury real estate"
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Light gradient overlay for readability */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/70 to-white/80"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-white/90 via-transparent to-transparent"
        />
        {/* Subtle radial accent */}
        <div
          aria-hidden
          className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gold/10 to-transparent blur-3xl pointer-events-none"
        />
      </div>

      {/* Floating accent cards - premium Dubai aesthetic */}
      <div className="hidden lg:block absolute top-20 right-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/30 to-gold/10 rounded-2xl blur-2xl" />
          <div className="relative backdrop-blur-xl bg-white/40 border border-gold/40 rounded-2xl p-5 text-sm font-mono text-gold">
            Premium Tier
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-x relative pt-24 md:pt-28 pb-16 min-h-[100svh] flex flex-col">
        {/* Eyebrow with premium badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-12 md:mb-16"
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/20 border border-gold/50 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-gold animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold">
              For Elite Brokers
            </span>
          </div>
        </motion.div>

        <div className="flex-1 grid lg:grid-cols-12 gap-8 lg:gap-16 items-center lg:items-end">
          <div className="lg:col-span-7">
            {/* Main headline - aggressive and benefit-driven */}
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-2"
            >
              <motion.h1
                variants={item}
                className="display-lg text-ink text-balance font-display font-light leading-[0.95]"
              >
                <span className="block">Keep 90%</span>
                <span className="block bg-gradient-to-r from-gold via-gold/90 to-gold/70 bg-clip-text text-transparent">
                  Get paid in 24h
                </span>
              </motion.h1>
            </motion.div>

            {/* Subheadline - direct value prop */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 max-w-lg text-lg md:text-xl text-ink/80 leading-relaxed font-display font-light"
            >
              The platform designed for HNW brokers who refuse to leave money on the table. Zero desk fees. Advance on SPA. Legendary payouts.
            </motion.p>

            {/* Trust markers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-8 flex flex-wrap gap-4 text-sm text-ink/70"
            >
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>Licensed & Regulated</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>SCA Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-gold" />
                <span>Trusted by 500+ Agents</span>
              </div>
            </motion.div>

            {/* CTA Group - aggressive primary, secondary as support */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-12 flex flex-col sm:flex-row gap-4 sm:items-center"
            >
              <a
                href="#apply"
                onClick={() => trackEvent('cta_click', { source: 'hero_primary' })}
                className="group"
              >
                <Button
                  variant="gold"
                  size="lg"
                  className="w-full sm:w-auto relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/30"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Earning 90%
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', { source: 'hero_secondary' })
                }
                className="group"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Talk to an Agent</span>
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right side - Premium stats card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Glow background */}
              <div className="absolute -inset-2 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent rounded-3xl blur-2xl" />

              {/* Card */}
              <div className="relative backdrop-blur-xl bg-white/60 border border-gold/40 rounded-3xl p-8 md:p-10 space-y-8">
                {/* Header */}
                <div className="border-b border-gold/30 pb-8">
                  <div className="text-[13px] font-mono uppercase tracking-[0.3em] text-gold mb-3">
                    Why top brokers choose us
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-light text-ink leading-tight">
                    The economics<br />of keeping more
                  </h3>
                </div>

                {/* Stats */}
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  {[
                    { value: '90%', label: 'Commission Cap', desc: 'Industry-leading splits' },
                    { value: '24h', label: 'Fast Payout', desc: 'After SPA signature' },
                    { value: 'AED 0', label: 'Monthly Fees', desc: 'Zero desk charges' },
                  ].map((stat) => (
                    <motion.div key={stat.label} variants={item} className="group">
                      <div className="flex items-baseline justify-between gap-4 mb-2">
                        <div className="font-display text-3xl md:text-4xl font-light text-ink group-hover:text-gold transition-colors duration-300">
                          {stat.value}
                        </div>
                        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-ink/50">
                          {stat.label}
                        </div>
                      </div>
                      <p className="text-sm text-ink/60 group-hover:text-ink/70 transition-colors duration-300">
                        {stat.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator - subtle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="hidden lg:flex absolute bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-3"
        >
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
            Discover more
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-8 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
