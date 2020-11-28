<template>
  <div>
    <h1>访问VUEX数据--02</h1>
    <p>姓名:{{this.$store.state.username}}</p>
    <p>年龄:{{this.$store.state.age}}</p>
    <p>性别:{{this.$store.state.sex}}</p>
  </div>
</template>
<style scoped>
h1{
  font-size:24px;
  font-weight: bold;
  color:#f00;
  line-height: 2em;
  text-align: center;
}
p{
  line-height: 2em;
}
</style>