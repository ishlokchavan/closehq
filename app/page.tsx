import { Header } from '@/components/header';
import { Hero } from '@/components/sections/hero';
import { ForWho } from '@/components/sections/for-who';
import { How } from '@/components/sections/how';
import { DealCTA } from '@/components/sections/deal-cta';
import { Transformation } from '@/components/sections/transformation';
import { Plans } from '@/components/sections/plans';
import { Testimonials } from '@/components/sections/testimonials';
import { FinalCTA } from '@/components/sections/final-cta';
import { FAQ } from '@/components/sections/faq';
import { Footer } from '@/components/sections/footer';

function Snap({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Snap><Hero /></Snap>
        <Snap><ForWho /></Snap>
        <Snap><How /></Snap>
        <Snap><DealCTA /></Snap>
        <Snap><Transformation /></Snap>
        <Snap><Plans /></Snap>
        <Snap><Testimonials /></Snap>
        <Snap><FinalCTA /></Snap>
        <Snap><FAQ /></Snap>
        <Snap><Footer /></Snap>
      </main>
    </>
  );
}
