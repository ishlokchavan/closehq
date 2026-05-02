'use client';

import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';
import { trackEvent } from '@/lib/analytics';

export function Referral() {
  return (
    <section className="relative bg-bone-200 text-ink py-24 md:py-32 overflow-hidden">
      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel
                number="04"
                label="Referral program"
                variant="light"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-6 text-balance">
                Bring an agent.
                <br />
                <span className="italic font-normal text-gold-dark">
                  Earn for life.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-ink/70 leading-relaxed text-pretty max-w-lg">
                Refer another agent or connector to the platform and you earn{' '}
                <span className="text-ink font-medium">
                  5% of every commission they generate
                </span>
                — not for a quarter, not for a year. For as long as they keep
                closing.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#apply"
                onClick={() =>
                  trackEvent('cta_click', { source: 'referral_section' })
                }
                className="inline-flex mt-10"
              >
                <Button variant="dark" size="lg">
                  Join &amp; refer
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </a>
            </Reveal>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Concentric rings */}
              {[1, 2, 3].map((r) => (
                <div
                  key={r}
                  aria-hidden
                  className="absolute inset-0 rounded-full border border-ink/10"
                  style={{
                    transform: `scale(${1 - r * 0.18})`,
                  }}
                />
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                  Lifetime payout
                </div>
                <div className="font-display text-[18vw] md:text-[12rem] leading-none font-light tracking-tightest text-ink">
                  5<span className="text-gold-dark">%</span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-sm text-ink/60">
                  <Users className="h-4 w-4" strokeWidth={1.5} />
                  on every deal they close
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
