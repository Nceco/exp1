const express = require("express");
const bodyParser = require('body-parser');
const userRouter = require("./src/routers/userRouter");
const jwt = require("./src/utils/jwt")

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next) => {
    if(['/user/login','/user/register'].includes(req.url)){
        next()
        return
    }
    const token = req.headers["authorization"];
    const payload = jwt.verify(token)
    if(payload && token){
        const {name,password} = payload
        const newToken = jwt.creat({name,password})
        res.header("Authorization", newToken);
        next()
    }else {
        res.status(401).json({
            error:"Unauthorized",
            message:"token失效"
        })
    }
})

//路由注册
app.use('/user',userRouter);


// 错误中间件
app.use((err, req, res, next) => {
    res.send(err.message);
})

app.listen('3001',() => {
    console.log("Server started on port 3001");
})