'use client';

import { motion } from 'framer-motion';
import { Briefcase, Award, GraduationCap } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { MobileCarousel } from '@/components/ui/mobile-carousel';

const AUDIENCES = [
  {
    icon: Briefcase,
    tag: 'For Members',
    headline: 'Close deals. Keep more of what you earn.',
    body: "Whether you're an agent building expertise in the secondary market, a broker with active buyers, or a professional whose clients need the right asset — join as a Member, access the iClose Academy, and close deals with up to 100% commission on your side. Free to start. No desk fees.",
    cta: { label: 'Join as a Member', href: '#apply' },
  },
  {
    icon: Award,
    tag: 'For Area Specialists',
    headline: 'Your expertise, put to work at scale.',
    body: "If you know a specific community or building better than anyone else, iClose puts you in front of a growing network of members with active requirements. Apply, get vetted, publish your area knowledge on the Academy, and become the first call when a member needs exactly what you know.",
    cta: { label: 'Apply as a Specialist', href: '/specialists' },
  },
  {
    icon: GraduationCap,
    tag: 'For Developer RMs',
    headline: 'A ready pool of serious agents. Built for you.',
    body: "Join iClose as the dedicated Relationship Manager for your developer. Educate members on your projects through the Academy, be the direct contact when they are ready to move off-plan inventory, and build long-term relationships with professionals who close. Your pipeline — inside ours.",
    cta: { label: 'Apply as a Developer RM', href: '/specialists' },
  },
];

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

function AudienceCard({ a }: { a: typeof AUDIENCES[number] }) {
  const Icon = a.icon;
  return (
    <div className="card-mist p-8 sm:p-10 flex flex-col h-full">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-paper border border-hairline mb-5">
        <Icon className="h-5 w-5 text-ink" strokeWidth={1.5} />
      </div>
      <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-3">
        {a.tag}
      </p>
      <h3 className="display-sm mb-4 text-balance">{a.headline}</h3>
      <p className="text-[17px] text-graphite-dark leading-[1.55] flex-1" style={{ letterSpacing: '-0.012em' }}>
        {a.body}
      </p>
      <a href={a.cta.href} className="applelink mt-8">
        {a.cta.label}
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  );
}

export function ForWho() {
  const cards = AUDIENCES.map((a) => <AudienceCard key={a.tag} a={a} />);

  return (
    <section id="who" className="bg-paper py-16 sm:py-20 md:py-24 lg:py-32">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-18">
          <Reveal>
            <h2 className="display-lg text-balance">
              One platform. Three distinct roles.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="subhead mt-5 max-w-xl">
              iClose serves members who close deals, area specialists who share expertise, and developer RMs who connect members to off-plan inventory. Each role makes the platform more valuable for the others.
            </p>
          </Reveal>
        </div>

        {/* Mobile carousel */}
        <MobileCarousel
          items={cards}
          className="md:hidden"
          ariaLabel="Audience types"
        />

        {/* Desktop grid */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="hidden md:grid grid-cols-3 gap-4"
        >
          {AUDIENCES.map((a) => (
            <motion.div key={a.tag} variants={item}>
              <AudienceCard a={a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
