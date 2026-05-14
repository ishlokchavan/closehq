const WORDS = ['ANONYMOUS', 'DEAL DESK', 'COMMISSION', 'ACADEMY', 'REFERRALS', 'ANONYMOUS', 'DEAL DESK', 'COMMISSION', 'ACADEMY', 'REFERRALS'];

export function S2Marquee() {
  return (
    <div className="bg-cream border-y border-sellit-border overflow-hidden py-6 select-none">
      <div className="flex animate-marquee whitespace-nowrap">
        {WORDS.concat(WORDS).map((word, i) => (
          <span
            key={i}
            className="font-display font-extrabold text-[#1A1A1A]/10 mx-8 flex-shrink-0"
            style={{
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}
          >
            {word}
            <span className="text-lime mx-8">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
