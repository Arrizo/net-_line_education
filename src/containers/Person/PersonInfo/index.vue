<template>
  <div>
    <mt-cell
  title="姓名"
  :value="personInfo.name"
  is-link
  @click.native="toDetails('1')">
</mt-cell>
<mt-cell
  title="手机号"
  :value="personInfo.mobile">
  <span slot="icon" class="required">*</span>
</mt-cell>
<mt-cell
  title="身份证"
  :value="personInfo.number">
  <span slot="icon" class="required">*</span>
</mt-cell>
<mt-cell
  title="性别"
  @click.native="toDetails('3')"
  is-link
  :value="personInfo.sexd">
</mt-cell>
<!-- <mt-cell
  title="密码"
  @click.native="toDetails('2')"
  is-link
  value="修改密码">
</mt-cell> -->
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: 'PersonInfo',
  computed: {
    ...mapGetters([
      'personInfo'
    ])
  },
  methods: {
    toDetails (type) {
      this.personInfo.type = type
      this.$router.push({path: '/edite-page', query: this.personInfo})
    }
  }
}
</script>
<style lang="scss" scoped>
.required{
  color: red;
}
</style>
