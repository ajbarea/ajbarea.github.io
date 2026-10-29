// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default withNuxt(
  [eslintPluginPrettierRecommended],
  // The site logs warnings and errors only; console.log and friends never ship to a browser.
  { rules: { 'no-console': ['error', { allow: ['warn', 'error'] }] } },
  // The Node scripts print their results to stdout.
  { files: ['scripts/**'], rules: { 'no-console': 'off' } }
)
