'use client'

import { useState, useTransition } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { submitLearnerInterest } from './actions'

const INTERESTS = [
  { value: 'area_guides', label: '🗺️ Area guides', desc: 'Neighbourhood deep dives and comparisons' },
  { value: 'building_profiles', label: '🏢 Building profiles', desc: 'Tower-by-tower data and insider knowledge' },
  { value: 'off_plan', label: '📐 Off-plan market', desc: 'Developer launches, payment plans, risks' },
  { value: 'secondary', label: '🔄 Secondary market', desc: 'Resale pricing, negotiation, ROI analysis' },
  { value: 'legal_finance', label: '⚖️ Legal & finance', desc: 'Mortgages, POAs, ownership structures' },
  { value: 'scale', label: '📈 Scaling up', desc: 'Build a team, referral network, brand' },
]

const ROLE = [
  { value: 'new_agent', label: 'New agent' },
  { value: 'experienced_agent', label: 'Experienced agent' },
  { value: 'investor', label: 'Investor' },
  { value: 'relocating', label: 'Relocating to Dubai' },
  { value: 'other', label: 'Other' },
]

export default function LearnerForm({
  onClose,
  onSuccess,
}: {
  onClose: () => void
  onSuccess: () => void
}) {
  const [selected, setSelected] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState('')

  function toggleInterest(val: string) {
    setSelected(prev =>
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    )
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const fd = new FormData(e.currentTarget)
    fd.set('interests', selected.join(','))
    startTransition(async () => {
      const result = await submitLearnerInterest(fd)
      if (result.ok) onSuccess()
      else setError(result.error ?? 'Something went wrong')
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={onClose} />

      {/* Sheet */}
      <div className="relative w-full max-w-md rounded-3xl bg-[#1c1c1e] border border-white/10 overflow-hidden"
        style={{ maxHeight: '92vh', overflowY: 'auto' }}>

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-widest text-white/40 mb-1">
              Early access
            </p>
            <h2 className="font-display text-[22px] font-semibold text-white leading-tight"
              style={{ letterSpacing: '-0.025em' }}>
              Learn from insiders.
            </h2>
            <p className="mt-1.5 font-sans text-[13px] text-white/50 leading-relaxed">
              Get access to playbooks, guides, and knowledge built by Dubai's best market experts.
            </p>
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors ml-4 mt-1 shrink-0">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 pb-6 flex flex-col gap-5">

          {/* Interests */}
          <div>
            <p className="font-sans text-[12px] font-medium text-white/40 uppercase tracking-wider mb-3">
              What do you want to learn? <span className="text-white/20">(pick all that apply)</span>
            </p>
            <div className="grid grid-cols-2 gap-2">
              {INTERESTS.map((item) => {
                const active = selected.includes(item.value)
                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => toggleInterest(item.value)}
                    className={`text-left rounded-2xl p-3.5 border transition-all ${
                      active
                        ? 'border-white/40 bg-white/15'
                        : 'border-white/10 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <p className="font-sans text-[13px] font-medium text-white">{item.label}</p>
                    <p className="font-sans text-[11px] text-white/40 mt-0.5 leading-snug">{item.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Personal info */}
          <div className="flex flex-col gap-3">
            <div>
              <label className="block font-sans text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">
                Full Name *
              </label>
              <input
                name="fullName"
                required
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">
                Phone / WhatsApp *
              </label>
              <input
                name="phone"
                required
                type="tel"
                placeholder="+971 50 123 4567"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-sans text-[14px] text-white placeholder:text-white/25 outline-none focus:border-white/30 focus:bg-white/10 transition-colors"
              />
            </div>
            <div>
              <label className="block font-sans text-[12px] font-medium text-white/40 uppercase tracking-wider mb-2">
                I am a…
              </label>
              <div className="flex flex-wrap gap-2">
                {ROLE.map(r => (
                  <label key={r.value}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 cursor-pointer hover:bg-white/10 transition-colors has-[:checked]:border-white/30 has-[:checked]:bg-white/15">
                    <input type="radio" name="role" value={r.value} className="sr-only" />
                    <span className="font-sans text-[12px] text-white/70">{r.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <p className="font-sans text-[13px] text-red-400">{error}</p>
          )}

          {/* What they get */}
          <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
            <p className="font-sans text-[12px] font-semibold text-white/60 uppercase tracking-wider mb-2">What's inside</p>
            <ul className="space-y-1.5">
              {[
                'Area & building playbooks by market insiders',
                'Off-plan and secondary market guides',
                'Legal, finance, and ownership explainers',
                'Curated expert network on demand',
                'Early access pricing when we launch',
              ].map(p => (
                <li key={p} className="flex items-start gap-2 font-sans text-[12px] text-white/50">
                  <span className="text-emerald-400 mt-0.5">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="flex items-center justify-center gap-2 rounded-full bg-white py-3.5 font-sans text-[14px] font-semibold text-ink transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isPending ? 'Submitting…' : 'Get Early Access'}
            {!isPending && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>
      </div>
    </div>
  )
}
