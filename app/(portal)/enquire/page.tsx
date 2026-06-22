import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronLeft, MessageSquare, Sparkles, ShieldCheck } from 'lucide-react';
import { EnquiryForm } from '@/components/portal/enquiry-form';

export const metadata: Metadata = {
  title: 'Post an Enquiry — An iClose Executive Will Handle It',
  description:
    'Not sure exactly what you want yet? Post an enquiry and one of our executives will get in touch to understand your needs and take care of everything — commission-free.',
};

const POINTS = [
  { icon: Sparkles, title: 'Tell us roughly what you want', body: 'Even a vague idea is enough — area, budget or timeline.' },
  { icon: MessageSquare, title: 'An executive gets in touch', body: 'A real person reaches out to understand your needs.' },
  { icon: ShieldCheck, title: 'We handle the rest', body: 'Shortlists, viewings and closing — with zero commission.' },
];

export default function EnquirePage() {
  return (
    <div className="container-wide py-12 max-w-5xl">
      <Link href="/" className="inline-flex items-center gap-1 text-[14px] text-graphite hover:text-ink mb-5">
        <ChevronLeft className="h-4 w-4 rtl:rotate-180" /> Back home
      </Link>

      <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-journey-buyer/15 text-[#b51e9e] text-[12px] font-medium px-3 py-1">
            <MessageSquare className="h-3.5 w-3.5" /> Post an enquiry
          </span>
          <h1 className="display-md mt-4">Just exploring? Let us do the legwork.</h1>
          <p className="subhead mt-3">
            If you have a vague idea of what you&apos;re after, post an enquiry and one of our
            executives will get in touch to understand exactly what you need — then take care of
            everything for you.
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
            Already know the exact property?{' '}
            <Link href="/close-deal" className="text-accent hover:underline">Close a deal directly →</Link>
          </p>
        </div>

        <EnquiryForm />
      </div>
    </div>
  );
}
