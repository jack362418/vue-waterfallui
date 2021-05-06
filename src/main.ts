import { createApp } from 'vue'
import 'lib-flexible'
import App from './App.vue'
import router from './router'
import store from './store'
import { vantPlugins } from "./plugins/vant";
import 'vant/lib/index.css';

import '@/styles/index.scss' // global css

createApp(App)
    .use(store)
    .use(router)
    .use(vantPlugins)
    .mount('#app')
