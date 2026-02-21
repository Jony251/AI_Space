<script setup lang="ts">
import { ref, computed } from 'vue'
import { articles } from '../data/articles'
import { categories } from '../data/categories'
import { useI18n } from '../i18n'

const { t } = useI18n()
const activeCategory = ref('all')
const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') return articles
  return articles.filter((a) => a.category === activeCategory.value)
})
const activeCategoryData = computed(
  () => categories.find((c) => c.id === activeCategory.value)
)
const categoryLabel = (id: string) => t(`cat${id.charAt(0).toUpperCase() + id.slice(1)}` as 'catAll' | 'catAi' | 'catDigital' | 'catBackend' | 'catFrontend')
</script>

<template>
  <div>
    <!-- Header / Intro -->
    <div class="mb-12">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
        {{ t('headerTitle') }}
        <span class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded">{{ t('headerHighlight') }}</span>
        {{ t('headerSuffix') }}
      </h1>
      <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
        {{ t('headerSubtitle') }}
      </p>
    </div>

    <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">{{ t('latestArticles') }}</h2>
    <div class="flex gap-2 mb-8 overflow-x-auto pb-2 flex-wrap">
      <button
        v-for="cat in categories"
        :key="cat.id"
        @click="activeCategory = cat.id"
        class="px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors"
        :class="activeCategory === cat.id
          ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'"
      >
        {{ categoryLabel(cat.id) }}
      </button>
    </div>
    <a
      v-if="activeCategoryData?.url"
      :href="activeCategoryData.url"
      target="_blank"
      rel="noopener noreferrer"
      class="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
    >
      {{ t('viewAllOnWhale') }}
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
    <div class="space-y-8">
      <a
        v-for="(article, i) in filteredArticles"
        :key="`${article.category}-${i}-${article.title}`"
        :href="article.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex gap-6 items-start"
      >
        <div class="w-24 h-24 rounded-lg bg-slate-200 dark:bg-slate-700 shrink-0 overflow-hidden">
          <img
            v-if="article.image"
            :src="article.image"
            :alt="article.title"
            class="w-full h-full object-cover"
          />
          <span v-else class="w-full h-full flex items-center justify-center text-slate-400 text-xs">IMG</span>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm text-slate-500 dark:text-slate-400">— {{ article.date }}</p>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {{ article.title }}
          </h2>
          <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-2">{{ article.excerpt }}</p>
        </div>
        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</template>
