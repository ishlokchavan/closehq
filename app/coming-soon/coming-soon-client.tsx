'use client'

import { useState } from 'react'
import EducatorForm from './educator-form'
import LearnerForm from './learner-form'

type Modal = 'educator' | 'learner' | null

export default function ComingSoonClient() {
  const [modal, setModal] = useState<Modal>(null)
  const [submitted, setSubmitted] = useState<Modal>(null)

  function handleSuccess(type: Modal) {
    setModal(null)
    setSubmitted(type)
  }

  return (
    <>
      {/* Hero content */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-6 pb-16 text-center sm:px-10">
        
        {/* Eyebrow */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-sans text-[12px] font-medium tracking-wide text-white/80 uppercase">
            Coming soon
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-semibold text-white"
          style={{
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            lineHeight: '0.95',
            letterSpacing: '-0.035em',
            maxWidth: '800px',
          }}>
          Real knowledge.<br />
          <span className="text-white/50">From people</span><br />
          who close deals.
        </h1>

        {/* Subheading */}
        <p className="mt-8 font-sans text-white/60 max-w-md"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', lineHeight: '1.55', letterSpacing: '-0.01em' }}>
          The Dubai real estate education platform. Built by area experts, cluster specialists, 
          and market insiders — for agents ready to go deeper.
        </p>

        {/* Success message */}
        {submitted && (
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm">
            <span className="text-2xl">👌</span>
            <div className="text-left">
              <p className="font-sans text-[14px] font-semibold text-white">You're on the list</p>
              <p className="font-sans text-[13px] text-white/60">
                {submitted === 'educator'
                  ? "We'll reach out to build your playbook together."
                  : "We'll notify you when access opens."}
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        {!submitted && (
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <button
              onClick={() => setModal('educator')}
              className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 font-sans text-[14px] font-semibold text-ink transition-all hover:bg-white/90 active:scale-[0.98]"
            >
              Become an Educator
            </button>
            <button
              onClick={() => setModal('learner')}
              className="rounded-full border border-white/30 bg-white/10 px-8 py-3.5 font-sans text-[14px] font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-[0.98]"
            >
              Get Early Access
            </button>
          </div>
        )}

        {/* Value props */}
        <div className="mt-16 grid grid-cols-1 gap-3 sm:grid-cols-3 max-w-2xl w-full">
          {[
            { icon: '🗺️', label: 'Area & cluster expertise', desc: 'From people who actually work the market' },
            { icon: '📖', label: 'Done-for-you playbooks', desc: 'We create the content — you share the knowledge' },
            { icon: '🤝', label: 'Expert network access', desc: 'Lawyers, finance, POAs, consultants — on demand' },
          ].map((item) => (
            <div key={item.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm">
              <span className="text-2xl">{item.icon}</span>
              <p className="mt-3 font-sans text-[13px] font-semibold text-white leading-tight">{item.label}</p>
              <p className="mt-1 font-sans text-[12px] text-white/50 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Modals */}
      {modal === 'educator' && (
        <EducatorForm onClose={() => setModal(null)} onSuccess={() => handleSuccess('educator')} />
      )}
      {modal === 'learner' && (
        <LearnerForm onClose={() => setModal(null)} onSuccess={() => handleSuccess('learner')} />
      )}
    </>
  )
}
