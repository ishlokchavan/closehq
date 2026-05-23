import type { Metadata } from 'next';
import { PersonaShell } from '@/components/persona/persona-shell';

export const metadata: Metadata = {
  title: 'For Collaborators — iClose',
  description:
    'Bring the client, earn the commission. iClose for lawyers, advisors, executives and anyone with a UAE property referral.',
};

export default function ForCollaboratorsPage() {
  return (
    <PersonaShell
      variant="collaborator"
      tagLabel="For Collaborators"
      heroImage="https://d8j0ntlcm91z4.cloudfront.net/user_373qi3JTSvYmXjqMPJT9idOjFt7/hf_20260523_150508_8d5fb7fc-e484-4ba4-9d30-49813a74f7f8.png"
      heroAlt="A private-client advisor reviewing a UAE property requirement with a client"
      headline={
        <>
          Bring the client.
          <br />
          <span>We bring the expert.</span>
        </>
      }
      sub={
        <>
          For lawyers, wealth advisors, family offices, executives and any
          professional whose clients ask about UAE property. Submit one inquiry
          — we handle the rest.
        </>
      }
      pillars={[
        {
          title: 'Submit a single inquiry.',
          body: 'A short brief — area, budget, asset type, timeline. No listings to manage, no follow-ups to chase.',
        },
        {
          title: 'Matched to a vetted specialist.',
          body: 'We connect your client with the UAE expert who actually knows the building. Verified, in-market, accountable.',
        },
        {
          title: 'Earn when it closes.',
          body: 'You keep up to 80% of the commission. No license, no listings, no transactional admin. Just a paid referral.',
        },
      ]}
      outcomes={[
        { stat: '80%', label: 'commission on each closed deal' },
        { stat: '24h', label: 'typical time to first match' },
        { stat: '0', label: 'listings to manage' },
      ]}
      testimonial={{
        quote:
          'We needed to place a UHNW client into an offplan tower with very specific risk parameters. iClose gave us the matched specialist and the closing playbook in the same afternoon.',
        name: 'A.S.',
        role: 'Family Office Partner',
      }}
    />
  );
}
