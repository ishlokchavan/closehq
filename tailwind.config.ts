import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Sellit.com-inspired design system
        cream: '#F5F0E5',        // main page background (warm cream)
        lime: {
          DEFAULT: '#B5F452',    // primary CTA button (neon lime-green)
          dark: '#8BC43A',       // lime hover state
          text: '#2A5F00',       // dark green for label text on cream
        },
        navy: {
          DEFAULT: '#0D1B3E',    // dark section background
          light: '#162447',      // slightly lighter navy
        },
        sellit: {
          muted: '#6B6B6B',      // body / muted text
          border: '#E2DDDC',     // subtle card borders on cream
        },

        // Legacy Apple-inspired neutrals (kept for other pages)
        'gold-accent': '#e8b84b',
        ink: {
          DEFAULT: '#1d1d1f',
        ink: {
          DEFAULT: '#1d1d1f',
          900: '#1d1d1f',
          800: '#2c2c2e',
          700: '#3a3a3c',
        },
        graphite: {
          DEFAULT: '#6e6e73',
          light: '#86868b',
          dark: '#424245',
        },
        hairline: '#d2d2d7',
        mist: '#f5f5f7',
        fog: '#fbfbfd',
        paper: '#ffffff',
        accent: {
          DEFAULT: '#0071e3',
          hover: '#0077ed',
          dark: '#0058a3',
        },

        // Legacy aliases so existing className strings don't break
        bone: {
          DEFAULT: '#f5f5f7',
          100: '#fbfbfd',
          200: '#f5f5f7',
          300: '#e8e8ed',
        },
        gold: {
          DEFAULT: '#1d1d1f',
          light: '#3a3a3c',
          dark: '#1d1d1f',
          deep: '#000000',
        },
        sand: '#86868b',
      },
      fontFamily: {
        display: ['var(--font-display)', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'SF Pro Text', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'ui-serif', 'serif'],
        mono: ['var(--font-mono)', 'SF Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.022em',
        tight: '-0.015em',
        widest: '0.18em',
      },
      borderRadius: {
        apple: '18px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.04)',
        'card-hover': '0 2px 4px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)',
        elevated: '0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)',
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        marquee: 'marquee 40s linear infinite',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
