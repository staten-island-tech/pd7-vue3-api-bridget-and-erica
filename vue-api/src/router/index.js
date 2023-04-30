import { createRouter, createWebHistory } from 'vue-router'
import ApiData from '../views/ApiData.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ApiData //api data view will load in by default
    },
    {
      path: '/ApiData',
      name: 'ApiData',
      component: () => import('../views/ApiData.vue')
    },
    {
      path: '/BarView',
      name: 'Barview',
      component: () => import('../views/BarView.vue')
    },
    {
      path: '/PieView',
      name: 'PieView',
      component: () => import('../views/PieView.vue')
    }
  ]
})

export default router
