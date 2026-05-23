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
                src="/images/gallery-urban-hub.jpg"
                alt="UAE skyline — a broker's market"
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
                src="/images/gallery-community.jpg"
                alt="Residential community — the collaborator's network"
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
          {/* Card 1: Dashboard overview */}
          <Reveal className={`${styles.whatCard} ${styles.whatCardLg}`} delay={1}>
            <h3 className={styles.whatTitle}>One clear overview</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockDashboard}>
                <div className={styles.mockTabs}>
                  <span>Saved</span>
                  <span>Viewings</span>
                  <span className={styles.mockTabActive}>Your offers</span>
                  <span>Closed</span>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,440,000</span>
                  <span className={styles.mockStatus}>Offer sent</span>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,430,000</span>
                  <span className={styles.mockStatus}>Counter received</span>
                </div>
                <div className={styles.mockRow}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,410,000</span>
                  <span className={styles.mockStatus}>Closed</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 2: Match with specialists */}
          <Reveal className={styles.whatCard} delay={2}>
            <h3 className={styles.whatTitle}>Match with the right specialist</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockMatch}>
                <div className={styles.mockMatchRow}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
                <div className={styles.mockMatchRow}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
                <div
                  className={`${styles.mockMatchRow} ${styles.mockMatchRowActive}`}
                >
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                  <span className={styles.mockBadgeBlue}>Matched</span>
                </div>
                <div className={styles.mockMatchRow}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 3: Keep every conversation in one place */}
          <Reveal className={styles.whatCard} delay={3}>
            <h3 className={styles.whatTitle}>Every conversation in one place</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockChat}>
                <div className={styles.mockChatRow}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockChatBubble}>Client brief →</span>
                </div>
                <div
                  className={`${styles.mockChatRow} ${styles.mockChatRowRight}`}
                >
                  <span className={styles.mockChatBubble}>3 units ready ✓</span>
                  <span
                    className={`${styles.mockAvatar} ${styles.mockAvatarAlt}`}
                  />
                </div>
                <div className={styles.mockChatRow}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockChatBubble}>Booking viewing</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 4: Make an offer, faster than ever */}
          <Reveal className={styles.whatCard} delay={4}>
            <h3 className={styles.whatTitle}>Make an offer, faster than ever</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockOffer}>
                <div className={styles.mockOfferTitle}>Offer submitted</div>
                <div className={styles.mockOfferAmount}>AED 1,425,000</div>
                <div className={styles.mockOfferMeta}>
                  <span>Buyer</span>
                  <span>Seller</span>
                  <span>Notary</span>
                </div>
                <div className={styles.mockOfferBar}>
                  <div className={styles.mockOfferFill} />
                </div>
              </div>
            </div>
          </Reveal>

          {/* Card 5: Close the deal with confidence */}
          <Reveal className={styles.whatCard} delay={5}>
            <h3 className={styles.whatTitle}>Close the deal with confidence</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockClose}>
                <div className={styles.mockCloseHeader}>
                  <span className={styles.mockCloseAddr}>
                    Marina Heights · 1502
                  </span>
                  <span className={styles.mockCloseCity}>Dubai Marina</span>
                </div>
                <div className={styles.mockCloseGrid}>
                  <div>
                    <div className={styles.mockCloseLabel}>Offer price</div>
                    <div className={styles.mockCloseValue}>AED 1,425,000</div>
                  </div>
                  <div>
                    <div className={styles.mockCloseLabel}>Key transfer</div>
                    <div className={styles.mockCloseValue}>14 Mar</div>
                  </div>
                  <div>
                    <div className={styles.mockCloseLabel}>Notary</div>
                    <div className={styles.mockCloseValue}>Confirmed</div>
                  </div>
                </div>
              </div>
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
  const VISIBLE = 3;
  const len = TESTIMONIALS.length;
  const lastPos = Math.max(0, len - VISIBLE); // = 2 for 5 testimonials
  const [active, setActive] = useState(0);
  const directionRef = useRef<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setActive((i) => {
        let dir = directionRef.current;
        let next = i + dir;
        if (next > lastPos) {
          dir = -1;
          next = i - 1;
        } else if (next < 0) {
          dir = 1;
          next = i + 1;
        }
        directionRef.current = dir;
        return next;
      });
    }, 7000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [active, lastPos]);

  const clamp = (n: number) => Math.max(0, Math.min(lastPos, n));
  const go = (i: number) => {
    directionRef.current = i >= active ? 1 : -1;
    setActive(clamp(i));
  };

  // step = card width + gap; in CSS we use calc((100% - 32px)/3 + 16px)
  const trackStyle = {
    transform: `translateX(calc(-1 * ${active} * (((100% - 32px) / 3) + 16px)))`,
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
          <div className={styles.testimonialWindow}>
            <div className={styles.testimonialTrack} style={trackStyle}>
              {TESTIMONIALS.map((t) => (
                <article key={t.initials} className={styles.testimonialCard3}>
                  <blockquote className={styles.testimonialQuote}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <figcaption className={styles.testimonialMeta}>
                    <span className={styles.testimonialAvatar}>
                      {t.initials}
                    </span>
                    <span className={styles.testimonialRole}>{t.role}</span>
                  </figcaption>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.testimonialControls}>
            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => go(active - 1)}
              disabled={active === 0}
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <div className={styles.testimonialDots}>
              {Array.from({ length: lastPos + 1 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.testimonialDot} ${
                    i === active ? styles.testimonialDotActive : ''
                  }`}
                  onClick={() => go(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.testimonialArrow}
              onClick={() => go(active + 1)}
              disabled={active === lastPos}
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
