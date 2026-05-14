'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const PLANS = [
  {
    key: 'plus',
    label: 'Plus',
    tagline: 'Start with zero commitment. Prove the platform works for you.',
    price: 'Free',
    cadence: null,
    commission: '60%',
    features: ['Anonymous identity', 'Deal desk access', 'Email support', '5% referral bonus'],
    cta: 'Start for Free',
    highlighted: false,
  },
  {
    key: 'pro',
    label: 'Pro',
    tagline: 'Built for agents who close every month and want to keep more.',
    price: 'AED 1,200',
    cadence: '/ year',
    commission: '80%',
    features: ['Everything in Plus', 'iClose Academy training', 'Priority deal desk', '5% referral bonus'],
    cta: 'Get Pro',
    highlighted: false,
  },
  {
    key: 'pro_max',
    label: 'Pro Max',
    tagline: 'Independent brokers scaling solo — without the overhead.',
    price: 'AED 40,000',
    cadence: '/ year',
    commission: '90%',
    features: ['Labour & visa included', 'Listings included', 'Dedicated RM', 'iClose Academy + playbooks', '5% referral bonus'],
    cta: 'Get Pro Max',
    highlighted: true,
  },
  {
    key: 'ultra',
    label: 'Ultra',
    tagline: 'Full back-office. You run deals. We run everything else.',
    price: 'AED 100,000',
    cadence: '/ year',
    commission: '100%',
    features: ['Everything done for you', 'Finance & admin', 'Dedicated account manager', 'Priority concierge', '5% referral bonus'],
    cta: 'Get Ultra',
    highlighted: false,
  },
];

export function S2Pricing() {
  return (
    <section id="plans" className="bg-[#0d0d0d] py-20 sm:py-28 md:py-36 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-gold-accent font-semibold text-sm mb-4 uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              Pricing
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="text-white font-black"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 4.5rem)',
                letterSpacing: '-0.038em',
                lineHeight: 0.96,
              }}
            >
              Your production.
              <br />
              Your earnings.
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-white/40 max-w-sm"
            style={{ fontSize: '1.0625rem', letterSpacing: '-0.012em' }}
          >
            Four tiers. Every one anonymous. The more you invest, the more commission you keep — up to 100%.
          </motion.p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl p-7 transition-all ${
                plan.highlighted
                  ? 'bg-white text-black'
                  : 'bg-white/[0.05] border border-white/10 hover:bg-white/[0.08] hover:border-white/20'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gold-accent text-black text-xs font-bold whitespace-nowrap" style={{ letterSpacing: '-0.01em' }}>
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <p className={`text-xs font-bold uppercase mb-3 ${plan.highlighted ? 'text-black/40' : 'text-white/30'}`} style={{ letterSpacing: '0.1em' }}>
                  {plan.label}
                </p>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  <span
                    className={`font-black ${plan.highlighted ? 'text-black' : 'text-white'}`}
                    style={{ fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)', letterSpacing: '-0.035em', lineHeight: 1 }}
                  >
                    {plan.price}
                  </span>
                  {plan.cadence && (
                    <span className={`text-sm font-medium ${plan.highlighted ? 'text-black/40' : 'text-white/30'}`}>
                      {plan.cadence}
                    </span>
                  )}
                </div>
                <p className={`mt-3 text-sm leading-snug ${plan.highlighted ? 'text-black/60' : 'text-white/40'}`} style={{ letterSpacing: '-0.01em' }}>
                  {plan.tagline}
                </p>
              </div>

              <div className={`py-4 mb-4 border-t border-b ${plan.highlighted ? 'border-black/10' : 'border-white/10'} flex items-center justify-between`}>
                <span className={`text-xs font-semibold uppercase ${plan.highlighted ? 'text-black/40' : 'text-white/30'}`} style={{ letterSpacing: '0.06em' }}>Commission</span>
                <span
                  className={`font-black ${plan.highlighted ? 'text-black' : 'text-white'}`}
                  style={{ fontSize: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1 }}
                >
                  {plan.commission}
                </span>
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-black/70' : 'text-white/50'}`} style={{ letterSpacing: '-0.01em' }}>
                    <Check className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.highlighted ? 'text-black' : 'text-gold-accent'}`} strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#apply"
                onClick={() => trackEvent('cta_click', { source: `plan_${plan.key}_s2` })}
                className={`mt-auto inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  plan.highlighted
                    ? 'bg-black text-white hover:bg-black/80'
                    : 'bg-white text-black hover:bg-white/90'
                }`}
                style={{ letterSpacing: '-0.01em' }}
              >
                {plan.cta}
                <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 text-center text-sm text-white/25"
          style={{ letterSpacing: '-0.01em' }}
        >
          All plans include a 5% lifetime referral bonus on every agent you bring in.
        </motion.p>
      </div>
    </section>
  );
}
