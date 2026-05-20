# skill-context — ajbarea.github.io

Repo-specific facts for canonical techne skills. Injected into each skill at
invocation via `!cat .claude/skill-context.md`. Update on toolchain / path /
tooling changes.

## repo

- name: ajbarea.github.io
- package_root: `app/` (Vue components + pages + composables + stores), `content/` (Nuxt Content articles), `scripts/` (audit + translate utilities)
- language: TypeScript (Nuxt 4 + Vue 3) — no Python, no Rust
- cli_entrypoint: `npm run <script>` (see `package.json` `scripts`)
- runner_module: no Python runner; npm scripts drive the pipeline
- default_branch: `main` (renamed from `master` 2026-05-20; deploy.yml triggers on push)
- has: Nuxt 4, Vue 3, Tailwind v4, Pinia, Nuxt Content, @nuxtjs/i18n (four locales — en / es / ja / zh), ESLint flat config, Prettier, Vitest, Playwright + @axe-core/playwright, PhotoSwipe + Cloudinary CDN, local-LLM translation pipeline via Ollama (Qwen2.5-7B-Instruct)

## audit

No `make` wrapper today — audit drives npm scripts directly, in dependency order:

### Phase 1 — Setup

1. `npm ci` — clean install from `package-lock.json`. **Required before lint/test** — Nuxt's `postinstall` runs `nuxt prepare` which generates `.nuxt/` type stubs that ESLint and TypeScript depend on.

### Phase 2 — Fix (one-way door)

2. `npm run format` — `prettier --write .`
3. `npm run lint -- --fix` — `eslint . --fix` (no auto-target in package.json today; pass the flag inline)

### Phase 3 — Granular lint

4. `npm run format:check` — `prettier --check .`
5. `npm run lint:check` — `eslint .`

### Phase 4 — Granular test

6. `npm run test:unit` — `vitest` (component / composable / store tests)
7. `npm run test:e2e` — `playwright test`. **Side-effectful**: spawns Chromium, needs `npx playwright install` first run. Skip when running headless / WSL2 without graphical support.

### Phase 5 — End-to-end gates

8. `npm run generate` — `nuxt generate` static-site build. The "is it deployable" probe. Renders all 64 prerendered routes (16 per locale).
9. `node scripts/audit.mjs` — local Playwright sweep against `npm run dev` at `:3000`: screenshots × 3 viewports × 2 color schemes, console / network capture, axe accessibility scan, focus-order check, lightweight performance metrics. Writes to `/tmp/audit/`.
10. `node scripts/audit-prod.mjs` — same shape against the production-build preview at `:4000`. Catches differences between dev and generated output.

Fast audit = `npm ci → format:check → lint:check → test:unit → generate`. Five commands.

Stop-early phase: Phase 1 (`npm ci`). If install fails, abort — every downstream step depends on it.

Do-not-run targets (long-running, interactive, or external-state):

- `npm run dev` (interactive dev server)
- `npm run preview` (interactive preview server)
- Anything spawning Ollama (`scripts/auto-translate.mjs` runs Qwen2.5-7B locally — expects `ollama serve` and the model pulled)

## ci_audit

Referenced configs a CI failure can trace to:

- `package.json` (scripts, deps, engines if any)
- `nuxt.config.ts` (i18n, content, image, SSG output)
- `.github/workflows/deploy.yml` (the single workflow)
- `.npmrc`, `tsconfig.json`, `eslint.config.*`, `prettier` config (in `.prettierrc`)

Tool error markers (extend the default grep set):

- `nuxt` / `nitro` (SSG build errors)
- `vite` (dev / build pipeline errors)
- `eslint` (lint failures)
- `prettier` (format-check failures)
- `vitest` (unit failures)
- `playwright` (e2e failures)
- `axe` / `accessibility` (a11y violations from `scripts/audit*.mjs`)

Expected external PR checks: none configured today (deploy.yml is push-on-main only — PRs don't fire CI). Worth filing as a separate concern.

## slop_ground_truth

Source of truth for quantitative claims in README / blog:

- **Locale strings:** `i18n/locales/{en,es,ja,zh}.json` — the canonical content surface. Claim about "~280 strings" or "four locales" must trace here.
- **Prerendered route count:** `nuxt.config.ts` route generation rules; the README "64 prerendered routes (16 per locale)" claim derives from `nuxt generate` output.
- **Project gallery counts:** `app/data/projects.ts` (or wherever project metadata lives) — claim about "15+ projects" / "8 flagship" must trace here.
- **Performance / accessibility scores:** `scripts/audit.mjs` / `scripts/audit-prod.mjs` reports under `/tmp/audit/` (ephemeral); persistent claims need a captured artifact.

Any quantitative claim not traceable to one of those is slop.

## scan_scope

Skip paths:

- `.nuxt/`, `.output/`, `.nitro/`, `.data/`, `.cache/`, `dist/`, `node_modules/`
- `package-lock.json`
- `playwright-report/`, `test-results/`, `lighthouse*.json`
- `public/images/projects/` (locally composited, uploaded to Cloudinary — gitignored)
- `i18n/locales/*.draft.json` (translation drafts from `scripts/auto-translate.mjs` — gitignored)
- `design-assets/` (source `.webp` files for project thumbnails; not part of the site bundle)

Subagent scan-area split:

- App: `app/**/*.{vue,ts}` (pages, layouts, components, composables, stores)
- Content: `content/**/*.{md,yml}` (blog articles + frontmatter)
- Scripts: `scripts/**/*.mjs` (audit + translate utilities)
- Config / build: `nuxt.config.ts`, `content.config.ts`, `tsconfig.json`, `eslint.config.*`, `package.json`, `.github/workflows/**`
- Locales: `i18n/locales/*.json` (canonical content surface)
- Docs / repo: `README.md`, `IMPL.md`

## docs_site

There is no separate docs site for this repo — the site **is** the docs surface. The portfolio publishes to `https://ajbarea.github.io/` via GitHub Pages from the `main` branch.

- config: `nuxt.config.ts` (SSG mode + i18n + content routing)
- workflow: `.github/workflows/deploy.yml`
- build_command: `npm run generate`
- output_dir: `.output/public`
- site_url: `https://ajbarea.github.io/`
- action_pins (expected current, 2026-05 audit): `actions/checkout@v6.0.2`, `actions/setup-node@v6`, `actions/configure-pages@v6.0.0`, `actions/upload-pages-artifact@v5.0.0`, `actions/deploy-pages@v5.0.0`
- nav structure: i18n-aware — pages under `app/pages/` auto-route, hreflang alternates emitted per locale

## i18n

Four locales — `en` (canonical), `es` (hand-authored), `ja` and `zh` (LLM-drafted via Qwen2.5-7B, AJ QA-pass before publish). Translation source policy lives in `IMPL.md` (the language-selector spec). Free-tier-only constraint is load-bearing: no paid translation APIs, no DeepL paid, no Google Cloud Translate. Drafts emitted by `scripts/auto-translate.mjs` land at `i18n/locales/*.draft.json` (gitignored); promote to `{lang}.json` after QA and register the locale in `nuxt.config.ts`.
