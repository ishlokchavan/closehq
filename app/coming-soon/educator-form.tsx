'use client'

import { useState, useTransition } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { submitEducatorInterest } from './actions'

const EXPERTISE = [
  'Area Expert', 'Building Expert', 'Community Expert',
  'Cluster Expert', 'Off-Plan', 'Secondary Market',
]

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#f2f2f2',
  border: 'none',
  borderRadius: '12px',
  padding: '12px 16px',
  fontFamily: 'var(--font-sans)',
  fontSize: '14px',
  color: '#1d1d1f',
  outline: 'none',
}

export default function EducatorForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [selected, setSelected] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function toggle(val: string) {
    setSelected(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('expertise', selected.join(','))
    startTransition(async () => {
      const result = await submitEducatorInterest(fd)
      if (result.ok) onSuccess()
      else setError(result.error ?? 'Something went wrong')
    })
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      {/* Backdrop */}
      <div onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

      {/* Card */}
      <div style={{
        position: 'relative', width: '100%', maxWidth: '400px',
        background: 'white', borderRadius: '28px',
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        padding: '28px',
        display: 'flex', flexDirection: 'column', gap: '20px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#86868b', marginBottom: '4px' }}>
              For educators
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
              Share your expertise.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#86868b', marginTop: '4px', lineHeight: 1.4 }}>
              We create the content. Zero cost to you.
            </p>
          </div>
          <button onClick={onClose} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '28px', height: '28px', borderRadius: '50%',
            background: '#f2f2f2', border: 'none', cursor: 'pointer',
            color: '#86868b', flexShrink: 0, marginLeft: '12px',
          }}>
            <X size={14} />
          </button>
        </div>

        {/* Expertise chips */}
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#86868b', marginBottom: '10px' }}>
            Your expertise
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {EXPERTISE.map(item => (
              <button key={item} type="button" onClick={() => toggle(item)} style={{
                padding: '7px 14px', borderRadius: '980px',
                fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
                cursor: 'pointer', transition: 'all 0.15s',
                background: selected.includes(item) ? '#1d1d1f' : '#f2f2f2',
                color: selected.includes(item) ? 'white' : '#424245',
                border: 'none',
              }}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <input name="fullName" required placeholder="Full name" style={inputStyle} />
          <input name="phone" required type="tel" placeholder="Phone / WhatsApp" style={inputStyle} />
          <input name="email" type="email" placeholder="Email (optional)" style={inputStyle} />

          {error && <p style={{ fontFamily: 'var(--font-sans)', fontSize: '12px', color: '#ff3b30' }}>{error}</p>}

          <button type="submit" disabled={isPending || selected.length === 0} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '14px', borderRadius: '980px',
            background: selected.length === 0 ? '#e5e5e5' : '#1d1d1f',
            color: selected.length === 0 ? '#aeaeb2' : 'white',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
            border: 'none', cursor: selected.length === 0 ? 'not-allowed' : 'pointer',
            marginTop: '4px', transition: 'all 0.15s',
          }}>
            {isPending ? 'Submitting…' : <><span>Join as Educator</span><ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  )
}
