<script setup lang="ts">
import { projects } from '../data/projects'
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">{{ t('niceStuff') }}</h1>

    <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{{ t('sideHustles') }}</h2>
    <div class="grid sm:grid-cols-2 gap-6 mb-12">
      <a
        v-for="(p, i) in projects.sideHustles"
        :key="`side-${i}`"
        :href="p.url"
        class="group block p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors relative"
      >
        <span
          v-if="p.tag"
          class="absolute top-4 right-4 text-xs font-medium px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
        >
          {{ p.tag }}
        </span>
        <span class="text-2xl mb-4 block">{{ p.icon }}</span>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ p.title }}
        </h3>
        <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">{{ p.description }}</p>
        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>

    <h2 class="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">{{ t('clientProjects') }}</h2>
    <div class="grid sm:grid-cols-2 gap-6">
      <a
        v-for="(p, i) in projects.clientProjects"
        :key="`client-${i}`"
        :href="p.url"
        class="group block p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
      >
        <span class="text-2xl mb-4 block">{{ p.icon }}</span>
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {{ p.title }}
        </h3>
        <p class="text-slate-600 dark:text-slate-400 text-sm mt-2">{{ p.description }}</p>
        <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 mt-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </div>
</template>
