const mysql=require('mysql')
const query=(sql,params,callback)=>{
    const conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'laboratory-reservation-system'
    })
    conn.connect(err=>{
        if(err)
        throw err
    })
    if(params.length==5)
    {
        for(var i=1;i<=18;i++)
        for(var j=1;j<=5;j++)
        for(var k=1;k<=5;k++)
        {
            params[0]=i
            params[1]=j
            params[2]=k
            conn.query(sql,params,(err,results)=>{
                if(err)
                throw err
                callback&&callback(results)
            })
        }
        conn.end(err=>{
            if(err)
            throw err
        })
    }
    else
    conn.query(sql,params,(err,results)=>{
        if(err)
        throw err
        callback&&callback(results)
        conn.end(err=>{
            if(err)
            throw err
        })
    })
}
module.exports=query