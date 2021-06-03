import Vue from 'vue'
import App from './App.vue'
import Cxui from '../packages/index'
Vue.use(Cxui)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
