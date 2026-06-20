/** Shared formatters for the dashboard. */

export function fmtAed(value: number, opts: { compact?: boolean } = {}): string {
  if (opts.compact && Math.abs(value) >= 1000) {
    const units = [
      { v: 1_000_000_000, s: 'B' },
      { v: 1_000_000, s: 'M' },
      { v: 1_000, s: 'K' },
    ];
    for (const u of units) {
      if (Math.abs(value) >= u.v) {
        const n = value / u.v;
        return `AED ${n.toFixed(n >= 100 ? 0 : 1).replace(/\.0$/, '')}${u.s}`;
      }
    }
  }
  return `AED ${Math.round(value).toLocaleString('en-US')}`;
}

export function fmtNum(value: number): string {
  return value.toLocaleString('en-US');
}

export function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

/** Compact relative time ("3d ago", "in 2d"). Stable enough for UI labels. */
export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const abs = Math.abs(diff);
  const fut = diff < 0;
  const mins = Math.round(abs / 60000);
  if (mins < 60) return fut ? `in ${mins}m` : `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return fut ? `in ${hrs}h` : `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 30) return fut ? `in ${days}d` : `${days}d ago`;
  const months = Math.round(days / 30);
  return fut ? `in ${months}mo` : `${months}mo ago`;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? '')
    .join('');
}
