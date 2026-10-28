# IMPL

## Now (2026-10-28)

Portfolio review against CV #14, done: site copy matches the CV in en/es/ja/zh (#125), gallery photos no longer go blank after a long scroll (#126). Cards show the illustrated covers (`public/images/projects/*.webp`); the real captures from #127 (1600x900) live in `public/images/projects/screenshots/` and show in each project's modal under "See it running" (#134).

Open questions for AJ: whether the robot-navigation DQN/PyTorch claim (CV, resume page) belongs to goal-seeker-ai, which is tabular Q-learning; whether the Phalanx-FL card keeps its video of the old framework UI.

Next, when there is a reason: swap any README/docs thumbnail for a live-app capture while that project is running anyway.

---

## Language Selector — Implementation Spec

Cross-property feature: visible language selector on the portfolio and every Zensical docs site. Free-tier only (hand-authored locale files + Qwen via Ollama for drafts; no paid translation APIs).

## Status

- **Portfolio (Nuxt)** — Phase 1-3 shipped. EN canonical, ES hand-authored, JA/ZH drafted via Qwen2.5-7B-Instruct then QA-passed. 64 routes prerender; hreflang + og:locale + canonical emit correctly for each variant.
- **Zensical sites (techne / kourai / vFL / phalanx-fl)** — Phase 4 **declined 2026-05-27 (AJ)**: dev-tool docs have no non-English audience and no way to verify translation accuracy. Revisit only on an audience signal (non-English analytics traffic).
- **`techne:docs-site` i18n sub-mode** — Phase 5 **declined** (it only existed to serve Phase 4).

## Phase 4 — Zensical sites

> **Declined 2026-05-27** (see Status above). Kept as reference only, if a non-English
> audience ever materializes.

- Use `mkdocs-static-i18n` (free, MIT). Co-locate translations: `index.en.md`, `index.es.md`, `index.ja.md`, `index.zh.md`.
- Material's native `theme.alternate` config drives the dropdown — no custom component needed.
- Caveat: `navigation.instant` is incompatible with the language switcher per Material docs. Drop that feature from `zensical.toml` on sites we localize.
- Translation source: hand-author EN (default), generate JA + ZH drafts via the same `scripts/auto-translate.mjs` (or extend `techne:docs-site` skill — see Phase 5).
- JA quality is the known weak spot (see Caveats below); plan for native-speaker review or DeepL one-time for the docs volume.

## Phase 5 — Extend `techne:docs-site`

> **Declined 2026-05-27** (it only existed to serve Phase 4).

Add an i18n sub-mode to the existing `techne:docs-site` skill: detect missing `.<lang>.md` files, run Qwen via Ollama to generate drafts (Argos fallback), queue them for review. Single command across all sister Zensical sites.

## Caveats — Qwen2.5-7B-Instruct quality

Observed during portfolio Phase 3 (2026-05-20):

- **ES** — `--fresh` draft surfaced no improvements worth cherry-picking; hand-authored ES stays canonical.
- **ZH** — ~15 surgical fixes on top of the draft produced shippable `zh.json` (proper-noun preservation for Techne / Velocity-FL / Phalanx-FL, word-order fixes like `失败发送→发送失败`).
- **JA — not shippable as-is.** Qwen mixed CJK scripts (e.g. `每日→毎日`), leaked Vietnamese vocab tokens (`với`, `hướng`, `sớm`), echoed the system prompt back (`desu-masu形式`), and produced broken transliterations (`リsumei`, `ギブハブ`, `キャストピーン`). Roughly half the strings rewritten by hand. For Phase 4 (higher volume), JA needs either Qwen3 Swallow 8B (GGUF conversion required, not in Ollama default library), DeepL one-time, or a native-speaker review pass.

## Cross-session persistence (current portfolio config)

`detectBrowserLanguage: { useCookie: true, cookieKey: 'i18n_redirected', redirectOn: 'root', alwaysRedirect: false }`.

Behavior:

- First visit to `/` → renders EN. With `useCookie: true`, the module also checks `Accept-Language` on first root visit, so Spanish-locale browsers will be redirected to `/es/` once. Mild departure from the original "no auto-detect" spec but matches the "preferred language stays" UX.
- Click "Español" → `/es/...` URL + cookie written.
- Internal `<NuxtLink>` uses `localePath()` so navigation stays prefixed.
- Direct `/projects` always renders EN (URL wins; `redirectOn: 'root'` only applies to literal `/`).

## Gotchas (Nuxt + @nuxtjs/i18n v10)

- **vue-i18n v10 compiles messages to AST.** `tm('foo.array')` returns AST nodes, not strings. Use `rt(item)` to resolve each entry. See `AuthorCard.vue::resolveMessageArray`.
- **`restructureDir: false` in v10 doesn't behave like v9 docs suggest.** Path resolution breaks; use defaults (`restructureDir: 'i18n'`, `langDir: 'locales'`) and put files at `<root>/i18n/locales/`.
- **`useHead` with `t()` must use function form** (`useHead(() => ({ ... }))`) for reactivity, not object form.
- **`<NuxtLink to="/projects">` does NOT auto-localize in v10.** Plain `<NuxtLink>` keeps the unprefixed path even on `/es/`. Fix: `useLocalePath()` + `:to="localePath('/projects')"`. Applied across `TheNavigation.vue`, `AuthorCard.vue`, `blog/index.vue`, `blog/[slug].vue`, `[...404].vue`.
- **`<NuxtLinkLocale>` isn't auto-imported reliably** in v10 — rendered HTML falls back to plain `<NuxtLink>`. Use `useLocalePath()` as the bulletproof pattern.
- **`detectBrowserLanguage` with `redirectOn: 'no_prefix'` breaks static prerender** — locale context gets lost during SSG, every `/{lang}/*.html` renders EN. `redirectOn: 'root'` preserves prerender context.

## Translation pipeline

`scripts/auto-translate.mjs` walks `en.json` recursively, calls `qwen2.5:7b-instruct` via Ollama's local HTTP API (`http://localhost:11434/api/generate`) per leaf string, validates placeholders survived the round-trip, retries up to 3× on failure, and writes `i18n/locales/{target}.draft.json` (gitignored). Usage: `node scripts/auto-translate.mjs --target {es|ja|zh} [--fresh]`. Argos Translate (`pip install argostranslate`) is the documented fallback if Ollama is unavailable.

## Research basis (2026-05)

- Placement: [Smashing Magazine](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/), [USWDS](https://designsystem.digital.gov/components/language-selector/), [SimpleLocalize](https://simplelocalize.io/blog/posts/language-selector-best-practices/)
- Auto-detect: [Linguise](https://www.linguise.com/blog/guide/automatically-redirecting-users-to-their-browser-language-is-it-a-good-call/), Google multilingual best practice
- LLM-MT: [Lokalise eval](https://lokalise.com/blog/what-is-the-best-llm-for-translation/), [Hakuna Matata 2026 benchmark](https://www.hakunamatatatech.com/our-resources/blog/best-llm-for-translation)
- Module choice: `@nuxtjs/i18n` v10.2.4 retained; `nuxt-i18n-micro` v3.18.0 evaluated but static-prerender + `switchLocalePath` feature parity insufficient as of 2026-05-18.

## Resume (2026-10-28 15:00, Review #2 brief, fleet-briefing issue #2)

Brief: ~/.local/state/fleet-orchestrator/task-review2.src (items 1-7). Shots for AJ:
fleet-briefing shots/2026-10-28/ (files saved; shots/README.md lines NOT yet added).

Done (merged): 1 Reznik PhD-advisor-only #129. 3 goal-seeker-ai#3 (both branches merged with
history, Ivan's authorship kept, 28 tests, uv; branches deleted, repo re-archived) + card #131.
6 SES copy and BS May 2019 #133; resume PDFs #130. 7 RocISSA order cv#17 + #130.

Open PRs, all reviewed by independent reviewers; what each still needs:

- #134 covers on cards + real captures in modals: review fixes pushed (path test, halved covers,
  IMPL). Needs CI green, then merge. Retarget #135 to main BEFORE merging #134.
- #135 Pharos card (stacked on #134): review fixes pushed (zh 联邦, script rejects unknown
  names). After #134: retarget to main, CI, merge.
- #132 footer GitHub icon to this repo: reviewed clean, CI green, shots filed. Merge.
- ajbarea/techne#224 shared footer brand mark: review fix pushed (test now fails with the mask
  removed: mutation run confirmed). Needs CI green, merge FIRST, then the syncs:
  ariadne#75, keryx#63, pharos#100, periplus#61, phalanx-fl#137, sphragis#222,
  ajbarea/Hackathon#13 (fork: always `gh ... -R ajbarea/Hackathon`; an earlier slip opened
  AHRTLab/Hackathon#3, closed with a one-line note).
- ajbarea/Hackathon#14 Myo photo (CC BY, full credit) + 5 pose panels: review fixes pushed
  (title + Flickr link, 45° tip-down, grid 5 across / 2 on phone); shots filed. Merge after CI.
- ajbarea/cv#18 IMPL update: trivial, merge after GitGuardian.

After merging and deploy: re-check all ten live Zensical sites (landing + one inner page,
light/dark; script pattern: scratchpad footshot.mjs, .md-footer-meta) and kourai-khryseai and
velocity-fl unchanged; post the before/after table on fleet-briefing #2; tick its boxes with a
one-line comment each (§2 PhD copy, §5 robot-nav question, §6 thumbnails; Hackathon footer/
Myo under §1 routing). Add shots/README.md lines for 129,132,134,135, Hackathon-14, the
_-footer-_ set. Then update the queue line (pane %9) and give AJ the short report.
Lock note: other agents hold /tmp/fleet-heavy.lock for long runs; queue browser/build jobs in
the background with `flock -w 9000`.
