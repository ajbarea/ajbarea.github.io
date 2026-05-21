# ajbarea.github.io — Roadmap

Long-horizon plan for the portfolio. Session-by-session execution lives in [IMPL.md](IMPL.md). Most of the surface ships through `app/data/*.ts` content files; engineering work is the smaller share.

When a roadmap item ships, its scope block here is removed and a dated one-liner lands under [Shipped](#shipped). What's _currently active_ lives in IMPL.md.

---

## Polish

- **Dark mode + accessibility audit.** Dark-mode classes are already wired into components (`dark:bg-purple-900/40` etc.); the toggle exposure and WCAG 2.1 AA contrast across components has not been verified end-to-end. Run axe-core against the homepage + projects + resume routes; add a Playwright assertion for color-contrast on the key text-on-background combinations so contrast regressions can't slip through.
- **Light-mode thumbnail variants (pending asset upload).** `ProjectCard` renders a single `thumbnailUrl` for both themes today; existing Cloudinary assets are dark-native and look harsh under the light toggle. Path forward when light assets exist: extend `Project` in `app/types/index.ts` with `thumbnailUrlLight?: string`, consume `useThemeStore().isDark` in ProjectCard's computed thumbnail, fall back to `thumbnailUrl` when no variant is defined. Reverted commit `cc00cb5` carries the exact wiring + tests for reference; the Cloudinary `e_negate` transform was tried as a stopgap and empirically looked bad on screenshot-shaped images, so don't reach for it again. Asset-gated, not code-gated.
- **Blog content (first post).** `app/pages/blog/index.vue` + `app/pages/blog/[slug].vue` are scaffolded; `articles/` is empty. The page surface is wired but no posts have been written. First post is a content task, not engineering — pick a topic when the session has runway.

## Cross-sister polish (2026-05-21)

> Source: 2026-05-21 audit-of-audits review "Insights worth keeping". Mirror items live in the matching ROADMAP for each active sister. The portfolio is the natural home for ecosystem-narrative work since it's the aggregator surface.

- **Ecosystem narrative on the homepage.** Today the projects page lists Kourai Khryseai / Phalanx-FL / VelocityFL / techne as a flat catalog with filter tags. The ecosystem framing (innovation / research / performance / governance / visibility roles, with the FL stack as a coherent research program) is only told _inside_ the LDQIS lab page (dataqualitylabs.com), not on the portfolio itself. Add a brief homepage block — between `HomeExperienceTimeline` and `HomeActivityHighlights` — that names the five active sisters and their roles. Content task, mostly.
- **Reciprocal `## Sister ecosystem` blocks in sister READMEs.** The portfolio is the place where the story is told end-to-end; each sister's README should at minimum name the others with one-line links so a reader landing on any sister can navigate to the rest. Same item appears in each sister's ROADMAP under "Cross-sister polish."

---

## Future / unprioritized backlog

- **Per-project page enrichment.** The 2026-05-21 PR (#10) added clickable cards opening detail modals + filter tags including Hackathon. Per-project pages exist for the FL stack via Zensical docs sites; the portfolio's own per-project detail layer could be richer (papers-tied, screenshots, links to docs sites). Lower priority than the polish items above.
- **Activity feed RSS / Atom.** `app/components/home/ActivityHighlights.vue` reads publications + hackathons + conferences and renders them; an RSS/Atom feed from the same data sources would let readers subscribe without periodically returning. Small generator at build-time.

---

## Cross-cutting invariants

- **README claim assertions stay green.** The 2026-05-12 PR (#7) added a CI check asserting README's project-gallery claims match the data files. Per `feedback_fragile_docs_pattern`, both the registry of fragile claims and the CI assertion are load-bearing — don't let either silently fall out of sync when new data is added.
- **Sister parity on action pins.** Sister-audit cron tracks action SHA pins (e.g., `actions/upload-artifact@v7.0.1`); when a sister bumps, the portfolio bumps in the same wave.

---

## Shipped

One-line per item, newest first. Detail moves to git history when work lands.

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
