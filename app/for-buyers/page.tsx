import type { Metadata } from 'next';
import {
  PersonaChrome,
  PersonaHero,
  PersonaFeatures,
  PersonaSteps,
  PersonaMath,
  PersonaFacts,
  PersonaQuote,
  PersonaFaq,
  PersonaIntro,
  PersonaCta,
} from '@/components/persona/persona-sections';

export const metadata: Metadata = {
  title: 'For Buyers — iClose',
  description:
    'Buy smarter. Pay less. Own more. iClose gives buyers deep UAE market intelligence and up to 2% commission savings on every purchase.',
};

export default function ForBuyersPage() {
  return (
    <PersonaChrome>
      <PersonaHero
        variant="buyer"
        tagLabel="For Buyers"
        heroImage="/images/hero-luxury.jpg"
        heroAlt="A premium UAE residence interior — your potential home"
        headline={
          <>
            Buy smarter.
            <br />
            <span>Earn back up to 80%.</span>
          </>
        }
        sub={
          <>
            UAE real estate is one of the world&apos;s best investments — if
            you know what you&apos;re doing. iClose gives you the deep market
            intelligence to buy with confidence, and earns you back up to 80%
            of the agent commission on every deal.
          </>
        }
        primaryCta={{ label: 'Get started free', href: '/#waitlist' }}
        chips={[
          'Deep insights on every project before you commit',
          'Earn back up to 80% of the agent commission',
          'Zero guesswork — data-backed decisions',
        ]}
      />

      <PersonaIntro
        eyebrow="The real problem"
        heading={<>Buying in UAE without the right intel is expensive.</>}
        body={
          <>
            Most buyers walk into one of the world&apos;s most competitive
            property markets with nothing but a developer&apos;s sales pitch.
            That&apos;s not a strategy.
          </>
        }
        items={[
          {
            tag: 'Bias',
            title: "Agents prioritise their commission.",
            body: "Not the project that's actually right for your goals or budget.",
          },
          {
            tag: 'Overwhelm',
            title: 'Hundreds of launches a year.',
            body: 'No easy way to compare quality, location ROI, developer track record, or real payment terms.',
          },
          {
            tag: 'Opacity',
            title: 'Commission baked into every deal.',
            body: "Most buyers never see the breakdown or know they could save on it.",
          },
          {
            tag: 'Risk',
            title: 'First-time + international buyers are exposed.',
            body: 'Navigating RERA rules, DLD fees, and developer credibility without a guide is a recipe for losses.',
          },
        ]}
      />

      <PersonaFeatures
        eyebrow="What iClose gives you"
        heading={<>Everything you need to make the right call.</>}
        body={
          <>
            We built the platform we wish existed when buyers first entered
            this market — unbiased, comprehensive, and built around your
            outcome.
          </>
        }
        items={[
          {
            title: 'Project deep-dives.',
            body: 'Every active project in the UAE. Developer background, construction progress, community context, ROI data.',
          },
          {
            title: 'Floor plans & specs.',
            body: "Actual unit layouts, sizes, and finishing specs — not just renders. Know what you're buying before you visit.",
          },
          {
            title: 'Payment plan breakdowns.',
            body: 'Side-by-side comparisons so you know which deal actually fits your cash flow.',
          },
          {
            title: 'Community intelligence.',
            body: 'Lifestyle, infrastructure, rental yields, and capital appreciation trends — by area, not just by tower.',
          },
          {
            title: 'Market reports.',
            body: 'Understand macro trends, supply pipelines, and where prices are heading.',
          },
          {
            title: 'Verified specialist access.',
            body: "When you're ready to move, our closers are certified and briefed — no cold handoffs.",
          },
        ]}
      />

      <PersonaMath
        eyebrow="The savings"
        heading={<>Earn back up to 80% of the commission.</>}
        body={
          <>
            Because you&apos;re coming in educated and deal-ready, we pass
            most of the commission back to you. Money most buyers never knew
            they could earn back.
          </>
        }
        rows={[
          { label: 'Property value', value: 'AED 2,000,000' },
          { label: 'Standard agent commission (2%)', value: 'AED 40,000' },
          { label: 'Your savings (up to 80%)', value: 'Up to AED 32,000', hi: true },
          { label: 'Listings accessible', value: 'Full UAE market' },
        ]}
        footnote="Your savings are confirmed upfront — no surprises at signing."
      />

      <PersonaSteps
        eyebrow="How it works"
        heading={<>From curious to confident closer.</>}
        body={<>Four steps. No pressure. Move at your own pace.</>}
        steps={[
          {
            title: 'Access the platform.',
            body: "Sign up free. Browse the full UAE project library — developments, floor plans, pricing, community breakdowns, and market data. No agent contact required until you want it.",
          },
          {
            title: 'Get educated on your shortlist.',
            body: "Narrow down using iClose's comparison tools. Understand ROI trajectories, developer credibility, and payment plans before you speak to a salesperson.",
          },
          {
            title: 'Connect with a certified closer.',
            body: "When you're ready to view or make an offer, we connect you with a specialist who knows your shortlist. You walk in informed — so the conversation is different.",
          },
          {
            title: 'Close with savings.',
            body: "Because you're closing through iClose, you qualify for discounted commission terms. Your saving is confirmed upfront — no surprises at signing.",
          },
        ]}
      />

      <PersonaFacts
        heading={<>Why this market. Why now.</>}
        items={[
          { stat: '8–12%', label: 'Average net rental yield — among the highest globally' },
          { stat: '0%', label: 'Capital gains and income tax on UAE property earnings' },
          { stat: '170+', label: 'Nationalities actively buying — the most international market on earth' },
          { stat: 'AED 2M', label: 'Purchase threshold that qualifies you for a UAE Golden Visa' },
        ]}
      />

      <PersonaQuote
        quote="I spent three months comparing projects on my own and still felt unsure. iClose's platform had everything in one place. I made a decision in two weeks — and saved AED 35,000 on commission."
        name="Buyer"
        role="2BR apartment · Dubai Hills Estate"
      />

      <PersonaFaq
        heading={<>Frequently asked questions.</>}
        items={[
          {
            q: 'Is iClose free to use as a buyer?',
            a: "Yes. Accessing the platform, browsing projects, and using our market intelligence tools is completely free. You only engage our closer service when you're ready to move — and that's when the commission saving kicks in.",
          },
          {
            q: 'Do I need to be a UAE resident to buy?',
            a: 'No. Non-residents and international buyers can purchase freehold property in designated areas. A purchase above AED 2M can also qualify you for a UAE Golden Visa. iClose walks you through the full process.',
          },
          {
            q: 'How does the commission saving work?',
            a: 'When you close a deal through the iClose platform, we share a portion of the commission we earn with you. The exact saving depends on the developer, project type, and deal terms — confirmed transparently before you sign anything.',
          },
          {
            q: 'What if I already have a project in mind?',
            a: "Even better. Look it up on the platform, get the full intelligence report, then connect with a closer who specialises in that development. You'll know more than most buyers who walk in cold.",
          },
          {
            q: 'Is iClose for off-plan or secondary market too?',
            a: 'Both. Our primary focus is off-plan given the volume and opportunity in the UAE, but our closers work across off-plan and secondary market transactions.',
          },
        ]}
      />

      <PersonaCta
        heading={<>Your next property starts with the right intel.</>}
        body={
          <>
            Join thousands of buyers using iClose to research, decide, and buy
            smarter in the UAE market. No credit card. No commitment.
          </>
        }
        cta={{ label: 'Get started — it&apos;s free', href: '/#waitlist' }}
      />
    </PersonaChrome>
  );
}
