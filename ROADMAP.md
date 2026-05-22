# ajbarea.github.io — Roadmap

Long-horizon plan for the portfolio. Session-by-session execution lives in [IMPL.md](IMPL.md). Most of the surface ships through `app/data/*.ts` content files; engineering work is the smaller share.

When a roadmap item ships, its scope block here is removed and a dated one-liner lands under [Shipped](#shipped). What's _currently active_ lives in IMPL.md.

---

## Polish

- ✅ **Dark mode + accessibility audit.** Shipped 2026-05-21. New `e2e/a11y.spec.ts` runs `@axe-core/playwright` against every main route (`/`, `/projects`, `/resume`, `/blog`, `/gallery`) in **both** light and dark mode by priming `localStorage.theme` via `addInitScript()` before navigation — so `dark:`-variant classes get scanned independently from light mode. New `e2e/theme-toggle.spec.ts` guards the store-DOM-localStorage contract on navigation and reload. Fixed 3 real WCAG AA violations surfaced by the scan: `TimelineEntry.vue` had `dark:text-gray-500` (3.03:1) bumped to `dark:text-gray-400`; `ProjectFilter.vue` active-state pill `bg-sky-600 text-white` (4.02:1) bumped to `bg-sky-700` (≥4.5:1); `blog/index.vue` article-meta row same `dark:text-gray-500` fix. 10 a11y tests + 2 theme-toggle tests now gate every PR.
- **Light-mode thumbnail variants (pending asset upload).** `ProjectCard` renders a single `thumbnailUrl` for both themes today; existing Cloudinary assets are dark-native and look harsh under the light toggle. Path forward when light assets exist: extend `Project` in `app/types/index.ts` with `thumbnailUrlLight?: string`, consume `useThemeStore().isDark` in ProjectCard's computed thumbnail, fall back to `thumbnailUrl` when no variant is defined. Reverted commit `cc00cb5` carries the exact wiring + tests for reference; the Cloudinary `e_negate` transform was tried as a stopgap and empirically looked bad on screenshot-shaped images, so don't reach for it again. Asset-gated, not code-gated.
- **Blog content (first post).** `app/pages/blog/index.vue` + `app/pages/blog/[slug].vue` are scaffolded; `articles/` is empty. The page surface is wired but no posts have been written. First post is a content task, not engineering — pick a topic when the session has runway.

## Cross-sister polish (2026-05-21)

> Source: 2026-05-21 audit-of-audits review "Insights worth keeping". Mirror items live in the matching ROADMAP for each active sister. The portfolio is the natural home for ecosystem-narrative work since it's the aggregator surface. Both items shipped 2026-05-21; tracked here so the cross-sister mirror is legible.

- ✅ **Ecosystem narrative on the homepage.** `HomeSisterEcosystem` lives between `HomeExperienceTimeline` and `HomeActivityHighlights`, names five active sisters with their ecosystem role (innovation / research / performance / governance / lab identity), and renders in all four locales (en / es / ja / zh). Data in `app/data/sisters.ts`; i18n keys under `sisters.*` + `sections.sisters`; 7 component tests. Shipped 2026-05-21.
- ✅ **Reciprocal `## Sister ecosystem` blocks in sister READMEs.** Landed across all six sister READMEs as separate commits: kourai-khryseai 4b0a36c, phalanx-fl b1c325b44, vFL 697dca6, ldqis bcb1fb8, techne 5834431, ajbarea.github.io 6897117 (this repo). Each lists the other five with their role and one-line description.

---

## Future / unprioritized backlog

- **Per-project page enrichment.** The 2026-05-21 PR (#10) added clickable cards opening detail modals + filter tags including Hackathon. Per-project pages exist for the FL stack via Zensical docs sites; the portfolio's own per-project detail layer could be richer (papers-tied, screenshots, links to docs sites). Lower priority than the polish items above.
- **Activity feed RSS / Atom.** `app/components/home/ActivityHighlights.vue` reads publications + hackathons + conferences and renders them; an RSS/Atom feed from the same data sources would let readers subscribe without periodically returning. Small generator at build-time.

---

## Cross-cutting invariants

- **README claim assertions stay green.** The 2026-05-12 PR (#7) added a CI check asserting README's project-gallery claims match the data files. Per `feedback_fragile_docs_pattern`, both the registry of fragile claims and the CI assertion are load-bearing — don't let either silently fall out of sync when new data is added.
- **Sister parity on action pins.** Sister-audit cron tracks action SHA pins (e.g., `actions/upload-artifact@v7.0.1`); when a sister bumps, the portfolio bumps in the same wave.
- **YAGNI-refactored.** The portfolio's framework substrate (Nuxt 4, Vue 3, Tailwind 4, Pinia, Nuxt Content, @nuxtjs/i18n) evolves faster than this site does. Before hand-rolling a feature, check whether the framework already ships the primitive — and conversely, don't avoid shape decisions waiting on capability you can already see arriving (the auto-translate pipeline using local Qwen2.5 over Ollama is the working example). Cross-sister mirror.
- **Stale-assumption audit.** Whenever Nuxt, Vue, Tailwind, or one of the Nitro / Vite plugins ships a major version, audit which workarounds in `app/` exist to compensate for a now-closed gap. The `@nuxtjs/i18n` v10 AST gotcha (`tm()` returning `[object Object]`), the `<NuxtLink>` non-localizing pattern, the `restructureDir` v9-vs-v10 mismatch — all are scaffolding that should unwind when upstream clears the friction. Cross-sister mirror.

---

## Shipped

One-line per item, newest first. Detail moves to git history when work lands.

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
