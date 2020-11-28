<template>
    <div>
        <mt-button type="primary" @click="handle">获取服务器数据</mt-button>
        <p 
        v-for="(item,index) of this.$store.state.products" :key="index">
        {{item.productName}}
        {{item.salePrice}}</p>
    </div>
</template>
<script>
export default {
    methods:{
        handle(){
            this.$store.dispatch('getServerData');
        }
    }
}
</script>