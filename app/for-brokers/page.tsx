import type { Metadata } from 'next';
import {
  PersonaChrome,
  PersonaHero,
  PersonaIntro,
  PersonaSteps,
  PersonaMath,
  PersonaCompare,
  PersonaAudience,
  PersonaCta,
} from '@/components/persona/persona-sections';

export const metadata: Metadata = {
  title: 'For Closers — iClose',
  description:
    'The UAE market is worth trillions. iClose gives you everything to become the closer who gets the biggest slice — full project knowledge, elite resources, and the highest commission splits in the country.',
};

export default function ForBrokersPage() {
  return (
    <PersonaChrome>
      <PersonaHero
        variant="broker"
        tagLabel="For Closers"
        heroImage="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150502_22aadfe1-177e-4a65-8768-ea2f66790704.png"
        heroAlt="A broker in a modern Dubai office"
        headline={
          <>
            Learn it. Know it.
            <br />
            <span>Close it.</span>
          </>
        }
        sub={
          <>
            The UAE market is worth trillions. iClose gives you everything you
            need to become the closer who gets the biggest slice — full project
            knowledge, elite resources, and the highest commission splits in
            the country.
          </>
        }
        primaryCta={{ label: 'Start closing', href: '/#waitlist' }}
        secondaryCta={{ label: 'See how it works', href: '#how' }}
        chips={['No experience required — only ambition.']}
      />

      <PersonaIntro
        eyebrow="What iClose is"
        heading={<>Not another brokerage.</>}
        body={
          <>
            iClose is a closer&apos;s platform. We don&apos;t manage agents.
            We equip closers — with the market intelligence, sales tools, and
            deal structure to win every room they walk into.
          </>
        }
        items={[
          {
            tag: 'Education',
            title: 'Full market education.',
            body: 'Every developer. Every community. Every project — from launch specs to payment plan nuances.',
          },
          {
            tag: 'Resources',
            title: 'Sales-ready resources.',
            body: 'Brochures, floor plans, presentations, and pricing. Updated, organised, always ready to send.',
          },
          {
            tag: 'Deal flow',
            title: 'Close-ready structure.',
            body: 'We connect you to the right deals with the commission structure top performers deserve.',
          },
          {
            tag: 'Reputation',
            title: 'Performance track record.',
            body: 'Build your verified close history. Let your numbers do the talking.',
          },
        ]}
      />

      <div id="how">
        <PersonaSteps
          eyebrow="The path"
          heading={<>From zero to top 1%.</>}
          body={
            <>
              You don&apos;t need a real estate background. You need hunger,
              discipline, and iClose.
            </>
          }
          steps={[
            {
              title: 'Learn the market.',
              body: "Get full access to iClose's project library — developers, communities, specs, and investment angles. Study at your own pace. We cover everything the UAE's top closers know.",
            },
            {
              title: 'Master the pitch.',
              body: "Practice deal scenarios, objection handling, and buyer psychology using iClose's structured training modules. Real situations, not theory.",
            },
            {
              title: 'Get your resources.',
              body: 'Pull any brochure, floor plan, or presentation instantly from your iClose dashboard. Walk into every client meeting over-prepared.',
            },
            {
              title: 'Close at elite splits.',
              body: 'Access deals with the highest commission splits in the country. No cap. Performance determines your earning ceiling — and we set it high.',
            },
          ]}
        />
      </div>

      <PersonaIntro
        eyebrow="Your resource vault"
        heading={<>Everything in one place.</>}
        body={
          <>
            Stop chasing developers for materials. iClose maintains a living
            library you can access anywhere, anytime.
          </>
        }
        items={[
          {
            tag: 'Brochures',
            title: 'Project brochures & decks.',
            body: 'Latest sales materials, ready to send, never out of date.',
          },
          {
            tag: 'Plans',
            title: 'Floor plans & specs.',
            body: 'Actual unit layouts, finishing specs, and configurations — for every active project.',
          },
          {
            tag: 'Payment',
            title: 'Payment plan breakdowns.',
            body: 'Side-by-side comparisons so you can match the deal to the buyer.',
          },
          {
            tag: 'Intel',
            title: 'Community + market reports.',
            body: 'Lifestyle, infrastructure, rental yields, capital appreciation — by area, not just by tower.',
          },
        ]}
      />

      <PersonaMath
        eyebrow="The earning reality"
        heading={<>What top closers make.</>}
        body={
          <>
            This isn&apos;t a salaried role. It&apos;s a performance game — and
            iClose gives you the best possible odds.
          </>
        }
        rows={[
          { label: 'Average UAE off-plan deal', value: 'AED 1.8M' },
          { label: 'Commission on deal', value: '5%' },
          { label: 'Your take on one close', value: 'Up to AED 90,000', hi: true },
          { label: 'Top 10% closers earn annually', value: 'AED 1M+', hi: true },
        ]}
        footnote="Splits confirmed per deal type at onboarding. No ceiling on performance."
      />

      <PersonaCompare
        eyebrow="The split that matters"
        heading={<>Traditional brokerage vs iClose.</>}
        body={
          <>
            Same deal, same 5% commission. The difference is how much of it
            ends up in your pocket.
          </>
        }
        left={{
          title: 'Traditional brokerage',
          rows: [
            { label: 'Deal value', value: 'AED 1.8M' },
            { label: 'Commission (5%)', value: 'AED 90,000' },
            { label: 'Split with agency', value: '50 / 50' },
          ],
          takeLabel: 'You keep',
          takeValue: 'AED 45,000',
        }}
        right={{
          title: 'iClose',
          rows: [
            { label: 'Deal value', value: 'AED 1.8M' },
            { label: 'Commission (5%)', value: 'AED 90,000' },
            { label: 'Your split', value: 'Up to 100%' },
          ],
          takeLabel: 'You keep',
          takeValue: 'AED 90,000',
        }}
        footnote="Membership covers the platform. The commission stays yours."
      />

      <PersonaAudience
        heading={<>Who this is for.</>}
        items={[
          {
            title: 'Complete beginners.',
            body: "You want to break into UAE property with a real foundation — not just a LinkedIn title.",
          },
          {
            title: 'Agents stuck on low splits.',
            body: "You're already in the market and tired of weak training and zero support from your current setup.",
          },
          {
            title: 'Sales pros from other industries.',
            body: 'You know how to close people — and want to apply that in a higher-value market.',
          },
          {
            title: 'Ambitious operators.',
            body: 'You understand that in this market, knowledge is leverage — and you&apos;re ready to build both.',
          },
        ]}
      />

      <PersonaCta
        heading={<>The market won&apos;t wait.</>}
        body={
          <>
            Join iClose, get access to the full platform, and start building
            the career that pays what you&apos;re worth. Applications reviewed
            within 48 hours.
          </>
        }
        cta={{ label: 'Apply to join iClose', href: '/#waitlist' }}
      />
    </PersonaChrome>
  );
}
