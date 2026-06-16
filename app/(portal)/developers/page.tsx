import type { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDevelopers, type Developer } from '@/lib/developers-data';

export const metadata: Metadata = {
  title: 'Off-Plan Developer Discounts in Dubai | iClose',
  description:
    'Exclusive off-plan pricing and credits across Dubai developers. Talk to an iClose expert for special pricing on Emaar, Damac, Sobha, Binghatti and more.',
};

export default function DevelopersPage() {
  const developers = getDevelopers();

  return (
    <div className="container-wide py-12">
      {/* Talk-to-an-expert banner */}
      <div className="rounded-apple bg-journey-offplan/15 px-6 py-5 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
        <div className="flex items-start gap-3">
          <span className="flex items-center justify-center h-10 w-10 rounded-full bg-paper shrink-0">
            <MessageCircle className="h-5 w-5 text-ink" />
          </span>
          <div>
            <p className="text-[17px] text-ink font-medium" style={{ letterSpacing: '-0.015em' }}>
              Need off-plan advice? Talk to an expert
            </p>
            <p className="text-[14px] text-graphite-dark mt-0.5">
              Our team negotiates special pricing and credits across Dubai developers.
            </p>
          </div>
        </div>
        <Link href="/developers/enquire" className="shrink-0">
          <Button variant="primary" size="md">Talk to an expert</Button>
        </Link>
      </div>

      <header className="mb-8">
        <h1 className="display-md">Developer discounts</h1>
        <p className="subhead mt-3 max-w-2xl">
          Invest in off-plan and unlock special pricing and credits. Discounts vary by developer and
          project — our team confirms the latest on every enquiry.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {developers.map((dev) => (
          <DeveloperCard key={dev.id} developer={dev} />
        ))}
      </div>
    </div>
  );
}

function DeveloperCard({ developer }: { developer: Developer }) {
  const isGovernment = developer.tier === 'government';

  return (
    <div className="card-surface p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-5 h-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={developer.logo_url}
          alt={`${developer.name} logo`}
          className="h-9 w-9 object-contain"
        />
        <span className="text-[17px] text-ink font-medium" style={{ letterSpacing: '-0.015em' }}>
          {developer.name}
        </span>
      </div>

      {/* Government developers hide the discount and show "Request details". */}
      {isGovernment || developer.discount_pct == null ? (
        <div className="rounded-xl bg-mist px-4 py-3 mb-5">
          <span className="text-[14px] text-graphite-dark">Pricing on request</span>
        </div>
      ) : (
        <div className="rounded-xl bg-journey-offplan/15 px-4 py-3 mb-5">
          <span className="text-[13px] text-graphite-dark">Discounts up to </span>
          <span className="text-[20px] text-ink font-semibold">{developer.discount_pct}%</span>
        </div>
      )}

      <Link href={developer.cta_target} className="mt-auto">
        <Button variant="outline" size="md" className="w-full justify-between">
          {isGovernment ? 'Request details' : 'Get this discount'}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
