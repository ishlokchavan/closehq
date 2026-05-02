'use client';

const TRUST_ITEMS = [
  'Off-Plan Specialists',
  'Emaar · Damac · Sobha',
  'Palm Jumeirah · Downtown · Marina',
  'RERA Compliant Partners',
  'Advance on SPA',
  'Multilingual Desk',
  'Yacht & Chauffeur Concierge',
  'Verified Buyers',
];

export function Trust() {
  return (
    <section
      aria-label="Trusted by Dubai's deal makers"
      className="relative bg-ink border-y border-bone/10 py-8 overflow-hidden"
    >
      <div className="container-x mb-6">
        <div className="flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
          <span className="h-px w-8 bg-bone/20" />
          Built for agents closing in Dubai
          <span className="h-px w-8 bg-bone/20" />
        </div>
      </div>

      <div className="relative mask-fade-x">
        <div
          className="flex gap-12 whitespace-nowrap animate-marquee will-change-transform"
          aria-hidden
        >
          {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-12 font-display text-lg md:text-xl text-bone/40 font-light tracking-tight"
            >
              <span>{item}</span>
              <span className="text-gold/40">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
