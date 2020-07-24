<template>
<div>
  <loading :loadingShow="courseLt.length===0" :loadingText="'加载中...'" class="loadings"/>
  <div v-for="(item,index) in courseLt" :key="index">
<div class="home-more" @click="$router.push({name:'MoreCourse',query:{pId:item.id}})">
    <mt-cell is-link>
      <span slot="title" class="zoneDesc">{{item.zoneDesc}}</span>
      <span>更多</span>
    </mt-cell>
</div>
  <div class="home-course-item">
  <div class="course-cell" v-for="(items,indexs) in spliceCours(item.zoneCourseList)" :key="indexs" @click="$router.push({path:'/details',query:{courseId:items.id}})">
    <img :src="items.courseLogo" alt="">
    <h3>{{items.courseName}}</h3>
    <h2><strong>¥{{items.courseOriginal}}</strong> <span>¥SVIP:{{items.courseDiscount}}</span></h2>
  </div>
</div>
</div>
</div>
</template>
<script>
export default {
  name: 'Course',
  props: {
    courseLt: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    spliceCours (list) {
      return [...list].splice(0, 4)
    }
  }
}
</script>
<style lang="scss" scoped>
.home-more{
  border-bottom: 7px solid #f3f0f0;
  .zoneDesc{
    font-weight: bold;
  }
}
 .home-course-item{
  padding: 5px;
  display: flex;
 flex-wrap: wrap;
.course-cell{
  width: 50%;
  padding: 2px 6px 5px;
  text-align: left;
  box-sizing: border-box;

  img{
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  h3,h2{
      padding-left: 5px;
      margin: 5px auto;
      color: #636363;
      font-size: 14px;
      font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
  }
  h2{
strong{color: red;font-size: 17px;margin-right: 5px;}
span{font-size: 16px; color: #b7a823;}
  }
}
}
.loadings{
  margin-top: 80px !important;
}
</style>
