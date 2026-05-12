'use client'

import { useState } from 'react'
import EducatorForm from './educator-form'
import LearnerForm from './learner-form'

type Modal = 'educator' | 'learner' | null

export default function ComingSoonClient() {
  const [modal, setModal] = useState<Modal>(null)
  const [submitted, setSubmitted] = useState<Modal>(null)

  return (
    <>
      <div className="relative z-10 flex h-[calc(100svh-72px)] flex-col items-center justify-center px-7 pb-8 text-center">

        {/* Badge */}
        <div className="mb-7 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)', backdropFilter: 'blur(10px)' }}>
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
            Coming soon
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.6rem, 11vw, 5.5rem)',
          fontWeight: 600,
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          color: 'white',
          maxWidth: '640px',
        }}>
          Real knowledge.<br />
          <span style={{ color: 'rgba(255,255,255,0.35)' }}>Built by insiders.</span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
          lineHeight: 1.65,
          color: 'rgba(255,255,255,0.45)',
          maxWidth: '300px',
          marginTop: '20px',
        }}>
          Dubai real estate education. From area experts and market insiders who actually close deals.
        </p>

        {/* Success */}
        {submitted && (
          <div className="mt-10 flex items-center gap-3 rounded-2xl px-5 py-3.5"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}>
            <span style={{ fontSize: '18px' }}>✓</span>
            <div className="text-left">
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'white' }}>You&apos;re on the list</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(255,255,255,0.45)' }}>
                {submitted === 'educator' ? "We'll be in touch to build your playbook." : "We'll notify you when access opens."}
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        {!submitted && (
          <div className="mt-9 flex flex-col items-center gap-3 w-full max-w-[260px]">
            <button
              onClick={() => setModal('educator')}
              className="w-full rounded-full py-3.5 transition-all active:scale-[0.97]"
              style={{
                background: 'white',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0a0a0a',
                letterSpacing: '-0.01em',
              }}>
              Become an Educator
            </button>
            <button
              onClick={() => setModal('learner')}
              className="w-full rounded-full py-3.5 transition-all active:scale-[0.97]"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '-0.01em',
              }}>
              Get Early Access
            </button>
          </div>
        )}

        {/* Footer strip */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-6 px-6">
          {['Area & cluster guides', 'We create the content', 'Expert network'].map((item, i) => (
            <span key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(255,255,255,0.3)', letterSpacing: '0.01em' }}>
              {item}
              {i < 2 && <span style={{ margin: '0 0 0 6px', color: 'rgba(255,255,255,0.15)' }}>·</span>}
            </span>
          ))}
        </div>
      </div>

      {modal === 'educator' && (
        <EducatorForm onClose={() => setModal(null)} onSuccess={() => { setModal(null); setSubmitted('educator') }} />
      )}
      {modal === 'learner' && (
        <LearnerForm onClose={() => setModal(null)} onSuccess={() => { setModal(null); setSubmitted('learner') }} />
      )}
    </>
  )
}
