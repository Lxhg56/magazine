import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
import router from '../router';
import {MessageBox} from 'mint-ui';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogined:localStorage.getItem('isLogined')||0,
    //存储登录用户的相关信息
    userInfo:JSON.parse(localStorage.getItem('userInfo'))||{},
  	username:'Tom',
  	age:23,
  	//true表示女,false表示男
  	sex:true,
  	products:[
  		{
  			productName:'1G+8G 教育电视 人工智能液晶平板电视',
  			salePrice:1149
  		},
  		{
  			productName:'AA',
  			salePrice:18525
  		},
  		{
  			productName:'BB',
  			salePrice:86698
  		},
  		{
  			productName:'CC',
  			salePrice:896354
  		}
  	]
  },
  //来修改state中共享状态的操作方法
  mutations: {
    //state形参代表的是当前store内的所有state
    changeAge(state){
      state.age++;
    },
    addProduct(state,payload){
      console.log(state);
      console.log(payload);
      state.products.push(payload);
    },
 
  login_mutations(state,payload){
    //修改登录状态为1
    state.isLogined=1;
    //修改登录用户的相关信息
    state.userInfo=payload;
  },
 
  logout_mutations(state,payload){
    //修改登录状态为1
    state.isLogined=0;
    //修改登录用户的相关信息
    state.userInfo={};
  }
  },
  actions: {
    getServerData(context){
      axios.get('http://127.0.0.1:3000/data').then(res=>{
        console.log(res.data.results)
       context.commit('addProduct',res.data.results);
      });
    },
    login_actions(context,payload){
      //console.log(this)
      // console.log(payload)
      // console.log('现在要发送请求，以实现用户的登录操作了');
      axios.post('/login',payload).then(res=>{
        if(res.data.code==1){
          context.commit('login_mutations',res.data.userInfo);
          localStorage.setItem('isLogined',1);
          localStorage.setItem('userInfo',JSON.stringify(res.data.userInfo));
          router.push('/');
        }else{
          MessageBox('登录提示','用户名或密码错误')
        }
      });
    }

  },
 
  modules: {
  }
})
