const express = require('express')
const productsRouter = require('./routes/Products')
const cartsRouter = require('./routes/Carts')

const app = express()
const PORT = 8080
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname+'/public'))

/* PRODUCT MANAGER */
app.use('/api/products', productsRouter)
app.listen(PORT, () => console.log('Listening'))

/* CART MANAGER */

app.use('/api/carrito', cartsRouter)
app.use('/api/carrito/:id', cartsRouter)
app.use('/api/carrito/:id/products', cartsRouter)