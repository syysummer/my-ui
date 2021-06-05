<template>
  <transition name="dialog-fade" @after-enter="afterEnter" @after-leave="afterLeave">
    <div class="cx-dialog__wrapper" v-show="visible" @click.self="handleClose">
      <div class="cx-dialog" :style="{width: width, marginTop: top}">
        <div class="cx-dialog__header">
          <slot name="title">
            <span class="cx-dialog__title">{{title}}</span>
          </slot>
          <button class="cx-dialog__headerbtn" @click="handleClose">
            <i class="el-icon-close"></i>
          </button>
        </div>
        <div class="cx-dialog__body">
          <!-- 默认插槽 -->
          <slot name="content"></slot>
        </div>
        <div class="cx-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'CxDialog',
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    top: {
      type: String,
      default: '15vh'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      istemplete: true
    }
  },
  methods: {
    handleClose () {
      this.$emit('update:visible', false)
      if(!this.istemplete){
        this.visible = false
      }
    },
    afterEnter () {
      this.$emit('opened')
    },
    afterLeave () {
      this.$emit('closed')
    },
    show (option) {
      this.istemplete = false
      this.visible = true
      this.$slots.content = option.msg
    },
    close () {
      this.visible = false
    }
  }
}
</script>

<style lang="scss">
.cx-dialog__wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  margin: 0;
  z-index: 2001;
  background-color: rgba(0,0,0, .5);

  .cx-dialog {
    position: relative;
    margin: 15vh auto 50px;
    background: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-sizing: border-box;
    width: 30%;

    &__header {
      padding: 20px 20px 10px;
      .cx-dialog__title {
        line-height: 24px;
        font-size: 18px;
        color: #303133;
      }
      .cx-dialog__headerbtn {
        position: absolute;
        top: 20px;
        right: 20px;
        padding: 0;
        background: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 16px;
        .el-icon-close {
          color: #909399;
        }
      }
    }

    &__body {
      padding: 30px 20px;
      color: #606266;
      font-size: 14px;
      word-break: break-all;
    }
    &__footer {
      padding: 10px 20px 20px;
      text-align: right;
      box-sizing: border-box;
      .cx-button:first-child {
        margin-right: 20px;
      }
    }
  }
}

.dialog-fade-enter-active {
  animation: dialog-fade-in .4s;
}

.dialog-fade-leave-active {
  animation: dialog-fade-out .4s;
}

@keyframes dialog-fade-in {
  0% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -20px, 0);
    opacity: 0;
  }
}

</style>
