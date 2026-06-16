import type { Metadata } from 'next';
import { ResultsFilterBar } from '@/components/portal/search/results-filter-bar';
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
      <ResultsFilterBar active="agents" />
      <section className="container-wide py-6">
        <AgentsDirectory agents={agents} agencies={agencies} />
      </section>
    </>
  );
}
