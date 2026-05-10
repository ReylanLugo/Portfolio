# i18n-runtime Specification

## Purpose
TBD - created by archiving change add-i18n-multi-language. Update Purpose after archive.
## Requirements
### Requirement: Provider initializes locale from layered detection

The `I18nProvider` MUST resolve the initial locale at mount time using a strict precedence: persisted localStorage value first, then `navigator.language` first two characters, then the default locale `'es'`. Only `'es'` and `'en'` are accepted as valid values; any other value SHALL fall through to the next layer.

#### Scenario: localStorage holds a supported locale
- **WHEN** the user previously selected `'en'` and `localStorage.locale === 'en'`
- **THEN** `I18nProvider` mounts with `locale === 'en'`

#### Scenario: localStorage missing, browser is English
- **WHEN** `localStorage.locale` is null and `navigator.language === 'en-US'`
- **THEN** `I18nProvider` mounts with `locale === 'en'`

#### Scenario: localStorage missing, browser is non-English
- **WHEN** `localStorage.locale` is null and `navigator.language === 'fr-FR'`
- **THEN** `I18nProvider` mounts with `locale === 'es'` (default)

#### Scenario: localStorage holds an unsupported value
- **WHEN** `localStorage.locale === 'pt'`
- **THEN** detection MUST ignore the stored value and continue to the next layer (navigator → default)

### Requirement: t(key) returns localized string for the active locale

The `useT()` hook MUST return a function `t(key, params?)` where calling `t` with a valid dot-notation path returns the matching string from the active locale's catalog. The function MUST be typed such that invalid keys produce a TypeScript compile-time error.

#### Scenario: Resolving a top-level key
- **WHEN** active locale is `'es'` and consumer calls `t('hero.cta.deck')`
- **THEN** the function returns `'Ver el deck'`

#### Scenario: Resolving the same key under a different locale
- **WHEN** active locale is `'en'` and consumer calls `t('hero.cta.deck')`
- **THEN** the function returns the English equivalent (e.g. `'See the deck'`)

#### Scenario: Resolving an invalid key
- **WHEN** code attempts `t('nonexistent.key')`
- **THEN** TypeScript compilation MUST fail with a type error

#### Scenario: Resolving a key whose runtime value is missing
- **WHEN** the catalog runtime path resolves to `undefined` (e.g., due to a malformed catalog)
- **THEN** `t()` MUST return the key string itself and log a console warning in development mode

### Requirement: Interpolation replaces named placeholders

`t(key, params)` MUST replace `{name}`-style tokens in the template string with values from `params`. Missing params MUST leave the literal `{name}` placeholder untouched (visible at runtime to aid debugging).

#### Scenario: Single param replacement
- **WHEN** the catalog entry is `'Hola, {name}'` and consumer calls `t('greeting', { name: 'Reylan' })`
- **THEN** the returned string is `'Hola, Reylan'`

#### Scenario: Numeric param coerced to string
- **WHEN** the catalog entry is `'{count} items'` and consumer calls `t('cart.summary', { count: 3 })`
- **THEN** the returned string is `'3 items'`

#### Scenario: Missing param keeps placeholder
- **WHEN** the catalog entry is `'Hola, {name}'` and consumer calls `t('greeting')` (no params)
- **THEN** the returned string is `'Hola, {name}'`

### Requirement: setLocale persists the choice and updates document lang

The `setLocale(next)` setter exposed by `useLocale()` MUST persist `next` in `localStorage` under key `'locale'` AND set `document.documentElement.lang = next` synchronously after the React re-render commits. Failures to write to `localStorage` (e.g. private browsing) MUST NOT throw.

#### Scenario: User switches locale
- **WHEN** the user calls `setLocale('en')` from `'es'`
- **THEN** `localStorage.locale === 'en'` and `document.documentElement.lang === 'en'` after the next paint

#### Scenario: localStorage write fails
- **WHEN** `localStorage.setItem` throws (e.g., quota exceeded or private mode)
- **THEN** `setLocale()` MUST swallow the error and still update the in-memory locale

### Requirement: Locale change re-renders all consumers exactly once

Calling `setLocale(next)` MUST trigger a single re-render in components that consume `useT()` or `useLocale()`, and that re-render MUST yield the strings of the new locale.

#### Scenario: Active locale changes from es to en
- **WHEN** a `<h1>` rendered with `t('hero.title')` is mounted under `'es'` and `setLocale('en')` is invoked
- **THEN** the `<h1>` re-renders once and its text content is the English value

### Requirement: t.raw returns subtree for object/array catalog nodes

The `t` function MUST expose a `t.raw(key)` method that returns the raw subtree (object or array) at the given path, without string coercion. This enables consumers to read structured catalog data such as `projects.<id>.preview.lines`.

#### Scenario: Reading an array node
- **WHEN** consumer calls `t.raw('projects.vault-os.preview.lines')`
- **THEN** the returned value is the typed `string[]` array of terminal lines for the active locale

#### Scenario: Reading an object subtree
- **WHEN** consumer calls `t.raw('projects.vault-os.highlights')`
- **THEN** the returned value is the array of `{ label, value }` objects for the active locale

