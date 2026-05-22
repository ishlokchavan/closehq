'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import Image from 'next/image';
import { Logo } from '@/components/ui/logo';
import styles from './iclose-landing.module.css';
import { ICloseFooter } from './iclose-footer';
import { WaitlistForm } from './waitlist-form';

const heroPreviewCards = [
  {
    src: '/images/property-downtown.jpg',
    name: 'Downtown',
    cluster: 'Burj Khalifa District',
    tag: 'Active',
  },
  {
    src: '/images/property-beachfront.jpg',
    name: 'Palm Jumeirah',
    cluster: 'Frond G · Signature Villas',
    tag: 'Hot',
  },
  {
    src: '/images/property-luxury.jpg',
    name: 'Dubai Marina',
    cluster: 'Marina Walk · West Tower',
    tag: 'Active',
  },
];

const personaAvatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=faces&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&h=120&fit=crop&crop=faces&q=80',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&h=120&fit=crop&crop=faces&q=80',
];

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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* NAV */}
      <nav className={styles.nav}>
        <Logo />
        <ul className={styles.navLinks}>
          <li>
            <a href="#workflow">How it works</a>
          </li>
          <li>
            <a href="#waitlist" className={styles.navCta}>
              Join waitlist
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            Learn From The Best,
            <br />
            <span className={styles.muted}>Close More Deals!</span>
          </h1>
          <p className={styles.heroSub}>
            Get the training and support you need to close UAE real estate
            deals. Learn from the top 0.1% of UAE agents and keep up to 100% of
            your commission.
          </p>
          <div className={styles.heroCtas}>
            <a href="#waitlist" className={styles.btnBlue}>
              Join the waitlist
            </a>
            <a href="#workflow" className={styles.btnLink}>
              See how it works
            </a>
          </div>

          <div className={styles.heroPreview} aria-hidden="true">
            <div className={styles.heroPreviewGlow} />
            <div className={styles.heroWindow}>
              <div className={styles.heroWindowBar}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
                <div className={styles.heroWindowTitle}>
                  iClose · Communities
                </div>
              </div>
              <div className={styles.heroWindowBody}>
                {heroPreviewCards.map((card) => (
                  <div key={card.name} className={styles.previewCard}>
                    <Image
                      src={card.src}
                      alt=""
                      fill
                      sizes="(max-width: 720px) 240px, 280px"
                      className={styles.previewCardImg}
                    />
                    <div className={styles.previewCardGradient} />
                    <div className={styles.previewCardTag}>{card.tag}</div>
                    <div className={styles.previewCardMeta}>
                      <div className={styles.previewCardName}>{card.name}</div>
                      <div className={styles.previewCardCluster}>
                        {card.cluster}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className={styles.pillarsSection}>
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>What iClose does</Reveal>
          <Reveal as="h2" delay={1}>
            Built for closers.
            <br />
            <span className={styles.muted}>Powered by experts.</span>
          </Reveal>
          <Reveal className={styles.sectionSub} delay={2} as="p">
            Three things every UAE closer needs. One platform that delivers all
            three.
          </Reveal>
          <div className={styles.pillars}>
            <Reveal className={styles.pillar} delay={1}>
              <div className={styles.iconWrap}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5z" />
                  <path d="M4 17.5A2.5 2.5 0 0 0 6.5 20H20" />
                  <path d="M9 7h7M9 11h5" />
                </svg>
              </div>
              <div className={styles.pillarTag}>Learn</div>
              <h3>
                Learn any UAE community,
                <br />
                top to bottom.
              </h3>
              <p>
                Sessions, playbooks, and deal breakdowns for every community,
                tower, and cluster. Built by the experts actually closing there.
                From basics to specialization.
              </p>
              <div className={styles.pillarAnchor}>
                <div className={styles.anchorNum}>A to Z</div>
                <span className={styles.anchorDesc}>
                  Every community. Every floor plan.
                </span>
              </div>
            </Reveal>

            <Reveal className={styles.pillar} delay={2}>
              <div className={styles.iconWrap}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M14 7h7v7" />
                </svg>
              </div>
              <div className={styles.pillarTag}>Earn</div>
              <h3>
                Keep more
                <br />
                of every deal.
              </h3>
              <p>
                When you close, you keep up to 100%. Refer a client and earn up
                to 80% of the commission. Post an inquiry and get paid when an
                iClose expert closes alongside you.
              </p>
              <div className={styles.pillarAnchor}>
                <div className={styles.anchorNum}>
                  <small>upto</small>100%
                </div>
                <span className={styles.anchorDesc}>
                  of your hard-earned commission.
                </span>
              </div>
            </Reveal>

            <Reveal className={styles.pillar} delay={3}>
              <div className={styles.iconWrap}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="9" r="6" />
                  <path d="M9 14l-2 8 5-3 5 3-2-8" />
                </svg>
              </div>
              <div className={styles.pillarTag}>Lead</div>
              <h3>
                Become the name
                <br />
                people call first.
              </h3>
              <p>
                Authority compounds. The more you learn a niche, the more
                inbound finds you. Stop being a generalist. Become the answer
                in your community.
              </p>
              <div className={styles.pillarAnchor}>
                <div className={styles.anchorNum}>One</div>
                <span className={styles.anchorDesc}>
                  The closer people remember.
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className={styles.workflowSection} id="workflow">
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>
            How it works in practice
          </Reveal>
          <Reveal as="h2" delay={1}>
            One platform.
            <br />
            <span className={styles.muted}>Two paths to a closed deal.</span>
          </Reveal>
          <Reveal as="p" className={styles.sectionSub} delay={2}>
            Whether you close it yourself or work with an iClose expert, every
            path ends with you getting paid.
          </Reveal>

          <div className={styles.workflow}>
            <Reveal className={styles.wfCard}>
              <div className={styles.wfStepIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1-2-2z" />
                  <path d="M4 17a2 2 0 0 1 2-2h14" />
                </svg>
              </div>
              <div className={styles.wfStepNum}>Step 1</div>
              <h3>Learn the market.</h3>
              <p>
                Master any UAE community through expert-led sessions,
                playbooks, and deal breakdowns.
              </p>
            </Reveal>

            <Reveal className={styles.wfArrow} delay={1}>
              <span aria-hidden="true" />
            </Reveal>

            <Reveal className={styles.wfForkGroup} delay={2}>
              <div className={styles.wfForkLabel}>Step 2 · Pick your route</div>
              <div className={styles.wfForkRow}>
                <div className={styles.wfForkCard}>
                  <div className={styles.wfPathTag}>Broker route</div>
                  <h4>Close it yourself.</h4>
                  <p>
                    Use the platform&apos;s network, listings, and tools to
                    close the deal under your own name.
                  </p>
                  <div className={styles.wfMini}>
                    <span className={styles.label}>Your split</span>
                    <span className={styles.val}>Up to 100%</span>
                  </div>
                </div>

                <div className={styles.wfOr} aria-hidden="true">
                  OR
                </div>

                <div className={styles.wfForkCard}>
                  <div
                    className={`${styles.wfPathTag} ${styles.wfPathTagAlt}`}
                  >
                    Collaborate route
                  </div>
                  <h4>Post an inquiry.</h4>
                  <p>
                    Got a client but not a broker? Submit the inquiry. We match
                    you with the right expert who closes alongside you.
                  </p>
                  <div className={`${styles.wfMini} ${styles.wfMiniAlt}`}>
                    <span className={styles.label}>You earn</span>
                    <span className={styles.val}>Up to 80%</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal className={styles.wfArrow} delay={3}>
              <span aria-hidden="true" />
            </Reveal>

            <Reveal className={styles.wfCard} delay={4}>
              <div className={styles.wfStepIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 12l6 6L21 6" />
                </svg>
              </div>
              <div className={styles.wfStepNum}>Step 3</div>
              <h3>Get paid.</h3>
              <p>
                Commission lands directly. Transparent from day one. No
                surprises.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PERSONAS */}
      <section className={styles.personasSection}>
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>Who it&apos;s for</Reveal>
          <Reveal as="h2" delay={1}>
            Five sentences.
            <br />
            <span className={styles.muted}>Find the one that&apos;s yours.</span>
          </Reveal>
          <Reveal as="p" className={styles.sectionSub} delay={2}>
            If any of these sound like something you&apos;ve said out loud,
            iClose was built with you in mind.
          </Reveal>
          <div className={styles.personasGrid}>
            <Reveal className={styles.persona} delay={1}>
              <div className={styles.personaHead}>
                <div className={styles.personaAvatar}>
                  <Image
                    src={personaAvatars[0]}
                    alt=""
                    fill
                    sizes="44px"
                    className={styles.personaAvatarImg}
                  />
                </div>
                <div className={styles.personaMeta}>Brokers · 1–5 yrs</div>
              </div>
              <div className={styles.personaQuote}>
                I&apos;m tired of being a generalist competing with everyone.
              </div>
              <div className={styles.personaBody}>
                You want to dominate one community but keep losing to brokers
                with deeper area knowledge. iClose gives you the structured path
                to become that name.
              </div>
              <div className={styles.personaOutcome}>Learn one niche. Own it.</div>
            </Reveal>

            <Reveal className={styles.persona} delay={2}>
              <div className={styles.personaHead}>
                <div className={styles.personaAvatar}>
                  <Image
                    src={personaAvatars[1]}
                    alt=""
                    fill
                    sizes="44px"
                    className={styles.personaAvatarImg}
                  />
                </div>
                <div className={styles.personaMeta}>Active broker</div>
              </div>
              <div className={styles.personaQuote}>
                I&apos;m doing the work but someone else is converting it.
              </div>
              <div className={styles.personaBody}>
                You generate the leads. Someone with more authority closes
                them. iClose backs your hustle with the insider context that
                actually converts.
              </div>
              <div className={styles.personaOutcome}>
                Same leads. Better close rate.
              </div>
            </Reveal>

            <Reveal className={styles.persona} delay={3}>
              <div className={styles.personaHead}>
                <div className={styles.personaAvatar}>
                  <Image
                    src={personaAvatars[2]}
                    alt=""
                    fill
                    sizes="44px"
                    className={styles.personaAvatarImg}
                  />
                </div>
                <div className={styles.personaMeta}>Lawyer · Advisor · CA</div>
              </div>
              <div className={styles.personaQuote}>
                I can&apos;t risk my reputation on a random broker.
              </div>
              <div className={styles.personaBody}>
                Your clients ask about UAE property. You can&apos;t introduce
                them to just anyone. iClose matches you with verified
                specialists, and pays you up to 80% of the commission.
              </div>
              <div className={styles.personaOutcome}>Refer once. Earn well.</div>
            </Reveal>

            <Reveal className={styles.persona} delay={4}>
              <div className={styles.personaHead}>
                <div className={styles.personaAvatar}>
                  <Image
                    src={personaAvatars[3]}
                    alt=""
                    fill
                    sizes="44px"
                    className={styles.personaAvatarImg}
                  />
                </div>
                <div className={styles.personaMeta}>Networker · Executive</div>
              </div>
              <div className={styles.personaQuote}>
                I should be earning from conversations I&apos;m already having.
              </div>
              <div className={styles.personaBody}>
                Your network constantly asks who to call for property. Now you
                have a real answer. And up to 80% of the commission when they
                close.
              </div>
              <div className={styles.personaOutcome}>
                Conversations become income.
              </div>
            </Reveal>

            <Reveal className={styles.persona} delay={5}>
              <div className={styles.personaHead}>
                <div className={styles.personaAvatar}>
                  <Image
                    src={personaAvatars[4]}
                    alt=""
                    fill
                    sizes="44px"
                    className={styles.personaAvatarImg}
                  />
                </div>
                <div className={styles.personaMeta}>Performance broker</div>
              </div>
              <div className={styles.personaQuote}>
                I deserve to earn what I actually generate.
              </div>
              <div className={styles.personaBody}>
                Done with 50/50 splits regardless of where the lead came from.
                iClose rewards performance. Up to 100% on your closed deals.
              </div>
              <div className={styles.personaOutcome}>Earn what you deserve.</div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className={styles.howSection}>
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>Getting started</Reveal>
          <Reveal as="h2" delay={1}>
            From sign-up to specialist.
            <br />
            <span className={styles.muted}>In four steps.</span>
          </Reveal>
          <Reveal as="p" className={styles.sectionSub} delay={2}>
            No bloated onboarding. No mystery. A clear path from day one.
          </Reveal>
          <div className={styles.howSteps}>
            <Reveal className={styles.howStep} delay={1}>
              <div className={styles.howNum}>01</div>
              <h3>Join the platform.</h3>
              <p>
                Book a call. We walk you through how iClose works and find the
                right starting point for where you are.
              </p>
            </Reveal>
            <Reveal className={styles.howStep} delay={2}>
              <div className={styles.howNum}>02</div>
              <h3>Pick your market.</h3>
              <p>
                Choose a community. Go through everything iClose has on it. By
                the end, you&apos;ve mastered it.
              </p>
            </Reveal>
            <Reveal className={styles.howStep} delay={3}>
              <div className={styles.howNum}>03</div>
              <h3>Refer or close.</h3>
              <p>
                Close deals yourself. Post inquiries when you need an expert.
                Earn at every step.
              </p>
            </Reveal>
            <Reveal className={styles.howStep} delay={4}>
              <div className={styles.howNum}>04</div>
              <h3>Compound the authority.</h3>
              <p>
                Over time, you become the closer everyone calls in your market.
                Inbound starts finding you.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATORS */}
      <section className={styles.differentiatorsSection}>
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>
            What sets iClose apart
          </Reveal>
          <Reveal as="h2" delay={1}>
            Built on a
            <br />
            <span className={styles.muted}>different idea.</span>
          </Reveal>
          <Reveal as="p" className={styles.sectionSub} delay={2}>
            Most real estate platforms work the same way. Here&apos;s how
            iClose doesn&apos;t.
          </Reveal>

          <div className={styles.diffGrid}>
            <Reveal className={styles.diffCard} delay={1}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5z" />
                  <path d="M4 17.5A2.5 2.5 0 0 0 6.5 20H20" />
                </svg>
              </div>
              <h3>Education, not infrastructure.</h3>
              <p>
                Most platforms sell you a desk and an inbox. iClose sells you
                the knowledge that makes you the closer everyone wants on the
                deal.
              </p>
            </Reveal>

            <Reveal className={styles.diffCard} delay={2}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
                  <circle cx="17" cy="9" r="2.5" />
                  <path d="M22 18c0-2.5-2-4.5-5-4.5" />
                </svg>
              </div>
              <h3>Not just for brokers.</h3>
              <p>
                Most platforms are agent-only. iClose welcomes lawyers,
                advisors, executives, and anyone with a client to refer.
              </p>
            </Reveal>

            <Reveal className={styles.diffCard} delay={3}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v10M9 9.5h4.5a2 2 0 0 1 0 4H10a2 2 0 0 0 0 4h5" />
                </svg>
              </div>
              <h3>You keep your commission.</h3>
              <p>
                Most platforms take a cut of every deal. We don&apos;t.
                Membership covers the platform. You keep up to 100% of what you
                close.
              </p>
            </Reveal>

            <Reveal className={styles.diffCard} delay={4}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16 16l5 5" />
                </svg>
              </div>
              <h3>Deep, not broad.</h3>
              <p>
                Most platforms cover real estate broadly. iClose goes deep on
                every community, tower, and cluster. Taught by people closing
                there now.
              </p>
            </Reveal>

            <Reveal className={styles.diffCard} delay={5}>
              <div className={styles.diffIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 12h11M11 7l5 5-5 5" />
                  <circle cx="19" cy="12" r="2.5" />
                </svg>
              </div>
              <h3>Inbound, not outbound.</h3>
              <p>
                Most platforms reward whoever responds fastest. iClose helps
                you become the closer those leads come looking for in the first
                place.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className={styles.objectionsSection}>
        <div className={styles.wrapWide}>
          <Reveal className={styles.sectionEyebrow}>Honest answers</Reveal>
          <Reveal as="h2" delay={1}>
            The questions you&apos;d
            <br />
            <span className={styles.muted}>actually want to ask.</span>
          </Reveal>
          <Reveal as="p" className={styles.sectionSub} delay={2}>
            No marketing fluff. Just the things every reasonable person wonders
            before joining something pre-launch.
          </Reveal>
          <div className={styles.objectionsGrid}>
            <Reveal className={styles.obj} delay={1}>
              <div className={styles.objQ}>
                Why should I trust a pre-launch platform?
              </div>
              <p className={styles.objA}>
                Fair question. Joining the waitlist costs nothing and commits to
                nothing. Founding-member access locks in only when we open. You
                can walk away if it doesn&apos;t deliver.
              </p>
            </Reveal>

            <Reveal className={styles.obj} delay={2}>
              <div className={styles.objQ}>
                How is &quot;up to 100% commission&quot; actually possible?
              </div>
              <p className={styles.objA}>
                iClose isn&apos;t a traditional agency taking a cut of your
                deals. We make money from membership, not from the commission
                you earn. We&apos;ll walk you through the model on the call.
              </p>
            </Reveal>

            <Reveal className={styles.obj} delay={3}>
              <div className={styles.objQ}>
                I&apos;m not a broker. Can I still earn?
              </div>
              <p className={styles.objA}>
                Yes. Lawyers, wealth managers, executives, and well-networked
                individuals can post an inquiry, get matched with the right
                expert, and earn up to 80% of the commission. No license needed.
              </p>
            </Reveal>

            <Reveal className={styles.obj} delay={4}>
              <div className={styles.objQ}>
                What if my area isn&apos;t covered yet?
              </div>
              <p className={styles.objA}>
                We launch with the UAE&apos;s major communities and add
                coverage continuously. If your area isn&apos;t there at launch,
                tell us. We prioritize based on demand.
              </p>
            </Reveal>

            <Reveal className={styles.obj} delay={5}>
              <div className={styles.objQ}>
                Do I need to leave my current agency?
              </div>
              <p className={styles.objA}>
                Not necessarily. Some members work with iClose alongside an
                existing role. Others use iClose&apos;s visa and full
                back-office to go fully independent. We&apos;ll figure out the
                right setup on the call.
              </p>
            </Reveal>

            <Reveal className={styles.obj} delay={6}>
              <div className={styles.objQ}>What happens if I cancel?</div>
              <p className={styles.objA}>
                You keep your learning history, deal records, and earnings. We
                don&apos;t lock anyone in. The knowledge you&apos;ve built is
                yours to keep.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className={styles.manifesto}>
        <div className={styles.manifestoBackdrop} aria-hidden="true">
          <Image
            src="/images/hero-night.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.manifestoImg}
          />
          <div className={styles.manifestoOverlay} />
          <div className={styles.manifestoGrain} />
        </div>
        <div className={styles.manifestoInner}>
          <Reveal
            className={`${styles.sectionEyebrow} ${styles.sectionEyebrowDark}`}
          >
            The iClose philosophy
          </Reveal>
          <Reveal as="h2" delay={1}>
            Real estate education
            <br />
            has been broken for too long.
            <br />
            <span className={styles.manifestoAccent}>iClose fixes it.</span>
          </Reveal>
          <div className={styles.manifestoBody}>
            <Reveal as="p" delay={2}>
              The market trains UAE closers to chase volume. Cold-call harder.
              Quote more. Reply faster.
            </Reveal>
            <Reveal as="p" delay={3}>
              iClose trains them to do the opposite. Learn one market cold.
              Become the answer. Keep more of what you earn.
            </Reveal>
          </div>
          <Reveal className={styles.manifestoCta} delay={4}>
            <a href="#waitlist" className={styles.btnBlueBright}>
              Join the waitlist
            </a>
          </Reveal>
        </div>
      </section>

      {/* WAITLIST */}
      <section className={styles.waitlist} id="waitlist">
        <div className={styles.wlInner}>
          <Reveal className={styles.sectionEyebrow}>Early access</Reveal>
          <Reveal as="h2" delay={1}>
            Be one of the first.
          </Reveal>
          <Reveal
            as="p"
            className={styles.sectionSub}
            delay={2}
          >
            iClose opens soon. Tell us a bit about you and we&apos;ll reach out
            to walk you through how it works for someone like you.
          </Reveal>
          <Reveal delay={3}>
            <WaitlistForm />
          </Reveal>
          <Reveal as="p" className={styles.wlNote} delay={4}>
            No spam. We&apos;ll email you to confirm and then only when
            there&apos;s real news.
          </Reveal>
        </div>
      </section>

      <ICloseFooter />
    </div>
  );
}
