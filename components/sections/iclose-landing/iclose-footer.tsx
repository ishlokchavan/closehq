'use client';

import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { siteConfig } from '@/lib/site-config';
import { formatPhone, telHref } from '@/lib/utils';
import styles from './iclose-landing.module.css';

const openCookieSettings = () =>
  window.dispatchEvent(new Event('iclose:open-cookie-settings'));

export function ICloseFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerBrand}>
          <Logo />
          <p className={styles.footerTagline}>
            A proptech education platform for UAE real estate. Learn from the
            top 0.1% of agents and keep more of every deal.
          </p>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Platform</p>
          <ul className={styles.fLinks}>
            <li>
              <Link href="/#workflow">How it works</Link>
            </li>
            <li>
              <Link href="/#waitlist">Get started</Link>
            </li>
            <li>
              <a
                href={
                  process.env.NEXT_PUBLIC_CALENDLY_URL ||
                  'https://calendly.com/hello-iclose/30min'
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Book a call
              </a>
            </li>
            <li>
              <Link href="/team">Team</Link>
            </li>
            <li>
              <Link href="/careers">Careers</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Legal</p>
          <ul className={styles.fLinks}>
            <li>
              <Link href="/privacy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of service</Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerCol}>
          <p className={styles.footerHeading}>Contact</p>
          <ul className={styles.fLinks}>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            )}
            {siteConfig.phone && (
              <li>
                <a href={telHref(siteConfig.phone)}>
                  {formatPhone(siteConfig.phone)}
                </a>
              </li>
            )}
            <li>
              <span style={{ color: 'var(--text-light)', fontSize: 13 }}>
                Dubai, UAE
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerDivider} />

      <div className={styles.footerBottom}>
        <p className={styles.fCopy}>
          © {new Date().getFullYear()} iClose. Dubai, UAE.
        </p>
        <div className={styles.footerMeta}>
          <button type="button" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </div>
      </div>
    </footer>
  );
}
