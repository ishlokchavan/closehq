import { S2Header } from '@/components/s2-header';
import { S2Hero } from '@/components/sections/s2/hero';
import { S2Stats } from '@/components/sections/s2/stats';
import { S2Features } from '@/components/sections/s2/features';
import { S2How } from '@/components/sections/s2/how';
import { S2Testimonials } from '@/components/sections/s2/testimonials';
import { S2Pricing } from '@/components/sections/s2/pricing';
import { S2FinalCTA } from '@/components/sections/s2/final-cta';
import { S2FAQ } from '@/components/sections/s2/faq';
import { S2Footer } from '@/components/sections/s2/footer';

export default function HomePage() {
  return (
    <>
      <S2Header />
      <main className="overflow-x-clip bg-black">
        <S2Hero />
        <S2Stats />
        <S2Features />
        <S2How />
        <S2Testimonials />
        <S2Pricing />
        <S2FinalCTA />
        <S2FAQ />
      </main>
      <S2Footer />
    </>
  );
}
