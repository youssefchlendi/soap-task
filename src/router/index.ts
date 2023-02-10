import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import ContinentsPage from '../views/ContinentsPage.vue'
import CountriesPage from '../views/CountriesPage.vue'
import OneCountryPage from '../views/OneCountryPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: ContinentsPage
  },
  {
	path: '/home/:code',
	name: 'Countries',
	component: CountriesPage
  },
  {
	path: '/country/:code',
	name: 'Country',
	component: OneCountryPage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
