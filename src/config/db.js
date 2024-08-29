const mysql = require('mysql');

const db_config = {
    DATABASE: '7mu12',
    USERNAME: 'root',
    PASSWORD: 'abc123',
    PORT: 3306,
    HOST: '101.132.46.74',
}

// const pool = mysql.createPool({
//     host: db_config.HOST,
//     user: db_config.USERNAME,
//     password: db_config.PASSWORD,
//     port: db_config.PORT,
//     database: db_config.DATABASE
// })
// const connection = mysql2.createConnection({
//     host: db_config.HOST,
//     user: db_config.USERNAME,
//     password: db_config.PASSWORD,
//     database: db_config.DATABASE
// });

const connection = mysql.createConnection({
    host: db_config.HOST,
    user: db_config.USERNAME,
    password: db_config.PASSWORD,
    database: db_config.DATABASE
})

connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database');
})

const myConnection = {
    query(sql,values){
        return new Promise((resolve,reject)=>{
            connection.query(sql,values,(err,result)=>{
                if(err) throw reject(err);
                resolve(result);
            })
        })
    }
}

// function MySqlQuery(){}
//
// MySqlQuery.prototype.query = (sql,values) => {
//     return new Promise((resolve,reject)=>{
//         connection.query(sql,values,(err,result)=>{
//             if(err) throw reject(err);
//             resolve(result);
//         })
//     })
// }

// async function connect(){
//     const pool = await mysql2.createPool({
//         host: db_config.HOST,
//         user: db_config.USERNAME,
//         password: db_config.PASSWORD,
//         database: db_config.DATABASE
//     })
//     return pool.promise()
// }



// 连接数据库
// connection.connect(err => {
//     if (err) throw err;
//     console.log('Connected to the database.');
// });
// const connection = pool.getConnection()

// const promisePool = pool.promise()

// const conncetionPromise = connection.promise()

// pool.getConnection(function(err, db) {
//     if (err) throw err;
//     console.log('Connected successfully.');
// })
// pool.getConnection((err,conn) => {
//     if (err) throw err;
// })

module.exports = myConnection;