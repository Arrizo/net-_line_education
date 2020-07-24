<template>
    <transition name="fade">
  <div class="mask" v-show="ShowDetails">
      <div class="mask-content">
        <div class="mask-title"><span> <svg-icon icon-class="warn" slot="icon"></svg-icon></span><span>{{title}}</span></div>
        <i class="mask-close" @click="closeInfo" v-show="hasClose">×</i>
        <div class="mask-detail">
         <slot name="content">
        <div class="page">假币总数：12</div>
        <div>伪造币：x 张</div>
        <h2>1、</h2>
        <h2>1、</h2>
        <h2>1、</h2>
        <div>变造币：y 张</div>
        <h2>1、</h2>
        <h2>1、</h2>
        <h2>1、</h2>
        <div class="page">纸币张数：21</div>
        </slot>
        <slot name="footer">
       <h1> <mt-button type="primary" class="primary" size='large' @click="closeInfo">确认交卷</mt-button></h1>
        </slot>
        </div>
      </div>
  </div>
  </transition>
</template>
<script>
export default {
  name: 'Details',
  data () {
    return {
    }
  },
  props: {
    hasClose: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '信息确认'
    },
    ShowDetails: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeInfo () {
      this.$emit('update:ShowDetails', !this.ShowDetails)
    }
  }
}
</script>
<style lang="scss" scoped>
.mask{
  position: fixed;
top: 0px;
left: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .3);
  z-index:99999;
  display: flex;
  justify-content: center;
  align-items: center;

  .mask-content{
    .mask-title{
      height: 40px;
background: #26a2ff;
  border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 18px;
    span{
      &:first-child{
        width: 25px
      }
      &:last-child{
margin-left: 10px;
      }
    }
    }
width: 300px;
// min-height: 300px;
background: #fff;
margin: auto;
  border-radius: 10px;
  position: relative;
  .mask-close{
    position:absolute;
    border-radius: 50%;
    width: 40px;
    height: 40px;
line-height: 40px;
border: 2px solid #fff;
color: #fff;
font-size: 36px;
font-style: normal;
text-align: center;
left: 50%;
margin-left: -20px;
bottom: -60px;
  }
  .mask-detail{
    padding: 5px 14px 0px;
    div ,h2{
      border-bottom: 1px solid gainsboro;
      font-size: 16px;
      padding: 8px 0px;
    }
    h1{
      padding: 12px 40px;
    }
  }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.page {
  font-weight: bold;
}
</style>
