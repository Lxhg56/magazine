<template>
<!-- 我的页面 -->
  <div class="container">
      <mt-header title="学前端，上学问">
                <router-link slot="left" to="/">
                    <mt-button  icon="back"></mt-button>
                </router-link>
               
            </mt-header>




    <!-- 顶层 背景图 头像 姓名 -->
    <div style="background:rgb(240,240,240);height:100vh;">
      <div class="bg">
        <div class="icon_main" >
        </div>
        <p ></p>
        <p  >未登录</p>
      </div>
      <div class="jump">
         <a>
          <div class="jumpto">
           
            <p>我的钱包</p>
          </div>
        </a>
        <a>
          <div class="jumpto">
         
            <p>收货地址</p>
          </div>
        </a>
       
          <div class="jumpto">
         
            <p>常见问题</p>
          </div>

        <div class="jumpto" >
          <a href="">
     
            <p>退出登录</p>
          </a>
        </div>
      </div>
      <div class="telp">
        <p>
          客服电话:10101
          <a href="tel:101010101"></a>
        </p>
      </div>
      <div class="worktime">
        <p>服务时间: 9:00-23:00</p>
      </div>
    </div>
    
  </div>
</template>

<script>
</script>

<style scoped>
  *{margin: 0;padding: 0;outline:0;}
  .bg{
    width: 100%;
    padding: 10% 0 5%;
  
    background-size: 100% 100%;
  }
  .bg p{
    width: 100%;
    text-align: center;
    font-size: 1rem;
    margin-top: .5rem;
    cursor: pointer;
    color: #333;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .icon_main{
    width: 19.7333%;
    padding-top: 19.7333%;
    border-radius: 100%;
    border: .25rem solid #ffe699;
    background-size: 100% 100%;
    margin: auto;
  }
  .jump{
    background: white;
    
  }
  .jump .jumpto{
    width: 97%;
    margin-left: 3%;
    padding: .625rem 0;
    border-bottom: .0625rem solid #e3e3e3;
    cursor: pointer;
  }
  .jump .jumpto::after{
    display: inline-block;
    content: '>';
    float: right;
    margin-right: 1.375rem;
    font-size: 1.125rem;
    line-height: 1.125rem;
    color: #aaa;
    -webkit-transform: scaleY(1.5) translateY(-75%);
    transform: scaleY(1.5) translateY(-75%);
  }
  .jump .jumpto img{
    width: .9375rem;
    display: inline-block;
    margin: .1875rem .625rem 0 0;
    float: left;
  }
  .jump .jumpto p{
    font-size: .875rem;
    line-height: 1.25rem;
    color: #333;
  }
  .telp{
    font-size: .875rem;
    margin-top: 1.25rem;
    text-align: center;
    color: #ffb000;
    padding: .625rem 0;
    background: white;
  }
  .worktime{
    font-size: .75rem;
    text-align: center;
    color: #999;
    padding: .625rem 0;
    margin-bottom: 4.0625rem;
  }
  a{
    text-decoration: none;
  }
</style>