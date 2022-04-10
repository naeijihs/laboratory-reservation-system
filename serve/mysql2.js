const mysql=require('mysql')
const query2=(sql,params,callback)=>{
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

    for(var i=params[0];i<=params[1];i++)
    for(var j=0;j<params[2].length;j++)
    for(var k=0;k<params[3].length;k++)
    conn.query(sql,[params[4],i,params[2][j],params[3][k],params[5]],(err,results)=>{
        if(err)
        throw err
        callback&&callback(results)
    })
    conn.end(err=>{
        if(err)
        throw err
    })
}
module.exports=query2