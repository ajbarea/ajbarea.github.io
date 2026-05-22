##
## ajbarea.github.io — Makefile
## Canonical wrapper targets over npm scripts. Mirrors the audit phases
## in .claude/skill-context.md (`## audit`) so `techne:audit` and the
## human run the same pipeline.
##

.PHONY: help check-env setup fix lint test-unit test-e2e test build validate ci audit clean dev preview generate
.DEFAULT_GOAL := help

check-env:              ## Verify node + npm are on PATH
	@command -v node >/dev/null || { echo "node not on PATH (https://nodejs.org/)"; exit 1; }
	@command -v npm >/dev/null || { echo "npm not on PATH (ships with node)"; exit 1; }

setup: check-env        ## Clean install from package-lock.json (runs nuxt prepare via postinstall)
	@npm ci

fix:                    ## Prettier --write + eslint --fix
	@npm run format
	@npm run lint -- --fix

lint:                   ## Prettier --check + eslint + README claims assertion
	@npm run format:check
	@npm run lint:check
	@node scripts/check-readme-claims.mjs

test-unit:              ## Vitest unit tests (single-run, no watch)
	@npm run test:unit -- --run

test-e2e:               ## Playwright e2e (requires `npx playwright install` first run)
	@npm run test:e2e

test: test-unit test-e2e  ## Full test suite (unit + e2e)

build:                  ## Static-site generate to .output/public (mirrors deploy.yml)
	@npm run generate

validate: lint test-unit build  ## Fast pre-push gate (lint + unit + build)

ci: setup lint test build  ## Mirror CI end-to-end (matches ci.yml matrix order)

audit:                  ## npm audit (informational only)
	@npm audit || true

clean:                  ## Remove Nuxt build artifacts + caches
	@rm -rf .nuxt .output .nitro .data .cache dist playwright-report test-results

# Interactive — marked do_not_run in .claude/skill-context.md
dev:                    ## Start Nuxt dev server (do-not-run)
	@npm run dev

preview:                ## Serve the production build locally (do-not-run)
	@npm run preview

# Alias kept for muscle-memory parity with the npm script name
generate: build         ## Alias for `make build`

help:                   ## Show this help
	@grep -hE '^[a-zA-Z][a-zA-Z0-9_-]*:.*?##' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "  %-12s %s\n", $$1, $$2}'
