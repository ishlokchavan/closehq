import type { Metadata } from 'next';
import { PersonaShell } from '@/components/persona/persona-shell';

export const metadata: Metadata = {
  title: 'For Brokers — iClose',
  description:
    'Learn any UAE community top-to-bottom and keep up to 100% of every deal you close. iClose for UAE real estate brokers.',
};

export default function ForBrokersPage() {
  return (
    <PersonaShell
      variant="broker"
      tagLabel="For Brokers"
      heroImage="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150502_22aadfe1-177e-4a65-8768-ea2f66790704.png"
      heroAlt="A broker in a modern Dubai office"
      headline={
        <>
          Close more deals,
          <br />
          <span>keep more of each one.</span>
        </>
      }
      sub={
        <>
          The structured path to becoming the closer everyone calls in your
          community. Built by the agents actually closing in JVC, Marina,
          Downtown, and Business Bay today.
        </>
      }
      pillars={[
        {
          title: 'Learn the market, cold.',
          body: 'Expert-led playbooks, deal breakdowns and area sessions for every UAE community, tower and cluster. From basics to specialisation.',
        },
        {
          title: 'Close under your own name.',
          body: 'Use the iClose tools, listings and back-office to take a deal from inquiry to handover without an agency taking a cut.',
        },
        {
          title: 'Keep up to 100%.',
          body: 'Membership covers the platform. The commission you close stays yours. No 50/50 splits regardless of who sourced the lead.',
        },
      ]}
      outcomes={[
        { stat: '100%', label: 'commission on deals you close' },
        { stat: '80%', label: 'on inquiries you bring in' },
        { stat: 'A→Z', label: 'every community covered' },
      ]}
      testimonial={{
        quote:
          'Three months in, my close rate doubled because I finally knew the buildings better than the buyers walking in. That kind of authority is everything in this market.',
        name: 'M.J.',
        role: 'Independent Broker · JVC',
      }}
    />
  );
}
