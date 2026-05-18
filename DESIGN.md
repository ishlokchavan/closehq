# iClose — Design System

## Color Palette

Apple-inspired neutrals with near-zero chroma tint. Light mode only.

| Token | Value | Role |
|---|---|---|
| `paper` | `#ffffff` | Page background, card fill |
| `fog` | `#fbfbfd` | Subtle alternate background |
| `mist` | `#f5f5f7` | Section backgrounds, input fills |
| `hairline` | `#d2d2d7` | Borders, dividers |
| `graphite-light` | `#86868b` | Tertiary text, muted icons |
| `graphite` | `#6e6e73` | Secondary text, captions |
| `graphite-dark` | `#424245` | Body text, supporting copy |
| `ink` | `#1d1d1f` | Primary text, headings, key UI |
| `ink-800` | `#2c2c2e` | Dark surfaces |
| `ink-700` | `#3a3a3c` | Hover states |
| `accent` | `#0071e3` | Primary CTA, links |
| `accent-hover` | `#0077ed` | CTA hover |

**Color strategy: Restrained.** Tinted neutrals carry the page. Accent (`#0071e3`) is used at <=10% of surface area. No gradients. No decorative color washes.

**Theme: Light only.** iClose is used by professionals in daytime working environments. Light mode is the correct answer for the context.

## Typography

System fonts via CSS variables. Fallback: `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`.

| Variable | Family | Role |
|---|---|---|
| `--font-display` | Inter Tight (Google, self-hosted) | Headlines, display text |
| `--font-sans` | Inter (Google, self-hosted) | Body, UI, captions |
| `--font-mono` | JetBrains Mono | Code, data |

### Type Scale (Tailwind classes)

| Class | Size | Weight | Tracking | Use |
|---|---|---|---|---|
| `display-xl` | `clamp(2.25rem, 8vw, 7rem)` | 600 | `-0.04em` | Hero headlines |
| `display-lg` | `clamp(1.875rem, 5.5vw, 4.5rem)` | 600 | `-0.028em` | Section heads |
| `display-md` | `clamp(1.5rem, 4vw, 3.25rem)` | 600 | `-0.022em` | Large callouts |
| `display-sm` | `clamp(1.25rem, 2.6vw, 2rem)` | 600 | `-0.018em` | Card heads |
| `subhead` | `clamp(1rem, 1.4vw, 1.3rem)` | 400 | `-0.012em` | Section subheads |
| `eyebrow` | `0.6875rem` | 500 | `tracking-tight` | Category labels (sentence case, never uppercase) |

Body line length: 65–72ch maximum.

## Elevation and Shadows

| Token | Value | Use |
|---|---|---|
| `shadow-card` | `0 1px 2px rgba(0,0,0,0.04), 0 4px 24px rgba(0,0,0,0.04)` | Default card state |
| `shadow-card-hover` | `0 2px 4px rgba(0,0,0,0.06), 0 12px 40px rgba(0,0,0,0.08)` | Card hover |
| `shadow-elevated` | `0 8px 32px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)` | Modals, popovers |

## Spacing and Layout

| Class | Value | Use |
|---|---|---|
| `container-wide` | `max-w-[1440px] px-4/6/8/12` | Full-width sections |
| `container-x` | `max-w-[1024px] px-4/6/8` | Text-heavy content |
| `rounded-apple` | `18px` | Cards, buttons, inputs |

Section vertical rhythm: `py-16 sm:py-20 md:py-24 lg:py-32`

## Motion

Library: Framer Motion.

**Standard reveal:** `opacity: 0 to 1, y: 24 to 0`, duration `0.7-0.9s`, easing `[0.22, 1, 0.36, 1]` (expo ease-out).

Stagger delay: `+0.1s` per element. Trigger: `whileInView` with `once: true, margin: '-60px'`.

Never animate layout properties (width, height, padding). No bounce or elastic easing.

## Key Component Patterns

### `.card-surface`
White background, `rounded-apple`, `border border-hairline/60`. Featured variant: `ring-2 ring-ink`.

### `.card-mist`
Mist background, `rounded-apple`. Used for step cards and neutral callouts.

### `.applelink`
`inline-flex items-center gap-1 text-accent text-base font-normal hover:underline` + SVG chevron.

### Eyebrows
`text-[11px] font-medium tracking-tight text-graphite` — sentence case only. Never uppercase, never wide tracking.

### Buttons
Primary: `bg-ink text-white rounded-full px-6 py-3 font-medium` — black pill.
Secondary: `bg-mist text-ink rounded-full`.
No gradient fills. Accent blue is links only.

### Section Rhythm
Alternating: `bg-paper` and `bg-mist`. Never `bg-fog` for full sections.

## Absolute Bans (project-specific)

- **No gold.** The `gold` tokens alias to `ink`. Do not introduce amber/gold colors.
- **No luxury photography.** No lifestyle shots of skylines, penthouses, or high-net-worth imagery.
- **No gradient text.** Emphasis via weight and scale only.
- **No side-stripe borders** on cards or list items.
- **No all-caps eyebrows.** Sentence case with `tracking-tight` always.
