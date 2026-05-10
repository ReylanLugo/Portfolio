// src/i18n/locales/en.ts
import type { Catalog } from '../catalog';

export const en = {
  a11y: {
    languageSwitcher: 'Language',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    deckAdvance: 'Advance deck card',
  },
  nav: {
    work: 'Work',
    stack: 'Stack',
    experience: 'Experience',
    about: 'About',
    contact: 'Contact',
    hire: 'Hire me',
  },
  hero: {
    available: 'Available · Remote · LATAM',
    firstName: 'Reylan',
    lastName: 'Lugo',
    tagline:
      'I build systems that breathe — tech-noir interfaces, solid APIs, code that ages well.',
    cta: { deck: 'See the deck', github: 'GitHub' },
    facts: {
      open: 'OPEN · Q3 26',
      location: 'CARACAS / UTC-4',
      years: '~6 YRS',
    },
    scrollHint: 'scroll ↓',
  },
  sections: {
    work: {
      eyebrow: 'The Deck — work',
      title: 'Four projects, one [accent]obsession[/accent]: tools that feel alive.',
      description:
        "Each card is a system in production or close to it. Scroll to stack them like a deck — whichever's at the front tells its story.",
    },
    stack: {
      eyebrow: 'Stack',
      title: 'The [accent]heavy-hitting[/accent] tools I already battle-tested in prod.',
      description:
        "I don't collect logos: this is the stack I use daily and would put my hands on the fire for.",
    },
    experience: {
      eyebrow: 'Track record',
      title: 'Six years [accent]building[/accent] and breaking things on the web.',
      description: 'An edited slice of the places where I learned things I now use almost daily.',
    },
    about: {
      eyebrow: 'About',
      title:
        'I build software like [accent]someone wiring synthesizers[/accent]: small modules, clear connections, big sound.',
      description:
        "I work remotely from LATAM. I obsess over DX details, animations that don't get in the way, and systems that age without pain.",
    },
    contact: { eyebrow: 'Contact' },
  },
  about: {
    p1: "I'm {name}, a full stack engineer focused on product. I'm comfortable on the front (React, TS, motion) and on the back (Node, Postgres, simple infra that scales).",
    p2: "I design before coding, but I'm not married to Figma: most of the time the most useful prototype is a branch with HMR running. I'd rather ship vertical thin slices than infinite mockups.",
    p3: "When I'm not in the editor: reading sci-fi, getting lost in synth hardware, or asking for another coffee.",
    statsLabel: 'stats',
    metricsLabels: {
      yearsBuilding: 'years building',
      projectsInProd: 'projects in prod',
      commitsPerYear: 'commits / year',
      coffeesPerSprint: 'coffees per sprint',
    },
  },
  contact: {
    eyebrow: "let's build",
    title: "Got an idea? Let’s build it [accent]this week[/accent].",
    cv: 'Download CV',
  },
  footer: {
    rights: '© {year} · {name} · Built from scratch',
  },
  projects: {
    'vault-os': {
      name: 'Vault.OS',
      tagline: 'Operating system for personal knowledge.',
      description:
        'Terminal-style modular system to capture, link, and resurrect notes. Local-first sync, E2E encryption, in-client full-text search.',
      preview: {
        title: '~/vault.os — fish · 92×24',
        lines: [
          '$ vault open --workspace=lab',
          '→ 1,284 notes · 312 links · 18 stacks',
          '$ vault search "neon synthesis"',
          '⚡ 7 results · ranked by recency × edges',
          '$ vault graph --depth=2',
          '◉◉◉◉ rendering constellation…',
          '$ vault export --format=mdx',
          '✓ 312 files · 4.2 MB · gzipped',
          '$ vault sync --peer=phone',
          '↻ 18 changes · 0 conflicts · 92 ms',
        ],
      },
      highlights: [
        { label: 'notes indexed', value: '1.2k' },
        { label: 'search p95', value: '<50ms' },
        { label: 'sync model', value: 'CRDT' },
        { label: 'encryption', value: 'E2E' },
      ],
    },
    'atlas-api': {
      name: 'Atlas API',
      tagline: 'Geospatial APIs at edge speed.',
      description:
        'OSM-based geocoding and routing platform, distributed at the edge. SDKs in TS and Python, usage-based billing, native observability.',
      preview: {
        title: 'atlas-sdk › geocode.ts',
        lines: [
          'import { atlas } from "@atlas/sdk";',
          '',
          'const r = await atlas.geocode({',
          '  q: "Caracas, VE",',
          '  precision: "rooftop",',
          '  hint: { country: "VE" },',
          '});',
          '// → { lat: 10.491, lon: -66.879 }',
          '// → confidence 0.97 · p95 28ms',
          '',
          'await atlas.routing.matrix({',
          '  from: r, to: stops, mode: "drive",',
          '});',
        ],
      },
      highlights: [
        { label: 'edge p95', value: '28ms' },
        { label: 'pop locations', value: '275+' },
        { label: 'monthly SLA', value: '99.99%' },
        { label: 'SDKs', value: 'TS · Py' },
      ],
    },
    'ink-cms': {
      name: 'Ink CMS',
      tagline: 'Headless CMS for long-form storytelling.',
      description:
        'Opinionated CMS for digital magazines — block-based MDX editor, versioning, branch previews, build hooks to Vercel/Netlify.',
      preview: {
        title: 'ink.studio/issue-04/draft',
        lines: [
          'Issue 04 · The Quiet Web',
          '— Draft · 12 blocks · 4 contributors',
          '◐ live preview · branch feature/cover-v3',
          '↳ block-03 · gallery (8 images) · MDX',
          '↳ block-07 · interview · 2,140 words',
          '✓ build passing · 18 s · cache hit 92%',
          '↗ deploy ready · 2 reviewers approved',
          '◌ scheduled · 2026-05-12 09:00 UTC',
        ],
      },
      highlights: [
        { label: 'issues shipped', value: '12' },
        { label: 'avg deploy', value: '< 30s' },
        { label: 'editor', value: 'MDX' },
        { label: 'collaborators', value: '4 live' },
      ],
    },
    'pulse-monitor': {
      name: 'Pulse Monitor',
      tagline: "Status pages that don't lie.",
      description:
        'Status & uptime with regional probes, automatic post-mortems, and incident RSS. Self-hostable as a single binary.',
      preview: {
        title: 'pulse · status',
        lines: [
          'all systems · operational',
          'api · 99.992 % · 7d',
          'edge · 99.870 % · 7d',
          'queue · degraded · investigating',
          'db primary · 99.999 % · 7d',
          'cdn · 99.978 % · 7d',
        ],
      },
      highlights: [
        { label: 'probe regions', value: '14' },
        { label: 'check interval', value: '30s' },
        { label: 'distribution', value: '1 binary' },
        { label: 'license', value: 'self-host' },
      ],
    },
    'relay-gateway': {
      name: 'Relay',
      tagline: 'API gateway with auth and rate limiting by default.',
      description:
        'Opinionated gateway in Rust: auth (JWT/HMAC), per-API-key rate limits, request shaping, native OTel observability. TOML config, hot reload.',
      preview: {
        title: 'POST /v1/checkout',
        request: [
          '{',
          '  "amount": 4200,',
          '  "currency": "usd",',
          '  "customer": "cus_8mZk2V",',
          '  "metadata": { "ref": "ord_91" }',
          '}',
        ],
        response: [
          '{',
          '  "id": "cs_3LpQ…",',
          '  "url": "https://relay.app/c/cs_3LpQ",',
          '  "status": "open",',
          '  "expires_at": 1714854900',
          '}',
        ],
      },
      highlights: [
        { label: 'overhead p95', value: '< 2ms' },
        { label: 'auth modes', value: 'JWT · HMAC' },
        { label: 'config', value: 'TOML · hot' },
        { label: 'tracing', value: 'OTel native' },
      ],
    },
    'tempo-analytics': {
      name: 'Tempo',
      tagline: 'Time-series analytics, no SQL in the UI.',
      description:
        'Analytical dashboard for time series. Declarative `TQL` language that compiles to SQL, slope/anomaly alerts, signed embeds.',
      preview: {
        title: 'requests · last 24h',
        metric: 'p95 latency',
        value: '128 ms',
        delta: '−12% vs 7d',
      },
      highlights: [
        { label: 'rows scanned/s', value: '8.4M' },
        { label: 'query lang', value: 'TQL' },
        { label: 'embeds', value: 'signed' },
        { label: 'alert engine', value: 'slope · σ' },
      ],
    },
    'mosaic-studio': {
      name: 'Mosaic',
      tagline: 'Asset library with AI tagging and mood boards.',
      description:
        'Visual library for creative teams. Automatic tagging with embeddings, search by color/shape/mood, collaborative boards.',
      preview: {
        title: 'board · neon-noir',
        tileLabels: [
          'cover · 01',
          'palette',
          'type · grotesk',
          'photo · 12',
          'gradient · 03',
          'icon set',
          'video · 08',
          'logo mark',
          'pattern',
        ],
      },
      highlights: [
        { label: 'similarity', value: 'pgvector' },
        { label: 'auto tags', value: 'CLIP · OCR' },
        { label: 'boards', value: 'realtime' },
        { label: 'storage', value: 'S3 · CDN' },
      ],
    },
  },
  experience: {
    'avocado-block': {
      role: 'Senior Full Stack Engineer',
      bullets: [
        'I lead the architecture of internal products (Next.js + Postgres + tRPC) prioritizing DX and reusability.',
        'I cut new-service bootstrap time by 70% with a custom starter kit.',
        'Technical mentoring of 4 mid/jr engineers on React patterns, testing, and lightweight DDD.',
      ],
    },
    'independent': {
      role: 'Contract Engineer',
      bullets: [
        'Designed and shipped edge geocoding APIs for 3 B2B clients (sub-30ms p95).',
        'Built data-heavy dashboards with virtualization and streaming over >1M-row datasets.',
        'Migrated 2 PHP monoliths to Node + Postgres with no downtime using dual-write + shadow reads.',
      ],
    },
    'stratos-labs': {
      role: 'Full Stack Developer',
      bullets: [
        'Built the first version of the product (React + Rails) focused on time-to-first-aha.',
        'Owned the CI/CD pipeline (GitHub Actions + Fly.io), cutting deploys from 18 to 4 min.',
        'Implemented internal feature flags and A/B experimentation.',
      ],
    },
    'self-taught': {
      role: 'Building things on the internet',
      bullets: [
        'Learned JS, Python, Linux and SQL by building public projects on GitHub.',
        'First freelance gigs: landings, scrapers, and bots for local SMBs.',
      ],
    },
  },
} satisfies Catalog;
