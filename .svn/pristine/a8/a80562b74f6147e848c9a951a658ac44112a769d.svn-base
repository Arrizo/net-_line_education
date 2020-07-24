<template>
<div class="home-page">
<div class="home-swiper">
<mt-swipe :auto="4000">
  <mt-swipe-item v-for="(item,index) in advList" :key="index">
    <img :src="item.advImg" :title="item.advTitle" @click="$router.push({path:'/details',query:{advUrl:item.advUrl}})">
  </mt-swipe-item>
</mt-swipe>
</div>
<!-- <div class="fff">

 <div class="loading-play">
  <span></span>
    <span></span>
        <span></span>
            <span></span>
</div>
</div> -->

<sjy-course-item :courseLt='courseHotList'/>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import {homeAdvertiseList, homeCourseList} from '@/api'
import SjyCourseItem from '@/components/SjyCourseItem'
export default {
  name: 'home',
  data () {
    return {
      zoneBO: {
        zoneLocation: 0
      },
      advList: [],
      advBO: {
        platShow: 0
      },
      courseHotList: []
    }
  },
  computed: {
    ...mapGetters([
      'isLogin'
    ])
  },
  components: {
    SjyCourseItem
  },
  created () {

  },
  mounted () {
    this.getBannerList()
    this.getHotCourseList()
  },
  methods: {
    // 广告列表
    getBannerList () {
      homeAdvertiseList(this.advBO).then(res => {
        if (res.data.advList.length > 0) {
          this.advList.push(...res.data.advList)
        }
      })
    },
    // 首页课程列表
    getHotCourseList () {
      homeCourseList(this.zoneBO).then(res => {
        if (res.data.list.length > 0) {
          this.courseHotList.push(...res.data.list)
        }
      })
    }

  }

}
</script>
<style lang="scss" scoped>
.home-page{
  .home-swiper{
    height: 160px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.fff{
  width: 16px;
  height: 16px;
  background: orange;
  border-radius: 50%;
  padding: 3px;
  line-height: 16px;
}
.loading-play{
  margin: 0 auto;
  text-align:center;
}
.loading-play span{
  display: inline-block;
  width:1.5px;
  height: 5px;
  margin: 0px -1px;
  border-radius: 4px;
  background: #fff;
  animation: load .5s ease infinite;
}
@keyframes load{
  0%,100%{
      height: 5px;

  }
  50%{
      height: 10px;
      margin: 0px -1px;
  }
}
.loading-play span:nth-child(2){
  animation-delay:0.2s;
}
.loading-play span:nth-child(3){
  animation-delay:0.4s;
}
.loading-play span:nth-child(4){
  animation-delay:0.6s;
}
.loading-play span:nth-child(5){
  animation-delay:0.8s;
}

</style>
