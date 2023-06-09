import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/typo',
      name: 'typo',
      component: () => import('@/views/typo.vue')
    },
    {
      path: '/room',
      name: 'room',
      component: () => import('@/views/RoomView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/admin/AdminDashboardView.vue')
    },
    {
      path: '/admin/rooms',
      name: 'admin-rooms',
      component: () => import('@/views/admin/AdminRooms.vue')
    },
    {
      path: '/admin/rooms/create',
      name: 'admin-rooms-create',
      component: () => import('@/views/admin/AdminRoomCreate.vue')
    }
  ]
})

export default router
