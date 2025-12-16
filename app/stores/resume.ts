import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ResumeViewMode } from '~/types'

export const useResumeStore = defineStore('resume', () => {
  const viewMode = ref<ResumeViewMode>('industry')

  const isIndustryView = computed(() => viewMode.value === 'industry')
  const isResearchView = computed(() => viewMode.value === 'research')

  function setViewMode(mode: ResumeViewMode) {
    viewMode.value = mode
  }

  function toggleViewMode() {
    viewMode.value = viewMode.value === 'industry' ? 'research' : 'industry'
  }

  return { viewMode, isIndustryView, isResearchView, setViewMode, toggleViewMode }
})
