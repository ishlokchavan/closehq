import type { Metadata } from 'next'
import Image from 'next/image'
import ComingSoonClient from './coming-soon-client'

export const metadata: Metadata = {
  title: 'iClose Academy — Coming Soon',
  description: 'A new kind of real estate education platform. Built by Dubai market insiders.',
}

export default function ComingSoonPage() {
  return (
    <main className="relative h-[100svh] w-full overflow-hidden" style={{ background: '#0a0a0a' }}>
      {/* Background image — darker, blurred edges */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-burj.jpg"
          alt="Dubai"
          fill
          priority
          quality={85}
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        {/* Vignette — dark edges, lighter centre */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 100%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0a)' }} />
      </div>

      {/* Logo */}
      <div className="relative z-10 px-7 pt-8">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-[10px]"
            style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '12px', fontWeight: 600, color: 'white' }}>iC</span>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>
            iClose <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 400 }}>Academy</span>
          </span>
        </div>
      </div>

      <ComingSoonClient />
    </main>
  )
}
