'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';

const SPECIALIST_STEPS = [
  {
    number: '1',
    title: 'Apply online.',
    body: 'Submit your application at iclose.ae/specialists. Tell us the areas or buildings you specialise in and your transaction history.',
  },
  {
    number: '2',
    title: 'Get reviewed and vetted.',
    body: 'The iClose team reviews your application. We verify your expertise before you join — quality matters more than volume.',
  },
  {
    number: '3',
    title: 'Publish your knowledge on the Academy.',
    body: 'Create area playbooks, building deep-dives, and market guides. Your content educates members and builds your authority on the platform.',
  },
  {
    number: '4',
    title: 'Get matched on live member inquiries.',
    body: 'When a member posts a requirement in your domain, you are the first and only call. Your expertise directly drives deal flow.',
  },
];

const RM_STEPS = [
  {
    number: '1',
    title: 'Apply as a Developer RM.',
    body: "Submit your application at iclose.ae/specialists. Let us know which developer you represent and the projects in your portfolio.",
  },
  {
    number: '2',
    title: 'Get onboarded as an iClose partner.',
    body: "Our team reviews your application and onboards your developer's projects onto the platform. Your inventory becomes visible to a vetted network of active agents.",
  },
  {
    number: '3',
    title: 'Educate members through the Academy.',
    body: 'Publish launch briefings, project overviews, and payment plan guides. Members come to you informed — shortening the sales cycle for everyone.',
  },
  {
    number: '4',
    title: 'Serve as the dedicated RM for iClose members.',
    body: 'Be the direct, human contact for members who are ready to move. Build lasting relationships with a network of professionals who close consistently.',
  },
];

function StepList({ steps }: { steps: typeof SPECIALIST_STEPS }) {
  return (
    <div className="space-y-4">
      {steps.map((step, i) => (
        <motion.div
          key={step.number}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-5"
        >
          <span
            className="font-display font-semibold text-graphite-light shrink-0 w-5 text-right"
            style={{ fontSize: '1.1rem', lineHeight: '1.6rem', letterSpacing: '-0.02em' }}
          >
            {step.number}
          </span>
          <div>
            <p className="text-[15px] font-medium text-ink mb-1" style={{ letterSpacing: '-0.012em' }}>
              {step.title}
            </p>
            <p className="text-[15px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
              {step.body}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function SpecialistPath() {
  return (
    <section id="specialist-path" className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
      <div className="container-wide">
        <div className="max-w-2xl mb-14 md:mb-16">
          <Reveal>
            <h2 className="display-lg text-balance">
              Join as a Specialist or Developer RM.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="subhead mt-5 max-w-xl">
              Two distinct roles. One clear process. Both give you access to a growing network of professionals who are actively closing.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Area Specialists */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface p-8 sm:p-10 flex flex-col"
          >
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-4">
              Area Specialists
            </p>
            <h3 className="display-sm mb-2">
              Share your area expertise. Build your authority.
            </h3>
            <p className="text-[15px] text-graphite-dark leading-[1.5] mb-8" style={{ letterSpacing: '-0.012em' }}>
              You know a community or building better than anyone. iClose gives you the platform to prove it — and a network of professionals who will act on it.
            </p>
            <StepList steps={SPECIALIST_STEPS} />
            <a href="/specialists" className="applelink mt-8">
              Apply as an Area Specialist
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>

          {/* Developer RMs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface ring-2 ring-ink p-8 sm:p-10 flex flex-col"
          >
            <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-4">
              Developer RMs
            </p>
            <h3 className="display-sm mb-2">
              Become the dedicated RM for iClose members.
            </h3>
            <p className="text-[15px] text-graphite-dark leading-[1.5] mb-8" style={{ letterSpacing: '-0.012em' }}>
              As a Relationship Manager at a developer, iClose gives you a ready pipeline of serious, educated agents — without the cold outreach.
            </p>
            <StepList steps={RM_STEPS} />
            <a href="/specialists" className="applelink mt-8">
              Apply as a Developer RM
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
