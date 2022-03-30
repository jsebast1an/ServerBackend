const mongoose = require('mongoose')

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    stock:{
        type:Number,
        required:true,
    },
    thumbnail:String,
})

const productsServiceSchema = mongoose.model(productsCollection, productsSchema)

module.exports = productsServiceSchema; 