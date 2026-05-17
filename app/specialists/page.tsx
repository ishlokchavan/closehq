import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { SpecialistForm } from '@/components/specialist-form';
import { Reveal } from '@/components/ui/reveal';
import { MapPin, Users, BadgeCheck, Megaphone, Building2, Handshake } from 'lucide-react';

export const metadata = {
  title: 'Apply as a Specialist — iClose',
  description:
    'Join iClose as an Area Expert or Developer Relationship Manager. Share deep area knowledge or represent your developer to a network of serious, educated agents.',
};

const ROLES = [
  {
    tag: 'Area Expert',
    headline: 'Own a community. Become the only call.',
    body: 'You know a specific area of Dubai — its buildings, transaction history, and pricing nuances — better than anyone. iClose gives you the platform to prove it, and the members to act on it.',
    points: [
      {
        icon: MapPin,
        title: 'Turn your knowledge into content.',
        body: 'Publish area playbooks, building deep-dives, and market guides on the Academy. Your expertise becomes structured content that Members rely on to close.',
      },
      {
        icon: Megaphone,
        title: 'Get matched on live member inquiries.',
        body: 'When a Member posts a requirement in your domain, you are the first and only call. No competition, no noise — just the right buyer at the right time.',
      },
      {
        icon: BadgeCheck,
        title: 'Build authority that compounds.',
        body: 'Specialists are vetted. That mark positions you as the go-to expert across a platform of agents, brokers, advisors, and family offices who are actively closing.',
      },
    ],
  },
  {
    tag: 'Relationship Manager',
    headline: 'Be the developer\'s voice on the platform.',
    body: 'As an RM at a developer — Emaar, Damac, Sobha, or any other — iClose gives you a ready pipeline of serious, educated agents without the cold outreach.',
    points: [
      {
        icon: Building2,
        title: 'Put your projects in front of the right agents.',
        body: 'Publish launch briefings, payment plan guides, and project overviews on the Academy. Members arrive informed and ready — every conversation starts closer to a close.',
      },
      {
        icon: Users,
        title: 'Serve as the dedicated RM for iClose members.',
        body: 'Be the direct, human contact when members are ready to move off-plan inventory. Build lasting relationships with professionals who close — consistently.',
      },
      {
        icon: Handshake,
        title: 'A qualified pipeline. Without the chase.',
        body: 'iClose members are vetted professionals with active buyers. When they reach out, they are serious. No cold leads, no time wasters.',
      },
    ],
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Apply',
    body: 'Select your role — Area Expert or Relationship Manager — and fill in the form. Takes under five minutes.',
  },
  {
    num: '02',
    title: 'Get vetted',
    body: 'Our team reviews every application personally. We look for genuine depth — whether that is area knowledge or a real developer relationship.',
  },
  {
    num: '03',
    title: 'Go live',
    body: 'Once approved, your profile is published and your domain is activated. Start publishing content on the Academy and receiving matched member inquiries.',
  },
];

const TESTIMONIALS = [
  {
    initials: 'A.R.',
    name: 'Ahmad R.',
    role: 'Area Expert · Downtown Dubai',
    quote:
      'Turning what I know into structured content made me sharper. My expertise went from something I carried in my head to something that reaches active brokers every week.',
  },
  {
    initials: 'N.M.',
    name: 'Nadia M.',
    role: 'Relationship Manager · Off-Plan',
    quote:
      'The agents I work with through iClose already understand our projects before we speak. That changes the entire conversation — every call starts warmer and closes faster.',
  },
];

export default function SpecialistsPage() {
  return (
    <>
      <Header />
      <main id="top">

        {/* ── Hero + Form ─────────────────────────────────────────────── */}
        <section className="bg-paper border-b border-hairline min-h-screen flex items-center pt-12">
          <div className="container-wide w-full flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-20 py-12 lg:py-0">

            {/* Left */}
            <div className="lg:flex-1 flex flex-col justify-center">
              <Reveal>
                <span className="inline-flex items-center px-3 py-1 rounded-full border border-hairline bg-mist text-[11px] font-medium tracking-[0.08em] uppercase text-graphite mb-6">
                  Join as a Specialist
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h1
                  className="font-display font-semibold text-ink text-balance"
                  style={{ fontSize: 'clamp(2.2rem, 5vw, 4.5rem)', lineHeight: 1.06, letterSpacing: '-0.03em' }}
                >
                  A Specialist on iClose is one of two things.
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 text-graphite-dark leading-[1.55] max-w-lg" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.15rem)', letterSpacing: '-0.012em' }}>
                  An <strong className="text-ink font-medium">Area Expert</strong> who owns a community or building — or a <strong className="text-ink font-medium">Relationship Manager</strong> who represents a developer. Both get access to a growing network of professionals who close. Both build long-term pipeline on the platform.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap gap-3">
                  {['Area Expert', 'Relationship Manager'].map((role) => (
                    <span
                      key={role}
                      className="inline-flex items-center px-4 py-2 rounded-full border border-hairline bg-white text-[13px] font-medium text-ink"
                      style={{ letterSpacing: '-0.01em' }}
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right: form */}
            <Reveal delay={0.1} className="w-full lg:w-[440px] shrink-0">
              <div className="bg-white rounded-apple border border-hairline p-6 sm:p-8 shadow-elevated">
                <p className="text-[13px] font-medium text-graphite tracking-tight mb-5" style={{ letterSpacing: '-0.008em' }}>
                  Select your role to get started
                </p>
                <SpecialistForm />
              </div>
            </Reveal>

          </div>
        </section>

        {/* ── What each role means ─────────────────────────────────────── */}
        <section className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="container-wide">
            <Reveal>
              <h2
                className="font-display font-semibold text-ink text-balance mb-14 md:mb-16"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
              >
                What each role means on iClose.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-5">
              {ROLES.map((role, ri) => (
                <Reveal key={role.tag} delay={ri * 0.08}>
                  <div className="card-surface p-8 sm:p-10 h-full flex flex-col">
                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-3">
                      {role.tag}
                    </p>
                    <h3
                      className="font-display font-semibold text-ink mb-3"
                      style={{ fontSize: 'clamp(1.15rem, 1.6vw, 1.45rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                    >
                      {role.headline}
                    </h3>
                    <p className="text-[15px] text-graphite-dark leading-[1.5] mb-8" style={{ letterSpacing: '-0.012em' }}>
                      {role.body}
                    </p>
                    <div className="space-y-6 flex-1">
                      {role.points.map((pt) => {
                        const Icon = pt.icon;
                        return (
                          <div key={pt.title} className="flex gap-4">
                            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist border border-hairline shrink-0 mt-0.5">
                              <Icon className="h-4 w-4 text-ink" strokeWidth={1.5} />
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-ink mb-1" style={{ letterSpacing: '-0.01em' }}>{pt.title}</p>
                              <p className="text-[14px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.01em' }}>{pt.body}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── How to join ─────────────────────────────────────────────── */}
        <section className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="container-wide">
            <Reveal>
              <h2
                className="font-display font-semibold text-ink text-balance mb-3"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
              >
                How it works.
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-[16px] text-graphite-dark mb-14 md:mb-16" style={{ letterSpacing: '-0.012em' }}>
                The same three steps apply to both roles.
              </p>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {STEPS.map((step, i) => (
                <Reveal key={step.num} delay={i * 0.08}>
                  <div className="card-mist p-8 sm:p-10 h-full flex flex-col">
                    <span
                      className="font-display font-semibold text-graphite-light mb-8 block"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', letterSpacing: '-0.03em', lineHeight: 1 }}
                    >
                      {step.num}
                    </span>
                    <h3
                      className="font-display font-semibold text-ink mb-3"
                      style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-[16px] text-graphite-dark leading-[1.5] flex-1" style={{ letterSpacing: '-0.012em' }}>
                      {step.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <section className="bg-mist py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="container-wide">
            <Reveal>
              <h2
                className="font-display font-semibold text-ink text-balance mb-14 md:mb-16"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)', lineHeight: 1.1, letterSpacing: '-0.025em' }}
              >
                From the specialists already on the platform.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.initials} delay={i * 0.08}>
                  <figure className="card-surface p-8 sm:p-10 flex flex-col h-full">
                    <p className="text-[11px] font-medium tracking-[0.1em] uppercase text-graphite mb-5">
                      {t.role}
                    </p>
                    <blockquote
                      className="text-[17px] text-ink leading-[1.55] text-balance flex-1"
                      style={{ letterSpacing: '-0.012em' }}
                    >
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-8 flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mist border border-hairline">
                        <span className="text-[12px] font-medium text-ink">{t.initials}</span>
                      </div>
                      <p className="text-[13px] font-medium text-ink tracking-tight">{t.name}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <section className="bg-paper border-t border-hairline py-16 sm:py-20 md:py-24">
          <div className="container-wide flex flex-col items-center text-center">
            <Reveal>
              <h2
                className="font-display font-semibold text-ink text-balance max-w-2xl"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', lineHeight: 1.06, letterSpacing: '-0.028em' }}
              >
                Area Expert or Relationship Manager — apply in five minutes.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-4 text-[17px] text-graphite-dark leading-[1.5] max-w-lg" style={{ letterSpacing: '-0.012em' }}>
                Every application is reviewed personally. If you have real depth — whether in an area or a developer relationship — we want to hear from you.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <a
                href="#top"
                className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ink text-white text-[15px] font-medium hover:bg-ink/85 transition-colors"
                style={{ letterSpacing: '-0.01em' }}
              >
                Apply now
              </a>
            </Reveal>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
