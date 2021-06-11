<template>
  <div id="app">
    <!-- button测试 -->
    <div class="test-item">
      <cx-button type="success" @click="handleClick">我是button1</cx-button>
      <cx-button type="primaly" @click="toggleTheme">切换主题</cx-button>
    </div>
    
    <!-- dialog测试 -->
    <cx-dialog :visible.sync="isDialogShow" title="提示">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <template v-slot:footer>
        <cx-button @click="isDialogShow = false">取 消</cx-button>
        <cx-button type="primary" @click="isDialogShow = false">确 定</cx-button>
      </template>
    </cx-dialog>

    <!-- input测试 -->
    <div class="test-item">
      <cx-input type="password" v-model="inputContent" :clearable="true"></cx-input>
      <div class="input-content">输入的内容：{{inputContent}}</div>
    </div>

    <!-- switch测试 -->
    <div class="test-item">
      <cx-switch :value="isChecked" @input="handleSwitchChange"></cx-switch>
    </div>

    <!-- toast测试 -->
    <div class="test-item">
      <cx-toast 
       :visible.sync="toastShow"
       position="center"
       :duration="4000"
       :onClose="()=>{}"
       className="diy-toast"
       type="success"
      >我是提示的内容呢</cx-toast>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      isDialogShow: false,
      inputContent: '',
      isChecked: false,
      toastShow: false
    }
  },
  created () {
    document.documentElement.setAttribute('data-theme', 'light')
  },
  methods: {
    handleClick(){
      // this.isDialogShow = true
      // this.$cxdialog({
      //   msg: '提示的具体内容',
      // })
      // this.$toast({
      //   msg: '我是轻提示的容',
      //   showClose: true,
      //   onClose: () => {
      //     console.log('关闭toast')
      //   }
      // })
      // this.$toast('我是提示的内容，哈哈哈哈哈哈') 
      this.toastShow = true
    },
    toggleTheme () {
      const currentTheme = document.documentElement.getAttribute('data-theme')
      if(currentTheme === 'light'){
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.setAttribute('data-theme', 'light')
      }
    },
    handleSwitchChange(value){
      this.isChecked = value
    }
  }
}
</script>

<style lang='scss'>
body{
  padding: 0;
  margin: 0;
}
#app{
  height: 100vh;
  color: #000;
  background: #000;
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  justify-content: flex-start;
  align-items: center;
  .test-item{
    margin-top: 40px;
  }
  .input-content{
    margin-top: 10px;
  }
}
</style>
