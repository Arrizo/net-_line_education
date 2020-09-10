<template>
  <div class="sign" v-if='first'>
    <mt-field label="讲师名称："  v-model="currentCourse.teachName" readonly></mt-field>
    <mt-cell title="课程选择" is-link v-model="popupValue" @click.native="open" ></mt-cell>
    <!-- 课程选择 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom"  style="width: 100%;" >
      <mt-picker :slots="slots" :valueKey="'name'" :show-toolbar="true" @change="selectCourse">
        <slot>
          <div class="pop-btn">
            <div @click="popupVisible=false">取消</div><div @click="getValue()">确认</div>
          </div>
        </slot>
      </mt-picker>
    </mt-popup>
  </div>
  <div v-else class="sign">
    <mt-field label="课程名称："  readonly v-model="currentCourse.CourseName"></mt-field>
    <mt-field label="讲师名称："  v-model="currentCourse.teachName" readonly></mt-field>
    <div class="guest" v-show="showGuest">
      <mt-field label="用户名称：" placeholder="请输入游客的名称" v-model="course.name" @input="handlder($event,true)" :class="{required:validNa}" :state="(course.name&&!validNa)?'success':'error'"></mt-field>
      <mt-field label="联系方式：" placeholder="请输入游客联系方式" v-model="course.mobile" @input="handlder($event,false)" :class="{required:validMb}" :state="(course.mobile&&!validMb)?'success':'error'"></mt-field>
    </div>
    <section>
      <div :class="['isSign'+code]" @click="hanlderSign"> {{signTitle}}</div>
    </section>
  </div>

</template>
<script>
import {mapGetters} from 'vuex'
import storage from '@/utils/Storage_Cookie'
import {signIn, getCourseInfo} from '@/api'
import {pickerDate} from '@/utils/common'
export default {
  name: 'CourseSign',

  data () {
    return {
      showGuest: false,
      validNa: false,
      validMb: false,
      code: '',
      currentCourse: {},
      course: {
        signIn: 1
      },
      first: true,
      lecturerUserNo: null,
      popupValue: '请选择课程',
      popupVisible: false,
      sortName: '',
      courseId: '',
      slots: [
        { // 一级   课程
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    signTitle () {
      return this.code === 0 ? '✔ 签到成功' : this.code === 1 ? '已签过' : '立即签到'
    }
  },
  // 入口提示登陆方式
  beforeRouteEnter (to, from, next) {
    if (from.path === '/login') {
      storage.setSession('SIGN_IN', true)
      next()
    }
    next()
  },
  created () {
    let sign = JSON.parse(this.$route.query.sign)
    // sign = JSON.parse('%5B%22%E7%9B%9B%E9%87%91%E6%BA%90%22,%222019011715195672%22%5D')
    // console.log(sign)
    // this.currentCourse.CourseName = sign[1]
    // this.currentCourse.teachName = sign[2]
    // this.course.courseId = sign[0]
    this.lecturerUserNo = sign[1]
    this.currentCourse.teachName = sign[0]
    this.getCourse()
  },
  mounted () {
    !storage.getSession('SIGN_IN') && this.checkAccout()
  },
  methods: {
    handlder ($event, flag) {
      let regx = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
      let value = $event.trim()
      if (flag) {
        this.validNa = !value
      } else {
        this.validMb = !regx.test(value)
      }
    },

    checkAccout () {
      this.$popBox.MessageBox({
        cancelButtonText: '游客签到',
        confirmButtonText: '学员签到',
        showCancelButton: true,
        showConfirmButton: true,
        closeOnClickModal: false,
        title: '提示',
        message: '请选择签到方式！'
      }).then(res => {
        res === 'cancel' ? this.showGuest = true : this.$router.push({path: '/login', query: {redirect: this.$route.fullPath}})
      })
    },
    hanlderSign () {
      if (this.showGuest) {
        if (!this.course.name || this.validNa) {
          this.validNa = true
          return
        }
        if (!this.course.mobile || this.validMb) {
          this.validMb = true
          return
        }
        this.course.userNo = '0'
      }
      signIn(this.course).then(res => {
        if (res.code === 200) {
          this.code = res.data.status
          // if (this.code === 1) {
          this.$popBox.Toast({message: '即将跳转到评估页面...', duration: 2000})
          setTimeout(() => {
            this.$router.replace({path: '/assessment', query: {id: res.data.id}})
          }, 2000)
          // }
        }
      })
    },
    open () {
      this.popupVisible = true
      // console.log(this.popupVisible)
    },
    getCourse () {
      let obj = {lecturerUserNo: this.lecturerUserNo}
      // console.log(obj)
      getCourseInfo(obj).then(res => {
        // console.log('getCourse', res)
        if (res.code === 200) {
          this.slots[0].values = res.data
          if (res.data.length === 1) {
            // 只有一个课程，直接显示签到页面
            this.first = false
            this.currentCourse.CourseName = res.data[0].name
            this.course.courseId = res.data[0].id
          }
        }
      })
    },
    selectCourse (picker, values) {
      // console.log(picker)
      let sortObj = picker.getValues()
      // console.log(sortObj)
      // this.popupValue = sortObj[0].name
      this.sortName = pickerDate(sortObj).name
      this.courseId = pickerDate(sortObj).id
      // this.categoryId = pickerDate(sortObj).id
    },
    getValue () {
      this.popupValue = this.sortName
      this.currentCourse.CourseName = this.sortName
      this.course.courseId = this.courseId
      this.popupVisible = false
      this.first = false
    }
  }

}
</script>
<style lang="scss" scoped>
.sign{
  padding-top: 70px !important;
}
section{
  display: flex;
  justify-content: center;
  div{
    margin-top: 50px;
background: #26a2ff;
text-align: center;
padding: 8px 44px;
color: #fff;
border-radius: 20px;
font-size: 15px;
  }
}
.isSign0{
  background: #44b549;
}
.isSign1{
  background: #ffae12
}
.guest{
  border-top: 10px solid #eeeeee;
}
.required{
  border-bottom: 1px solid red;
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
