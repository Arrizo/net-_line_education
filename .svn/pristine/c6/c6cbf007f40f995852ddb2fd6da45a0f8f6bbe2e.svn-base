<template>
  <div class="sort-warp">
    <div v-if="parseInt($route.query.type)===1">
    <mt-cell title="试卷：" is-link v-model="difficValue" @click.native="difficuVisible=true" >
</mt-cell>
    </div>
    <div v-else>
    <mt-cell title="专项练习：" is-link v-model="popupValue" @click.native="popupVisible=true" >
</mt-cell>
  <!-- <mt-cell title="题目难度：" is-link v-model="difficValue" @click.native="difficuVisible=true" >
</mt-cell> -->
</div>
<div class="primary-btn">
<mt-button type="primary" size="large" @click="next()" class="primary">确定</mt-button>
</div>
<!-- 题目选择 -->
    <mt-popup v-model="popupVisible" popup-transition="popup-fade" position="bottom"  style="width: 100%;" >
<mt-picker :slots="slots"  :valueKey="'name'" :show-toolbar="true" @change="selectAare">
  <slot>
    <div class="pop-btn">
      <div @click="popupVisible=false">取消</div><div @click="getValue()">确认</div>
    </div>
  </slot>
</mt-picker>
</mt-popup>
<!-- 难度选择 -->
    <mt-popup v-model="difficuVisible" popup-transition="popup-fade" position="bottom"  style="width: 100%;" >
<mt-picker :slots="difficuSlots"  :valueKey="'name'" :show-toolbar="true" @change="selectDiffic">
  <slot>
    <div class="pop-btn">
      <div @click="difficuVisible=false">取消</div><div @click="getDifficValue()">确认</div>
    </div>
  </slot>
</mt-picker>
</mt-popup>

  </div>
</template>
<script>
import {categoryTree} from '@/api'
import {mapGetters} from 'vuex'
import {pickerDate} from '@/utils/common'
export default {
  name: 'sort',
  data () {
    return {
      popupValue: '请选择模块',
      difficValue: '请选择题',
      sortName: '',
      difficName: '',
      slots: [
        { // 一级   省
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'center'
        }, { // 二级   市
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'center'
        }, { // 三级   区
          flex: 1,
          values: ['请选择'],
          className: 'slot1',
          textAlign: 'center'
        }
      ],
      difficuSlots: [{
        values: [{name: '含外币', id: 0}, {name: '不含外币', id: 1}]
      }],
      handlder: e => { e.preventDefault() },
      popupVisible: false,
      difficuVisible: false, // 难度
      cateObj: {
        type: this.$route.query.type
      }
    }
  },
  computed: {
    ...mapGetters([
      'type'
    ])
  },
  created () {
    this.getCategoryTree()
    // this.getPaperList()
  },
  watch: {
    popupVisible (newV, oldV) {
      if (newV) {
        this.openTouch()
      } else {
        this.closeTouch()
      }
    },
    difficuVisible (newV, oldV) {
      if (newV) {
        this.openTouch()
      } else {
        this.closeTouch()
      }
    }
  },

  methods: {
    selectAare (picker, values) {
      picker.setSlotValues(1, values[0].children)
      picker.setSlotValues(2, values[1].children)
      let sortObj = picker.getValues()
      this.sortName = pickerDate(sortObj).name
      this.categoryId = pickerDate(sortObj).id
    },
    selectDiffic (picker, values) {
      let sortObj = picker.getValues()
      this.difficName = pickerDate(sortObj).name
      this.lv = pickerDate(sortObj).id
    },
    getValue () {
      this.popupValue = this.sortName
      this.cateObj.categoryId = this.categoryId
      this.popupVisible = false
    },
    getDifficValue () {
      this.difficValue = this.difficName
      this.cateObj.lv = this.lv
      this.cateObj.id = this.lv
      this.cateObj.status = this.lv
      this.difficuVisible = false
    },
    openTouch () {
      let that = this
      document.getElementsByTagName('body')[0].addEventListener('touchmove', that.handlder, {passive: false})
      console.log('addEventListener')
    },
    closeTouch () {
      let that = this
      document.getElementsByTagName('body')[0].removeEventListener('touchmove', that.handlder, {passive: false})
      console.log('removeEventListener')
    },
    getCategoryTree () {
      categoryTree().then(res => {
        if (res.code === 200) {
          res.data.unshift({name: '综合练习', id: '', children: [{name: ' ', id: '', children: []}]})
          this.slots[0].values = res.data
        }
      })
    },
    next () {
      let leng = Object.keys(this.cateObj).length
      if (leng < 2) {
        this.$popBox.Toast('请完善类型选择')
        return false
      } else {
        this.$router.push({name: 'Sort_Item', query: this.cateObj})
      }
    }
    // getPaperList () {
    //   paperList().then(res => {
    //     if (res.code === 200) {
    //       this.difficuSlots[0].values = res.data
    //     }
    //   })
    // }
  }
}
</script>
<style scoped lang='scss'>
.sort-warp{
  margin-top: 60px;
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
}
.primary-btn{
  border-top: 1px solid #dcdcdc;
  padding: 40px;
}
</style>
