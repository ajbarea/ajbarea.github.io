# ajbarea.github.io — Roadmap

Long-horizon plan for the portfolio. Session-by-session execution lives in [IMPL.md](IMPL.md). Most of the surface ships through `app/data/*.ts` content files; engineering work is the smaller share.

When a roadmap item ships, its scope block here is removed and a dated one-liner lands under [Shipped](#shipped). What's _currently active_ lives in IMPL.md.

---

## Polish

- **Light-mode thumbnail treatment — resolved.** Dark-native thumbnails looked harsh on the light theme. The light-mode gallery-frame (hairline inset ring + soft inset shadow, near-invisible in dark) shipped 2026-05-25 as the non-asset fix, and **AJ confirmed it looks great** — so per-theme light image variants are **not planned**. Reference only if ever revisited: extend `Project` in `app/types/index.ts` with `thumbnailUrlLight?: string`, consume `useThemeStore().isDark` in ProjectCard's computed thumbnail, fall back to `thumbnailUrl`; reverted commit `cc00cb5` has the exact wiring + tests.
- **Blog content (first post).** `app/pages/blog/index.vue` + `app/pages/blog/[slug].vue` are scaffolded; `articles/` is empty. Surface is wired, no posts written. Content task, not engineering.

---

## Future / unprioritized backlog

- **Per-project page enrichment.** The 2026-05-21 PR (#10) added clickable cards opening detail modals + filter tags including Hackathon. Per-project pages exist for the FL stack via Zensical docs sites; the portfolio's own per-project detail layer could be richer (papers-tied, screenshots, links to docs sites). Lower priority than the polish items above.

---

## Cross-cutting invariants

- **README claim assertions stay green.** The 2026-05-12 PR (#7) added a CI check asserting README's project-gallery claims match the data files. Per `feedback_fragile_docs_pattern`, both the registry of fragile claims and the CI assertion are load-bearing — don't let either silently fall out of sync when new data is added.
- **Sister parity on action pins.** Dependabot (`github-actions` ecosystem) now proposes action bumps per-repo; `/techne:sisters` verifies the fleet hasn't drifted between merges. Pins like `actions/upload-artifact@v7.0.1` should still converge across sisters even though each repo's bump PR lands on its own schedule.
- **YAGNI-refactored.** The portfolio's framework substrate (Nuxt 4, Vue 3, Tailwind 4, Pinia, Nuxt Content, @nuxtjs/i18n) evolves faster than this site does. Before hand-rolling a feature, check whether the framework already ships the primitive — and conversely, don't avoid shape decisions waiting on capability you can already see arriving (the auto-translate pipeline using local Qwen2.5 over Ollama is the working example). Cross-sister mirror.
- **Stale-assumption audit.** Whenever Nuxt, Vue, Tailwind, or one of the Nitro / Vite plugins ships a major version, audit which workarounds in `app/` exist to compensate for a now-closed gap. The `@nuxtjs/i18n` v10 AST gotcha (`tm()` returning `[object Object]`), the `<NuxtLink>` non-localizing pattern, the `restructureDir` v9-vs-v10 mismatch — all are scaffolding that should unwind when upstream clears the friction. Cross-sister mirror.

- **Sitemap + robots are generated, not static.** `@nuxtjs/sitemap` (i18n-aware — emits `xhtml:link` hreflang alternates across en/es/ja/zh) and `@nuxtjs/robots` own `/sitemap_index.xml` and `/robots.txt`, auto-built from the prerendered routes. The old hand-maintained `public/sitemap.xml` (5 stale routes, `lastmod` frozen 2025-12-15) + `public/robots.txt` were deleted 2026-05-25 (now 44 live URLs). Don't re-add static files under `public/` with those names — they'd shadow the generated output and silently rot. research(2026-05): chose the two discoverability modules over the `@nuxtjs/seo` umbrella (which also bundles og-image/satori, link-checker, schema-org) to keep the build surface focused.

---

## Shipped

Detail lives in git history (`git log`) and the live code. This log is pruned once work is durably shipped.

- 2026-05-26 — **Images migrated Cloudinary → local WebP.** Project, gallery, and profile thumbnails moved from the Cloudinary CDN to `public/images/**`, served static by GitHub Pages (`app/data/*.ts` now reference `/images/…` paths). `@nuxt/image` IPX was tried first but dropped — the runtime image server 404s on static Pages, so images render as static WebP (verify `naturalWidth > 0` after any image change). One-time URL rewrite via `scripts/migrate-from-cloudinary.mjs`. research(2026-05): static-Pages deploys can't run IPX; pre-generated/static WebP is the working path.
- 2026-05-25 — **Light-mode gallery-frame on ProjectCard.** Dark-native thumbnails now carry a hairline inset ring + soft inset shadow in light mode (near-invisible in dark), so they read as deliberate framed screens instead of heavy blocks on the light card. A `pointer-events-none`/`aria-hidden` overlay — no layout shift, doesn't touch the hover-scale or the card click overlay. The asset-based escalation (true light variants) stays in Polish above. research(2026-05): 2026 light/dark card practice frames images as gallery pieces + a 1px inset border to delineate.
- 2026-05-25 — **GitHub Actions SHA-pinned (supply-chain hardening).** All `uses:` refs in `ci.yml` + `deploy.yml` pinned to full commit SHAs (`# vX.Y.Z` comment kept); Dependabot `github-actions` gains a 7-day cooldown, freshness via the existing version updates. Mutable tags enabled the tj-actions/changed-files attack (2025-03); SHA-pinning runs exactly the reviewed code. Fleet convention + rationale in techne `docs/conventions.md`. research(2026-05): GitHub "Secure use reference"; CNCF GH-Actions CI-deps recipe.
- 2026-05-25 — **RSS + Atom activity feed.** The discoverability sibling to the sitemap, for humans: prerendered `/rss.xml` (RSS 2.0) + `/atom.xml` aggregate publications + hackathons + conferences via the `feed` package. Titles/descriptions resolve from `en.json` inside the Nitro route (no `useI18n()` server-side) through a pure, unit-tested builder (`app/utils/activity-feed.ts`, 8 Vitest cases); feed-autodiscovery `<link rel="alternate">` tags sit in the head; e2e guard in `e2e/feed.spec.ts`. research(2026-05): server route + `feed` pkg is the idiomatic Nuxt approach; emit RSS 2.0 (broadest reader support) + Atom (the "support both" recommendation).
- 2026-05-25 — **Generated sitemap + robots (i18n-aware).** Replaced the stale static `public/sitemap.xml` (5 routes) with `@nuxtjs/sitemap@8` + `@nuxtjs/robots@6`. `/sitemap_index.xml` now covers all 44 prerendered en/es/ja/zh routes with hreflang alternates; `robots.txt` is generated with the `Sitemap:` directive. e2e guard in `e2e/sitemap.spec.ts`.
