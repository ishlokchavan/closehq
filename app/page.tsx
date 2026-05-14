import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { ForWho } from '@/components/sections/for-who';
import { How } from '@/components/sections/how';
import { Transformation } from '@/components/sections/transformation';
import { Plans } from '@/components/sections/plans';
import { Testimonials } from '@/components/sections/testimonials';
import { FinalCTA } from '@/components/sections/final-cta';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/sections/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <ForWho />
        <How />
        <Transformation />
        <Plans />
        <Testimonials />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
