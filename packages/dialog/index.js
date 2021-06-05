// 导入组件，组件必须声明 name
import Vue from 'vue'
import CxDialog from './src/dialog.vue'

const DialogController = Vue.extend(CxDialog)
const instance = new DialogController().$mount(document.createElement('div'))
const dialog = (option) => {
  document.body.appendChild(instance.$el)
  instance.show(option)
}
dialog.close = instance.close

// 为组件提供 install 安装方法，供按需引入
CxDialog.install = function (Vue) {
  Vue.component(CxDialog.name, CxDialog)
  Vue.$cxdialog = Vue.prototype.$cxdialog = dialog
}

export default CxDialog
