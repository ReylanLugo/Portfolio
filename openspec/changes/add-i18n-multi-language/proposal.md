# Proposal — add-i18n-multi-language

## Why

El portfolio actual es 100% en español, lo cual cierra la puerta a reclutadores y colaboradores anglo-parlantes. La audiencia objetivo (oportunidades remotas internacionales) requiere inglés como lengua franca. Los textos están dispersos: parte en `src/data/{site,projects,experience}.ts`, parte hardcoded en componentes (Hero, Section labels, Contact CTAs, Footer). Sin un sistema centralizado, agregar un idioma significa intervenir decenas de archivos con riesgo de divergencias y olvidos. Implementar i18n ahora — antes de que el contenido crezca — es barato (~150 LOC, cero deps) y deja la base lista para expandir locales en el futuro con una sola adición de archivo.

## What Changes

**Texts living in `src/data/`**
- From: español hardcoded como `string` directos en `data/site.ts`, `data/projects.ts`, `data/experience.ts`.
- To: campos de texto migran a `src/i18n/locales/{es,en}.ts`; `data/` retiene solo metadata neutral (ids, fechas, accent colors, stack arrays, social URLs, preview kinds y datos técnicos).
- Reason: separar metadata estructural de copy localizable; permitir paridad ES/EN forzada por TypeScript.
- Impact: non-breaking en runtime (consumers usan `useT()` y `useProject(id)`); breaking en el shape interno de `data/` (refactor coordinado).

**Texts hardcoded in components**
- From: strings literales en JSX (`<h1>Reylan Lugo.</h1>`, `<a>Ver el deck</a>`, eyebrows, descripciones, CTAs, footer).
- To: reemplazados por `t('hero.title')`, `t('hero.cta.deck')`, etc.
- Reason: única fuente de verdad por idioma; cambios de copy en un solo lugar.
- Impact: non-breaking visualmente; cada section file se actualiza para llamar `useT()`.

**New module `src/i18n/`**
- Provider, hook, catalog types, detect/persist helpers, interpolation. ~150 LOC, cero deps nuevas. Bundle adicional ~6KB gz (catalogs ES+EN).

**New atom `LocaleSwitcher`**
- Pill segmentado `ES | EN` consumido por `Nav` (desktop) y `MobileDrawer` (mobile). Respeta sistema de `motion.layoutId` ya usado para active section.

**HTML `lang` attribute**
- From: `<html lang="es">` estático.
- To: actualizado dinámicamente por `I18nProvider` al cambiar locale.
- Reason: SEO + accesibilidad correcta para screen readers.

**Detection / persistence**
- Nuevo: `getInitialLocale()` lee `localStorage.locale` → `navigator.language` → fallback `'es'`.
- Nuevo: `setLocale()` persiste en `localStorage`.

## Capabilities

### New Capabilities

- `i18n-runtime`: hook + provider que expone `t(key, params?)` tipado, gestiona el locale activo, persiste la elección del usuario, sincroniza `<html lang>`, y carga catálogos estáticamente en el bundle.
- `text-catalog`: estructura tipada de catálogos por idioma (`locales/es.ts`, `locales/en.ts`) con `Catalog = typeof es` como single-source-of-truth y `satisfies Catalog` forzando paridad de keys en otros idiomas.
- `locale-switcher-ui`: atom `LocaleSwitcher` con pill segmentado animado, integrado en nav desktop y drawer mobile, accesible (`aria-pressed`, `aria-label`).

### Modified Capabilities

(No hay specs previos en `openspec/specs/` — este es el primer change que agrega capabilities al repo.)

## Impact

**Affected code**
- Nuevo: `src/i18n/` (10 archivos), `src/components/ui/LocaleSwitcher.tsx`, `src/hooks/useProject.ts` (helper opcional).
- Modificado: `src/App.tsx` (envuelve con `<I18nProvider>`), `src/components/nav/Nav.tsx` y `MobileDrawer.tsx` (insertan switcher), todos los archivos en `src/components/sections/` (consumen `useT`), `src/components/project/ProjectCard.tsx` y `src/components/previews/*.tsx` (consumen textos via i18n).
- Refactor: `src/data/site.ts`, `src/data/projects.ts`, `src/data/experience.ts` reducen a metadata pura.
- Sin cambios: `src/data/stack.ts` (brand names), `src/components/effects/*`, `src/components/deck/DeckCard.tsx` (lee `name` desde catalog vía proyecto).

**APIs**
- Nuevas exports públicas: `I18nProvider`, `useT`, `useLocale`, `LOCALES`, tipos `Locale`, `Catalog`, `TKey`, `TFunc`.

**Dependencies**
- Cero deps nuevas. Solo TS estructural.

**Bundle**
- +~6KB gz por los dos catálogos. JS adicional del provider/hook ~1KB gz.

**Testing**
- Build limpio (`pnpm build`) + typecheck (`pnpm typecheck`) son la verificación primaria — TS garantiza paridad de keys.
- Smoke manual: cambiar idioma en `Nav`, recargar y verificar persistencia, cambiar idioma del browser y verificar auto-detect.

**Riesgos**
- Si una key se usa en código pero falta en el catalog → TS error en compile. Bajo riesgo.
- Si una traducción al inglés es awkward → afecta perception, no runtime. Mitigación: review humano del `en.ts`.
- LocalStorage no disponible (modo incógnito estricto) → fallback gracioso al detect del navegador, no falla.
