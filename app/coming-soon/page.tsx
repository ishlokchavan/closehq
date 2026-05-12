import type { Metadata } from 'next'
import Image from 'next/image'
import ComingSoonClient from './coming-soon-client'

export const metadata: Metadata = {
  title: 'iClose Academy — Coming Soon',
  description: 'A new kind of real estate education platform. Built by Dubai market insiders.',
}

export default function ComingSoonPage() {
  return (
    <main style={{
      position: 'relative',
      height: '100svh',
      width: '100%',
      overflow: 'hidden',
      background: '#111',
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-burj.jpg"
          alt="Dubai skyline"
          fill
          priority
          quality={90}
          style={{ objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.55 }}
          sizes="100vw"
        />
        {/* Gradient overlay — makes text readable without killing the image */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.88) 100%)',
        }} />
      </div>

      {/* Logo bar */}
      <div style={{ position: 'relative', zIndex: 10, padding: '28px 28px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '34px', height: '34px', borderRadius: '10px',
          background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.18)',
          flexShrink: 0,
        }}>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '13px', fontWeight: 600, color: 'white' }}>iC</span>
        </div>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>
          iClose{' '}
          <span style={{ color: 'rgba(255,255,255,0.38)', fontWeight: 400 }}>Academy</span>
        </span>
      </div>

      <ComingSoonClient />
    </main>
  )
}
