/* ===================================================================
   iClose referral tracking, fully self-contained, no third-party SaaS.

   How it works
   ------------
   1. A visitor lands on /?ref=AB12CD. The client captures `ref`, stores
      it in a long-lived cookie + localStorage, and strips the param so
      the URL stays clean. The cookie wins on conflicts (the *first*
      referrer to land sticks for the attribution window).
   2. When the visitor submits the waitlist form, the captured code is
      attached to the lead payload as `referredByCode`.
   3. On the server, we look up which existing lead owns that code,
      record the relationship on the new lead row (`referred_by_code`
      and `referred_by_lead_id`), and bump the referrer's `referral_count`.
   4. Every new lead also receives its own unique `referral_code`, which
      we surface in the success state so they can share /?ref=THEIRCODE.

   Code shape: 8 chars, base32-style (no easily-confused glyphs). Short
   enough to type, long enough to make collisions effectively zero at
   any realistic signup volume.
   =================================================================== */

const COOKIE_NAME = 'iclose_ref';
const STORAGE_KEY = 'iclose_ref';
const ATTRIBUTION_DAYS = 90;

const SAFE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I

export function generateReferralCode(length = 8): string {
  const bytes =
    typeof crypto !== 'undefined' && 'getRandomValues' in crypto
      ? crypto.getRandomValues(new Uint8Array(length))
      : (() => {
          const a = new Uint8Array(length);
          for (let i = 0; i < length; i++) a[i] = Math.floor(Math.random() * 256);
          return a;
        })();
  let out = '';
  for (let i = 0; i < length; i++) {
    out += SAFE_ALPHABET[bytes[i] % SAFE_ALPHABET.length];
  }
  return out;
}

export function isValidReferralCode(code: string): boolean {
  if (typeof code !== 'string') return false;
  const clean = code.toUpperCase();
  if (clean.length < 6 || clean.length > 16) return false;
  for (let i = 0; i < clean.length; i++) {
    if (!SAFE_ALPHABET.includes(clean[i])) return false;
  }
  return true;
}

/* ----------- Client helpers (no-op when called server-side) ----------- */

function setCookie(name: string, value: string, days: number) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie
    .split('; ')
    .find((r) => r.startsWith(name + '='));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

/* Grab ?ref= from the current URL and persist it as a cookie +
   localStorage entry. The query param is left in place so the
   visitor (and our analytics) can see which link they came from;
   first-touch attribution still wins because we never overwrite an
   existing cookie. */
export function captureReferralFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('ref');
  if (!raw) return null;
  const code = raw.toUpperCase();
  if (!isValidReferralCode(code)) return null;
  const existing = getCookie(COOKIE_NAME) || localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    setCookie(COOKIE_NAME, code, ATTRIBUTION_DAYS);
    try {
      localStorage.setItem(STORAGE_KEY, code);
    } catch {
      // localStorage may be blocked; cookie still works.
    }
  }
  return existing || code;
}

export function getStoredReferralCode(): string | null {
  if (typeof window === 'undefined') return null;
  return (
    getCookie(COOKIE_NAME) ||
    (typeof localStorage !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null)
  );
}

export function buildReferralLink(code: string, origin?: string): string {
  const base =
    origin ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://iclose.ae');
  return `${base}/?ref=${code}`;
}
