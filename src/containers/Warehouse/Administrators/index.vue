<template>
  <div class="ad-contanier">
    <a class="show-delete" @click="shoDelete=!shoDelete"> {{shoDelete?'取消':'删除'}}  </a>
      <!-- <loading :loading-text="'学员入场中...'" v-if="userList.length===0"/> -->
      <div class="grid-box-list" >

      <section v-for="(item,index) in userList" :key="index" :class="{'user-success':item.isReady, 'warn':item.isOffline}">
          <label>{{ userStatus[item.status]}}</label>
        <div class="gir-box-warp">
          <!-- {{item.status}} -->
        <!-- <i class="user-status" :class="{'user-success':item.isReady,'warn':item.isOffline}">
          <svg-icon icon-class="right" v-if="item.isReady"></svg-icon>
              <svg-icon icon-class="net" v-if="item.isOffline"></svg-icon>
           </i> -->

         <img :src="item.images||userphoto" alt="">
        <!-- <svg-icon icon-class="person"></svg-icon> -->
      <transition name="fade">
        <i class="grid-delete" @click="detele(item,index)" v-show="shoDelete">x</i>
      </transition>
    </div>
      <h1 class="ad-name">{{item.name}}</h1>
      </section>
    <div class="ad-footer">
     <div class="start" @click="start">{{startText}}</div>
    </div>
  </div>
  </div>
</template>
<script>
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import {TRA_GET_MANAGER} from '@/config/env'
import userphoto from '@/assets/images/photo.png'
import {intoManageRoom} from '@/api'
import {mapGetters} from 'vuex'
export default {
  name: 'administrators',
  data () {
    return {
      userphoto,
      startText: '开始考试',
      isStart: false,
      shoDelete: false,
      userList: [],
      stompClient: null,
      roomCode: '',
      userStatus: ['', '准备中', '考试中', '已断线', '已完成']
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.roomCode = this.$route.query.roomCode || 9999
    this.initRoom()
    this.initWebsocket()
  },
  beforeDestroy () {
    (this.disc = true) && this.stompClient.disconnect()
  },
  methods: {
    initWebsocket () {
      let sock = new SockJs(TRA_GET_MANAGER + '?token=' + this.userInfo.token)
      this.stompClient = Stomp.over(sock)
      this.stompClient.heartbeat.outgoing = 5000
      this.stompClient.heartbeat.incoming = 5000
      this.stompClient.connect({token: this.userInfo.token, roomId: this.roomCode}, res => {
        console.log('初始订阅', res)
        // 全体订阅
        this.stompClient.subscribe(`/queue/admin.practice.exam.${this.roomCode}`, res => {
          console.log('管理端。。。', res)
          this.handlderUserInfo(JSON.parse(res.body))
        })
      }, error => {
        (!this.disc) && setTimeout(() => {
          this.initWebsocket()
        }, 4000)
        console.log('-----', error)
      })
    },
    // 提出指定用户
    detele (item, index) {
      this.$popBox.MessageBox.confirm(`确定踢出${item.name}考员？`).then(action => {
        this.stompClient.send(`/manager/practice/kick/${this.roomCode}/${item.userNo}`, {}, {})
        this.userList.splice(index, 1)
        console.log(action)
      })
    },
    initRoom () {
      intoManageRoom({roomId: this.roomCode}).then(res => {
        if (res.code === 200) {
          this.userList = res.data.users
        }
      })
    },
    handlderUserInfo (userObj) {
      console.log('=-=-=', userObj)
      for (let key in userObj) {
        switch (key) {
          // 覆盖用户
          case 'OVERRIDE_USER':
            this.userList = userObj[key]
            break
            // 更新用户
          case 'UPDATE_USER':
            this.userList.forEach((item, index) => {
              if (item.userNo === userObj[key].userNo) {
                this.$set(this.userList, index, userObj[key])
              }
            })
            break
            // 添加用户
          case 'PUT_USER':
            this.userList.push(userObj[key].userInfo)
            break
            // 删除用户
          case 'DEL_USER':
            this.userList.forEach((item, index) => {
              if (item.userNo === userObj[key].userNo) {
                this.userList.splice(index, 1)
              }
            })
            break
          case 'PROMPT':
            this.$popBox.Toast({message: '提交成功，即将跳转首页...', duration: 4000})
            setTimeout(() => { this.$router.replace({path: '/home'}) }, 4000)
            break
          case 'ROOM':
            break
          default:
            break
        }
      }
    },
    start () {
      if (this.isStart) {
        this.$popBox.MessageBox.confirm('确定结束考试?').then(action => {
          this.stompClient.send(`/exam/manager/practice/${this.roomCode}/audit`, {}, {})
        })
      } else {
        this.isStart = true
        this.startText = '结束考试'
        this.stompClient.send(`/manager/practice/start/${this.roomCode}`, {}, {})
      }
    }
  }
}
</script>
<style lang="scss" scoped>
$right:#80c269;
$warn:#f12d13;
.ad-contanier {
  padding-top: 60px !important;
  // height: 100%;
    .grid-box-list{
      display:flex;
    flex-wrap: wrap;
    justify-content:space-evenly;
    padding-bottom: 100px;
    section{
      position: relative;
    width: 22%;
    height: 80px;
    border-radius: 8px;
    border: 2px solid gainsboro;
    box-sizing: border-box;
    margin-bottom: 40px;
    label{
      position: absolute;
      width: 100%;
      text-align: center;
      top:-20px;
    }
    .gir-box-warp{
         position: relative;
         height: 100%;
         img{
           width: 100%;
           height: 100%;
         }
         .user-status{
          display:inline-block;
          width: 16px;
          height: 16px;
        position: absolute;
        left: 0px;
        top: 0px;
        border-right: 2px solid  gainsboro;
          border-bottom: 2px solid  gainsboro;
          text-align: center;
          vertical-align: middle;
         }
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
      margin-top: 5px;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
.show-delete{
  color: #fff;
  font-size: 15px;
  position: fixed;
  right: 10px;
  top:10px;
  z-index: 9999;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.user-success{
border-color: $right !important;
}
.warn{
border-color: $warn !important;
  // filter: grayscale(100%);
}
.status-0{

}
</style>
