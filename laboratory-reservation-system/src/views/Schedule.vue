<template>
    <div>
        <div>
            第<input type="text" v-model="startweek">周到第<input type="text" v-model="endweek">周
            <label>
                <input type="checkbox" name='day' v-model="days" :value="1">
                    周一
            </label>
            <label>
                <input type="checkbox" name='day' v-model="days" :value="2">
                    周二
            </label>
            <label>
                <input type="checkbox" name='day' v-model="days" :value="3">
                    周三
            </label>
            <label>
                <input type="checkbox" name='day' v-model="days" :value="4">
                    周四
            </label>
            <label>
                <input type="checkbox" name='day' v-model="days" :value="5">
                    周五
            </label>
            <label>
                <input type="checkbox" name='section' v-model="sections" :value="1">
                    第一节
            </label>
            <label>
                <input type="checkbox" name='section' v-model="sections" :value="2">
                    第二节
            </label>
            <label>
                <input type="checkbox" name='section' v-model="sections" :value="3">
                    第三节
            </label>
            <label>
                <input type="checkbox" name='section' v-model="sections" :value="4">
                    第四节
            </label>
            <label>
                <input type="checkbox" name='section' v-model="sections" :value="5">
                    第五节
            </label>
            <button @click="reserve(startweek,endweek,days,sections,cid,labID)">预约</button>
        </div>
        <div>
            <div><input type="text" v-model="week"></div>
            <table>
                <tr v-for="(item,index) of schedule[week]" :key='index'>
                    <td :class="{invaild:!item.isempty}">
                        第{{item.week}}周-周{{item.day}}-第{{item.section}}节
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import axios from '../axios/axios'
import {useStore} from 'vuex'
export default defineComponent({
    props:['labID','cid'],
    setup(props) {
        const startweek=ref('')
        const endweek=ref('')
        const days=ref([])
        const sections=ref([])
        const store=useStore()
        const week=ref('')
        const schedule=computed(()=>store.state.schedule)
        const getSchedule=()=>{
            setTimeout(()=>{
                store.dispatch('getSchedule',props.labID)
            },50)
        }
        getSchedule()
        const reserve=async(startweek:any,endweek:any,days:any,sections:any,cid:any,labID:any)=>{
           try {
               const res=await axios.post('/reserve',{startweek,endweek,days,sections,cid,labID})
           } catch (error) {
               if(error)
               throw error
           } 
           getSchedule()
        }
        return{
            days,
            sections,
            startweek,
            endweek,
            reserve,
            schedule,
            week
        }
    },
})
</script>

<style scoped>
.invaild{
    background-color: firebrick;
}
</style>