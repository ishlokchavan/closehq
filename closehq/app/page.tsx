import type { Metadata } from 'next';
import { BuyerLanding } from '@/components/sections/buyer-landing/buyer-landing';

export const metadata: Metadata = {
  title: 'iClose - Dubai Real Estate No Commission | Buy Property with 100% Cashback',
  description:
    'Buy Dubai real estate with zero commission. iClose offers 100% cashback on all agent fees for UAE property buyers. Off-plan and ready properties across Dubai, Abu Dhabi, and the UAE.',
  keywords: 'Dubai real estate, no commission, real estate agent Dubai, property buying Dubai, zero commission property, cashback real estate, buy property UAE',
  openGraph: {
    title: 'iClose - Dubai Real Estate with Zero Commission',
    description: 'Get 100% cashback on agent commission when buying property in Dubai and UAE',
    type: 'website',
  },
};

export default function HomePage() {
  return <BuyerLanding />;
}
