<script setup lang="ts">
import { profile } from '~/data/profile'
import { timelineEntries } from '~/data/timeline'
import { skillCategories } from '~/data/skills'

const { t } = useI18n()
const i18nHead = useLocaleHead({ seo: true })

useHead(() => ({
  title: t('meta.homeTitle'),
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    ...(i18nHead.value.meta || []),
    { name: 'description', content: t('meta.homeDescription') },
    { property: 'og:title', content: t('meta.homeTitle') },
    { property: 'og:description', content: t('meta.homeOgDescription') },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/portfolio_ujli4t'
    },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t('meta.homeTitle') },
    { name: 'twitter:description', content: t('meta.homeTwitterDescription') }
  ]
}))
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section with Author Card -->
    <section class="mb-12">
      <HomeAuthorCard :profile="profile" />
    </section>

    <!-- Timeline Section -->
    <HomeExperienceTimeline :entries="timelineEntries" />

    <!-- Selected Activity 2026 -->
    <HomeActivityHighlights />

    <!-- Expertise Grid Section -->
    <HomeExpertiseGrid :categories="skillCategories" />

    <!-- Contact Section -->
    <HomeContactSection />
  </div>
</template>
