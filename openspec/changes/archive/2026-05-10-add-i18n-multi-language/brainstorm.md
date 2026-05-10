# Brainstorm — add-i18n-multi-language

## Design Summary

Centralized, type-safe i18n module for the portfolio SPA. Custom-built (no library), TypeScript catalogs per locale (`es`, `en`), exposed through a `useT()` hook. Auto-detects browser language at first load with localStorage persistence; manual switcher in the nav. Texts are migrated out of `src/data/` into `src/i18n/locales/`; `data/` keeps only language-neutral metadata. Adding new locales is a one-file operation forced into shape by `satisfies Catalog`.

## Alternatives Considered

### Option A — Custom typed module (chosen)

- **How**: ~150 LOC across `src/i18n/` (provider, hook, catalogs, detect, persist, interpolate). Catalog is a TS object literal; `Catalog = typeof es` becomes the canonical type; other locales `satisfies Catalog`.
- **Pros**: zero deps, fits existing TS data layer, full autocomplete on keys, drift impossible at compile time, ~3KB gz.
- **Cons**: no plural/format helpers out of the box (we add a tiny `interpolate` only). Not standardized for translation management tools.
- **Why not chosen**: chosen.

### Option B — `react-i18next`

- **How**: install `i18next` + `react-i18next`, JSON catalogs per locale, `<Trans>` component or `t()` hook.
- **Pros**: industry standard, plurals/interpolation built-in, lazy load namespaces, big tooling ecosystem.
- **Cons**: ~12KB gz runtime, JSON-first (mismatch with current TS data pattern), type-safety requires `i18next.d.ts` augmentation step.
- **Why not chosen**: overkill for ~120 strings in 2 locales; adds a dependency for features (plurals, namespaces, lazy load) the portfolio doesn't need.

### Option C — `@lingui/core` + macro

- **How**: ICU MessageFormat with compile-time extraction (`<Trans>This is {name}</Trans>` → extracted to `.po`).
- **Pros**: best DX for editorial-heavy apps; ICU plurals/select/date/number; compile-time guarantees.
- **Cons**: babel macro setup, ~10KB gz, build pipeline more complex, `.po`/`.json` workflow assumes external translators.
- **Why not chosen**: unnecessary tooling complexity for a single-author portfolio with ES/EN parity maintained by the author themselves.

## Agreed Approach

Option A — custom typed module under `src/i18n/`. Rationale: the project is small (~120 strings, 2 locales, single author), already follows a TS-first data pattern, and values dependency-free + type-strict design. The custom module gives us the same ergonomics (`t('hero.cta.deck')`) as a library, locks shape parity at compile time via `satisfies Catalog`, and adds nothing to the bundle that isn't strictly needed.

## Key Decisions

1. **Storage**: TS modules (`locales/{es,en}.ts`), not JSON. Keeps autocomplete, refactor-safety, and IDE jump-to-definition working.
2. **Catalog shape**: nested-by-section (`hero.cta.deck`), accessed via dot-notation strings in `t()`. Recursive template-literal type produces compile-time key autocomplete.
3. **Source of truth**: `es.ts` defines the type (`Catalog = typeof es`); `en.ts` uses `satisfies Catalog` so missing keys are TS errors, not silent fallbacks.
4. **API**: single `useT()` returning a typed `t(key, params?)` function with a tiny `{name}` interpolation. Plus `useLocale()` for read/write of the current locale.
5. **Detection**: localStorage > `navigator.language[0..2]` > `'es'` (Spanish-first default).
6. **Persistence**: localStorage key `locale`. Updated on every `setLocale`.
7. **Side effects in provider**: `document.documentElement.lang = locale` for SEO + a11y.
8. **Switcher**: segmented pill `ES | EN` with `layoutId` motion. Lives in `Nav` (desktop) and `MobileDrawer` (mobile).
9. **Data migration**: text fields move out of `src/data/{site,projects,experience}.ts` into i18n catalogs; metadata (ids, dates, accents, stack lists, social URLs) stays in `data/`.
10. **Stack chips**: stay as brand-name strings; not translated.
11. **Out of scope (v1)**: SSR/hydration, plurals, Intl date/number formatting in the i18n module, RTL, external translation tooling.

## Open Questions

None blocking. Possible future work flagged in §11 (out of scope).
