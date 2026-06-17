'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Sparkles, Heart, User } from 'lucide-react';
import { useSaved } from './saved-store';

const TABS = [
  { href: '/experience', label: 'Discover', Icon: Compass, match: (p: string) => p === '/experience' },
  { href: '/experience/launches', label: 'Launches', Icon: Sparkles, match: (p: string) => p.startsWith('/experience/launches') },
  { href: '/experience/saved', label: 'Saved', Icon: Heart, match: (p: string) => p.startsWith('/experience/saved') },
  { href: '/experience/profile', label: 'Profile', Icon: User, match: (p: string) => p.startsWith('/experience/profile') },
];

/** Full-screen surfaces hide the tab bar so it can't overlap their own chrome. */
const HIDE_ON = ['/experience/property', '/experience/launches'];

export function GlassTabBar() {
  const pathname = usePathname();
  const { savedRefs } = useSaved();

  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center pb-[max(16px,env(safe-area-inset-bottom))]"
      aria-label="Primary"
    >
      <div className="lg-glass-light pointer-events-auto flex items-center gap-1 rounded-full p-1.5">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          const showBadge = label === 'Saved' && savedRefs.length > 0;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`relative flex h-11 items-center gap-2 rounded-full px-4 transition-all duration-300 ${
                active ? 'bg-ink text-white' : 'text-graphite-dark hover:text-ink'
              }`}
            >
              <Icon className="h-[21px] w-[21px]" strokeWidth={active ? 2.4 : 2} aria-hidden />
              <span
                className={`overflow-hidden text-[14px] font-medium tracking-tight transition-all duration-300 ${
                  active ? 'max-w-[80px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                {label}
              </span>
              {showBadge && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[11px] font-semibold text-white">
                  {savedRefs.length}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
