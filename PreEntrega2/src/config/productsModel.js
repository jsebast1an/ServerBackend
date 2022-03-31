const mongoose = require('mongoose')

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required']
    },
    price:{
        type:Number,
        required:[true, 'Name is required']
    },
    stock:{
        type:Number,
        required:[true, 'Name is required']
    },
    status:{
        type: Boolean,
        default: true,
    },
    thumbnail:String,
})

const productsServiceSchema = mongoose.model(productsCollection, productsSchema)

module.exports = productsServiceSchema; 