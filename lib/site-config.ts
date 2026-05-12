export const siteConfig = {
  name: 'iClose',
  legalName: 'iClose Real Estate Platform',
  description:
    "The learning platform for Dubai's secondary real estate market. Learn from area, building, and community specialists.",
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://iclose.ae',
  ogImage: '/og-image.jpg',
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'hello@iclose.ae',
  address: {
    locality: 'Dubai',
    country: 'AE',
  },
  keywords: [
    'Dubai real estate learning',
    'Dubai secondary market',
    'real estate LMS Dubai',
    'Dubai property specialist',
    'iClose Academy',
    'Dubai building knowledge',
    'real estate education Dubai',
    'iClose Dubai',
  ],
} as const;
