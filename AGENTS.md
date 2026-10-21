# ajbarea.github.io

AJ Barea's portfolio at https://ajbarea.github.io/: a Nuxt 4 static site in four languages (en, es, ja, zh), deployed to GitHub Pages. Humans start with [README.md](README.md).

## Commands

`make help` lists every target. Run `make setup` in each checkout or worktree, then `make validate` (lint, unit tests, build) before a PR. `make lint` includes the README claims and retired-name checks. `make dev`, `make preview` and `make test-e2e` start servers or browsers; run them only when needed. `make test-e2e` reuses any server already on port 3000 (another worktree's, or `make dev`), so check the port is free first.

## Rules

- Work in a git worktree and open a pull request; `main` is protected.
- Never commit `COMMITS.md` (a local scratchpad).
- `i18n/locales/en.json` is the canonical text; the other locales keep its placeholders (`{name}`, `{'@'}`) exactly. Project, profile and timeline data live in `app/data/`.
- `scripts/auto-translate.mjs` needs a local Ollama and writes a gitignored `{lang}.draft.json` (with `*.hashes.json`) for review; run it only when asked. `es.json` is hand-authored; never promote a machine draft over it.
- Every number in the README traces to its source. `scripts/check-readme-claims.mjs` checks the project count and filters against `app/data/projects.ts`, and the locale count and per-locale route arithmetic against `nuxt.config.ts`; update README and the script together.
- `scripts/check-retired-names.mjs` fails when a retired project name appears in site content (today `IntelliFL`; the lab's name is `InteFL`). A merge to `main` deploys the live site.
- Keep the site accessible: axe-core runs in the e2e suite, and motion respects reduced-motion settings.

## State

`IMPL.md` holds the current slice and next step; `ROADMAP.md` the long view.
`.claude/skill-context.md` holds the facts the techne skills read for this repo.
