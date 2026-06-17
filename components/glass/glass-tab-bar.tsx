'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Flame, Search, Map, User } from 'lucide-react';

const TABS = [
  { href: '/experience',          label: 'Home',    Icon: Home,  match: (p: string) => p === '/experience' },
  { href: '/experience/trending', label: 'Trending', Icon: Flame, match: (p: string) => p.startsWith('/experience/trending') },
  { href: '/experience/search',   label: 'Search',  Icon: Search, match: (p: string) => p.startsWith('/experience/search') },
  { href: '/experience/map',      label: 'Map',     Icon: Map,   match: (p: string) => p.startsWith('/experience/map') },
  { href: '/experience/profile',  label: 'Profile', Icon: User,  match: (p: string) => p.startsWith('/experience/profile') },
];

/** Full-screen surfaces hide the tab bar so it can't overlap their own chrome. */
const HIDE_ON = [
  '/experience/property',
  '/experience/launches',
  '/experience/login',
  '/experience/sell',
];

export function GlassTabBar() {
  const pathname = usePathname();

  if (HIDE_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <nav
      className="pointer-events-none absolute inset-x-0 bottom-0 z-50 flex justify-center pb-[max(14px,env(safe-area-inset-bottom))]"
      aria-label="Primary"
    >
      <div className="lg-glass-light pointer-events-auto flex items-center gap-0.5 rounded-full p-1.5">
        {TABS.map(({ href, label, Icon, match }) => {
          const active = match(pathname);
          return (
            <Link
              key={href}
              href={href}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
              className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 active:scale-90 ${
                active ? 'bg-ink text-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]' : 'text-graphite-dark'
              }`}
            >
              <Icon
                className="h-[22px] w-[22px]"
                strokeWidth={active ? 2.4 : 1.9}
                fill={active && label === 'Home' ? 'currentColor' : 'none'}
                aria-hidden
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
