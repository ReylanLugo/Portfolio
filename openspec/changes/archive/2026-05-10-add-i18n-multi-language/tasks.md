## 1. Module skeleton

- [x] 1.1 Create `src/i18n/types.ts` with `Locale`, `LOCALES`, `Path<T>`, `TKey`, `TFunc`
- [x] 1.2 Create `src/i18n/locales/es.ts` exporting `es as const` with the agreed nested catalog shape (nav, hero, sections, projects, experience, about, contact, footer, a11y)
- [x] 1.3 Create `src/i18n/catalog.ts` exporting `Catalog = typeof es`
- [x] 1.4 Create `src/i18n/locales/en.ts` exporting `en satisfies Catalog` with English translations for every key
- [x] 1.5 Create `src/i18n/interpolate.ts` with `interpolate(template, params)` using `{name}` token regex
- [x] 1.6 Create `src/i18n/detect.ts` with `getInitialLocale()` (localStorage → navigator → 'es' fallback, ignoring unsupported values)
- [x] 1.7 Create `src/i18n/persist.ts` with `getStored()` / `setStored(locale)` wrapping localStorage in try/catch
- [x] 1.8 Create `src/i18n/I18nProvider.tsx` with context, state, `useEffect` for `document.documentElement.lang`, memoized value
- [x] 1.9 Create `src/i18n/useT.ts` returning typed `t(key, params?)` plus `t.raw(key)`, with dev-mode console.warn on missing key
- [x] 1.10 Create `src/i18n/useLocale.ts` returning `{ locale, setLocale, locales }`
- [x] 1.11 Create `src/i18n/index.ts` exporting public API: `I18nProvider`, `useT`, `useLocale`, `LOCALES`, types `Locale`, `Catalog`, `TKey`, `TFunc`

## 2. Catalog content migration

- [x] 2.1 Move `site.role`, `site.tagline`, `site.location`, `site.quickFacts[].label`, `site.metrics[].label`, `site.nav[].label` from `src/data/site.ts` into `i18n/locales/es.ts`; update `data/site.ts` shape and types
- [x] 2.2 Move `name`, `tagline`, `description`, `preview.title`, `preview.lines`, `preview.request`, `preview.response`, `preview.tiles[].label`, `highlights[].label`, `highlights[].value` from each entry of `data/projects.ts` into `i18n.projects.<id>.*` (es and en); update `data/projects.ts` shape
- [x] 2.3 Move `role` and `bullets` from each entry of `data/experience.ts` into `i18n.experience.<company-slug>.*`; update `data/experience.ts` shape
- [x] 2.4 Add `i18n.about.p1`, `p2`, `p3`, `i18n.about.statsLabel`, `i18n.about.metrics[]` (label values)
- [x] 2.5 Add `i18n.contact.eyebrow`, `i18n.contact.title`, `i18n.contact.cv`
- [x] 2.6 Add `i18n.footer.rights` template `'© {year} · {name} · Built from scratch'`
- [x] 2.7 Add `i18n.nav.work/stack/experience/about/contact/hire`
- [x] 2.8 Add `i18n.hero.available/tagline/cta.deck/cta.github/facts.open/facts.location/facts.years/scrollHint`
- [x] 2.9 Add `i18n.sections.<id>.eyebrow/title/description` for work, stack, experience, about, contact (mark accent words with `[accent]…[/accent]` markers in titles)
- [x] 2.10 Run `pnpm typecheck` and confirm `en.ts satisfies Catalog` passes (no missing keys)

## 3. Provider wiring

- [x] 3.1 Wrap `<App />` content in `<I18nProvider>` in `src/main.tsx` or `src/App.tsx`
- [x] 3.2 Update `index.html` `<html lang="es">` to be the initial value (provider will reconcile on mount)

## 4. RichText helper

- [x] 4.1 Create `src/components/ui/RichText.tsx` that parses `[accent]...[/accent]` markers and wraps the inner text in `<span className="text-accent">`
- [x] 4.2 Export `RichText` from `src/components/ui/index.ts`

## 5. LocaleSwitcher atom

- [x] 5.1 Create `src/components/ui/LocaleSwitcher.tsx` with two buttons (one per `LOCALES` entry), `aria-pressed` per active state, `aria-label="Language"` (translated via `t('a11y.languageSwitcher')`)
- [x] 5.2 Use `motion.span` with `layoutId="locale-pill"` for the active background transition
- [x] 5.3 Click on active button is no-op; click on inactive calls `setLocale`
- [x] 5.4 Export from `src/components/ui/index.ts`
- [x] 5.5 Add `i18n.a11y.languageSwitcher` to es and en catalogs

## 6. Nav and drawer integration

- [x] 6.1 Insert `<LocaleSwitcher>` in `src/components/nav/Nav.tsx` between `<NavPill>` and the "Hire me" CTA, on `md:` breakpoint
- [x] 6.2 Insert `<LocaleSwitcher>` at the top of `src/components/nav/MobileDrawer.tsx`, above the section anchors
- [x] 6.3 Replace hardcoded "Hire me" text with `t('nav.hire')` in `Nav.tsx` and `MobileDrawer.tsx`
- [x] 6.4 Replace nav item labels with `t('nav.<id>')` calls

## 7. Section consumers

- [x] 7.1 `src/components/sections/Hero.tsx`: replace `Available · {site.location}`, tagline, CTA labels, `quickFacts` rendering, `scroll ↓` with `t()` calls; use `<ScrambleText text={t('hero.firstName')} />` for the name
- [x] 7.2 `src/components/sections/Projects.tsx`: replace `Section` props with `t('sections.work.eyebrow')`, `<RichText template={t('sections.work.title')} />`, `t('sections.work.description')`
- [x] 7.3 `src/components/sections/Stack.tsx`: replace `Section` props with `t('sections.stack.*')`
- [x] 7.4 `src/components/sections/Experience.tsx`: replace `Section` props and pass each `TimelineEntry` the localized `role` and `bullets` via `t.raw('experience.<slug>.bullets')`
- [x] 7.5 `src/components/sections/About.tsx`: replace `Bio` paragraphs with `t('about.p1')..p3`, interpolating `{ name: site.name }` in p1; replace stats label with `t('about.statsLabel')`
- [x] 7.6 `src/components/sections/Contact.tsx`: replace eyebrow, title (RichText), CV button, mail label with `t()` calls
- [x] 7.7 `src/components/layout/Footer.tsx`: replace `© {year} · {name} · Built from scratch` with `t('footer.rights', { year, name })`

## 8. Project card and previews consumers

- [x] 8.1 Create `src/hooks/useProject.ts` that merges `data/projects.ts` metadata with `t.raw('projects.<id>')` and returns a fully-localized project object
- [x] 8.2 Update `src/components/project/ProjectCard.tsx` to use `useProject(id)` for `name`, `tagline`, `description`, `highlights`
- [x] 8.3 Update `src/components/previews/ProjectPreview.tsx` and each variant (`Terminal`, `Editor`, `Browser`, `Mobile`, `Api`, `Graph`, `Gallery`) to read localized `preview.title`, `preview.lines`, `preview.request`, `preview.response`, `preview.tiles[].label` from `useProject(id)` (or pass through props from ProjectCard)
- [x] 8.4 Update `src/components/deck/DeckCard.tsx` to read localized `name` and `tagline` via `useProject(id)`

## 9. Verification

- [x] 9.1 Run `pnpm typecheck` — must pass with zero errors
- [x] 9.2 Run `pnpm build` — must produce `dist/` with no warnings about missing keys
- [x] 9.3 Run `pnpm dev` and manually verify: switcher in nav, click EN → all visible text changes, reload page → EN persisted via localStorage
- [x] 9.4 In DevTools, set `localStorage.clear()`, override `navigator.language` to `en-US`, reload → site renders in EN
- [x] 9.5 Set `localStorage.locale = 'pt'`, reload → site falls back to navigator/default (no crash)
- [x] 9.6 Toggle `prefers-reduced-motion` on, switch locale → switcher transition is reduced/disabled, all animations honored
- [x] 9.7 Open `<html>` in DevTools → `lang` attr matches active locale at all times
- [x] 9.8 Run `openspec validate add-i18n-multi-language` — must report valid
