require('dotenv').config()
const mongoose = require('mongoose')
const productsServiceSchema = require('../config/productsModel.js')


const URL =  process.env.MONGODB

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

    getById = async(id) => {
        try {
            let product = await productsServiceSchema.findById(id)
            return {status:"success", payload: product}
        } catch (error) {
            return {status: error, message:'imposible to find by ID product'}
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

    deleteById = async(id) => {
        try {
            let data = await productsServiceSchema.deleteOne({ _id: id });
            return {status:"success", message:"product deleted", data}
        } catch (error) {
            return {status:error}
        }
    }

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        const newProduct = await productsServiceSchema.findByIdAndUpdate(id, updatedProduct)
        return { status: "success", message: "Product updated", newProduct }
    }
}

module.exports = ProductManagerMongo;
