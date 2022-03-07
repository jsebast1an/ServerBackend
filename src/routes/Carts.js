const express = require('express')
const router = express.Router()
const CartManager = require('../manager/Carts')

const cartService = new CartManager()


router.get('/:id', (req, res) => {
    let id = req.params.id
    cartService.getById(id).then(result => res.send(result) )
})

router.post('/', (req, res) => {
    let cart = req.body
    cart.products = []
    cart.timestamp = new Date().getFullYear() 
    cartService.add(cart).then(result => res.send(result))
})
router.post('/:id/', (req, res) => {
    let id = req.params.id
    let productId = req.body.productId
    cartService.addProduct(id, productId).then(result => res.send(result))
})

router.put('/:id', (req, res) => {
    let param = req.params.id;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    cartService.updateProduct(number, req.body).then(result => res.send(result))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    cartService.deleteById(id).then(result => res.send(result) )
})

module.exports = router