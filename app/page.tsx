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
import { supabase, type MembershipPlan } from '@/lib/supabase';

async function getPlans(): Promise<MembershipPlan[]> {
  const { data, error } = await supabase
    .from('membership_plans')
    .select('*')
    .eq('is_active', true)
    .order('order');

  if (error) {
    console.error('Failed to fetch plans:', error.message);
    return [];
  }
  return data ?? [];
}

export default async function HomePage() {
  const plans = await getPlans();

  return (
    <>
      <Header />
      <main className="overflow-x-clip">
        <Hero />
        <ForWho />
        <How />
        <DealCTA />
        <Transformation />
        <Plans data={plans} />
        <Testimonials />
        <FinalCTA />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
