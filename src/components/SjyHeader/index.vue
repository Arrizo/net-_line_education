<template>
  <div class="footer-header">
    <mt-search  @click.enter.native="$router.push({name: 'search'})"
      placeholder="请输入课程的名称">
    </mt-search>
  </div>
</template>
<script>
export default {
  name: 'Header',
  data () {
    return {
      searchContent: ''
    }
  }
}
</script>
<style lang="scss" scoped>
/deep/.footer-header{
  height: 40px;
  margin-top: 40px;
  .mint-search {
    .mint-searchbar {
        background-color: #26a2ff;
      }
    .mint-searchbar-cancel {
      color: white;
    }
  }
}
</style>
