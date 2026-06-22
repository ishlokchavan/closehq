import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, Handshake, Zap, BadgePercent } from 'lucide-react';
import { CloseDealForm } from '@/components/portal/close-deal-form';

export const metadata: Metadata = {
  title: 'Close a Deal — Commission-Free on iClose',
  description:
    'Already know the property you want, or an agent ready to close? Do the whole deal through iClose and keep 100% of the commission — our deals desk handles every step.',
};

const POINTS = [
  { icon: Zap, title: 'Skip the back-and-forth', body: 'Already decided? Go straight to closing the property you want.' },
  { icon: BadgePercent, title: 'Keep 100% commission', body: 'Buyers pay no commission; agents keep every dirham of theirs.' },
  { icon: Handshake, title: 'A desk that closes', body: 'Form A, MOU and DLD transfer — our team moves it forward.' },
];

export default function CloseDealPage() {
  return (
    <div className="container-wide py-12 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-1 text-[14px] text-graphite hover:text-ink mb-5">
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> Back home
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-journey-agent/20 text-[#b45309] text-[12px] font-medium px-3 py-1">
            <Handshake className="h-3.5 w-3.5" /> Close a deal
          </span>
          <h1 className="display-md mt-4">Know what you want? Close it on iClose.</h1>
          <p className="subhead mt-3">
            For buyers and sellers who already know the property — and agents who just want to
            close. Bring the deal to iClose and we&apos;ll take it through to transfer,
            commission-free.
          </p>

          <ul className="mt-8 space-y-5">
            {POINTS.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span className="inline-flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-mist">
                  <p.icon className="h-5 w-5 text-ink" />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-ink">{p.title}</p>
                  <p className="text-[14px] text-graphite-dark mt-0.5">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="text-[13px] text-graphite mt-8">
            Still exploring your options?{' '}
            <Link href="/enquire" className="text-accent hover:underline">Post an enquiry instead →</Link>
          </p>
        </div>

        <CloseDealForm />
      </div>
    </div>
  );
}
