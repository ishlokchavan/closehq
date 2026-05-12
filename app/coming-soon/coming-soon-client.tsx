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
      <div style={{
        position: 'relative',
        zIndex: 10,
        height: 'calc(100svh - 72px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 28px 32px',
        textAlign: 'center',
        gap: 0,
      }}>

        {/* Badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '7px',
          borderRadius: '980px', padding: '6px 14px',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          marginBottom: '20px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34d399', display: 'inline-block', animation: 'pulse 2s infinite' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase' }}>
            Coming soon
          </span>
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.75rem, 12vw, 5rem)',
          fontWeight: 600,
          lineHeight: 0.9,
          letterSpacing: '-0.04em',
          color: 'white',
          margin: 0,
          marginBottom: '16px',
        }}>
          Real knowledge.<br />
          <span style={{ color: 'rgba(255,255,255,0.32)' }}>Built by insiders.</span>
        </h1>

        {/* Subhead */}
        <p style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '14px',
          lineHeight: 1.6,
          color: 'rgba(255,255,255,0.42)',
          maxWidth: '260px',
          margin: '0 auto',
          marginBottom: '32px',
        }}>
          Dubai real estate education, from the people who actually close deals.
        </p>

        {/* Success state */}
        {submitted && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            borderRadius: '16px', padding: '14px 20px',
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            maxWidth: '280px',
          }}>
            <span style={{ fontSize: '20px' }}>✓</span>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600, color: 'white', margin: 0 }}>You&apos;re on the list</p>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: 'rgba(255,255,255,0.4)', margin: '2px 0 0' }}>
                {submitted === 'educator' ? "We'll build your playbook together." : "We'll notify you at launch."}
              </p>
            </div>
          </div>
        )}

        {/* CTAs */}
        {!submitted && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%', maxWidth: '240px' }}>
            <button onClick={() => setModal('educator')} style={{
              padding: '13px 24px',
              borderRadius: '980px',
              background: 'white',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1d1d1f',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}>
              Become an Educator
            </button>
            <button onClick={() => setModal('learner')} style={{
              padding: '13px 24px',
              borderRadius: '980px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              fontWeight: 600,
              color: 'white',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
            }}>
              Get Early Access
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          position: 'absolute',
          bottom: '24px',
          left: 0, right: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          flexWrap: 'wrap',
          padding: '0 24px',
        }}>
          {['Area & cluster guides', 'We create the content', 'Expert network'].map((item, i) => (
            <span key={item} style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', color: 'rgba(255,255,255,0.28)', letterSpacing: '0.01em' }}>
              {item}{i < 2 ? <span style={{ marginLeft: '8px', color: 'rgba(255,255,255,0.15)' }}>·</span> : ''}
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
