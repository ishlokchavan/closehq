import type { Metadata } from 'next';
import { SearchHero } from '@/components/portal/search/search-hero';
import { AgentsDirectory } from '@/components/portal/agents-directory';
import { getAgents, getAgencies } from '@/lib/portal/agents';

export const metadata: Metadata = {
  title: 'Find Real Estate Agents & Agencies in Dubai | iClose',
  description:
    'Browse verified Dubai real estate agents and agencies. Filter by area, property type, language and nationality.',
};

export default async function AgentsPage() {
  const [agents, agencies] = await Promise.all([getAgents(), getAgencies()]);

  return (
    <>
      <SearchHero
        active="agents"
        title="Agents"
        subtitle="Find verified agents and agencies across Dubai — filter by area, language and nationality."
      />
      <section className="container-wide pb-20">
        <AgentsDirectory agents={agents} agencies={agencies} />
      </section>
    </>
  );
}
