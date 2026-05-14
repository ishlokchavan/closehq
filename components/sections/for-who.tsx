'use client';

import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const AUDIENCES = [
  {
    icon: Briefcase,
    tag: 'For Professionals',
    headline: 'Your clients need the right asset. We have the right people.',
    body: "As a lawyer, accountant, financial adviser, or family office, your clients trust you with their investments. When they need a Dubai asset, you need someone you can trust in return. iClose connects you to vetted Specialists who know the market and have the inventory — so you can serve your clients without leaving your lane.",
    cta: { label: 'Join as a Member', href: '#apply' },
  },
  {
    icon: Award,
    tag: 'For Specialists',
    headline: 'Your expertise builds your authority — without a marketing budget.',
    body: "If you know a community or building better than anyone, iClose gives you the platform to prove it at no cost. Publish your knowledge, establish your authority within a professional network that has serious buyers, and when a Member inquiry falls within your domain, you are the first and only call to close it. Your expertise does the marketing.",
    cta: { label: 'Become a Specialist', href: '/specialists' },
  },
  {
    icon: GraduationCap,
    tag: 'For Agents',
    headline: 'Build secondary market expertise with knowledge from the inside.',
    body: "Most agents want to move into the secondary market but lack the tools to do it with confidence. iClose gives you structured content from Specialists who are actively working the areas you want to enter — area playbooks, building deep-dives, and community intelligence — so you go in prepared, not guessing.",
    cta: { label: 'Join as a Member', href: '#apply' },
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function ForWho() {
  return (
    <section id="who" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-18">
          <Reveal>
            <h2 className="display-lg text-balance">
              One community. Three clear reasons to be in it.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-5 max-w-xl">
              iClose is built around three types of professionals. Each one gets something distinct from the platform — and each one makes it stronger for the others.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {AUDIENCES.map((a) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.tag}
                variants={item}
                className="card-mist p-8 sm:p-10 flex flex-col"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-hairline mb-5">
                  <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
                </div>

                <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-3">
                  {a.tag}
                </p>

                <h3 className="display-sm mb-4 text-balance">
                  {a.headline}
                </h3>

                <p className="text-[17px] text-graphite-dark leading-[1.55] flex-1" style={{ letterSpacing: '-0.012em' }}>
                  {a.body}
                </p>

                <a href={a.cta.href} className="applelink mt-8">
                  {a.cta.label}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
