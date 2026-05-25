'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const REF_STORAGE_KEY = 'goaffpro_ref';
const REF_TTL_DAYS = 30;

type StoredRef = { code: string; ts: number };

function persistRef(code: string) {
  try {
    const payload: StoredRef = { code, ts: Date.now() };
    sessionStorage.setItem(REF_STORAGE_KEY, JSON.stringify(payload));
    localStorage.setItem(REF_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* storage unavailable (private mode / blocked) — GoAffPro's own
       cookie still tracks attribution; we just lose our backup. */
  }
}

export function readStoredRef(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw =
      sessionStorage.getItem(REF_STORAGE_KEY) ||
      localStorage.getItem(REF_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredRef;
    const ageDays = (Date.now() - parsed.ts) / (1000 * 60 * 60 * 24);
    if (ageDays > REF_TTL_DAYS) return null;
    return parsed.code || null;
  } catch {
    return null;
  }
}

export function GoaffproTracker() {
  const shop = process.env.NEXT_PUBLIC_GOAFFPRO_SHOP?.trim();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('ref') || params.get('aff');
    if (fromQuery && /^[A-Za-z0-9_-]{1,64}$/.test(fromQuery)) {
      persistRef(fromQuery);
    }
  }, []);

  if (!shop) return null;

  return (
    <Script
      id="goaffpro-loader"
      src={`https://api.goaffpro.com/loader.js?shop=${encodeURIComponent(shop)}`}
      strategy="afterInteractive"
    />
  );
}
