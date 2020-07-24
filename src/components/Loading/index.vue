<template>
     <div class="loading" v-show="loadingShow">
    <span v-for="item in 5" :key="item"></span><div class="title">{{loadingText}}</div>
    </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    loadingShow: {
      type: Boolean,
      default: true
    },
    loadingText: {
      type: String,
      default: '预备中...'
    }
  }
}
</script>
<style lang="scss" scoped>
.loading{
            width: 80px;
            height: 40px;
            margin: 0 auto;
            text-align:center;
        }
        .loading span{
            display: inline-block;
            width: 8px;
            height: 100%;
            margin: 0px 2px;
            border-radius: 4px;
            background: lightgreen;
            animation: load 1s ease infinite;
        }
        @keyframes load{
            0%,100%{
                height: 40px;
                background: lightgreen;
            }
            50%{
                height: 70px;
                margin: -15px 2px;
                background: lightblue;
            }
        }
        .loading span:nth-child(2){
            animation-delay:0.2s;
        }
        .loading span:nth-child(3){
            animation-delay:0.4s;
        }
        .loading span:nth-child(4){
            animation-delay:0.6s;
        }
        .loading span:nth-child(5){
            animation-delay:0.8s;
        }
          .title{
            margin:30px auto 30px;
            color: lightgreen
        }
</style>
