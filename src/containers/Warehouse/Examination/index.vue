<template>
<div class="exam-warp">
    <a class="time-out">时间：{{roomInfo.seconds}}</a>
  <div class="exam" v-if="roomInfo.status===0">
    <div >
      <loading :loading-show='loading'></loading>
    </div>
     <div class="start-btn"><div class="start" @click="start">{{loadingText}}</div></div>
    </div>
    <div class="exam-field" v-else>
      <div class="exam-item">
<mt-field label="考生姓名:" v-model="personInfo.name" readonly></mt-field>
<!-- <mt-field label="身份证号:" v-model="username"></mt-field>
<mt-field label="单   位:" v-model="username"></mt-field> -->
<mt-field label="信封编号:" v-model="answersObj.envelopeNum" readonly></mt-field>
<mt-field label="真币张数:" v-model.number="answersObj.genuineCoinTotal" placeholder="请输入真币张数"  v-if="examType"></mt-field>

<mt-field label="假币张数" placeholder="请输入假币张数" type='number' v-model.number="answersObj.falseCoinTotal" @input="getCounter($event)"></mt-field>
<mt-field label='假币冠字号码' placeholder='请输入所有假币号码，并用“-”符号隔开' v-if="examType" v-model="answersObj.falseCoinNumber" type='textarea' rows='4'>
</mt-field>
  </div>
<!-- 广东试题 -->
    <section v-if="examType">
  <div v-for="(item,index) in optionList" :key="index" class="exam-item">
      <h1 class="money-title" @click="toggles(index)" > {{index===0?'机制币（其中一张）':'变造币（其中一张）'}}<i class="close" :class="{'open':curIndex===index}"></i></h1>
      <div  class="show" :class="{'show-item':curIndex===index}">
      <mt-field label="假币冠字号码:" placeholder="请输入冠字号码"  v-model="answersObj.answers[index].crownNumber" class="show-firt"></mt-field>
   <div class="exam-features"> <div>参考选项</div><div>特征描述（至少{{index+5-2*index}}项）</div></div>
<div class="fake">
<section v-for="(option,oIndex) in item" :key="oIndex+'key'" class="clearfix">
      <span class="hidden">{{option.featureId=option.id}}</span>
  <mt-field :label="option.feature+'：'" v-model="option.answer" v-if="!option.opt"></mt-field>
        <mt-radio
        v-if="index===1&&option.type===2"
          :title="option.feature+'：'"
  v-model="option.answer"
  :options="option.opt.split('；')">
</mt-radio>
  </section>
</div>

</div>
  </div>
    </section>
    <!-- 江西试题 -->
    <section v-else>
  <div v-for="(item,index) in optionList" :key="index" class="exam-item">
      <h1 class="money-title" @click="toggles(index)" >假币特征（其中1张）<i class="close" :class="{'open':curIndex===index}"></i></h1>
      <div  class="show" :class="{'show-item':curIndex===index}">
      <mt-field label="假币冠字号码:" placeholder="请输入冠字号码" v-model="answersObj.answers[index].crownNumber" class="show-firt" ></mt-field>
      <mt-radio class="radiolist split no-title"
      @change="checkeds($event,index)"
  v-model="answersObj.answers[index].featureType"
  :options="[{label:'伪造币',value:'1'},{label:'变造币',value:'2'}]">
</mt-radio >
<div v-if="answersObj.answers[index].featureType==='1'" class="fake">
<section v-for="(option,oIndex) in item" :key="oIndex+'key'" class="clearfix">
        <span class="hidden">{{option.featureId=option.id}}</span>
          <mt-radio
          v-if="option.type===1"
          :title="option.feature+'：'"
  v-model="option.answer"
  :options="option.opt.split('；')" >
</mt-radio>
  </section>
</div>
<div v-if="answersObj.answers[index].featureType==='2'" class="fake" >
  <section v-for="(option,oIndex) in item" :key="oIndex+'key'"  class="clearfix" >
          <span class="hidden">{{  option.featureId=option.id}}</span>
          <mt-radio
          v-if="option.type===2"
          :title="option.feature+'：'"
  v-model="option.answer"
  :options="option.opt.split('；')">
</mt-radio>
  </section>
</div>
</div>
  </div>
    </section>

  <div class="comfirm-btn">
  <mt-button type="primary" class="primary" size='large' @click="submit">交 卷</mt-button>
  </div>
    </div>
    </div>
</template>
<script>
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import {promptCode} from '@/utils/examToast'
import {intoRoom, listFeature} from '@/api'
import {mapGetters} from 'vuex'
import {TRA_GET} from '@/config/env'
export default {
  name: 'Examination',
  data () {
    return {
      optionList: [],
      featureObj: { size: 20, current: 1 },
      examType: '',
      curIndex: '',
      loading: false,
      loadingText: '准备',
      stompClient: null,
      answersObj: {examLength: 0},
      roomInfo: {seconds: '00:00:00'},
      IS_OVER: '23',
      roomCode: ''
    }
  },
  computed: {
    ...mapGetters([
      'personInfo',
      'userInfo'
    ])
  },
  //
  watch: {
    curIndex (newV, oldV) {
      this.addAnswers()
      this.stompClient && this.stompClient.send(`/exam/auth/practice/${this.$route.query.examSessionId}/answer/put`, {}, JSON.stringify(this.answersObj))
    }
  },
  created () {
    this.answersObj = Object.assign(this.answersObj, this.$route.query)
    this.examType = parseInt(this.answersObj.type) === 2
    this.answersObj.type = '0601'
    this.initRoom()
    this.initWebsocket()
    this.getListFeature()
  },
  mounted () {
    this.checkNetWorkStatus()
  },
  beforeDestroy () {
    (this.overSoket = true) && this.stompClient && this.stompClient.disconnect()
    clearInterval(this.setTime)
    this.removeNetWorkStatus()
  },
  methods: {
    submit () {
      this.addAnswers()
      this.$popBox.MessageBox.confirm('确定提交考试！').then(res => {
        this.saveData()
      })
    },
    toggles (index) {
      this.curIndex = index === this.curIndex ? '' : index
    },
    initWebsocket () {
      let sock = new SockJs(TRA_GET + '?token=' + this.userInfo.token)
      this.stompClient = Stomp.over(sock)
      this.stompClient.heartbeat.outgoing = 5000
      this.stompClient.heartbeat.incoming = 5000
      // socket 连接成功!
      this.stompClient.connect({token: this.userInfo.token, roomId: this.$route.query.examSessionId}, (data) => {
      // 连接成功是返回的数据
        console.log('-=-=-=成功====！', data)
        // 查询是否有存在未提交答案
        this.stompClient.send(`/exam/auth/practice/${this.$route.query.examSessionId}/answer/get`, {}, {})
        // 房间的持续数据连接
        this.stompClient.subscribe(`/topic/auth.practice.exam.${this.$route.query.examSessionId}.${this.userInfo.userNo}`, (res) => {
          this.handlderUserInfo(JSON.parse(res.body))
          // 订阅某个topic
          console.log(res, 'queue....')
        })
        this.stompClient.subscribe(`/queue/auth.practice.exam.${this.$route.query.examSessionId}`, (res) => {
          this.handlderUserInfo(JSON.parse(res.body))
          // 订阅某个topic
          console.log(res, 'queue')
        })
      }, (error) => {
        // this.$popBox.Toast(error.headers.message)
        console.log(error, '-=-=--error');
        (!this.overSoket) && (this.setTime = setTimeout(() => {
          this.initWebsocket()
        }, 4000))

        console.log('connect falt...', error)
      })
    },
    // 初始化房间信息  this.$route.query.examSessionId
    initRoom () {
      intoRoom({ roomId: this.$route.query.examSessionId }).then(res => {
        if (res.code === 200) {
          this.roomInfo = res.data
          // 实时显示考试时间re
          this.IS_OVER.includes(this.roomInfo.status) && this.$popBox.Toast('考试已结束!') && this.$router.replace({path: '/home'})
        }
      })
    },
    // 获取答题卡题目
    getListFeature () {
      this.featureObj.examType = this.$route.query.examType
      listFeature(this.featureObj).then(res => {
        if (res.code === 200) {
          this.recordList = res.data.records
        }
      })
    },
    getCounter ($event) {
      this.optionList = [];
      (!$event) && ($event = 0);
      (parseInt($event) > 20) && ($event = 20)
      this.answersObj.falseCoinTotal = parseInt($event)
      // 判断如果未广东类型，默认两张
      this.examType && ($event = 2)
      this.answersObj.answers = []
      for (let i = 0; i < parseInt($event); i++) {
        this.optionList.push(JSON.parse(JSON.stringify(this.recordList)))
        this.answersObj.answers[i] = {}
      }
      console.log('optionList', this.answersObj, this.optionList)
    },
    start () {
      // let seft = this
      this.loading = !this.loading
      this.stompClient.subscribe(`/auth/practice/ready/${this.$route.query.examSessionId}/${Number(this.loading)}`, (res) => {
        console.log('ready----', res.body)
        this.loadingText = res.body === 'true' ? '准备中...' : '准备'
      }, {})
    },
    // this.answersObj.examSessionId
    saveData () {
      this.stompClient.send(`/exam/auth/practice/${this.$route.query.examSessionId}/submit`, {}, JSON.stringify(this.answersObj))
      this.$popBox.Toast({message: '提交成功，即将跳转首页...', duration: 5000})
      setTimeout(() => {
        this.$router.replace({path: '/home'})
      }, 5000)
    },
    // 监听网络的状态
    checkNetWorkStatus () {
      let that = this
      // 断网时做soket的重连
      window.addEventListener('offline', function () {
        that.$popBox.Toast({message: '您的网络已断开，正在重新连接...', duration: 2000})
      })
      window.addEventListener('online', function () {
        that.$popBox.Toast({message: '网络已连接', duration: 2000})
      })
    },
    // 移除监听网络状态
    removeNetWorkStatus () {
      window.removeEventListener('offline', function () {})
      window.removeEventListener('online', function () {})
    },
    addAnswers () {
      this.answersObj.answers.forEach((opt, index) => {
        opt.answer = this.optionList[index];
        (this.examType) && (opt.featureType = index + 1)
      })
    },
    // 选择伪币类型
    checkeds ($event, index) {
      console.log('=-=-=', this.answersObj)
      this.answersObj.answers[index].featureType = $event
      this.$forceUpdate()
    },
    // 处理动作
    handlderUserInfo (userObj) {
      if (userObj) {
        for (let key in userObj) {
          switch (key) {
            case 'PROMPT':
              this.$popBox.Toast({message: promptCode(userObj[key]), position: 'top'})
              break
              // 覆盖用户
            case 'OVERRIDE_USER':
              this.userList = userObj[key].users
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

            // 房间信息
            case 'ROOM':
              this.roomInfo = userObj[key]
              break
            // 退出房间
            // 答案回显
            case 'PUT_ANSWER':
              // this.answersObj = userObj[key]
              // this.optionList = this.answersObj.answers
              break
            case 'EXIT':
              this.$popBox.Toast('考试结束，即将退出房间。。。。')
              this.addAnswers()
              this.stompClient.send(`/exam/auth/practice/${this.$route.query.examSessionId}/submit`, {}, JSON.stringify(this.answersObj))
              setTimeout(() => {
                this.$router.replace({path: '/home'})
              }, 4000)

              break
            default:
              break
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.exam-warp{
  height: 100%;
  .exam-field{
    .exam-item{
      border-bottom: 6px solid #ebebeb;
    }
  }
}
.exam{
  margin-top: 100px;
        display:flex;
        flex-direction: column;
        height: 100%;
        justify-content: center;
        align-items: center;
        .start-btn{
            margin-top: 200px
        }
}
        .start{
            width: 80px;
            height: 80px;
            border-radius: 50%;
            text-align: center;
            display: table-cell;
            font-size: 17px;
            color: #fff;
            vertical-align: middle;
            background-image: linear-gradient(-30deg,lightgreen,lightblue)
        }
      .money-title{
            font-size: 18px;
    text-align: center;
    margin: 8px 0px;
      }
      .show{
        transition: all .3s;
        max-height: 0px;
        overflow:hidden;
            width: 100%;
            .show-firt{
              border-bottom: 5px solid #eee;
            }
            .exam-features{
              display: flex;
              font-size: 15px;
              font-weight: bold;
              padding: 12px 0px;
              border-top: 1px solid #d9d9d9 ;
              div{
                flex: 1;
                text-align: center;
                &:first-child{
                  border-right: 1px solid #a8a8a8;
                }
              }
            }
      }
      .show-item{
        max-height: 1000px
      }
      .close{
        display: inline-block;
        width: 10px;
        height: 10px;
        border-right: 1px solid gray;
        border-bottom: 1px solid gray;
        transform: rotate(-45deg);
        margin-left:168px;
        transition: all .3s;
      }
      .open{
        transform: rotate(45deg)
      }
 .time-out{
  position: fixed;
  top: 10px;
  right: 5px;
  color: #fff;
  font-size: 13px;
  z-index: 1001;
}
/deep/ .radiolist{
  display: flex;
justify-content: center;
align-items: center;
 .mint-cell{
  .mint-cell-wrapper{
    background-image: none;
  }
}
}
/deep/ .fake {
  .clearfix{
  .mint-radiolist {
  .mint-radiolist-title{
    color: #26a2ff;
    font-size: 14px;
  }
  .mint-cell{
        float: left;
    .mint-cell-wrapper{
    background-image: none;
    }
  }
  }
  .mint-cell .mint-cell-wrapper .mint-cell-title{
width: auto
    }

  }
}
.split{
  border-bottom: 1px solid #d9d9d9;
}
/deep/ .no-line{
    .mint-cell{
    .mint-cell-wrapper{
    background-image: none;
    }
  }
}
/deep/ .radil-title{
  justify-content: start;
  .mint-radiolist-title{
      color: #26a2ff;
      font-size: 15px;
  }
}
.comfirm-btn{
 margin-top: 10px;
 padding: 0px 40px;
}
.clearfix{
  border-bottom: 1px solid #eee;
}
.hidden{
  display: none;
}
</style>
