import { createApp } from 'vue';
import Icon from './directives/icon';
import App from './App.vue';
import router from './router';
import store from './store';
import VeeValidatePlugin from './plugins/validation';
import { auth } from './plugins/firebase';
import './assets/tailwind.css';
import './assets/main.css';
import i18n from './plugins/i18n';

let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(i18n).use(i18n);

    app.use(store);
    app.use(router);
    app.use(VeeValidatePlugin);
    app.directive('icon', Icon);

    app.mount('#app');
  }
});
