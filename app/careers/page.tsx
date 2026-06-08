import type { Metadata } from 'next';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { ICloseFooter } from '@/components/sections/iclose-landing/iclose-footer';
import { CareersForm } from '@/components/sections/iclose-landing/careers-form';
import styles from '@/components/sections/iclose-landing/iclose-landing.module.css';

export const metadata: Metadata = {
  title: 'Careers, iClose',
  description:
    'Paid internship opportunities at iClose. Content Creation, Marketing, Copywriting, Investment Analysis, Research, and Investor Relations.',
};

const ROLES = [
  'Content Creation',
  'Marketing',
  'Copywriter',
  'Investment Analysis',
  'Research',
  'Investor Relations',
];

type IconKey =
  | 'camera'
  | 'users'
  | 'pen'
  | 'search'
  | 'trend'
  | 'star'
  | 'book'
  | 'eye'
  | 'zap'
  | 'mic';

function Icon({ name }: { name: IconKey }) {
  switch (name) {
    case 'camera':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3 8.5a2 2 0 0 1 2-2h2.5l1.5-2h6l1.5 2H19a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    case 'users':
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="9" cy="8" r="3.5" />
          <path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M22 18c0-2.5-2-4.5-5-4.5" />
        </svg>
      );
    case 'pen':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 20h4l11-11-4-4L4 16z" />
          <path d="M14 6l4 4" />
        </svg>
      );
    case 'search':
      return (
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="7" />
          <path d="M16 16l5 5" />
        </svg>
      );
    case 'trend':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M3 17l6-6 4 4 8-8" />
          <path d="M14 7h7v7" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M12 3l2.7 5.5L21 9.4l-4.5 4.4 1 6.2L12 17l-5.5 3 1-6.2L3 9.4l6.3-.9z" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 1 4 17.5z" />
          <path d="M4 17.5A2.5 2.5 0 0 0 6.5 20H20" />
        </svg>
      );
    case 'eye':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'zap':
      return (
        <svg viewBox="0 0 24 24">
          <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
        </svg>
      );
    case 'mic':
      return (
        <svg viewBox="0 0 24 24">
          <rect x="9" y="3" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
        </svg>
      );
  }
}

const WHAT_YOULL_DO: { icon: IconKey; text: string }[] = [
  {
    icon: 'camera',
    text: 'Film, edit, and produce engaging digital content in our in-house studio.',
  },
  {
    icon: 'users',
    text: 'Host our videos and engage with our audience as the face of our content.',
  },
  {
    icon: 'pen',
    text: 'Write copy for social media, ads, and marketing campaigns.',
  },
  { icon: 'search', text: 'Conduct research and analyze market trends.' },
  { icon: 'trend', text: 'Contribute to strategic decision-making.' },
];

const WHATS_IN_IT: { icon: IconKey; text: string }[] = [
  { icon: 'star', text: 'High-paying performance-based commission.' },
  { icon: 'book', text: 'Hands-on mentorship & real-world training.' },
  { icon: 'eye', text: 'Exposure to high-level business environments.' },
  { icon: 'zap', text: 'Fast-track learning across multiple domains.' },
  { icon: 'mic', text: 'Gain hands-on knowledge of how a real business operates.' },
];

export default function CareersPage() {
  return (
    <div className={styles.root}>
      <nav className={styles.legalNav}>
        <Logo />
        <Link href="/" className={styles.legalBackLink}>
          ← Back to home
        </Link>
      </nav>

      <main className={styles.careersMain}>
        <div className={styles.careersTop}>
          <div className={styles.careersHero}>
            <div className={styles.legalEyebrow}>Careers · iclose.ae</div>
            <h1 className={styles.legalTitle}>
              Paid Internship
              <br />
              Opportunities
            </h1>
            <p className={styles.careersHeroLede}>
              Real work, real mentorship, real growth at our tech &amp;
              education startup. Apply in under a minute.
            </p>
          </div>

          <section className={styles.careersFormSection}>
            <div className={styles.careersFormHeading}>
              <div className={styles.careersFormEyebrow}>Apply now</div>
              <h2>Join the team.</h2>
            </div>
            <CareersForm />
          </section>
        </div>

        <section className={styles.careersSection}>
          <div className={styles.rolePills}>
            {ROLES.map((role) => (
              <span key={role} className={styles.rolePill}>
                {role}
              </span>
            ))}
          </div>

          <p className={styles.careersIntro}>
            This isn&apos;t your typical internship with coffee runs or
            sidelines. We&apos;re building something{' '}
            <strong>exciting</strong> at our tech &amp; education startup, and
            we&apos;re looking for eager individuals ready to learn, create,
            and <strong>grow</strong> through direct mentorship from an
            experienced <strong>leadership</strong> team.
          </p>

          <div className={styles.careersTwoCol}>
            <div>
              <p className={styles.careersColHeading}>What you&apos;ll do</p>
              <ul className={styles.careersList}>
                {WHAT_YOULL_DO.map(({ icon, text }) => (
                  <li key={text} className={styles.careersListItem}>
                    <span className={styles.careersListIcon}>
                      <Icon name={icon} />
                    </span>
                    <span className={styles.careersListText}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className={styles.careersColHeading}>
                What&apos;s in it for you
              </p>
              <ul className={styles.careersList}>
                {WHATS_IN_IT.map(({ icon, text }) => (
                  <li key={text} className={styles.careersListItem}>
                    <span className={styles.careersListIcon}>
                      <Icon name={icon} />
                    </span>
                    <span className={styles.careersListText}>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <ICloseFooter />
    </div>
  );
}
