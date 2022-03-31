require('dotenv').config()
const mongoose = require('mongoose')
const productsServiceSchema = require('../config/productsModel.js')


const URL =  process.env.MONGODB

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('connected to mongoDB');
});

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
        const newProduct = await productsServiceSchema.updateOne(id,{$set:updatedProduct})
        return { status: "success", message: "Product updated", newProduct }
    }
}

module.exports = ProductManagerMongo;
