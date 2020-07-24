<template>
      <div class="gundongBox" v-if="(time<=180)&&(time>0)">
    <i><svg-icon icon-class='warning'></svg-icon></i>  <div class="gundongList">离自评考试开始时间还有{{time}}秒
      </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'marquee',
  data () {
    return {
      setInter: null,
      time: 200
    }
  },
  computed: {
    ...mapGetters([
      'plantInfo'
    ])
  },
  mounted () {
    this.timeOut()
  },
  beforeDestroy () {
    clearInterval(this.setInter)
  },
  methods: {
    timeOut () {
      let startTime = (new Date(this.plantInfo.startTime)).getTime() / 1000
      this.setInter = setInterval(() => {
        !startTime && (startTime = (new Date(this.plantInfo.startTime)).getTime() / 1000)
        let nowTime = Date.now() / 1000
        this.time = parseInt(startTime - nowTime);
        (this.time <= 0 || !startTime) && clearInterval(this.setInter)
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>

.gundongBox {
      height: 30px;
      line-height: 30px;
      margin: 0px auto;
      position: relative;
      overflow: hidden;
      letter-spacing: 1px;
      i{
          position: absolute;
          height: 30px;
          font-size: 16px;
          background: #fff;
          z-index: 5;
          width: 20px;
          padding-left: 6px;
      }
    }

    .gundongList {
      position: absolute;
      color: #000;
      animation: geiwogun 8s linear infinite;
      white-space: nowrap;
    }
    @keyframes geiwogun {
      from {
        left: 100%;
      }
      to {
        left:0%;
        transform: translate(-100%,0)
      }
    }
</style>
