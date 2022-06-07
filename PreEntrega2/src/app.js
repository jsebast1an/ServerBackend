const express = require('express')
const productRouter = require('./routes/Products')
const cartsRouter = require('./routes/Carts')
const signupRouter = require('./routes/signup')
const loginRouter = require('./routes/login')
const {Server} = require('socket.io')
/* SETTINGS */
const app = express()
const PORT = process.env.PORT || 8080

/* MIDDLEWARES */
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname+'/public'))

/* ROUTES*/
app.use('/signup', signupRouter)
app.use('/login', loginRouter)

app.use('/api/products', productRouter)
app.use('/api/carts', cartsRouter)

/* SERVER */
const server = app.listen(PORT, () => console.log('Listening'))
const io = new Server(server)

app.use('*', (req, res) => {
    res.send({error:"Not found", message:`ROUTE: ${req.url} METHOD: ${req.method} is not implemented yet`})
})

module.exports = {io}