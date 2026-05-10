export type ProjectAccent =
  | 'orange'
  | 'amber'
  | 'cyan'
  | 'violet'
  | 'green'
  | 'rose';

export type PreviewKind =
  | 'terminal'
  | 'editor'
  | 'browser'
  | 'mobile'
  | 'api'
  | 'graph'
  | 'gallery';

export type Preview =
  | { kind: 'terminal'; title: string; lines?: string[] }
  | { kind: 'editor'; title: string; lines?: string[] }
  | { kind: 'browser'; title: string; lines?: string[] }
  | { kind: 'mobile'; title: string; lines?: string[] }
  | {
      kind: 'api';
      title: string;
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      endpoint: string;
      status: number;
      latency: string;
      request?: string[];
      response: string[];
    }
  | {
      kind: 'graph';
      title: string;
      metric: string;
      value: string;
      delta?: string;
      points: number[];
      ticks?: string[];
    }
  | {
      kind: 'gallery';
      title: string;
      tiles: { label: string; tone: number }[];
    };

export type Project = {
  id: string;
  index: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  year: string;
  role: string;
  href?: string;
  image?: string;
  accent?: ProjectAccent;
  preview?: Preview;
  highlights?: { label: string; value: string }[];
};

export const projects: Project[] = [
  {
    id: 'vault-os',
    index: '01',
    name: 'Vault.OS',
    tagline: 'Operating system for personal knowledge.',
    description:
      'Sistema modular tipo terminal para capturar, enlazar y resucitar notas. Sync local-first, cifrado E2E, full-text search en cliente.',
    stack: ['React', 'Tauri', 'Rust', 'SQLite', 'CRDT'],
    year: '2025',
    role: 'Lead engineer',
    accent: 'orange',
    preview: {
      kind: 'terminal',
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
  {
    id: 'atlas-api',
    index: '02',
    name: 'Atlas API',
    tagline: 'Geospatial APIs at edge speed.',
    description:
      'Plataforma de geocoding y routing sobre OSM, distribuida en edge. SDKs en TS y Python, billing por uso, observabilidad nativa.',
    stack: ['Node', 'Postgres+PostGIS', 'Redis', 'Cloudflare Workers'],
    year: '2024',
    role: 'Backend & DX',
    accent: 'amber',
    preview: {
      kind: 'editor',
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
  {
    id: 'ink-cms',
    index: '03',
    name: 'Ink CMS',
    tagline: 'Headless CMS para narrativas largas.',
    description:
      'CMS opinado para revistas digitales — editor MDX en bloques, versionado, preview en branch, build hooks a Vercel/Netlify.',
    stack: ['Next.js', 'tRPC', 'Drizzle', 'Postgres', 'S3'],
    year: '2024',
    role: 'Founder · Full stack',
    accent: 'cyan',
    preview: {
      kind: 'browser',
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
  {
    id: 'pulse-monitor',
    index: '04',
    name: 'Pulse Monitor',
    tagline: 'Status pages que no mienten.',
    description:
      'Status & uptime con probes regionales, post-mortems automáticos y RSS de incidentes. Self-hostable en un binario.',
    stack: ['Go', 'NATS', 'ClickHouse', 'Svelte'],
    year: '2023',
    role: 'Solo build',
    accent: 'violet',
    preview: {
      kind: 'mobile',
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
  {
    id: 'relay-gateway',
    index: '05',
    name: 'Relay',
    tagline: 'API gateway con auth y rate limit por defecto.',
    description:
      'Gateway opinado en Rust: auth (JWT/HMAC), rate-limit por API key, request shaping, observabilidad nativa OTel. Config en TOML, hot reload.',
    stack: ['Rust', 'Tokio', 'Axum', 'OpenTelemetry', 'Redis'],
    year: '2025',
    role: 'Solo build',
    accent: 'green',
    preview: {
      kind: 'api',
      title: 'POST /v1/checkout',
      method: 'POST',
      endpoint: '/v1/checkout/sessions',
      status: 201,
      latency: '34ms',
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
  {
    id: 'tempo-analytics',
    index: '06',
    name: 'Tempo',
    tagline: 'Time-series analytics, sin SQL en la UI.',
    description:
      'Dashboard analítico para series de tiempo. Lenguaje declarativo `TQL` que compila a SQL, alertas por slope/anomaly, embeds firmados.',
    stack: ['TypeScript', 'ClickHouse', 'Rust', 'D3', 'WebGL'],
    year: '2024',
    role: 'Founder',
    accent: 'cyan',
    preview: {
      kind: 'graph',
      title: 'requests · last 24h',
      metric: 'p95 latency',
      value: '128 ms',
      delta: '−12% vs 7d',
      points: [
        88, 92, 84, 102, 110, 96, 124, 140, 132, 118, 126, 144, 158, 142, 130,
        118, 124, 138, 152, 146, 134, 128, 122, 128,
      ],
      ticks: ['00', '06', '12', '18', '24'],
    },
    highlights: [
      { label: 'rows scanned/s', value: '8.4M' },
      { label: 'query lang', value: 'TQL' },
      { label: 'embeds', value: 'signed' },
      { label: 'alert engine', value: 'slope · σ' },
    ],
  },
  {
    id: 'mosaic-studio',
    index: '07',
    name: 'Mosaic',
    tagline: 'Asset library con AI tagging y mood boards.',
    description:
      'Biblioteca visual para equipos creativos. Tagging automático con embeddings, búsqueda por color/forma/mood, boards colaborativos.',
    stack: ['Next.js', 'Postgres+pgvector', 'Python', 'CLIP', 'S3'],
    year: '2024',
    role: 'Full stack · Design',
    accent: 'rose',
    preview: {
      kind: 'gallery',
      title: 'board · neon-noir',
      tiles: [
        { label: 'cover · 01', tone: 0.85 },
        { label: 'palette', tone: 0.6 },
        { label: 'type · grotesk', tone: 0.4 },
        { label: 'photo · 12', tone: 0.75 },
        { label: 'gradient · 03', tone: 0.5 },
        { label: 'icon set', tone: 0.65 },
        { label: 'video · 08', tone: 0.3 },
        { label: 'logo mark', tone: 0.55 },
        { label: 'pattern', tone: 0.45 },
      ],
    },
    highlights: [
      { label: 'similarity', value: 'pgvector' },
      { label: 'auto tags', value: 'CLIP · OCR' },
      { label: 'boards', value: 'realtime' },
      { label: 'storage', value: 'S3 · CDN' },
    ],
  },
];
