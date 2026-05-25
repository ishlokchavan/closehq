import type { Metadata } from 'next';
import { ICloseLanding } from '@/components/sections/iclose-landing/iclose-landing';

export const metadata: Metadata = {
  title: 'iClose, Learn from the best. Close more deals.',
  description:
    'A proptech education platform for UAE real estate. Learn from the top 0.1% of UAE agents and keep up to 100% of your commission.',
};

export default function HomePage() {
  return <ICloseLanding />;
}
