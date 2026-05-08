import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { PrivacyStrip } from '@/components/sections/privacy-strip';
import { Value } from '@/components/sections/value';
import { Plans } from '@/components/sections/plans';
import { AgentTypes } from '@/components/sections/agent-types';
import { Calculator } from '@/components/sections/calculator';
import { Gallery } from '@/components/sections/gallery';
import { How } from '@/components/sections/how';
import { Training } from '@/components/sections/training';
import { ToolsShowcase } from '@/components/sections/tools-showcase';
import { Perks } from '@/components/sections/perks';
import { Testimonials } from '@/components/sections/testimonials';
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
        <PrivacyStrip />
        <Value />
        <Plans />
        <AgentTypes />
        <Calculator />
        <Gallery />
        <How />
        <Training />
        <ToolsShowcase />
        <Perks />
        <Testimonials />
        <Referral />
        <Comparison />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
