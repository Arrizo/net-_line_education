<template>
  <div class="more">
    <mt-cell v-for="(item,index) in courseHotList" :key="index" @click.native="$router.push({path:'/details',query:{courseId:item.id}})" class="more-cell">
      <div slot="title" class="more-title"><h2>{{item.courseName}}</h2><h2>VIP:0</h2></div>
      <img slot="icon" :src="item.courseLogo" width="80" height="80" class="more-img">
      <!-- <i class="more-icon">优惠</i> -->
    </mt-cell>
  </div>
</template>
<script>
import {homeCourseList} from '@/api'
export default {
  name: 'MoreCoures',
  data () {
    return {
      courseHotList: []
    }
  },
  mounted () {
    this.getHotCourseList()
    // console.log(this.$parent.$refs.header.title = '1212')
  },
  methods: {
    getHotCourseList () {
      homeCourseList({zoneLocation: 0}).then(res => {
        if (res.code === 200) {
          res.data.list.forEach(item => {
            (this.$route.query.pId === item.id) && (this.courseHotList = item.zoneCourseList)
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>

/deep/.more{
  margin: 10px;
  .mint-cell-title{
    display:flex;
    align-items: flex-start;
  }
  .more-title{
  display: inline-block;
  margin-left: 10px;
width: calc(100% - 100px);
  h2{
    color: gray;
    margin-bottom: 10px;
    word-break: break-all;
    padding-top: 8px;
    &:last-child{
      color: #b7a823;
      margin-bottom: 0px;
    }

  }
}
  .mint-cell{
    padding: 10px 0px;
    width: 100%;
    display: inline-block;
    border-bottom: 1px solid #d9d7d7;
    .mint-cell-wrapper{
      background-image:none !important;
    }
  }
.more-img{
  border-radius: 10px;
}
}
// .more-icon{
//   border-top-left-radius: 20px;
//   border-bottom-left-radius: 20px;
//   display: inline-block;
//   width: 50px;
//   height: 40px;
//   line-height: 40px;
//   text-align: center;
//   font-size: 12px;
//   font-style: normal;
//   margin-right: -10px;
//   background: orange;
// }
</style>
