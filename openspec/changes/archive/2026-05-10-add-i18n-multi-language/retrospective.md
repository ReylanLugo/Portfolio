# Retrospective — add-i18n-multi-language

## §0 Evidence

| Metric | Value |
|---|---|
| Commits in branch | 31 (excluding 1 unrelated CI commit `cbad901`) |
| Diff size | 55 files changed, +4411 / −477 lines |
| Tasks done ratio | 9/9 task groups · 24/24 spec requirements |
| Active hours | ~3.5h coordinator-side; ~70 min cumulative subagent execution |
| Subagent dispatches | 14 implementers + 6 reviewers + 1 final review = **21** |
| New external dependencies | **0** (all i18n is custom, ~150 LOC) |
| Bundle delta | +3 KB gz (62.87 → 65.97 KB gz JS; CSS unchanged) |
| Post-merge bugs | 1 runtime crash in `HeroDeck` (commit `e562af0` patched) |
| OpenSpec validate at archive | ✅ valid |
| Test coverage signal | **0%** — no test runner configured in repo |
| Commit chain | `2f75334 → 6773d38 → b1baedd → a276994 → 4a08212 → 5cf780e → 10de564 → ea4e262 → 1dca887 → dc0e757 → ea34251 → b5884f1 → ac444ec → 443339f → cc3bc84 → cb78bd1 → 39f4595 → b8aabe6 → e562af0 → e27b05c → f3cd20b → 6f8332c → ae43f3e → 0945f5d → a51dd5b → 8594e0b → 30e3b97 → 24fe709 → 8fea6b4 → f2177ad` |

`cbad901 ci(pages): add GitHub Pages deploy workflow` fue mergeado al branch durante la implementación pero NO es parte del change i18n. Excluido del análisis below.

## §1 Wins

- **Zero-dependency module shipped** — ~150 LOC bajo `src/i18n/` + ~3 KB gz de catálogos. Sin react-i18next, sin lingui, sin runtime overhead. Confirmado por bundle delta (`8594e0b..f2177ad`: bundle final `66.03 KB gz` vs baseline `62.87 KB gz`).
- **Drift estructural matemáticamente imposible** — el patrón `Catalog = DeepStringify<typeof es>` + `en satisfies Catalog` significa que agregar/quitar una clave en `es.ts` rompe el typecheck en `en.ts` antes del commit. Validado al introducir 4 keys nuevas (a11y openMenu/closeMenu/deckAdvance, etc.) en commits `e27b05c`, `8594e0b`.
- **Cero `as` casts en código consumidor** — eliminados en `useProject`, `HeroDeck`, `DeckCard`, `Experience`, todos los previews. Único cast remanente: `useT.ts:42 as ValueAt<Catalog, K>` en el boundary entre lookup runtime y la API tipada (justificado e invisible para consumers). Validado por grep en commits `30e3b97`, `24fe709`, `8fea6b4`.
- **Cero `any` types en cualquier archivo i18n/consumer** — confirmado por grep `: any\| any\b\|<any>` retornando vacío.
- **Subagent caught a real plan bug early** — Task 4 (`a276994`) implementer escalated BLOCKED cuando detectó que `Catalog = typeof es` lockea literal types e impide `en satisfies Catalog`. Fix landed en commit `b1baedd` (DeepStringify) en la misma sesión, sin desperdiciar work downstream. Ejemplo canónico de cuándo `BLOCKED` es la respuesta correcta.
- **Conventional commits sin `Co-Authored-By: Claude`** — confirmado en los 30 commits del branch i18n. Cada subagent recibió la instrucción explícita y la respetó.
- **Type-safe `t.raw` con `ValueAt<T,P>`** — pattern recursivo `ValueAt` permite que `t.raw('projects.vault-os.name')` infiera precisamente `string`, eliminando todos los casts en consumidores. Originalmente no estaba en el plan; emergió del feedback "nada de as".

## §2 Misses

- 🔴 **Tests automatizados ausentes** — `tasks.md §9.3-9.7` describen smoke tests manuales (switcher click, localStorage roundtrip, `<html lang>` reactivo, prefers-reduced-motion). Cero tests automatizados ejecutaron durante el cycle. Hay vitest disponible en el ecosistema React+Vite pero el repo no tiene runner configurado. Cobertura de runtime quedó delegada a smoke manual del usuario, que descubrió el crash de `HeroDeck` (commit `e562af0`) que typecheck+build no detectaron.
- 🟡 **Plan original tenía bug en `Catalog = typeof es`** — descubierto por implementer en Task 4. Costó 1 round-trip de implementer + un commit `b1baedd` para fix antes de continuar Task 4. Mitigated by subagent-driven-development's BLOCKED escalation pattern, pero hubiera sido evitable con más rigor en el design phase (no probar el flujo `satisfies` con strings literales reales).
- 🟡 **Implementación inicial tenía ~12 casts `as`** — casts emergieron incrementalmente (cast en `useProject`, cast en `HeroDeck`, cast en `Experience`, etc.) y fueron mitigated cleanly via `Array.isArray` guards y `??` defaults. No fueron eliminados hasta que el usuario explícitamente pidió "nada de as". Tres cleanup commits (`8594e0b`, `30e3b97`, `24fe709`, `8fea6b4`) costaron tiempo extra. Si el plan hubiera incluido `ValueAt<T,P>` desde Task 1, los casts nunca hubieran entrado.
- 🟡 **Runtime crash en `HeroDeck` no atrapado por typecheck ni build** — `pnpm typecheck` y `pnpm build` ambos pasaban verde con código que crasheaba en mount. Causa raíz: `t.raw` retornaba `unknown`, los call-sites cast a string, y un retorno con shape inesperado generaba crash en `.replace()`. La gap entre type system y runtime fue cerrada por defensive guards (`String(value ?? '').replace(...)`) en commit `e562af0` Y posteriormente por `ValueAt` typing (commit `8594e0b`) que hace que el cast no sea necesario.
- 📌 **Commit no relacionado interleaveado al branch** — `cbad901 ci(pages)` fue commiteado por el usuario en el medio del workflow. No causó conflicto pero contamina el commit chain del retro. Convenir con el usuario en futuros cycles que el commit en el branch del change quede limpio.

## §3 Plan deviations

| Plan task | What changed | Why |
|---|---|---|
| Task 1 (types) | Original tenía `Catalog = typeof es`; agregamos `DeepStringify<T>` wrapper en commit `b1baedd` | `typeof es` bloquea a `en` con strings literales distintos. `DeepStringify` widening permite paridad estructural sin lock literal. |
| Tasks 10-12 (data migration) | Originalmente sin tipar IDs como union literal (`id: string`); en cleanup posterior (commit `ae43f3e`) agregamos `NavId`, `QuickFactId`, `MetricId`, `ExperienceId`, `ProjectId` | Necesario para eliminar `as 'foo.bar'` casts en consumidores. Plan no anticipaba este detalle. |
| Task 13 (useProject) | `LocalizedProject` annotation eliminada en commit `8fea6b4`; ahora retorna inferred type | Eliminar el último `as LocalizedProject` cast requería que el consumer infiriera el tipo. Más limpio sin annotation explícita. |
| Tasks 14-16 (consumers) | Cinco casts `as 'nav.work'`/`as 'hero.facts.open'`/etc. eliminados post-implementación en commit `0945f5d` | Una vez que IDs quedaron tipados como union literal, los template literals `\`nav.${item.id}\`` resuelven a TKey válido sin cast. |
| Task 18 (previews) | Nuevo archivo `previews/types.ts` no en plan original | Necesario para tipar los seven preview variants con su shape merged (data structural + i18n localized). |
| Plan §9 verification | Smoke manual nunca ejecutado por subagent; queda al usuario | Dev server no está dentro del ámbito de subagent dispatch. Verificación se hizo via typecheck/build/openspec validate. Crash detection pasó al usuario. |

## §4 Skill / workflow compliance

| Skill | Used |
|---|---|
| superpowers:brainstorming | ✅ |
| superpowers:writing-plans | ✅ |
| superpowers:using-git-worktrees | ✗ |
| superpowers:subagent-driven-development | ✅ |
| (transitive) superpowers:test-driven-development | ✗ |
| (transitive) superpowers:requesting-code-review | partial |
| superpowers:finishing-a-development-branch | pending (next step) |

### Deliberately Skipped Skills

- **`superpowers:using-git-worktrees`**
  - **What was skipped**: El skill entero. Trabajamos en `feat/i18n-multi-language` regular branch en el repo principal.
  - **Why this cycle**: El cycle empezó con la directiva del usuario "/opsx:apply" sobre un repo que no tenía worktrees configurados. El plan tampoco lo mencionaba. Toda la implementación fue mono-branch sin necesidad de aislamiento (no había trabajo paralelo concurrente; cada subagent comiteaba secuencial al mismo branch).
  - **How to prevent recurrence**: `one-off — schema boundary case, no prevention possible`. El boundary aquí: en proyectos solo-developer sin paralelismo, branches son suficientes y worktrees son ceremony. Si el repo gana CI/CD que requiere isolation o si el usuario empieza paralelizar features, el subagent-driven-development debería revisitar este. Por ahora no hay trigger para forzar worktrees.

- **`superpowers:test-driven-development` (transitive)**
  - **What was skipped**: TDD entero. Cero tests escritos antes de código. Cero tests escritos después tampoco.
  - **Why this cycle**: El repo no tiene Vitest/Jest/etc. configurado. Plan §9.3-9.7 listaba checks como "manual smoke" deferred. Ningún subagent escribió tests porque no había runner. Múltiples reviewer subagents flagged "Add tests / scaffold vitest" como followup; quedó sin acción.
  - **How to prevent recurrence**: `CLAUDE.md trigger` — agregar a `CLAUDE.md` (o al fragment de superpowers-bridge) una directiva: "Si el plan menciona smoke tests pero el repo no tiene test runner, propose scaffolding vitest como Task 0 antes de empezar implementation." Esto hubiera obligado a configurar el runner antes de Task 1, y los implementers podían escribir TDD en cada task posterior. Específicamente: agregar a `CLAUDE.md > Workflow routing` la regla "if `pnpm typecheck` is the only verification mechanism, request user permission to add Vitest before applying any plan with runtime behavior requirements."

- **`superpowers:requesting-code-review` (transitive)**
  - **What was skipped**: El skill formal de requesting-code-review (`code-reviewer.md` template). En su lugar dispatch'amos `code-reviewer` subagent type ad-hoc con prompts custom hechos in-line.
  - **Why this cycle**: El subagent-driven-development skill define dos templates de reviewer (spec + quality) que son sus propios prompts. No invoqué el `requesting-code-review` skill formalmente; dispatch'aba directo al `code-reviewer` agent type con prompts construidos a mano basados en los templates de subagent-driven-development. Funcionalmente cubre el mismo caso pero técnicamente "skipped" el skill por nombre.
  - **How to prevent recurrence**: `skill description tightening` — clarificar en `superpowers:requesting-code-review` que el skill abarca el dispatch del code-reviewer subagent (no solo el caso humano-pide-review-a-Claude), y referenciarlo desde `subagent-driven-development` como sub-skill explícito. Hoy el lazo es implícito; haría las dependencias entre skills más legibles.

- **`superpowers:finishing-a-development-branch`**
  - **What was skipped**: Aún no skipped — pendiente. Se ejecutará después del archive como next step.
  - **Why this cycle**: N/A — todavía está en la cola.
  - **How to prevent recurrence**: N/A.

## §5 Surprises

- **`Catalog = typeof es` lockea literal types** — assumption inicial: `typeof <const object>` produciría un type structural reusable para otros locales. Realidad: produce un type con literal strings, prevenido a strings distintos. Resuelto por `DeepStringify`. Surprise capturada en `b1baedd`.
- **`useT().raw()` necesitaba `ValueAt<T,P>` para ser cast-free** — assumption: `t.raw` retornando `unknown` con casts en call-sites era aceptable. Realidad: el usuario lo rechazó explícitamente, forzando el desarrollo de `ValueAt` recursive type. Surprise constructiva — el resultado es estrictamente mejor.
- **El auto mode classifier de Claude Code bloquea `git push --force-with-lease` a main** — assumption: el classifier solo bloquearía hard reset / push --force literal. Realidad: bloquea `--force-with-lease` también, incluso con consent del usuario. Resolved por trasladar el push al usuario (conversación arriba).
- **Subagents no pueden ejecutar `pnpm dev`** — assumption: smoke tests podían correr dentro del subagent dispatch. Realidad: dispatchear un servidor en background dentro de un subagent es difícil porque el subagent termina. Smoke quedó manual.
- **`item.id` con tipo `string` produce `string` en template literal incluso con `as const`** — assumption: arrays con `as const` darían `id` como literal union. Realidad: requiere `as const satisfies readonly { id: <Union> }[]` o explicit `id: 'work' as const` para preservar literal. Solo cuando agregamos `NavId`/`QuickFactId`/`MetricId` los template literals empezaron a resolver al union estricto.

## §6 Promote candidates → long-term learning

- [ ] 🔴 **Type IDs as literal unions from day 1, not `string`.** → **Promote to memory** (type: feedback)
  > **Why**: En este cycle, casi todos los casts `as 'foo.bar'` que tuvimos que eliminar a posteriori se debieron a que `id: string` no se narrowea a una key concreta del catálogo en template literals. La regla aplica a cualquier sistema con dispatch dinámico por ID (i18n, routing, plugin registry, event handlers).
  > **How to apply**: Cuando un dato fixed (nav items, project list, locale list, status enum) tiene un campo `id`, declarar `type FooId = 'a' | 'b' | 'c'` y tipar el array como `readonly { id: FooId }[]`. Aplica especialmente cuando consumers usan template literals tipo `\`prefix.${item.id}\``.

- [ ] 🟡 **Para custom catalogs con `satisfies <Type>`, usar `DeepStringify<typeof canonical>` en vez de `typeof canonical` directo.** → **Promote to memory** (type: feedback)
  > **Why**: `typeof <const>` lockea string literals. Cualquier catalog con multi-locale o multi-environment va a chocar contra esto al primer locale alterno. Identificado en commit `b1baedd` después de un blocked-and-fix round-trip.
  > **How to apply**: Cuando se diseña un `Catalog` type derivado de un canonical const para que otras "instancias" lo cumplan, agregar `type Catalog = DeepStringify<typeof es>;` con widening recursivo de literal strings → string en hojas, preservando structure.

- [ ] 🟡 **Si el repo no tiene runner de tests pero el plan tiene smoke checks runtime, scaffold Vitest como Task 0 antes de Task 1.** → **Promote to project CLAUDE.md** (sección `Workflow routing`)
  > **Why**: En este cycle, los 5 smoke checks runtime de plan §9.3-9.7 quedaron como "deferred to user". El crash de `HeroDeck` (e562af0) fue detectado solo en dev manual, después de que typecheck+build pasaron verde. Un test runner habría capturado ese crash en CI.
  > **How to apply**: Antes de aplicar un plan que mencione smoke tests pero el repo no tenga test runner configurado, proactivamente proponer agregar vitest (o el equivalente). Decisión binaria: agregar runner ahora, o renombrar los checks como "manual" en plan.

- [ ] 📌 **`useProject` con return inferido (sin type annotation) es preferible a uno explícito cuando el shape es complejo.** → **One-off** (no generaliza universalmente)
  > **Why**: En este caso particular el merge de `meta + i18n.preview` produce un type que es difícil declarar manualmente sin perder precisión o sin caer en `as`. Inferred return type evita el cast. Pero la guía general "siempre usa inferred returns" sería peor — explicit returns son más estables para APIs públicas.
  > **How to apply**: Solo en hooks internos donde el merge es local y el shape no es API pública. Para hooks/funciones expuestas, mantener annotation explícita.
