<template>
  <div class="hist-box" v-infinite-scroll='loadMore' infinite-scroll-distance="10"  infinite-scroll-disabled='loding'>
    <mt-cell v-for="(item,index) in list" :key="index" is-link @click.native="$router.push({name:'History_Details',query:{items:item}})">
  <span slot="title" class="title"><h2>{{item.paperName}}</h2><h2>考试时间：{{item.createTime}}</h2></span>
    <span slot="icon" class="icon-sorce"> <svg-icon icon-class="relog" slot="icon"></svg-icon></span>
  <!-- <span>分数：{{item.score}}</span> -->
</mt-cell>
<loading-more :loading='loding' :loading-more='allLoading'/>
  </div>
</template>
<script>
import {historyList} from '@/api'
export default {
  name: 'SortHistory',
  data () {
    return {
      onDate: false,
      allLoading: false,
      loding: false,
      historyObj: {
        current: 0,
        size: 20,
        type: this.$route.query.type
      },
      list: []
    }
  },
  created () {
    this.loadMore()
    // this.getHistory()
  },
  methods: {
    getHistory () {
      this.loding = true
      this.historyObj.current++
      historyList(this.historyObj).then(res => {
        if (res.code === 200) {
          this.list.push(...res.data.records)
          this.allLoading = res.data.total === this.list.length
        }
        this.loding = this.allLoading
      }).catch(() => {
        this.onDate = true
      })
    },
    loadMore () {
      this.getHistory()
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .mint-cell-title{
  padding: 10px 0px;
}
.title{
  display: inline-block;
vertical-align: baseline;
  h2{
    margin: 10px 0px;
  }
}
.icon-sorce{
  width: 40px;
  height: 40px;
  display: inline-block;
margin: 0px 15px;
}
</style>
