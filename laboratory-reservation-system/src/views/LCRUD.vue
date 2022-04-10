<template>
    <div style="display:flex">
        <table id="lab">
            <tr>
                <th>
                    实验室编号
                </th>
                <th>
                    机器数量
                </th>
                <th>
                    配置
                </th>
                <th>
                    删除
                </th>
            </tr>
            <tr v-for="(lab,index) of labs" :key="index">
                <td>
                    {{lab.labID}}
                </td>
                <td>
                    {{lab.amount}}
                </td>
                <td>    
                    {{lab.description}}
                </td>
                <td @click="deleteLab(lab.labID)" id='deleteLab' style="color:red">
                    ×
                </td>
            </tr>
        </table>
        <div id='addLab'>
            <div>
                <input type="text" placeholder="实验室编号" v-model="LabID" style="margin-top:80px">
            </div>
            <div>
                <input type="text" placeholder="机器数量" v-model="Amount">
            </div>
            <div>
                <input type="text" placeholder="配置" v-model="Description">
            </div>
            <div>
                <button @click="addLab(LabID,Amount,Description)">添加</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {useStore} from 'vuex'
import axios from '../axios/axios'
export default defineComponent({
    setup() {
        const LabID=ref('')
        const Amount=ref('')
        const Description=ref('')
        const store=useStore()
        const getLabs=()=>{
            setTimeout(() => {
                store.dispatch('getLabs')
            }, 50)
        }
        getLabs()
        const labs=computed(()=>store.state.labs)
        const addLab=async(labID:any,amount:any,description:any)=>{
                if(labID&&amount&&description){
                    try {
                        const res=await axios.post('/addLab',{labID,amount,description})
                    } catch (error) {
                        if(error)
                        throw error; 
                    }
                    getLabs()
                    LabID.value=''
                    Amount.value=''
                    Description.value=''
                }
                else
                alert('请输入完整信息')
                
        }
        const deleteLab=async(labID:any)=>{
                 try {
                    const res=await axios.post('/deleteLab',{labID})
                } catch (error) {
                    if(error)
                    throw error; 
                }
                getLabs()
        }
        return{
            LabID,
            Amount,
            Description,
            addLab,
            labs,
            deleteLab
        }
    },
})
</script>

<style scoped>
#lab{
    width: 650px;
}
#deleteLab{
    cursor: pointer;
}
#deleteLab:hover{
    transform: scale(1.3);
    transition: 0.3s;
}
td,th{
    text-align: center;
    padding: 4px;
    color: rgb(78, 86, 100);
}
input{
height: 20px;
font-size: 15px;
width: 85px;
margin-bottom: 10px;
border: 1px solid silver;
border-radius: 4px;
padding-left: 4px;
}
input:focus{
outline: none;
border: 1px solid black;
}
button{
width: 50px;
height: 25px;
font-size: 15px;
cursor: pointer;
border: 1px solid silver;
color: gray;
border-radius: 6px;
background-color:white;
margin-left: 18px;
}
button:hover{
background-color: rgb(94, 104, 124);
border: 1px solid  rgb(94, 104, 124);
color:white;
}
button:focus{
outline: none;
}
</style>