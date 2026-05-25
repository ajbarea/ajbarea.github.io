# ajbarea.github.io — Roadmap

Long-horizon plan for the portfolio. Session-by-session execution lives in [IMPL.md](IMPL.md). Most of the surface ships through `app/data/*.ts` content files; engineering work is the smaller share.

When a roadmap item ships, its scope block here is removed and a dated one-liner lands under [Shipped](#shipped). What's _currently active_ lives in IMPL.md.

---

## Polish

- **Light-mode thumbnail variants (asset-gated).** `ProjectCard` renders a single `thumbnailUrl` for both themes today; existing Cloudinary assets are dark-native and look harsh under the light toggle. Path forward when light assets exist: extend `Project` in `app/types/index.ts` with `thumbnailUrlLight?: string`, consume `useThemeStore().isDark` in ProjectCard's computed thumbnail, fall back to `thumbnailUrl` when no variant is defined. Reverted commit `cc00cb5` carries the exact wiring + tests for reference; the Cloudinary `e_negate` transform was tried as a stopgap and looked bad on screenshot-shaped images — don't reach for it again.
- **Blog content (first post).** `app/pages/blog/index.vue` + `app/pages/blog/[slug].vue` are scaffolded; `articles/` is empty. Surface is wired, no posts written. Content task, not engineering.

---

## Future / unprioritized backlog

- **Per-project page enrichment.** The 2026-05-21 PR (#10) added clickable cards opening detail modals + filter tags including Hackathon. Per-project pages exist for the FL stack via Zensical docs sites; the portfolio's own per-project detail layer could be richer (papers-tied, screenshots, links to docs sites). Lower priority than the polish items above.
- **Activity feed RSS / Atom.** `app/components/home/ActivityHighlights.vue` reads publications + hackathons + conferences and renders them; an RSS/Atom feed from the same data sources would let readers subscribe without periodically returning. Small generator at build-time.

---

## Cross-cutting invariants

- **README claim assertions stay green.** The 2026-05-12 PR (#7) added a CI check asserting README's project-gallery claims match the data files. Per `feedback_fragile_docs_pattern`, both the registry of fragile claims and the CI assertion are load-bearing — don't let either silently fall out of sync when new data is added.
- **Sister parity on action pins.** Dependabot (`github-actions` ecosystem) now proposes action bumps per-repo; `/techne:sisters` verifies the fleet hasn't drifted between merges. Pins like `actions/upload-artifact@v7.0.1` should still converge across sisters even though each repo's bump PR lands on its own schedule.
- **YAGNI-refactored.** The portfolio's framework substrate (Nuxt 4, Vue 3, Tailwind 4, Pinia, Nuxt Content, @nuxtjs/i18n) evolves faster than this site does. Before hand-rolling a feature, check whether the framework already ships the primitive — and conversely, don't avoid shape decisions waiting on capability you can already see arriving (the auto-translate pipeline using local Qwen2.5 over Ollama is the working example). Cross-sister mirror.
- **Stale-assumption audit.** Whenever Nuxt, Vue, Tailwind, or one of the Nitro / Vite plugins ships a major version, audit which workarounds in `app/` exist to compensate for a now-closed gap. The `@nuxtjs/i18n` v10 AST gotcha (`tm()` returning `[object Object]`), the `<NuxtLink>` non-localizing pattern, the `restructureDir` v9-vs-v10 mismatch — all are scaffolding that should unwind when upstream clears the friction. Cross-sister mirror.

---

## Shipped

One-line per item, newest first. Detail moves to git history when work lands.

- 2026-05-25 — **Dependabot dependency automation** (npm + github-actions; canonical fleet shape, techne `templates/dependabot.yml.example`). Automates the action-pin bumps previously hand-synced across sisters in a wave.
- 2026-05-21 — **Dark mode + accessibility audit** (axe-core scan in both color schemes across 5 routes; 3 real AA contrast violations fixed in-flight; per-PR theme-toggle smoke spec)
- 2026-05-21 — **Homepage `HomeSisterEcosystem` block + reciprocal `## Sister ecosystem` blocks across all six sister READMEs**
- 2026-05-21 — **Hackathon tag + 3 new projects (orchestrate-triage, bioradio-music, blockchain-explorer)** [#10]
- 2026-05-20 — **BS Computer Engineering coursework added to resume** [#9]
- 2026-05-19 — **Clickable project cards open detail modal + slim card balance fixes** [#8]
- 2026-05-18 — **CI assertion that README claims match data files** [#7]
- 2026-05-17 — **Stale project-gallery claim fixed (count + filters)** [#6]
- 2026-05-16 — **actions/upload-artifact pinned to v7.0.1 for sister parity** [#5]
- 2026-05-15 — **PR validation workflow (lint + unit + build + e2e in parallel)** [#4]
- 2026-05-14 — **master → main rename in workflow + skill-context** [#3]
- 2026-05-13 — **Sister-audit cleanup: action pins + skill-context stub** [#2]
- 2026-05-12 — **9-project rebalance + dropped empty Cloud filter** (initial cleanup)
