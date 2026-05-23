'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import styles from './iclose-landing.module.css';
import { ICloseFooter } from './iclose-footer';
import { WaitlistForm } from './waitlist-form';

/* Reusable motion variants for the workflow step visuals.
   Used to stagger children with an Apple-y ease curve. */
const wfContainerVar = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
};
const wfItemVar = {
  hidden: { opacity: 0, y: 14, scale: 0.94 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};
const wfBarVar = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/* Site-wide whileInView presets. Kept short and used selectively so
   each section has a slightly different entry feel (pattern interrupt
   without being repetitive). */
const ease = [0.22, 1, 0.36, 1] as const;
const v = { once: true, margin: '-10% 0px' };

const animFromLeft = {
  initial: { opacity: 0, x: -56 },
  whileInView: { opacity: 1, x: 0 },
  viewport: v,
  transition: { duration: 0.6, ease },
};
const animFromRight = {
  initial: { opacity: 0, x: 56 },
  whileInView: { opacity: 1, x: 0 },
  viewport: v,
  transition: { duration: 0.6, ease },
};
const animRise = {
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  viewport: v,
  transition: { duration: 0.55, ease },
};
const animScale = {
  initial: { opacity: 0, scale: 0.92 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: v,
  transition: { duration: 0.55, ease },
};

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
    <section className={`${styles.whoSection}`}>
      <div className={styles.wrapWide}>
        {/* Heading slides in from the LEFT (matches the workflow's
            title-from-left so the two land as paired moments). */}
        <motion.h2
          className={`${styles.sectionHeadingSolo} ${styles.reveal} ${styles.revealIn}`}
          {...animFromLeft}
        >
          Close it. Or buy it. <br />
          Either way, you keep more.
        </motion.h2>

        <div className={styles.whoGrid}>
          <Reveal className={styles.whoCardWrap} delay={1}>
            <Link href="/for-brokers" className={styles.whoCard}>
              <div className={styles.whoHero}>
                <Image
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150502_22aadfe1-177e-4a65-8768-ea2f66790704.png"
                  alt="A closer in a modern Dubai office"
                  fill
                  sizes="(max-width: 820px) 100vw, 520px"
                  className={styles.whoHeroImg}
                  priority={false}
                />
                <div className={styles.whoHeroOverlay} />
                <div className={styles.whoHeroTag}>For Closers</div>
              </div>
              <h3>Close more deals. Keep more of each one.</h3>
              <p>
                Brokers and lawyers, advisors, executives, networkers. Anyone
                with a client to refer or a deal to close. Keep up to 100% of
                every commission you earn.
              </p>
              <span className={styles.whoCta}>
                Learn more <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>

          <Reveal className={styles.whoCardWrap} delay={2}>
            <Link href="/for-buyers" className={styles.whoCard}>
              <div className={styles.whoHero}>
                <Image
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150508_8d5fb7fc-e484-4ba4-9d30-49813a74f7f8.png"
                  alt="A buyer sourcing a UAE property with iClose"
                  fill
                  sizes="(max-width: 820px) 100vw, 520px"
                  className={styles.whoHeroImg}
                  priority={false}
                />
                <div className={styles.whoHeroOverlay} />
                <div className={`${styles.whoHeroTag} ${styles.whoHeroTagAlt}`}>
                  For Buyers
                </div>
              </div>
              <h3>
                Get up to 16% cashback on off-plan, or pay only 0.4%
                commission on ready units.
              </h3>
              <p>
                We handle everything, from finding the right unit to closing
                the deal. On off-plan we negotiate with the developer and
                rebate up to 16% of the deal value back to you. On ready
                secondary units we charge a flat 0.4% commission instead of
                the standard 2%.
              </p>
              <span
                className={`${styles.whoCta} ${styles.whoCtaAlt}`}
              >
                Learn more <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}


/* ---------------- WHAT IS IT (4 animated mock cards · 2×2 grid) ---------------- */

function WhatIsIt() {
  return (
    <section className={styles.whatSection}>
      <div className={styles.wrapWide}>
        {/* Heading slides in from the RIGHT. Pattern-interrupt vs the
            workflow section's left-slide title. */}
        <motion.h2
          className={`${styles.sectionHeadingSolo} ${styles.reveal} ${styles.revealIn}`}
          {...animFromRight}
        >
          What is it?
        </motion.h2>

        <div className={styles.whatGrid4}>
          {/* Card 1: Dashboard overview */}
          <motion.article
            className={`${styles.whatCard} ${styles.whatCardA}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={v}
            transition={{ duration: 0.6, delay: 0, ease }}
          >
            <h3 className={styles.whatTitle}>One clear overview</h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockDashboard}>
                <div className={styles.mockTabs}>
                  <span>Saved</span>
                  <span>Viewings</span>
                  <span className={styles.mockTabActive}>Your offers</span>
                  <span>Closed</span>
                </div>
                <div className={`${styles.mockRow} ${styles.mockRowAnimA}`}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,440,000</span>
                  <span className={styles.mockStatus}>Offer sent</span>
                </div>
                <div className={`${styles.mockRow} ${styles.mockRowAnimB}`}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,430,000</span>
                  <span className={styles.mockStatus}>Counter received</span>
                </div>
                <div className={`${styles.mockRow} ${styles.mockRowAnimC}`}>
                  <span className={styles.mockCheck} />
                  <span className={styles.mockPrice}>AED 1,410,000</span>
                  <span className={styles.mockStatus}>Closed ✓</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 2: Specialist match */}
          <motion.article
            className={`${styles.whatCard} ${styles.whatCardB}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={v}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <h3 className={styles.whatTitle}>
              Match with the right specialist
            </h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockMatch}>
                <svg
                  className={styles.mockCursor}
                  viewBox="0 0 18 22"
                  aria-hidden="true"
                >
                  <path d="M2 1.5l13 7.5-6 1.5-2 7-5-16z" />
                </svg>
                <div className={`${styles.mockMatchRow} ${styles.mockMatchA}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
                <div className={`${styles.mockMatchRow} ${styles.mockMatchB}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                  <span className={styles.mockBadgeBlue}>Matched</span>
                </div>
                <div className={`${styles.mockMatchRow} ${styles.mockMatchC}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
                <div className={`${styles.mockMatchRow} ${styles.mockMatchD}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockMatchLine} />
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 3: Conversations */}
          <motion.article
            className={`${styles.whatCard} ${styles.whatCardC}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={v}
            transition={{ duration: 0.6, delay: 0.2, ease }}
          >
            <h3 className={styles.whatTitle}>
              Every conversation in one place
            </h3>
            <div className={styles.whatMedia} aria-hidden="true">
              <div className={styles.mockChat}>
                <div className={`${styles.mockChatRow} ${styles.mockChatA}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockChatBubble}>Client brief →</span>
                </div>
                <div
                  className={`${styles.mockChatRow} ${styles.mockChatRowRight} ${styles.mockChatB}`}
                >
                  <span className={styles.mockChatBubble}>3 units ready ✓</span>
                  <span
                    className={`${styles.mockAvatar} ${styles.mockAvatarAlt}`}
                  />
                </div>
                <div className={`${styles.mockChatRow} ${styles.mockChatC}`}>
                  <span className={styles.mockAvatar} />
                  <span className={styles.mockChatBubble}>Booking viewing</span>
                </div>
              </div>
            </div>
          </motion.article>

          {/* Card 4: Close the deal */}
          <motion.article
            className={`${styles.whatCard} ${styles.whatCardF}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={v}
            transition={{ duration: 0.6, delay: 0.3, ease }}
          >
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
                    <div
                      className={`${styles.mockCloseValue} ${styles.mockCloseConfirmed}`}
                    >
                      Confirmed ✓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
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
      "One of my clients had a very specific brief, Business Bay, high floor, direct canal view, quick transfer. I posted the requirement. Within 24 hours a specialist came back with three matching units.",
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
    <section className={`${styles.testimonialsSection}`}>
      <div className={styles.wrapWide}>
        {/* Heading rises from the bottom. Different motion to the
            who/workflow sections so it reads as its own beat. */}
        <motion.h2
          className={`${styles.sectionHeadingSolo} ${styles.reveal} ${styles.revealIn}`}
          {...animRise}
        >
          What members say.
        </motion.h2>

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
    <section className={`${styles.explainedSection}`}>
      <div className={styles.wrap}>
        {/* Heading slides in from the RIGHT. Counterweight to the
            who/workflow left-slides. */}
        <motion.h2
          className={`${styles.sectionHeadingSolo} ${styles.reveal} ${styles.revealIn}`}
          {...animFromRight}
        >
          See how it works.
        </motion.h2>

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
      className={`${styles.faqSection}`}
      id="faq"
    >
      <div className={styles.faqWrap}>
        <div className={styles.faqHeader}>
          <Reveal
            as="h2"
            className={`${styles.sectionHeadingSolo} ${styles.faqHeading}`}
          >
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

/* ---------------- HOW IT WORKS IN PRACTICE (pinned scroll) ---------------- */

type WfStep = {
  num: string;
  title: string;
  body: string;
  visual: ReactNode;
  cta?: { label: string; href: string };
};

function WfStep1Visual() {
  const tiles = [
    { tag: 'Dubai Marina', bars: [60, 80, 45] },
    { tag: 'Downtown', bars: [72, 54, 68] },
    { tag: 'Palm Jumeirah', bars: [50, 74, 40] },
    { tag: 'JVC', bars: [65, 80, 38] },
  ];
  return (
    <motion.div
      className={styles.wfVisualPanel}
      variants={wfContainerVar}
      initial="hidden"
      animate="show"
    >
      <div className={styles.wfPanelLibrary}>
        {tiles.map((t) => (
          <motion.div
            key={t.tag}
            className={styles.wfPanelLibTile}
            variants={wfItemVar}
          >
            {t.bars.map((w, i) => (
              <motion.span
                key={i}
                className={styles.wfPanelLibBar}
                style={{ width: `${w}%`, transformOrigin: 'left center' }}
                variants={wfBarVar}
              />
            ))}
            <motion.span
              className={styles.wfPanelLibTag}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.tag}
            </motion.span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function WfStep2Visual() {
  return (
    <motion.div
      className={styles.wfVisualPanel}
      variants={wfContainerVar}
      initial="hidden"
      animate="show"
    >
      <div className={styles.wfPanelFork}>
        <motion.div
          className={styles.wfPanelForkCard}
          initial={{ opacity: 0, x: -40, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.wfPanelForkTag}>Closer route</div>
          <motion.div
            className={styles.wfPanelForkBig}
            initial={{ opacity: 0, y: 18, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '-0.028em' }}
            transition={{ duration: 0.65, delay: 0.25 }}
          >
            100%
          </motion.div>
          <div className={styles.wfPanelForkSub}>of hard-earned commission</div>
        </motion.div>

        <motion.div
          className={styles.wfPanelForkOr}
          aria-hidden="true"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          or
        </motion.div>

        <motion.div
          className={`${styles.wfPanelForkCard} ${styles.wfPanelForkCardAlt}`}
          initial={{ opacity: 0, x: 40, rotate: 2 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className={styles.wfPanelForkTag}>Buyer route</div>
          <motion.div
            className={styles.wfPanelForkBig}
            initial={{ opacity: 0, y: 18, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '-0.028em' }}
            transition={{ duration: 0.65, delay: 0.35 }}
          >
            80%
          </motion.div>
          <div className={styles.wfPanelForkSub}>of cashback on every deal</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function WfStep3Visual() {
  return (
    <motion.div className={styles.wfVisualPanel}>
      <motion.div
        className={styles.wfPanelPayout}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className={styles.wfPanelPayoutHead}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          Commission kept
        </motion.div>
        <motion.div
          className={styles.wfPanelPayoutAmount}
          initial={{ opacity: 0, y: 14, letterSpacing: '0.08em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '-0.028em' }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          Up to 100%
        </motion.div>
        <motion.div
          className={styles.wfPanelPayoutMeta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <span>Marina Heights · 1502</span>
          <span className={styles.wfPanelPayoutOk}>Transfer complete ✓</span>
        </motion.div>
        <div className={styles.wfPanelPayoutBar}>
          <motion.div
            className={styles.wfPanelPayoutFill}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: 'left center' }}
            transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

const WF_STEPS: WfStep[] = [
  {
    num: '01',
    title: 'Learn the market.',
    body: 'Master any UAE community through expert-led sessions, playbooks, and live deal breakdowns. From launch specs to payment-plan nuances. Every developer, every cluster, every tower.',
    visual: <WfStep1Visual />,
  },
  {
    num: '02',
    title: 'Pick your route.',
    body: 'Closing the deal? Keep up to 100% of the commission you earn. Buying the property yourself? Get up to 80% of that same commission back as cashback. Same platform, two ways to win.',
    visual: <WfStep2Visual />,
  },
  {
    num: '03',
    title: 'Get paid.',
    body: 'Commission lands directly in your account. Tracked through your iClose dashboard. Transparent from day one. No splits to negotiate, no chasing, no surprises.',
    visual: <WfStep3Visual />,
    cta: { label: 'Start for free', href: '#waitlist' },
  },
];

function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      if (scrollable <= 0) {
        setActive(0);
        return;
      }
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollable));
      setProgress(p);
      const step = p >= 0.92 ? 2 : p >= 0.42 ? 1 : 0;
      setActive(step);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.workflowSection}
      id="workflow"
    >
      <div className={styles.wfPin}>
        <div className={styles.wfPinInner}>
          <Reveal as="h2" className={styles.wfPinHeading}>
            How it works in practice.
          </Reveal>

          <div className={styles.wfStage}>
            <div className={styles.wfStageCopy}>
              {/* Step number + title. Slide in from the left.
                  whileInView so the first slide animates the moment the
                  section actually scrolls into view, not on initial mount. */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`title-${active}`}
                  className={styles.wfStageTitleBlock}
                  initial={{ opacity: 0, x: -64 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: '-15% 0px' }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className={styles.wfStageNum}>
                    {WF_STEPS[active].num}
                  </div>
                  <h3 className={styles.wfStageTitle}>
                    {WF_STEPS[active].title}
                  </h3>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`body-${active}`}
                  className={styles.wfStageBody}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {WF_STEPS[active].body}
                </motion.p>
              </AnimatePresence>
              {WF_STEPS[active].cta && (
                <motion.a
                  key={`cta-${active}`}
                  href={WF_STEPS[active].cta!.href}
                  className={styles.wfStartCta}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {WF_STEPS[active].cta!.label}
                  <span aria-hidden="true">→</span>
                </motion.a>
              )}
            </div>

            <div className={styles.wfStageVisual}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${active}`}
                  className={`${styles.wfStageVisualPanel} ${styles.wfStageVisualPanelActive}`}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2, margin: '-15% 0px' }}
                  exit={{ opacity: 0, y: -32 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  {WF_STEPS[active].visual}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className={styles.wfProgress} aria-hidden="true">
            <div
              className={styles.wfProgressBar}
              style={{ transform: `scaleX(${progress})` }}
            />
            <div className={styles.wfDots}>
              {WF_STEPS.map((s, i) => (
                <span
                  key={s.num}
                  className={`${styles.wfDot} ${
                    i <= active ? styles.wfDotActive : ''
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile layout: a nested 100vh scroll container with mandatory
          snap on the three steps. TikTok-style reel: one swipe inside
          advances one step. When the inner scroller hits its top/bottom
          edge the swipe chains to the page so the user can scroll out
          to neighbouring sections. No trapping. Hidden on desktop. */}
      <div ref={mobileScrollerRef} className={styles.wfMobile}>
        {WF_STEPS.map((s) => (
          <div key={s.num} className={styles.wfMobileStep}>
            <motion.div
              className={styles.wfMobileTitleBlock}
              initial={{ opacity: 0, x: -48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{
                root: mobileScrollerRef,
                once: false,
                amount: 0.4,
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.wfMobileNum}>{s.num}</div>
              <h3 className={styles.wfMobileTitle}>{s.title}</h3>
            </motion.div>

            <motion.p
              className={styles.wfMobileBody}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                root: mobileScrollerRef,
                once: false,
                amount: 0.4,
              }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              {s.body}
            </motion.p>
            {s.cta && (
              <motion.a
                href={s.cta.href}
                className={styles.wfStartCta}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{
                  root: mobileScrollerRef,
                  once: false,
                  amount: 0.4,
                }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {s.cta.label}
                <span aria-hidden="true">→</span>
              </motion.a>
            )}

            <motion.div
              className={styles.wfMobileVisual}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                root: mobileScrollerRef,
                once: false,
                amount: 0.4,
              }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              {s.visual}
            </motion.div>
          </div>
        ))}
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
    <div ref={rootRef} className={`${styles.root}`}>
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
              Get started
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={`${styles.hero}`}>
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
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <WhoIsThisFor />

      {/* WHAT IS IT */}
      <WhatIsIt />

      {/* HOW IT WORKS */}
      <HowItWorks />

      {/* TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* EXPLAINED BY. Hidden for now; component still defined in file. */}
      {/* <ExplainedBy /> */}

      {/* WAITLIST */}
      <section
        className={`${styles.waitlist}`}
        id="waitlist"
      >
        <div className={styles.wlInner}>
          {/* Heading scale-pops in. A third distinct motion so the
              waitlist feels like a "now act" moment. */}
          <motion.h2
            className={`${styles.sectionHeadingSolo} ${styles.reveal} ${styles.revealIn}`}
            {...animScale}
          >
            Join the waitlist.
          </motion.h2>
          <motion.div {...animRise} transition={{ ...animRise.transition, delay: 0.15 }}>
            <WaitlistForm />
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <FaqAccordion />

      {/* FOOTER */}
      <div className={styles.footerWrap}>
        <ICloseFooter />
      </div>
    </div>
  );
}
