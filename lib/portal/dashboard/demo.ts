/**
 * Dashboard demo dataset.
 *
 * Every section reads through one of the `get*` accessors below. Today they
 * return rich, deterministic demo data (so every screen is fully populated for
 * tutorials and design review). Each accessor is the single seam to swap for a
 * live, auth-scoped Supabase query once the portal-CRM tables are provisioned
 * (see supabase/migrations/…_portal_dashboard_crm.sql) — the UI never changes.
 */
import type { Persona } from './persona';

// ---------------------------------------------------------------------------
// Pipeline vocabulary (Dubai transaction flow)
// ---------------------------------------------------------------------------
export const DEAL_STAGES = ['Qualified', 'Viewing', 'Offer', 'Form F / MOU', 'DLD Transfer', 'Closed'] as const;
export type DealStage = (typeof DEAL_STAGES)[number];

export const LEAD_STAGES = ['New', 'Contacted', 'Qualified', 'Viewing', 'Negotiating', 'Won', 'Lost'] as const;
export type LeadStage = (typeof LEAD_STAGES)[number];

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'accent';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
export interface Lead {
  id: string; name: string; email: string; phone: string;
  interest: string; budgetAed: number; source: string;
  stage: LeadStage; score: number; lastTouchIso: string; ownerAgent?: string;
}
export interface Client {
  id: string; name: string; email: string; phone: string;
  type: 'Buyer' | 'Seller' | 'Investor' | 'Tenant' | 'Landlord';
  status: 'Active' | 'Nurturing' | 'Closed'; valueAed: number;
  lastContactIso: string; ownerAgent?: string; deals: number;
}
export interface Deal {
  id: string; ref: string; property: string; community: string;
  client: string; stage: DealStage; valueAed: number; commissionAed: number;
  status: 'active' | 'won' | 'lost'; updatedIso: string; closeIso: string; ownerAgent?: string;
}
export interface Viewing {
  id: string; property: string; community: string; client: string;
  whenIso: string; status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  ownerAgent?: string;
}
export interface ListingRow {
  id: string; ref: string; title: string; community: string;
  priceAed: number; beds: number | null; baths: number | null; areaSqft: number;
  status: 'active' | 'draft' | 'pending_review' | 'sold' | 'archived';
  purpose: 'sale' | 'rent'; views: number; leads: number; savedBy: number;
  coverImageUrl: string | null; updatedIso: string; ownerAgent?: string;
}
export interface CommissionRow {
  id: string; period: string; deal: string; grossAed: number;
  platformFeeAed: number; netAed: number; status: 'paid' | 'pending' | 'processing'; dateIso: string;
}
export interface AgentRow {
  id: string; name: string; email: string; role: 'Agent' | 'Senior Agent' | 'Team Lead' | 'Admin';
  rera: string; status: 'active' | 'invited' | 'suspended';
  listings: number; activeDeals: number; ytdRevenueAed: number; rating: number; areas: string[];
}
export interface DocumentRow {
  id: string; name: string; kind: 'Form A' | 'Form B' | 'Form F / MOU' | 'Title Deed' | 'Passport / EID' | 'NOC' | 'POA' | 'Trade License' | 'RERA Card' | 'Contract';
  related: string; status: 'verified' | 'pending' | 'expired' | 'missing'; updatedIso: string;
}
export interface EnquiryRow {
  id: string; property: string; community: string; agent: string;
  channel: 'Chat' | 'Call' | 'Email' | 'WhatsApp'; status: 'awaiting' | 'replied' | 'viewing_booked' | 'closed';
  sentIso: string;
}
export interface SavedRow {
  id: string; ref: string; title: string; community: string; priceAed: number;
  beds: number | null; baths: number | null; areaSqft: number; coverImageUrl: string | null;
  priceChange: number; savedIso: string;
}
export interface ActivityItem { id: string; icon: string; text: string; whenIso: string; tone: Tone; }
export interface Task { id: string; label: string; due: string; done: boolean; priority: 'high' | 'med' | 'low'; }
export interface SeriesPoint { label: string; value: number; }
export interface CreditEntry { id: string; reason: string; delta: number; dateIso: string; }

// ---------------------------------------------------------------------------
// Seed helpers
// ---------------------------------------------------------------------------
const now = Date.now();
const days = (n: number) => new Date(now - n * 86400000).toISOString();
const inDays = (n: number) => new Date(now + n * 86400000).toISOString();
const hrs = (n: number) => new Date(now - n * 3600000).toISOString();

const COMMUNITIES = ['Downtown Dubai', 'Dubai Marina', 'Palm Jumeirah', 'Business Bay', 'Dubai Hills Estate', 'JVC', 'Dubai Creek Harbour', 'Arabian Ranches'];
const IMG = (i: number) => `https://images.unsplash.com/photo-${['1545324418-cc1a3fa10c00', '1512917774080-9991f1c4c750', '1494526585095-c41746248156', '1480074568708-e7b720bb3f09', '1502672260266-1c1ef2d93688', '1493809842364-78817add7ffb'][i % 6]}?auto=format&fit=crop&w=400&q=60`;

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------
const LEADS: Lead[] = [
  { id: 'l1', name: 'Omar Haddad', email: 'omar.h@gmail.com', phone: '+971 50 224 1180', interest: '2BR · Dubai Marina', budgetAed: 2400000, source: 'iClose search', stage: 'New', score: 82, lastTouchIso: hrs(2), ownerAgent: 'Layla Hassan' },
  { id: 'l2', name: 'Priya Nair', email: 'priya.nair@outlook.com', phone: '+971 55 901 7742', interest: 'Off-plan · Creek Harbour', budgetAed: 1850000, source: 'New Releases', stage: 'Contacted', score: 74, lastTouchIso: hrs(9), ownerAgent: 'Layla Hassan' },
  { id: 'l3', name: 'James Whitfield', email: 'jwhitfield@proton.me', phone: '+971 52 663 9920', interest: 'Villa · Dubai Hills', budgetAed: 9200000, source: 'Referral', stage: 'Qualified', score: 91, lastTouchIso: days(1), ownerAgent: 'Karim Aziz' },
  { id: 'l4', name: 'Aisha Al Marri', email: 'aisha.m@gmail.com', phone: '+971 50 110 3321', interest: 'Penthouse · Downtown', budgetAed: 14500000, source: 'WhatsApp', stage: 'Viewing', score: 88, lastTouchIso: days(2), ownerAgent: 'Karim Aziz' },
  { id: 'l5', name: 'Daniel Roberts', email: 'd.roberts@gmail.com', phone: '+971 54 778 2210', interest: '1BR · Business Bay', budgetAed: 1450000, source: 'iClose search', stage: 'Negotiating', score: 79, lastTouchIso: days(3), ownerAgent: 'Layla Hassan' },
  { id: 'l6', name: 'Mei Lin', email: 'mei.lin@gmail.com', phone: '+971 56 220 9087', interest: 'Studio · JVC', budgetAed: 720000, source: 'Referral', stage: 'New', score: 64, lastTouchIso: hrs(5), ownerAgent: 'Sara Mensah' },
  { id: 'l7', name: 'Yusuf Demir', email: 'yusuf.demir@gmail.com', phone: '+971 50 884 5512', interest: '3BR · Arabian Ranches', budgetAed: 5400000, source: 'Agency website', stage: 'Won', score: 95, lastTouchIso: days(6), ownerAgent: 'Karim Aziz' },
  { id: 'l8', name: 'Elena Petrova', email: 'elena.p@gmail.com', phone: '+971 55 332 1199', interest: 'Investment · Marina', budgetAed: 3100000, source: 'Referral', stage: 'Lost', score: 41, lastTouchIso: days(11), ownerAgent: 'Sara Mensah' },
];

export function getLeads(_persona: Persona): Lead[] {
  return LEADS;
}

// ---------------------------------------------------------------------------
// Clients
// ---------------------------------------------------------------------------
const CLIENTS: Client[] = [
  { id: 'c1', name: 'James Whitfield', email: 'jwhitfield@proton.me', phone: '+971 52 663 9920', type: 'Buyer', status: 'Active', valueAed: 9200000, lastContactIso: days(1), ownerAgent: 'Karim Aziz', deals: 1 },
  { id: 'c2', name: 'Aisha Al Marri', email: 'aisha.m@gmail.com', phone: '+971 50 110 3321', type: 'Investor', status: 'Active', valueAed: 14500000, lastContactIso: days(2), ownerAgent: 'Karim Aziz', deals: 2 },
  { id: 'c3', name: 'Sandra Koch', email: 'sandra.koch@gmail.com', phone: '+971 54 221 7781', type: 'Seller', status: 'Active', valueAed: 4100000, lastContactIso: days(2), ownerAgent: 'Layla Hassan', deals: 1 },
  { id: 'c4', name: 'Rahul Mehta', email: 'rahul.mehta@gmail.com', phone: '+971 50 663 2218', type: 'Buyer', status: 'Nurturing', valueAed: 2300000, lastContactIso: days(5), ownerAgent: 'Sara Mensah', deals: 0 },
  { id: 'c5', name: 'Fatima Noor', email: 'fatima.noor@gmail.com', phone: '+971 55 884 0091', type: 'Landlord', status: 'Active', valueAed: 1650000, lastContactIso: days(4), ownerAgent: 'Layla Hassan', deals: 3 },
  { id: 'c6', name: 'Yusuf Demir', email: 'yusuf.demir@gmail.com', phone: '+971 50 884 5512', type: 'Buyer', status: 'Closed', valueAed: 5400000, lastContactIso: days(6), ownerAgent: 'Karim Aziz', deals: 1 },
];

export function getClients(_persona: Persona): Client[] {
  return CLIENTS;
}

// ---------------------------------------------------------------------------
// Deals (pipeline)
// ---------------------------------------------------------------------------
const DEALS: Deal[] = [
  { id: 'd1', ref: 'IC-4821', property: 'Marina Gate · 2BR', community: 'Dubai Marina', client: 'Omar Haddad', stage: 'Qualified', valueAed: 2400000, commissionAed: 60000, status: 'active', updatedIso: hrs(6), closeIso: inDays(28), ownerAgent: 'Layla Hassan' },
  { id: 'd2', ref: 'IC-4790', property: 'Creek Edge · 1BR', community: 'Dubai Creek Harbour', client: 'Priya Nair', stage: 'Viewing', valueAed: 1850000, commissionAed: 46250, status: 'active', updatedIso: days(1), closeIso: inDays(21), ownerAgent: 'Layla Hassan' },
  { id: 'd3', ref: 'IC-4756', property: 'Maple · 3BR Villa', community: 'Dubai Hills Estate', client: 'James Whitfield', stage: 'Offer', valueAed: 9200000, commissionAed: 230000, status: 'active', updatedIso: days(1), closeIso: inDays(34), ownerAgent: 'Karim Aziz' },
  { id: 'd4', ref: 'IC-4712', property: 'Burj Vista · Penthouse', community: 'Downtown Dubai', client: 'Aisha Al Marri', stage: 'Form F / MOU', valueAed: 14500000, commissionAed: 362500, status: 'active', updatedIso: days(2), closeIso: inDays(12), ownerAgent: 'Karim Aziz' },
  { id: 'd5', ref: 'IC-4655', property: 'Peninsula · 1BR', community: 'Business Bay', client: 'Daniel Roberts', stage: 'DLD Transfer', valueAed: 1450000, commissionAed: 36250, status: 'active', updatedIso: days(3), closeIso: inDays(5), ownerAgent: 'Layla Hassan' },
  { id: 'd6', ref: 'IC-4590', property: 'Alvorada · 3BR Villa', community: 'Arabian Ranches', client: 'Yusuf Demir', stage: 'Closed', valueAed: 5400000, commissionAed: 135000, status: 'won', updatedIso: days(6), closeIso: days(6), ownerAgent: 'Karim Aziz' },
  { id: 'd7', ref: 'IC-4501', property: 'Binghatti Amber · Studio', community: 'JVC', client: 'Mei Lin', stage: 'Closed', valueAed: 720000, commissionAed: 18000, status: 'won', updatedIso: days(13), closeIso: days(13), ownerAgent: 'Sara Mensah' },
];

export function getDeals(_persona: Persona): Deal[] {
  return DEALS;
}

// ---------------------------------------------------------------------------
// Viewings
// ---------------------------------------------------------------------------
const VIEWINGS: Viewing[] = [
  { id: 'v1', property: 'Marina Gate · 2BR', community: 'Dubai Marina', client: 'Omar Haddad', whenIso: inDays(1), status: 'scheduled', ownerAgent: 'Layla Hassan' },
  { id: 'v2', property: 'Creek Edge · 1BR', community: 'Dubai Creek Harbour', client: 'Priya Nair', whenIso: inDays(2), status: 'scheduled', ownerAgent: 'Layla Hassan' },
  { id: 'v3', property: 'Burj Vista · Penthouse', community: 'Downtown Dubai', client: 'Aisha Al Marri', whenIso: inDays(3), status: 'scheduled', ownerAgent: 'Karim Aziz' },
  { id: 'v4', property: 'Maple · 3BR Villa', community: 'Dubai Hills Estate', client: 'James Whitfield', whenIso: days(1), status: 'completed', ownerAgent: 'Karim Aziz' },
  { id: 'v5', property: 'Peninsula · 1BR', community: 'Business Bay', client: 'Daniel Roberts', whenIso: days(2), status: 'completed', ownerAgent: 'Layla Hassan' },
  { id: 'v6', property: 'Binghatti Amber · Studio', community: 'JVC', client: 'Rahul Mehta', whenIso: days(3), status: 'no_show', ownerAgent: 'Sara Mensah' },
];

export function getViewings(_persona: Persona): Viewing[] {
  return VIEWINGS;
}

// ---------------------------------------------------------------------------
// Listings
// ---------------------------------------------------------------------------
function makeListings(): ListingRow[] {
  const base: Omit<ListingRow, 'coverImageUrl'>[] = [
    { id: 'p1', ref: 'IC-9001', title: 'Marina Gate · 2BR high floor', community: 'Dubai Marina', priceAed: 2450000, beds: 2, baths: 2, areaSqft: 1180, status: 'active', purpose: 'sale', views: 1842, leads: 23, savedBy: 64, updatedIso: hrs(8), ownerAgent: 'Layla Hassan' },
    { id: 'p2', ref: 'IC-9002', title: 'Burj Vista · Penthouse', community: 'Downtown Dubai', priceAed: 14500000, beds: 4, baths: 5, areaSqft: 3960, status: 'active', purpose: 'sale', views: 980, leads: 14, savedBy: 41, updatedIso: days(1), ownerAgent: 'Karim Aziz' },
    { id: 'p3', ref: 'IC-9003', title: 'Maple · 3BR Villa', community: 'Dubai Hills Estate', priceAed: 9200000, beds: 3, baths: 4, areaSqft: 2100, status: 'active', purpose: 'sale', views: 1320, leads: 19, savedBy: 52, updatedIso: days(2), ownerAgent: 'Karim Aziz' },
    { id: 'p4', ref: 'IC-9004', title: 'Creek Edge · 1BR', community: 'Dubai Creek Harbour', priceAed: 1797888, beds: 1, baths: 1, areaSqft: 720, status: 'pending_review', purpose: 'sale', views: 0, leads: 0, savedBy: 0, updatedIso: hrs(3), ownerAgent: 'Layla Hassan' },
    { id: 'p5', ref: 'IC-9005', title: 'Peninsula · 1BR furnished', community: 'Business Bay', priceAed: 1450000, beds: 1, baths: 2, areaSqft: 840, status: 'active', purpose: 'sale', views: 760, leads: 9, savedBy: 22, updatedIso: days(3), ownerAgent: 'Sara Mensah' },
    { id: 'p6', ref: 'IC-9006', title: 'Binghatti Amber · Studio', community: 'JVC', priceAed: 620000, beds: 0, baths: 1, areaSqft: 410, status: 'sold', purpose: 'sale', views: 2210, leads: 31, savedBy: 78, updatedIso: days(13), ownerAgent: 'Sara Mensah' },
    { id: 'p7', ref: 'IC-9007', title: 'Signature Villa · 4BR', community: 'Palm Jumeirah', priceAed: 22500000, beds: 4, baths: 5, areaSqft: 5200, status: 'draft', purpose: 'sale', views: 0, leads: 0, savedBy: 0, updatedIso: hrs(20), ownerAgent: 'Karim Aziz' },
  ];
  return base.map((b, i) => ({ ...b, coverImageUrl: IMG(i) }));
}
const LISTINGS = makeListings();

export function getListings(_persona: Persona): ListingRow[] {
  return LISTINGS;
}

// ---------------------------------------------------------------------------
// Commission
// ---------------------------------------------------------------------------
const COMMISSION: CommissionRow[] = [
  { id: 'cm1', period: 'Jun 2026', deal: 'IC-4590 · Arabian Ranches', grossAed: 135000, platformFeeAed: 0, netAed: 135000, status: 'pending', dateIso: days(6) },
  { id: 'cm2', period: 'May 2026', deal: 'IC-4501 · JVC', grossAed: 18000, platformFeeAed: 0, netAed: 18000, status: 'paid', dateIso: days(13) },
  { id: 'cm3', period: 'May 2026', deal: 'IC-4377 · Marina', grossAed: 72500, platformFeeAed: 0, netAed: 72500, status: 'paid', dateIso: days(27) },
  { id: 'cm4', period: 'Apr 2026', deal: 'IC-4202 · Downtown', grossAed: 210000, platformFeeAed: 0, netAed: 210000, status: 'paid', dateIso: days(54) },
  { id: 'cm5', period: 'Apr 2026', deal: 'IC-4188 · Business Bay', grossAed: 41000, platformFeeAed: 0, netAed: 41000, status: 'paid', dateIso: days(61) },
];

export function getCommission(_persona: Persona): CommissionRow[] {
  return COMMISSION;
}

// ---------------------------------------------------------------------------
// Agents (agency)
// ---------------------------------------------------------------------------
const AGENTS: AgentRow[] = [
  { id: 'a1', name: 'Karim Aziz', email: 'karim@nakheelhomes.ae', role: 'Team Lead', rera: 'BRN-28104', status: 'active', listings: 14, activeDeals: 6, ytdRevenueAed: 1820000, rating: 4.9, areas: ['Downtown Dubai', 'Dubai Hills Estate', 'Palm Jumeirah'] },
  { id: 'a2', name: 'Layla Hassan', email: 'layla@nakheelhomes.ae', role: 'Senior Agent', rera: 'BRN-31992', status: 'active', listings: 11, activeDeals: 5, ytdRevenueAed: 1340000, rating: 4.8, areas: ['Dubai Marina', 'Business Bay', 'JBR'] },
  { id: 'a3', name: 'Sara Mensah', email: 'sara@nakheelhomes.ae', role: 'Agent', rera: 'BRN-40551', status: 'active', listings: 8, activeDeals: 3, ytdRevenueAed: 610000, rating: 4.6, areas: ['JVC', 'Arjan', 'Dubai Sports City'] },
  { id: 'a4', name: 'Tomás Silva', email: 'tomas@nakheelhomes.ae', role: 'Agent', rera: 'BRN-44820', status: 'active', listings: 6, activeDeals: 2, ytdRevenueAed: 430000, rating: 4.5, areas: ['Dubai Creek Harbour', 'Meydan'] },
  { id: 'a5', name: 'Nadia Rahman', email: 'nadia@nakheelhomes.ae', role: 'Agent', rera: 'pending', status: 'invited', listings: 0, activeDeals: 0, ytdRevenueAed: 0, rating: 0, areas: [] },
];

export function getAgents(_persona: Persona): AgentRow[] {
  return AGENTS;
}

// ---------------------------------------------------------------------------
// Documents
// ---------------------------------------------------------------------------
function docsFor(persona: Persona): DocumentRow[] {
  if (persona === 'buyer_seller') {
    return [
      { id: 'doc1', name: 'Passport & Emirates ID', kind: 'Passport / EID', related: 'KYC verification', status: 'verified', updatedIso: days(20) },
      { id: 'doc2', name: 'Title Deed — Marina Gate', kind: 'Title Deed', related: 'IC-9001 · my listing', status: 'verified', updatedIso: days(8) },
      { id: 'doc3', name: 'Form A — listing agreement', kind: 'Form A', related: 'IC-9001 · my listing', status: 'pending', updatedIso: days(2) },
      { id: 'doc4', name: 'NOC from developer', kind: 'NOC', related: 'Sale · Marina Gate', status: 'missing', updatedIso: days(2) },
    ];
  }
  const shared: DocumentRow[] = [
    { id: 'doc5', name: 'RERA Broker Card', kind: 'RERA Card', related: 'Agent licence', status: 'verified', updatedIso: days(40) },
    { id: 'doc6', name: 'Form A — Burj Vista', kind: 'Form A', related: 'IC-9002', status: 'verified', updatedIso: days(9) },
    { id: 'doc7', name: 'Form F / MOU — Aisha Al Marri', kind: 'Form F / MOU', related: 'IC-4712', status: 'pending', updatedIso: days(2) },
    { id: 'doc8', name: 'Buyer passport — J. Whitfield', kind: 'Passport / EID', related: 'IC-4756', status: 'pending', updatedIso: days(1) },
  ];
  if (persona === 'agency') {
    return [
      { id: 'doc9', name: 'Trade Licence — Nakheel Homes RE', kind: 'Trade License', related: 'Agency · expires Mar 2027', status: 'verified', updatedIso: days(90) },
      ...shared,
    ];
  }
  return shared;
}

export function getDocuments(persona: Persona): DocumentRow[] {
  return docsFor(persona);
}

// ---------------------------------------------------------------------------
// Buyer/seller: enquiries + saved
// ---------------------------------------------------------------------------
const ENQUIRIES: EnquiryRow[] = [
  { id: 'e1', property: 'Marina Gate · 2BR', community: 'Dubai Marina', agent: 'Layla Hassan', channel: 'Chat', status: 'replied', sentIso: hrs(4) },
  { id: 'e2', property: 'Creek Edge · 1BR', community: 'Dubai Creek Harbour', agent: 'Layla Hassan', channel: 'WhatsApp', status: 'viewing_booked', sentIso: days(1) },
  { id: 'e3', property: 'Maple · 3BR Villa', community: 'Dubai Hills Estate', agent: 'Karim Aziz', channel: 'Email', status: 'awaiting', sentIso: days(2) },
  { id: 'e4', property: 'Peninsula · 1BR', community: 'Business Bay', agent: 'Sara Mensah', channel: 'Call', status: 'closed', sentIso: days(9) },
];
export function getEnquiries(): EnquiryRow[] {
  return ENQUIRIES;
}

const SAVED: SavedRow[] = [
  { id: 's1', ref: 'IC-9001', title: 'Marina Gate · 2BR high floor', community: 'Dubai Marina', priceAed: 2450000, beds: 2, baths: 2, areaSqft: 1180, coverImageUrl: IMG(0), priceChange: -50000, savedIso: hrs(6) },
  { id: 's2', ref: 'IC-9003', title: 'Maple · 3BR Villa', community: 'Dubai Hills Estate', priceAed: 9200000, beds: 3, baths: 4, areaSqft: 2100, coverImageUrl: IMG(2), priceChange: 0, savedIso: days(1) },
  { id: 's3', ref: 'IC-9005', title: 'Peninsula · 1BR furnished', community: 'Business Bay', priceAed: 1450000, beds: 1, baths: 2, areaSqft: 840, coverImageUrl: IMG(4), priceChange: 25000, savedIso: days(2) },
  { id: 's4', ref: 'IC-9002', title: 'Burj Vista · Penthouse', community: 'Downtown Dubai', priceAed: 14500000, beds: 4, baths: 5, areaSqft: 3960, coverImageUrl: IMG(1), priceChange: 0, savedIso: days(4) },
];
export function getSaved(): SavedRow[] {
  return SAVED;
}

// ---------------------------------------------------------------------------
// Credits ledger
// ---------------------------------------------------------------------------
const CREDITS: CreditEntry[] = [
  { id: 'cr1', reason: 'Off-plan reservation cashback — Creek Edge', delta: 24000, dateIso: days(3) },
  { id: 'cr2', reason: 'Referral bonus — Priya Nair joined', delta: 2000, dateIso: days(7) },
  { id: 'cr3', reason: 'Profile verification bonus', delta: 1000, dateIso: days(20) },
  { id: 'cr4', reason: 'Redeemed — service fee offset', delta: -5000, dateIso: days(24) },
];
export function getCredits(): CreditEntry[] {
  return CREDITS;
}
export function creditsBalance(): number {
  return CREDITS.reduce((s, c) => s + c.delta, 0);
}

// ---------------------------------------------------------------------------
// Activity + tasks (role-aware)
// ---------------------------------------------------------------------------
export function getActivity(persona: Persona): ActivityItem[] {
  if (persona === 'buyer_seller') {
    return [
      { id: 'ac1', icon: 'eye', text: 'Layla Hassan confirmed your viewing at Marina Gate', whenIso: hrs(3), tone: 'success' },
      { id: 'ac2', icon: 'wallet', text: 'AED 24,000 cashback credited from your Creek Edge reservation', whenIso: days(3), tone: 'accent' },
      { id: 'ac3', icon: 'heart', text: 'Price dropped AED 50,000 on a saved property (Marina Gate)', whenIso: days(1), tone: 'info' },
      { id: 'ac4', icon: 'message', text: 'New reply on your enquiry about Maple · 3BR Villa', whenIso: days(2), tone: 'neutral' },
    ];
  }
  if (persona === 'agency') {
    return [
      { id: 'ac1', icon: 'handshake', text: 'Karim Aziz moved IC-4712 (Burj Vista) to Form F / MOU', whenIso: hrs(5), tone: 'success' },
      { id: 'ac2', icon: 'user', text: 'Nadia Rahman accepted your team invite — pending RERA card', whenIso: days(1), tone: 'info' },
      { id: 'ac3', icon: 'target', text: '12 new leads routed across the team this week', whenIso: days(1), tone: 'accent' },
      { id: 'ac4', icon: 'building', text: 'Sara Mensah published a new listing in JVC', whenIso: days(2), tone: 'neutral' },
    ];
  }
  return [
    { id: 'ac1', icon: 'target', text: 'New lead: Omar Haddad · 2BR Dubai Marina (score 82)', whenIso: hrs(2), tone: 'accent' },
    { id: 'ac2', icon: 'handshake', text: 'Deal IC-4655 reached DLD Transfer — closing in 5 days', whenIso: days(3), tone: 'success' },
    { id: 'ac3', icon: 'eye', text: 'Viewing completed with James Whitfield at Maple Villa', whenIso: days(1), tone: 'info' },
    { id: 'ac4', icon: 'wallet', text: 'AED 135,000 commission pending payout (IC-4590)', whenIso: days(6), tone: 'warning' },
  ];
}

export function getTasks(persona: Persona): Task[] {
  if (persona === 'buyer_seller') {
    return [
      { id: 't1', label: 'Upload developer NOC for Marina Gate sale', due: 'Today', done: false, priority: 'high' },
      { id: 't2', label: 'Confirm viewing slot with Layla (Tue 4pm)', due: 'Tomorrow', done: false, priority: 'med' },
      { id: 't3', label: 'Review offer on your Marina Gate listing', due: 'In 2 days', done: false, priority: 'high' },
      { id: 't4', label: 'Complete KYC to unlock cashback withdrawal', due: 'Done', done: true, priority: 'low' },
    ];
  }
  if (persona === 'agency') {
    return [
      { id: 't1', label: 'Approve Nadia Rahman’s RERA card', due: 'Today', done: false, priority: 'high' },
      { id: 't2', label: 'Reassign 4 unattended leads (>24h)', due: 'Today', done: false, priority: 'high' },
      { id: 't3', label: 'Sign Form F / MOU for IC-4712', due: 'Tomorrow', done: false, priority: 'med' },
      { id: 't4', label: 'Renew trade licence reminder set', due: 'Done', done: true, priority: 'low' },
    ];
  }
  return [
    { id: 't1', label: 'Call Omar Haddad — new high-score lead', due: 'Today', done: false, priority: 'high' },
    { id: 't2', label: 'Send Form F to Aisha Al Marri', due: 'Today', done: false, priority: 'high' },
    { id: 't3', label: 'Prepare viewing pack for Creek Edge (Tue)', due: 'Tomorrow', done: false, priority: 'med' },
    { id: 't4', label: 'Follow up Daniel Roberts on offer', due: 'In 2 days', done: false, priority: 'med' },
  ];
}

// ---------------------------------------------------------------------------
// Analytics series (role-aware)
// ---------------------------------------------------------------------------
export interface Analytics {
  leadsByMonth: SeriesPoint[];
  sourceMix: { label: string; value: number; tone: Tone }[];
  topAreas: { label: string; value: number }[];
  conversion: { label: string; value: number }[];
}
export function getAnalytics(persona: Persona): Analytics {
  const scale = persona === 'agency' ? 4 : 1;
  return {
    leadsByMonth: [
      { label: 'Jan', value: 18 * scale }, { label: 'Feb', value: 22 * scale }, { label: 'Mar', value: 31 * scale },
      { label: 'Apr', value: 28 * scale }, { label: 'May', value: 39 * scale }, { label: 'Jun', value: 44 * scale },
    ],
    sourceMix: [
      { label: 'iClose search', value: 42, tone: 'accent' },
      { label: 'New Releases', value: 23, tone: 'info' },
      { label: 'Referral', value: 19, tone: 'success' },
      { label: 'WhatsApp', value: 16, tone: 'warning' },
    ],
    topAreas: [
      { label: 'Dubai Marina', value: 31 }, { label: 'Downtown Dubai', value: 24 },
      { label: 'Dubai Hills Estate', value: 19 }, { label: 'Business Bay', value: 14 }, { label: 'JVC', value: 12 },
    ],
    conversion: [
      { label: 'Leads', value: 100 }, { label: 'Qualified', value: 58 }, { label: 'Viewing', value: 37 },
      { label: 'Offer', value: 21 }, { label: 'Closed', value: 12 },
    ],
  };
}
export { COMMUNITIES };
