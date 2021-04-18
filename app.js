const express = require('express')
const app = express()
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const bp = require('body-parser')

const main = require('./routers/index')
const login_process = require('./routers/login_process')
const sign_up_process = require('./routers/sign_up_process')
const logout = require('./routers/logout')

const server = app.listen(3000, () => {
    console.log('hello world')
})

var userCount = 0

const io = require('socket.io').listen(server)

app.set('views', __dirname + '/routers/html')
app.set('view engine','ejs')

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))
app.post('*', bp.urlencoded({ extended: false}))
app.get('/', main)
app.get('/login', (req, res) => {res.sendFile(__dirname + '/routers/html/login.html')})
app.get('/sign_up', (req, res) => {res.sendFile(__dirname + '/routers/html/sign_up.html')})
app.get('/logout', logout)

app.post('/sign_up_process', sign_up_process)
app.post('/login_process', login_process)

io.on('connection', (socket) => {
    userCount++
    
    socket.on('chat', (comment) => {
        io.emit('chat', comment)
    })
    io.emit('user', userCount)
    socket.on('disconnect', () => {
        userCount--
        io.emit('user', userCount)
    })
})

app.get('*', (req, res) => {
    res.status(404).send('Not Found Page!')
})