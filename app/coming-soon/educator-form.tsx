'use client'

import { useState, useTransition } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { submitEducatorInterest } from './actions'

const EXPERTISE = [
  { value: 'area', label: 'Area Expert' },
  { value: 'building', label: 'Building Expert' },
  { value: 'community', label: 'Community Expert' },
  { value: 'cluster', label: 'Cluster Expert' },
  { value: 'off_plan', label: 'Off-Plan' },
  { value: 'secondary', label: 'Secondary Market' },
]

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-xl" onClick={onClose} />

      <div className="relative w-full max-w-[420px] rounded-3xl bg-white/95 backdrop-blur-2xl shadow-2xl border border-black/5 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-7 pt-7 pb-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-black/30 mb-1">For educators</p>
            <h2 className="text-[22px] font-semibold text-black tracking-tight leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Share your expertise.
            </h2>
            <p className="mt-1 text-[13px] text-black/50 leading-snug">We create the content. Zero cost.</p>
          </div>
          <button onClick={onClose} className="flex h-7 w-7 items-center justify-center rounded-full bg-black/6 text-black/40 hover:bg-black/10 hover:text-black transition-all ml-3 shrink-0">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-7 pb-7 flex flex-col gap-4">
          {/* Expertise chips */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.07em] text-black/30 mb-2.5">Your expertise</p>
            <div className="flex flex-wrap gap-2">
              {EXPERTISE.map(item => (
                <button key={item.value} type="button" onClick={() => toggle(item.value)}
                  className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-all ${
                    selected.includes(item.value)
                      ? 'bg-black text-white'
                      : 'bg-black/6 text-black/60 hover:bg-black/10 hover:text-black'
                  }`}>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-3">
            <input name="fullName" required placeholder="Full name"
              className="w-full rounded-xl bg-black/5 px-4 py-2.5 text-[14px] text-black placeholder:text-black/30 outline-none focus:bg-black/8 transition-colors border-none" />
            <input name="phone" required type="tel" placeholder="Phone / WhatsApp"
              className="w-full rounded-xl bg-black/5 px-4 py-2.5 text-[14px] text-black placeholder:text-black/30 outline-none focus:bg-black/8 transition-colors border-none" />
            <input name="email" type="email" placeholder="Email (optional)"
              className="w-full rounded-xl bg-black/5 px-4 py-2.5 text-[14px] text-black placeholder:text-black/30 outline-none focus:bg-black/8 transition-colors border-none" />
          </div>

          {error && <p className="text-[12px] text-red-500">{error}</p>}

          <button type="submit" disabled={isPending || selected.length === 0}
            className="flex items-center justify-center gap-2 w-full rounded-full bg-black py-3 text-[14px] font-semibold text-white transition-all hover:bg-black/85 active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed mt-1">
            {isPending ? 'Submitting…' : <><span>Join as Educator</span><ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>
      </div>
    </div>
  )
}
