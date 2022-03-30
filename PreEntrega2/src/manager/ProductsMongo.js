const mongoose = require('mongoose')
const productsServiceSchema = require('../config/mongoModel.js')

const URL =  'mongodb://127.0.0.1:27017/ecommerce'

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})

class ProductManagerMongo {
    getAll = async () => {
        try {
            let products = await productsServiceSchema.find({})
            return {status:"success", payload: products}
        } catch (error) {
            return {status: error}
        }   
    }

    add = async(product) => {
        try {
            if (product.name === undefined) return {message: "error: name needed"}
            if (isNaN(product.price)) return {message: "error: price needed"}
            const productAdded = await productsServiceSchema.insertMany(product)
            return {status:'added 1 product', productAdded}
        } catch (error) {
            return {status: error, message:'imposible to insert product'}
        }
    }

    delete = async(product) => {
        try {
            let data = await productsServiceSchema.deleteMany(product)
            return {status:"success", message:"product deleted", data}
        } catch (error) {
            return {status:error}
        }
    }

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await database("products").where('id', id).update(updatedProduct)
        return { status: "success", message: "Product updated", data }
    }
}

module.exports = ProductManagerMongo;
