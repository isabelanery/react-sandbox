import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import router from './router';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import './style.css';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(vuetify).mount('#app');

