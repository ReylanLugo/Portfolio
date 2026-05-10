# Reylan Lugo · Portfolio

SPA en React + TypeScript construida con Vite. Diseño tech-noir Card Deck (estilo solcard) con animaciones Framer Motion + smooth scroll Lenis. Single page con scroll y anchors smooth, totalmente responsive.

## Stack

- Vite 5 + React 18 + TypeScript
- Tailwind CSS 3 (tokens custom: `ink`, `bone`, `accent`)
- Framer Motion (reveals, scroll-linked animations)
- Lenis (smooth scroll)
- `@fontsource-variable/space-grotesk` + `jetbrains-mono` (self-hosted)
- Lucide React icons

## Comandos

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # bundle de producción en dist/
npm run preview    # smoke test del build
npm run typecheck  # tsc --noEmit
```

## Estructura

```
src/
├── App.tsx                  composición
├── main.tsx                 entry
├── index.css                tailwind + tokens + reduced-motion guard
├── data/                    contenido editable (site, projects, experience, stack)
├── hooks/                   useLenis, useReducedMotion, useActiveSection
├── lib/cn.ts                clsx wrapper
└── components/
    ├── layout/              Nav + Footer
    ├── primitives/          Section, Reveal, ScrambleText, Marquee, GlowCard
    ├── effects/             ParticlesBg, CursorGlow (lazy + reduced-motion guard)
    └── sections/            Hero, Projects, Stack, Experience, About, Contact
```

## Edición de contenido

- Nombre, role, redes, métricas, navegación: `src/data/site.ts`
- Proyectos del Card Deck: `src/data/projects.ts`
- Timeline laboral: `src/data/experience.ts`
- Chips del marquee: `src/data/stack.ts`
- CV: reemplazá `public/cv-reylan-lugo.pdf`

## Performance / a11y

- Self-hosted variable fonts (sin request a fonts.googleapis).
- `framer-motion` y `lenis` en chunks separados (manualChunks).
- `ParticlesBg` y `CursorGlow` con `React.lazy`, sólo si no hay `prefers-reduced-motion`.
- `requestAnimationFrame` se pausa cuando la pestaña está oculta.
- Respeto a `prefers-reduced-motion` en CSS global y en cada hook/componente con animación.
- Contraste AA, focus visible con outline naranja, anchors HTML reales para teclado.

## Bundle (build actual)

- JS app `~55 KB gz` + motion `~43 KB gz` + lenis `~5 KB gz`
- CSS `~8.5 KB gz`
- Total inicial ~104 KB gz JS / ~8.5 KB gz CSS

## Roadmap v2

- Casos de estudio individuales por proyecto (React Router + page transitions).
- Sección Articles / blog (MDX + RSS).
- Tweaks panel (toggle accent / densidad / nivel animación).
- Internacionalización ES/EN.
