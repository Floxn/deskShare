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
      path: '/room/:roomId',
      name: 'room',
      component: () => import('@/views/RoomView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterUser.vue')
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('@/views/UserView.vue')
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
      component: () => import('@/views/admin/room/AdminRooms.vue')
    },
    {
      path: '/admin/inventory',
      name: 'admin-inventory',
      component: () => import('@/views/components/InventoryList.vue')
    },
    {
      path: '/admin/room/create',
      name: 'admin-room-create',
      component: () => import('@/views/admin/room/AdminRoomCreate.vue')
    },
    {
      path: '/admin/desks',
      name: 'admin-desks',
      component: () => import('@/views/admin/desk/AdminDesks.vue')
    },
    {
      path: '/admin/desk/create',
      name: 'admin-desk-create',
      component: () => import('@/views/admin/desk/AdminDeskCreate.vue')
    }
  ]
})

export default router
