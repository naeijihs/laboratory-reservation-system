<template>
    <div id='login'>
      <input type='text' placeholder='账号' v-model='account'>
      <input type='password' placeholder='密码' v-model='password'>
      <div id='btn'>
        <button @click='login(account,password)'>登录</button>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    setup(){
        const store=useStore()
        const account=ref('')
        const password=ref('')
        const login=async(account:any,password:any)=>{
            store.dispatch('login',{account,password})
        }
        return{
            account,
            password,
            login
        }
    }
})
</script>

<style scoped>
#login{
width: 400px;
margin: 85px auto;
border: 1px solid gray;
padding: 0 10px;
border-radius: 6px;
}
input{
width: 300px;
height: 30px;
font-size: 17px;
margin-left: 46px;
margin-top: 50px;
border: 1px solid silver;
border-radius: 6px;
padding-left: 7px;
}
input:focus{
outline: none;
border: 1px solid black;
}
button{
width: 70px;
height: 35px;
font-size: 16.5px;
cursor: pointer;
border: 1px solid silver;
color: gray;
border-radius: 6px;
background-color:white;
margin-left: 160px;
}
button:hover{
background-color: rgb(94, 104, 124);
border: 1px solid  rgb(94, 104, 124);
color:white;
}
button:focus{
outline: none;
}
#btn{
margin-top: 32px;
margin-bottom: 28px;
}
</style>


