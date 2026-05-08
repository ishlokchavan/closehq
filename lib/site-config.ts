export const siteConfig = {
  name: 'iClose',
  legalName: 'iClose Real Estate Platform',
  description:
    'Close Dubai property deals on your terms. Earn up to 100% commission, paid within 24 hours, and stay completely anonymous — built for freelance agents and connectors.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iclose.ae',
  ogImage: '/og-image.jpg',
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '971501234567',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'deals@iclose.ae',
  whatsappMessage: 'Hi, I want to start closing deals with iClose',
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
    'iClose Dubai',
  ],
} as const;

export const whatsappLink = (message?: string) => {
  const msg = encodeURIComponent(message || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${msg}`;
};
