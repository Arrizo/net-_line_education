<template>
  <div class="ad-contanier">
    <div class="grid-box">
      <loading :loading-text="'学员入场中...'" v-if="userList.length===0"/>
      <div class="grid-box-list" v-else>
      <div v-for="(item,index) in userList" :key="index">
        <div class="grid-box-item">
        <svg-icon icon-class="person"></svg-icon>
        <i class="grid-delete" @click="detele(index)">x</i>
      </div>
      <h1 class="ad-name">{{item.name}}</h1>
      </div>
      </div>
    </div>
    <div class="ad-footer">
     <div class="start" @click="start(isStart)">{{startText}}</div>
    </div>
  </div>
</template>
<script>
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
let API = require('../../../../config/proxy')
export default {
  name: 'administrators',
  data () {
    return {
      startText: '开始考试',
      isStart: true,
      userList: []
    }
  },
  created () {

  },
  beforeDestroy () {
    (this.disc = true) && this.stompClien.disconnect()
  },
  methods: {
    initWebsocket () {
      let sock = new SockJs(API)
      this.stompClient = Stomp.over(sock)
      this.stompClient.connect({}, res => {
        console.log('初始订阅')
        // 全体订阅
        this.stompClient.subscribe('a/b', res => {

        })
      }, error => {
        (!this.disc) && setTimeout(() => {
          this.initWebsocket()
        }, 2000)
        console.log('-----', error)
      })
    },
    detele (index) {
      this.$popBox.MessageBox.confirm('确定踢出该考员？').then(action => {
        this.userList.splice(index, 1)
        // this.stompClient.send('/send', {}, JSON.stringify({red: 'list'}))
        console.log(action)
      })
    },
    start (flag) {
      console.log(flag)
      this.userList.push({name: 'list'})
      if (flag) {
        this.startText = '结束考试'
        this.stompClient.send('overText', {}, JSON.stringify({test: true}))
      } else {
        this.startText = '开始考试'
      }
      this.isStart = !this.isStart
    }
  }
}
</script>
<style lang="scss" scoped>
.ad-contanier {
  margin-top: 40px;
  height: 100%;
  .grid-box{
    padding: 20px 10px;
    .grid-box-list{
      display:flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding-bottom: 100px;
    .grid-box-item{
     width: 60px;
     height: 60px;
     border-radius: 8px;
     border: 1px solid gainsboro;
     position: relative;
     box-sizing: border-box;
     padding: 10px;
     .grid-delete{
       position: absolute;
       display: inline-block;
       width: 20px;
       height:20px;
       border-radius: 50%;
       font-style: normal;
       background: gainsboro;
       text-align: center;
       line-height: 20px;
       right: -7px;
       top: -7px;

     }
    }
  }
    .ad-name{
      margin-bottom: 12px;
      text-align: center;
    }
  }
  .ad-footer{
    height: 100px;
    position: fixed;
    bottom: 0px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(#00000014, #4c464694);
  }
}

   .start{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  font-size: 15px;
  color: #fff;
  background-image: linear-gradient(-30deg,lightgreen,lightblue)
        }

</style>
