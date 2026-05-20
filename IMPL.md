# Language Selector — Implementation Spec

Cross-property feature: visible language selector on the portfolio and on every Zensical docs site, letting visitors view content in their preferred language.

**Hard constraint: free-tier only.** No DeepL paid plans, no Google Translate API, no Weglot, no Localize, no Crowdin paid. The spec below lives entirely within the free stack.

---

## Goals

1. Visible **language selector dropdown** in the top-right nav on every property.
2. Selection **persists across pages** within a property (localStorage / cookie).
3. **Same UI pattern** on the Nuxt portfolio and the Zensical sites so the feature reads as one ecosystem.
4. **Zero ongoing translation cost** — translations either ship in the repo as static files, or are generated at build time using offline / open-source tools.

## Non-goals

- Real-time per-request translation (would need a paid API or a server).
- 100% accurate human-grade translations from day one.
- Translating dynamic / user-generated content (we don't have any).

---

## Architecture (free-tier only)

Two halves of the system. They share a selector UI, differ on how translations are produced.

### Translation source — pick by tier

| Tier                     | Tool                                                                 | License    | Cost           | Notes                                                                                                                                                            |
| ------------------------ | -------------------------------------------------------------------- | ---------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **v1 (manual)**          | hand-authored locale files                                           | n/a        | $0             | High quality, scales poorly past ~3 languages.                                                                                                                   |
| **v2 (LLM offline)**     | [Qwen2.5-7B-Instruct via Ollama](https://ollama.com/library/qwen2.5) | Apache 2.0 | $0             | Local LLM, runs offline, ~5GB one-time pull. Strongest 2026 quality for JA/ZH per Lokalise + Hakuna Matata MT-LLM benchmarks.                                    |
| **v3 (fallback NMT)**    | [Argos Translate](https://github.com/argosopentech/argos-translate)  | MIT        | $0             | OpenNMT-based, smaller/faster than v2, broader language coverage. Quality below v2 on JA/ZH. Fallback if Qwen pull fails or for languages Qwen doesn't excel at. |
| **v4 (self-hosted API)** | [LibreTranslate](https://github.com/LibreTranslate/LibreTranslate)   | AGPL       | $0 self-hosted | HTTP API wrapper around Argos. Only relevant for an in-page translate-on-the-fly button.                                                                         |
| **fallback link**        | open-in-Google-Translate URL                                         | n/a        | $0             | Escape hatch: `https://translate.google.com/translate?sl=auto&tl=<lang>&u=<page-url>`. Quality varies, doesn't keep visitors on the site.                        |

**Committed path (research 2026-05): v1 manual ES + v2 Qwen JA/ZH.** AJ hand-authors Spanish; Qwen2.5-7B-Instruct via Ollama generates Japanese + Chinese drafts; AJ QA-passes before publish. Argos retained as v3 fallback for additional languages or Ollama-unavailable environments.

### Property-specific implementation

#### Nuxt portfolio (`ajbarea.github.io`)

- Use [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) (free, MIT).
- Locale files live at `i18n/locales/<lang>.json`.
- Selector component in `app/components/layout/LanguageSelector.vue`, mounted in `TheNavigation.vue`.
- Use `switchLocalePath()` per Nuxt i18n docs — don't set locale directly, navigate to the locale-prefixed route.
- Route shape: `/`, `/es/`, `/fr/`, `/ja/`, etc.
- Prerender every locale via `nuxt.config.ts` `nitro.prerender.routes`.

#### Zensical docs (techne, kourai, vFL, phalanx-fl)

- Use [`mkdocs-static-i18n`](https://github.com/ultrabug/mkdocs-static-i18n) plugin (free, MIT).
- Co-locate translations: `index.en.md`, `index.es.md`, `index.fr.md`.
- Material's native `theme.alternate` config drives the dropdown — no custom component needed.
- One caveat: `navigation.instant` is incompatible with the language switcher per Material docs. Drop that feature from `zensical.toml` on sites we localize.

---

## Translation surface (Nuxt portfolio)

Inventory of strings to translate, by file:

| File                                                                          | Strings                                                                    | Estimated count |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------- | --------------- |
| `app/data/profile.ts`                                                         | `title`, `summary`, `roles[]`, `credibilityChips[]`, `researchInterests[]` | ~20             |
| `app/data/timeline.ts`                                                        | `title`, `subtitle`, `description`, `skills[]` per entry                   | ~80             |
| `app/data/projects.ts`                                                        | `title`, `description`, `longDescription` per entry                        | ~60             |
| `app/data/skills.ts`                                                          | `label`, `name` per category                                               | ~30             |
| `app/data/conferences.ts`, `workshops.ts`, `hackathons.ts`, `publications.ts` | titles, descriptions, abstracts                                            | ~50             |
| `app/components/**/*.vue`                                                     | static UI labels (nav, CTAs, section headings, footer)                     | ~40             |

**Total: ~280 strings.** Tractable for v1 manual translation.

Extracted into a typed schema so locale files don't have to map a thousand keys by hand. Pattern:

```ts
// i18n/locales/en.json
{
  "hero": {
    "cta_primary": "View Projects",
    "cta_secondary": "Latest paper"
  },
  "sections": {
    "experience": "Experience & Education",
    "highlights": "Selected Activity 2026",
    "expertise": "Technical Expertise",
    "contact": "Get In Touch"
  },
  "profile": {
    "summary": "I build federated learning frameworks and multi-agent development systems...",
    "chips": ["RIT GRA · Reznik Group", "4 IEEE 2026 Papers", "MS SWE · 4.0 GPA"]
  }
  // ...etc
}
```

Dynamic data (`timeline.ts`, `projects.ts`, etc.) gets a parallel structure keyed by entry `id`:

```ts
// i18n/locales/es.json
{
  "timeline": {
    "ncsu-scads-2026": {
      "title": "Becario de Investigación de Verano",
      "subtitle": "SCADS · Conferencia de Verano sobre Ciencia de Datos Aplicada",
      "description": "Seleccionado como SCADS Summer Research Scholar..."
    }
  }
}
```

Components consume via `$t('timeline.ncsu-scads-2026.title')`.

---

## Language scope (v1)

Pick 4 languages that cover the most visitor diversity for AJ's audience:

| Language             | Why                                                   |
| -------------------- | ----------------------------------------------------- |
| **English**          | canonical                                             |
| **Spanish**          | AJ's heritage + large global research community       |
| **Japanese**         | otaku readership + strong AI/ML community             |
| **Mandarin Chinese** | largest FL/distributed-ML research community globally |

**Stretch**: French, German, Portuguese, Korean. Each adds ~280 strings × ~20 minutes of QA per language.

---

## Phased rollout

### Phase 1 — Selector UI + EN-only

- Add `@nuxtjs/i18n` to Nuxt portfolio.
- Build `LanguageSelector.vue` (dropdown component).
- Extract all hardcoded strings to `i18n/locales/en.json` via the schema above.
- Verify nothing breaks; site still ships English only.
- Selector dropdown shows English as the only option.

### Phase 2 — Spanish manual

- Hand-author `i18n/locales/es.json`.
- Verify `/es/` route prerenders.
- Selector shows EN + ES.

### Phase 3 — Auto-generate JA + ZH drafts

- Install [Ollama](https://ollama.com); pull `qwen2.5:7b-instruct` (~5GB one-time).
- Script: `scripts/auto-translate.mjs` reads `i18n/locales/en.json`, calls Ollama's local HTTP API per string, writes `i18n/locales/ja.json` and `i18n/locales/zh.json`.
- AJ QA-passes the drafts for embarrassing mistranslations; ships when satisfied.
- Fallback: if Ollama unavailable, the script's backend can swap to Argos Translate (`pip install argostranslate`).

### Phase 4 — Zensical sites

- Add `mkdocs-static-i18n` to each docs repo.
- Configure `theme.alternate` in `zensical.toml`.
- Drop `navigation.instant` feature where incompatible.
- For each site: hand-author EN (default), generate JA + ZH drafts via the same script (or extend `techne:docs-site` skill to handle i18n).

### Phase 5 — Extend `techne:docs-site`

- Add an i18n sub-mode to the existing `techne:docs-site` skill: detects missing `.<lang>.md` files, runs Qwen via Ollama to generate drafts (Argos fallback), queues them for review.
- Single command across all sister Zensical sites.

---

## Open questions

1. **Selector position** — top-right nav vs footer? Top-right is conventional (FastAPI does this); footer is less prominent but less crowded. Recommend top-right.
2. **Icon** — `🌐` emoji vs SVG globe icon vs ISO code text (e.g., `EN ▼`)? Emoji is universally recognized but inconsistent rendering across OS; ISO code is precise but less inviting. Recommend SVG globe icon.
3. **Auto-detect from `Accept-Language`?** — Could redirect first-time visitors based on browser locale, with a "stay on English" override. Slight UX win but risks surprising users. Recommend opt-in selector only for v1.
4. **Show language names in their own script** (e.g., `日本語`, `中文`) or in English (`Japanese`, `Chinese`)? Native script is the accessibility-friendly pattern. Recommend native.
5. **Hreflang tags** — `@nuxtjs/i18n` generates these automatically; for Zensical sites, Material's alternate config does too. Just confirm both are emitted at build time.

---

## Out of scope (for now)

- Right-to-left languages (Arabic, Hebrew). Adds a layout dimension; defer.
- Locale-aware date/number formatting beyond what `@nuxtjs/i18n` does by default.
- Translating commit messages, repo READMEs, or technical content in `/docs/skills/`. Only user-facing prose.
- Anything that requires server-side rendering at request time (we're statically prerendered).

---

## Decision checkpoint

Confirmed 2026-05-18 (AJ delegated; web-research-grounded):

- [x] Selector position: **top-right nav** (USWDS / Smashing convention; globe icon, no flags)
- [x] Initial languages: **EN, ES, JA, ZH**
- [x] Auto-detect from `Accept-Language`: **opt-in selector only** (no hard redirect; Google cautions against; soft notification banner deferred to Phase 6)
- [x] Translation source: **manual ES + Qwen2.5-7B-Instruct via Ollama for JA/ZH** (walk-back from Argos; Qwen dominates JA/ZH in 2026 MT-LLM benchmarks; Argos retained as fallback)
- [x] Native-script language names: **日本語, 中文, Español**

### Status (2026-05-20)

- **Phase 1a — done.** `@nuxtjs/i18n` v10.3.0 installed; `i18n/locales/en.json` at project root (NOT `app/locales/` — Nuxt 4 + v10 module resolves langDir from rootDir, so files live at `<root>/i18n/locales/`); `LanguageSelector.vue` mounted in `TheNavigation.vue` (desktop + mobile); `<html lang="en">` set automatically; opt-in only, no auto-detect.
- **Phase 1b Stage 1 — done.** Home page UI chrome + profile bio extracted (~30 keys: nav, lang, meta, profile, hero, sections, activity, skills.categories). Files: `AuthorCard.vue`, `ContactSection.vue`, `ExpertiseGrid.vue`, `ExperienceTimeline.vue`, `ActivityHighlights.vue`, `index.vue`, `SkillsGrid.vue`.
- **Phase 1b Stage 2 — done.** Timeline narratives + resume page extracted (~60 keys under `timeline.{id}.*` per entry, `timeline.labels`, `resume.sections`, `resume.viewMode`, `resume.education`, `resume.downloadPdf*`, `meta.resume*`). Files: `TimelineEntry.vue`, `ExperienceList.vue`, `EducationCard.vue`, `ResumeViewToggle.vue`, `resume.vue`. profile.ts duplication cleaned up: `roles`, `summary`, `credibilityChips`, `researchInterests` removed from data file and `Profile` interface (i18n is now the single source).
- **Phase 1b Stage 3 — done.** Project descriptions + projects page chrome extracted (~50 keys: `projects.{id}.title/description` per entry, `projects.page.*` for page chrome + button labels + aria, `projects.types.*` for filter/badge labels, `meta.projects*` for head tags). Files: `projects.vue`, `ProjectCard.vue`, `ProjectFilter.vue`. projects.ts cleaned up: `description` and `longDescription` removed from data file and `Project` interface; `longDescription` was unused before and is now dropped entirely (15 projects × ~150 words of dead prose removed).
- **Phase 1b Stage 4 — done.** Publication / conference / hackathon prose + ContactForm + ToastContainer + clipboard composable extracted (~50 keys: `publications.{id}.title/abstract`, `publications.statuses.*`, `publications.list.*`, `conferences.{id}.title/description`, `conferences.formats.*`, `hackathons.{id}.description/result`, `hackathons.types.*`, `highlights.overrides.*` for ActivityHighlights short-form overrides, `contactForm.*`, `toast.*`, `clipboard.*`). Files: `PublicationList.vue`, `ContactForm.vue`, `ToastContainer.vue`, `useClipboard.ts`, `ActivityHighlights.vue` (rewritten to resolve refs via i18n internally; no longer takes a prop), `highlights.ts` (now just exports `activityHighlightRefs`), `index.vue` (drops the highlights prop). Data files cleaned up: `title`/`description` removed from `conferences.ts`, `description`/`result`/`metrics` from `hackathons.ts`, `title`/`abstract` from `publications.ts`; matching fields dropped from interfaces.

**Phase 1b is complete.** All ~280 user-visible strings extracted, all data-file/i18n drift resolved.

- **Phase 2 — done.** Hand-authored `i18n/locales/es.json` covering the full key set (Latin-American neutral Spanish, masculine, informal `tú`). Registered the `es` locale in `nuxt.config.ts`; the existing `LanguageSelector.vue` picked it up automatically (dynamic locale list). `/es/`, `/es/projects/`, `/es/resume/` etc. prerender from the same templates. Multilingual SEO wired up alongside (research 2026-05): added `baseUrl: 'https://ajbarea.github.io'` and switched the three page-level `useHead` calls to merge `useLocaleHead({ seo: true })`, so the build now emits per-page `hreflang` (`en`, `es`, `x-default`), `og:locale` + `og:locale:alternate`, and self-referential `<link rel="canonical">` on both EN and ES variants.

- **Phase 3 — done (with caveat on JA quality).** `scripts/auto-translate.mjs` walks `en.json` recursively, calls `qwen2.5:7b-instruct` via Ollama's local HTTP API (`http://localhost:11434/api/generate`) for each leaf string, validates placeholders survived the round-trip, retries up to 3× on failure, and writes `i18n/locales/{target}.draft.json` (gitignored). Usage: `node scripts/auto-translate.mjs --target {es|ja|zh} [--fresh]`. The `--fresh` flag ignores any existing draft and retranslates from scratch — used to QA-check the hand-authored `es.json` against Qwen's output via `diff i18n/locales/es.json i18n/locales/es.draft.json`. Research basis (2026-05): strict system prompt + per-string placeholder validation is the documented mitigation for LLM placeholder mangling; Qwen2.5 is unusually compliant with JSON-preserving instructions. Per-language runtime: ~2-3 min on the 3060 Ti once the model is warm.

  **Caveat on Qwen2.5-7B-Instruct quality observations (2026-05-20):**
  - **ES** — the hand-authored `es.json` stayed canonical; Qwen's draft surfaced no improvements worth cherry-picking. The `--fresh` review pass is useful as a sanity check, not a replacement source.
  - **ZH** — Qwen's Mandarin output was decent enough that ~15 surgical fixes on top of the draft produced a shippable `zh.json` (proper-noun preservation for Techne / VelocityFL / Phalanx-FL, fixing word order in `失败发送→发送失败`, restoring placeholders the validator caught).
  - **JA** — Qwen's Japanese output was **not shippable as-is**. The model mixed CJK scripts (Japanese receiving Chinese characters like `每日→毎日`), leaked Vietnamese vocabulary tokens (`với`, `hướng`, `sớm`), echoed the system prompt back into outputs (`desu-masu形式`), and produced broken transliterations (`リsumei`, `ギブハブ`, `キャストピーン`). Took the draft as scaffolding and rewrote roughly half the strings by hand to land at a shippable `ja.json`. For Phase 4 (Zensical sites at higher volume) JA will need either a Japanese-finetuned model like Qwen3 Swallow 8B (not in Ollama's default library; needs GGUF conversion), DeepL one-time, or a native-speaker review pass.

- **Phase 2-extended — done.** All four locales (en, es, ja, zh) registered in `nuxt.config.ts`; LanguageSelector picks up `日本語` and `中文` automatically from the dynamic locale list. 64 routes prerender (was 38 with 2 locales). hreflang block now lists `en | es | ja | zh | zh-CN | x-default` on every page. Multilingual canonical and og:locale tags emit correctly for each variant.

### Gotchas (footguns hit during Phase 1a/1b)

- **vue-i18n v10 compiles messages to AST.** `tm('foo.array')` returns AST nodes, not strings — `String(item)` yields `[object Object]`. Use `rt(item)` to resolve each entry. See `AuthorCard.vue` for the `resolveMessageArray` helper.
- **`restructureDir: false` in @nuxtjs/i18n v10 doesn't behave as the v9 docs suggest.** Path resolution breaks; just use defaults (`restructureDir: 'i18n'`, `langDir: 'locales'`) and put files at `<root>/i18n/locales/`.
- **`useHead` with `t()` must use function form** (`useHead(() => ({ ... }))`) for reactivity, not object form.
- **`<NuxtLink to="/projects">` does NOT auto-localize in v10.** Plain `<NuxtLink>` keeps the unprefixed path even on `/es/`, breaking in-session locale continuity. Fix: import `useLocalePath()` in `<script setup>` and wrap every internal `to`: `:to="localePath('/projects')"`. Applied across `TheNavigation.vue`, `AuthorCard.vue`, `blog/index.vue`, `blog/[slug].vue`, `[...404].vue`.
- **`<NuxtLinkLocale>` looks like the cleaner alternative but isn't auto-imported reliably** in our v10 setup; the rendered HTML showed it falling back to plain `<NuxtLink>` (paths uncorrected). `useLocalePath()` is the bulletproof pattern.
- **`detectBrowserLanguage` with `redirectOn: 'no_prefix'` breaks the static prerender.** The locale context gets lost during SSG and every `/{lang}/*.html` renders as English. `redirectOn: 'root'` (the conservative option that only triggers detection on the literal `/`) doesn't have this problem and preserves prerender locale context.

### Cross-session persistence (revised 2026-05-20)

Original spec said "opt-in selector only, no auto-detect." In practice that meant the user's manual locale choice was lost the moment they closed the tab — annoying enough that AJ wanted the dark-mode-style persistence ("remember until changed").

Current config: `detectBrowserLanguage: { useCookie: true, cookieKey: 'i18n_redirected', redirectOn: 'root', alwaysRedirect: false }`.

Behavior:
- Visit `/` for the first time → renders English (no cookie yet). Note: with `useCookie: true`, the module ALSO checks `Accept-Language` on first root visit, so Spanish-locale browsers WILL get redirected to `/es/` once. Mild departure from original spec but matches the "preferred language stays" UX AJ wanted.
- Click "Español" in the selector → URL becomes `/es/...`, cookie written.
- Navigate within `/es/` → all internal links use `localePath()` so they stay prefixed.
- Close tab, reopen `/` → cookie says ES → redirected to `/es/`.
- Open `/projects` directly → renders English regardless of cookie (URL wins; `redirectOn: 'root'` only applies to the literal root).

### Research basis (2026-05)

- Placement: [Smashing Magazine](https://www.smashingmagazine.com/2022/05/designing-better-language-selector/), [USWDS](https://designsystem.digital.gov/components/language-selector/), [SimpleLocalize](https://simplelocalize.io/blog/posts/language-selector-best-practices/)
- Auto-detect: [Linguise](https://www.linguise.com/blog/guide/automatically-redirecting-users-to-their-browser-language-is-it-a-good-call/), Google multilingual best practice
- LLM-MT: [Lokalise eval](https://lokalise.com/blog/what-is-the-best-llm-for-translation/), [Hakuna Matata 2026 benchmark](https://www.hakunamatatatech.com/our-resources/blog/best-llm-for-translation)
- Module choice: `@nuxtjs/i18n` v10.2.4 retained; `nuxt-i18n-micro` v3.18.0 evaluated but static-prerender + `switchLocalePath` feature parity insufficient as of 2026-05-18
