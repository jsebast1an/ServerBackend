const express = require('express')
const router = express.Router()
const ProductManager = require('../manager/Products')
const uploader = require('../services/Upload')

const productService = new ProductManager()


router.get('/', (req, res) => {
    productService.getAll().then(result => res.send(result) )
})
router.get('/:id', (req, res) => {
    let id = req.params.id
    productService.getById(id).then(result => res.send(result) )
})

router.post('/', uploader.single('file'), (req, res) => {
    let product = req.body
    let file = req.file
    if(!file) return res.status(500).send({error:'Not uploaded file'})
    product.thumbnail = req.protocol+'://'+req.hostname+':8080/img/'+file.filename
    product.price = parseInt(product.price)
    productService.add(product).then(result => res.send(result))
})

router.put('/:id', (req, res) => {
    let param = req.params.id;
    if (isNaN(param)) return res.status(400).send({ error: "Not a number" })
    let number = parseInt(param);
    productService.updateProduct(number, req.body).then(result => res.send(result))
})

router.delete('/:id', (req, res) => {
    let id = req.params.id
    productService.deleteById(id).then(result => res.send(result) )
})

module.exports = router