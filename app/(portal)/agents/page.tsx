import type { Metadata } from 'next';
import { SearchHero } from '@/components/portal/search/search-hero';
import { AgentsDirectory } from '@/components/portal/agents-directory';

export const metadata: Metadata = {
  title: 'Find Real Estate Agents & Agencies in Dubai | iClose',
  description:
    'Browse verified Dubai real estate agents and agencies. Filter by area, property type, language and nationality.',
};

export default function AgentsPage() {
  return (
    <>
      <SearchHero
        active="agents"
        title="Agents"
        subtitle="Find verified agents and agencies across Dubai — filter by area, language and nationality."
      />
      <section className="container-wide pb-20">
        <AgentsDirectory />
      </section>
    </>
  );
}
