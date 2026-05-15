import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { InternForm } from '@/components/intern-form';
import { Reveal } from '@/components/ui/reveal';
import { Camera, PenLine, TrendingUp, Search, Megaphone, Users, Star, BookOpen, Eye, Zap, Mic } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Careers — iClose',
  description: 'Paid internship opportunities at iClose. Content Creation, Marketing, Copywriting, Investment Analysis, Research, and Investor Relations.',
};

const ROLES = [
  'Content Creation',
  'Marketing',
  'Copywriter',
  'Investment Analysis',
  'Research',
  'Investor Relations',
];

const WHAT_YOULL_DO = [
  { icon: Camera, text: 'Film, edit, and produce engaging digital content in our in-house studio.' },
  { icon: Users, text: 'Host our videos and engage with our audience as the face of our content.' },
  { icon: PenLine, text: 'Write copy for social media, ads, and marketing campaigns.' },
  { icon: Search, text: 'Conduct research and analyze market trends.' },
  { icon: TrendingUp, text: 'Contribute to strategic decision-making.' },
];

const WHATS_IN_IT = [
  { icon: Star, text: 'High-paying performance-based commission.' },
  { icon: BookOpen, text: 'Hands-on mentorship & real-world training.' },
  { icon: Eye, text: 'Exposure to high-level business environments.' },
  { icon: Zap, text: 'Fast-track learning across multiple domains.' },
  { icon: Mic, text: 'Gain hands-on knowledge of how a real business operates.' },
];

export default function CareersPage() {
  return (
    <>
      <Header />

      <main className="bg-paper">
        {/* Hero */}
        <section className="container-x pt-28 pb-16 md:pt-36 md:pb-20">
          <Reveal>
            <p className="text-[13px] font-medium tracking-[0.08em] uppercase text-[#b5842a] mb-5">
              iclose.ae
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display-xl text-ink mb-6 max-w-2xl">
              Paid Internship<br />Opportunities
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2 mb-10">
              {ROLES.map((role) => (
                <span
                  key={role}
                  className="inline-flex items-center px-3 py-1.5 rounded-full border border-hairline bg-mist text-[13px] text-graphite-dark"
                  style={{ letterSpacing: '-0.008em' }}
                >
                  {role}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="inline-flex items-start gap-4 bg-[#fdf8ef] border border-[#e8d5a3] rounded-2xl px-5 py-4 max-w-md mb-10">
              <Users className="h-5 w-5 text-[#b5842a] mt-0.5 shrink-0" />
              <p className="text-[15px] text-[#7a5c1e] leading-[1.55]" style={{ letterSpacing: '-0.01em' }}>
                <strong>Only Female Talent</strong> required for On-Camera Content Creation roles.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="text-[19px] text-graphite-dark leading-[1.6] max-w-xl" style={{ letterSpacing: '-0.015em' }}>
              This isn&apos;t your typical internship with coffee runs or sidelines. We&apos;re building something{' '}
              <strong className="text-ink">exciting</strong> at our tech &amp; education startup, and we&apos;re looking
              for eager individuals ready to learn, create, and{' '}
              <strong className="text-ink">grow</strong> through direct mentorship from an experienced{' '}
              <strong className="text-ink">leadership</strong> team.
            </p>
          </Reveal>
        </section>

        <div className="hairline container-x" />

        {/* What you'll do / What's in it for you */}
        <section className="container-x py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <Reveal>
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-graphite-light mb-8">
                  What you&apos;ll do
                </p>
                <ul className="space-y-6">
                  {WHAT_YOULL_DO.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-4">
                      <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-mist">
                        <Icon className="h-4 w-4 text-graphite" strokeWidth={1.75} />
                      </div>
                      <p className="text-[16px] text-graphite-dark leading-[1.55]" style={{ letterSpacing: '-0.01em' }}>
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.05}>
              <div>
                <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-graphite-light mb-8">
                  What&apos;s in it for you
                </p>
                <ul className="space-y-6">
                  {WHATS_IN_IT.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-4">
                      <div className="mt-0.5 h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-mist">
                        <Icon className="h-4 w-4 text-graphite" strokeWidth={1.75} />
                      </div>
                      <p className="text-[16px] text-graphite-dark leading-[1.55]" style={{ letterSpacing: '-0.01em' }}>
                        {text}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <div className="hairline container-x" />

        {/* Application form */}
        <section className="container-x py-16 md:py-24">
          <div className="max-w-lg mx-auto">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.08em] uppercase text-graphite-light mb-3">
                Apply now
              </p>
              <h2 className="display-md text-ink mb-2">Join the team.</h2>
              <p className="text-[17px] text-graphite-dark mb-10 leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                Fill out the form below and we&apos;ll be in touch.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <InternForm />
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
