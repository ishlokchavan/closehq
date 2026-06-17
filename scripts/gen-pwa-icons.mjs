// Generates the PWA / home-screen app icons: a white background with the
// "iClose" wordmark, in the brand ink colour. Run: node scripts/gen-pwa-icons.mjs
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const INK = '#0A0A0B';

/**
 * Build the wordmark SVG. `pad` is the fraction of the canvas kept clear on
 * each side — bigger padding for maskable icons so the word stays inside the
 * platform's safe zone when cropped to a circle/squircle.
 */
function wordmarkSvg(size, pad = 0.16) {
  const inner = size * (1 - pad * 2);
  // "iClose" is 6 glyphs; this font-size keeps it within the inner width.
  const fontSize = inner / 4.1;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="#ffffff"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle"
        font-family="DejaVu Sans, Verdana, sans-serif" font-size="${fontSize}"
        letter-spacing="-${fontSize * 0.03}" fill="${INK}">
    <tspan font-weight="400">i</tspan><tspan font-weight="700">Close</tspan>
  </text>
</svg>`;
}

async function png(size, pad, out) {
  await sharp(Buffer.from(wordmarkSvg(size, pad))).png().toFile(join(root, out));
  console.log('✓', out);
}

await mkdir(join(root, 'public/icons'), { recursive: true });

// Standard PWA icons (Android / desktop install).
await png(192, 0.16, 'public/icons/icon-192.png');
await png(512, 0.16, 'public/icons/icon-512.png');
// Maskable variants — extra padding so the wordmark survives the safe-zone crop.
await png(192, 0.26, 'public/icons/maskable-192.png');
await png(512, 0.26, 'public/icons/maskable-512.png');
// iOS home-screen icon (apple-touch-icon, must be PNG). Next picks up app/apple-icon.png.
await png(180, 0.16, 'app/apple-icon.png');

console.log('Done.');
