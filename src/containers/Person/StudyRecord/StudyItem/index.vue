<template>
  <div >
    <div class="tab-style"  @click="$router.push({name:'CoursDetails',params:{params: logItem}})">
<mt-cell is-link><span slot="title" class="studying " :class="[over?'over':'']"> {{over?'学习进行中':'已学完成'}} </span></mt-cell>
<mt-cell  class='study-item'>
  <span slot="title" class="mint-cell-text">{{logItem.courseName}}</span>
  <div slot="icon" class="study-item-box">
    <span>已学{{percent}}%</span>
      <img :src="logItem.courseLogo">
  </div>
</mt-cell>
    </div>
  </div>
</template>
<script>
export default {
  name: 'item',
  props: {
    logItem: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  computed: {
    percent () {
      if (this.logItem.periodNu > 0) {
        if (this.logItem.playOverNu !== this.logItem.periodNu) {
          return ((this.logItem.playOverNu / this.logItem.periodNu) * 100).toFixed()
        } else {
          return 100
        }
      } else {
        return 0
      }
    },
    over () {
      return this.logItem.playOverNu < this.logItem.periodNu
    }
  },
  methods: {

  }

}
</script>

<style lang="scss" scoped>
.studying{
  // box-shadow: 0px 0px 4px 3px #e1dfdf;
  padding: 6px;
  border-radius: 8px;
  font-size: 13px;
  color: #fff;
  background: gray;
}
.study-item{
  .mint-cell-title{
    .mint-cell-text{
    display: inline-block;
    margin: 18px 0px 20px;
    vertical-align: top;
    }
  }
  .study-item-box{
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 5px;
    overflow: hidden;
    display: inline-block;
    span{
        position: absolute;
        right: 0px;
        bottom: 0px;
        background: rgba(0, 0, 0, .7);
        color: #fff;
        padding: 5px;
        font-size: 12px;
        border-radius: 5px;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.tab-style{
    margin: 15px 8px;
    box-shadow: 0px 0px 4px 3px #f1f1f1;
}
.over{
  background: #8ac72d;
}
</style>
