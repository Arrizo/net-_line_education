<template>
  <div class="details-wrarrp">
    <div id="previewArea" >
    </div>
    <div class="details-content">
          <h3>{{courseObj.courseName}}</h3>
    <h2><strong>¥{{courseObj.courseOriginal}}</strong> <span>¥SVIP:{{courseObj.courseDiscount}}</span></h2>
    <div class="details-auther">
      <div><span>讲师</span>{{courseObj.lecturer.lecturerName}}</div>
      <!-- <div><span>促销</span>222</div> -->
    </div>
    </div>
    <div>
      <mt-navbar v-model="selected">
  <mt-tab-item id="course1">录播课程</mt-tab-item>
  <mt-tab-item id="course2">课程介绍</mt-tab-item>
</mt-navbar>
<mt-tab-container v-model="selected" :swipeable='true'>
  <mt-tab-container-item id="course1">
    <h3 class="course-title">录制课程大纲</h3>
    <div v-for="(items,indexs) in courseObj.chapterList"  :key="items+indexs" class="item-chapter-name">
      <h3>{{items.chapterName}}</h3>
    <mt-cell v-for="(item,index) in items.periodList" :title="item.videoName " :key="index" @click.native='chaptterSign(item)' is-link>
          <span slot="icon" class="play-icon"><svg-icon icon-class="player"></svg-icon></span>
    </mt-cell>
 </div>
 </mt-tab-container-item>
  <mt-tab-container-item id="course2">
    <div v-html="courseObj.introduce" class="course-html"></div>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {courseDetails, commonSign, isPlayOver} from '@/api'
export default {
  name: 'Details',
  data () {
    return {
      isOver: {playOver: 0},
      selected: 'course1',
      courseVideoBO: {
        courseId: this.$route.query.courseId
      },
      // 详情返回数据
      courseObj: {
        lecturer: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    // eslint-disable-next-line no-undef

    // window.removeEventListener('beforeunload', this.updateHandler)
  },
  mounted () {
    this.getCourseDetails()
    window.addEventListener('pagehide', () => {
    })
  },
  beforeDestroy () {
    this.changeVideo(this.playOver)
    // window.removeEventListener('beforeunload', this.updateHandler)
    // alert(333)
  },
  methods: {
    getCourseDetails () {
      courseDetails(this.courseVideoBO).then(res => {
        if (res.data) {
          this.courseObj = res.data
          this.chaptterSign(res.data.chapterList[0].periodList[0])
        }
      })
    },
    event () {
      this.players.s2j_onPlayOver = () => {
        this.isOver.playOver = 1
      }
    },
    async chaptterSign (data) {
      this.isOver.periodId = data.id
      this.playOver = data.playOver
      await this.changeVideo(this.playOver)
      await commonSign({
        periodId: data.id,
        videoVid: data.videoVid}
      ).then(res => {
        if (res.code === 200) {
          this.playerVideo(Object.assign({'vid': data.videoVid}, res.data))
        }
      }).catch((error) => {
        console.log(error, 11)
      })
    },

    playerVideo (data) {
      if (this.players) {
        this.players.changeVid({
          vid: data.vid,
          playsafe: data.token,
          ts: data.ts,
          sign: data.sign
          // autoplay: true
        })
      } else {
      // eslint-disable-next-line no-undef
        this.players = polyvObject('#previewArea').videoPlayer({
          height: '100%',
          width: '100%',
          vid: data.vid,
          playsafe: data.token,
          ts: data.ts,
          sign: data.sign,
          loading_bg_img: this.courseObj.courseLogo
        })
      }
      this.event()
    },
    changeVideo (over) {
      if (!over && this.players) {
        this.isOver.minutes = Math.floor(this.players.j2s_getCurrentTime() / 60)
        isPlayOver(this.isOver).then(() => {
          this.isOver.playOver = 0
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.details-wrarrp{
  height: 100%;
  background: #fff;
  #previewArea{
    width: 100%;
    height: 180px;
    background: #000;
      img{
         margin: 10% 36%;
         height: 100px;
      }
  }
  .details-content{
  h3,h2{
    font-size: 18px;
      padding-left: 10px;
      margin: 10px auto;
      color: #636363;
  }
  h2{
strong{color: red;font-size: 20px; margin-right: 5px;}
span{font-size: 17px; color: #b7a823;}
  }
  .details-auther{
    div{
      font-size: 17px;
      height: 40px;
      line-height: 40px;
      border-top: 8px solid #ececec;
      border-bottom: 8px solid #ececec;
         &:first-child{
      // border-bottom: 0px;
    }
    span{
      padding: 0px 24px ;
    }
    }

  }
  }
}
/deep/.mint-navbar{
  .mint-tab-item {
    padding: 12px 0px;
      .mint-tab-item-label{
        font-size:16px;
      }
      &.is-selected{
         border-bottom: 3px solid #26a2ff;/*no*/
      }
  }
}
.course-title{
    position: relative;
    margin: 17px 25px;
    font-weight: bold;
    color: #000;
    font-size: 16px;
    background: #fff;
  &::before{
 position: absolute;
    content: '';
    width: 6px;
    height: 20px;
    left: -13px;
    background: #000;
  }
}
.item-chapter-name{
  padding-left: 10px;
  a{
    color: gray;
  }
h3{
    font-size: 17px;
    margin: 12px 0px;
}
.play-icon{
  height: 20px;
  width: 20px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px
}
}
.player-warp{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.course-html{
  padding: 10px 0px;
}
</style>
