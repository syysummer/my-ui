// 导入组件，组件必须声明 name
import Vue from 'vue'
import CxToast from './src/toast.vue'

const toast = (option) => {
  const ToastController = Vue.extend(CxToast)
  const instance = new ToastController().$mount(document.createElement('div'))  
  document.body.appendChild(instance.$el)
  instance.show(option)
}

// 为组件提供 install 安装方法，供按需引入
CxToast.install = function (Vue) {
  Vue.component(CxToast.name, CxToast)
  Vue.prototype.$toast = toast
}

export default CxToast
