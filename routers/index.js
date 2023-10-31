const express = require('express')
const app = express.Router()

app.get('/', (req, res, next) => {
    // let session = req.session
    // if(session.login !== true) return res.writeHead(302, {Location : '/login'}).end()
    // let name = session.nickname
    
    res.render('index', {
        name:"유저"
    })
})

module.exports = app