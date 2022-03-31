const express = require('express')
const router = express.Router()
const productMongoManager = require('../manager/ProductsMongo')

const productService = new productMongoManager()

/* CREAR PRODUCTO */
router.post('/', uploader.single('file'), (req, res) => {
    let product = req.body
    let file = req.file
    if(!file) return res.status(500).send({error:'Not uploaded file'})
    product.thumbnail = req.protocol+'://'+req.hostname+':8080/img/'+file.filename
    product.price = parseInt(product.price)
    productService.add(product).then(result => res.send(result))
})

/* READ TODOS LOS PRODUCTOS */
router.get('/', (req, res) => {
    productService.getAll().then(result => res.send(result) )
})

/* ELIMINAR PRODUCTO */
router.delete('/', adminMiddleware, (req, res) => {
    productService.delete(product).then(result => res.send(result) )
})