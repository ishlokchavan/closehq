import Image from 'next/image';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { SpecialistForm } from '@/components/specialist-form';
import { Reveal } from '@/components/ui/reveal';

export const metadata = {
  title: 'Become a Specialist — iClose',
  description:
    'Apply to join iClose as a Dubai property specialist. Share deep area knowledge, development intelligence, and community expertise with professionals who are ready to learn.',
};

const TESTIMONIALS = [
  {
    initials: 'A.R.',
    name: 'Ahmad R.',
    role: 'Downtown Dubai Specialist',
    quote:
      'Teaching what I know forces me to know it better. I went from being the expert in my office to being the person my entire network calls. iClose gave me the platform to make that happen.',
  },
  {
    initials: 'S.K.',
    name: 'Sarah K.',
    role: 'Palm Jumeirah Specialist',
    quote:
      "I used to share my knowledge informally — over coffee, over the phone. Now it reaches professionals across three countries. That shift in reach changed everything for how I work.",
  },
];

export default function CreatorsPage() {
  return (
    <>
      <Header />
      <main>

        {/* ── Hero + Form ───────────────────────────────────────────────── */}
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
                  <span
                    className="inline-block text-[11px] font-medium tracking-[0.12em] uppercase text-white/40 mb-6"
                  >
                    Become a specialist
                  </span>
                </Reveal>

                <Reveal delay={0.05}>
                  <h1 className="display-lg text-white text-balance leading-[1.1]">
                    Join our roster of Dubai property specialists.
                  </h1>
                </Reveal>

                <Reveal delay={0.1}>
                  <p
                    className="mt-5 text-[17px] sm:text-[18px] text-white/55 leading-[1.55]"
                    style={{ letterSpacing: '-0.012em' }}
                  >
                    Apply today to become part of an exclusive community of specialists shaping how
                    the world understands Dubai’s secondary real estate market.
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

        {/* ── Testimonials ───────────────────────────────────────────────── */}
        <section className="bg-paper py-16 sm:py-20 md:py-24 lg:py-28">
          <div className="container-wide">
            <Reveal>
              <p
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-graphite mb-5"
              >
                Voices from the field
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display-lg text-balance max-w-xl mb-14 md:mb-16">
                Why Dubai’s best choose to teach with iClose.
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
                    “{t.quote}”
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
