const express = require('express')
const productRouter = require('./routes/Products')
const cartsRouter = require('./routes/Carts')
require('./manager/ProductsMongo.js')

/* SETTINGS */
const app = express()
const PORT = process.env.PORT || 8080

/* USES */
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname+'/public'))

/* ROUTES*/
app.use('/api/products', productRouter)
app.use('/api/cart', cartsRouter)

/* SERVER */
const server = app.listen(PORT, () => console.log('Listening'))

app.use('*', (req, res) => {
    res.send({error:"Not found", message:`ROUTE: ${req.url} METHOD: ${req.method} is not implemented yet`})
})

console.log(process.env.MONGODB);