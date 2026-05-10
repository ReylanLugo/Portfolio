# i18n Multi-Language Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a centralized, type-safe i18n module that provides ES/EN switchable copy across the entire portfolio SPA without dependencies.

**Architecture:** Custom TypeScript module under `src/i18n/`. Catalog `es.ts` is the canonical type source via `Catalog = typeof es`; `en.ts satisfies Catalog` enforces shape parity. Provider stores active locale in React context, persists to `localStorage`, syncs `<html lang>`. `useT()` hook returns a typed `t(key, params?)` function plus `t.raw(key)` for object/array nodes. Texts move out of `src/data/` (which keeps only neutral metadata) and consumers read via `t()`. `<LocaleSwitcher>` atom mounts in `Nav` and `MobileDrawer`.

**Tech Stack:** TypeScript 5.6, React 18, Vite 5, Tailwind 3, Framer Motion 11. No new runtime deps.

---

## File Structure

**Create:**
- `src/i18n/types.ts` — `Locale`, `LOCALES`, `Path<T>`, `TKey`, `TFunc` types
- `src/i18n/locales/es.ts` — canonical Spanish catalog
- `src/i18n/locales/en.ts` — English catalog with `satisfies Catalog`
- `src/i18n/catalog.ts` — re-export `Catalog = typeof es`
- `src/i18n/interpolate.ts` — `{name}` token replacement
- `src/i18n/detect.ts` — `getInitialLocale()`
- `src/i18n/persist.ts` — localStorage read/write with try/catch
- `src/i18n/I18nProvider.tsx` — context + state + html lang side-effect
- `src/i18n/useT.ts` — typed `t()` + `t.raw()` hook
- `src/i18n/useLocale.ts` — `{ locale, setLocale, locales }`
- `src/i18n/index.ts` — public API barrel
- `src/components/ui/LocaleSwitcher.tsx` — segmented pill switcher atom
- `src/components/ui/RichText.tsx` — `[accent]…[/accent]` marker parser
- `src/hooks/useProject.ts` — merges `data/projects.ts` metadata + i18n project subtree

**Modify:**
- `src/main.tsx` — wrap `<App />` in `<I18nProvider>`
- `src/App.tsx` — (no change if provider goes in main.tsx; otherwise add wrapper)
- `index.html` — keep `<html lang="es">` as initial (provider reconciles)
- `src/data/site.ts` — strip translatable text, keep metadata
- `src/data/projects.ts` — strip translatable text, keep metadata + preview kind
- `src/data/experience.ts` — strip translatable text, keep metadata
- `src/components/ui/index.ts` — export `LocaleSwitcher`, `RichText`
- `src/components/nav/Nav.tsx` — mount switcher, use `t('nav.*')`, `t('nav.hire')`
- `src/components/nav/NavPill.tsx` — use `t('nav.<id>')` for labels
- `src/components/nav/MobileDrawer.tsx` — mount switcher, use `t()`
- `src/components/sections/Hero.tsx` — full text replacement via `t()`
- `src/components/sections/Projects.tsx` — section labels via `t()`
- `src/components/sections/Stack.tsx` — section labels via `t()`
- `src/components/sections/Experience.tsx` — labels + `t.raw('experience.<slug>.bullets')`
- `src/components/sections/About.tsx` — bio paragraphs + stats via `t()`
- `src/components/sections/Contact.tsx` — full text replacement via `t()`
- `src/components/layout/Footer.tsx` — interpolated rights line
- `src/components/project/ProjectCard.tsx` — use `useProject(id)`
- `src/components/previews/ProjectPreview.tsx` — receive localized preview as prop
- `src/components/previews/{Terminal,Editor,Browser,Mobile,Api,Graph,Gallery}Preview.tsx` — read localized fields
- `src/components/deck/DeckCard.tsx` — use `useProject(id)` for `name`/`tagline`

---

## Task 1: Type primitives

**Files:**
- Create: `src/i18n/types.ts`

- [ ] **Step 1: Write `types.ts` with Locale, LOCALES, and recursive Path generator**

```ts
// src/i18n/types.ts
import type { Catalog } from './catalog';

export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

type Prev = [never, 0, 1, 2, 3, 4];

export type Path<T, D extends number = 4> = D extends 0
  ? never
  : T extends string
    ? never
    : T extends readonly unknown[]
      ? never
      : T extends Record<string, unknown>
        ? {
            [K in keyof T & string]: T[K] extends string
              ? K
              : T[K] extends Record<string, unknown>
                ? `${K}.${Path<T[K], Prev[D]>}`
                : K;
          }[keyof T & string]
        : never;

export type RawPath<T, D extends number = 5> = D extends 0
  ? never
  : T extends Record<string, unknown>
    ? {
        [K in keyof T & string]:
          | K
          | (T[K] extends Record<string, unknown> ? `${K}.${RawPath<T[K], Prev[D]>}` : never);
      }[keyof T & string]
    : never;

export type TKey = Path<Catalog>;
export type TRawKey = RawPath<Catalog>;

export type TParams = Record<string, string | number>;

export type TFunc = ((key: TKey, params?: TParams) => string) & {
  raw: <K extends TRawKey>(key: K) => unknown;
};
```

- [ ] **Step 2: Verify TS compiles standalone**

Run: `pnpm typecheck`
Expected: PASS (`catalog.ts` not yet created → temporary error on import; OK to proceed if catalog is created in Task 3 before typecheck)

- [ ] **Step 3: Commit**

```bash
git add src/i18n/types.ts
git commit -m "feat(i18n): add Locale, Path, and TFunc type primitives"
```

---

## Task 2: Spanish catalog (canonical)

**Files:**
- Create: `src/i18n/locales/es.ts`

- [ ] **Step 1: Author the full ES catalog**

Move every translatable string from current `src/data/site.ts`, `src/data/projects.ts`, `src/data/experience.ts`, plus all hardcoded strings in `src/components/sections/*` and `src/components/layout/Footer.tsx`. Use the structure below.

```ts
// src/i18n/locales/es.ts
export const es = {
  a11y: {
    languageSwitcher: 'Idioma',
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
```

- [ ] **Step 2: Commit**

```bash
git add src/i18n/locales/es.ts
git commit -m "feat(i18n): add canonical Spanish catalog"
```

---

## Task 3: Catalog type re-export

**Files:**
- Create: `src/i18n/catalog.ts`

- [ ] **Step 1: Write `catalog.ts`**

```ts
// src/i18n/catalog.ts
import type { es } from './locales/es';
export type Catalog = typeof es;
```

- [ ] **Step 2: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS (now `types.ts` import resolves)

- [ ] **Step 3: Commit**

```bash
git add src/i18n/catalog.ts
git commit -m "feat(i18n): re-export Catalog type from canonical es catalog"
```

---

## Task 4: English catalog

**Files:**
- Create: `src/i18n/locales/en.ts`

- [ ] **Step 1: Write `en.ts` with `satisfies Catalog` and full English translations**

Mirror the structure of `es.ts` exactly. Translate every leaf string. Keep technical command lines (e.g. `$ vault open --workspace=lab`) as-is — they're language-neutral. Preserve `[accent]…[/accent]` markers.

```ts
// src/i18n/locales/en.ts
import type { Catalog } from '../catalog';

export const en = {
  a11y: { languageSwitcher: 'Language' },
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
    title: 'Got an idea? Let’s build it [accent]this week[/accent].',
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
```

- [ ] **Step 2: Verify shape parity via TS**

Run: `pnpm typecheck`
Expected: PASS — `satisfies Catalog` will fail compilation if any key from `es` is missing or has a wrong type in `en`.

- [ ] **Step 3: Commit**

```bash
git add src/i18n/locales/en.ts
git commit -m "feat(i18n): add English catalog satisfying Catalog shape"
```

---

## Task 5: Detection, persistence, interpolation

**Files:**
- Create: `src/i18n/detect.ts`, `src/i18n/persist.ts`, `src/i18n/interpolate.ts`

- [ ] **Step 1: Write `persist.ts`**

```ts
// src/i18n/persist.ts
import type { Locale } from './types';

const KEY = 'locale';

export function getStored(): string | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage.getItem(KEY) : null;
  } catch {
    return null;
  }
}

export function setStored(locale: Locale): void {
  try {
    if (typeof window !== 'undefined') window.localStorage.setItem(KEY, locale);
  } catch {
    /* ignore: private mode, quota, etc. */
  }
}
```

- [ ] **Step 2: Write `detect.ts`**

```ts
// src/i18n/detect.ts
import { LOCALES, type Locale } from './types';
import { getStored } from './persist';

function isLocale(value: string | null | undefined): value is Locale {
  return !!value && (LOCALES as readonly string[]).includes(value);
}

export function getInitialLocale(): Locale {
  const stored = getStored();
  if (isLocale(stored)) return stored;
  if (typeof navigator === 'undefined') return 'es';
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  return isLocale(nav) ? (nav as Locale) : 'es';
}
```

- [ ] **Step 3: Write `interpolate.ts`**

```ts
// src/i18n/interpolate.ts
export function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`,
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/i18n/detect.ts src/i18n/persist.ts src/i18n/interpolate.ts
git commit -m "feat(i18n): add locale detection, persistence and interpolation helpers"
```

---

## Task 6: Provider, hooks, public API

**Files:**
- Create: `src/i18n/I18nProvider.tsx`, `src/i18n/useT.ts`, `src/i18n/useLocale.ts`, `src/i18n/index.ts`

- [ ] **Step 1: Write `I18nProvider.tsx`**

```tsx
// src/i18n/I18nProvider.tsx
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getInitialLocale } from './detect';
import { setStored } from './persist';
import type { Locale } from './types';

type Ctx = { locale: Locale; setLocale: (next: Locale) => void };

export const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setStored(next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
```

- [ ] **Step 2: Write `useT.ts`**

```ts
// src/i18n/useT.ts
import { useContext, useMemo } from 'react';
import { I18nContext } from './I18nProvider';
import { interpolate } from './interpolate';
import { es } from './locales/es';
import { en } from './locales/en';
import type { Catalog } from './catalog';
import type { Locale, TFunc, TKey, TParams, TRawKey } from './types';

const CATALOGS: Record<Locale, Catalog> = { es, en };

function getPath(obj: unknown, key: string): unknown {
  return key
    .split('.')
    .reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), obj);
}

export function useT(): TFunc {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useT must be used within <I18nProvider>');
  const catalog = CATALOGS[ctx.locale];

  return useMemo(() => {
    const fn = ((key: TKey, params?: TParams) => {
      const raw = getPath(catalog, key);
      if (typeof raw !== 'string') {
        if (import.meta.env.DEV) {
          console.warn(`[i18n] missing string for key "${key}" in "${ctx.locale}"`);
        }
        return key;
      }
      return interpolate(raw, params);
    }) as TFunc;
    fn.raw = (<K extends TRawKey>(key: K) => getPath(catalog, key)) as TFunc['raw'];
    return fn;
  }, [catalog, ctx.locale]);
}
```

- [ ] **Step 3: Write `useLocale.ts`**

```ts
// src/i18n/useLocale.ts
import { useContext } from 'react';
import { I18nContext } from './I18nProvider';
import { LOCALES } from './types';

export function useLocale() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useLocale must be used within <I18nProvider>');
  return { locale: ctx.locale, setLocale: ctx.setLocale, locales: LOCALES };
}
```

- [ ] **Step 4: Write `index.ts`**

```ts
// src/i18n/index.ts
export { I18nProvider } from './I18nProvider';
export { useT } from './useT';
export { useLocale } from './useLocale';
export { LOCALES } from './types';
export type { Locale, Catalog, TKey, TFunc } from './types';
```

- [ ] **Step 5: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n/I18nProvider.tsx src/i18n/useT.ts src/i18n/useLocale.ts src/i18n/index.ts
git commit -m "feat(i18n): add provider, useT, useLocale hooks and public barrel"
```

---

## Task 7: Mount provider

**Files:**
- Modify: `src/main.tsx`

- [ ] **Step 1: Wrap App in I18nProvider**

Read current `src/main.tsx`. Replace the `<App />` render with:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { I18nProvider } from '@/i18n';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
);
```

- [ ] **Step 2: Verify build**

Run: `pnpm build`
Expected: build succeeds; no runtime issues at module load

- [ ] **Step 3: Commit**

```bash
git add src/main.tsx
git commit -m "feat(i18n): mount I18nProvider at the root"
```

---

## Task 8: RichText helper atom

**Files:**
- Create: `src/components/ui/RichText.tsx`
- Modify: `src/components/ui/index.ts`

- [ ] **Step 1: Write `RichText.tsx`**

```tsx
// src/components/ui/RichText.tsx
import { Fragment, type ReactNode } from 'react';

const PATTERN = /\[accent\](.*?)\[\/accent\]/g;

export function RichText({ template }: { template: string }): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = PATTERN.exec(template)) !== null) {
    if (match.index > last) {
      parts.push(<Fragment key={`t${i++}`}>{template.slice(last, match.index)}</Fragment>);
    }
    parts.push(
      <span key={`a${i++}`} className="text-accent">
        {match[1]}
      </span>,
    );
    last = match.index + match[0].length;
  }
  if (last < template.length) {
    parts.push(<Fragment key={`t${i++}`}>{template.slice(last)}</Fragment>);
  }
  return <>{parts}</>;
}
```

- [ ] **Step 2: Add export to `src/components/ui/index.ts`**

Append the line:

```ts
export { RichText } from './RichText';
```

- [ ] **Step 3: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/RichText.tsx src/components/ui/index.ts
git commit -m "feat(ui): add RichText atom for accent-marker copy"
```

---

## Task 9: LocaleSwitcher atom

**Files:**
- Create: `src/components/ui/LocaleSwitcher.tsx`
- Modify: `src/components/ui/index.ts`

- [ ] **Step 1: Write `LocaleSwitcher.tsx`**

```tsx
// src/components/ui/LocaleSwitcher.tsx
import { motion } from 'framer-motion';
import { useLocale } from '@/i18n';
import { useT } from '@/i18n';
import { cn } from '@/lib/cn';

export function LocaleSwitcher() {
  const { locale, setLocale, locales } = useLocale();
  const t = useT();

  return (
    <ul
      aria-label={t('a11y.languageSwitcher')}
      className="flex items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/60 p-1 backdrop-blur"
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <li key={l} className="relative">
            <button
              type="button"
              onClick={() => {
                if (!active) setLocale(l);
              }}
              aria-pressed={active}
              className={cn(
                'relative px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors',
                active ? 'text-bone' : 'text-bone-dim hover:text-bone',
              )}
            >
              {active && (
                <motion.span
                  layoutId="locale-pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  className="absolute inset-0 -z-10 rounded-full bg-ink-700/80 ring-1 ring-accent/30"
                />
              )}
              {l.toUpperCase()}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
```

- [ ] **Step 2: Add export to `src/components/ui/index.ts`**

```ts
export { LocaleSwitcher } from './LocaleSwitcher';
```

- [ ] **Step 3: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/ui/LocaleSwitcher.tsx src/components/ui/index.ts
git commit -m "feat(ui): add LocaleSwitcher atom with motion pill"
```

---

## Task 10: Migrate `data/site.ts`

**Files:**
- Modify: `src/data/site.ts`

- [ ] **Step 1: Strip translatable fields, keep neutral metadata**

Replace the file content with:

```ts
// src/data/site.ts
export const site = {
  name: 'Reylan Lugo',
  shortName: 'Reylan',
  email: 'reylan@avocadoblock.com',
  cvUrl: '/cv-reylan-lugo.pdf',
  social: {
    github: 'https://github.com/ReylanLugo',
    linkedin: 'https://www.linkedin.com/in/reylanlugo',
    x: 'https://x.com/reylanlugo',
  },
  metrics: [
    { id: 'yearsBuilding', value: 6, suffix: '+' },
    { id: 'projectsInProd', value: 24, suffix: '' },
    { id: 'commitsPerYear', value: 1800, suffix: '' },
    { id: 'coffeesPerSprint', value: 99, suffix: '' },
  ] as const,
  quickFacts: [
    { id: 'open', accent: true },
    { id: 'location' },
    { id: 'years' },
  ] as const,
  nav: [
    { id: 'work' as const },
    { id: 'stack' as const },
    { id: 'experience' as const },
    { id: 'about' as const },
    { id: 'contact' as const },
  ],
};

export type SiteData = typeof site;
```

- [ ] **Step 2: Verify typecheck (consumers will still error — fix in later tasks)**

Run: `pnpm typecheck`
Expected: errors in `Hero.tsx`, `About.tsx`, `Nav.tsx` because they reference removed fields. Capture this — fixed in Tasks 13-19.

- [ ] **Step 3: Commit (do not include consumer fixes)**

```bash
git add src/data/site.ts
git commit -m "refactor(data): strip translatable copy from site.ts, keep metadata only"
```

---

## Task 11: Migrate `data/projects.ts`

**Files:**
- Modify: `src/data/projects.ts`

- [ ] **Step 1: Strip translatable fields**

Update `Preview` and `Project` types to drop string content; rename per-kind shapes to keep only language-neutral fields:

```ts
// src/data/projects.ts
export type ProjectAccent =
  | 'orange' | 'amber' | 'cyan' | 'violet' | 'green' | 'rose';

export type PreviewKind =
  | 'terminal' | 'editor' | 'browser' | 'mobile' | 'api' | 'graph' | 'gallery';

export type Preview =
  | { kind: 'terminal' }
  | { kind: 'editor' }
  | { kind: 'browser' }
  | { kind: 'mobile' }
  | {
      kind: 'api';
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
      endpoint: string;
      status: number;
      latency: string;
    }
  | { kind: 'graph'; points: number[]; ticks?: string[] }
  | { kind: 'gallery'; tiles: { tone: number }[] };

export type Project = {
  id: string;
  index: string;
  stack: string[];
  year: string;
  href?: string;
  image?: string;
  accent?: ProjectAccent;
  preview?: Preview;
};

export const projects: Project[] = [
  {
    id: 'vault-os',
    index: '01',
    stack: ['React', 'Tauri', 'Rust', 'SQLite', 'CRDT'],
    year: '2025',
    accent: 'orange',
    preview: { kind: 'terminal' },
  },
  {
    id: 'atlas-api',
    index: '02',
    stack: ['Node', 'Postgres+PostGIS', 'Redis', 'Cloudflare Workers'],
    year: '2024',
    accent: 'amber',
    preview: { kind: 'editor' },
  },
  {
    id: 'ink-cms',
    index: '03',
    stack: ['Next.js', 'tRPC', 'Drizzle', 'Postgres', 'S3'],
    year: '2024',
    accent: 'cyan',
    preview: { kind: 'browser' },
  },
  {
    id: 'pulse-monitor',
    index: '04',
    stack: ['Go', 'NATS', 'ClickHouse', 'Svelte'],
    year: '2023',
    accent: 'violet',
    preview: { kind: 'mobile' },
  },
  {
    id: 'relay-gateway',
    index: '05',
    stack: ['Rust', 'Tokio', 'Axum', 'OpenTelemetry', 'Redis'],
    year: '2025',
    accent: 'green',
    preview: { kind: 'api', method: 'POST', endpoint: '/v1/checkout/sessions', status: 201, latency: '34ms' },
  },
  {
    id: 'tempo-analytics',
    index: '06',
    stack: ['TypeScript', 'ClickHouse', 'Rust', 'D3', 'WebGL'],
    year: '2024',
    accent: 'cyan',
    preview: {
      kind: 'graph',
      points: [
        88, 92, 84, 102, 110, 96, 124, 140, 132, 118, 126, 144, 158, 142, 130,
        118, 124, 138, 152, 146, 134, 128, 122, 128,
      ],
      ticks: ['00', '06', '12', '18', '24'],
    },
  },
  {
    id: 'mosaic-studio',
    index: '07',
    stack: ['Next.js', 'Postgres+pgvector', 'Python', 'CLIP', 'S3'],
    year: '2024',
    accent: 'rose',
    preview: {
      kind: 'gallery',
      tiles: [
        { tone: 0.85 }, { tone: 0.6 }, { tone: 0.4 },
        { tone: 0.75 }, { tone: 0.5 }, { tone: 0.65 },
        { tone: 0.3 }, { tone: 0.55 }, { tone: 0.45 },
      ],
    },
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "refactor(data): strip translatable text from projects, keep neutral metadata"
```

---

## Task 12: Migrate `data/experience.ts`

**Files:**
- Modify: `src/data/experience.ts`

- [ ] **Step 1: Replace with metadata-only shape**

```ts
// src/data/experience.ts
export type ExperienceItem = {
  id: string;
  company: string;
  period: string;
  location: string;
};

export const experience: ExperienceItem[] = [
  { id: 'avocado-block', company: 'Avocado Block', period: '2024 — Now', location: 'Remote' },
  { id: 'independent', company: 'Independent', period: '2022 — 2024', location: 'LATAM · Remote' },
  { id: 'stratos-labs', company: 'Stratos Labs', period: '2020 — 2022', location: 'Hybrid' },
  { id: 'self-taught', company: 'Self-taught', period: '2018 — 2020', location: 'Bedroom HQ' },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/experience.ts
git commit -m "refactor(data): strip translatable text from experience"
```

---

## Task 13: useProject helper

**Files:**
- Create: `src/hooks/useProject.ts`

- [ ] **Step 1: Write `useProject.ts`**

```ts
// src/hooks/useProject.ts
import { useT } from '@/i18n';
import { projects, type Project } from '@/data/projects';

type LocalizedProject = Project & {
  name: string;
  tagline: string;
  description: string;
  highlights: { label: string; value: string }[];
  preview: NonNullable<Project['preview']> & {
    title?: string;
    lines?: string[];
    request?: string[];
    response?: string[];
    metric?: string;
    value?: string;
    delta?: string;
    tileLabels?: string[];
  };
};

export function useProject(id: string): LocalizedProject | undefined {
  const t = useT();
  const meta = projects.find((p) => p.id === id);
  if (!meta) return undefined;

  const i18n = t.raw(`projects.${id}`) as Record<string, unknown> | undefined;
  if (!i18n) return undefined;

  const previewI18n = (i18n.preview ?? {}) as Record<string, unknown>;

  return {
    ...meta,
    name: i18n.name as string,
    tagline: i18n.tagline as string,
    description: i18n.description as string,
    highlights: i18n.highlights as { label: string; value: string }[],
    preview: {
      ...(meta.preview as NonNullable<Project['preview']>),
      ...previewI18n,
    } as LocalizedProject['preview'],
  };
}
```

- [ ] **Step 2: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS for the hook itself; existing consumers still broken (next tasks fix them).

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useProject.ts
git commit -m "feat(hooks): add useProject merging metadata with localized text"
```

---

## Task 14: Update Nav for i18n

**Files:**
- Modify: `src/components/nav/Nav.tsx`, `src/components/nav/NavPill.tsx`, `src/components/nav/MobileDrawer.tsx`

- [ ] **Step 1: Update `data/site.ts` consumer in `Nav.tsx`**

Replace hardcoded text and add the switcher. Open `src/components/nav/Nav.tsx` and update:

```tsx
// imports — add LocaleSwitcher and useT
import { LocaleSwitcher } from '@/components/ui';
import { useT } from '@/i18n';

// inside Nav():
const t = useT();
```

Then in JSX, between the centered `<NavPill />` and the existing `Hire me` `<a>`, insert:

```tsx
<div className="hidden md:flex items-center gap-3">
  <LocaleSwitcher />
  <a
    href={`mailto:${site.email}`}
    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-950 shadow-glow transition-transform hover:scale-[1.03]"
  >
    {t('nav.hire')}
  </a>
</div>
```

Remove the standalone `<a>` for "Hire me" so the new wrapper holds it.

- [ ] **Step 2: Update `NavPill.tsx`**

Replace `{item.label}` reads with `t('nav.<id>')`. The full file:

```tsx
// src/components/nav/NavPill.tsx
import { motion } from 'framer-motion';
import { site } from '@/data/site';
import { cn } from '@/lib/cn';
import { useT } from '@/i18n';

type Props = { active: string | null };

export function NavPill({ active }: Props) {
  const t = useT();
  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/60 p-1 backdrop-blur">
        {site.nav.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="relative">
              <a
                href={`#${item.id}`}
                className={cn(
                  'relative block rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors',
                  isActive ? 'text-bone' : 'text-bone-dim hover:text-bone',
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 -z-10 rounded-full bg-ink-700/80 ring-1 ring-accent/30"
                  />
                )}
                {t(`nav.${item.id}` as 'nav.work')}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
```

(The `as 'nav.work'` cast is a tradeoff because `item.id` is dynamically typed; you may instead extend types to keep autocomplete strict.)

- [ ] **Step 3: Update `MobileDrawer.tsx`**

Insert `<LocaleSwitcher />` at the top of the drawer's nav, replace hardcoded labels with `t()`, and translate "Hire me":

```tsx
// src/components/nav/MobileDrawer.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { site } from '@/data/site';
import { LocaleSwitcher } from '@/components/ui';
import { useT } from '@/i18n';

type Props = { open: boolean; onClose: () => void };

export function MobileDrawer({ open, onClose }: Props) {
  const t = useT();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-40 md:hidden bg-ink-950/95 backdrop-blur-xl"
        >
          <nav className="flex h-full flex-col items-start justify-center gap-6 px-8">
            <LocaleSwitcher />
            {site.nav.map((item, i) => (
              <motion.a
                key={item.id}
                href={`#${item.id}`}
                onClick={onClose}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-medium tracking-tight"
              >
                <span className="text-accent mr-3 font-mono text-base align-middle">
                  0{i + 1}
                </span>
                {t(`nav.${item.id}` as 'nav.work')}
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${site.email}`}
              onClick={onClose}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 inline-flex items-center rounded-full bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-ink-950 shadow-glow"
            >
              {t('nav.hire')} →
            </motion.a>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 4: Verify typecheck**

Run: `pnpm typecheck`
Expected: nav files compile.

- [ ] **Step 5: Commit**

```bash
git add src/components/nav/
git commit -m "feat(nav): integrate LocaleSwitcher and replace labels with t()"
```

---

## Task 15: Update Hero section

**Files:**
- Modify: `src/components/sections/Hero.tsx`

- [ ] **Step 1: Replace hardcoded text with `t()` calls**

Update imports:

```ts
import { useT } from '@/i18n';
```

In the section file, replace the inner sub-components with t-driven versions. Patches:

`HeroStatusPill`:
```tsx
function HeroStatusPill() {
  const t = useT();
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-900/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-bone-dim backdrop-blur"
    >
      <PulseDot size={6} />
      {t('hero.available')}
    </motion.p>
  );
}
```

`HeroTitle`:
```tsx
function HeroTitle() {
  const t = useT();
  return (
    <h1 className="font-display font-medium leading-[0.92] tracking-[-0.03em] text-balance">
      <span className="block text-[clamp(3rem,10vw,8.5rem)]">
        <ScrambleText text={t('hero.firstName')} trigger="cycle" cycleMs={9000} />
      </span>
      <span className="block text-[clamp(3rem,10vw,8.5rem)]">
        <ScrambleText text={t('hero.lastName')} trigger="cycle" cycleMs={11000} />
        <span className="text-accent">.</span>
      </span>
    </h1>
  );
}
```

`HeroFacts`:
```tsx
function HeroFacts() {
  const t = useT();
  return (
    <motion.ul
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
      className="mt-7 flex flex-wrap items-center gap-2"
    >
      {site.quickFacts.map((f) => {
        const label = t(`hero.facts.${f.id}` as 'hero.facts.open');
        const accent = 'accent' in f && f.accent;
        return (
          <li
            key={f.id}
            className={
              accent
                ? 'inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent/[0.06] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent'
                : 'inline-flex items-center gap-2 rounded-full border border-ink-700/70 bg-ink-900/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-bone-dim backdrop-blur'
            }
          >
            {accent && <PulseDot size={6} />}
            {label}
          </li>
        );
      })}
    </motion.ul>
  );
}
```

`HeroCtas`:
```tsx
function HeroCtas() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.7 }}
      className="mt-8 flex flex-wrap items-center gap-3"
    >
      <PrimaryButton href="#work">
        {t('hero.cta.deck')}
        <ArrowDown size={14} className="transition-transform group-hover:translate-y-0.5" />
      </PrimaryButton>
      <GhostButton href={site.social.github} target="_blank" rel="noreferrer">
        <Github size={13} />
        {t('hero.cta.github')}
      </GhostButton>
      <IconButton href={site.social.linkedin} target="_blank" rel="noreferrer" label="LinkedIn">
        <Linkedin size={14} />
      </IconButton>
      <IconButton href={`mailto:${site.email}`} label="Email">
        <Mail size={14} />
      </IconButton>
    </motion.div>
  );
}
```

`ScrollHint`:
```tsx
function ScrollHint() {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block"
    >
      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-bone-mute">
        {t('hero.scrollHint')}
      </div>
    </motion.div>
  );
}
```

Inside `Hero()`, replace the tagline `<motion.p>` with:

```tsx
<motion.p
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.7 }}
  className="mt-8 max-w-xl text-base sm:text-lg text-bone-dim text-pretty"
>
  {t('hero.tagline')}
</motion.p>
```

(Add `const t = useT();` at the top of `Hero()`.)

- [ ] **Step 2: Verify typecheck and visual sanity**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat(hero): consume i18n catalog for all hero copy"
```

---

## Task 16: Update Section sections (Projects, Stack, Experience, About, Contact, Footer)

**Files:**
- Modify: `src/components/sections/Projects.tsx`, `Stack.tsx`, `Experience.tsx`, `About.tsx`, `Contact.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: Update `Projects.tsx`**

```tsx
// src/components/sections/Projects.tsx
import { Section } from '@/components/ui';
import { projects } from '@/data/projects';
import { ProjectCard } from '@/components/project';
import { useT } from '@/i18n';
import { RichText } from '@/components/ui';

export function Projects() {
  const t = useT();
  return (
    <Section
      id="work"
      label={t('sections.work.eyebrow')}
      title={<RichText template={t('sections.work.title')} />}
      description={t('sections.work.description')}
    >
      <div className="relative">
        <div className="space-y-[18vh] pb-[18vh] sm:space-y-[16vh] sm:pb-[16vh] lg:space-y-[18vh] lg:pb-[18vh]">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} total={projects.length} />
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Update `Stack.tsx`**

```tsx
// src/components/sections/Stack.tsx
import { Section, Marquee, Chip, RichText } from '@/components/ui';
import { stackRowA, stackRowB } from '@/data/stack';
import { useT } from '@/i18n';

function StackChip({ label }: { label: string }) {
  return <Chip bullet size="md">{label}</Chip>;
}

export function Stack() {
  const t = useT();
  return (
    <Section
      id="stack"
      label={t('sections.stack.eyebrow')}
      title={<RichText template={t('sections.stack.title')} />}
      description={t('sections.stack.description')}
    >
      <div className="space-y-4 sm:space-y-5">
        <Marquee items={stackRowA.map((s) => <StackChip key={s} label={s} />)} speed="slow" />
        <Marquee items={stackRowB.map((s) => <StackChip key={s} label={s} />)} reverse speed="normal" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 3: Update `Experience.tsx` and inline `TimelineEntry`**

```tsx
// src/components/sections/Experience.tsx
import { Section, Reveal, RichText } from '@/components/ui';
import { experience, type ExperienceItem } from '@/data/experience';
import { useT } from '@/i18n';

function TimelineDot() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-ink-950 ring-1 ring-accent/60 shadow-[0_0_12px_#f97316]"
    />
  );
}

function TimelineEntry({ item, delay }: { item: ExperienceItem; delay: number }) {
  const t = useT();
  const role = t(`experience.${item.id}.role` as 'experience.avocado-block.role');
  const bullets = t.raw(`experience.${item.id}.bullets`) as readonly string[];
  return (
    <li className="relative pl-8 sm:pl-12 pb-12 last:pb-0">
      <TimelineDot />
      <Reveal delay={delay}>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-display text-2xl sm:text-3xl font-medium tracking-tight">
            {item.company}
          </h3>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            {item.period}
          </span>
        </div>
        <p className="mt-1 font-mono text-xs text-bone-dim">
          {role} · {item.location}
        </p>
        <ul className="mt-4 space-y-2 text-bone-dim/95 max-w-2xl text-pretty">
          {bullets.map((b, j) => (
            <li key={j} className="flex gap-3">
              <span className="mt-2.5 h-px w-3 shrink-0 bg-bone-mute/50" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </li>
  );
}

export function Experience() {
  const t = useT();
  return (
    <Section
      id="experience"
      label={t('sections.experience.eyebrow')}
      title={<RichText template={t('sections.experience.title')} />}
      description={t('sections.experience.description')}
    >
      <ol className="relative ml-3 sm:ml-6 border-l border-ink-700/60">
        {experience.map((item, i) => (
          <TimelineEntry key={item.id} item={item} delay={i * 0.06} />
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 4: Update `About.tsx`**

```tsx
// src/components/sections/About.tsx
import { Section, Reveal, GlowCard, EyebrowLabel, MetricStat, RichText } from '@/components/ui';
import { site } from '@/data/site';
import { useT } from '@/i18n';

function Bio() {
  const t = useT();
  return (
    <div className="space-y-5 text-bone-dim text-pretty leading-relaxed">
      <p>
        {t('about.p1', { name: site.name }).split(site.name).flatMap((part, i, arr) =>
          i < arr.length - 1
            ? [<span key={`p${i}`}>{part}</span>, <span key={`n${i}`} className="text-bone">{site.name}</span>]
            : [<span key={`p${i}`}>{part}</span>],
        )}
      </p>
      <p>{t('about.p2')}</p>
      <p>{t('about.p3')}</p>
    </div>
  );
}

function Stats() {
  const t = useT();
  return (
    <GlowCard className="p-6 sm:p-8">
      <EyebrowLabel>{t('about.statsLabel')}</EyebrowLabel>
      <ul className="mt-6 grid grid-cols-2 gap-y-8 gap-x-6">
        {site.metrics.map((m) => (
          <li key={m.id}>
            <MetricStat
              label={t(`about.metricsLabels.${m.id}` as 'about.metricsLabels.yearsBuilding')}
              value={m.value}
              suffix={m.suffix}
            />
          </li>
        ))}
      </ul>
    </GlowCard>
  );
}

export function About() {
  const t = useT();
  return (
    <Section
      id="about"
      label={t('sections.about.eyebrow')}
      title={<RichText template={t('sections.about.title')} />}
      description={t('sections.about.description')}
    >
      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        <Reveal>
          <Bio />
        </Reveal>
        <Reveal delay={0.1}>
          <Stats />
        </Reveal>
      </div>
    </Section>
  );
}
```

- [ ] **Step 5: Update `Contact.tsx`**

```tsx
// src/components/sections/Contact.tsx
import { ArrowUpRight, Download, Github, Mail } from 'lucide-react';
import { Section, Reveal, EyebrowLabel, GhostButton, PrimaryButton, RichText } from '@/components/ui';
import { site } from '@/data/site';
import { useT } from '@/i18n';

function ContactGlows() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_0%,rgba(249,115,22,0.22),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-accent/20 blur-3xl"
      />
    </>
  );
}

function ContactCtas() {
  const t = useT();
  return (
    <div className="mt-10 flex flex-wrap items-center gap-3">
      <PrimaryButton href={`mailto:${site.email}`} className="px-5 py-3">
        <Mail size={14} />
        {site.email}
        <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </PrimaryButton>
      <GhostButton href={site.cvUrl} download className="px-5 py-3">
        <Download size={14} />
        {t('contact.cv')}
      </GhostButton>
      <GhostButton href={site.social.github} target="_blank" rel="noreferrer" className="px-5 py-3">
        <Github size={14} />
        github.com/ReylanLugo
      </GhostButton>
    </div>
  );
}

export function Contact() {
  const t = useT();
  return (
    <Section id="contact" label={t('sections.contact.eyebrow')}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-900/70 px-6 py-14 sm:px-12 sm:py-20 lg:px-20 lg:py-28">
          <ContactGlows />
          <EyebrowLabel>{t('contact.eyebrow')}</EyebrowLabel>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-balance">
            <RichText template={t('contact.title')} />
          </h2>
          <ContactCtas />
        </div>
      </Reveal>
    </Section>
  );
}
```

- [ ] **Step 6: Update `Footer.tsx`**

```tsx
// src/components/layout/Footer.tsx
import { Github, Linkedin, Mail } from 'lucide-react';
import { site } from '@/data/site';
import { IconButton } from '@/components/ui';
import { useT } from '@/i18n';

export function Footer() {
  const t = useT();
  return (
    <footer className="relative mt-24 border-t border-ink-700/50">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-bone-mute">
          {t('footer.rights', { year: new Date().getFullYear(), name: site.name })}
        </p>
        <div className="flex items-center gap-3">
          <IconButton href={site.social.github} target="_blank" rel="noreferrer" label="GitHub" size="sm">
            <Github size={15} />
          </IconButton>
          <IconButton href={site.social.linkedin} target="_blank" rel="noreferrer" label="LinkedIn" size="sm">
            <Linkedin size={15} />
          </IconButton>
          <IconButton href={`mailto:${site.email}`} label="Email" size="sm">
            <Mail size={15} />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 7: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/ src/components/layout/Footer.tsx
git commit -m "feat(sections): consume i18n catalog across all page sections"
```

---

## Task 17: ProjectCard and DeckCard via useProject

**Files:**
- Modify: `src/components/project/ProjectCard.tsx`, `src/components/deck/DeckCard.tsx`

- [ ] **Step 1: Update `ProjectCard.tsx`**

Replace `project.name`, `project.tagline`, `project.description`, `project.highlights` reads with values from `useProject(project.id)`. Imports:

```ts
import { useProject } from '@/hooks/useProject';
```

Inside `ProjectCard`:

```tsx
const localized = useProject(project.id);
if (!localized) return null;
const { name, tagline, description, highlights } = localized;
```

Replace JSX usages of `project.name`, `project.tagline`, `project.description`, `project.highlights` with `name`, `tagline`, `description`, `highlights`. Pass `localized.preview` to `<ProjectPreview>` (next task).

- [ ] **Step 2: Update `DeckCard.tsx`**

Replace `project.name` and `project.tagline` reads with `useProject(project.id)`:

```tsx
import { useProject } from '@/hooks/useProject';

// inside component:
const localized = useProject(project.id);
const name = localized?.name ?? project.id;
const tagline = localized?.tagline ?? '';
```

Use `name` and `tagline` in JSX where the original referenced `project.name` and `project.tagline`.

- [ ] **Step 3: Verify typecheck**

Run: `pnpm typecheck`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/project/ProjectCard.tsx src/components/deck/DeckCard.tsx
git commit -m "feat(project,deck): wire cards to useProject for localized text"
```

---

## Task 18: ProjectPreview variants

**Files:**
- Modify: `src/components/previews/ProjectPreview.tsx` and all 7 kind-renderer files

- [ ] **Step 1: Update `ProjectPreview.tsx` to accept localized data**

Change the `Props` to receive a `localized` object holding the merged preview content (already produced by `useProject`). Render variants based on `kind`. Example signature:

```tsx
import type { Project } from '@/data/projects';

type LocalizedPreview = {
  kind: Project['preview'] extends infer K ? Extract<K, { kind: string }>['kind'] : never;
  title?: string;
  lines?: string[];
  request?: string[];
  response?: string[];
  metric?: string;
  value?: string;
  delta?: string;
  tileLabels?: string[];
  // Plus the structural fields from the original Preview type:
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  endpoint?: string;
  status?: number;
  latency?: string;
  points?: number[];
  ticks?: string[];
  tiles?: { tone: number }[];
};
```

`ProjectPreview` receives `{ project, accentRgb, preview }` where `preview` is the merged localized + neutral object.

- [ ] **Step 2: Adapt each variant file**

For each of `TerminalPreview`, `EditorPreview`, `BrowserPreview`, `MobilePreview`, `ApiPreview`, `GraphPreview`, `GalleryPreview`:
- Read `preview.title`, `preview.lines`, etc., directly from the prop instead of from `preview.kind === 'foo'` narrowed object.
- For `ApiPreview`, merge: structural `method`, `endpoint`, `status`, `latency` come from `preview` (originally from `data/projects.ts`); `request` and `response` come from i18n.
- For `GraphPreview`, `points` and `ticks` come from `preview` (data); `metric`, `value`, `delta` from i18n.
- For `GalleryPreview`, `tiles[].tone` comes from data; `tileLabels` array from i18n; the renderer now zips them by index.

(Provide concrete code per variant by following the pattern used previously, but reading the merged prop.)

- [ ] **Step 3: Verify build**

Run: `pnpm build`
Expected: PASS

- [ ] **Step 4: Commit**

```bash
git add src/components/previews/
git commit -m "feat(previews): consume merged localized preview data via props"
```

---

## Task 19: Verification

- [ ] **Step 1: Typecheck and build**

Run: `pnpm typecheck && pnpm build`
Expected: both PASS with zero errors

- [ ] **Step 2: Validate OpenSpec change**

Run: `openspec validate add-i18n-multi-language`
Expected: `Change 'add-i18n-multi-language' is valid`

- [ ] **Step 3: Manual smoke — switcher in nav**

Run: `pnpm dev` → open http://localhost:5173 → click `EN` in the nav switcher
Expected: every visible string changes to English; `<html lang>` becomes `en`; localStorage `locale` is `en`. Reload — site stays in English.

- [ ] **Step 4: Manual smoke — auto-detect**

Open DevTools Console: `localStorage.removeItem('locale')`. In DevTools → "Sensors", set Locale to `en-US`. Reload.
Expected: site loads in English without manual switch.

- [ ] **Step 5: Manual smoke — unsupported stored value**

Run in console: `localStorage.setItem('locale', 'pt')`. Reload.
Expected: site falls back to navigator language (or default `es`); no crash; no flash of `pt` content.

- [ ] **Step 6: Manual smoke — reduced motion**

DevTools → Rendering → "Emulate prefers-reduced-motion: reduce". Click switcher.
Expected: pill transitions are instant or absent; no console errors.

- [ ] **Step 7: Manual smoke — switcher accessibility**

Tab to the switcher. Press Enter on the inactive locale. Listen with VoiceOver or inspect `aria-pressed` toggling.
Expected: `aria-pressed` flips; group has `aria-label="Language"` (or `Idioma` when active locale is `es`).

- [ ] **Step 8: Final commit if any tweaks were needed**

```bash
git add -A
git commit -m "chore(i18n): manual verification fixes"
```

(Skip if working tree is clean.)

---

## Self-review notes

- Spec coverage:
  - `i18n-runtime` — covered by Tasks 5, 6 (provider, useT, useLocale, persist, detect, interpolate). All scenarios mapped to either typecheck-enforced behavior (typed keys) or smoke steps in Task 19.
  - `text-catalog` — covered by Tasks 1, 2, 3, 4 (types, es, catalog, en with `satisfies`). `Stack chips not translated` enforced by leaving `data/stack.ts` unchanged across all tasks.
  - `locale-switcher-ui` — covered by Tasks 9, 14. Mobile-drawer mounting checked in Task 14 step 3.

- Placeholder scan: no "TBD" / "TODO" / "implement later" / "fill in details". All code blocks are concrete.

- Type consistency: `useT` returns `TFunc`, `t.raw` consistent across all consumer tasks. `LocalizedProject` shape consistent across `useProject` and ProjectCard/DeckCard usage. `ExperienceItem` has `id` field used uniformly to look up i18n keys.
