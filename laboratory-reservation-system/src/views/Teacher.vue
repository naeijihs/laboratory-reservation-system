<template>
    <div style="display:flex" v-if="!tag">
        <table id="course">
            <tr>
                <th>
                    课程名
                </th>
                <th>
                    学生数
                </th>
                <th>
                    学时
                </th>
                <th>
                    预约信息
                </th>
                <th>
                    删除
                </th>
            </tr>
            <tr v-for="(course,index) of courses" :key="index">
                <td>
                    {{course.cname}}
                </td>
                <td>
                    {{course.cstudent}}
                </td>
                <td>    
                    {{course.ctime}}
                </td>
                <td>
                    <span v-if="course.schedule">{{course.schedule}}</span> 
                    <router-link v-else :to="`/reservation/${course.cid}/${course.cstudent}`" @click="changeTag">前往预约</router-link>
                </td>
                <td @click="deleteCourse(course.cid)" id='deleteCourse' style="color:red">
                    ×
                </td>
            </tr>
        </table>
        <div id='addCourse'>
            <div>
                <input type="text" placeholder="课程名" v-model="Cname" style="margin-top:80px">
            </div>
            <div>
                <input type="text" placeholder="学生数" v-model="Cstudent">
            </div>
            <div>
                <input type="text" placeholder="学时" v-model="Ctime">
            </div>
            <div>
                <input type="text" placeholder="授课教师账号" v-model="Taccount">
            </div>
            <div>
                <button @click="addCourse(Cname,Cstudent,Ctime,Taccount)">添加</button>
            </div>
        </div>
    </div>
    <router-view></router-view>
</template>

<script lang="ts">
import { computed,  defineComponent, ref } from 'vue'
import {useStore} from 'vuex'
import axios from '../axios/axios'
export default defineComponent({
    setup() {
        const Cname=ref('')
        const Cstudent=ref('')
        const Ctime=ref('')
        const Taccount=ref('')
        const store=useStore()
        const getCourses=()=>{
            setTimeout(() => {
                store.dispatch('getCourses')
            }, 40)
        }
        getCourses()
        const courses=computed(()=>store.state.courses)
        const tag=computed(()=>store.state.tag)
        const addCourse=async(cname:any,cstudent:any,ctime:any,taccount:any)=>{
                if(cname&&cstudent&&ctime&&taccount){
                    try {
                        const res=await axios.post('/addCourse',{cname,cstudent,ctime,taccount})
                    } catch (error) {
                        if(error)
                        throw error; 
                    }
                    getCourses()
                    Cname.value=''
                    Cstudent.value=''
                    Ctime.value=''
                    Taccount.value=''
                }
                else
                alert('请输入完整信息')
                
        }
        const deleteCourse=async(cid:any)=>{
                 try {
                    const res=await axios.post('/deleteCourse',{cid})
                } catch (error) {
                    if(error)
                    throw error; 
                }
                getCourses()
        }
        const changeTag=()=>{
            store.commit('changeTag')
        }
        return{
            Cname,Cstudent,Ctime,Taccount,
            addCourse,
            courses,
            deleteCourse,
            tag,
            changeTag
        }
    },
})
</script>

<style scoped>
#course{
    width: 650px;
    margin: 0 auto;
}
#deleteCourse{
    cursor: pointer;
}
#deleteCourse:hover{
    transform: scale(1.3);
    transition: 0.3s;
}
td,th{
    text-align: center;
    padding: 6px;
    color: rgb(78, 86, 100);
}
#addCourse{
position: fixed;
right: 250px;
top: 127px;
}
input{
height: 20px;
font-size: 15px;
width: 90px;
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
margin-left: 20px;
}
button:hover{
background-color: rgb(94, 104, 124);
border: 1px solid  rgb(94, 104, 124);
color:white;
}
button:focus{
outline: none;
}
a{
    text-decoration:none;color:rgb(40, 149, 199)
}
a:hover{
    color: rgb(94, 104, 124);
}
</style>