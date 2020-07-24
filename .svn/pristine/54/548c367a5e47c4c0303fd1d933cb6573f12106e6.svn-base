<template>
  <div class="certifi-details">
        <div class="score">
      <h1 class='nike-name'><span>{{certifiObj[6]}}</span></h1>
    </div>
    <div class="score">
      <h1 class='title'><span>自评成绩:</span></h1>
      <div class="score-circular"><span>{{certifiObj[0]}}</span> </div>
    </div>
    <div class="content">
     <h1 class="title"><span>学习记录:</span></h1>
     <div class="content-body">
     <div><h1>微课学习</h1> <span class="bar" :style="{width: certifiObj[1]*2+'px'}"></span> {{certifiObj[1]}}门</div>
      <div><h1> 练习次数</h1><span class="bar" :style="{width:certifiObj[2]*10+'px'}"></span> {{certifiObj[2]}}次</div>
     <div><h1>练习题数</h1><span class="bar" :style="{width:certifiObj[3]+'px'}"></span>{{certifiObj[3]}}题</div>
     <div><h1>模拟测评次数</h1><span class="bar" :style="{width:certifiObj[4]*10+'px'}"></span> {{certifiObj[4]}}次</div>
     <div><h1>85分以上模拟测评次数</h1><span class="bar" :style="{width:certifiObj[5]*10+'px'}"></span> {{certifiObj[5]}}次</div>
</div>
</div>
  </div>
</template>
<script>

export default {
  name: 'CertificateDetails',
  data () {
    return {
      certifiObj: []
    }
  },
  created () {
    this.certifiObj = JSON.parse(this.$route.query.list)
  }
}
</script>
<style lang="scss" scoped>
$bg:#26a2ff; $bg1:#f6f6f6e5; $radius:50%;
.certifi-details{
height: 100vh;
box-sizing: border-box;
.title{
  padding: 0px 10px;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  font-family: fantasy;
  background: $bg1;
  span{
    border-bottom: 2px solid #2c3e50;
   padding-bottom: 10px;
  }
}
.score-circular{
  margin: 10px auto;
  width: 100px;
  height: 100px;
display: flex;
justify-content: center;
align-items: center;
  border-radius: $radius;
  border: 8px solid $bg1;
  background: $bg;
  span{
    padding: 10px;
display: inline-block;
width: 35px;
height: 35px;
line-height: 35px;
text-align: center;
    font-size: 24px;
    background: #fff;
    border-radius: $radius;
  }
}
.content{
.content-body{
  padding: 10px;
  font-size: 16px;
  div {
    position: relative;
padding: 25px 0px 0px 25px;
h1{
  color: gray;
}
    &::before{
      content: '';
      position: absolute;
      height: 14px;
      width: 14px;
      background: $bg;
      left: 0px;
bottom: 3px;
    }
  .bar{
    height: 10px;
    max-width: 280px;;
    display: inline-block;
    border-radius: 10px;
    background: $bg;
  }
  }
}
}
}
.nike-name{
  width: 100px;
    margin: 8px auto 5px;
    text-align: center;
    /* font-weight: bold; */
    font-size: 18px;
    background: $bg;
    border-radius: 7px;
    padding: 5px 0px;
    color: #fff;
    box-sizing: border-box;
}

</style>
