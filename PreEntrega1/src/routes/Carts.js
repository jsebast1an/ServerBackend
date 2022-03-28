const express = require('express')
const router = express.Router()
const CartManager = require('../manager/Carts')

const cartService = new CartManager()

/* LISTAR PRODUCTOS DEL CARRITO */
router.get('/:id/products', (req, res) => {
    let id = parseInt(req.params.id) 
    cartService.getProducts(id).then(result => res.send(result) )
})

/* CREAR CARRITO */
router.post('/', (req, res) => {
    let cart = req.body
    cart.products = []
    cart.timestamp = new Date().getFullYear() 
    cartService.add(cart).then(result => res.send(result))
})

/* ADD PRODUCT AL CARRITO */
router.post('/:id/products', (req, res) => {
    const cartId = parseInt(req.params.id) 
    const productId = req.body.productId
    console.log(cartId, productId)
    if( cartId < 0 || isNaN(cartId) ) return res.status(400).send({ error:"error", message:"idCart is incorrect" })

    cartService.addProduct(cartId, productId).then(result => res.send(result))
})

/* BORRAR PRODUCTO DE CARRITO */
router.delete('/:id/products/:id_prod', (req, res) => {
    const cartId = parseInt(req.params.id) 
    const productId = parseInt(req.params.id_prod) 
    console.log(cartId, productId)
    if( cartId < 0 || isNaN(cartId) ) return res.status(400).send({ error:"error", message:"idCart is incorrect" })

    cartService.deleteProduct(cartId, productId).then(result => res.send(result) )
})

/* BORRAR CARRITO */
router.delete('/:id', (req, res) => {
    let id = req.params.id
    cartService.deleteById(id).then(result => res.send(result) )
})

module.exports = router