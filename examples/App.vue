<template>
  <div id="app">
    <!-- button测试 -->
    <div class="test-item">
      <cx-button type="success" @click="handleClick">我是button1</cx-button>
      <!-- <cx-button type="primaly">我是button2</cx-button> -->
    </div>
    
    <!-- dialog测试 -->
    <!-- <cx-dialog :visible.sync="isDialogShow" title="提示">
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
      <template v-slot:footer>
        <cx-button @click="isDialogShow = false">取 消</cx-button>
        <cx-button type="primary" @click="isDialogShow = false">确 定</cx-button>
      </template>
    </cx-dialog> -->

    <!-- input测试 -->
    <div class="test-item">
      <cx-input type="password" v-model="inputContent" :clearable="true"></cx-input>
      <div class="input-content">输入的内容：{{inputContent}}</div>
    </div>

    <!-- switch测试 -->
    <div class="test-item">
      <cx-switch :value="isChecked" @input="handleSwitchChange"></cx-switch>
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
    }
  },
  methods: {
    handleClick(){
      // this.isDialogShow = true
      this.$cxdialog({
        msg: '提示的具体内容',
      })
    },
    handleSwitchChange(value){
      this.isChecked = value
    }
  }
}
</script>

<style lang='scss'>
#app{
  color: #000;
  display: flex;
  flex-direction: column;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  .test-item{
    margin-top: 40px;
  }
  .input-content{
    margin-top: 10px;
  }
}
</style>
