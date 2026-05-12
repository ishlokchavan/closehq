import type { Metadata } from 'next'
import Image from 'next/image'
import ComingSoonClient from './coming-soon-client'

export const metadata: Metadata = {
  title: 'iClose Academy — Coming Soon',
  description:
    'A new kind of real estate education platform. Built by Dubai market insiders, for agents ready to scale.',
  openGraph: {
    title: 'iClose Academy — Coming Soon',
    description: 'Built by Dubai market insiders, for agents ready to scale.',
    images: ['/images/hero-burj.jpg'],
  },
}

export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink">
      {/* Full-bleed background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-night.jpg"
          alt="Dubai skyline at night"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Dark gradient overlay — heavier at bottom so text pops */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/50 to-ink/90" />
        {/* Subtle noise texture for depth */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 flex items-center justify-between px-6 py-8 sm:px-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <span className="font-display text-[13px] font-semibold text-white">iC</span>
          </div>
          <span className="font-display text-[16px] font-semibold tracking-tight text-white">
            iClose <span className="text-white/50 font-normal">Academy</span>
          </span>
        </div>
      </div>

      {/* Main content */}
      <ComingSoonClient />
    </main>
  )
}
