// src/i18n/locales/es.ts
export const es = {
  a11y: {
    languageSwitcher: 'Idioma',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    deckAdvance: 'Avanzar carta del deck',
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
      'Construyo sistemas que respiran — interfaces tech-noir, APIs sólidas, código que envejece bien.',
    cta: { deck: 'Ver el deck', github: 'GitHub' },
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
      title: 'Cuatro proyectos, una [accent]obsesión[/accent]: herramientas que se sienten vivas.',
      description:
        'Cada card es un sistema en producción o cerca. Scrollea para apilarlas como un mazo — la que está al frente cuenta su historia.',
    },
    stack: {
      eyebrow: 'Stack',
      title: 'Las herramientas [accent]contundentes[/accent] que ya probé en producción.',
      description:
        'No colecciono logos: este es el stack que uso a diario y por el que pondría las manos en el fuego.',
    },
    experience: {
      eyebrow: 'Track record',
      title: 'Seis años [accent]construyendo[/accent] y rompiendo cosas en la web.',
      description:
        'Una línea editada de los lugares donde aprendí algo que hoy uso casi a diario.',
    },
    about: {
      eyebrow: 'About',
      title:
        'Construyo software como [accent]quien arma sintetizadores[/accent]: módulos chicos, conexiones claras, sonido grande.',
      description:
        'Trabajo en remoto desde LATAM. Me obsesionan los detalles de DX, las animaciones que no estorban y los sistemas que envejecen sin dolor.',
    },
    contact: { eyebrow: 'Contact' },
  },
  about: {
    p1: 'Soy {name}, full stack engineer especializado en producto. Me siento cómodo en el front (React, TS, motion) y en el back (Node, Postgres, infra simple que escala).',
    p2: 'Diseño antes de codear, pero no me casé con Figma: muchas veces el prototipo más útil es un branch con HMR encendido. Prefiero entregar vertical thin slices que mockups infinitos.',
    p3: 'Cuando no estoy en el editor: leyendo sci-fi, perdiéndome en synth hardware o pidiendo otro café.',
    statsLabel: 'stats',
    metricsLabels: {
      yearsBuilding: 'años construyendo',
      projectsInProd: 'proyectos en prod',
      commitsPerYear: 'commits / año',
      coffeesPerSprint: 'cafés por sprint',
    },
  },
  contact: {
    eyebrow: "let's build",
    title: '¿Tienes una idea? La construimos [accent]esta semana[/accent].',
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
        'Sistema modular tipo terminal para capturar, enlazar y resucitar notas. Sync local-first, cifrado E2E, full-text search en cliente.',
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
        'Plataforma de geocoding y routing sobre OSM, distribuida en edge. SDKs en TS y Python, billing por uso, observabilidad nativa.',
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
      tagline: 'Headless CMS para narrativas largas.',
      description:
        'CMS opinado para revistas digitales — editor MDX en bloques, versionado, preview en branch, build hooks a Vercel/Netlify.',
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
      tagline: 'Status pages que no mienten.',
      description:
        'Status & uptime con probes regionales, post-mortems automáticos y RSS de incidentes. Self-hostable en un binario.',
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
      tagline: 'API gateway con auth y rate limit por defecto.',
      description:
        'Gateway opinado en Rust: auth (JWT/HMAC), rate-limit por API key, request shaping, observabilidad nativa OTel. Config en TOML, hot reload.',
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
      tagline: 'Time-series analytics, sin SQL en la UI.',
      description:
        'Dashboard analítico para series de tiempo. Lenguaje declarativo `TQL` que compila a SQL, alertas por slope/anomaly, embeds firmados.',
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
      tagline: 'Asset library con AI tagging y mood boards.',
      description:
        'Biblioteca visual para equipos creativos. Tagging automático con embeddings, búsqueda por color/forma/mood, boards colaborativos.',
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
        'Lidero la arquitectura de productos internos (Next.js + Postgres + tRPC) priorizando DX y reusabilidad.',
        'Reduje tiempo de bootstrap de nuevos servicios un 70% con un starter kit propio.',
        'Mentoring técnico a 4 ingenieros mid/jr en patrones React, testing y DDD ligero.',
      ],
    },
    'independent': {
      role: 'Contract Engineer',
      bullets: [
        'Diseñé y entregué APIs de geocoding edge para 3 clientes B2B (sub-30ms p95).',
        'Construí dashboards data-heavy con virtualización y streaming de datasets >1M rows.',
        'Migré 2 monolitos PHP a Node + Postgres sin downtime usando dual-write + shadow reads.',
      ],
    },
    'stratos-labs': {
      role: 'Full Stack Developer',
      bullets: [
        'Construí la primera versión del producto (React + Rails) con foco en time-to-first-aha.',
        'Owned la pipeline de CI/CD (GitHub Actions + Fly.io), bajé el deploy de 18 a 4 min.',
        'Implementé feature flags y experimentación A/B internas.',
      ],
    },
    'self-taught': {
      role: 'Building things on the internet',
      bullets: [
        'Aprendí JS, Python, Linux y SQL construyendo proyectos públicos en GitHub.',
        'Primer freelance: landings, scrapers y bots para PyMEs locales.',
      ],
    },
  },
} as const;
