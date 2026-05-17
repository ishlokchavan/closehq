'use client';

import { motion } from 'framer-motion';
import { UserPlus, BookOpenCheck, Handshake } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const STEPS = [
  {
    number: '1',
    icon: UserPlus,
    title: 'Join as a Member — free, instant access.',
    body: 'Sign up and get immediate access to the iClose community and the Academy. No desk fees, no monthly commitment, no lock-in. Your profile, your network, your pace.',
  },
  {
    number: '2',
    icon: BookOpenCheck,
    title: 'Learn from people who actually close.',
    body: 'Access area playbooks and building deep-dives published by vetted Area Specialists. Follow your developer\'s RM for off-plan pipeline updates and launch calendars. Build the knowledge that turns conversations into closings.',
  },
  {
    number: '3',
    icon: Handshake,
    title: 'Close a deal. Keep up to 100%.',
    body: 'Post a requirement or get matched directly with the right Specialist. The deal flows through iClose — and your commission split, starting at 60% on Plus and rising to 100% on Ultra, is paid to you when the buyer signs.',
  },
];

export function How() {
  return (
    <section id="how" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <Reveal>
          <h2 className="display-lg text-balance max-w-xl mb-3">
            How it works for members.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="subhead mb-14 md:mb-16 max-w-xl">
            Three steps from sign-up to your first closed deal.
          </p>
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
                className="card-mist p-8 sm:p-10"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="display-md text-graphite-light">{step.number}</span>
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-hairline">
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
