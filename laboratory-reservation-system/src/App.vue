<template>
    <div>
        <span v-if="wlogin" id='user'>{{wlogin}}</span>
        <h1 id="title">实验室预约系统</h1>
        <login v-if="!wlogin" />
        <admin v-else-if="wlogin=='admin'" />
        <teacher v-else-if="wlogin.includes('老师')" />
    </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import {useStore} from 'vuex'
import login from './views/Login.vue'
const admin=defineAsyncComponent(()=>import('./views/Admin.vue'))
const teacher=defineAsyncComponent(()=>import('./views/Teacher.vue'))
export default defineComponent({
    components:{
        login,
        admin,
        teacher
    },
    setup() {
        const store=useStore()
        const wlogin=computed(()=>store.state.login)
        return{
            wlogin
        }
    },
})
</script>


<style>
#title{
    width: 300px;
    margin:60px auto;
    text-align: center;
    color: rgb(94, 104, 124);
}
#user{
    position: fixed;
    right: 413px;
    top: 112px;
    color: rgb(76, 79, 87);
    font-weight: 550;
}
</style>
