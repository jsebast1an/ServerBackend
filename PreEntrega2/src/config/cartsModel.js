const {Schema, model} = require('mongoose')

const carstSchema = new Schema({
    products:{
        type:Array
    },
    timestamp:{
        type: Number,
        default:new Date().getFullYear()
    },
})

const cartsServiceSchema = model('carts', carstSchema)

module.exports = cartsServiceSchema;