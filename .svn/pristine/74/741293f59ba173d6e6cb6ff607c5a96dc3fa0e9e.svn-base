<template>
  <div>

    <mt-cell v-for="(item,index) in planList" :key="index" is-link @click.native="$router.push({name:'Study_Plan',query:{items: item}})">
  <span slot="title" class="title">{{item.name}}</span>
    <span slot="icon" class="icon-sorce"> <svg-icon icon-class="plant" slot="icon"></svg-icon></span>
  <span class="qualified" :style="{background: item.qualified ?'#4caf50':'#ffc107'}">{{item.qualified?'已完成':'未完成'}}</span>
</mt-cell>

  </div>
</template>
<script>
import {studyPlan} from '@/api'
export default {
  name: 'PlanList',
  data () {
    return {
      planList: []
    }
  },
  created () {
    this.getPlan()
  },
  methods: {
    getPlan () {
      studyPlan().then(res => {
        if (res.code === 200) {
          this.planList = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/ .mint-cell-title{
  padding: 14px 0px;
}
.qualified{
display: inline-block;
border-radius: 5px;
padding: 6px;
color: #fff;
font-size: 13px;
background: yellow;
}
.icon-sorce{
  width: 40px;
  height: 40px;
  display: inline-block;
margin: 0px 10px;
vertical-align: middle;
}
</style>
