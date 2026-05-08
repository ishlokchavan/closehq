import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: `Terms and Conditions governing use of the ${siteConfig.name} platform for Dubai real estate agents and connectors.`,
  robots: { index: true, follow: true },
  alternates: { canonical: `${siteConfig.url}/terms` },
};

const LEGAL = {
  entity: 'Edingrad Realestate L.L.C',
  brand: 'CloseHQ',
  rera: '33689',
  tradeLicense: '1140509',
  address: 'Churchill Tower, Office 1906, Business Bay, Dubai, UAE',
  privacyEmail: 'privacy@closehq.ae',
  contactEmail: 'deals@closehq.ae',
  whatsapp: '+971 58 543 0292',
  whatsappLink: 'https://wa.me/971585430292',
  lastUpdated: 'May 7, 2026',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-ink">
      {/* Top bar */}
      <div className="border-b border-ink/10">
        <div className="container-x flex items-center h-16">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/40 hover:text-ink transition-colors"
          >
            ← Back to CloseHQ
          </Link>
        </div>
      </div>

      <main className="container-x py-16 md:py-24 max-w-3xl">
        {/* Header */}
        <div className="mb-12">
          <div className="eyebrow mb-4">Legal</div>
          <h1 className="display-sm text-ink mb-4">Terms &amp; Conditions</h1>
          <p className="text-ink/40 text-sm font-mono">Last updated: {LEGAL.lastUpdated}</p>
        </div>

        <div className="space-y-10">
          <Section title="1. Parties & Acceptance">
            <p>
              These Terms &amp; Conditions (&ldquo;Terms&rdquo;) constitute a legally binding agreement between
              you (&ldquo;Agent&rdquo;, &ldquo;Connector&rdquo;, or &ldquo;User&rdquo;) and{' '}
              <strong>{LEGAL.entity}</strong> (Trade License No. {LEGAL.tradeLicense}), a company
              registered in Dubai, UAE, RERA Broker Registration No.{' '}
              <strong>{LEGAL.rera}</strong>, which owns and operates the{' '}
              <strong>{LEGAL.brand}</strong> platform (&ldquo;the Platform&rdquo;).
            </p>
            <p>
              By accessing{' '}
              <a href={siteConfig.url} className="text-gold hover:underline">{siteConfig.url}</a>{' '}
              or submitting an application, you confirm that you have read, understood, and agreed to
              be bound by these Terms and our{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>.
            </p>
            <p>If you do not agree, please discontinue use of the Platform immediately.</p>
          </Section>

          <Section title="2. Platform Description">
            <p>
              {LEGAL.brand} is a real estate commission and deal-management platform designed for
              freelance property agents and connectors operating in the Dubai real estate market,
              operated by {LEGAL.entity}. The Platform facilitates:
            </p>
            <ul>
              <li>Access to developer projects and off-plan inventory.</li>
              <li>Deal registration, commission tracking, and payout processing.</li>
              <li>Advance-on-SPA commission facilities (subject to eligibility).</li>
              <li>Tools, calculators, and resources for property professionals.</li>
            </ul>
          </Section>

          <Section title="3. Eligibility">
            <p>To use the Platform, you must:</p>
            <ul>
              <li>Be at least 18 years of age.</li>
              <li>
                Be legally authorised to conduct real estate referral or brokerage activity in the
                UAE, under a valid RERA broker card, freelance permit, or equivalent authorisation.
              </li>
              <li>Provide accurate, complete, and current information during registration.</li>
              <li>
                Not be subject to any legal, regulatory, or RERA prohibition from engaging in real
                estate activities in Dubai.
              </li>
            </ul>
            <p>
              {LEGAL.entity} reserves the right to verify credentials, carry out KYC/AML checks, and
              refuse or terminate access to any user who does not meet these requirements.
            </p>
          </Section>

          <Section title="4. Agent & Connector Obligations">
            <p>By registering on the Platform, you agree to:</p>
            <ul>
              <li>
                Act professionally and in full compliance with UAE real estate laws, RERA
                regulations, and DLD guidelines at all times.
              </li>
              <li>
                Disclose any conflicts of interest, dual representation, or financial relationships
                with developers that may affect the integrity of a transaction.
              </li>
              <li>
                Not misrepresent properties, prices, availability, payment plans, or any other
                material fact to clients or leads.
              </li>
              <li>
                Keep all client and lead information strictly confidential and not share it with
                third parties outside of Platform-approved channels.
              </li>
              <li>
                Immediately notify {LEGAL.entity} of any regulatory action, license suspension,
                RERA disciplinary proceeding, or legal matter affecting your ability to practise
                real estate.
              </li>
              <li>
                Cooperate fully with any AML/KYC verification requested by {LEGAL.entity} or
                required by UAE law.
              </li>
            </ul>
          </Section>

          <Section title="5. Commission Structure">
            <p>
              Commission rates, splits, and payout timelines are communicated during onboarding and
              may vary by developer, project, and deal type. The following general terms apply:
            </p>
            <ul>
              <li>
                Commission is earned upon successful booking confirmation and receipt of the
                developer&apos;s commission invoice by {LEGAL.entity}.
              </li>
              <li>
                Advance-on-SPA facilities are subject to separate eligibility criteria, credit
                assessment, and written agreement — they are not guaranteed.
              </li>
              <li>
                Commission entitlement may be forfeited in cases of misconduct, policy violation,
                cancellation of the underlying transaction, or chargeback by the developer.
              </li>
              <li>
                {LEGAL.entity}&apos;s platform fee or administrative charge, where applicable,
                will be disclosed in writing prior to deal registration.
              </li>
              <li>
                All payments are subject to applicable UAE taxes and withholding requirements.
              </li>
            </ul>
          </Section>

          <Section title="6. Deal Registration & Exclusivity">
            <p>
              Deals must be registered through the Platform prior to presenting the client to the
              developer. {LEGAL.entity} operates a first-registration principle — the first agent
              to register a qualifying lead for a specific unit retains the commission entitlement,
              subject to deal completion.
            </p>
            <p>You must not:</p>
            <ul>
              <li>
                Register a deal without a genuine, verifiable client relationship and the
                client&apos;s informed consent to be represented.
              </li>
              <li>
                Circumvent {LEGAL.brand} by directly approaching the developer to register a deal
                that originated through the Platform.
              </li>
              <li>Register duplicate leads for the same client across multiple agents.</li>
            </ul>
          </Section>

          <Section title="7. Prohibited Activities">
            <p>You must not:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose or in violation of UAE law.</li>
              <li>Submit false, misleading, or fraudulent information, applications, or deal registrations.</li>
              <li>
                Reverse-engineer, scrape, copy, or redistribute any content, data, tools, or
                pricing information from the Platform without prior written consent.
              </li>
              <li>
                Engage in money laundering, financing of terrorism, or any activity prohibited
                under UAE Federal Law No. 20 of 2019 (AML Law) or related FATF guidance.
              </li>
              <li>
                Harass, threaten, defame, or abuse {LEGAL.entity} staff, developer partners,
                or other Platform users.
              </li>
            </ul>
          </Section>

          <Section title="8. Intellectual Property">
            <p>
              All content on the Platform — including branding, copy, graphics, tools, commission
              calculators, and data — is the exclusive property of {LEGAL.entity} or its licensors.
              No content may be reproduced, distributed, or used commercially without prior written
              consent from {LEGAL.entity}.
            </p>
            <p>
              You retain ownership of any content you submit (e.g., profile information and deal
              materials), but grant {LEGAL.entity} a non-exclusive, royalty-free licence to use it
              solely for Platform operations.
            </p>
          </Section>

          <Section title="9. Disclaimers & Limitation of Liability">
            <p>
              The Platform and all information on it are provided on an &ldquo;as is&rdquo; and
              &ldquo;as available&rdquo; basis. {LEGAL.entity} does not warrant that:
            </p>
            <ul>
              <li>The Platform will be uninterrupted, error-free, or free of security vulnerabilities.</li>
              <li>
                Property listings, pricing, payment plans, or availability data are current or
                accurate — such data originates with developers and is subject to change without
                notice.
              </li>
            </ul>
            <p>
              To the fullest extent permitted by UAE law, {LEGAL.entity} shall not be liable for
              any indirect, incidental, special, or consequential damages, including lost commissions,
              lost profits, loss of data, or reputational harm arising from your use of the Platform
              or from any developer cancellation.
            </p>
            <p>
              {LEGAL.entity}&apos;s total aggregate liability to you for any claim arising under
              these Terms shall not exceed the total commission paid to you by {LEGAL.entity} in the
              three (3) months preceding the event giving rise to the claim.
            </p>
          </Section>

          <Section title="10. Indemnification">
            <p>
              You agree to fully indemnify and hold harmless {LEGAL.entity},
              their respective officers, directors, employees, and agents from any claims, losses,
              liabilities, fines, or expenses (including reasonable legal fees) arising from:
            </p>
            <ul>
              <li>Your violation of these Terms or any applicable UAE law or RERA regulation.</li>
              <li>Any misrepresentation or fraudulent act made to a client, developer, or regulator.</li>
              <li>Any third-party claim arising from your activities on or through the Platform.</li>
              <li>Your failure to comply with AML/KYC obligations.</li>
            </ul>
          </Section>

          <Section title="11. Termination">
            <p>
              {LEGAL.entity} reserves the right to suspend or permanently terminate your access,
              with or without notice, if you:
            </p>
            <ul>
              <li>Violate any provision of these Terms.</li>
              <li>Engage in fraudulent, unethical, or unlawful conduct.</li>
              <li>Fail to maintain required RERA or regulatory authorisations.</li>
              <li>Fail to cooperate with a KYC/AML review.</li>
            </ul>
            <p>
              You may close your account at any time by contacting{' '}
              <a href={`mailto:${LEGAL.contactEmail}`} className="text-gold hover:underline">
                {LEGAL.contactEmail}
              </a>
              . Termination does not extinguish commission entitlements already confirmed in writing
              by {LEGAL.entity}, nor does it affect any dispute resolution proceedings already
              commenced.
            </p>
          </Section>

          <Section title="12. Governing Law & Dispute Resolution">
            <p>
              These Terms are governed by and construed in accordance with the laws of the Emirate
              of Dubai and, where applicable, the federal laws of the United Arab Emirates.
            </p>
            <p>
              In the event of any dispute, the parties agree to first attempt good-faith negotiation
              for a period of 30 calendar days. If unresolved, the dispute shall be referred to the
              exclusive jurisdiction of the Dubai Courts.
            </p>
            <p>
              Nothing in this clause prevents either party from seeking urgent injunctive or
              declaratory relief from a competent court.
            </p>
          </Section>

          <Section title="13. Amendments">
            <p>
              {LEGAL.entity} reserves the right to update these Terms at any time. Material changes
              will be communicated by updating the &ldquo;Last updated&rdquo; date above and, where
              reasonably practicable, by direct notification via email or WhatsApp. Continued use of
              the Platform after the effective date of any change constitutes acceptance of the
              revised Terms.
            </p>
          </Section>

          <Section title="14. Entire Agreement">
            <p>
              These Terms, together with our{' '}
              <Link href="/privacy" className="text-gold hover:underline">Privacy Policy</Link>{' '}
              and any deal-specific commission agreement entered into in writing, constitute the
              entire agreement between you and {LEGAL.entity} with respect to your use of the
              Platform, and supersede all prior understandings, representations, or agreements.
            </p>
          </Section>

          <Section title="15. Contact">
            <p>For questions about these Terms, please contact:</p>
            <address className="not-italic mt-4 text-ink/60 space-y-1.5 text-sm border-l-2 border-gold/40 pl-4">
              <div><strong className="text-ink">{LEGAL.entity}</strong></div>
              <div className="text-ink/40 font-mono text-[11px] uppercase tracking-wider">
                Operating {LEGAL.brand}
              </div>
              <div className="pt-1">{LEGAL.address}</div>
              <div>RERA Broker No.: <strong className="text-ink">{LEGAL.rera}</strong></div>
              <div>
                Email:{' '}
                <a href={`mailto:${LEGAL.contactEmail}`} className="text-gold hover:underline">
                  {LEGAL.contactEmail}
                </a>
              </div>
              <div>
                WhatsApp:{' '}
                <a href={LEGAL.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
                  {LEGAL.whatsapp}
                </a>
              </div>
            </address>
          </Section>
        </div>

        {/* Hairline divider */}
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
