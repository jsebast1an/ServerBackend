const {Schema, model} = require('mongoose')

const carstSchema = new Schema({
    products:{
        type:String,
        required:true,
    },
    timestamp:{
        type: new Date().getFullYear(),
        required:true,
    },
})

const cartsServiceSchema = model('carts', carstSchema)

module.exports = cartsServiceSchema;