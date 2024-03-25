import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/leetcode',
      name: 'leetcode',
      component: () => import('../views/LeetView.vue')
    },
    {
      path: '/category',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/archive',
      name: 'archive',
      component: () => import('../views/ArchiveView.vue')
    },
    {
      path: '/post/:pathMatch(.*)',
      name: 'post',
      component: () => import('../views/MdView.vue')
    }
  ]
})

export default router
