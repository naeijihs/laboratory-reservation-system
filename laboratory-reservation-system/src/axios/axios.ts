import axios from 'axios'
import store from '../store/index'
axios.defaults.baseURL='http://localhost:8000'
axios.interceptors.request.use(
    req=>{
        const token=window.sessionStorage.getItem('authorization')
        if(token)
        req.headers.authorization=token
        return req
    },
    err=>{
        throw err
    }
)
axios.interceptors.response.use(
    res=>{
        if(res.data.token)
        window.sessionStorage.setItem('authorization',res.data.token)
        if(res.status==401)
        store.commit('timeout')
        return res
    },
    err=>{
        throw err
    }
)
export default axios