<template>
  <div class="item-warp">
    <no-date v-if="testArray.length===0"/>
      <div v-else>
<div class="subject-warp">
    <div class="subject" v-for="(item,index) in testArray" :key="index+'lifs'" v-show="index===curIndex">
      <div class="subject-title">
      {{`${index+1}、${ item.content}`}}<span class="test-type">
        （{{answerType(item.type)}}）
        </span>
      </div>
      <div class="subject-resolve">
    <div class="subject-mask"></div>
<mt-checklist
  v-model="item.answer"
  :options="item.opts">
</mt-checklist>
      </div>
    <div class="subject-btn">
      <div class="confirm clearfix" >
       <h1>参考答案：<span>{{item.right}}</span></h1>
        </div>
            </div>
        </div>
      </div>
    <mt-tabbar fixed class="tools">
  <mt-tab-item @click.native.stop="preven()">
    上一题
        <svg-icon icon-class="number" slot="icon"></svg-icon>
  </mt-tab-item>
    <mt-tab-item @click.native.stop="next()">
    下一题
        <svg-icon icon-class="number" slot="icon"></svg-icon>
  </mt-tab-item>
</mt-tabbar>
  </div>
  </div>

</template>
<script>
import {examType, testFormat} from '@/utils/common'
import {getWrongRecord} from '@/api'
export default {
  name: 'sortItem',
  data () {
    return {
      curIndex: 0,
      testArray: []
    }
  },
  created () {
    this.getTest()
  },
  methods: {
    preven () {
      if (this.curIndex === 0) {
        this.$popBox.Toast({message: '没有上一题!', duration: 1000})
        return false
      }
      this.curIndex--
    },
    getTest () {
      this.$nextTick(() => {
        getWrongRecord().then(res => {
          if (res.code === 200) {
            testFormat(res.data)
            // res.data.forEach((a, b) => (a.right = formatAnswer(a.answer)))
            this.testArray = res.data
            console.log('=-=', this.testArray)
          }
        })
      })
    },
    next () {
      if (this.curIndex + 1 === this.testArray.length) {
        this.$popBox.Toast({message: '最后一道题！', duration: 1000})
        return false
      }
      this.curIndex++
    },
    answerType (type) {
      return examType(type)
    }
  }
}
</script>
<style lang="scss" scoped>
.item-warp{
  height: 100%;
  padding-bottom: 55px;
  .tools{
    .is-selected{
      background: #fff;
      color: #000;
    }
  }
  .time-color{
    color: #f15454;
    font-weight: bold;
  }
}
.subject-warp{
  margin: 0px 10px 20px;
  position: relative;
  .subject-title{
    color: #000;
    font-size: 15px;
    padding:8px;
    line-height: 30px;
    word-break: break-all;
  }
}
.subject-btn{
  padding: 0px 15px;
}
/deep/.subject-resolve{
  position: relative;
  .subject-mask{
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
  }
  .mint-checklist{
    .mint-cell{
          background-image: none;
      .mint-cell-wrapper{
  background-image: none;
      }
    }
  }
}
.test-type{
  color: #26a2ff;
}
.confirm{
  padding: 10px 0px 55px;
    span{
font-weight: bold;
display: inline-block;
    }
      h1{
        margin: 14px 0px;
        color: #26a2ff;
        font-size: 15px;
      }
}
</style>
