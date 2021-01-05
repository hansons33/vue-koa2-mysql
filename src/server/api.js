const Router = require("koa-router");
const mysql = require("mysql2");
let apiRoutes = new Router();
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'h1989415',
    database:'nodedemo'
})
apiRoutes.get('/api/login',async ctx=>{
    let {username,password} = ctx.request.query;
    let sql = "SELECT * FROM userInfo WHERE username=?";
    let [rows] = await connection.promise().query(sql,[username]);
    if(rows.length){
        if(rows[0]?.password == password)
        ctx.body = {
            error_info:'0',
            message: '登录成功'
        }
    }else{
        ctx.body = {
            error_info:'1',
            message: '登录失败，账号或密码不正确,请重新输入'
        }
    }
})
apiRoutes.post('/api/regist',async ctx=>{
    let {username,password} = ctx.request.body;
    let sql = "SELECT * FROM userInfo WHERE username=?";
    let [res] = await connection.promise().query(sql,[username]);
    if (res.length){
        ctx.body = {
            error_info: '1',
            message:"该用户名已存在,请重新输入"
        }
    }else{
        sql = "INSERT INTO userInfo (username,password) VALUES(?,?)"
        await connection.promise().query(sql,[username,password])
        ctx.body = {
            error_info: '0',
            message:"注册成功"
        }
    }
})
apiRoutes.post('/api/addData',async ctx=>{
    let {username,petName,introduction} = ctx.request.body;
    let sql = "UPDATE userInfo SET petName = ?, introduction = ? WHERE username=?"
    let [rows] = await connection.promise().query(sql,[petName,introduction,username])
    if(rows.affectedRows){
        ctx.body = {
            error_info: '0',
            message: '设置成功'
        }
    }else{
        ctx.body = {
            error_info: '1',
            message: '设置失败，请重新尝试'
        }
    }
})
apiRoutes.get('/api/userInfo',async ctx=>{
    let {username} = ctx.request.query
    let sql = "SELECT * FROM userInfo WHERE username=?"
    let [rows] = await connection.promise().query(sql,[username])
    if(rows[0].petName || rows[0].introduction){
        let {petName,introduction,imgUrl} = rows[0]
        ctx.body = {
            error_info:'0',
            datas:{
                petName,
                introduction,
                imgUrl
            },
            message: '成功获取用户信息' 
        }
    }else{
        ctx.body = {
            error_info: '1',
            message: '请先设置您的昵称和个性签名'
        }
    }
})
apiRoutes.post('/api/addImg',async ctx=>{
    let {username,imgUrl} = ctx.request.body;
    console.log(imgUrl)
    let sql = "UPDATE userInfo SET imgUrl = ? WHERE username=?"
    let res = await connection.promise().query(sql,[imgUrl,username])
    console.log(res)
    if(res[0].affectedRows){
        ctx.body = {
            error_info: '0',
            message: '图片上传成功'
        }
    }else{
        ctx.body = {
            error_info: '1',
            message: '图片上传失败,请重试'
        }
    }
})
apiRoutes.get('/api/articles',async ctx=>{
    let {username} = ctx.request.query;
    let sql = "SELECT * FROM userarticles WHERE username=?"
    let add = "INSERT INTO userarticles (username) VALUES (?)"
    let res = await connection.promise().query(sql,[username])
    if(!res[0].length){
        await connection.promise().query(add,[username])
        ctx.body = {
            error_info:'1',
            message: '啊哦，没有查询到您发布的文章，点击新建文章发布吧~'
        }
    }else{
        let row = res[0]
        if (row[0].Articles && typeof(row[0].Articles) == 'string'){
            ctx.body = {
                error_info: '0',
                message: '',
                datas:{
                    article: JSON.parse(row[0].Articles)
                }
            }
        }else{
            ctx.body = {
                error_info:'1',
                message: '啊哦，没有查询到您发布的文章，点击新建文章发布吧~'
            }
        }
    }
})

apiRoutes.post('/api/addArticle',async ctx=>{
    let {username,article} = ctx.request.body;
    let sql1 = "SELECT * FROM userarticles WHERE username=?"
    let sql2 = "UPDATE userarticles SET Articles = ? WHERE username=?"
    let curArticle = await connection.promise().query(sql1,[username])
    let articles = curArticle[0][0].Articles
    if (!articles){
        article = JSON.stringify([article])
        let res = await connection.promise().query(sql2,[article,username])
        if(res[0].affectedRows){
            ctx.body = {
                error_info:'0',
                message:'添加成功！'
            }
        }
    }else{
        let a = JSON.parse(articles)
        let flag = a.some(item=>item.title == article.title)
        if (flag){
            ctx.body = {
                error_info: '1',
                message:'添加失败，已存在该标题文章！'
            }
        }else{
            a.push(article)
            article = JSON.stringify(a)
            let res = await connection.promise().query(sql2,[article,username])
            if(res[0].affectedRows){
                ctx.body = {
                    error_info:'0',
                    message:'添加成功！'
                }
            }
        }
    }
})
module.exports = apiRoutes;