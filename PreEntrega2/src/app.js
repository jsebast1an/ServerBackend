const express = require('express')
const productsFsRouter = require('./routes/ProductsFs')
const cartsFsRouter = require('./routes/CartsFs')
require('./manager/ProductsMongo.js')

/* SETTINGS */
const app = express()
const PORT = process.env.PORT || 8080

/* USES */
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname+'/public'))

/* ROUTES*/
app.use('/api/products', productsFsRouter)
app.use('/api/cart', cartsFsRouter)

/* SERVER */
const server = app.listen(PORT, () => console.log('Listening'))

app.use('*', (req, res) => {
    res.send({error:"Not found", message:`ROUTE: ${req.url} METHOD: ${req.method} is not implemented yet`})
})

console.log(process.env.MONGODB);