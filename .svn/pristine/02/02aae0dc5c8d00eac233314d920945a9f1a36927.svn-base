<template>
  <div id="app">

                <!-- <router-view id="view"/> -->
<!-- <keep-alive> -->
          <router-view/>
<!-- </keep-alive> -->
  </div>
</template>

<script>
import { oscript } from '@/utils/common'
export default {
  name: 'App',
  data () {
    return {
      animate: ''
    }
  },
  created () {
    oscript()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
    #view {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    }
 .slide-left-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate(100%, 0);
    }

    .slide-left-leave-active,
    .slide-right-enter {
        opacity: 0;
        transform: translate(-100%, 0);
    }

    .slide-top-enter,
    .slide-bottom-leave-active {
        opacity: 0;
        transform: translate(0, 100%);
    }

    .slide-top-leave-active,
    .slide-bottom-enter {
        opacity: 0;
        transform: translate(0, -100%);
    }
</style>
