import App from '$/presentations/App.vue';

import { createAppRouter } from '$/presentations/router';
import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { Dialog, Loading, Notify, Quasar } from 'quasar';
import langJa from 'quasar/lang/ja';
import { createApp } from 'vue';

const app = createApp(App);
app.use(createAppRouter());
app.use(createPinia());
app.use(Quasar, {
  lang: langJa,
  plugins: {
    Dialog,
    Loading,
    Notify,
  },
});
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
    },
  },
});
app.mount('#app');
