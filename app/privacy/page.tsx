import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${siteConfig.name} — how we collect, use, and protect your personal information.`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/privacy` },
};

const LEGAL = {
  brand: 'iClose',
  email: siteConfig.email,
  lastUpdated: 'May 15, 2026',
};

export default function PrivacyPolicyPage() {
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
          <h1 className="display-sm text-ink mb-4">Privacy Policy</h1>
          <p className="text-ink/40 text-sm font-mono">Last updated: {LEGAL.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          <Section title="1. Introduction">
            <p>
              {LEGAL.brand} is a real estate education and community platform based in Dubai,
              United Arab Emirates.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your personal
              information when you visit{' '}
              <a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>{' '}
              or engage with our services. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or
              &ldquo;our&rdquo; mean {LEGAL.brand}.
            </p>
            <p>
              By using our platform, you consent to the practices described in this policy in accordance
              with UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of personal information:</p>
            <ul>
              <li>
                <strong>Identity &amp; Contact Data:</strong> Full name, email address, and phone number.
              </li>
              <li>
                <strong>Professional Data:</strong> Areas of expertise, experience, and background
                information submitted in Specialist or internship applications.
              </li>
              <li>
                <strong>Application Data:</strong> CV/resume files and Instagram handles submitted
                through application forms.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages visited, time on page, and
                referring URLs, collected automatically via cookies and analytics tools.
              </li>
              <li>
                <strong>Communication Data:</strong> Messages and feedback submitted through our forms
                or email.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the collected information to:</p>
            <ul>
              <li>Process and respond to membership, Specialist, and internship applications.</li>
              <li>Send transactional emails such as application confirmations and email verification.</li>
              <li>Send platform updates and news, where you have opted in.</li>
              <li>Analyse platform usage to improve user experience and content.</li>
              <li>Comply with applicable UAE legal and regulatory requirements.</li>
              <li>Prevent fraud and ensure platform security.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>We process your personal data on the following bases:</p>
            <ul>
              <li><strong>Consent</strong> — where you have explicitly agreed, including consent given
              when submitting our forms and when accepting cookies.</li>
              <li>
                <strong>Contractual necessity</strong> — to fulfil our obligations in connection with
                your application or membership.
              </li>
              <li>
                <strong>Legitimate interests</strong> — for fraud prevention, platform security, and
                improving our services.
              </li>
              <li>
                <strong>Legal obligation</strong> — to comply with applicable UAE laws.
              </li>
            </ul>
          </Section>

          <Section title="5. Sharing Your Information">
            <p>We do not sell your personal data. We may share your information with:</p>
            <ul>
              <li>
                <strong>Service providers</strong> — third-party vendors (e.g., database hosting,
                analytics, email delivery) who process data on our behalf under strict confidentiality
                obligations.
              </li>
              <li>
                <strong>Regulatory authorities</strong> — when required or permitted by UAE law.
              </li>
            </ul>
          </Section>

          <Section title="6. Cookies &amp; Tracking Technologies">
            <p>
              We use cookies and similar technologies — including Google Analytics 4 and Meta Pixel —
              to understand how visitors interact with our website and to measure marketing effectiveness.
              Non-essential cookies (analytics and marketing) are only loaded after you give explicit
              consent via our cookie banner.
            </p>
            <p>
              You can update your cookie preferences at any time using the &ldquo;Cookie settings&rdquo;
              link in the footer. Both Google and Meta may transfer data outside the UAE; appropriate
              safeguards are in place for such transfers.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes outlined in
              this policy or as required by UAE law:
            </p>
            <ul>
              <li>Application data: up to 5 years from the date of submission.</li>
              <li>Email and communication records: up to 3 years.</li>
            </ul>
            <p>You may request earlier deletion where legally permissible (see Section 9).</p>
          </Section>

          <Section title="8. International Transfers">
            <p>
              Some of our service providers are located outside the UAE. Where we transfer data
              internationally, we ensure appropriate safeguards are in place consistent with the UAE PDPL,
              including transfers to jurisdictions recognised as providing adequate data protection or
              under standard contractual clauses.
            </p>
          </Section>

          <Section title="9. Your Rights">
            <p>Under UAE PDPL, you have the right to:</p>
            <ul>
              <li>Access a copy of your personal data held by us.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;), subject to legal
              retention obligations.</li>
              <li>Withdraw consent at any time without affecting prior processing.</li>
              <li>Object to or restrict certain types of processing.</li>
              <li>Data portability where technically feasible.</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{' '}
              <a href={`mailto:${LEGAL.email}`} className="text-gold hover:underline">
                {LEGAL.email}
              </a>
              . We will respond within 30 calendar days.
            </p>
          </Section>

          <Section title="10. Security">
            <p>
              We implement industry-standard technical and organisational measures to protect your
              personal data against unauthorised access, alteration, disclosure, or destruction. Access
              to personal data is restricted to authorised personnel on a need-to-know basis. Despite
              our efforts, no transmission over the internet is 100% secure.
            </p>
          </Section>

          <Section title="11. Children&apos;s Privacy">
            <p>
              Our platform is not directed to individuals under 18 years of age. We do not knowingly
              collect personal information from minors. If you believe a minor has provided us with
              personal data, please contact us immediately at{' '}
              <a href={`mailto:${LEGAL.email}`} className="text-gold hover:underline">
                {LEGAL.email}
              </a>.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. Material changes will be notified by
              updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of
              our platform after changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              For privacy-related questions, requests, or complaints, please contact us:
            </p>
            <address className="not-italic mt-4 text-ink/60 space-y-1.5 text-sm border-l-2 border-gold/40 pl-4">
              <div><strong className="text-ink">{LEGAL.brand}</strong></div>
              <div className="text-ink/40 font-mono text-[11px] uppercase tracking-wider">Dubai, UAE</div>
              <div className="pt-1">
                <a href={`mailto:${LEGAL.email}`} className="text-gold hover:underline">
                  {LEGAL.email}
                </a>
              </div>
            </address>
            <p className="mt-4">
              If you are unsatisfied with our response, you have the right to lodge a complaint with the
              UAE Data Office, the competent authority under the UAE PDPL.
            </p>
          </Section>
        </div>

        <div className="hairline mt-16 mb-8" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link href="/" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink/70 transition-colors">
            ← Back to home
          </Link>
          <Link href="/terms" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink/70 transition-colors">
            Terms &amp; Conditions →
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
