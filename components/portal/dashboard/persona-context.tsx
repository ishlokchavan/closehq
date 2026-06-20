'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/components/portal/auth-provider';
import { detectPersona, DEFAULT_PERSONA, type Persona } from '@/lib/portal/dashboard/persona';

const STORAGE_KEY = 'iclose_persona';

interface PersonaState {
  persona: Persona;
  /** Switch persona — persists to localStorage and (best-effort) user_metadata. */
  setPersona: (p: Persona) => void;
  /** True until the initial persona has been resolved from metadata/storage. */
  ready: boolean;
}

const PersonaContext = createContext<PersonaState>({
  persona: DEFAULT_PERSONA,
  setPersona: () => {},
  ready: false,
});

/**
 * Resolves the active dashboard persona. Priority:
 *   1. A locally-chosen persona (the switcher — great for demos/tutorials)
 *   2. The signed-in user's `user_metadata.account_type`
 *   3. The default (buyer/seller)
 *
 * Switching writes to localStorage immediately and pushes the choice back to
 * Supabase user_metadata in the background so it follows the account.
 */
export function PersonaProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [persona, setPersonaState] = useState<Persona>(DEFAULT_PERSONA);
  const [ready, setReady] = useState(false);
  const [override, setOverride] = useState<Persona | null>(null);

  // Load any locally-saved persona once on mount.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'buyer_seller' || saved === 'agent' || saved === 'agency') {
        setOverride(saved);
        setPersonaState(saved);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  // When the user resolves, fall back to their metadata persona if no override.
  useEffect(() => {
    if (override) return;
    const fromMeta = detectPersona(user?.user_metadata as Record<string, unknown> | undefined);
    if (fromMeta) setPersonaState(fromMeta);
  }, [user, override]);

  function setPersona(p: Persona) {
    setOverride(p);
    setPersonaState(p);
    try {
      window.localStorage.setItem(STORAGE_KEY, p);
    } catch {
      /* ignore */
    }
    // Best-effort: persist to the account so it follows them across devices.
    if (user) {
      (async () => {
        try {
          const { supabase } = await import('@/lib/supabase');
          await supabase.auth.updateUser({ data: { account_type: p } });
        } catch {
          /* non-fatal — the local choice still applies */
        }
      })();
    }
  }

  return (
    <PersonaContext.Provider value={{ persona, setPersona, ready }}>
      {children}
    </PersonaContext.Provider>
  );
}

export const usePersona = () => useContext(PersonaContext);
