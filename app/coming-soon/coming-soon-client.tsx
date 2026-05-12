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
      <div className="relative z-10 flex min-h-[calc(100svh-80px)] flex-col items-center justify-center px-6 pb-12 text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-1.5 backdrop-blur-sm ring-1 ring-white/20">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">Coming soon</span>
        </div>

        {/* Headline */}
        <h1 className="text-white font-semibold"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 9vw, 6.5rem)',
            lineHeight: '0.93',
            letterSpacing: '-0.04em',
            maxWidth: '780px',
          }}>
          Real knowledge.<br />
          <em style={{ fontStyle: 'normal', color: 'rgba(255,255,255,0.4)' }}>Built by insiders.</em>
        </h1>

        {/* Sub */}
        <p className="mt-7 text-white/55 max-w-[360px]"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
            lineHeight: '1.6',
            letterSpacing: '-0.01em',
          }}>
          The Dubai real estate education platform — area experts, cluster specialists, 
          and market insiders sharing what actually works.
        </p>

        {/* Success */}
        {submitted && (
          <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/10 px-6 py-4 ring-1 ring-white/20 backdrop-blur-sm">
            <span className="text-xl">✓</span>
            <div className="text-left">
              <p className="text-[14px] font-semibold text-white" style={{ fontFamily: 'var(--font-sans)' }}>You&apos;re on the list</p>
              <p className="text-[13px] text-white/50" style={{ fontFamily: 'var(--font-sans)' }}>
                {submitted === 'educator' ? "We'll reach out to build your playbook." : "We'll notify you when access opens."}
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        {!submitted && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button onClick={() => setModal('educator')}
              className="rounded-full bg-white px-8 py-3 text-[14px] font-semibold text-black transition-all hover:bg-white/90 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-sans)' }}>
              Become an Educator
            </button>
            <button onClick={() => setModal('learner')}
              className="rounded-full bg-white/12 px-8 py-3 text-[14px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98]"
              style={{ fontFamily: 'var(--font-sans)' }}>
              Get Early Access
            </button>
          </div>
        )}

        {/* Minimal value strip */}
        {!submitted && (
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              { label: 'Area & building guides', icon: '🗺️' },
              { label: 'We create the content', icon: '✍️' },
              { label: 'Expert network access', icon: '🤝' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-[13px] text-white/45" style={{ fontFamily: 'var(--font-sans)' }}>{item.label}</span>
              </div>
            ))}
          </div>
        )}
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
