'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const PLANS = [
  {
    key: 'starter',
    badge: null,
    label: 'iClose Starter',
    priceDisplay: 'AED 0',
    priceSub: '/d',
    priceMeta: 'Free forever',
    tagline: 'Jumpstart your growth with free access to foundational deal-desk support and commission structure.',
    cta: 'Claim Your Free Access →',
    ctaStyle: 'border',
    commission: '60%',
    features: [
      'Anonymous identity on every deal',
      'Access to the deal desk',
      'Email support',
      'Bi-weekly market briefings',
      'Invitations to in-person events',
    ],
    highlighted: false,
  },
  {
    key: 'plus',
    badge: 'Best Value',
    label: 'iClose Plus',
    priceDisplay: 'AED 3.29',
    priceSub: '/day*',
    priceMeta: 'Billed annually at AED 1,200',
    tagline: 'Advanced training and community support to accelerate your results.',
    cta: 'Explore Plus →',
    ctaStyle: 'lime',
    commission: '80%',
    features: [
      'Everything in Starter',
      'iClose Academy — all area playbooks',
      'Monthly Q&A with deal desk specialists',
      'Priority deal desk access',
      'Access to 18+ community deep-dives',
      "Dubai's secondary market courses",
      'Access to scripts, templates, guides',
    ],
    highlighted: true,
  },
  {
    key: 'pro',
    badge: null,
    label: 'iClose Pro',
    priceDisplay: 'AED 109',
    priceSub: '/day*',
    priceMeta: 'Billed annually at AED 40,000',
    tagline: 'Premium, full back-office support and exclusive strategies to dominate the Dubai market.',
    cta: 'Explore Pro →',
    ctaStyle: 'blue',
    commission: '90–100%',
    features: [
      'Everything included in Plus, plus:',
      'Labour card & visa included',
      'Listings included',
      'Dedicated relationship manager',
      '1:1 sessions with a senior deal specialist',
      'Exclusive community events with founders',
      'Finance, admin, and invoicing handled',
    ],
    highlighted: false,
  },
];

export function S2Pricing() {
  return (
    <section id="plans" className="bg-cream py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-lime-text font-semibold text-xs uppercase mb-10 text-center"
          style={{ letterSpacing: '0.12em' }}
        >
          Choose Your Plan
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={`relative flex flex-col rounded-2xl p-7 ${
                plan.highlighted
                  ? 'bg-white border-2 border-[#1A1A1A] shadow-lg'
                  : 'bg-white border border-sellit-border'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-lime text-[#1A1A1A] text-xs font-bold" style={{ letterSpacing: '-0.01em' }}>
                  {plan.badge}
                </div>
              )}

              <div className="mb-6">
                <p className="text-sellit-muted text-xs font-semibold uppercase mb-3" style={{ letterSpacing: '0.08em' }}>
                  {plan.label}
                </p>
                <div className="flex items-end gap-1 mb-1">
                  <span
                    className="font-display font-extrabold text-[#1A1A1A]"
                    style={{ fontSize: 'clamp(2rem, 3vw, 2.75rem)', letterSpacing: '-0.04em', lineHeight: 1 }}
                  >
                    {plan.priceDisplay}
                  </span>
                  <span className="text-sellit-muted text-sm mb-1">{plan.priceSub}</span>
                </div>
                <p className="text-sellit-muted text-xs" style={{ letterSpacing: '-0.005em' }}>{plan.priceMeta}</p>
                <p className="text-[#1A1A1A]/70 text-sm leading-snug mt-3" style={{ letterSpacing: '-0.01em' }}>
                  {plan.tagline}
                </p>
              </div>

              <a
                href="#apply"
                className={`inline-flex items-center justify-center py-3 rounded-full text-sm font-semibold mb-7 transition-all ${
                  plan.ctaStyle === 'lime'
                    ? 'bg-lime text-[#1A1A1A] hover:bg-lime-dark'
                    : plan.ctaStyle === 'blue'
                    ? 'bg-[#4361D8] text-white hover:bg-[#3451C8]'
                    : 'border border-sellit-border text-[#1A1A1A] hover:border-[#1A1A1A]'
                }`}
                style={{ letterSpacing: '-0.01em' }}
              >
                {plan.cta}
              </a>

              <div className="border-t border-sellit-border pt-6">
                <p className="text-xs text-sellit-muted font-semibold uppercase mb-3" style={{ letterSpacing: '0.08em' }}>
                  Commission: <span className="text-[#1A1A1A] text-sm font-bold normal-case">{plan.commission}</span>
                </p>
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]/75" style={{ letterSpacing: '-0.008em' }}>
                      <Check className="h-4 w-4 mt-0.5 text-[#1A1A1A] flex-shrink-0" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-7 text-center text-xs text-sellit-muted" style={{ letterSpacing: '-0.005em' }}>
          *Price shown per day when billed annually. All plans include a 5% lifetime referral bonus on every agent you bring in.
        </p>
      </div>
    </section>
  );
}
