import { S2Header } from '@/components/s2-header';
import { S2Hero } from '@/components/sections/s2/hero';
import { S2GrowthEngine } from '@/components/sections/s2/growth-engine';
import { S2Marquee } from '@/components/sections/s2/marquee';
import { S2Personas } from '@/components/sections/s2/personas';
import { S2Pricing } from '@/components/sections/s2/pricing';
import { S2Testimonials } from '@/components/sections/s2/testimonials';
import { S2Resources } from '@/components/sections/s2/resources';
import { S2CTABanner } from '@/components/sections/s2/cta-banner';
import { S2FAQ } from '@/components/sections/s2/faq';
import { S2Footer } from '@/components/sections/s2/footer';

export default function HomePage() {
  return (
    <>
      <S2Header />
      <main className="overflow-x-clip bg-cream">
        <S2Hero />
        <S2GrowthEngine />
        <S2Marquee />
        <S2Personas />
        <S2Pricing />
        <S2Testimonials />
        <S2Resources />
        <S2CTABanner />
        <S2FAQ />
      </main>
      <S2Footer />
    </>
  );
}
