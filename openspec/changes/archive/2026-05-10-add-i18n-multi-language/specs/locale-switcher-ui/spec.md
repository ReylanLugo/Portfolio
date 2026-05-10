# Spec — locale-switcher-ui

## ADDED Requirements

### Requirement: LocaleSwitcher renders one button per supported locale

The `<LocaleSwitcher>` atom MUST render a wrapper element with `role` semantics for a control group, containing one `<button>` per entry in `LOCALES`. Each button's text MUST be the uppercase locale code (e.g. `ES`, `EN`).

#### Scenario: Default render with two locales
- **WHEN** `LOCALES === ['es', 'en']` and `<LocaleSwitcher>` is mounted
- **THEN** the rendered DOM contains exactly two `<button>` elements with text `ES` and `EN`

#### Scenario: Render with three locales
- **WHEN** `LOCALES === ['es', 'en', 'pt']` and `<LocaleSwitcher>` is mounted
- **THEN** three buttons render in the same order as the tuple

### Requirement: Active locale is visually distinguished and announced via aria-pressed

The button corresponding to the currently active locale MUST set `aria-pressed="true"` and receive a visual treatment (active pill background) distinct from inactive siblings. Inactive buttons MUST set `aria-pressed="false"`.

#### Scenario: Initial active state
- **WHEN** the active locale is `'es'`
- **THEN** the `ES` button has `aria-pressed="true"` and the `EN` button has `aria-pressed="false"`

#### Scenario: Visual indicator transition
- **WHEN** the user clicks `EN` while `'es'` is active
- **THEN** the active background slides from `ES` to `EN` via a `motion.layoutId` transition (no instant snap), `aria-pressed` flips synchronously, and the `<html lang>` attribute updates

### Requirement: Clicking an inactive locale calls setLocale

Clicking a button whose locale is not currently active MUST invoke `setLocale(<that locale>)` exactly once. Clicking the already-active button MUST be a no-op.

#### Scenario: Switch to inactive
- **WHEN** active locale is `'es'` and user clicks `EN`
- **THEN** `setLocale('en')` is invoked and the active state visually transitions

#### Scenario: Click already-active locale
- **WHEN** active locale is `'es'` and user clicks `ES`
- **THEN** `setLocale` is NOT invoked and no re-render is triggered

### Requirement: Switcher is mounted in nav (desktop) and mobile drawer

The `<LocaleSwitcher>` MUST be rendered in `Nav` between the section pill and the "Hire me" CTA on `md+` breakpoints, and inside `MobileDrawer` above the navigation list on `<md` breakpoints.

#### Scenario: Desktop layout
- **WHEN** viewport width ≥ 768px and the page is mounted
- **THEN** the switcher is visible inside the fixed nav header

#### Scenario: Mobile drawer
- **WHEN** viewport width < 768px and the user opens the mobile menu
- **THEN** the switcher renders at the top of the drawer, above the section anchors

### Requirement: Switcher exposes accessible group label

The wrapping element of the switcher MUST carry `aria-label="Language"` (or its translated equivalent via `t('a11y.languageSwitcher')`) so screen readers announce its purpose.

#### Scenario: Screen reader announcement
- **WHEN** a screen reader focuses the switcher group
- **THEN** the announced label conveys "Language" / "Idioma" depending on active locale
