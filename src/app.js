const express = require('express')
const productsRouter = require('./routes/Products')

const app = express()
const PORT = 8080
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static(__dirname+'/public'))


app.use('/api/products', productsRouter)
app.use('/api/productos/:id', productsRouter)
app.listen(PORT, () => console.log('Listening'))