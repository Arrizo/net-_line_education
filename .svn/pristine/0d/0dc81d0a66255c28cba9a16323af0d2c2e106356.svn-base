<template>
    <div class="details-wrrap">
     <mt-swipe class="swipe-box">
  <mt-swipe-item><div class="siwpe-box-img" :style="{backgroundImage:'url('+detailsArry.courseLogo+')'}"><h2>{{detailsArry.courseName}}</h2></div> </mt-swipe-item>
</mt-swipe>
   <mt-navbar v-model="selected">
  <mt-tab-item id="tab1">介绍</mt-tab-item>
  <mt-tab-item id="tab2">章节</mt-tab-item>
</mt-navbar>
<mt-tab-container v-model="selected" :swipeable='true'>
  <mt-tab-container-item id='tab1' >
<div class="introduce">
  <p v-html="detailsArry.introduce"></p>
</div>
  <div class="introduce-teacher">
    <p>讲师</p>
    <div  class="intr-detai">
      <div class="tech-header">
          <img :src="detailsArry.headImgUrl" alt="">
      </div>
      <div class="intr-detai-tec">
          <h2>{{ detailsArry.lecturer.lecturerName}}</h2>
          <span>最佳讲师</span>
     </div>
     <div class="tech-moblie">
       <span>{{detailsArry.lecturer.lecturerMobile}}</span>
     </div>
    </div>
    <div class="teche-intro">
      <p>讲师简介</p>
      <p v-html="detailsArry.lecturer.introduce"></p>
    </div>
  </div>
  </mt-tab-container-item>
  <mt-tab-container-item id='tab2' >
    <div v-for="(item,index) in detailsArry.periodList" :key="index">
        <h2 class="detail-title">{{ `第${index+1}章${item.chapterName}`}}</h2>
        <mt-cell v-for="(value,indexs) in item.periodList" :key="indexs"
        :title=" `${index+1}-${indexs+1+value.periodName}`"
        :class="{isplay:value.playOver}"
        :value="value.playOver?'已观看':'未观看'"
        @click.native="$router.replace({path:'/details',query:{courseId:detailsArry.courseId}})">
            <span slot="icon" class="play-icon"><svg-icon icon-class="player"></svg-icon></span>
        </mt-cell>
</div>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
</template>
<script>
export default {
  name: 'Details',
  data () {
    return {
      selected: 'tab1',
      detailsArry: this.$route.params.params
    }
  },
  mounted () {
    console.log('232', this.detailsArry)
  }
}
</script>
<style lang="scss" scoped>
.details-wrrap{
  padding-top: 40px;
  height: 100%;
  .swipe-box{
    height: 130px;
  overflow: hidden;
  .siwpe-box-img{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    h2{
      color: #fff;
    }
  }
  }
}
/deep/.mint-navbar{
  .mint-tab-item {
      .mint-tab-item-label{
        font-size:18px;
      }
      &.is-selected{
         border-bottom: 3px solid #26a2ff;/*no*/
      }
  }
}
.introduce{
  padding: 20px ;
  border-bottom: 10px solid #f1f1f1;
  p{
    color: gray;
    min-height: 100px;
    border-bottom: 2px solid gainsboro;
  }
}
  .introduce-teacher{
padding: 16px;
p{
font-weight: bold;
}
.intr-detai{
  display: flex;
  margin: 14px auto;
  .tech-header{
       flex-grow: 1;
       line-height: 30px;
       display: flex;
       align-items: center;
  img{
    width: 30px;
    height: 30px;
    vertical-align: middle;
    border-radius: 50%;
    line-height: 50px;

  }
  }
  .intr-detai-tec{
    h2{
      font-weight: bold;
      font-size: 17px;
    }
  flex-grow: 2;
  }
  .tech-moblie{
      flex-grow: 1;
  }
}
.teche-intro{
  p{  margin: 10px auto;}
}
  }
.detail-title{
  font-weight: bold;
    font-size: 17px;
    margin: 12px 12px;
}
/deep/.isplay{
  color: #84c00b;
  .mint-cell-value{
    color: #84c00b;
  }
}
.play-icon{
  height: 20px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px
}

</style>
