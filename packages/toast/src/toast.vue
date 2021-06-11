<template>
  <div
    :class="[
      'cx-toast__wrapper',
      type && !iconClass ? `cx-toast--${ type }` : '',
      position === 'center' ? 'is-center' : '',
      position,
      type ? `cx-toast__${type}`: '',
      className
    ]"
    :style="positionStyle"
    v-show="visible"
  >
    <div class="cx-toast__content">
      <i :class="iconClass" v-if="iconClass"></i>
      <p v-if="message" v-html="message"></p>
      <slot v-else></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  let durTimer = null
  export default {
    name: 'CxToast',
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2000
      },
      onClose: {
        type: Function,
        default: null
      },
      position: {
        type: String,
        default: 'center'
      },
      className: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      iconClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        istemplete: true,
        message: '',
        closed: false,
      }
    },
    computed: {
      positionStyle() {
        const positionMap = {
          top: 'flex-start',
          center: 'center',
          bottom: 'flex-end'
        }
        return {
          alignItems: positionMap[this.position]
        };
      }
    },
    methods: {
      show (option) {
        const type = typeof option
        this.istemplete = false;
         if(type === 'string'){
          this.message = option
        }if(type === 'object'){
          this.message = option.msg
          this.onClose = option.onClose
        }
        this.visible = true
        this.closed = false
        this.startTimer()
      },
      handleClose() {
        this.$emit('update:visible', false)
        this.closed = true
        if(!this.istemplete){
          this.visible = false
        }
        if (typeof this.onClose === 'function') {
          this.onClose(this);
        }
      },
      startTimer() {
        if(durTimer){clearTimeout(durTimer)}
        durTimer = setTimeout(() => {
          if(!this.closed){
            this.handleClose()
          }
          clearTimeout(durTimer)
        }, this.duration);
      },
      keydown(e) {
        if (e.keyCode === 27) { // esc关闭消息
          this.handleClose();
        }
      }
    },
    mounted() {
      if(this.visible){
        this.startTimer()
      }
      document.addEventListener('keydown', this.keydown);
    },
    watch: {
      visible(newV, oldV){
        if(newV && !oldV){
          this.closed = false
          this.startTimer()
        }
      }
    },
    beforeDestroy() {
      document.removeEventListener('keydown', this.keydown);
    }
  };
</script>
<style lang="scss">
@import "@theme/_handle.scss";
.cx-toast__wrapper{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0,0);
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  align-items: center;
  &.top{
    position: absolute;
    top: 10vh;
  }
  &.bottom{
    position: absolute;
    bottom: 10vh;
  }
  .cx-toast__content{
    min-width: 15.625rem;
    max-width: 35.625rem;
    min-height: 6.625rem;
    padding: 1.25rem;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
    @include background_color("background_color1");
    @include font_color('font_color1');
    border-radius: .625rem;
    box-sizing: border-box;
    width: 30%;
  }
}
</style>

