import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions governing use of the ${siteConfig.name} platform.`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/terms` },
};

const LEGAL = {
  brand: 'iClose',
  email: 'hello@iclose.ae',
  lastUpdated: 'May 15, 2026',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      <div className="border-b border-ink/10">
        <div className="container-x flex items-center h-16">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors"
          >
            ← Back to iClose
          </Link>
        </div>
      </div>

      <main className="container-x py-16 md:py-24 max-w-3xl">
        <div className="mb-12">
          <div className="eyebrow mb-4">Legal</div>
          <h1 className="display-sm text-ink mb-4">Terms &amp; Conditions</h1>
          <p className="text-ink/40 text-sm font-mono">Last updated: {LEGAL.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          <Section title="1. Acceptance">
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement
              between you (&ldquo;User&rdquo;) and <strong>{LEGAL.brand}</strong>, a real estate
              education and community platform based in Dubai, UAE.
            </p>
            <p>
              By accessing{' '}
              <a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>{' '}
              or submitting an application, you confirm that you have read, understood, and agreed to
              be bound by these Terms and our{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
            </p>
            <p>If you do not agree, please discontinue use of the platform immediately.</p>
          </Section>

          <Section title="2. Platform Description">
            <p>
              {LEGAL.brand} is a real estate education and community platform designed for professionals
              and learners in the Dubai real estate market. The platform facilitates:
            </p>
            <ul>
              <li>Access to expert-led content and market intelligence.</li>
              <li>Community membership for real estate professionals.</li>
              <li>Specialist applications and matching with Members.</li>
              <li>Tools and resources for property professionals.</li>
            </ul>
          </Section>

          <Section title="3. Eligibility">
            <p>To use the platform, you must:</p>
            <ul>
              <li>Be at least 18 years of age.</li>
              <li>Provide accurate, complete, and current information during registration.</li>
              <li>Not be prohibited by any law from accessing or using the platform.</li>
            </ul>
            <p>
              {LEGAL.brand} reserves the right to refuse or terminate access to any user who does not
              meet these requirements.
            </p>
          </Section>

          <Section title="4. User Obligations">
            <p>By registering on the platform, you agree to:</p>
            <ul>
              <li>Act in full compliance with applicable UAE laws and regulations at all times.</li>
              <li>Not misrepresent your identity, credentials, or professional background.</li>
              <li>
                Keep all information you access through the platform strictly confidential and not
                share it with unauthorised third parties.
              </li>
              <li>
                Immediately notify {LEGAL.brand} of any legal or regulatory matter affecting your
                ability to use the platform.
              </li>
            </ul>
          </Section>

          <Section title="5. Prohibited Activities">
            <p>You must not:</p>
            <ul>
              <li>Use the platform for any unlawful purpose or in violation of UAE law.</li>
              <li>Submit false, misleading, or fraudulent information or applications.</li>
              <li>
                Reverse-engineer, scrape, copy, or redistribute any content, data, or tools from the
                platform without prior written consent.
              </li>
              <li>Harass, threaten, defame, or abuse {LEGAL.brand} staff or other users.</li>
              <li>
                Engage in any activity that disrupts or interferes with the platform&apos;s operation.
              </li>
            </ul>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on the platform — including branding, copy, graphics, tools, and data — is
              the exclusive property of {LEGAL.brand} or its licensors. No content may be reproduced,
              distributed, or used commercially without prior written consent from {LEGAL.brand}.
            </p>
            <p>
              You retain ownership of any content you submit (e.g., application information and
              messages), but grant {LEGAL.brand} a non-exclusive, royalty-free licence to use it
              solely for platform operations.
            </p>
          </Section>

          <Section title="7. Disclaimers &amp; Limitation of Liability">
            <p>
              The platform and all information on it are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis. {LEGAL.brand} does not warrant that the platform will
              be uninterrupted, error-free, or free of security vulnerabilities.
            </p>
            <p>
              To the fullest extent permitted by UAE law, {LEGAL.brand} shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use of the
              platform.
            </p>
          </Section>

          <Section title="8. Indemnification">
            <p>
              You agree to indemnify and hold harmless {LEGAL.brand}, its officers, employees, and
              agents from any claims, losses, liabilities, or expenses (including reasonable legal
              fees) arising from your violation of these Terms or any applicable law.
            </p>
          </Section>

          <Section title="9. Termination">
            <p>
              {LEGAL.brand} reserves the right to suspend or permanently terminate your access, with
              or without notice, if you violate any provision of these Terms or engage in fraudulent
              or unlawful conduct.
            </p>
            <p>
              You may close your account at any time by contacting us at{' '}
              <a href={`mailto:${LEGAL.email}`} className="text-gold hover:underline">
                {LEGAL.email}
              </a>.
            </p>
          </Section>

          <Section title="10. Governing Law &amp; Dispute Resolution">
            <p>
              These Terms are governed by and construed in accordance with the laws of the Emirate of
              Dubai and, where applicable, the federal laws of the United Arab Emirates.
            </p>
            <p>
              In the event of any dispute, the parties agree to first attempt good-faith negotiation
              for a period of 30 calendar days. If unresolved, the dispute shall be referred to the
              exclusive jurisdiction of the Dubai Courts.
            </p>
          </Section>

          <Section title="11. Amendments">
            <p>
              {LEGAL.brand} reserves the right to update these Terms at any time. Material changes
              will be communicated by updating the &ldquo;Last updated&rdquo; date above and, where
              reasonably practicable, by direct notification via email. Continued use of the platform
              after the effective date of any change constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="12. Entire Agreement">
            <p>
              These Terms, together with our{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>,
              constitute the entire agreement between you and {LEGAL.brand} with respect to your use
              of the platform, and supersede all prior understandings or representations.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>For questions about these Terms, please contact us:</p>
            <address className="not-italic mt-4 text-ink/60 space-y-1.5 text-sm border-l-2 border-gold/40 pl-4">
              <div><strong className="text-ink">{LEGAL.brand}</strong></div>
              <div className="text-ink/40 font-mono text-[11px] uppercase tracking-wider">Dubai, UAE</div>
              <div className="pt-1">
                <a href={`mailto:${LEGAL.email}`} className="text-gold hover:underline">
                  {LEGAL.email}
                </a>
              </div>
            </address>
          </Section>
        </div>

        <div className="hairline mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/privacy" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink/70 transition-colors">
            ← Privacy Policy
          </Link>
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink/70 transition-colors">
            Back to home →
          </Link>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-xl font-light text-ink mb-4 pb-2 border-b border-ink/10">
        {title}
      </h2>
      <div className="space-y-3 text-ink/60 text-sm leading-relaxed [&_strong]:text-ink [&_ul]:mt-2 [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:text-ink/60">
        {children}
      </div>
    </section>
  );
}
