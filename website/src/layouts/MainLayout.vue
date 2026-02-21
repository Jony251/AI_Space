<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from '../i18n'

const route = useRoute()
const { locale, t, setLocale } = useI18n()
const isDark = ref(
  typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark'
)

const navItems = [
  { path: '/', key: 'navHome' as const, icon: 'home' },
  { path: '/team', key: 'navTeam' as const, icon: 'info' },
  { path: '/projects', key: 'navProjects' as const, icon: 'projects' },
  { path: '/contact', key: 'navContact' as const, icon: 'send' },
]

const locales = [
  { code: 'en' as const, label: 'EN' },
  { code: 'ru' as const, label: 'RU' },
  { code: 'he' as const, label: 'HE' },
]

const isActive = (path: string) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}

function toggleTheme() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (saved === 'dark' || (!saved && preferDark)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans antialiased flex transition-colors">
    <!-- Left sidebar nav -->
    <aside class="fixed left-0 top-0 h-full w-16 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-8 gap-6 bg-white dark:bg-slate-900 z-50 transition-colors">
      <router-link to="/" class="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">D</router-link>
      <nav class="flex flex-col gap-6">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="relative flex items-center justify-center w-10 h-10 rounded-lg transition-colors"
          :class="isActive(item.path)
            ? 'text-blue-600 dark:text-blue-400'
            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'"
        >
          <span
            v-if="isActive(item.path)"
            class="absolute left-0 w-0.5 h-6 bg-blue-600 dark:bg-blue-400 rounded-r"
          />
          <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <svg v-else-if="item.icon === 'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="item.icon === 'projects'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg v-else-if="item.icon === 'send'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </router-link>
      </nav>
    </aside>

    <main class="flex-1 pl-16">
      <header dir="ltr" class="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-end gap-2 px-8 py-4">
        <div class="flex rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600">
          <button
            v-for="loc in locales"
            :key="loc.code"
            @click="setLocale(loc.code)"
            class="px-2.5 py-1.5 text-sm font-medium transition-colors min-w-[2.25rem]"
            :class="locale === loc.code
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white'
              : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400'"
          >
            {{ loc.label }}
          </button>
        </div>
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </header>

      <div class="flex">
        <div class="flex-1 flex justify-center min-w-0">
          <div class="w-full max-w-3xl px-8 py-12">
            <router-view />
          </div>
        </div>
        <aside class="hidden lg:block w-80 shrink-0 border-l border-slate-200 dark:border-slate-700 p-8">
          <div class="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <div class="flex -space-x-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-slate-900" />
              <div class="w-8 h-8 rounded-full bg-slate-400 dark:bg-slate-500 border-2 border-white dark:border-slate-900" />
              <div class="w-8 h-8 rounded-full bg-slate-500 dark:bg-slate-400 border-2 border-white dark:border-slate-900" />
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">{{ t('newsletterTitle') }}</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">{{ t('newsletterSub') }}</p>
            <input
              type="email"
              :placeholder="t('emailPlaceholder')"
              class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button class="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              {{ t('subscribe') }}
            </button>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>
