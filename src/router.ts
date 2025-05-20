import { createRouter, createWebHistory } from 'vue-router'
import EventsPage from './components/EventsPage.vue'
import AboutPage from './components/AboutPage.vue'
import SponsorPage from './components/SponsorPage.vue'
import CodeOfConductPage from './components/CodeOfConductPage.vue'
import HomePage from './components/HomePage.vue'

const routes = [
  { path: '/', name: 'Accueil', component: HomePage },
  { path: '/evenements', name: 'Événements', component: EventsPage },
  { path: '/a-propos', name: 'À propos', component: AboutPage },
  { path: '/devenir-sponsor', name: 'Devenir sponsor', component: SponsorPage },
  { path: '/code-de-conduite', name: 'Code de conduite', component: CodeOfConductPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router 