import { createRouter, createWebHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Video from '../pages/Video.vue';
import NotFound from '../pages/NotFound.vue';
import { getApiKey } from '../api';

const routes = [
  { path: '/', component: Login },
  { path: '/home', component: Home, meta: { requiresAuth: true } },
  { path: '/video/:videoId', component: Video, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, _from, next) => {
  const isAuthenticated = !!getApiKey();

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/');
  } else {
    next();
  }
});

export default router;
