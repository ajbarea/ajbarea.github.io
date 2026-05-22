# Language Selector — Implementation Spec

Cross-property feature: visible language selector on the portfolio and every Zensical docs site. Free-tier only (hand-authored locale files + Qwen via Ollama for drafts; no paid translation APIs).

## Status

- **Portfolio (Nuxt)** — Phase 1-3 shipped. EN canonical, ES hand-authored, JA/ZH drafted via Qwen2.5-7B-Instruct then QA-passed. 64 routes prerender; hreflang + og:locale + canonical emit correctly for each variant.
- **Zensical sites (techne / kourai / vFL / phalanx-fl)** — Phase 4 not yet started.
- **`techne:docs-site` i18n sub-mode** — Phase 5 not yet started.

## Phase 4 — Zensical sites

- Use `mkdocs-static-i18n` (free, MIT). Co-locate translations: `index.en.md`, `index.es.md`, `index.ja.md`, `index.zh.md`.
- Material's native `theme.alternate` config drives the dropdown — no custom component needed.
- Caveat: `navigation.instant` is incompatible with the language switcher per Material docs. Drop that feature from `zensical.toml` on sites we localize.
- Translation source: hand-author EN (default), generate JA + ZH drafts via the same `scripts/auto-translate.mjs` (or extend `techne:docs-site` skill — see Phase 5).
- JA quality is the known weak spot (see Caveats below); plan for native-speaker review or DeepL one-time for the docs volume.

## Phase 5 — Extend `techne:docs-site`

Add an i18n sub-mode to the existing `techne:docs-site` skill: detect missing `.<lang>.md` files, run Qwen via Ollama to generate drafts (Argos fallback), queue them for review. Single command across all sister Zensical sites.

## Caveats — Qwen2.5-7B-Instruct quality

Observed during portfolio Phase 3 (2026-05-20):

- **ES** — `--fresh` draft surfaced no improvements worth cherry-picking; hand-authored ES stays canonical.
- **ZH** — ~15 surgical fixes on top of the draft produced shippable `zh.json` (proper-noun preservation for Techne / VelocityFL / Phalanx-FL, word-order fixes like `失败发送→发送失败`).
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
