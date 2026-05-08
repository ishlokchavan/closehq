'use client';

import { motion } from 'framer-motion';
import { Check, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

interface Plan {
  name: string;
  price: string;
  cadence?: string;
  split: string;
  advance: string;
  highlights: string[];
  emphasis: string;
  featured?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'iClose Free',
    price: 'Free',
    split: '60 / 40',
    advance: '50 / 50 paid when buyer signs',
    emphasis: 'Try iClose with zero commitment.',
    highlights: [
      'Stay completely anonymous',
      'Access to the deal desk',
      'WhatsApp support',
    ],
  },
  {
    name: 'iClose Plus',
    price: 'AED 1,500',
    cadence: '/ month',
    split: '80 / 20',
    advance: '70 / 30 paid when buyer signs',
    emphasis: 'For active brokers closing every month.',
    highlights: [
      'Everything in Free',
      'iClose Academy training',
      'Priority deal desk',
    ],
  },
  {
    name: 'iClose Pro',
    price: 'AED 40,000',
    cadence: '/ year',
    split: '90 / 10',
    advance: '70 / 30 paid when buyer signs',
    emphasis: 'For independent brokers ready to scale solo.',
    featured: true,
    highlights: [
      'Labour & visa included',
      'Listings included',
      'A dedicated coach',
      'iClose Academy + area playbooks',
    ],
  },
  {
    name: 'iClose Pro Max',
    price: 'AED 100,000',
    cadence: '/ year',
    split: '100 %',
    advance: '90 / 10 paid when buyer signs',
    emphasis: 'Done for you. Run your practice, not the back office.',
    highlights: [
      'Everything done for you',
      'Dedicated account manager',
      'Finance, admin, and invoicing',
      'Priority coach + concierge',
    ],
  },
];

export function Plans() {
  return (
    <section id="plans" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-3xl mb-14 md:mb-20 text-center mx-auto">
          <Reveal>
            <h2 className="display-lg text-balance">
              Pick the way you want to work.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-6 mx-auto max-w-2xl">
              Four tiers. Same anonymity. The more you put in, the more you keep — up to 100%.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 pt-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={
                plan.featured
                  ? 'card-surface ring-2 ring-ink p-6 md:p-8 lg:p-7 xl:p-8 flex flex-col relative'
                  : 'card-surface p-6 md:p-8 lg:p-7 xl:p-8 flex flex-col'
              }
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-ink text-white text-[12px] font-medium tracking-tight whitespace-nowrap">
                  Most popular
                </span>
              )}

              <p className="text-sm font-medium text-graphite tracking-tight">
                {plan.name}
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
                {plan.emphasis}
              </p>

              <div className="hairline my-6" />

              <div className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm text-graphite tracking-tight">Commission split</span>
                  <span className="text-[17px] font-medium text-ink tabular-nums" style={{ letterSpacing: '-0.012em' }}>
                    {plan.split}
                  </span>
                </div>
                {/* <div className="flex items-baseline justify-between">
                  <span className="text-sm text-graphite tracking-tight">Paid on signing</span>
                  <span className="text-[15px] text-ink tabular-nums" style={{ letterSpacing: '-0.012em' }}>
                    {plan.advance}
                  </span>
                </div> */}
              </div>

              <div className="hairline my-6" />

              <ul className="space-y-2.5 mb-8">
                {plan.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-[15px] text-ink"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    <Check className="h-4 w-4 mt-0.5 text-ink flex-shrink-0" strokeWidth={2.5} />
                    <span>{h}</span>
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
                Get {plan.name}
                <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
              </a>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-graphite tracking-tight">
          All plans include 5% lifetime referral bonus on agents you bring in.
        </p>
      </div>
    </section>
  );
}
