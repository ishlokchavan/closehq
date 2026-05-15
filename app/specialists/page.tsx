import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { SpecialistForm } from '@/components/specialist-form';
import { Reveal } from '@/components/ui/reveal';

export const metadata = {
  title: 'Apply as a Specialist — iClose',
  description:
    'Apply to join iClose as a Specialist. Share deep area knowledge, development intelligence, and community expertise that powers the deal desk and iClose Academy.',
};

const TESTIMONIALS = [
  {
    initials: 'A.R.',
    name: 'Ahmad R.',
    role: 'Downtown Dubai Expert',
    quote:
      'Turning what I know into structured content made me sharper. My expertise went from something I carried in my head to something that reaches active brokers every week.',
  },
  {
    initials: 'S.K.',
    name: 'Sarah K.',
    role: 'Palm Jumeirah Expert',
    quote:
      "I used to share my knowledge over the phone, one person at a time. Now it's powering deal desk decisions across the platform. That kind of leverage changes how you think about what you know.",
  },
];

export default function ExpertsPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero + Form ─────────────────────────────────────────────── */}
        <section className="relative bg-neutral-950 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-night.jpg"
              alt=""
              fill
              priority
              quality={80}
              className="object-cover object-center opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 to-neutral-950/90" />
          </div>

          <div className="relative container-wide py-24 md:py-32 lg:py-36">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

              {/* Left — headline + image */}
              <div>
                <Reveal>
                  <span className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-white/40 mb-6">
                    Apply as a Specialist
                  </span>
                </Reveal>

                <Reveal delay={0.05}>
                  <h1 className="display-lg text-white text-balance leading-[1.1]">
                    Join our roster of specialists.
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p
                    className="mt-5 text-[17px] sm:text-[18px] text-white/55 leading-[1.55]"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    iClose Specialists build the market intelligence that active Members rely on to close — area playbooks, development deep-dives, and community analysis from people who are still in the market, not watching from the sidelines.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="mt-10 relative overflow-hidden rounded-apple aspect-[4/3]">
                    <Image
                      src="/images/hero-burj.jpg"
                      alt="Dubai skyline"
                      fill
                      quality={85}
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  </div>
                </Reveal>
              </div>

              {/* Right — form card */}
              <div className="lg:pt-14">
                <div className="bg-white rounded-apple p-7 sm:p-9 shadow-elevated">
                  <SpecialistForm />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── What Experts do ──────────────────────────────────────────── */}
        <section className="bg-mist py-16 sm:py-20 md:py-24">
          <div className="container-wide">
            <Reveal>
              <h2 className="display-lg text-balance max-w-xl mb-12">
                What it means to be a Specialist on iClose.
              </h2>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  title: 'Build the intelligence layer.',
                  body: 'Your area knowledge, development expertise, and community insight becomes structured content — the kind that changes how a Member walks into a deal.',
                },
                {
                  title: 'Power the deal desk.',
                  body: "When a Member submits a deal, they're drawing on Expert knowledge. Your expertise is active in every transaction it touches — not sitting in a course no one finishes.",
                },
                {
                  title: 'Get recognised for what you actually know.',
                  body: 'iClose Specialists are vetted. That mark means something on a platform where everyone is anonymous — you are the exception.',
                },
              ].map((card) => (
                <div key={card.title} className="card-surface p-8 sm:p-10">
                  <h3 className="display-sm mb-3">{card.title}</h3>
                  <p className="text-[17px] text-graphite-dark leading-[1.5]" style={{ letterSpacing: '-0.012em' }}>
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ─────────────────────────────────────────────── */}
        <section className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="container-wide">
            <Reveal>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-graphite mb-5">
                From the field
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
                Experts who turned expertise into leverage.
              </h2>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-4">
              {TESTIMONIALS.map((t) => (
                <figure
                  key={t.initials}
                  className="card-surface p-8 sm:p-10 flex flex-col"
                >
                  <blockquote
                    className="display-sm text-ink leading-[1.35] text-balance flex-1"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-mist border border-hairline">
                      <span className="text-[12px] font-medium text-ink">{t.initials}</span>
                    </div>
                    <div>
                      <p className="text-[13px] font-medium text-ink tracking-tight">{t.name}</p>
                      <p className="text-[12px] text-graphite tracking-tight">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
