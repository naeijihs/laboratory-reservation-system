<template>
    <div style="display:flex">
        <table id="teacher">
            <tr>
                <th>
                    教师姓名
                </th>
                <th>
                    院系
                </th>
                <th>
                    账号
                </th>
                <th>
                    密码
                </th>
                <th>
                    删除
                </th>
            </tr>
            <tr v-for="(teacher,index) of teachers" :key="index">
                <td>
                    {{teacher.name}}
                </td>
                <td>
                    {{teacher.department}}
                </td>
                <td>    
                    {{teacher.account}}
                </td>
                <td>
                    {{teacher.password}}
                </td>
                <td @click="deleteTeacher(teacher.account)" id='deleteTeacher' style="color:red">
                    ×
                </td>
            </tr>
        </table>
        <div id='addTeacher'>
            <div>
                <input type="text" placeholder="教师姓名" v-model="Name" style="margin-top:80px">
            </div>
            <div>
                <input type="text" placeholder="院系" v-model="Department">
            </div>
            <div>
                <input type="text" placeholder="账号" v-model="Account">
            </div>
            <div>
                <input type="text" placeholder="密码" v-model="Password">
            </div>
            <div>
                <button @click="addTeacher(Name,Department,Account,Password)">添加</button>
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
        const Name=ref('')
        const Department=ref('')
        const Account=ref('')
        const Password=ref('')
        const store=useStore()
        const getTeachers=()=>{
            setTimeout(() => {
                store.dispatch('getTeachers')
            }, 40)
        }
        getTeachers()
        const teachers=computed(()=>store.state.teachers)
        const addTeacher=async(name:any,department:any,account:any,password:any)=>{
                if(name&&department&&account&&password){
                    try {
                        const res=await axios.post('/addTeacher',{name,department,account,password})
                    } catch (error) {
                        if(error)
                        throw error; 
                    }
                    getTeachers()
                    Name.value=''
                    Department.value=''
                    Account.value=''
                    Password.value=''
                }
                else
                alert('请输入完整信息')
                
        }
        const deleteTeacher=async(account:any)=>{
                 try {
                    const res=await axios.post('/deleteTeacher',{account})
                } catch (error) {
                    if(error)
                    throw error; 
                }
                getTeachers()
        }
        return{
            Name,Department,Account,Password,
            addTeacher,
            teachers,
            deleteTeacher
        }
    },
})
</script>

<style scoped>
#teacher{
    width: 650px;
}
#deleteTeacher{
    cursor: pointer;
}
#deleteTeacher:hover{
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