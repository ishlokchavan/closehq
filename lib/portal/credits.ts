/**
 * iClose Credits — reward currency.
 *
 * Product/legal note: we deliberately DO NOT surface a credit→AED conversion
 * rate or any AED-equivalent value of a credit balance anywhere in the UI.
 * Members see their balance in credits, and choose a *redemption format*
 * (AED, USD, USDT or a gift) at the point of redemption. The internal rate
 * below is used only for back-office settlement, never rendered to users.
 */
const CREDIT_SETTLEMENT_RATE_INTERNAL = 0.5; // back-office only — never display

/**
 * Size a credit award from a base AED reward. Returns a CREDITS figure (credits
 * are shown to users; the underlying rate is not). Used only to compute how
 * many credits an award is worth — never to display an AED value.
 */
export function aedToCredits(aed: number): number {
  return Math.round(aed / CREDIT_SETTLEMENT_RATE_INTERNAL);
}

export type IconKey =
  | 'building' | 'users' | 'tag' | 'badge' | 'wallet' | 'gift' | 'receipt' | 'bank'
  | 'coins' | 'dollar' | 'plane' | 'device' | 'gem' | 'shopping' | 'dining' | 'card';

export interface CreditMethod {
  iconKey: IconKey;
  title: string;
  body: string;
}

/** Ways to earn credits. */
export const EARN_METHODS: CreditMethod[] = [
  { iconKey: 'building', title: 'Invest in off-plan', body: 'Earn credits when you reserve an off-plan property through iClose — on top of special pricing.' },
  { iconKey: 'users', title: 'Refer a friend', body: 'Share your referral link. When someone you refer transacts, you both earn credits.' },
  { iconKey: 'tag', title: 'Buy or sell on iClose', body: 'Every completed deal returns value — and credits stack on top.' },
  { iconKey: 'badge', title: 'Complete verification', body: 'Verify your profile and documents to unlock bonus credits and higher limits.' },
];

/** Redemption formats — what credits can become. No values are shown. */
export interface RedeemFormat {
  key: 'aed' | 'usd' | 'usdt' | 'gifts';
  label: string;
  tagline: string;
  iconKey: IconKey;
  /** Tailwind tint classes for the format tile. */
  tint: string;
}

export const REDEEM_FORMATS: RedeemFormat[] = [
  { key: 'aed', label: 'AED', tagline: 'Straight to any UAE bank account.', iconKey: 'bank', tint: 'bg-journey-seller/25 text-[#067a55]' },
  { key: 'usd', label: 'USD', tagline: 'Cash out in US dollars, anywhere.', iconKey: 'dollar', tint: 'bg-accent/10 text-accent' },
  { key: 'usdt', label: 'USDT', tagline: 'Sent to your crypto wallet in minutes.', iconKey: 'coins', tint: 'bg-journey-agent/25 text-[#b45309]' },
  { key: 'gifts', label: 'Gifts', tagline: 'Turn credits into experiences & rewards.', iconKey: 'gift', tint: 'bg-journey-buyer/20 text-[#b51e9e]' },
];

/** Curated gift catalogue — chosen to feel premium and Dubai-native. */
export interface GiftOption {
  iconKey: IconKey;
  title: string;
  body: string;
  tint: string;
}

export const GIFT_OPTIONS: GiftOption[] = [
  { iconKey: 'plane', title: 'Travel & staycations', body: 'Five-star nights and flight vouchers — go anywhere.', tint: 'bg-journey-buyer/15 text-[#b51e9e]' },
  { iconKey: 'device', title: 'Apple & tech', body: 'The latest iPhone, MacBook, iPad or AirPods.', tint: 'bg-mist text-ink' },
  { iconKey: 'gem', title: 'Gold & jewellery', body: 'Certified gold and fine pieces — a Dubai classic.', tint: 'bg-journey-agent/20 text-[#b45309]' },
  { iconKey: 'shopping', title: 'Luxury shopping', body: 'Dubai Mall & Mall of the Emirates gift cards.', tint: 'bg-journey-seller/20 text-[#067a55]' },
  { iconKey: 'dining', title: 'Fine dining', body: 'Tasting menus at the city’s best tables.', tint: 'bg-accent/10 text-accent' },
  { iconKey: 'card', title: 'Everyday gift cards', body: 'Amazon, Noon, Careem and dozens more.', tint: 'bg-mist text-ink' },
];
