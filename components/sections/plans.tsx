'use client';

import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

interface Plan {
  key: string;
  label: string;
  tagline: string;
  price: string;
  cadence?: string;
  splitPct: number;
  features: string[];
  isStar: boolean;
}

const PLANS: Plan[] = [
  {
    key: 'plus',
    label: 'Plus',
    tagline: 'Start with zero commitment. Prove the platform works for you.',
    price: 'Free',
    splitPct: 60,
    features: [
      'Stay completely anonymous',
      'Access to the deal desk',
      'Email support',
    ],
    isStar: false,
  },
  {
    key: 'pro',
    label: 'Pro',
    tagline: 'Built for agents who close every month and want to keep more of it.',
    price: 'AED 1,200',
    cadence: '/ year',
    splitPct: 80,
    features: [
      'Everything in Plus',
      'iClose Academy training',
      'Priority deal desk',
    ],
    isStar: false,
  },
  {
    key: 'pro_max',
    label: 'Pro Max',
    tagline: 'Independent brokers scaling solo — without the overhead.',
    price: 'AED 40,000',
    cadence: '/ year',
    splitPct: 90,
    features: [
      'Labour & visa included',
      'Listings included',
      'Dedicated relationship manager',
      'iClose Academy + area playbooks',
    ],
    isStar: true,
  },
  {
    key: 'ultra',
    label: 'Ultra',
    tagline: 'Full-service back office. You run deals. We run everything else.',
    price: 'AED 100,000',
    cadence: '/ year',
    splitPct: 100,
    features: [
      'Everything done for you',
      'Dedicated account manager',
      'Finance, admin, and invoicing',
      'Priority RM + concierge',
    ],
    isStar: false,
  },
];

export function Plans() {
  return (
    <section id="plans" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <h2 className="display-lg text-balance">
              Your production. Your earnings.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 mx-auto max-w-2xl">
              Four tiers. Every one anonymous. The more you invest in the platform, the more commission you keep — up to 100%.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pt-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                plan.isStar
                  ? 'card-surface ring-2 ring-ink p-6 md:p-8 lg:p-7 xl:p-8 flex flex-col relative'
                  : 'card-surface p-6 md:p-8 lg:p-7 xl:p-8 flex flex-col'
              }
            >
              {plan.isStar && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink text-white text-[12px] font-medium tracking-tight whitespace-nowrap">
                  Most popular
                </span>
              )}

              <p className="text-sm font-medium text-graphite tracking-tight">
                {plan.label}
              </p>

              <div className="mt-3 flex items-baseline gap-1.5 flex-wrap">
                <span
                  className="font-display font-semibold text-ink"
                  style={{ fontSize: 'clamp(1.625rem, 2.4vw, 2.25rem)', letterSpacing: '-0.025em', lineHeight: 1 }}
                >
                  {plan.price}
                </span>
                {plan.cadence && (
                  <span className="text-sm text-graphite tracking-tight">{plan.cadence}</span>
                )}
              </div>

              <p
                className="mt-4 text-[15px] text-graphite-dark leading-[1.45] min-h-[3em]"
                style={{ letterSpacing: '-0.012em' }}
              >
                {plan.tagline}
              </p>

              <div className="hairline my-6" />

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-graphite tracking-tight">Commission split</span>
                  <span className="text-[17px] font-medium text-ink tabular-nums" style={{ letterSpacing: '-0.012em' }}>
                    {plan.splitPct} / {100 - plan.splitPct}
                  </span>
                </div>
              </div>

              <div className="hairline my-6" />

              <ul className="space-y-2.5 mb-8">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-[15px] text-ink"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    <Check className="h-4 w-4 mt-0.5 text-ink flex-shrink-0" strokeWidth={2.5} />
                    <span>{f}</span>
                  </li>
                ))}
                <li
                  className="flex items-start gap-2.5 text-[15px] text-ink"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  <Check className="h-4 w-4 mt-0.5 text-ink flex-shrink-0" strokeWidth={2.5} />
                  <span>Anonymous, always</span>
                </li>
              </ul>

              <a href="#apply" className="applelink mt-auto">
                Get started
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-graphite tracking-tight">
          All plans include a 5% lifetime referral bonus on every agent you bring in.
        </p>
      </div>
    </section>
  );
}
