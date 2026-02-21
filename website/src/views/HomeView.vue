<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { developers } from '../data/developers'
import { articles } from '../data/articles'
import { categories } from '../data/categories'

const activeSection = ref('home')
const activeCategory = ref('all')
const isDark = ref(
  typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark'
)

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

const navItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'about', label: 'About', icon: 'info' },
  { id: 'articles', label: 'Articles', icon: 'articles' },
  { id: 'contact', label: 'Contact', icon: 'send' },
]

const filteredArticles = computed(() => {
  if (activeCategory.value === 'all') return articles
  return articles.filter((a) => a.category === activeCategory.value)
})

const activeCategoryData = computed(
  () => categories.find((c) => c.id === activeCategory.value)
)

function scrollTo(id: string) {
  activeSection.value = id
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
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

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) activeSection.value = e.target.id
      }
    },
    { rootMargin: '-30% 0px -60% 0px' }
  )
  ;['home', 'about', 'articles', 'contact'].forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer.observe(el)
  })
})
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans antialiased flex transition-colors">
    <!-- Left sidebar nav (DevSpace style) -->
    <aside class="fixed left-0 top-0 h-full w-16 border-r border-slate-200 dark:border-slate-700 flex flex-col items-center py-8 gap-6 bg-white dark:bg-slate-900 z-50 transition-colors">
      <a href="/" class="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-4">D</a>
      <nav class="flex flex-col gap-6">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="scrollTo(item.id)"
          class="relative flex items-center justify-center w-10 h-10 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          :class="{ 'text-blue-600 dark:text-blue-400': activeSection === item.id }"
        >
          <span
            v-if="activeSection === item.id"
            class="absolute left-0 w-0.5 h-6 bg-blue-600 dark:bg-blue-400 rounded-r"
          />
          <!-- Home -->
          <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <!-- About / Info -->
          <svg v-else-if="item.icon === 'info'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Articles -->
          <svg v-else-if="item.icon === 'articles'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <!-- Contact / Send -->
          <svg v-else-if="item.icon === 'send'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </nav>
    </aside>

    <!-- Main content area -->
    <main class="flex-1 pl-16">
      <!-- Top bar -->
      <header class="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur flex items-center justify-end px-8 py-4">
        <button
          @click="toggleTheme"
          class="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <!-- Sun icon (show in dark mode) -->
          <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <!-- Moon icon (show in light mode) -->
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </header>

      <!-- Content: 2-column (main + right sidebar) -->
      <div class="flex">
        <!-- Central column -->
        <div class="flex-1 min-w-0 px-8 py-12 max-w-3xl">
          <!-- Profile / Hero section -->
          <section id="home" class="mb-16 scroll-mt-24">
            <div class="flex flex-col items-center text-center mb-12">
              <div class="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 text-2xl font-bold mb-6 overflow-hidden">
                <span>DL + EN</span>
              </div>
              <h1 class="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight mb-4">
                We turn ideas into <span class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded">real</span> products
              </h1>
              <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-2xl">
                Daria brings the brains behind the scenes — solid backend, clear architecture, and thoughtful technical writing.
                Evgeny brings it to life in the browser — fast, polished interfaces that people enjoy using.
                Two minds, one stack, zero compromises.
              </p>
            </div>
          </section>

          <!-- About / Team -->
          <section id="about" class="mb-16 scroll-mt-24">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">The Team</h2>
            <div class="space-y-8">
              <article
                v-for="dev in developers"
                :key="dev.name"
                class="flex gap-6 items-start"
              >
                <div class="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 text-sm font-medium shrink-0 overflow-hidden">
                  <img v-if="dev.photo" :src="dev.photo" :alt="dev.name" class="w-full h-full object-cover" />
                  <span v-else>{{ dev.name.split(' ').map(n => n[0]).join('') }}</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white">{{ dev.name }} · {{ dev.role }}</h3>
                  <p class="text-slate-600 dark:text-slate-400 mt-1">{{ dev.bio }}</p>
                  <div class="flex gap-3 mt-3">
                    <a :href="dev.linkedin" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a :href="dev.github" target="_blank" rel="noopener noreferrer" class="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <!-- Latest Articles -->
          <section id="articles" class="mb-16 scroll-mt-24">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-6">Latest Articles</h2>
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
                {{ cat.label }}
              </button>
            </div>
            <a
              v-if="activeCategoryData?.url"
              :href="activeCategoryData.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400 hover:underline mb-6"
            >
              View all on Whale
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
                  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {{ article.title }}
                  </h3>
                  <p class="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-2">{{ article.excerpt }}</p>
                </div>
                <svg class="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </section>

          <!-- Contact -->
          <section id="contact" class="scroll-mt-24">
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">Let's connect</h2>
            <p class="text-slate-600 dark:text-slate-400 mb-6">Reach out via LinkedIn or GitHub.</p>
            <div class="flex gap-4">
              <a href="https://www.linkedin.com/in/daria-levitan-593440147/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-colors">Daria · LinkedIn</a>
              <a href="https://www.linkedin.com/in/evgeny-nemchenko/" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-colors">Evgeny · LinkedIn</a>
            </div>
          </section>
        </div>

        <!-- Right sidebar -->
        <aside class="hidden lg:block w-80 shrink-0 border-l border-slate-200 dark:border-slate-700 p-8">
          <!-- Newsletter -->
          <div class="border border-slate-200 dark:border-slate-700 rounded-xl p-6 mb-8">
            <div class="flex -space-x-2 mb-4">
              <div class="w-8 h-8 rounded-full bg-slate-300 border-2 border-white" />
              <div class="w-8 h-8 rounded-full bg-slate-400 border-2 border-white" />
              <div class="w-8 h-8 rounded-full bg-slate-500 border-2 border-white" />
            </div>
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">Never miss an update!</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">Subscribe and stay in the loop.</p>
            <input
              type="email"
              placeholder="Your email..."
              class="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button class="w-full py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
          <!-- Sponsored / CTA -->
          <div class="border border-slate-200 dark:border-slate-700 rounded-xl p-6">
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-2">* Sponsor</p>
            <h3 class="font-bold text-slate-900 dark:text-white mb-2">Build The Site You Want!</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400">Your website should be an asset, not an engineering challenge.</p>
          </div>
        </aside>
      </div>
    </main>
  </div>
</template>
