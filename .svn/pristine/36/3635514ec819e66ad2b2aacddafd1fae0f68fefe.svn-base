<template>
 <div class="loading" >
  <div class="loading-more" v-show="loading&&!allLoading">
<mt-spinner :type="3" ></mt-spinner> <span>加载中...</span>
</div>
<div class="loading-all" v-show="allLoading">已全部加载</div>
</div>
</template>
<script>
export default {
  name: 'LoadingMore',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    allLoading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
  .loading,.loading-more{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading-all{
    padding: 5px 0px;
  }
</style>
