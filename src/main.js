import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/index.css'; 
import vueWaterfall from '../lib/vue-waterfall.umd'

Vue.use(Vant);
Vue.use(vueWaterfall);
import App from './App.vue'
import 'lib-flexible'
Vue.config.productionTip = false 
new Vue({
  render: h => h(App),
}).$mount('#app')
