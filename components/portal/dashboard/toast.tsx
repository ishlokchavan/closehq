'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

type ToastTone = 'success' | 'info' | 'error';
interface Toast { id: number; tone: ToastTone; message: string }

interface ToastApi {
  toast: (message: string, tone?: ToastTone) => void;
  success: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
}

const Ctx = createContext<ToastApi | null>(null);

const ICON: Record<ToastTone, typeof Info> = { success: CheckCircle2, info: Info, error: AlertTriangle };
const COLOR: Record<ToastTone, string> = {
  success: 'text-[#059669]', info: 'text-[#2563eb]', error: 'text-[#dc2626]',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((t) => [...t, { id, tone, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3800);
  }, []);

  const api: ToastApi = {
    toast: push,
    success: (m) => push(m, 'success'),
    info: (m) => push(m, 'info'),
    error: (m) => push(m, 'error'),
  };

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed bottom-5 right-5 z-[100] flex w-[min(92vw,360px)] flex-col gap-2">
        {toasts.map((t) => {
          const Icon = ICON[t.tone];
          return (
            <div
              key={t.id}
              role="status"
              className="flex items-start gap-2.5 rounded-xl border border-black/5 bg-white px-3.5 py-3 text-[13px] text-ink shadow-lg shadow-black/10 animate-in slide-in-from-bottom-2"
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${COLOR[t.tone]}`} />
              <span className="flex-1 leading-snug">{t.message}</span>
              <button
                onClick={() => setToasts((x) => x.filter((y) => y.id !== t.id))}
                className="text-ink/30 transition-colors hover:text-ink"
                aria-label="Dismiss"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </Ctx.Provider>
  );
}

export function useToast(): ToastApi {
  const v = useContext(Ctx);
  if (!v) throw new Error('useToast must be used within ToastProvider');
  return v;
}

/** Generate and download a text/CSV artifact client-side (real, working download). */
export function downloadFile(filename: string, content: string, type = 'text/plain') {
  if (typeof window === 'undefined') return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
