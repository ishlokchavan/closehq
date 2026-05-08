'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { LeadForm } from '@/components/lead-form';

export function FinalCTA() {
  return (
    <section id="apply" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <h2 className="display-lg text-balance">
              Ready to keep 100%?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 max-w-2xl mx-auto">
              Application takes under two minutes. We respond within one business day.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-5xl mx-auto">
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              {[
                'Paid the moment the buyer signs',
                'Zero monthly fees',
                'Dedicated broker support',
                'RERA & SCA approved',
              ].map((trust) => (
                <div key={trust} className="flex items-center gap-3 text-[17px] text-ink" style={{ letterSpacing: '-0.012em' }}>
                  <Check className="h-5 w-5 text-ink flex-shrink-0" strokeWidth={2} />
                  <span>{trust}</span>
                </div>
              ))}
            </motion.div>

            <div className="hairline my-10" />

            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="display-sm text-ink">&lt;1 day</div>
                <div className="mt-1 text-sm text-graphite tracking-tight">Response time</div>
              </div>
              <div>
                <div className="display-sm text-ink">100%</div>
                <div className="mt-1 text-sm text-graphite tracking-tight">Confidential</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7"
          >
            <div className="card-surface p-6 sm:p-8 md:p-12">
              <h3 className="display-sm">Get started.</h3>
              <p className="mt-2 text-base text-graphite-dark" style={{ letterSpacing: '-0.012em' }}>
                Tell us a bit about yourself.
              </p>
              <div className="hairline my-8" />
              <LeadForm />
              <p className="mt-6 text-center text-[13px] text-graphite tracking-tight">
                Encrypted in transit. Never shared.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
