<template>
<!-- v-infinite-scroll='' infinite-scroll-distance="10" infinite-scroll-disabled='loading' -->
<div class="study">
   <mt-navbar v-model="selected">
  <mt-tab-item id="tab1">学习任务</mt-tab-item>
  <mt-tab-item id="tab2">练习任务</mt-tab-item>
</mt-navbar>
<mt-tab-container v-model="selected" :swipeable='true'>
  <mt-tab-container-item id="tab1" >
<mt-cell v-for="(item,indexs) in PlantList" :key="indexs"  :title="item.name">
<mt-button size="small" type='primary' :style="{background:item.study?'#4caf50':'#ffc107'}" :disabled='item.study' @click="$router.replace({path:'/details',query:{courseId:item.courseId}})">
  {{item.study?'已完成':'去学习'}}</mt-button>
</mt-cell>
  </mt-tab-container-item>
    <mt-tab-container-item  id="tab2" >
    <div class="plan-container">
<h1> <span><svg-icon icon-class='plant'/></span> 练习详情</h1>
<div><span class='socope'>随机练习题数</span></div>
<div><span>应完成题数：{{plantTask.testNum}};</span><span>已完成题数：{{plantTask.detail.testedNum}};</span></div>
<div><span class='socope'>{{plantTask.practiceScore||85}}分以上模拟测评次数</span></div>
<div><span>应完成次数：{{plantTask.practiceNum}};</span><span>已完成次数：{{plantTask.detail.practiceNum}};</span></div>

  </div>
  </mt-tab-container-item>
</mt-tab-container>

</div>
</template>
<script>
import {courseDetails} from '@/api'
export default {
  name: 'StudyPlan',
  data () {
    return {
      selected: 'tab1',
      plantTask: {},
      loading: false,
      allLoading: false,
      PlantList: []
    }
  },
  created () {
    this.getViedoName()
  },
  methods: {
    getViedoName (id) {
      this.plantTask = this.$route.query.items
      this.$nextTick(() => {
        if (this.plantTask.detail.unlearnedCourse) {
          this.plantTask.detail.unlearnedCourse.forEach(item => {
            courseDetails({courseId: (item)}).then(res => {
              res.code === 200 && this.PlantList.push({name: res.data.courseName, study: false, courseId: res.data.id})
            })
          })
        }
        if (this.plantTask.detail.learnedCourse) {
          this.plantTask.detail.learnedCourse.forEach(item => {
            courseDetails({courseId: (item)}).then(res => {
              res.code === 200 && this.PlantList.push({name: res.data.courseName, study: true, courseId: res.id})
            })
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.plan-container{
  padding:10px;
  overflow: hidden;
  background: #fff;
  h1{
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    font-size: 15px;
    border-bottom: 1px solid gray;
    span{
      width: 40px;
      height: 40px;;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
  div{
    display: flex;
    color: gray;
    margin: 10px ;
    font-size: 15px;
    justify-content: space-between;
    &:nth-child(even){
      justify-content: center;
      background: #f2f2f2;
    border-radius: 12px;
    }
  }

}
.socope{
  color: #26a2ff;
}
/deep/.study{
.mint-navbar{
  .mint-tab-item {
      .mint-tab-item-label{
        font-size:18px;
      }
      &.is-selected{
         border-bottom: 5px solid #26a2ff;/*no*/
      }
  }
}
}
.is-look{
  padding: 8px;
  border-radius: 4px;
  color: #fff;
}
</style>
