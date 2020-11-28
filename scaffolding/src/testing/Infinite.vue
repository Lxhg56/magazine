<template>  
  <div>
    <h1>无限滚动</h1>
    <div style="border:2px solid #f00;"
      infinite-scroll-distance="20"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="busy">
      <p v-for="(v,k) of n" :key="k">{{v}}</p>
    </div> 
  </div>
</template>
<script>
export default {
  data(){
    return {
      n:30,
      busy:false
    }
  },
  methods: {
    loadMore(){
      //显示加载提示框
      this.$indicator.open("加载中...");
      //模拟服务器请求数据,而且现在服务器的运行速度非常慢
      this.busy = true;
      window.setTimeout(()=>{
        this.n += 30;
        this.busy = false;
        //关闭加载提示框
        this.$indicator.close();
      },5000);
      
    } 
  }
}
</script>
