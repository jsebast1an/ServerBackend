const express = require('express')
const router = express.Router()
const CartManager = require('../manager/Carts')

const cartService = new CartManager()

/* 
router.get('/:id', (req, res) => {
    let id = req.params.id
    cartService.getById(id).then(result => res.send(result) )
}) */

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


/* router.put('/:id', (req, res) => {
    let param = req.params.id;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    cartService.updateProduct(number, req.body).then(result => res.send(result))
})
 */
module.exports = router