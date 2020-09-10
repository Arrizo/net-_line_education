<template>
  <div>
    <div class="header">说明：非常满意10分，很不满意0分；请客观公正地在评估项目后面写上您的评分。</div>
<div>
  <div class="title"><span>培训内容</span></div>
  <div class="asset-box">
<div class="asset-table-header"><h3>评估项目</h3><h3>评分</h3></div>
<div class="asset-table-header no-border" v-for="(item,index) in assetObj.instructors" :key="index">
   <template v-if="item.type===1">
  <h3 >{{item.criteria}}</h3>
  <h3><input type="number" class="asset-scro" v-model="item.score" @input="fomatData($event,item,index)" maxlength='2'/>
    <span class="icon" @click="open(item)"><svg-icon :icon-class="'order'" slot="icon"></svg-icon></span>
  </h3>
   </template>
</div>
</div>
</div>
<div>
  <div class="title"><span>授课技巧</span></div>
  <div class="asset-box">
<div class="asset-table-header"><h3>评估项目</h3><h3>评分</h3></div>
<div class="asset-table-header no-border" v-for="(item,index) in assetObj.instructors" :key="index">
 <template v-if="item.type===2">
  <h3 >{{item.criteria}}</h3>
  <h3><input type="number" class="asset-scro" v-model="item.score" @input="fomatData($event,item,index)"  maxlength='2'/>
   <span class="icon" @click="open(item)"><svg-icon :icon-class="'order'" slot="icon"></svg-icon></span>
  </h3>
  <!-- <i class="mintui intui-sucess">...</i> -->
 </template>
</div>
</div>

<div class="title"><span>讲师台风</span></div>
  <div class="asset-box">
<div class="asset-table-header"><h3>评估项目</h3><h3>评分</h3></div>
<div class="asset-table-header no-border" v-for="(item,index) in assetObj.instructors" :key="index">
 <template v-if="item.type===3">
  <h3 >{{item.criteria}}</h3>
  <h3><input type="number" class="asset-scro" v-model="item.score" @input="fomatData($event,item,index)"  maxlength='2'/>
    <span class="icon" @click="open(item)"><svg-icon :icon-class="'order'" slot="icon"></svg-icon></span>
  </h3>
 </template>
</div>
</div>

<div class="title"><span>专业水平</span></div>
  <div class="asset-box">
<div class="asset-table-header"><h3>评估项目</h3><h3>评分</h3></div>
<div class="asset-table-header no-border" v-for="(item,index) in assetObj.instructors" :key="index">
 <template v-if="item.type===4">
  <h3 >{{item.criteria}}</h3>
  <h3><input type="number" class="asset-scro" v-model="item.score" @input="fomatData($event,item,index)"  maxlength='2'/>
    <span class="icon" @click="open(item)"><svg-icon :icon-class="'order'" slot="icon"></svg-icon></span>
  </h3>
 </template>
</div>
</div>

<!-- 评分框 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom"  style="width: 100%;" >
      <mt-picker :slots="slots" :valueKey="'name'" :show-toolbar="true" @change="selectScore">
        <slot>
          <div class="pop-btn">
            <div @click="popupVisible=false">取消</div><div @click="getValue()">确认</div>
          </div>
        </slot>
      </mt-picker>
    </mt-popup>

<div class="other">
  <mt-field  placeholder="评估结论/建议：" type="textarea" rows="4" v-model="assetObj.advice"></mt-field>
</div>
<section>
  <div @click="submit" :class="{success:isSuccess}">{{ isSuccess ? '✔ 提交成功':'提 交'  }}</div>
</section>
</div>
  </div>
</template>
<script>
import {grading, subAssetment} from '@/api'
export default {
  name: '',
  data () {
    return {
      assetObj: {instructors: []},
      isSuccess: false,
      scoreList: [],
      popupVisible: false,
      slots: [
        { // 一级   分数
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      sortName: '',
      tempItem: {},
      selectList: [
        {code: -1, name: '请选择'},
        {code: 10, name: '10'},
        {code: 9, name: '9'},
        {code: 8, name: '8'},
        {code: 7, name: '7'},
        {code: 6, name: '6'},
        {code: 5, name: '5'},
        {code: 4, name: '4'},
        {code: 3, name: '3'},
        {code: 2, name: '2'},
        {code: 1, name: '1'},
        {code: 0, name: '0'}
      ]
    }
  },
  created () {
    this.initData()
  },
  methods: {
    // 提交。。
    submit () {
      if (this.assetObj.instructors.length !== this.scoreList.length) {
        this.$popBox.Toast({message: '请完善评分项目', duration: 2000})
        return false
      }
      this.assetObj.score = this.assetObj.instructors.reduce((t, n) => parseInt(t) + parseInt(n.score), 0)
      subAssetment(this.assetObj).then(res => {
        if (res.code === 200) {
          this.$popBox.Toast({message: '提交成功！即将跳转到首页...', duration: 2000})
          this.isSuccess = true
          setTimeout(() => {
            this.$router.replace({path: '/home'})
          }, 2000)
        } else {
          this.$popBox.Toast({message: res.msg, duration: 4000})
        }
      })
    },
    fomatData (e, i, num) {
      console.log('=-==', this.assetObj)
      //       i.score = (i.score).replace(/[^(0-9|10)]$/ig, '')
      i.score = (i.score).replace(/[^\d]$/ig, '')
      if (i.score && parseInt(i.score) > 10) i.score = [...i.score][1]
      this.scoreList[num] = i.score
      if (!this.scoreList[num]) this.scoreList.splice(num, 1)
    },
    initData () {
      this.assetObj.offlineUserId = this.$route.query.id
      grading().then(res => {
        if (res.code === 200) {
          this.assetObj.instructors = res.data.list
        }
      })
      this.slots[0].values = this.selectList
    },
    open (item) {
      // console.log(item)
      this.sortName = ''
      this.popupVisible = true
      this.tempItem = item
    },
    selectScore (picker, values) {
      // console.log(picker)
      let sortObj = picker.getValues()
      // console.log(sortObj)
      // this.popupValue = sortObj[0].name
      this.sortName = sortObj[0].name
      // this.courseId = pickerDate(sortObj).id
      // this.categoryId = pickerDate(sortObj).id
    },
    getValue () {
      this.popupVisible = false
      this.tempItem.score = this.sortName
      // console.log(JSON.stringify(this.assetObj.instructors))
    }
  }

}
</script>
<style lang="scss" scoped>
.header{
padding: 14px;
    font-size: 13px;
    color: gray;
}
.border{
  border-bottom: 1px solid #eeee;
}
.title{
  padding: 0px 10px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-family: fantasy;
  background: #efefef;;
  span{
    border-bottom: 2px solid #2c3e50;
   padding-bottom: 10px;
  }
}
.asset-box{
  .asset-table-header{
    display: flex;

    h3{
    font-size: 15px;
    font-weight: bold;
     text-align: center;
      padding: 6px 0px;
      border-bottom: 1px solid gray;
      &:first-child{
        border-right: 1px solid gray;
        flex: auto;
        font-size: 13px;
      }
      &:last-child{
    width: 70px;
    min-width: 70px;
      }
    }
  }

  }
  .no-border{
    h3{
      font-weight: normal !important;
text-align: left !important;
position:relative;
      input{
        height: 100%;
        outline: none;
        border: 0px;
      width: 90%;
      text-align: center;
      }
      &:first-child{
        padding-left: 6px;
      }
    }
  }
  .other{
    border-top: 10px solid #f6f6f6e5;
  }
  section{
  display: flex;
  justify-content: center;
  div{
  margin: 20px 0px;
background: #26a2ff;
text-align: center;
padding: 8px 44px;
color: #fff;
border-radius: 20px;
font-size: 15px;
  }
}
.success{
  background: #44b549;
}
.icon{
  position: absolute;
    /* height: 100%; */
    right: 5px;
    width: 20px;
    top: 0;
    bottom: 0;
    // height: 20px;
    // text-align: center;
    /* color: #c0c4cc; */
    /* transition: all .3s; */
    /* pointer-events: none; */
    // line-height: 100%;
    // line-height: 40px;
}
.pop-btn{
    display: flex;
    justify-content: space-around;
    height: 100%;
    div{
      font-size: 17px;
      line-height: 40px;
      &:last-child{
          color: #26a2ff;
      }
    }
  }
</style>
