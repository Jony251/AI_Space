import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import MainLayout from './layouts/MainLayout.vue'
import { useI18n } from './i18n'
import './style.css'

// Init i18n (sets lang/dir on document)
useI18n()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: MainLayout,
      children: [
        { path: '', name: 'Home', component: () => import('./views/HomeView.vue') },
        { path: 'team', name: 'Team', component: () => import('./views/TeamView.vue') },
        { path: 'projects', name: 'Projects', component: () => import('./views/ProjectsView.vue') },
        { path: 'contact', name: 'Contact', component: () => import('./views/ContactView.vue') },
      ],
    },
  ],
})

createApp(App).use(router).mount('#app')
