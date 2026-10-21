# ajbarea.github.io

AJ Barea's portfolio at https://ajbarea.github.io/: a Nuxt 4 static site in four languages (en, es, ja, zh), deployed to GitHub Pages. Humans start with [README.md](README.md).

## Commands

`make help` lists every target. Run `make setup` once, then `make validate` (lint, unit tests, build) before a PR. `make lint` includes the README claims and retired-name checks. `make dev`, `make preview` and `make test-e2e` start servers or browsers; run them only when needed.

## Rules

- Work in a git worktree and open a pull request; `main` is protected.
- Never commit `COMMITS.md` (a local scratchpad).
- `i18n/locales/en.json` is the canonical text; the other locales keep its placeholders (`{name}`, `{'@'}`) exactly. Project, profile and timeline data live in `app/data/`.
- `*.draft.json` and `*.hashes.json` under `i18n/locales/` are local translation output and stay untracked. `scripts/auto-translate.mjs` needs a local Ollama; do not run it unasked.
- A number in the README (strings, routes, projects) must trace to its source; `scripts/check-readme-claims.mjs` enforces the fragile ones, so update README and the script together.
- `scripts/check-retired-names.mjs` fails when a retired project name appears in site content.
- Keep the site accessible: axe-core runs in the e2e suite, and motion respects reduced-motion settings.

## State

`IMPL.md` holds the current slice and next step; `ROADMAP.md` the long view.
`.claude/skill-context.md` holds the facts the techne skills read for this repo.
