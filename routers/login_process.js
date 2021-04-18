const express = require('express')
const app = express.Router()
const mysql = require('mysql')
const mysqli = mysql.createConnection({ host: "127.0.0.1", user: "root", password: "#koldin13579", database: "test", port: 3306 })
const crypto = require('crypto')

mysqli.connect()

app.post('/login_process', (req, res, next) => {
    let post = req.body
    let location = '/login'
    let right = 0
    mysqli.query(`select * from account`, async (err, rows) => {
        for(let i = 0; i < rows.length; i++) {
            if(rows[i].nickname == post.nickname) right = 1
        }
        if(right === 1) {
            mysqli.query(`select * from account where nickname='${post.nickname}'`, (err, row) => {
                if(err) throw err
                let pwd = crypto.createHash('sha512').update(post.password).digest('base64')
                if(row[0].password !== pwd) return res.writeHead(302, {Location : '/login'}).end()
                req.session.login = true
                req.session.nickname = post.nickname
                req.session.id = row[0].id
                res.writeHead(302, {Location : '/'}).end()
            })
        } else {
            res.writeHead(302, {Location : '/login'}).end()
        }
        
    })
})

module.exports = app