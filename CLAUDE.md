# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio SPA — Reylan Lugo, full-stack engineer. Tech-noir dark UI with a card-deck centerpiece, lava-lamp scroll-linked blobs, and seven distinct project preview variants. Single page with smooth-scroll anchors.

## Commands

```bash
pnpm dev          # vite dev server, http://localhost:5173
pnpm build        # tsc -b && vite build
pnpm preview      # serve dist/ for smoke testing
pnpm typecheck    # tsc --noEmit (no build artifacts)
pnpm lint         # eslint .
```

`pnpm` is the canonical manager (`pnpm-lock.yaml`). `package-lock.json` exists as a legacy artifact — do not regenerate it. If touching deps, use `pnpm add/remove`.

## Architecture

**Single-page, no router, no global state.** Composition flows top-down: `App.tsx` → `<Nav>` + `<main>` (sections) + `<Footer>` + lazy effects. Sections are sticky-stacked or revealed on scroll; content is data-driven.

### Folder layout

`src/components/` uses a **feature-folder pattern** (Vercel/Linear style), not literal atomic-design names:

| Folder | Contents | Coupling rule |
|---|---|---|
| `ui/` | Reusable primitives (buttons, chips, eyebrow, marquee, scramble, count-up, glow card, stat tiles, section wrapper, reveal) | Zero domain coupling |
| `nav/` | `Nav` orchestrator + `NavLogo`, `NavPill`, `MobileDrawer` | Nav-specific |
| `deck/` | `HeroDeck` orchestrator + `DeckCard`, `DeckIndicator`, `DeckCardMark`, `deckSlots` | Hero deck only |
| `project/` | `ProjectCard` + locally-coupled `BlobLayer`, `MetricLine` | Project section only |
| `previews/` | `ProjectPreview` switch + 7 kind-renderers (`Terminal`, `Editor`, `Browser`, `Mobile`, `Api`, `Graph`, `Gallery`) + `PreviewFrame`, `WindowChrome` | Preview rendering only |
| `effects/` | `ParticlesBg`, `CursorGlow` (lazy-loaded, reduced-motion guarded) | Background effects |
| `layout/` | `Footer` | Site chrome |
| `sections/` | `Hero`, `Projects`, `Stack`, `Experience`, `About`, `Contact` — page-level composers | Compose everything |

**Decision rule for new components:** if reusable across features → `ui/`. If only used in one feature → that feature's folder, imported relatively (`./Foo`). If used once in a single section → inline as a local sub-component, don't extract.

### Other top-level dirs

- `src/lib/` — pure helpers (no React): `accent.ts` (single source for accent palette), `blob.ts` (lava-lamp blob path generator with seeded RNG), `hash.ts`, `rng.ts`, `cn.ts`, `constants.ts`.
- `src/hooks/` — `useLenis`, `useReducedMotion`, `useActiveSection`, `useScrollActive`, `useDeckCycle`, `useCountUp`.
- `src/data/` — content layer: `site`, `projects`, `experience`, `stack`. **Edit content here, not in components.**
- `public/` — `favicon.svg`, `cv-reylan-lugo.pdf` (placeholder).

### Path alias

`@/*` → `src/*` (configured in `tsconfig.json` and `vite.config.ts`). Use `@/components/...`, `@/hooks/...`, `@/lib/...`, `@/data/...` for non-relative imports.

### Animation & perf guardrails

- **Every animated component must respect `prefers-reduced-motion`.** Use `useReducedMotion()` from `@/hooks` and either skip the animation or render a static fallback. CSS-level guard in `index.css` already neutralizes durations globally, but JS-driven animations (Framer Motion, RAF loops, scramble, lava blobs) need explicit handling.
- **Off-screen pause**: `ProjectCard` uses `useScrollActive` to mount lava-lamp blobs only when the card is in the active scroll range. RAF loops in effects pause on `document.visibilitychange`.
- **GPU layer hints** on heavy cards: `transform: translateZ(0)` + `will-change: transform` + `contain: paint`. Don't drop these without testing FPS.
- **Lazy-load non-essential effects**: `ParticlesBg` and `CursorGlow` are `React.lazy` + only rendered when `prefers-reduced-motion` is `no-preference`. Don't move them into the main bundle.
- **Manual chunks** (see `vite.config.ts`): `framer-motion` and `lenis` are split. Keep big libs out of the main chunk.

### Sticky deck math (Projects section)

Each `ProjectCard` is `sticky top-24` inside a parent that uses `space-y-[Xvh]` between cards. Scroll-per-transition = card height + spacer. The card has `max-h-[~86svh]` on mobile/tablet to bound DOM height (visual cropping is intentional). Don't remove the `max-h` without re-balancing the spacer or the section will require a screen-and-a-half of scroll per card.

### HeroDeck shuffle

Cards live in 4 slots (`deckSlots.ts`). Index math `(projectIdx - cycle + n*1000) % n` rotates which project lands in which slot. The card going to the back uses keyframe arrays (lift up, arc, settle); other slots use spring transitions. Auto-advance every 3.5s via `useDeckCycle`, paused on hover, manual advance on click.

## Styling

Tailwind 3 with custom tokens in `tailwind.config.ts`:

- Colors: `ink-{600..950}`, `bone` / `bone-dim` / `bone-mute`, `accent` / `accent-glow` / `accent-deep`.
- Fonts: `font-display` (Space Grotesk Variable), `font-mono` (JetBrains Mono Variable), both self-hosted via `@fontsource-variable/*`.
- Custom shadows: `shadow-glow`, `shadow-glow-lg`, `shadow-card`.
- Custom keyframes: `marquee`, `marquee-reverse`, `float`, `pulseGlow`.

Per-project accent colors are mapped centrally in `src/lib/accent.ts`. Adding a new accent requires updating that map only.

## Conventional commits

Format: `type(scope): description`. Types in use: `feat`, `fix`, `chore`, `docs`, `refactor`, `perf`, `style`, `build`, `ci`, `test`. Scope is the feature folder (`ui`, `nav`, `deck`, `project`, `previews`, `sections`, `data`, `lib`, `hooks`, `layout`, `effects`).

**Do NOT add `Co-Authored-By: Claude` or any AI attribution to commits.** User explicitly prefers clean attribution.

## OpenSpec / superpowers-bridge

This repo uses [`superpowers-bridge`](https://github.com/JiangWay/openspec-schemas/tree/main/superpowers-bridge) as the default OpenSpec schema (set in `openspec/config.yaml`). The schema is bundled at `openspec/schemas/superpowers-bridge/`. Keep `openspec/` (including `changes/archive/`) committed — it's project history.

<!-- Source: superpowers-bridge/templates/adopters/CLAUDE.md.fragment.md -->

### Workflow routing (read on session start)

This repo uses [`superpowers-bridge`](https://github.com/JiangWay/openspec-schemas/tree/main/superpowers-bridge) to bridge OpenSpec and Superpowers. Integration rules (language, artifact paths, PRECHECK) follow that bridge's README; this section is the routing guidance for Claude.

#### Entry routing

| Trigger you observe | What to do |
|---|---|
| User starts a narrative "design discussion / let's brainstorm" | Run verbal `superpowers:brainstorming`, but **do NOT** write to `docs/superpowers/specs/`. Once the conversation converges per the 5 criteria below, promote to `/opsx:propose` |
| User invokes `/opsx:new` / `/opsx:ff` / `/opsx:propose` directly | Follow the schema's flow; artifact instructions inject at each step |
| User explicitly says bug fix / typo / config tweak / doc update | Direct PR — **do NOT** open a change (see skip rules below) |
| User is mid-change | Advance with `/opsx:continue`, `/opsx:apply`, `/opsx:verify`, or `/opsx:archive` |

#### When NOT to use opsx (direct PR)

| Scenario | Direct PR? |
|---|---|
| New feature / new capability / architectural change / breaking change | ❌ Use opsx |
| Bug fix (no contract change) / test backfill / linter tweak / non-breaking upgrade / typo / docs / config value tweak | ✅ Direct PR |

Principle: **process ceremony scales with risk**. External contracts / schema / cross-system integration / compliance → opsx. Otherwise → direct PR.

#### Verbal brainstorm → opsx promotion criteria

All 5 must hold before promoting (any missing → keep brainstorming, **never** write to `docs/superpowers/specs/`):

1. **Scope locked** — one sentence describes what's in / out
2. **Major design forks resolved** — alternatives weighed; remaining TBDs have an owner and impact-scope statement
3. **Cross-system dependencies mapped** — ready / mockable / genuinely unknown — pick one per dep
4. **Acceptance criteria stateable** — concrete pass conditions (e.g., `pnpm build` passes + N deliverables)
5. **Conversation converging** — recent turns are confirmations, not new alternatives

When all 5 hold → proactively suggest "ready to `/opsx:propose`?" — wait for user ack. Never auto-trigger.

#### Front-door anti-patterns (don't do)

- Letting brainstorming write to `docs/superpowers/specs/`
- Letting writing-plans write to `docs/superpowers/plans/`
- Promoting to opsx with unresolved blocking TBDs
- Opening a change for bug fix / typo

Full detail: [superpowers-bridge README §Entry & exit gates](https://github.com/JiangWay/openspec-schemas/blob/main/superpowers-bridge/README.md#entry--exit-gates).
