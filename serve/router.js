const express=require('express')
const router=express.Router()
const bodyParser=require('body-parser')
const jwt=require('jsonwebtoken')
const query=require('./mysql')
const query2=require('./mysql2')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))
router.use((req,res,next)=>{
    if(req._parsedUrl.pathname=='/login')
        return next()
    if(!req.headers.authorization)
        return res.status(401).json()
    else
        req.data=jwt.verify(req.headers.authorization,'123456')
        next()
})
router.post('/login',(req,res)=>{
    if(req.body.account=='admin'&&req.body.password=='admin')
    {
        const token=jwt.sign({account:req.body.account,password:req.body.password},'123456')
        res.json({token,user:'admin'})
    }
    else
        query('SELECT * FROM teacher WHERE account=?',req.body.account,results=>{
            if(req.body.password==results[0].password)
            {
                const token=jwt.sign({account:req.body.account,password:req.body.password},'123456')
                res.json({token,user:results[0].name+'老师'})
            }
            else
                res.json('登录失败')
        })
    
})
router.post('/addLab',(req,res)=>{
    query('INSERT INTO laboratory VALUES (?,?,?)',[req.body.labID,req.body.amount,req.body.description])
    query('INSERT INTO schedule (week,day,section,isempty,labID) VALUES (?,?,?,?,?)',[1,1,1,true,req.body.labID])
    res.end()
})
router.get('/getLabs',(req,res)=>{
    query('SELECT * FROM laboratory',[],results=>{
        res.json(results)
    })
})
router.get('/getSomeLabs',(req,res)=>{
    query('SELECT * FROM laboratory WHERE amount>=?',req.query.cstudent,results=>{
        res.json(results)
    })
})
router.post('/deleteLab',(req,res)=>{
    query('DELETE FROM laboratory WHERE labID=?',req.body.labID)
    res.end()
})
router.post('/addTeacher',(req,res)=>{
    query('INSERT INTO teacher VALUES (?,?,?,?)',[req.body.name,req.body.department,req.body.account,req.body.password])
    res.end()
})
router.get('/getTeachers',(req,res)=>{
    query('SELECT * FROM teacher',[],results=>{
        res.json(results)
    })
})
router.post('/deleteTeacher',(req,res)=>{
    query('DELETE FROM teacher WHERE account=?',req.body.account)
    res.end()
})
router.post('/addCourse',(req,res)=>{
    query('INSERT INTO course (cname,cstudent,ctime,taccount) VALUES (?,?,?,?)',[req.body.cname,req.body.cstudent,req.body.ctime,req.body.taccount])
    res.end()
})
router.get('/getCourses',(req,res)=>{
    query('SELECT * FROM course WHERE taccount=?',req.data.account,results=>{
        res.json(results)
    })
})
router.post('/deleteCourse',(req,res)=>{
    query('DELETE FROM course WHERE cid=?',req.body.cid)
    res.end()
})
router.post('/reserve',(req,res)=>{
    query2('UPDATE schedule SET isempty=false and cid=? where week=? and day=? and section=? and labID=?',[req.body.startweek,req.body.endweek,req.body.days,req.body.sections,req.body.cid,req.body.labID])
    res.end()
})
router.get('/getSchedule',(req,res)=>{
    query('SELECT * FROM schedule WHERE labID=?',req.query.labID,results=>{
        res.json(results)
    })
})
module.exports=router