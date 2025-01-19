import { createApp } from 'vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import router from './router';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'

import './style.css';
import App from './App.vue';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi', // Garante que o Vuetify usará os ícones do MDI
  },
});

createApp(App).use(router).use(vuetify).mount('#app');

