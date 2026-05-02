'use client';

import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';
import { SectionLabel } from '@/components/ui/section-label';
import { LeadForm } from '@/components/lead-form';

const CTA_IMAGE =
  'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=1600&q=80&auto=format&fit=crop';

export function FinalCTA() {
  return (
    <section
      id="apply"
      className="relative bg-ink py-24 md:py-32 overflow-hidden grain"
    >
      {/* Background image - subtle */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <Image
          src={CTA_IMAGE}
          alt=""
          fill
          loading="lazy"
          quality={70}
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>

      <div className="container-x relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-6 lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel number="06" label="Start now" />
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="display-md mt-6 text-bone text-balance">
                The next deal
                <br />
                <span className="italic font-normal text-gold">
                  starts with one message.
                </span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 text-lg text-bone/70 leading-relaxed text-pretty max-w-lg">
                Apply in 60 seconds. We&apos;ll review your profile and a senior
                closer will reach out personally — usually before tomorrow.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 grid grid-cols-2 gap-px bg-bone/10 border border-bone/10 max-w-md">
                {[
                  { kpi: '< 1 day', label: 'Response time' },
                  { kpi: '100%', label: 'Confidential' },
                ].map((item) => (
                  <div key={item.label} className="bg-ink p-5">
                    <div className="font-display text-2xl text-bone font-light">
                      {item.kpi}
                    </div>
                    <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/50">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="lg:col-span-6">
            <div className="bg-ink-800/80 backdrop-blur-sm border border-bone/10 p-7 md:p-10">
              <h3 className="font-display text-2xl text-bone font-light tracking-tight mb-2">
                Apply to the platform
              </h3>
              <div className="hairline mb-7" />
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
