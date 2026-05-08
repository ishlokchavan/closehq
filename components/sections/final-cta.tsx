'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';
import { LeadForm } from '@/components/lead-form';
import { CheckCircle2 } from 'lucide-react';

const CTA_IMAGE = '/images/property-beachfront.jpg';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function FinalCTA() {
  return (
    <section
      id="apply"
      className="relative bg-gradient-to-b from-white to-white py-28 md:py-40 overflow-hidden grain"
    >
      {/* Background image - subtle */}
      <div className="absolute inset-0 -z-10 opacity-15">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          quality={70}
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        {/* Accent glow */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-gold/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left side - copy and trust markers */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <Reveal>
              <SectionLabel number="11" label="Last step" />
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="display-md mt-8 text-ink text-balance font-display font-light leading-[0.95]">
                <span className="block">Lock in your</span>
                <span className="block bg-gradient-to-r from-gold via-gold/80 to-gold/60 bg-clip-text text-transparent">
                  90% commission
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg text-ink/75 leading-relaxed font-light">
                Join 500+ elite brokers already closing high-value deals on their terms. Application takes under 2 minutes.
              </p>
            </Reveal>

            {/* Trust indicators */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="mt-10 space-y-3"
            >
              {[
                'Instant SPA advance',
                'Zero monthly fees',
                'Dedicated broker support',
                'Regulatory approved',
              ].map((trust) => (
                <motion.div
                  key={trust}
                  variants={item}
                  className="flex items-center gap-3 text-sm text-ink/70"
                >
                  <CheckCircle2 className="h-4 w-4 text-gold flex-shrink-0" />
                  <span>{trust}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Proof section */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="mt-12 pt-8 border-t border-ink/10 space-y-4"
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-display font-light text-gold">
                    &lt;1 day
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-ink/50">
                    Response time
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-display font-light text-gold">
                    100%
                  </div>
                  <div className="mt-1 text-xs font-mono uppercase tracking-[0.2em] text-ink/50">
                    Confidential
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Form with premium styling */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="relative group">
              {/* Glow background */}
              <div className="absolute -inset-1 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Form card */}
              <div className="relative backdrop-blur-xl bg-white/40 border border-gold/30 rounded-3xl p-8 md:p-12 overflow-hidden">
                {/* Header accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold/40 via-gold/20 to-transparent" />

                <div>
                  <h3 className="font-display text-2xl md:text-3xl text-ink font-light tracking-tight">
                    Apply now
                  </h3>
                  <p className="mt-2 text-sm text-ink/60 font-light">
                    Join the platform in less than 2 minutes
                  </p>
                </div>

                <div className="hairline my-8" />

                <LeadForm />

                {/* Footer text */}
                <div className="mt-8 text-xs text-ink/50 text-center leading-relaxed">
                  We process applications 24/7. Your details are encrypted and never shared.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="mt-20 pt-12 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-ink/60"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-light">Live in 150+ countries</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-light">Serving 500+ elite brokers</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-light">30-day money-back guarantee</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
