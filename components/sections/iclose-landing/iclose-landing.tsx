'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { Logo } from '@/components/ui/logo';
import styles from './iclose-landing.module.css';
import { ICloseFooter } from './iclose-footer';
import { WaitlistForm } from './waitlist-form';

type RevealProps = {
  as?: keyof JSX.IntrinsicElements;
  delay?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  children: ReactNode;
};

function Reveal({ as: Tag = 'div', delay, className, children }: RevealProps) {
  const delayCls =
    delay === 1
      ? styles.revealDelay1
      : delay === 2
        ? styles.revealDelay2
        : delay === 3
          ? styles.revealDelay3
          : delay === 4
            ? styles.revealDelay4
            : delay === 5
              ? styles.revealDelay5
              : delay === 6
                ? styles.revealDelay6
                : '';
  const cls = [styles.reveal, delayCls, className].filter(Boolean).join(' ');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp = Tag as any;
  return <Comp className={cls}>{children}</Comp>;
}

/* ---------------- WHO IS THIS FOR ---------------- */

function WhoIsThisFor() {
  return (
    <section className={`${styles.snapSection} ${styles.whoSection}`}>
      <div className={styles.wrapWide}>
        <Reveal as="h2" className={styles.sectionHeadingSolo}>
          Who is this for?
        </Reveal>

        <div className={styles.whoGrid}>
          <Reveal className={styles.whoCard} delay={1}>
            <div className={styles.whoHero}>
              <Image
                src="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150502_22aadfe1-177e-4a65-8768-ea2f66790704.png"
                alt="A broker in a modern Dubai office"
                fill
                sizes="(max-width: 820px) 100vw, 520px"
                className={styles.whoHeroImg}
                priority={false}
              />
              <div className={styles.whoHeroOverlay} />
              <div className={styles.whoHeroTag}>For Brokers</div>
            </div>
            <h3>Close more deals, keep more of each one.</h3>
            <p>
              Learn any UAE community top-to-bottom from the people actually
              closing there. Use the platform&apos;s tools and network to close
              under your own name — and keep up to 100% of the commission.
            </p>
            <ul className={styles.whoBullets}>
              <li>Expert-led community playbooks &amp; deal breakdowns</li>
              <li>Up to 100% commission on every deal you close</li>
            </ul>
          </Reveal>

          <Reveal className={styles.whoCard} delay={2}>
            <div className={styles.whoHero}>
              <Image
                src="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150508_8d5fb7fc-e484-4ba4-9d30-49813a74f7f8.png"
                alt="A private-client advisor reviewing documents with a client"
                fill
                sizes="(max-width: 820px) 100vw, 520px"
                className={styles.whoHeroImg}
                priority={false}
              />
              <div className={styles.whoHeroOverlay} />
              <div className={`${styles.whoHeroTag} ${styles.whoHeroTagAlt}`}>
                For Collaborators
              </div>
            </div>
            <h3>Bring the client. We bring the expert.</h3>
            <p>
              Lawyers, advisors, executives, and networkers — anyone with a
              client to refer. Submit an inquiry, we match you with the right
              UAE specialist, and you earn up to 80% of the commission when it
              closes.
            </p>
            <ul className={styles.whoBullets}>
              <li>One inquiry, matched to a vetted specialist</li>
              <li>Up to 80% commission when the deal closes</li>
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- WHAT IS IT ---------------- */

function WhatIsIt() {
  return (
    <section
      className={`${styles.snapSection} ${styles.whatSection}`}
      id="workflow"
    >
      <div className={styles.wrapWide}>
        <Reveal as="h2" className={styles.sectionHeadingSolo}>
          What is it?
        </Reveal>

        <div className={styles.whatGrid}>
          {/* Card 1: Dashboard */}
          <Reveal className={styles.whatCard} delay={1}>
            <h3 className={styles.whatTitle}>One clear overview</h3>
            <p className={styles.whatSub}>
              Every saved property, viewing, offer, and closing — visible at a
              glance.
            </p>
            <div className={styles.whatVideo}>
              <video
                src="/videos/whatisit-dashboard.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Dashboard demo"
              />
            </div>
          </Reveal>

          {/* Card 2: Collaboration */}
          <Reveal className={styles.whatCard} delay={2}>
            <h3 className={styles.whatTitle}>Match with the right specialist</h3>
            <p className={styles.whatSub}>
              Post an inquiry. We connect you to the vetted UAE expert who
              knows that asset best.
            </p>
            <div className={styles.whatVideo}>
              <video
                src="/videos/whatisit-collaboration.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Collaboration demo"
              />
            </div>
          </Reveal>

          {/* Card 3: Chat */}
          <Reveal className={styles.whatCard} delay={3}>
            <h3 className={styles.whatTitle}>Every conversation in one place</h3>
            <p className={styles.whatSub}>
              Briefs, viewings, offers and follow-ups — one thread per deal,
              never lost in WhatsApp.
            </p>
            <div className={styles.whatVideo}>
              <video
                src="/videos/whatisit-chat.webm"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-label="Chat demo"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS CAROUSEL ---------------- */

const TESTIMONIALS = [
  {
    initials: 'T.M.',
    role: 'Secondary Market Agent · 4 yrs',
    quote:
      "I spent four years in new developments and knew nothing about the secondary market. Six months with iClose and I can walk into any conversation about JVC, Dubai Hills, or Business Bay and hold my own.",
  },
  {
    initials: 'F.A.',
    role: 'Private Client Advisor',
    quote:
      "One of my clients had a very specific brief — Business Bay, high floor, direct canal view, quick transfer. I posted the requirement. Within 24 hours a specialist came back with three matching units.",
  },
  {
    initials: 'K.R.',
    role: 'Downtown Dubai Specialist',
    quote:
      'I used to rely on brokers I barely knew to move my units. Now I have a community of professionals who know exactly what I specialise in. When they have a buyer for Downtown, they call me first.',
  },
  {
    initials: 'A.S.',
    role: 'Family Office Partner',
    quote:
      "We needed to place a UHNW client into an offplan tower with very specific risk parameters. iClose gave us the matched specialist and the closing playbook in the same afternoon.",
  },
  {
    initials: 'M.J.',
    role: 'Independent Broker · JVC',
    quote:
      "Three months in, my close rate doubled because I finally knew the buildings better than the buyers walking in. That kind of authority is everything in this market.",
  },
];

function TestimonialsCarousel() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const len = TESTIMONIALS.length;

  // Update the active dot based on the actual scroll position.
  // Computed from each child's offsetLeft to handle any gap/padding combo.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cards = Array.from(
        el.querySelectorAll<HTMLElement>('[data-tcard]'),
      );
      const left = el.scrollLeft;
      let nearest = 0;
      let dist = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - left);
        if (d < dist) {
          dist = d;
          nearest = i;
        }
      });
      setActive(nearest);
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToCard = (i: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const target = el.querySelectorAll<HTMLElement>('[data-tcard]')[i];
    if (target) {
      el.scrollTo({ left: target.offsetLeft, behavior: 'smooth' });
    }
  };

  return (
    <section className={`${styles.snapSection} ${styles.testimonialsSection}`}>
      <div className={styles.wrapWide}>
        <Reveal as="h2" className={styles.sectionHeadingSolo}>
          What members say.
        </Reveal>

        <div
          className={styles.testimonialStage}
          aria-roledescription="carousel"
          aria-label="Member testimonials"
        >
          <div
            ref={scrollerRef}
            className={styles.testimonialScroller}
            tabIndex={0}
          >
            {TESTIMONIALS.map((t) => (
              <article
                key={t.initials}
                data-tcard
                className={styles.testimonialCard3}
              >
                <blockquote className={styles.testimonialQuote}>
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption className={styles.testimonialMeta}>
                  <span className={styles.testimonialAvatar}>{t.initials}</span>
                  <span className={styles.testimonialRole}>{t.role}</span>
                </figcaption>
              </article>
            ))}
          </div>

          <div className={styles.testimonialControls}>
            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => scrollToCard(Math.max(0, active - 1))}
              disabled={active === 0}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <div className={styles.testimonialDots}>
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.initials + i}
                  type="button"
                  className={`${styles.testimonialDot} ${
                    i === active ? styles.testimonialDotActive : ''
                  }`}
                  onClick={() => scrollToCard(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={i === active}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => scrollToCard(Math.min(len - 1, active + 1))}
              disabled={active === len - 1}
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- EXPLAINED BY (VIDEOS) ---------------- */

const EXPLAINERS = [
  {
    title: 'iClose for brokers',
    desc: 'How to own a community, top to bottom.',
    accent: 'linear-gradient(135deg, #1d1d1f 0%, #3a3a3c 100%)',
    iconHue: 'rgba(0, 113, 227, 0.18)',
    chip: 'Where do you want to specialise?',
  },
  {
    title: 'iClose for collaborators',
    desc: 'Bring the client. Earn up to 80% of the close.',
    accent: 'linear-gradient(135deg, #0058a3 0%, #0071e3 100%)',
    iconHue: 'rgba(255, 255, 255, 0.22)',
    chip: 'Marina Heights · 1502 · Sold',
  },
  {
    title: 'iClose for specialists',
    desc: 'Build authority. Get the inbound. Close deals.',
    accent: 'linear-gradient(135deg, #4a148c 0%, #7b1fa2 100%)',
    iconHue: 'rgba(255, 255, 255, 0.22)',
    chip: 'New inquiry · 2BR · canal view',
  },
];

function ExplainedBy() {
  return (
    <section className={`${styles.snapSection} ${styles.explainedSection}`}>
      <div className={styles.wrap}>
        <Reveal as="h2" className={styles.sectionHeadingSolo}>
          See how it works.
        </Reveal>

        <div className={styles.explainedGrid}>
          {EXPLAINERS.map((e, i) => (
            <Reveal
              className={styles.explainedCard}
              delay={((i + 1) as 1 | 2 | 3)}
              key={e.title}
            >
              <div
                className={styles.explainedThumb}
                style={{ background: e.accent }}
                aria-hidden="true"
              >
                <div
                  className={styles.explainedThumbChip}
                  style={{
                    background: e.iconHue,
                    color: i === 0 ? '#fff' : '#fff',
                  }}
                >
                  {e.chip}
                </div>
                <div className={styles.explainedThumbHost} aria-hidden="true">
                  <div className={styles.explainedThumbHostAvatar} />
                </div>
                <button
                  type="button"
                  className={styles.explainedPlay}
                  aria-label={`Play: ${e.title}`}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              </div>
              <div className={styles.explainedMeta}>
                <span className={styles.explainedPlayMini} aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div>
                  <div className={styles.explainedTitle}>{e.title}</div>
                  <div className={styles.explainedDesc}>{e.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ACCORDION ---------------- */

const FAQS: { q: string; a: string }[] = [
  {
    q: 'What is iClose?',
    a: 'iClose is a Dubai real estate community and education platform built around three types of professionals: agents who want to build expertise in the secondary market, professionals (lawyers, accountants, advisors, family offices) whose clients have property requirements, and Specialists who have area or building expertise and inventory to match.',
  },
  {
    q: 'Why should I trust a pre-launch platform?',
    a: 'Joining the waitlist costs nothing and commits to nothing. Founding-member access locks in only when we open, and you can walk away if it doesn’t deliver.',
  },
  {
    q: "How is “up to 100% commission” actually possible?",
    a: 'iClose isn’t a traditional agency taking a cut of your deals. We make money from membership, not from the commission you earn. We’ll walk you through the model on the call.',
  },
  {
    q: "I’m not a broker. Can I still earn?",
    a: 'Yes. Lawyers, wealth managers, executives, and well-networked individuals can post an inquiry, get matched with the right expert, and earn up to 80% of the commission. No license needed.',
  },
  {
    q: "What if my area isn’t covered yet?",
    a: 'We launch with the UAE’s major communities and add coverage continuously. If your area isn’t there at launch, tell us. We prioritise based on demand.',
  },
  {
    q: 'Do I need to leave my current agency?',
    a: 'Not necessarily. Some members work with iClose alongside an existing role. Others use iClose’s visa and full back-office to go fully independent. We’ll figure out the right setup on the call.',
  },
  {
    q: 'What happens if I cancel?',
    a: 'You keep your learning history, deal records, and earnings. We don’t lock anyone in. The knowledge you’ve built is yours to keep.',
  },
];

function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section
      className={`${styles.snapSection} ${styles.faqSection}`}
      id="faq"
    >
      <div className={styles.faqWrap}>
        <div className={styles.faqHeader}>
          <Reveal as="h2" className={styles.sectionHeadingSolo}>
            Frequently asked questions.
          </Reveal>
        </div>
        <div className={styles.faqList}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`${styles.faqItem} ${
                  isOpen ? styles.faqItemOpen : ''
                }`}
              >
                <button
                  type="button"
                  className={styles.faqQ}
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span className={styles.faqChev} aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </span>
                </button>
                <div className={styles.faqA} hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export function ICloseLanding() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reveals = root.querySelectorAll<HTMLElement>(`.${styles.reveal}`);
    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add(styles.revealIn));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.revealIn);
            observer.unobserve(entry.target);
          }
        });
      },
      // root is the snap-scroll container so observation works inside it
      { root, threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={`${styles.root} ${styles.rootSnap}`}>
      {/* NAV */}
      <nav className={styles.nav}>
        <Logo />
        <ul className={styles.navLinks}>
          <li>
            <a href="#workflow">How it works</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
          <li>
            <a href="#waitlist" className={styles.navCta}>
              Join waitlist
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={`${styles.snapSection} ${styles.hero}`}>
        <div className={styles.heroInner}>
          <h1>
            Learn From The Best,
            <br />
            <span className={styles.muted}>Close More Deals!</span>
          </h1>
          <p className={styles.heroSub}>
            Get the training and support you need to close UAE real estate
            deals. Learn from the top 0.1% of UAE agents and keep up to 100%
            of your commission.
          </p>
          <div className={styles.heroCtas}>
            <a href="#waitlist" className={styles.btnBlue}>
              Join the waitlist
            </a>
            <a href="#workflow" className={styles.btnLink}>
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <WhoIsThisFor />

      {/* WHAT IS IT */}
      <WhatIsIt />

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* EXPLAINED BY */}
      <ExplainedBy />

      {/* WAITLIST (Typeform) */}
      <section
        className={`${styles.snapSection} ${styles.waitlist}`}
        id="waitlist"
      >
        <div className={styles.wlInner}>
          <Reveal as="h2" className={styles.sectionHeadingSolo}>
            Join the waitlist.
          </Reveal>
          <Reveal delay={1}>
            <WaitlistForm />
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

      {/* FOOTER */}
      <div className={`${styles.snapSection} ${styles.snapSectionAuto}`}>
        <ICloseFooter />
      </div>
    </div>
  );
}
