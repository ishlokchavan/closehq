import type { Metadata } from 'next';
import { EarlyAccess } from '@/components/sections/early-access/early-access';

export const metadata: Metadata = {
  title: 'iClose Early Access | Buy or Sell Dubai Property Without the Agent Fees',
  description:
    'Get early access to iClose. Buyers skip agent fees and close ready or off-plan Dubai deals directly. Agents keep 100% of their commission on personal leads.',
  keywords:
    'iClose, Dubai real estate, no commission, early access, off-plan, secondary market, keep 100% commission, agent-free property',
  openGraph: {
    title: 'iClose Early Access',
    description:
      'Buy or sell Dubai property without the agent fees. Buyers skip fees; agents keep 100% of their commission.',
    type: 'website',
  },
};

export default function HomePage() {
  return <EarlyAccess />;
}
