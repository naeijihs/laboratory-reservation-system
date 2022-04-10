<template>
    <div v-if="tag" id='reservation'>
        <span @click="changeTag" style="position:fixed;right:412px;top:135px;color:rgb(94, 104, 124);cursor:pointer">返回</span>
        <table>
            <tr>
                <th>
                    实验室编号
                </th>
            </tr>
            <tr v-for="(lab,index) of someLabs" :key=index>
                <td>
                    <router-link :to="`schedule/${lab.labID}/${cid}`">{{lab.labID}}</router-link>
                </td>
            </tr>
        </table>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {useStore} from 'vuex'
export default defineComponent({
    props:['cid','cstudent'],
    setup(props) {
        const store=useStore()
        const changeTag=()=>store.commit('changeTag')
        const tag=computed(()=>store.state.tag)
        const getSomeLabs=()=>{
            store.dispatch('getSomeLabs',props.cstudent)
        }
        getSomeLabs()
        const someLabs=computed(()=>store.state.someLabs)
        return{
            changeTag,
            tag,
            someLabs  
        }
    },
})
</script>

<style scoped>
#reservation{
    width:300px;
    margin: 0 auto;
}
td,th{
    padding: 10px 100px;
    text-align: center;
}
a{
    text-decoration:none;color:rgb(40, 149, 199)
}
a:hover{
    color: rgb(94, 104, 124);
}
</style>