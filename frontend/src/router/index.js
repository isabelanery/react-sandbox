import { createRouter, createMemoryHistory } from 'vue-router';
import Login from '../pages/Login.vue';
import Home from '../pages/Home.vue';
import Video from '../pages/Video.vue';

const routes = [
  { path: '/', component: Login }
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
