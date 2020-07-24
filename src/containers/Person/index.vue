<template>
  <div>
    <mt-header>
   <div slot="left">
     <img  src="@/assets/images/photo.png" height="85" width="90">
     <div class="login-title" v-if="!!userInfo.token">
        <h1>{{personInfo.name}}</h1>
        <h1>{{userInfo.mobile}}</h1>
     </div>
  </div>
      <img slot="right" src="@/assets/images/VIP.png" height="80" width="95">
    </mt-header>
    <mt-cell
      title="个人信息"
      is-link
      to='/personinfo'>
      <span slot="icon" class="person-item">
    <svg-icon icon-class='course' ></svg-icon>
    </span>
    </mt-cell>
        <mt-cell
      title="学习计划"
      is-link
      to='/plan_list'>
      <span slot="icon" class="person-item">
    <svg-icon icon-class='notice' ></svg-icon>
    </span>
    </mt-cell>
        <mt-cell
      title="学习记录"
      is-link
      to='/study'>
      <span slot="icon" class="person-item">
    <svg-icon icon-class='record' ></svg-icon>
    </span>
    </mt-cell>
    <mt-cell
      title="结业证书"
      is-link
      to='/certificate'>
     <span slot="icon" class="person-item">
    <svg-icon icon-class='order' ></svg-icon>
    </span>
    </mt-cell>

    <!-- <mt-cell
      title="我的收藏"
      is-link>
      <span slot="icon" class="person-item">
    <svg-icon icon-class='collect1' ></svg-icon>
    </span>
    </mt-cell> -->
    <mt-cell v-show="userInfo.token"
      @click.native="logout()"
      title="退出登录"
      is-link>
      <span slot="icon" class="person-item">
    <svg-icon icon-class='logout' ></svg-icon>
    </span>
    </mt-cell>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
import {myMixin} from './minxis'
export default {
  name: 'Person',
  data () {
    return {level: 1}
  },
  mixins: [myMixin],
  computed: {
    ...mapGetters([
      'userInfo',
      'personInfo'
    ])
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    logout () {
      this.$popBox.MessageBox.confirm('是否退出登录？').then(res => {
        this.$store.dispatch('logOut')
        this.$router.replace({path: '/login'})
      })
    },
    buyVip () {
      this.$router.push({path: '/menber'})
    }
  }
}
</script>
<style lang="scss" scoped>
.mint-cell-wrapper .mint-cell-title {
   flex: inherit;
}
.mint-header {
  font-size: large;
    height: 4.066667rem;
}
.mint-header .mint-button {
    height: 90px;
}
.person-item{
  width: 26px;
  height: 26px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 5px;
}
.login-title{
  display: inline-block;
  padding: 23px 0px 0px 20px;
  h1{
    text-align: center;
    margin-bottom: 10px;
    &:first-child{
      font-size: 20px;
    }
  }
}
</style>
