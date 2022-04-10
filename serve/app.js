const express=require('express')
const app=express()
const router=require('./router')
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','content-type,Authorization')
    if(req.method=='OPTIONS')
    res.end()
    else
    next()
})
app.use('/',router)
app.listen(8000,()=>{
    console.log('实验室预约系统服务器启动');
})