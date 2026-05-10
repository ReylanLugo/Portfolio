# Design — add-i18n-multi-language

> Pre-filled from brainstorm. Refine during the design artifact phase if needed.

## Architecture

```
src/i18n/
├── index.ts              Public API: I18nProvider, useT, useLocale, LOCALES
├── types.ts              Locale, TFunc, Path<T>, ParamsOf<K>
├── catalog.ts            export type Catalog = typeof import('./locales/es').es
├── locales/
│   ├── es.ts             Catálogo canónico (drives the type)
│   └── en.ts             satisfies Catalog → mismo shape forzado por TS
├── detect.ts             getInitialLocale(): localStorage → navigator → 'es'
├── persist.ts            getStored() / setStored(locale)
├── interpolate.ts        replaceTokens(template, params)
├── I18nProvider.tsx      Context + state + side effects (html lang, persist)
├── useT.ts               () => (key, params?) => string
└── useLocale.ts          () => { locale, setLocale, locales }
```

Plus a new atom `src/components/ui/LocaleSwitcher.tsx` consumed by `Nav` and `MobileDrawer`.

## Public API

```ts
import { I18nProvider, useT, useLocale, LOCALES } from '@/i18n';

// In App.tsx (top-level):
<I18nProvider>
  <Nav />
  <main>...</main>
</I18nProvider>

// In any component:
const t = useT();
<h1>{t('hero.title')}</h1>
<p>{t('greeting', { name: 'Reylan' })}</p>

const { locale, setLocale, locales } = useLocale();
// locales === ['es', 'en']
```

## Type system

```ts
// types.ts
export type Locale = 'es' | 'en';

// Recursive path generator (depth-limited to 4 for compile speed)
type Path<T, D extends number = 4> = D extends 0
  ? never
  : T extends Record<string, unknown>
    ? { [K in keyof T & string]: T[K] extends string
        ? K
        : T[K] extends Record<string, unknown>
          ? `${K}.${Path<T[K], Prev<D>>}`
          : K }[keyof T & string]
    : never;

export type TKey = Path<Catalog>;
export type TFunc = <K extends TKey>(key: K, params?: Record<string, string | number>) => string;
```

Arrays in catalog (e.g. `preview.lines`, `bullets`) are addressed by full path; consumers map them as plain arrays returned from a typed selector helper if needed.

## Catalog shape

```ts
// locales/es.ts
export const es = {
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
    tagline: 'Construyo sistemas que respiran — interfaces tech-noir, APIs sólidas, código que envejece bien.',
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
      title: 'Cuatro proyectos, una obsesión: herramientas que se sienten vivas.',
      description: 'Cada card es un sistema en producción o cerca. Scrollea para apilarlas como un mazo — la que está al frente cuenta su historia.',
    },
    stack: { eyebrow: 'Stack', title: '...', description: '...' },
    experience: { eyebrow: 'Track record', title: '...', description: '...' },
    about: { eyebrow: 'About', title: '...', description: '...' },
    contact: { eyebrow: 'Contact', title: '...' },
  },
  projects: {
    'vault-os': {
      name: 'Vault.OS',
      tagline: 'Operating system for personal knowledge.',
      description: 'Sistema modular tipo terminal para capturar, enlazar y resucitar notas...',
      preview: {
        title: '~/vault.os — fish · 92×24',
        lines: ['$ vault open --workspace=lab', '→ 1,284 notes · 312 links · 18 stacks', /* ... */],
      },
      highlights: [
        { label: 'notes indexed', value: '1.2k' },
        /* ... */
      ],
    },
    'atlas-api': { /* ... */ },
    'ink-cms': { /* ... */ },
    'pulse-monitor': { /* ... */ },
    'relay-gateway': { /* ... */ },
    'tempo-analytics': { /* ... */ },
    'mosaic-studio': { /* ... */ },
  },
  experience: {
    'avocado-block': {
      role: 'Senior Full Stack Engineer',
      bullets: [
        'Lidero la arquitectura de productos internos...',
        /* ... */
      ],
    },
    /* ... */
  },
  about: {
    p1: 'Soy {name}, full stack engineer especializado en producto...',
    p2: 'Diseño antes de codear...',
    p3: 'Cuando no estoy en el editor: leyendo sci-fi...',
    statsLabel: 'stats',
    metrics: [
      { label: 'años construyendo', value: '6+' },
      /* ... */
    ],
  },
  contact: {
    eyebrow: "let's build",
    title: '¿Tienes una idea? La construimos esta semana.',
    cv: 'Download CV',
  },
  footer: {
    rights: '© {year} · {name} · Built from scratch',
  },
} as const;

export type Es = typeof es;
```

```ts
// catalog.ts
import type { es } from './locales/es';
export type Catalog = typeof es;
```

```ts
// locales/en.ts
import type { Catalog } from '../catalog';
export const en = {
  nav: { work: 'Work', stack: 'Stack', /* ... */ },
  /* same shape, all keys translated */
} satisfies Catalog;
```

## Data layer migration plan

| File | Stays | Moves to i18n |
|---|---|---|
| `data/site.ts` | `name`, `email`, `social`, `cvUrl`, `nav[].id` | `role`, `tagline`, `location`, `quickFacts[].label`, `metrics[].label`, `nav[].label` |
| `data/projects.ts` | `id`, `index`, `year`, `role` (job title in EN — debatable, keep), `stack`, `accent`, `preview.kind`, `preview.method/endpoint/status/latency`, `preview.points`, `preview.tiles[].tone` | `name`, `tagline`, `description`, `preview.title`, `preview.lines`, `preview.request`, `preview.response`, `preview.tiles[].label`, `highlights[].label`, `highlights[].value` |
| `data/experience.ts` | `company`, `period`, `location` | `role`, `bullets` |
| `data/stack.ts` | all (brand names) | nothing |

**Helper for project consumers:**

```ts
// hooks/useProject.ts
export function useProject(id: ProjectId) {
  const meta = projects.find((p) => p.id === id);
  const t = useT();
  const i18n = t.raw(`projects.${id}`); // raw subtree access
  return { ...meta, ...i18n };
}
```

`t.raw()` is a small extension of `t()` that returns the unstring-coerced subtree (objects, arrays). Implemented as a method on the function via `Object.assign(t, { raw })`.

## Provider behavior

```tsx
// I18nProvider.tsx
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((next: Locale) => {
    setStored(next);
    setLocaleState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale }), [locale, setLocale]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
```

Both catalogs are statically imported (~3KB gz each). No lazy loading in v1; trivial to add later if catalogs grow.

## useT implementation

```ts
const CATALOGS: Record<Locale, Catalog> = { es, en };

export function useT(): TFunc & { raw: <K extends string>(key: K) => unknown } {
  const { locale } = useContext(I18nContext);
  const catalog = CATALOGS[locale];

  const t = useMemo(() => {
    const base = (key: string, params?: Record<string, string | number>) => {
      const raw = key.split('.').reduce<unknown>((acc, k) => (acc as any)?.[k], catalog);
      if (typeof raw !== 'string') {
        if (import.meta.env.DEV) console.warn(`[i18n] missing string for key "${key}" in "${locale}"`);
        return key;
      }
      return params ? interpolate(raw, params) : raw;
    };
    base.raw = (key: string) =>
      key.split('.').reduce<unknown>((acc, k) => (acc as any)?.[k], catalog);
    return base as TFunc & { raw: <K extends string>(key: K) => unknown };
  }, [locale, catalog]);

  return t;
}
```

## Switcher

```tsx
// components/ui/LocaleSwitcher.tsx
export function LocaleSwitcher({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { locale, setLocale, locales } = useLocale();
  return (
    <ul className="flex items-center gap-1 rounded-full border border-ink-700/70 bg-ink-900/60 p-1 backdrop-blur">
      {locales.map((l) => {
        const active = l === locale;
        return (
          <li key={l} className="relative">
            <button
              onClick={() => setLocale(l)}
              className={cn('relative px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em]',
                active ? 'text-bone' : 'text-bone-dim hover:text-bone')}
              aria-pressed={active}
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

Used in `Nav` (between `NavPill` and "Hire me") and `MobileDrawer` (top of menu).

## Consumer migration

Each section file replaces hardcoded strings with `t()` calls. Example:

```tsx
// Before:
<Section
  id="work"
  label="The Deck — work"
  title={<>Cuatro proyectos, una <span className="text-accent">obsesión</span>: ...</>}
  description="Cada card es un sistema en producción..."
>

// After:
const t = useT();
<Section
  id="work"
  label={t('sections.work.eyebrow')}
  title={<RichText template={t('sections.work.title')} />}
  description={t('sections.work.description')}
>
```

`<RichText>` is a tiny helper that wraps the substring matched by a marker (e.g. `[accent]obsesión[/accent]`) in `<span className="text-accent">`. Marker syntax is part of the catalog convention.

## Detection / persistence

```ts
// detect.ts
export function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem('locale');
  if (stored === 'es' || stored === 'en') return stored;
  const nav = window.navigator.language?.slice(0, 2).toLowerCase();
  return nav === 'en' ? 'en' : 'es';
}

// persist.ts
export function setStored(locale: Locale) {
  try { window.localStorage.setItem('locale', locale); } catch { /* private mode */ }
}
```

## Interpolation

```ts
// interpolate.ts
export function interpolate(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] !== undefined ? String(params[key]) : `{${key}}`
  );
}
```

## Performance

- Both catalogs imported synchronously: ~6KB gz total. Negligible.
- `useT` memoizes the `t` function per locale. Switching locale re-renders all consumers exactly once.
- No runtime parsing (catalog is a literal). No regex compilation per call beyond the simple interpolation regex.

## Accessibility

- `document.documentElement.lang` updated on every change.
- Switcher buttons use `aria-pressed` for active state.
- Switcher has `aria-label="Language"` on the wrapping `ul`.

## SEO (light)

- `<html lang>` reflects current locale.
- Optional v2: emit `<link rel="alternate" hreflang>` per locale at build time.

## Out of scope (v1)

- SSR / hydration mismatch handling.
- Pluralization (no current copy needs it).
- Date/number formatting via `Intl` inside the module.
- RTL.
- External translation tooling (`.po`, Crowdin).
- Lazy loading of locale chunks.

## Extensibility checklist

- [ ] Add `pt` locale → create `locales/pt.ts satisfies Catalog`, add `'pt'` to `Locale` union, append to `LOCALES` array, add to switcher.
- [ ] Add new section text → add key to `es.ts` first; TS forces matching key in `en.ts`.
- [ ] Add interpolation param → update template; callers without param see literal `{param}` placeholder until fixed.
