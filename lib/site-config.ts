export const siteConfig = {
  name: 'CloseHQ',
  legalName: 'CloseHQ Real Estate Platform',
  description:
    'Close Dubai property deals on your terms. Up to 90% commission, advance on SPA, and no monthly fees — for freelance agents and connectors.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://closehq.ae',
  ogImage: '/og-image.jpg',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'deals@closehq.ae',
  whatsappMessage: 'Hi, I want to start closing deals with your platform',
  address: {
    locality: 'Dubai',
    country: 'AE',
  },
  keywords: [
    'real estate agent commission Dubai',
    'freelance real estate broker UAE',
    'Dubai off plan commission',
    'high commission real estate Dubai',
    'real estate platform Dubai',
    'broker license free Dubai',
    'property agent Dubai commission',
  ],
} as const;

export const whatsappLink = (message?: string) => {
  const msg = encodeURIComponent(message || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
};
