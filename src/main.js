import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import GStore from "./store";
import { Quasar } from "quasar";
import quasarUserOptions from "./quasar-user-options";
import 'nprogress/nprogress.css'

createApp(App)
    .use(Quasar, quasarUserOptions)
    .use(router)
    .provide('GStore', GStore)
    .mount("#app");