'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const PROFILES = [
  {
    tag: 'Profile 1: Learner',
    headline: 'Education that pays.',
    body: 'Most professionals enter the secondary market on guesswork. iClose Academy gives you structured knowledge from area experts who are actively closing: building deep-dives, area playbooks, and developer briefings direct from the source. The faster you learn, the sooner you close.',
    points: [
      'Area playbooks from experts who live and close there',
      'Developer briefings from RMs, direct from the source',
      'Close a deal through iClose. Keep up to 100%.',
    ],
    cta: { label: 'Join for free', href: '#apply' },
    starred: false,
  },
  {
    tag: 'Profile 2: Educator',
    headline: 'Your expertise has an audience. We built the stage.',
    body: "Area experts and developer RMs hold some of the most valuable knowledge in Dubai real estate. iClose gives you a platform to structure it, share it, and build the kind of authority that makes your phone ring, without the cold outreach.",
    points: [
      'Publish area playbooks, building guides, and developer briefs',
      'Get matched directly on member inquiries in your domain',
      'Build a reputation that generates pipeline on autopilot',
    ],
    cta: { label: 'Share your expertise', href: '/specialists' },
    starred: true,
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function ProfileCard({ p }: { p: typeof PROFILES[number] }) {
  return (
    <div className={`card-surface p-8 sm:p-10 flex flex-col h-full${p.starred ? ' ring-2 ring-ink' : ''}`}>
      <p className="text-[11px] font-medium tracking-tight text-graphite mb-4">{p.tag}</p>
      <h3 className="display-sm mb-4 text-balance">{p.headline}</h3>
      <p className="text-[16px] text-graphite-dark leading-[1.6] mb-8" style={{ letterSpacing: '-0.012em' }}>
        {p.body}
      </p>
      <ul className="space-y-3 flex-1 mb-8">
        {p.points.map((pt) => (
          <li key={pt} className="flex items-start gap-2.5 text-[15px] text-ink" style={{ letterSpacing: '-0.012em' }}>
            <Check className="h-4 w-4 mt-0.5 text-ink flex-shrink-0" strokeWidth={2.5} />
            <span>{pt}</span>
          </li>
        ))}
      </ul>
      <a href={p.cta.href} className="applelink mt-auto">
        {p.cta.label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export function ForWho() {
  const cards = PROFILES.map((p) => <ProfileCard key={p.tag} p={p} />);

  return (
    <section id="who" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-18">
          <Reveal>
            <h2 className="display-lg text-balance">
              Two reasons to be here. One platform.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-5 max-w-xl">
              Whether you are here to learn and earn, or to share what you know and build your authority: iClose was built for both.
            </p>
          </Reveal>
        </div>

        <MobileCarousel items={cards} className="md:hidden" ariaLabel="Who iClose is for" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="hidden md:grid grid-cols-2 gap-5"
        >
          {PROFILES.map((p) => (
            <motion.div key={p.tag} variants={item}>
              <ProfileCard p={p} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
