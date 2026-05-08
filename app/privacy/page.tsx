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
  entity: '',
  brand: 'iClose',
  rera: '',
  tradeLicense: '',
  address: '',
  privacyEmail: 'privacy@iclose.ae',
  whatsapp: '',
  whatsappLink: 'https://wa.me/',
  lastUpdated: 'May 7, 2026',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Top bar */}
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
        {/* Header */}
        <div className="mb-12">
          <div className="eyebrow mb-4">Legal</div>
          <h1 className="display-sm text-ink mb-4">Privacy Policy</h1>
          <p className="text-ink/40 text-sm font-mono">Last updated: {LEGAL.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          <Section title="1. Introduction">
            <p>
              {LEGAL.brand} is a real estate platform operated by <strong>{LEGAL.entity}</strong>, a company
              registered in the Emirate of Dubai, United Arab Emirates (Trade License No.{' '}
              {LEGAL.tradeLicense}), licensed by the Real Estate Regulatory Agency (RERA) under Broker
              Registration No. <strong>{LEGAL.rera}</strong>.
            </p>
            <p>
              This Privacy Policy explains how we collect, use, disclose, and safeguard your personal
              information when you visit{' '}
              <a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>{' '}
              or engage with our services. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; mean{' '}
              {LEGAL.entity} and its subsidiary platform {LEGAL.brand}.
            </p>
            <p>
              By using our platform, you consent to the practices described in this policy in accordance with
              UAE Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data (PDPL).
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We may collect the following categories of personal information:</p>
            <ul>
              <li>
                <strong>Identity &amp; Contact Data:</strong> Full name, email address, phone/WhatsApp
                number, nationality, and Emirates ID number where required for regulatory verification.
              </li>
              <li>
                <strong>Professional Data:</strong> Current brokerage or employer, years of experience,
                RERA registration number (if applicable), and areas of specialisation.
              </li>
              <li>
                <strong>Financial Data:</strong> Bank account details for commission payouts and any
                information required for AML compliance under UAE Federal Law No. 20 of 2019.
              </li>
              <li>
                <strong>Usage Data:</strong> IP address, browser type, pages visited, time on page, and
                referring URLs, collected automatically via cookies and analytics tools.
              </li>
              <li>
                <strong>Communication Data:</strong> Messages, inquiries, and feedback submitted through
                our contact form, email, or WhatsApp.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the collected information to:</p>
            <ul>
              <li>Process and respond to your agent or connector application.</li>
              <li>Communicate deal opportunities, commission updates, and platform announcements.</li>
              <li>
                Verify your identity and professional credentials as required by RERA, DLD, and UAE
                real estate regulations.
              </li>
              <li>Process commission payouts and maintain accurate financial records.</li>
              <li>Analyse platform usage to improve user experience and content.</li>
              <li>Comply with AML/CFT obligations and other UAE legal and regulatory requirements.</li>
              <li>Prevent fraud and ensure platform security.</li>
            </ul>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>We process your personal data on the following bases:</p>
            <ul>
              <li><strong>Consent</strong> — where you have explicitly agreed to the processing.</li>
              <li>
                <strong>Contractual necessity</strong> — to fulfil our obligations under an agreement
                with you, including commission and referral arrangements.
              </li>
              <li>
                <strong>Legitimate interests</strong> — for fraud prevention, platform security, and
                improving our services.
              </li>
              <li>
                <strong>Legal obligation</strong> — to comply with UAE laws including RERA regulations,
                DLD requirements, and AML/CFT legislation.
              </li>
            </ul>
          </Section>

          <Section title="5. Sharing Your Information">
            <p>We do not sell your personal data. We may share your information with:</p>
            <ul>
              {/* <li>
                <strong></strong> — our parent company, for operational,
                compliance, and financial reporting purposes.
              </li> */}
              <li>
                <strong>Developer partners and brokerages</strong> — only as necessary to register a
                deal, process your commission, or fulfil RERA/DLD disclosure requirements.
              </li>
              <li>
                <strong>Service providers</strong> — third-party vendors (e.g., analytics, email, CRM,
                banking) who process data on our behalf under strict confidentiality agreements.
              </li>
              <li>
                <strong>Regulatory authorities</strong> — including RERA, DLD, UAE Central Bank, or
                other competent authorities when required or permitted by law.
              </li>
            </ul>
          </Section>

          <Section title="6. Cookies &amp; Tracking Technologies">
            <p>
              We use cookies, pixels, and similar technologies — including Google Analytics 4 and Meta
              Pixel — to understand how visitors interact with our website and to measure marketing
              effectiveness. You may disable cookies in your browser settings; however, some features may
              not function correctly.
            </p>
            <p>
              Both Google and Meta may transfer data outside the UAE. We have ensured appropriate
              safeguards are in place for such transfers.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal data for as long as necessary to fulfil the purposes outlined in
              this policy or as required by UAE law. Specifically:
            </p>
            <ul>
              <li>Application and onboarding data: 5 years from the date of last activity.</li>
              <li>Financial and commission records: 5 years as required by UAE Commercial Companies Law.</li>
              <li>AML/KYC records: 5 years from the end of the business relationship, per UAE AML Law.</li>
            </ul>
            <p>You may request earlier deletion where legally permissible (see Section 9).</p>
          </Section>

          <Section title="8. International Transfers">
            <p>
              Some of our service providers are located outside the UAE. Where we transfer data
              internationally, we ensure appropriate safeguards are in place consistent with the UAE PDPL,
              including standard contractual clauses or transfers to jurisdictions recognised as providing
              adequate data protection.
            </p>
          </Section>

          <Section title="9. Your Rights">
            <p>Under UAE PDPL, you have the right to:</p>
            <ul>
              <li>Access a copy of your personal data held by us.</li>
              <li>Correct inaccurate or incomplete data.</li>
              <li>Request deletion of your data (&ldquo;right to be forgotten&rdquo;), subject to legal retention obligations.</li>
              <li>Withdraw consent at any time without affecting prior processing.</li>
              <li>Object to or restrict certain types of processing.</li>
              <li>Data portability where technically feasible.</li>
            </ul>
            <p>
              To exercise any of these rights, contact our Privacy Officer at{' '}
              <a href={`mailto:${LEGAL.privacyEmail}`} className="text-gold hover:underline">
                {LEGAL.privacyEmail}
              </a>
              . We will respond within 30 calendar days.
            </p>
          </Section>

          <Section title="10. Security">
            <p>
              We implement industry-standard technical and organisational measures to protect your personal
              data against unauthorised access, alteration, disclosure, or destruction. Access to personal
              data is restricted to authorised personnel on a need-to-know basis. Despite our efforts, no
              transmission over the internet is 100% secure.
            </p>
          </Section>

          <Section title="11. Children&apos;s Privacy">
            <p>
              Our platform is not directed to individuals under 18 years of age. We do not knowingly
              collect personal information from minors. If you believe a minor has provided us with
              personal data, please contact us immediately at{' '}
              <a href={`mailto:${LEGAL.privacyEmail}`} className="text-gold hover:underline">
                {LEGAL.privacyEmail}
              </a>.
            </p>
          </Section>

          <Section title="12. Changes to This Policy">
            <p>
              We may update this Privacy Policy periodically. Material changes will be notified by
              updating the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of our
              platform after changes constitutes acceptance of the revised policy.
            </p>
          </Section>

          <Section title="13. Contact &amp; Complaints">
            <p>
              For privacy-related questions, requests, or complaints, please contact our Privacy Officer:
            </p>
            <address className="not-italic mt-4 text-ink/60 space-y-1.5 text-sm border-l-2 border-gold/40 pl-4">
              <div><strong className="text-ink">{LEGAL.entity}</strong></div>
              <div className="text-ink/40 font-mono text-[11px] uppercase tracking-wider">
                Operating {LEGAL.brand}
              </div>
              <div className="pt-1">{LEGAL.address}</div>
              {/* <div>RERA Broker No.: <strong className="text-ink">{LEGAL.rera}</strong></div> */}
              <div>
                Privacy Officer:{' '}
                <a href={`mailto:${LEGAL.privacyEmail}`} className="text-gold hover:underline">
                  {LEGAL.privacyEmail}
                </a>
              </div>
              {/* <div>
                WhatsApp:{' '}
                <a href={LEGAL.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  {LEGAL.whatsapp}
                </a>
              </div> */}
            </address>
            <p className="mt-4">
              If you are unsatisfied with our response, you have the right to lodge a complaint with the
              UAE Data Office, the competent authority under the UAE PDPL.
            </p>
          </Section>
        </div>

        {/* Hairline divider */}
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
