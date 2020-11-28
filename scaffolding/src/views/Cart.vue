<template>
    
    <div>
         <mt-header title="学前端，上学问">
                <router-link slot="left" to="/">
                    <mt-button  icon="back"></mt-button>
                </router-link>
               
            </mt-header>


            <!-- 面板区域开始 -->
    <div>
      <mt-tab-container>
        <mt-tab-container-item>
          <!-- 单一文章信息开始 -->
          <div>
            <div>文章标题</div>
            <div>文章内容</div>
            <input type="text">
         
            <button>wancheng</button>
        
          </div>
          <!-- 单一文章信息结束 -->
          
        </mt-tab-container-item>
      </mt-tab-container>
    </div>












        
    </div>
</template>
<style scoped>
.shortcut a {
  color: #fff;
  padding-left: 20px;
}
.main {
  margin-bottom: 55px;
}
.articleItem {
  padding: 10px 0;
  margin: 0 10px;
  border-bottom: 1px solid #999;
}
.articleItem-header {
  font-weight: 600;
  font-size: 17px;
  color: #1a1a1a;
  line-height: 22px;
}
.articleItem-wrapper {
  display: flex;
  align-items: center;
  padding-top: 10px;
  width: 100%;
}
.articleImg {
  margin-right: 15px;
}
.articleImg img {
  width: 112px;
  height: 74px;
  border-radius: 5px;
}
.articleDes {
  height: 65px;
  font-size: 15px;
  overflow: hidden;
  font-weight: 400;
  text-overflow: ellipsis;
  line-height: 21px;
  letter-spacing: normal;
  color: #444;
}
</style>
<script>
export default {
  data() {
    return {
      // 默认被选定的顶部选项卡及面板
      active: "1",
      // 默认被选定的顶部选项卡
      selectedTab: "index",
      // 存储服务器返回的文章分类数据
      category: [],
      // 用于存储服务器返回结果
      articles: [],
      // 用于记录在进入滚动范围后,是否继续触发滚动函数
      busy: false,
      // 页码
      page: 1,
      pagecount:0
    };
  },
  methods: {
    // 获取服务器数据的自定义函数
    // 分别被mounted、watch及无限滚动时调用
    // 纵观三次调用,会发现只有分类ID及页码值是不同的，也就
    // 决定了访自定义函数要带有两个参数

    loadData(cid, page) {
      //显示加载提示框
      this.$indicator.open({
        text:'加载中...',
        spinnerType:'fading-circle'
      });
      // 修改busy变量值的值
      this.busy = true;
      //通过axios工具向Web服务器发送请求以获取文章数据
      this.axios.get("/articles?cid=" + cid + "&page=" + page).then((res) => {
        //获取服务器返回的数据 -- 数组
        let data = res.data.results;
        this.pagecount=res.data.pagecount;
        //数组的遍历,此时的item代表的是组成数组的每一个object
        //每一个object都包含id,subject,description及image属性
        data.forEach((item) => {
          //在文章的图片不为空的情况下才动态加载
          if (item.image != null) {
            //属性重新赋值
            item.image = require("../assets/images/articles/" + item.image);
          }
          //现在在无论是否图片为空都添加到以articles数组中了
          this.articles.push(item);       
        });
        //关闭加载提示框
        this.$indicator.close();
        //修改busy变量的值
        this.busy = false;
      });
    },
logout(){
  this.$store.commit('logout_mutations');
  localStorage.clear();
},
    //无限滚动触发函数
    loadMore() {
      //页码进行累加
      this.page++;
      //调用获取数据的自定义函数 -- loadData
      if(this.page<=this.pagecount){
         this.loadData(this.active,this.page);
      }
     
      
    },
  },
  watch: {
    selectedTab(newValue){
      if(newValue=='index'){
        this.$router.push('/')
      }else if(newValue=='me'){
         this.$router.push('/me')
      }else if(newValue=='cart'){
        this.$router.push('/cart')
      }
    },
    //监听顶部选项卡发生变化时,需要发送请求以获取对应的文章数据
    active(value) {
      //清空之前保存的文章数据
      this.articles = [];
      //设置页码变量值为1(因为刚刚切换到任何一个选项卡时都是显示该类别下的第1页的数据)
      this.page = 1;
      // 调用获取数据的自定义函数 -- loadData()
      this.loadData(this.active, this.page);
    },
  },
  mounted() {
    //通过axios工具向Web服务器发送请求以获取文章分类的数据
    this.axios.get("/category").then((res) => {
      this.category = res.data.results;
    });
    // 调用获取数据的自定义函数 - loadData();
    this.loadData(this.active, this.page);
  },
};
</script>