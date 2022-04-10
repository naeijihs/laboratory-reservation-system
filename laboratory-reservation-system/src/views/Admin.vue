<template>
    <div id='CRUD'>
        <div id="sidebar">
            <router-link to='/'>实验室管理</router-link> 
            <router-link to='/TCRUD'>教师管理</router-link>
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        return{

        }
    },
})
</script>

<style scoped>
#CRUD{
    width: 800px;
    height: 450px;
    margin: 0 auto;
    border: 1px solid silver;
    display: flex;
}
#sidebar{
    display: flex;
    height: 450px;
    width: 40px;
    flex-direction: column;
    border-right: 1px solid silver;
}
#sidebar :nth-child(1),#sidebar :nth-child(2){
    height: 225px;
    padding: 50px 10px;
    font-size: 20px;
    cursor: pointer;
    color:rgb(46, 46, 46);
    text-decoration: none;
}
#sidebar :nth-child(2){
    border-top: 1px solid silver;
}
</style>
