const myConnection = require("../config/db");
const jwt = require("../utils/jwt");
exports.userRegister = async (req,res) => {
    const sql = 'select * from users where name=?';
    const sql1 = 'insert into users (name,password,age,gender,address) values (?,?,?,?,?)';
    const {name,password,age,gender,address} = req.body
    try {
        const result = await myConnection.query(sql, name);
        if(result.length > 0){
            return res.status(300).send({
                code:'300',
                message: '用户已存在',
                data:null
            })
        }
        const result1 = await myConnection.query(sql1, [name,password,age,gender,address]);
        if(result1){
            res.status(200).send({
                code:'0',
                message: '注册成功',
                data:{name,password,age,gender,address}
            })
        }
    }catch (err){
        res.status(500).send('Server error.')
        throw err
    }
}

exports.userDelete = async (req,res) => {
    let sql = 'delete from users where id in (';
    const {ids} = req.body;
    for(let i = 0;i<ids.length; i++){
        if(i === ids.length-1){
            sql += '?'
        }else {
            sql += '?,'
        }
    }
    sql += ')'
    try {
        const result = await myConnection.query(sql,ids);
        if(result){
            res.status(200).send({
                code:'0',
                message: '删除成功',
                data: 'success'
            })
        }
    }catch (err){
        res.status(500).send('Server error.')
        throw err
    }
}

exports.userCancel = async (req,res) => {
    const sql1 = 'select * from users where id=?';
    let sql = 'update users set isdelete=1 where id=?';
    const {id} = req.body
    try {
        const result1 = await myConnection.query(sql1,id);
        if(result1.length <= 0){
            return res.status(200).send({
                code:'0',
                message: '用户不存在'
            })
        }
        const result = await myConnection.query(sql,id);
        if(result){
            res.status(200).send({
                code:'0',
                message: '删除成功',
                data: 'success'
            })
        }
    }catch (err){
        res.status(500).send('Server error.')
        throw err
    }
}

exports.userLogin = async (req,res) => {
    const sql = 'select * from users where name=? and password=?';
    const {name,password} = req.body;
    try {
        const result = await myConnection.query(sql,[name,password]);
        if(result.length > 0){
            const token = jwt.creat({name,password},60 * 60)
            res.header('Authorization',token)
            res.status(200).send({
                code:'0',
                message: '登录成功',
                data: result[0]
            })
        }else {
            res.status(200).send({
                code:'300',
                message: '用户名或密码错误',
                data: null
            })
        }
    }catch (err){
        res.status(500).send('Server error.')
    }
}

exports.userInfo = async (req,res) => {
    const sql = 'select * from users where id=?';
    const {id} = req.query;
    try {
        const result = await myConnection.query(sql,id);
        if(result.length > 0){
            return res.status(200).send({
                code:'0',
                message: 'success',
                data:result[0]
            })
        }else {
            res.status(200).send({
                code:'300',
                message:'查询用户不存在',
                data: null
            })
        }
    }catch (err){
        res.status(500).send('Server error.')
    }
}

exports.userUpdate = async (req,res) => {
    // const sql = 'update users set isupdate=1 where id=?';
}