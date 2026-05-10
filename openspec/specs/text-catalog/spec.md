# text-catalog Specification

## Purpose
TBD - created by archiving change add-i18n-multi-language. Update Purpose after archive.
## Requirements
### Requirement: Spanish catalog is the canonical type source

The Spanish catalog (`src/i18n/locales/es.ts`) MUST be a TypeScript object literal annotated with `as const`, and the exported type `Catalog` MUST be derived from it via `typeof es`. All other locale catalogs MUST validate against `Catalog`.

#### Scenario: Adding a new key to es.ts
- **WHEN** a developer adds a new key to `es.ts` (e.g. `nav.blog: 'Blog'`)
- **THEN** the type `Catalog` automatically includes the new key, and TypeScript reports an error in any other locale file that doesn't declare the same key

#### Scenario: en.ts uses satisfies
- **WHEN** `en.ts` exports an object using `satisfies Catalog`
- **THEN** TypeScript MUST require every key present in `Catalog` to also be present in `en.ts` with a string (or matching shape) value

### Requirement: Catalog keys are dot-notation paths to string leaves

The catalog MUST be a nested object whose leaves are either `string`, `readonly string[]`, or arrays of plain object literals (e.g. `{ label: string; value: string }`). Path types MUST resolve only to string-leaf paths for the `t()` function; non-string leaves MUST be accessible only via `t.raw()`.

#### Scenario: String leaf key autocomplete
- **WHEN** a developer types `t('hero.')` in an editor with TypeScript LSP
- **THEN** autocomplete MUST list keys whose leaf is a string (e.g. `available`, `tagline`, `scrollHint`) and exclude keys whose leaf is an array or object

#### Scenario: Non-string path with t()
- **WHEN** a developer writes `t('projects.vault-os.preview.lines')` (path resolves to an array)
- **THEN** TypeScript MUST emit a type error because `t()` only accepts string-leaf paths

#### Scenario: Non-string path with t.raw()
- **WHEN** a developer writes `t.raw('projects.vault-os.preview.lines')`
- **THEN** TypeScript MUST allow this and infer the return type as the matching subtree

### Requirement: Supported locales are explicitly enumerated

The constant `LOCALES` MUST be a `readonly` tuple of supported locale codes. The type `Locale` MUST be derived from `LOCALES[number]`. Adding a new locale to the system MUST be a single-source edit to this tuple plus a new file under `locales/`.

#### Scenario: Reading available locales
- **WHEN** a consumer reads `LOCALES`
- **THEN** the returned value is a frozen tuple `['es', 'en'] as const`

#### Scenario: Adding a new locale (extensibility)
- **WHEN** a developer adds `'pt'` to `LOCALES` without creating `locales/pt.ts`
- **THEN** TypeScript MUST emit an error at the registry that maps `Locale` to catalog (`CATALOGS: Record<Locale, Catalog>`)

### Requirement: Stack chip labels are not translated

The catalog MUST NOT contain entries for technology brand names listed in `src/data/stack.ts` (e.g. `React`, `Postgres`, `Tailwind`). These remain as-is across locales.

#### Scenario: Stack data file is unchanged
- **WHEN** the i18n module is fully implemented
- **THEN** `src/data/stack.ts` continues to export plain string arrays, and no `i18n.stack.*` keys exist

