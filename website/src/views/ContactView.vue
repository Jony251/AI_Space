<script setup lang="ts">
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">{{ t('letsConnect') }}</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-6">{{ t('reachOut') }}</p>
    <div class="flex gap-4">
      <a href="https://www.linkedin.com/in/daria-levitan-593440147/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-colors">Daria · LinkedIn</a>
      <a href="https://www.linkedin.com/in/evgeny-nemchenko/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-colors">Evgeny · LinkedIn</a>
    </div>
  </div>
</template>
