import { createRouter, createWebHistory } from 'vue-router'

import HomeRoute from '@/routes/Home-route.vue'
import ConversationRoute from '@/routes/Conversation-route.vue'
import BlogRoute from '@/routes/Blog-route.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomeRoute },
    { path: '/Conversations', name: 'Conversations', component: ConversationRoute },
    { path: '/Blogs', name: 'Blogs', component: BlogRoute },
  ],
})

export default router
