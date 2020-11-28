<template>
    <div>
        <mt-field type="text" label="用户名" placeholder="用户名" 
        state="success" disableClear v-model="username" :attr="{maxlength:12}">
        </mt-field>
         <mt-field type="password" label="密码" placeholder="密码" 
          state="warning" :attr="{maxlength:15,autocomplete:'off'}" v-model="password" >
        </mt-field>
         <mt-field type="password" label="确认密码" placeholder="再次确认密码" 
      state="error" v-model="conpassword">
        </mt-field>
        
        <mt-button type="primary" size="large" @click="handle">免费注册</mt-button>

    </div>
    
</template>
<script>
  export default{
    data(){
      return {
        username:'',
        password:'',
        conpassword:''
      }
    },
    methods:{
      handle(){
        // console.log(this.username);
        // console.log(this.password);
        // console.log(this.conpassword);
        let username = this.username;
        let password = this.password;
        let conpassword = this.conpassword;
        let usernameReg= /^[0-9a-zA-Z]{6,12}$/;
        //console.log('111111')
        if(usernameReg.test(username)){
          console.log('可以使用');
         // console.log(this.username);

        }else{
           this.$toast({
             message:"用户名格式或内容错误",
             position:"top",
             duration:50000
           });
           return;
        }
        let passwordReg=/^[0-9a-zA-Z\.\-_]{8,15}$/;
        if(passwordReg.test(password)){
          console,log('密码可以使用');
        }else{
          this.$toast({
             message:"密码错误",
          position:"middle",
          duration:5000
          })
         return false;
        }
        if(password==conpassword){
          console.log('两次密码一致');
        }else{
          this.toast({
            message:"两次密码不一致",
            position:"middle",
            duration:4000
          })
        }
      }
    }
  }
   
</script>
