<template>
  <div class="layout-wrapper">
    <!-- 头部模块 -->
    <mt-header fixed :title=" $route.meta.title || '盛金源培训'" v-show="hasHeader" ref="header">
      <a @click="$router.go(-1)" slot="left" v-show="$route.meta.hasBack">
    <mt-button icon="back"></mt-button>
  </a>
  <a slot="right" v-show="$route.meta.hasRight"  @click="$router.push({name:$route.meta.path})">{{$route.meta.rightTitle}}</a>
    </mt-header>
    <!-- <sjy-header v-if="hasHeader" ></sjy-header> -->
    <!-- 中间入口模块 -->
    <keep-alive include="KeepExam">
           <!-- <transition name="slide-left"> -->
    <router-view :key="$route.path" :class="[{'view-top':hasHeader,'view-bottom':hasFooter}]" />
            <!-- </transition> -->
    </keep-alive>
    <!-- 底部模块 -->
    <sjy-footer v-show="hasFooter" ></sjy-footer>
    <vueToTop :type="2" color="#26a2ff" top="20" bottom="100" size="45"></vueToTop>

  </div>
</template>
<script>
import SjyFooter from '@/components/SjyFooter'
import SjyHeader from '@/components/SjyHeader'
import {mapGetters} from 'vuex'
export default {
  name: 'Layout',
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    hasHeader () {
      if (typeof (this.$route.meta.hasHeader) === 'undefined') {
        return true
      } else {
        return this.$route.meta.hasHeader
      }
    },
    hasFooter () {
      if (typeof (this.$route.meta.hasFooter) === 'undefined') {
        return true
      } else {
        return this.$route.meta.hasFooter
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    'userInfo.userNo': function (newV, old) {
      newV && this.$store.dispatch('finishPlan')
    }
  },
  mounted () {
    this.userInfo.userNo && this.$store.dispatch('finishPlan')
  },
  components: {
    SjyFooter,
    SjyHeader
  }
}
</script>
<style lang="scss" scoped>
.layout-wrapper{
  // overflow: auto;
  .view-top{
   padding-top:36px;
  }
  .view-bottom{
    padding-bottom: 55px;
  }
  .mint-header.is-fixed{
    z-index: 1000;
  }
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
