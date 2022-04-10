import { createStore } from "vuex";
import axios from '../axios/axios';
const state={
  login:false,
  labs:[],
  teachers:[],
  courses:[],
  tag:false,
  someLabs:[],
  schedule:[]
}
const actions={
  login:async({commit}:any,{account,password}:any)=>{
    try {
      const res=await axios.post('/login',{account,password})
      commit('login',res.data)
    } catch (error) {
      if(error)
      throw error
    }
  },
  getLabs:async({commit}:any)=>{
    try {
      const res=await axios.get('/getLabs')
      commit('getLabs',res.data)
    } catch (error) {
      if(error)
      throw error; 
    }
  },
  getSomeLabs:async({commit}:any,cstudent:any)=>{
    try {
      const res=await axios.get('/getLabs',{params:{cstudent}})
      commit('getSomeLabs',res.data)
    } catch (error) {
      if(error)
      throw error; 
    }
  },
  getTeachers:async({commit}:any)=>{
    try {
      const res=await axios.get('/getTeachers')
      commit('getTeachers',res.data)
    } catch (error) {
      if(error)
      throw error; 
    }
  },
  getCourses:async({commit}:any)=>{
    try {
      const res=await axios.get('/getCourses')
      commit('getCourses',res.data)
    } catch (error) {
      if(error)
      throw error; 
    }
  },
  getSchedule:async({commit}:any,labID:any)=>{
    try {
      const res=await axios.get('/getSchedule',{params:{labID}})
      commit('getSchedule',res.data)
    } catch (error) {
      if(error)
      throw error; 
    }
  },
}
const mutations={
  login(state:any,data:any){
    if(data=='登录失败')
    alert('登录失败，请您重新登录')
    else
    {
      if(data.user)
      {
        state.login=data.user
      }
    }
  },
  timeout(state:any){
    state.login=false
  },
  getLabs(state:any,data:any){
    state.labs=data
  },
  getSomeLabs(state:any,data:any){
    state.someLabs=data
  },
  getTeachers(state:any,data:any){
    state.teachers=data
  },
  getCourses(state:any,data:any){
    state.courses=data
  },
  changeTag(state:any){
    state.tag=!state.tag
  },
  getSchedule(state:any,data:any){
    const arr=[]
    while(data.length)
    arr.push(data.splice(0,25))
    state.schedule=arr
  },
}
export default createStore({
  state,
  mutations,
  actions
});
