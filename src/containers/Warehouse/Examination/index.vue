<template>
<div class="exam-warp">
    <a class="time-out">时间：{{useTime}}</a>
  <div class="exam" v-if="isAwait">
    <div >
      <loading :loading-show='loading'></loading>
    </div>
     <div class="start-btn"><div class="start" @click="start">{{loadingText}}</div></div>
    </div>
    <div class="exam-field" v-else>
      <div class="exam-item">
<mt-field label="考生姓名:" v-model="username"></mt-field>
<mt-field label="身份证号:" v-model="username"></mt-field>
<mt-field label="单   位:" v-model="username"></mt-field>
<mt-field label="信封编号:" v-model="username"></mt-field>
<mt-field label="纸币张数" placeholder="请输入纸币张数" type='number' v-model="moneyObj.counter" @input="getCounter($event)"></mt-field>
  </div>
  <!-- <div> -->
<!-- <mt-field label="货币总张数" placeholder="请输入用户名" type='number' v-model="moneyObj.total"></mt-field> -->

<!-- <mt-field label="请输入所有假币冠字号码:" class="all-money"></mt-field>
<mt-field :label="item+'、'" type='number' v-model="moneyObj.counterMoy[index]" class="all-num" v-for="(item,index) in moneyObj.counter" :key="index"></mt-field> -->
  <!-- </div> -->
  <div v-for="(item,index) in  moneyObj.counter" :key="index" class="exam-item">
      <h1 class="money-title" @click="toggles(index)" >假币特征（其中1张）<i class="close" :class="{'open':curIndex===index}"></i></h1>
      <div  class="show" :class="{'show-item':curIndex===index}">
      <mt-field label="假币冠字号码:" placeholder="请输入冠字号码" type='number' v-model="moneyObj.counter" class="show-firt"></mt-field>
      <mt-radio class="radiolist split no-title"
  v-model="value"
  :options="[{label:'伪造币',value:'0'},{label:'变造币',value:'1'}]">
</mt-radio>
<div v-if="hidden" class="fake">
      <mt-radio
  v-model="value"
  :options="[{label:'有印刷水印',value:'0'},{label:'无印刷水印',value:'1'}]">
</mt-radio>
      <mt-radio
  v-model="value"
  :options="[{label:'有印刷水印',value:'0'},{label:'无印刷水印',value:'1'}]">
</mt-radio>
      <mt-radio
  v-model="value"
  :options="[{label:'有印刷水印',value:'0'},{label:'无印刷水印',value:'1'}]">
</mt-radio>
      <mt-radio
  v-model="value"
  :options="[{label:'有印刷水印',value:'0'},{label:'无印刷水印',value:'1'}]">
</mt-radio>
      <mt-radio
  v-model="value"
  :options="[{label:'有印刷水印',value:'0'},{label:'无印刷水印',value:'1'}]">
</mt-radio>
</div>
<div v-else class="change">
  <h1>假币票面特征（正面观察）</h1>
        <mt-radio class="no-title no-line"
  v-model="value"
  :options="[{label:'左真右假',value:'0'},{label:'左假右真',value:'1'},{label:'两边为真中间为假',value:'1'}]">
</mt-radio>
<h1>大面额数字100及花卉图案部位</h1>
      <mt-radio class="radiolist split no-title"
  v-model="value"
  :options="[{label:'真',value:'0'},{label:'假',value:'1'}]">
</mt-radio>
      <mt-radio class="radiolist radil-title"
  v-model="value"
  title="光变油墨部位："
  :options="[{label:'真',value:'0'},{label:'假',value:'1'}]">
</mt-radio>
      <mt-radio class="radiolist radil-title"
  v-model="value"
  title="手感线部位："
  :options="[{label:'真',value:'0'},{label:'假',value:'1'}]">
</mt-radio>
      <mt-radio class="radiolist radil-title"
  v-model="value"
  title="安全线部位："
  :options="[{label:'真',value:'0'},{label:'假',value:'1'}]">
</mt-radio>
</div>
</div>
  </div>
  <div class="comfirm-btn">
  <mt-button type="primary" class="primary" size='large' @click="submit">交 卷</mt-button>
  </div>
    </div>
    <exam-details :ShowDetails.sync='showMask'></exam-details>
    </div>
</template>
<script>
import SockJs from 'sockjs-client'
import Stomp from 'stompjs'
import {timeOut} from '@/utils/common'
let API = require('../../../../config/proxy')
export default {
  name: 'Examination',
  data () {
    return {
      showMask: false,
      hidden: true,
      useTime: '',
      testTime: 5,
      username: '',
      curIndex: '',
      isAwait: false,
      value: '',
      loading: false,
      loadingText: '开始',
      moneyObj: {
        counterMoy: []
      }
    }
  },
  watch: {
    value (newV, oldV) {
      this.hidden = parseInt(newV)
      console.log(this.hidden, '333')
    }
  },
  created () {
    // this.outTest()
    this.initWebsocket()
    this.countDown()
  },
  beforeDestroy () {
    (this.disc = true) && this.stompClien && this.stompClien.disconnect()
    clearInterval(this.st)
  },
  methods: {
    submit () {
      this.showMask = true
    },
    toggles (index) {
      this.curIndex = index === this.curIndex ? '' : index
    },
    initWebsocket () {
      let sock = new SockJs(API.dev.target)
      this.stompClien = Stomp.over(sock)
      console.log('=-=-=', sock, this.stompClien)
      this.stompClien.connect({}, (data) => {
      // 连接成功是返回的数据
        console.log(data)
        this.stompClien.subscribe('api/alist', (res) => {
          // 订阅某个topic
          console.log(res)
        })
      }, (error) => {
        (!this.disc) && setTimeout(() => {
          this.initWebsocket()
        }, 2000)

        console.log('connect falt...', error)
      })
    },
    getCounter ($event) {
      (!$event) && ($event = 0)
      this.moneyObj.counter = parseInt($event)
    },
    start () {
      let seft = this
      this.loading = !this.loading
      this.loadingText = this.loading ? '取消开始' : '开始'
      this.stompClien.send('api/send', {}, JSON.stringify({ready: seft.loading}))
    },
    countDown () {
      this.st = setInterval(() => {
        if (this.testTime === 0) { clearInterval(this.st); return false }
        this.testTime--
        this.useTime = timeOut(this.testTime)
      }, 1000)
    },
    outTest () {
      this.$popBox.MessageBox.alert('您不符合此场考试的权限，即将退出！').then(action => {
        this.$router.go(-1)
      })
    }

  }
}
</script>

<style lang="scss" scoped>

.exam-warp{
  height: 100%;
  .exam-field{
    .exam-item{
      border-bottom: 10px solid #ebebeb;
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
      /deep/.all-money .mint-cell-wrapper .mint-cell-title{
        width: 100%
      }
      /deep/.all-num .mint-cell-wrapper .mint-cell-title{
        width: auto;
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
              border-bottom: 1px solid #d9d9d9;
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
  .mint-radiolist {
  .mint-radiolist-title{display: none;}
  .mint-cell:last-child{
    .mint-cell-wrapper{
    background-image: none;
    }
  }
  }
}
.change{
  h1{
    text-align: center;
    padding: 10px 0px;
  }
}
.split{
  border-bottom: 1px solid #d9d9d9;
}
/deep/ .no-title{
  .mint-radiolist-title{
    display: none;
  }
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
      color: #2c3e50;
      font-size: 15px;
  }
}
.comfirm-btn{
 margin-top: 10px;
 padding: 0px 40px;
}

</style>
