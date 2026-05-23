'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { ICloseFooter } from '@/components/sections/iclose-landing/iclose-footer';
import styles from './persona.module.css';

/* ------- Shared chrome (nav + footer) ------- */
export function PersonaChrome({ children }: { children: ReactNode }) {
  return (
    <div className={styles.root}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.backLink} aria-label="Back to home">
          <span aria-hidden="true">←</span>
          <Logo />
        </Link>
        <Link href="/#waitlist" className={styles.navCta}>
          Join waitlist
        </Link>
      </nav>
      {children}
      <ICloseFooter />
    </div>
  );
}

/* ------- Hero ------- */
type HeroProps = {
  variant: 'broker' | 'collaborator' | 'buyer';
  tagLabel: string;
  heroImage: string;
  heroAlt: string;
  headline: ReactNode;
  sub: ReactNode;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  chips?: string[];
};

export function PersonaHero({
  variant,
  tagLabel,
  heroImage,
  heroAlt,
  headline,
  sub,
  primaryCta,
  secondaryCta,
  chips,
}: HeroProps) {
  const tagCls =
    variant === 'collaborator' ? styles.personaTagAlt : styles.personaTag;

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <span className={tagCls}>{tagLabel}</span>
          <h1>{headline}</h1>
          <p>{sub}</p>
          {chips && chips.length > 0 && (
            <div className={styles.heroChips}>
              {chips.map((c) => (
                <span className={styles.heroChip} key={c}>
                  {c}
                </span>
              ))}
            </div>
          )}
          <div className={styles.heroCtas}>
            <Link href={primaryCta.href} className={styles.btnBlue}>
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className={styles.btnLink}>
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.heroMedia}>
          <Image
            src={heroImage}
            alt={heroAlt}
            fill
            sizes="(max-width: 820px) 100vw, 560px"
            className={styles.heroImg}
            priority
          />
        </div>
      </div>
    </section>
  );
}

/* ------- Intro / value-prop block ------- */
export function PersonaIntro({
  eyebrow,
  heading,
  body,
  items,
}: {
  eyebrow: string;
  heading: ReactNode;
  body: ReactNode;
  items: { tag: string; title: string; body: string }[];
}) {
  return (
    <section className={styles.intro}>
      <div className={styles.introLead}>
        <div className={styles.introEyebrow}>{eyebrow}</div>
        <h2 className={styles.introHeading}>{heading}</h2>
        <p className={styles.introBody}>{body}</p>
      </div>
      <div className={styles.valueGrid}>
        {items.map((it) => (
          <article className={styles.valueCard} key={it.title}>
            <div className={styles.valueCardHead}>{it.tag}</div>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------- Steps block ------- */
export function PersonaSteps({
  eyebrow,
  heading,
  body,
  steps,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  steps: { title: string; body: string }[];
}) {
  return (
    <section className={styles.steps}>
      <div className={styles.stepsHeader}>
        {eyebrow && <div className={styles.introEyebrow}>{eyebrow}</div>}
        <h2 className={styles.introHeading}>{heading}</h2>
        {body && <p className={styles.introBody}>{body}</p>}
      </div>
      <div className={styles.stepsList}>
        {steps.map((s, i) => (
          <div className={styles.stepRow} key={s.title}>
            <div className={styles.stepNum}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className={styles.stepBody}>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- Math card block ------- */
export function PersonaMath({
  eyebrow,
  heading,
  body,
  rows,
  footnote,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  rows: { label: string; value: string; hi?: boolean }[];
  footnote?: string;
}) {
  return (
    <section className={styles.math}>
      <div className={styles.mathHeader}>
        {eyebrow && <div className={styles.introEyebrow}>{eyebrow}</div>}
        <h2 className={styles.introHeading}>{heading}</h2>
        {body && <p className={styles.introBody}>{body}</p>}
      </div>
      <div className={styles.mathCard}>
        {rows.map((r) => (
          <div className={styles.mathRow} key={r.label}>
            <span className={styles.mathLabel}>{r.label}</span>
            <span
              className={`${styles.mathValue} ${r.hi ? styles.mathValueHi : ''}`}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
      {footnote && <p className={styles.mathFoot}>{footnote}</p>}
    </section>
  );
}

/* ------- Audience block ------- */
export function PersonaAudience({
  heading,
  body,
  items,
}: {
  heading: ReactNode;
  body?: ReactNode;
  items: { title: string; body: string }[];
}) {
  return (
    <section className={styles.audience}>
      <div className={styles.stepsHeader}>
        <h2 className={styles.introHeading}>{heading}</h2>
        {body && <p className={styles.introBody}>{body}</p>}
      </div>
      <div className={styles.audienceList}>
        {items.map((it) => (
          <div className={styles.audienceItem} key={it.title}>
            <span className={styles.audienceCheck} aria-hidden="true">
              ✓
            </span>
            <div className={styles.audienceBody}>
              <h3>{it.title}</h3>
              <p>{it.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- Features grid ------- */
export function PersonaFeatures({
  eyebrow,
  heading,
  body,
  items,
}: {
  eyebrow?: string;
  heading: ReactNode;
  body?: ReactNode;
  items: { title: string; body: string }[];
}) {
  return (
    <section className={styles.features}>
      <div className={styles.stepsHeader}>
        {eyebrow && <div className={styles.introEyebrow}>{eyebrow}</div>}
        <h2 className={styles.introHeading}>{heading}</h2>
        {body && <p className={styles.introBody}>{body}</p>}
      </div>
      <div className={styles.featureGrid}>
        {items.map((it) => (
          <article className={styles.featureCard} key={it.title}>
            <h3>{it.title}</h3>
            <p>{it.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ------- Market facts ------- */
export function PersonaFacts({
  heading,
  items,
}: {
  heading: ReactNode;
  items: { stat: string; label: string }[];
}) {
  return (
    <section className={styles.facts}>
      <div className={styles.stepsHeader}>
        <h2 className={styles.introHeading}>{heading}</h2>
      </div>
      <div className={styles.factGrid}>
        {items.map((it) => (
          <div className={styles.factCard} key={it.label}>
            <div className={styles.factStat}>{it.stat}</div>
            <div className={styles.factLabel}>{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------- Quote block ------- */
export function PersonaQuote({
  quote,
  name,
  role,
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <section className={styles.quote}>
      <blockquote className={styles.quoteBody}>&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className={styles.quoteMeta}>
        <span className={styles.quoteName}>{name}</span>
        <span className={styles.quoteRole}>{role}</span>
      </figcaption>
    </section>
  );
}

/* ------- Final CTA ------- */
export function PersonaCta({
  heading,
  body,
  cta,
}: {
  heading: ReactNode;
  body?: ReactNode;
  cta: { label: string; href: string };
}) {
  return (
    <section className={styles.cta}>
      <h2 className={styles.ctaHeading}>{heading}</h2>
      {body && <p className={styles.ctaSub}>{body}</p>}
      <Link href={cta.href} className={styles.btnBlueLg}>
        {cta.label}
      </Link>
    </section>
  );
}

/* ------- FAQ ------- */
export function PersonaFaq({
  heading,
  items,
}: {
  heading: ReactNode;
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className={styles.faq}>
      <div className={styles.faqInner}>
        <div className={styles.faqHeader}>
          <h2 className={styles.introHeading}>{heading}</h2>
        </div>
        <div className={styles.faqList}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
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
                  <span>{it.q}</span>
                  <span className={styles.faqChev} aria-hidden="true">
                    ›
                  </span>
                </button>
                {isOpen && (
                  <div className={styles.faqA}>
                    <p>{it.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
