<template>
  <div class="hit-det">
    <div class="hit-bg">
      <div class="result">
          <h1>{{examObj.score}}</h1>
          <h4>本次测试题数</h4>
      </div>
      <div class="hit-percent">
         <div>
           <span class="start-title">正确题数</span><span class="seconde" :style="{width:(examObj.rightCount)*2+'px'}"></span><span>{{examObj.rightCount}}</span>
         </div>
         <div>
               <span class="start-title">错误题数</span><span class="seconde" :style="{width:(examObj.errorCount)*2+'px'}"></span><span>{{examObj.errorCount}}</span>
         </div>
         <div>
           <span class="start-title">考试用时:</span><span></span><span>{{ time(examObj.examTime)}}</span>
         </div>
      </div>

    </div>
    <div class="history-btn">
      <mt-button type="primary" class="primary" size='large' @click="$router.go(-1)">确认</mt-button>
      <mt-button  type="danger" v-show="examObj.score>=examObj.passScore" class="primary" size='large' @click="showCertifiCode=true">生成结业证书</mt-button>
      <mt-button  type="danger" v-show="'1'.includes(examObj.type)" class="primary" size='large' @click="$router.push({name:'WrongRecord'})" >模拟错题记录</mt-button>
    </div>
      <transition name="fade">
        <div class="certifi-mask" v-show="showCertifiCode">
          <div class="certifi-bg">
            <h1>2020年反假货币知识培训</h1>
            <h1>结业证书</h1>
            <div class="certifi-content">
            <span>{{examObj.nikeName}}</span>学员于<span>{{examObj.examTime[0]}}</span>年<span>{{examObj.examTime[2]}}</span>月<span>{{examObj.examTime[4]}}</span>日参加反假货币知识培训，经自评测试，成绩合格，顺利结业，特发此证。
            </div>
            <div class="certifi-code">
              <vue-qr :text="qrCodeUrl" :size='140' :margin='5'/>
              <div>深圳盛金源科技股份有限公司</div>
              <div>{{examObj.examTime[0]}}年{{examObj.examTime[2]}}月{{examObj.examTime[4]}}日</div>
            </div>
             <i class="certifi-close" @click="showCertifiCode=false">×</i>
          </div>
        </div>
      </transition>
  </div>
</template>
<script>
// import {historyDetail} from '@/api'
import vueQr from 'vue-qr'
import {timeOut} from '@/utils/common'
import {getCertificate} from '@/api'
export default {
  name: 'historyDetail',
  data () {
    return {
      showCertifiCode: false,
      qrCodeUrl: '',
      examObj: {}
    }
  },
  components: {
    vueQr
  },
  created () {
    this.examObj = JSON.parse(this.$route.query.items)
  },
  mounted () {
    (this.examObj.score >= this.examObj.passScore) && getCertificate().then(res => {
      if (res.code === 200) {
        this.examObj.nikeName = res.data.list[6]
        this.examObj.examTime = res.data.examTime.split(/(-|\s+)/g)
        res.data.list.pop()
        this.qrCodeUrl = location.origin + '/#/certificate_details?list=' + JSON.stringify(res.data.list)
      }
    })
  },
  methods: {
    time (time) {
      return timeOut(time)
    }
  }
}
</script>
<style lang="scss" scoped>
.hit-det{
  height: calc(100vh - 40px);
  padding-top: 80px !important;
  padding: 40px 20px;
box-sizing: border-box;
  .hit-bg{
    width: 100%;
    // height: 100%;
      // background-image: linear-gradient(-45deg, #1897bb, #89bfe4);
      padding: 70px 0px ;
      box-sizing: border-box;
      .result{
        text-align: center;
        margin-bottom: 30px;
        h1{
          margin: 0 auto;
          background: #f9f6f2;
              font-weight: bold;
            font-family: serif;
            font-size: 60px;
            height: 120px;
            width: 120px;
            line-height: 120px;
            border-radius: 50%;
            margin-bottom: 15px;
        }
        h4{
          color: #26a2ff;
          padding: 5px;
          background-color: #f1f9ff;
          border-radius: 20px;
        }
      }
      .hit-percent{
         div{
            padding: 15px 0px;
        span{
          display: inline-block;
          &:first-child{
            font-size: 14px;
            color: #636262;;
            margin-right: 10px;
          }
          &:last-child{
              margin-left: 5px;
          }
        }
                .seconde{
background: #26a2ff;
max-width: 250px;
overflow: hidden;
height: 8px;
border-radius: 5px;
// vertical-align: middle;
        }
         }
      }
  }
}
.history-btn{
  display: flex;
button{
  margin: 0px 5px;
}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.certifi-mask{
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0px;
  left: 0px;
z-index: 9990;
  background: rgba(0, 0, 0, .6);
  padding: 60px 10px 70px;
  box-sizing: border-box;
  .certifi-bg{
    height: 100%;
    width: 100%;
    position:relative;
    background: url('../../../assets/images/certificate.jpg') no-repeat;
    background-size: 100% 100%;
    h1{
      font-weight: bold;
      text-align: center;
      font-size: 20px;
      &:first-child{
        padding: 100px 0px 10px;
      }
      &:last-child{
          font-size: 30px;
      }
    }
    .certifi-close{
      position: absolute;
          bottom: -47px;
    left: 50%;
    transform: translate(-50%, 0%);
      border-radius: 50%;
        width: 30px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 40px;
      border:3px solid #fff;

    }
    .certifi-content{
      font-weight: 600;
      font-size: 14px;
      padding: 24px 34px 24px 52px;
      line-height: 30px;
      span{
font-weight: 900;
text-decoration: underline;
      }
    }
    .certifi-code{
      text-align: center;
div{
  text-align: center;
  font-weight: bold;
  font-size: 14px;
margin-top: 5px;
}
    }
  }
}
</style>
