const {Schema, model} = require('mongoose')



const cartsSchema = new Schema({
    products:{
        type:Array,
        default: []
    },
    timestamp:{
        type: Number,
        default:new Date().getFullYear()
    },
})

const cartsServiceSchema = model('carts', cartsSchema)

module.exports = cartsServiceSchema;