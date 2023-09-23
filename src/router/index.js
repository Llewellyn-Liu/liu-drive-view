import { createRouter, createWebHashHistory } from 'vue-router'
import Gallery from '../components/Gallery.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Gallery
    },
    {
      path: '/box/:id',
      name: 'box',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Box.vue')
    }
  ]
})

export default router
