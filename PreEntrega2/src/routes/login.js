const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const path = require('path')
const io = require('../app')

const router = express.Router()

/* SESSION CONFIG */
router.use(session({
    saveUninitialized:false,
    resave:false,
    secret:"12345",
    store: MongoStore.create({
        mongoUrl:process.env.CONNECT_MONGO_URL,
        ttl:10
    }),
    cookie: { 
        maxAge : 10000
    }
}))

/* LOGIN */
router.get('/', (req, res)=> {
    let user = req.session.user
    if(user) return res.redirect('/logged')
    res.sendFile(path.resolve(__dirname+'/../public/html/login.html'))
})

router.post('/', /* passport.authenticate('login', {failureRedirect:'/'}), */ (req, res)=> {
    let user = req.body
    req.session.user = user
    io.on('connection', socket => {
        socket.emit('user', user)
    })
    res.redirect('/logged')    
})

module.exports = router
