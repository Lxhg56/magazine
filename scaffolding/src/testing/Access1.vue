<template>
  <div>
    <h1>访问VUEX数据--01</h1>
    <p>姓名:{{this.$store.state.username}}</p>
    <p>年龄:{{this.$store.state.age}}</p>
    <p>性别:{{this.$store.state.sex}}</p>
    <p><mt-button type="primary" @click="handle">年龄增加</mt-button></p>
    <h1>商品列表如下:</h1>
    <p 
      v-for="(item,index) of this.$store.state.products"
      :key="index">
      {{item.productName}}
      {{item.salePrice}}
    </p>
    <div>
        <mt-field type="text" label="商品名称" placeholder="请输入商品名称"  v-model="productName" >

        </mt-field>
        <mt-field type="text" label="商品价格" placeholder="请输入商品价格" v-model="salePrice">

        </mt-field>
        <mt-button type="primary" @click="add">添加商品</mt-button>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      productName:'',
      salePrice:''
    }
  },
  methods:{
    handle(){
      //提交Vuex中的mutations
      this.$store.commit('changeAge');
    },
    add(){
      let obj = {
        productName:this.productName,
        salePrice:this.salePrice
      }
      this.$store.commit('addProduct',obj);
    }
  }
}
</script>
<style scoped>
h1{
  font-size:24px;
  text-align: center;
  line-height:2em;
}
  
</style>