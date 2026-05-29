/* ===================================================================
   Partner attribution capture, layered for cookie-hostile browsers.

   Why three layers? A single signup path has three independent points
   of failure:
     - URL: present on landing, lost on any internal navigation.
     - localStorage: usually survives cookie banners, but Private mode
       and some content blockers nuke it.
     - Cookie: blocked outright by strict consent banners.

   On every page load we promote whatever we find from URL into the
   other two stores. On submit we read back in order URL > storage >
   cookie. As long as ONE of the three survives, attribution sticks.

   This intentionally lives next to lib/referral.ts (the personal
   lead-to-lead system) rather than inside it: codes have different
   shapes (partner codes contain hyphens, personal codes are 8-char
   base32) and they map to different columns at the API.
   =================================================================== */

const COOKIE_NAME = 'referral_slug';
const STORAGE_KEY = 'iclose_partner';
const ATTRIBUTION_DAYS = 90;

const PARTNER_CODE_RE = /^[a-z0-9][a-z0-9-]{1,40}[a-z0-9]$/;

export function isValidPartnerCode(code: unknown): code is string {
  return typeof code === 'string' && PARTNER_CODE_RE.test(code);
}

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

/* Promote ?partner= from the current URL into localStorage + cookie.
   First-touch wins: never overwrite an existing attribution within
   the window. Returns the effective code after capture. */
export function capturePartnerFromUrl(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get('partner');
  const fromUrl = raw && isValidPartnerCode(raw) ? raw : null;

  const existing =
    (typeof localStorage !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY)
      : null) || getCookie(COOKIE_NAME);

  if (!existing && fromUrl) {
    setCookie(COOKIE_NAME, fromUrl, ATTRIBUTION_DAYS);
    try {
      localStorage.setItem(STORAGE_KEY, fromUrl);
    } catch {
      // Storage blocked — cookie still covers us.
    }
  }
  return existing || fromUrl;
}

/* Read the strongest signal we have right now. URL beats storage in
   case the user landed via a fresh partner link after a previous one
   expired or never sent them anywhere. */
export function getStoredPartnerCode(): string | null {
  if (typeof window === 'undefined') return null;
  const fromUrl = new URLSearchParams(window.location.search).get('partner');
  if (fromUrl && isValidPartnerCode(fromUrl)) return fromUrl;
  const fromStorage =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(STORAGE_KEY)
      : null;
  if (fromStorage) return fromStorage;
  return getCookie(COOKIE_NAME);
}
