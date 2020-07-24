<template>
  <div class="footer">
<mt-tabbar v-model="selected" class="home-table">
  <mt-tab-item id="home" >
    <svg-icon :icon-class="selected==='home'?'home1':'home'" slot="icon"></svg-icon>
   <router-link :to="{path:'/home'}" :class="['href-item',{ 'active': selected==='home' }]">在线学习</router-link>
  </mt-tab-item>
  <mt-tab-item id="course" >
    <svg-icon :icon-class="selected==='course'?'course':'course1'" slot="icon"></svg-icon>
    <router-link :to="{path:'/ware'}" :class="['href-item',{ 'active': selected==='course' }]">在线练习</router-link>
  </mt-tab-item>
  <mt-tab-item id="person" >
    <svg-icon :icon-class="selected==='person'?'person1':'person'" slot="icon"></svg-icon>
   <router-link :to="{path:'/person'}" :class="['href-item' ,{ 'active': selected==='person' }]" >个人中心</router-link>
  </mt-tab-item>
</mt-tabbar>

  </div>
</template>
<script>
export default {
  name: 'Footer',
  props: {
  },
  data () {
    return {
      isSelect: true,
      selected: 'home'
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.footer{
  width: 100%;
  position:fixed;
  left: 0px;
  bottom: 0px;
  height: 50px;
.mint-tabbar{
  background: #fff;
  background-image: none;
  box-shadow: 0px 1px 5px -2px
}
}
/deep/.home-table .is-selected {
  background: #ffffff;
  .router-link-active{
    color: dodgerblue;
  }
}
.href-item{
  padding: 25% 30%;
}
.active{
  color: #26a2ff;
}
</style>
