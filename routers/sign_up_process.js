// const express = require('express')
// const app = express.Router()
// const mysql = require('mysql')
// const crypto = require('crypto')
// const mysqli = mysql.crzzeateConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "test", port: 3306 })

// mysqli.connect()

// app.post('/sign_up_process', (req, res, next) => {
//     let post = req.body
//     mysqli.query(`Select * from account`, (err, rows) => {
//         for(let i = 0; i < rows.length; i++) {
//             if(post.nickname == rows[i].nickname){
//                return res.status(202).send('이미 이름이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
//             }
//             if(post.email == rows[i].email) {
//                 return res.status(202).send('이미 메일이 존재 합니다!<br><a href = "/sign_up">click here</a> to go login page')
//             }
//         }
//         if(post.nickname.replace(/\s/g, '') === '' || post.email.replace(/\s/g, '') === '' ) return res.writeHead(302, {Locaion:'/sign_up'}) 
//         let password = crypto.createHash('sha512').update(post.password).digest('base64')
//         let params = [post.email, password, post.nickname]
//         mysqli.query(`INSERT INTO account (email, password, nickname) VALUES(?, ?, ?)
//             `, params, (err, row) => {
//             res.writeHead(302, { Location: `/` }).end()
//         })
//     })
// })

// module.exports = app