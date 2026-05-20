<div align="center">

# ajbarea.github.io

### AJ Barea's Portfolio

_A multilingual Nuxt 4 portfolio with prerendered SEO, dual industry/research resume views, and a local-LLM translation pipeline._

[![Nuxt](https://img.shields.io/badge/Nuxt-4.2-00DC82?style=flat-square&logo=nuxt&logoColor=white)](https://nuxt.com)
[![Vue](https://img.shields.io/badge/Vue-3.5-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deploy](https://github.com/ajbarea/ajbarea.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/ajbarea/ajbarea.github.io/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

**Live: [ajbarea.github.io](https://ajbarea.github.io/)**
**Languages: English · Español · 日本語 · 中文**

</div>

---

## What is this?

The personal portfolio of AJ Barea, software engineer, federated-learning researcher at RIT, and incoming PhD student in Computing and Information Sciences. The site ships in four languages with prerendered hreflang SEO, a filterable project gallery, dual industry/research resume views, a Nuxt Content-backed blog, and a contact form with clipboard fallback.

The full content surface (~280 strings) lives in `i18n/locales/*.json`. Adding a new language is a one-line config edit plus a translation file.

---

## Features

- **Four locales:** English (canonical), Spanish (hand-authored), Japanese, Simplified Chinese
- **Project gallery:** 15+ projects, filterable by AI/ML, Full-Stack, Robotics, Cloud
- **Dual resume views:** toggle between Industry and Research with separate experience streams
- **Blog:** Nuxt Content with code highlighting
- **Photo gallery:** PhotoSwipe lightbox over Cloudinary CDN
- **Contact form:** Web3Forms backend with clipboard-copy fallback when no API key is set
- **Dark mode:** system-aware with manual toggle
- **64 prerendered routes:** 16 per locale via static-site generation
- **SEO:** `hreflang` on every page, self-pointing canonicals, `og:locale` alternates
- **Reduced-motion** respected by the typewriter and text-scroller
- **Local-LLM translation pipeline:** `scripts/auto-translate.mjs` calls Qwen2.5-7B via Ollama, validates placeholders, writes a reviewable draft

---

## Tech Stack

| Layer         | Choice                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------ |
| Framework     | [Nuxt 4](https://nuxt.com) (static-site generation)                                              |
| UI            | [Vue 3](https://vuejs.org) + [Tailwind CSS v4](https://tailwindcss.com)                          |
| Language      | [TypeScript](https://www.typescriptlang.org/) (strict)                                           |
| i18n          | [@nuxtjs/i18n v10](https://i18n.nuxtjs.org/) with `prefix_except_default` strategy               |
| Content       | [@nuxt/content](https://content.nuxt.com/) for the blog                                          |
| Images        | [@nuxt/image](https://image.nuxt.com/) over [Cloudinary](https://cloudinary.com/)                |
| Gallery       | [PhotoSwipe v5](https://photoswipe.com/) with dynamic captions                                   |
| State         | [Pinia](https://pinia.vuejs.org/)                                                                |
| Forms         | [Web3Forms](https://web3forms.com/)                                                              |
| Translation   | Local [Qwen2.5-7B-Instruct](https://ollama.com/library/qwen2.5) via [Ollama](https://ollama.com) |
| Testing       | [Vitest](https://vitest.dev/) (unit) + [Playwright](https://playwright.dev/) (e2e)               |
| Lint / format | [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/)                                 |
| Deploy        | GitHub Actions → GitHub Pages on Node 24                                                         |

---

## Quick Start

### 1. Install

```bash
git clone https://github.com/ajbarea/ajbarea.github.io.git
cd ajbarea.github.io
npm install
```

### 2. Develop

```bash
npm run dev      # dev server with HMR at http://localhost:3000
```

### 3. Build

```bash
npm run generate    # static-site generation → .output/public/
npm run preview     # serve the built site locally
```

### 4. Optional: contact form

Set `NUXT_PUBLIC_WEB3FORMS_KEY` in `.env` to enable real form submissions. Without it the form falls back to copying the email address to clipboard.

---

## Project Structure

```
ajbarea.github.io/
├── app/
│   ├── assets/styles/          # global CSS + design tokens
│   ├── components/
│   │   ├── home/               # AuthorCard, ExperienceTimeline, ActivityHighlights, ExpertiseGrid, ContactSection, ...
│   │   ├── projects/           # ProjectCard, ProjectFilter
│   │   ├── resume/             # ExperienceList, EducationCard, PublicationList, SkillsGrid, ResumeViewToggle
│   │   ├── layout/             # TheNavigation, LanguageSelector, ThemeToggle
│   │   └── ui/                 # ContactForm, ToastContainer
│   ├── composables/            # useTypewriter, useClipboard, useToast
│   ├── data/                   # profile, projects, timeline, publications, hackathons, conferences, workshops, highlights
│   ├── pages/                  # index, projects, resume, blog, gallery
│   ├── stores/                 # Pinia stores
│   └── types/                  # TypeScript interfaces
├── content/articles/           # Nuxt Content blog markdown
├── i18n/locales/               # en.json, es.json, ja.json, zh.json
├── public/                     # static assets, PDFs, favicons
├── scripts/                    # audit, hero-card composition, auto-translate
├── e2e/                        # Playwright specs
├── nuxt.config.ts              # i18n locales, image CDN, SEO base URL
└── IMPL.md                     # implementation spec (language-selector phases)
```

---

## Internationalization

The portfolio ships in four locales with bidirectional `hreflang` linking and self-pointing canonicals on every page. Adding a new locale is a three-step recipe.

### 1. Author the translation file

Copy `i18n/locales/en.json` to `i18n/locales/{code}.json` and translate every value. Preserve placeholders like `{name}`, `{title}`, `{category}` exactly, and keep the vue-i18n escape `{'@'}` intact (it renders as a literal `@` in email-like strings).

### 2. Or generate a draft via local Qwen

Requires [Ollama](https://ollama.com) installed and `qwen2.5:7b-instruct` pulled.

```bash
node scripts/auto-translate.mjs --target {es|ja|zh}
```

The script walks `en.json` recursively, calls Qwen for each string, validates that every placeholder survived the round-trip, retries up to 3× on failure, and writes a gitignored `{target}.draft.json`. Diff the draft against your committed locale before promoting it. Quality varies by language: Spanish is hand-authored; Mandarin needed ~15 surgical fixes on top of the draft; Japanese needed substantial rewrites because Qwen-7B mixed CJK scripts and leaked tokens from other languages.

### 3. Register the locale

```ts
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'en', language: 'en', file: 'en.json', name: 'English' },
    { code: 'es', language: 'es', file: 'es.json', name: 'Español' },
    { code: 'ja', language: 'ja', file: 'ja.json', name: '日本語' },
    { code: 'zh', language: 'zh-CN', file: 'zh.json', name: '中文' }
    // add your locale here
  ]
}
```

The `LanguageSelector` component picks up the new locale automatically from the dynamic locale list. `hreflang`, `canonical`, and `og:locale` tags update via `useLocaleHead({ seo: true })` on each page. No code changes needed.

For the full phased rollout (Phases 1a → 1b → 2 → 3) and the per-language quality observations, see [`IMPL.md`](IMPL.md).

---

## Development

```bash
npm run dev          # dev server with HMR
npm run generate     # static-site generation
npm run preview      # serve the built site locally
npm run lint         # ESLint over the full repo
npm run format       # Prettier auto-format
npm run test:unit    # Vitest (component + composable unit tests)
npm run test:e2e     # Playwright end-to-end suite
```

For full pre-push validation, `./lint.sh` runs format, lint, npm audit, unit tests, build, and e2e in sequence.

---

## Deployment

Pushes to `master` trigger `.github/workflows/deploy.yml`, which runs `npm ci` and `npm run generate` on Node 24, then deploys `.output/public/` to GitHub Pages via the official Pages actions. The first run after a new locale lands prerenders the additional routes (16 per locale) automatically.

---

## License

[MIT](LICENSE)

---

<div align="center">
<sub>Built by <a href="https://github.com/ajbarea">AJ Barea</a></sub>
</div>
