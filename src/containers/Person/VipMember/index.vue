<template>
  <div class="login-wrap">
      <div class="vip-introduce">
        <h1 >2020南昌反假考试【初考费用】</h1>
        <span>海量课程专享，付费课程免费学习，超低价课程，资源随心下，一切只为助力你的学习与成长。</span>
        <i class="vip-halo"></i>
      </div>
      <div class="vip-details">
        <div class="vip-year">
          <div class="vip-img"></div>
          <div class="vip-content">
            <h3>学员缴费</h3>
            <label> </label>
             <!-- <h3>¥/年</h3> -->
          </div>
        </div>
<mt-button  size="large" plain @click.native="pay()">立即支付</mt-button>
      </div>
      <div class="vip-server">
           <!-- <vue-qr :text="codeUrl" :size='100' :margin='5' :callback="test"/> -->
           <!-- <div>下载二维码</div>
        <h1 >会员权益与服务说明 </h1>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span>
        <span>1、会员在有效期可免费学习会员免费课程。</span>
        <span>2、会员有效期，年度会员有效期为1年（365天）。</span> -->
      </div>
          <exam-details :ShowDetails.sync='isConfirm' :title="'请确认以下个人信息'" >
<div slot="content" class="confirm-info">
  <h1><span>姓名：</span><span>{{personInfo.name}}</span></h1>
  <h1><span>手机：</span><span>{{personInfo.mobile}}</span></h1>
  <h1><span>身份证：</span><span>{{personInfo.number}}</span></h1>
  <h1><span>性别：</span><span>{{personInfo.sexd}}</span></h1>
</div>
<div slot="footer" class="confirm-btn">
    <mt-button type="primary" size="small" @click="confirmInfo">我已确定</mt-button>
</div>
<div></div>
          </exam-details>
  </div>
</template>
<script>
// wechatPay getWxAssetToken AccessToken randomNo AccessToken
import {orderPay, wxPayAppResult, getwxPayAppResult} from '@/api'
import {GetQueryString} from '@/utils/common'
import storage from '@/utils/Storage_Cookie'
import {mapGetters} from 'vuex'
export default {
  name: 'Member',
  data () {
    return {
      orderObj: {},
      isConfirm: false,
      payObj: {
        detail: '超级会员(365天)',
        appid: 'wx243a884c56dd278e'
      }
    }
  },
  computed: {
    ...mapGetters([
      'personInfo'
    ])
  },
  created () {
    this.isConfirm = !storage.getStorage(this.personInfo.mobile)
  },
  mounted () {
    // 保证每次获取的code是唯一性
    this.payObj.code = GetQueryString()
    this.payObj.code = this.payObj.code === storage.getStorage('code') ? null : this.payObj.code
    this.payObj.code && this.pay()
  },
  methods: {
    pay () {
      // if (!isWeixin()) { this.$popBox.MessageBox('请在手机微信打开支付!!'); return false }
      if (this.payObj.code) {
        console.log('code----', this.payObj.code)
        storage.setStorage('code', this.payObj.code)
        this.addOrderPay()
        console.log(this.payObj, '=-=-=-=')
      } else {
        let url = location.origin + location.pathname + '#/menber'
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.payObj.appid}&redirect_uri=${encodeURIComponent(url)}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
      }
    },
    addOrderPay () {
      this.$popBox.Indicator.open()
      orderPay(this.payObj).then(res => {
        if (res.code === 200) {
          this.$popBox.Indicator.close()
          console.log('订单。。。。', res.data)
          this.orderObj = res.data
          this.onBridgeReady(res.data)
        }
      }).catch(() => {
        this.payObj.code = ''
        this.$popBox.MessageBox('支付失败，稍后再试')
        this.$popBox.Indicator.close()
      })
    },
    onBridgeReady (data) {
      let seft = this
      data.paySign = data.sign
      console.log(data, '=-=-=')
      // eslint-disable-next-line no-undef
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', data,
        function (res) {
          console.log('wx-info', res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            wxPayAppResult(seft.orderObj).then(res => {
              if (res.code === 200 && res.data === '未付款') {
                getwxPayAppResult(seft.orderObj).then(res => {
                  seft.$router.push({path: '/'})
                }).catch(() => {
                  seft.$router.push({path: '/'})
                })
              } else { seft.$router.push({path: '/'}) }
            })
          } else {
            console.log('res.msg' + res.err_msg)
            seft.payObj.code = ''
            alert(res.err_msg)
          }
        })
    },
    confirmInfo () {
      this.isConfirm = false
      storage.setStorage(this.personInfo.mobile, !this.isConfirm)
    }
  }
}
</script>
<style lang="scss" scoped>
.login-wrap{
  height: 100%;
  background: #f5f5f5;
  .vip-introduce{
    padding-top: 70px;
    height: 170px;
    background: #110c01;
    color:rgb(203, 159, 109);
    h1{
      font-size: 20px;
    text-align: center;
    font-weight: bold;
    margin: 8px 0px 25px;
    }
    span{
          padding: 0px 55px;
    display: inline-block;
    }
    .vip-halo{
          position: absolute;
    left: 154px;
    top: 34px;
      display: inline-block;
      width: 50px;
      height: 50px;
      background-image: radial-gradient(circle,#5d3512, 30%,transparent 70%);;
    }
  }
  .vip-details{
      margin: 0px 10px;
      background: #fff;
      border-radius: 5px;
      margin-top:-40px;
      padding: 0px 8px 10px;
    .vip-year{
       display: flex;
       justify-content: start;
       padding: 8px;
       border-bottom: 1px solid gainsboro;
    .vip-img{
      min-width: 150px;
      min-height: 80px;
       background: #a7813a;

    }
    .vip-content{
        padding-left: 8px;
        h3{
          color: #4f4f4f;
          margin: 5px 0px;
          &:last-child{
            color:rgb(203, 159, 109);
          }
        }
        span{
          color: #838383;
        }
    }
    }
  }
}
/deep/.mint-button--large{
  border-color: rgb(203, 159, 109);;
  margin-top: 10px;
.mint-button-text{
  font-size: 15px;
  color:rgb(203, 159, 109);;
}
}
.vip-server{
  margin: 12px 10px;
h1{
  margin: 10px 0px;
  color: #000;
  font-weight: bold;
  font-size: 17px;
}
span{
  margin: 10px 0px;
      display: block;
    color: #969696;
}
}
.confirm-info{
  h1{
    padding: 5px 0px;
    font-size: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.confirm-btn{
  display: flex;
  justify-content: center;
  align-items:center;
  padding: 8px;
  button{
    border-radius: 10px;
  }
}
</style>
