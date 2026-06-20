/**
 * Dashboard personas. The property portal serves three distinct account types,
 * each with its own navigation, KPIs and workflows:
 *
 *   - buyer_seller — individuals buying and/or selling their own property
 *   - agent        — RERA agents & freelancers running their own pipeline
 *   - agency        — brokerages managing a team of agents
 *
 * Persona is read from `user_metadata.account_type` (set at signup or via the
 * in-dashboard switcher). It is intentionally separate from `profiles.role`
 * (which is the academy/internal role enum: learner/partner/manager/admin).
 */
import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard, Heart, Eye, MessagesSquare, Building2, Handshake, Wallet,
  FileText, Settings, Users, Target, UserSquare2, BarChart3, BadgeDollarSign,
  CreditCard, ShieldCheck,
} from 'lucide-react';

export type Persona = 'buyer_seller' | 'agent' | 'agency';

export interface PersonaMeta {
  key: Persona;
  label: string;
  short: string;
  description: string;
  /** Tailwind tint from the journey palette, for accents. */
  tint: string;
}

export const PERSONAS: PersonaMeta[] = [
  {
    key: 'buyer_seller',
    label: 'Buyer / Seller',
    short: 'Buyer / Seller',
    description: 'Buy, sell and track your own property — commission-free.',
    tint: 'journey-buyer',
  },
  {
    key: 'agent',
    label: 'Agent / Freelancer',
    short: 'Agent',
    description: 'Run your listings, leads, deals and commission in one place.',
    tint: 'journey-agent',
  },
  {
    key: 'agency',
    label: 'Agency',
    short: 'Agency',
    description: 'Manage your agents, inventory, pipeline and revenue.',
    tint: 'journey-seller',
  },
];

export function personaMeta(key: Persona): PersonaMeta {
  return PERSONAS.find((p) => p.key === key) ?? PERSONAS[0];
}

export const DEFAULT_PERSONA: Persona = 'buyer_seller';

/** Read the persona from arbitrary user_metadata, if present & valid. */
export function detectPersona(meta?: Record<string, unknown> | null): Persona | null {
  const raw = meta?.account_type;
  if (raw === 'buyer_seller' || raw === 'agent' || raw === 'agency') return raw;
  // Friendly aliases people might store.
  if (raw === 'buyer' || raw === 'seller' || raw === 'buyer/seller') return 'buyer_seller';
  if (raw === 'freelancer') return 'agent';
  if (raw === 'brokerage') return 'agency';
  return null;
}

// ---------------------------------------------------------------------------
// Navigation — grouped sidebar, per persona. Every item is a real route under
// /dashboard so each workflow is deep-linkable (good for tutorials).
// ---------------------------------------------------------------------------
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Key into the live badge counts (unread/active counts shown as a pill). */
  badge?: string;
}
export interface NavGroup {
  title: string;
  items: NavItem[];
}

const OVERVIEW: NavItem = { label: 'Overview', href: '/dashboard', icon: LayoutDashboard };

export const NAV: Record<Persona, NavGroup[]> = {
  buyer_seller: [
    { title: 'Home', items: [OVERVIEW] },
    {
      title: 'Buying',
      items: [
        { label: 'Saved properties', href: '/dashboard/saved', icon: Heart, badge: 'saved' },
        { label: 'Viewings', href: '/dashboard/viewings', icon: Eye, badge: 'viewings' },
        { label: 'Enquiries', href: '/dashboard/enquiries', icon: MessagesSquare, badge: 'enquiries' },
      ],
    },
    {
      title: 'Selling',
      items: [
        { label: 'My listings', href: '/dashboard/listings', icon: Building2, badge: 'listings' },
        { label: 'Offers & deals', href: '/dashboard/deals', icon: Handshake, badge: 'deals' },
      ],
    },
    {
      title: 'Wallet & account',
      items: [
        { label: 'Credits & cashback', href: '/dashboard/credits', icon: Wallet },
        { label: 'Documents', href: '/dashboard/documents', icon: FileText },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      ],
    },
  ],
  agent: [
    { title: 'Home', items: [OVERVIEW] },
    {
      title: 'Pipeline',
      items: [
        { label: 'Leads', href: '/dashboard/leads', icon: Target, badge: 'leads' },
        { label: 'Clients', href: '/dashboard/clients', icon: UserSquare2, badge: 'clients' },
        { label: 'Deals', href: '/dashboard/deals', icon: Handshake, badge: 'deals' },
        { label: 'Viewings', href: '/dashboard/viewings', icon: Eye, badge: 'viewings' },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { label: 'My listings', href: '/dashboard/listings', icon: Building2, badge: 'listings' },
      ],
    },
    {
      title: 'Earnings',
      items: [
        { label: 'Commission', href: '/dashboard/commission', icon: BadgeDollarSign },
        { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Documents', href: '/dashboard/documents', icon: FileText },
        { label: 'Membership', href: '/dashboard/billing', icon: CreditCard },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      ],
    },
  ],
  agency: [
    { title: 'Home', items: [OVERVIEW] },
    {
      title: 'Team',
      items: [
        { label: 'Agents', href: '/dashboard/agents', icon: Users, badge: 'agents' },
        { label: 'Clients', href: '/dashboard/clients', icon: UserSquare2, badge: 'clients' },
      ],
    },
    {
      title: 'Pipeline',
      items: [
        { label: 'Leads', href: '/dashboard/leads', icon: Target, badge: 'leads' },
        { label: 'Deals', href: '/dashboard/deals', icon: Handshake, badge: 'deals' },
        { label: 'Viewings', href: '/dashboard/viewings', icon: Eye, badge: 'viewings' },
      ],
    },
    {
      title: 'Inventory',
      items: [
        { label: 'Listings', href: '/dashboard/listings', icon: Building2, badge: 'listings' },
      ],
    },
    {
      title: 'Business',
      items: [
        { label: 'Commission & revenue', href: '/dashboard/commission', icon: BadgeDollarSign },
        { label: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
        { label: 'Compliance', href: '/dashboard/compliance', icon: ShieldCheck },
      ],
    },
    {
      title: 'Account',
      items: [
        { label: 'Documents', href: '/dashboard/documents', icon: FileText },
        { label: 'Membership & billing', href: '/dashboard/billing', icon: CreditCard },
        { label: 'Settings', href: '/dashboard/settings', icon: Settings },
      ],
    },
  ],
};

/** Which personas may see a given dashboard route (for graceful access notes). */
export function personasForRoute(href: string): Persona[] {
  return (Object.keys(NAV) as Persona[]).filter((p) =>
    NAV[p].some((g) => g.items.some((i) => i.href === href)),
  );
}
