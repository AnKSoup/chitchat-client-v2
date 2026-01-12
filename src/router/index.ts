import { createRouter, createWebHistory } from 'vue-router'

import HomeRoute from '@/routes/Home-route.vue'
import ConversationRoute from '@/routes/Conversation-route.vue'
import BlogRoute from '@/routes/Blog-route.vue'
import SigninRoute from '@/routes/Signin-Route.vue'
import LoginRoute from '@/routes/Login-Route.vue'
import { CanUserAccess } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeRoute },
    { path: '/Conversations', name: 'Conversations', component: ConversationRoute },
    { path: '/Blogs', name: 'Blogs', component: BlogRoute },
    { path: '/Signin', name: 'Signin', component: SigninRoute },
    { path: '/Login', name: 'Login', component: LoginRoute },
  ],
})

//Navigation guard
router.beforeEach((to) => {
  // canUserAccess() returns `true` or `false`
  const canAccess = CanUserAccess(to.path)
  if (!canAccess) return '/'
})

export default router
