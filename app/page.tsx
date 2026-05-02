import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { Trust } from '@/components/sections/trust';
import { Value } from '@/components/sections/value';
import { How } from '@/components/sections/how';
import { Perks } from '@/components/sections/perks';
import { Referral } from '@/components/sections/referral';
import { Comparison } from '@/components/sections/comparison';
import { FinalCTA } from '@/components/sections/final-cta';
import { Footer } from '@/components/sections/footer';
import { WhatsAppFloat } from '@/components/ui/whatsapp-float';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <Trust />
        <Value />
        <How />
        <Perks />
        <Referral />
        <Comparison />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
