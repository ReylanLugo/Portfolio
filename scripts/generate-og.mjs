/**
 * Generates `public/og-image.png` (1200×630) from an inline SVG that mirrors
 * the portfolio's tech-noir brand. Run once when copy/branding changes:
 *
 *   pnpm exec node scripts/generate-og.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'og-image.png');

const W = 1200;
const H = 630;

const NAME = 'Reylan Lugo.';
const EYEBROW = 'AVAILABLE · REMOTE · LATAM';
const TAGLINE = 'Full-stack engineer · tech-noir interfaces, solid APIs.';
const FOOTER = 'reylanlugo.com';
const PILLS = ['OPEN · Q3 26', 'CARACAS / UTC-4', '~6 YRS'];

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#15151a"/>
      <stop offset="100%" stop-color="#0d0d10"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0" r="0.7">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.35"/>
      <stop offset="60%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="card-glow" cx="0.5" cy="0" r="0.9">
      <stop offset="0%" stop-color="#f97316" stop-opacity="0.55"/>
      <stop offset="65%" stop-color="#f97316" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
      <path d="M 56 0 L 0 0 0 56" fill="none" stroke="rgba(232,230,223,0.05)" stroke-width="1"/>
    </pattern>
    <filter id="cardShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="16"/>
      <feOffset dx="0" dy="20"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.65"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- background -->
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.6"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>

  <!-- Card-deck fan on the right. Cards share a bottom-center pivot at (1010, 580). -->
  <!-- Each back card shows ONLY its top edge (case label) since the front card covers the rest. -->
  <g transform="translate(1010, 580)">
    <!-- Slot 3: back-left, rotate -26 -->
    <g transform="rotate(-26) translate(-100, -432) scale(0.9)">
      <rect x="0" y="0" width="200" height="280" rx="18" fill="#15151a" stroke="rgba(249,115,22,0.18)" stroke-width="1.2"/>
      <text x="16" y="28" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#a8a69d" letter-spacing="2.2">CASE_04</text>
    </g>
    <!-- Slot 2: rotate -14 -->
    <g transform="rotate(-14) translate(-100, -424) scale(0.94)">
      <rect x="0" y="0" width="200" height="280" rx="18" fill="#15151a" stroke="rgba(249,115,22,0.25)" stroke-width="1.2"/>
      <text x="16" y="28" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#a8a69d" letter-spacing="2.2">CASE_03</text>
    </g>
    <!-- Slot 1: rotate -2 -->
    <g transform="rotate(-2) translate(-100, -416) scale(0.97)">
      <rect x="0" y="0" width="200" height="280" rx="18" fill="#15151a" stroke="rgba(249,115,22,0.30)" stroke-width="1.3"/>
      <text x="16" y="28" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#a8a69d" letter-spacing="2.2">CASE_02</text>
    </g>
    <!-- Slot 0: front, rotate +10, full content -->
    <g transform="rotate(10) translate(-100, -410)" filter="url(#cardShadow)">
      <rect x="0" y="0" width="200" height="280" rx="18" fill="#15151a" stroke="rgba(249,115,22,0.55)" stroke-width="1.6"/>
      <rect x="0" y="0" width="200" height="280" rx="18" fill="url(#card-glow)" opacity="0.95"/>
      <text x="16" y="28" font-family="ui-monospace, SFMono-Regular, monospace" font-size="10" fill="#a8a69d" letter-spacing="2.2">CASE_01</text>
      <g transform="translate(160, 14)">
        <rect width="28" height="20" rx="3" fill="#e7c87a"/>
        <rect x="1" y="1" width="26" height="18" rx="2" fill="none" stroke="rgba(0,0,0,0.25)"/>
        <line x1="6" y1="6" x2="22" y2="6" stroke="rgba(0,0,0,0.18)"/>
        <line x1="6" y1="10" x2="22" y2="10" stroke="rgba(0,0,0,0.18)"/>
        <line x1="6" y1="14" x2="22" y2="14" stroke="rgba(0,0,0,0.18)"/>
      </g>
      <rect x="78" y="116" width="44" height="44" rx="6" fill="rgba(249,115,22,0.04)" stroke="rgba(249,115,22,0.38)" transform="rotate(45 100 138)"/>
      <text x="16" y="220" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="600" font-size="32" fill="#e8e6df" letter-spacing="-0.4">VAULT</text>
      <text x="16" y="248" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="600" font-size="32" fill="#e8e6df" letter-spacing="-0.4">OS</text>
      <text x="16" y="265" font-family="ui-monospace, SFMono-Regular, monospace" font-size="8.5" fill="#a8a69d" letter-spacing="1.8">operating system · 2025</text>
    </g>
  </g>

  <!-- Top eyebrow pill (matches the hero status pill) -->
  <g transform="translate(80, 80)">
    <rect x="0" y="0" width="320" height="32" rx="16" fill="rgba(20,20,28,0.6)" stroke="rgba(232,230,223,0.18)"/>
    <circle cx="18" cy="16" r="4" fill="#f97316"/>
    <text x="32" y="21" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" fill="#a8a69d" letter-spacing="2.6">${EYEBROW}</text>
  </g>

  <!-- Big name -->
  <g transform="translate(80, 280)">
    <text font-family="'Space Grotesk', system-ui, sans-serif" font-weight="600" font-size="120" fill="#e8e6df" letter-spacing="-3">
      <tspan>Reylan</tspan>
    </text>
    <text y="120" font-family="'Space Grotesk', system-ui, sans-serif" font-weight="600" font-size="120" letter-spacing="-3">
      <tspan fill="#e8e6df">Lugo</tspan>
      <tspan fill="#f97316">.</tspan>
    </text>
  </g>

  <!-- Tagline -->
  <g transform="translate(80, 510)">
    <text font-family="'Space Grotesk', system-ui, sans-serif" font-size="24" fill="#a8a69d">${TAGLINE}</text>
  </g>

  <!-- Pills row (matches hero quickFacts) -->
  <g transform="translate(80, 555)" font-family="ui-monospace, SFMono-Regular, monospace" font-size="12" letter-spacing="2.4">
    <g>
      <rect x="0" y="0" width="170" height="30" rx="15" fill="rgba(249,115,22,0.06)" stroke="rgba(249,115,22,0.45)"/>
      <circle cx="14" cy="15" r="3" fill="#f97316"/>
      <text x="26" y="20" fill="#f97316">${PILLS[0]}</text>
    </g>
    <g transform="translate(184, 0)">
      <rect x="0" y="0" width="180" height="30" rx="15" fill="rgba(20,20,28,0.4)" stroke="rgba(232,230,223,0.18)"/>
      <text x="14" y="20" fill="#a8a69d">${PILLS[1]}</text>
    </g>
    <g transform="translate(378, 0)">
      <rect x="0" y="0" width="100" height="30" rx="15" fill="rgba(20,20,28,0.4)" stroke="rgba(232,230,223,0.18)"/>
      <text x="14" y="20" fill="#a8a69d">${PILLS[2]}</text>
    </g>
  </g>

  <!-- Bottom URL -->
  <text x="${W - 80}" y="${H - 36}" text-anchor="end" font-family="ui-monospace, SFMono-Regular, monospace" font-size="14" fill="#6b6a64" letter-spacing="3">${FOOTER}</text>
</svg>
`;

async function main() {
  mkdirSync(dirname(out), { recursive: true });
  const buffer = Buffer.from(svg);
  await sharp(buffer, { density: 144 })
    .resize(W, H, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(`✓ wrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
