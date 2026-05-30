import type { Metadata } from 'next';
import { BuyerLanding } from '@/components/sections/buyer-landing/buyer-landing';

export const metadata: Metadata = {
  title: 'iClose, 100% cashback for UAE property buyers',
  description:
    'iClose gives UAE property buyers the market intelligence to buy with confidence and rebates 100% of the agent commission back to you. Off-plan or ready, every dirham in your pocket.',
};

export default function HomePage() {
  return <BuyerLanding />;
}
