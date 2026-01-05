<script setup lang="ts">
import { profile } from '~/data/profile'
import { timelineEntries } from '~/data/timeline'
import { skillCategories } from '~/data/skills'

useHead({
  title: 'AJ Barea | Software Engineer',
  meta: [
    {
      name: 'description',
      content:
        'Software Engineer specializing in full-stack development, AI/ML, and cloud solutions. Currently completing MS in Software Engineering at RIT.'
    },
    {
      property: 'og:title',
      content: 'AJ Barea | Software Engineer'
    },
    {
      property: 'og:description',
      content:
        'Portfolio showcasing projects, research, and technical expertise in software engineering, AI/ML, and cloud solutions.'
    },
    {
      property: 'og:image',
      content: 'https://res.cloudinary.com/dumwa1w5x/image/upload/q_auto,f_auto/portfolio_ujli4t'
    },
    {
      property: 'og:url',
      content: 'https://ajbarea.github.io/'
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'AJ Barea | Software Engineer'
    },
    {
      name: 'twitter:description',
      content: 'Portfolio showcasing projects, research, and technical expertise.'
    }
  ]
})
</script>

<template>
  <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Hero Section with Author Card -->
    <section class="mb-12">
      <HomeAuthorCard :profile="profile" />
    </section>

    <!-- Timeline Section -->
    <HomeExperienceTimeline :entries="timelineEntries" />

    <!-- Expertise Grid Section -->
    <HomeExpertiseGrid :categories="skillCategories" />

    <!-- Contact Section -->
    <HomeContactSection />
  </div>
</template>
