'use client';

import { motion } from 'framer-motion';
import { UserCheck, PhoneCall, Banknote } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const STEPS = [
  {
    number: '1',
    icon: UserCheck,
    title: 'Join and pick your tier.',
    body: 'Sign up free as a Plus member. Access the deal desk, work anonymously, and keep 60% of every deal from day one. Upgrade any time to increase your split.',
  },
  {
    number: '2',
    icon: PhoneCall,
    title: 'Submit leads. Work the desk.',
    body: 'Bring your deals to the iClose deal desk. Our specialists support you through structuring, negotiation, and close — without ever revealing who you are.',
  },
  {
    number: '3',
    icon: Banknote,
    title: 'Collect when the buyer signs.',
    body: 'Commission is structured at signing. No chasing, no delays, no office politics. You sourced it — you get paid for it.',
  },
];

export function How() {
  return (
    <section id="how" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
            Simple by design.
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="card-surface p-8 sm:p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="display-md text-graphite-light">{step.number}</span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-mist">
                    <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="display-sm mb-3">{step.title}</h3>
                <p className="text-[17px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                  {step.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
