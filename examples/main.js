import Vue from 'vue'
import App from './App.vue'
// import Cxui from '../packages/index'
// Vue.use(Cxui)

import {
  Button,
  Dialog,
  Input,
  Switch
} from '../packages/index'
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Input)
Vue.use(Switch)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
