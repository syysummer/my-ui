// 导入颜色选择器组件
import Button from './button'
import Dialog from './dialog'
import Input from './input'
import Switch from './switch'
import './fonts/font.scss'
// 存储组件列表
const components = [
  Button,
  Dialog,
  Input,
  Switch
]
// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  if (install.installed) return;
  // 遍历注册全局组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}
// 判断是否是直接引入文件
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

// 默认暴露，方便全局引入
export default {
  Button,
  Dialog,
  Input,
  Switch,
  install
}

// 可以按需引入
export {
  Button,
  Dialog,
  Input,
  Switch,
  install
}
