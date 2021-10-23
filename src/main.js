import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GStore from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import 'nprogress/nprogress.css'
import 'bootstrap'
import { FontAwesomeIcon } from './plugins/font-awesome'
import '@/services/AxiosInterceptorSetup.js';

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .provide('GStore', GStore)
    .mount("#app");