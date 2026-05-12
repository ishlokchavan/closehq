'use client'

import { useState, useTransition } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { submitLearnerInterest } from './actions'

const INTERESTS = ['Area guides', 'Building profiles', 'Off-plan market', 'Secondary market', 'Legal & finance', 'Scaling up']
const ROLES = ['New agent', 'Experienced agent', 'Investor', 'Relocating', 'Other']

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

export default function LearnerForm({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const [interests, setInterests] = useState<string[]>([])
  const [role, setRole] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function toggleInterest(val: string) {
    setInterests(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val])
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('interests', interests.join(','))
    fd.set('role', role)
    startTransition(async () => {
      const result = await submitLearnerInterest(fd)
      if (result.ok) onSuccess()
      else setError(result.error ?? 'Something went wrong')
    })
  }

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '7px 14px', borderRadius: '980px',
    fontFamily: 'var(--font-sans)', fontSize: '13px', fontWeight: 500,
    cursor: 'pointer', transition: 'all 0.15s',
    background: active ? '#1d1d1f' : '#f2f2f2',
    color: active ? 'white' : '#424245',
    border: 'none',
  })

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} />

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
              Early access
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600, color: '#1d1d1f', letterSpacing: '-0.025em', lineHeight: 1.1, margin: 0 }}>
              Learn from insiders.
            </h2>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '13px', color: '#86868b', marginTop: '4px', lineHeight: 1.4 }}>
              Playbooks built by Dubai&apos;s best market experts.
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

        {/* Interest chips */}
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#86868b', marginBottom: '10px' }}>
            What do you want to learn?
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INTERESTS.map(item => (
              <button key={item} type="button" onClick={() => toggleInterest(item)} style={chipStyle(interests.includes(item))}>
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Role chips */}
        <div>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#86868b', marginBottom: '10px' }}>
            I am a…
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {ROLES.map(r => (
              <button key={r} type="button" onClick={() => setRole(r)} style={chipStyle(role === r)}>
                {r}
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

          <button type="submit" disabled={isPending} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            width: '100%', padding: '14px', borderRadius: '980px',
            background: '#1d1d1f', color: 'white',
            fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: 600,
            border: 'none', cursor: isPending ? 'not-allowed' : 'pointer',
            marginTop: '4px', opacity: isPending ? 0.5 : 1, transition: 'all 0.15s',
          }}>
            {isPending ? 'Submitting…' : <><span>Get Early Access</span><ArrowRight size={16} /></>}
          </button>
        </form>
      </div>
    </div>
  )
}
