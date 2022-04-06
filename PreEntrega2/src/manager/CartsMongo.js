require('dotenv').config()
const mongoose = require('mongoose')
const cartsServiceSchema = require('../config/cartsModel.js')


const URL =  process.env.MONGODB

mongoose.connect(URL,{useNewUrlParser:true,useUnifiedTopology:true})

class CartManagerMongo {

    getProducts = async (id) => {
        if(!id) return {status:"error", message: "Id field missing"}
        try {
            let products = await cartsServiceSchema.find({id},{products:1, _id:0})
            return {status:"success", payload: products}
        } catch (error) {
            return {status: error, message:"not cart and products found"}
        }   

    }

    add = async(cart) => {
        try {
            await cartsServiceSchema.insertOne(cart)
            return {status:'added 1 cart'}
        } catch (error) {
            return {status: error, messagge:"Imposible to add"}
        }
    }
    addProduct = async (cartId, productId) => {
        if(!cartId) return {status:"error", message: "cartId field missing"}
        if(!productId) return {status:"error", message: "productId field missing"}
        if (fs.existsSync(pathCarts)) {
            try {
                //array carritos
                const carts = JSON.parse(await fs.promises.readFile(pathCarts, 'utf-8'));

                //ahora tenemos que encontrar el producto
                const products = JSON.parse(await fs.promises.readFile(pathProducts, 'utf-8'));
                const idExistProd = products.some( product => product.id === productId );

                let currentCart = [];

                //Map del array Cart para acceder al cart respectivo(cartId) y pushear el productId
                if (idExistProd) {
                    const cartsUpdated = carts.map( cart => {
                        if (cart.id === cartId) {
                            cart.products.push(productId)
                            currentCart = cart
                            return cart

                        } else return cart
                    } )

                    await fs.promises.writeFile(pathCarts, JSON.stringify(cartsUpdated, null, 2))

                    return {status:"success", message:`Product '${productId}' added`, payload: currentCart}
                    
                } else return {status: "error", message: `productId: ${productId} do not exist`}         
                
            } catch (error) {
                return {status: error, message:"add product error"}
            }   
        } else { return {status: "empty", payload: []} }
    }

    deleteById = async(id) => {
        try {
            let data = await fs.promises.readFile(pathCarts, 'utf-8')
            let carts = JSON.parse(data)
            let newProducts = carts.filter( prod => prod.id !== parseInt(id) )
            await fs.promises.writeFile(pathCarts, JSON.stringify(newProducts, null, 2))
            return {status:"success", message:"cart deleted"}
        } catch (error) {
            return {status:error}
        }
    }

    deleteProduct = async (cartId, productId) => {
        if(!cartId) return {status:"error", message: "cartId field missing"}
        if(!productId) return {status:"error", message: "productId field missing"}
        if (fs.existsSync(pathCarts)) {
            try {
                //array carritos
                const carts = JSON.parse(await fs.promises.readFile(pathCarts, 'utf-8'));
                const idExistCart = carts.some( cart => cart.id === cartId );
                if (!idExistCart) return {status:"error", message:"CartId do not exist"}

                //verificar si existe el id del producto a eliminar
                const cartFound = carts.find( cart => cart.id === cartId )
                const idExistProd = cartFound.products.some( prod => prod === productId )

                //Map del array Cart para acceder al cart respectivo(cartId) y pushear el productId
                if (idExistProd && idExistCart) {
                    const cartsUpdated = carts.map( cart => {
                        if (cart.id === cartId) {
                            cart.products = cart.products.filter( prod => prod !== productId )
                            return cart

                        } else return cart
                    } )

                    await fs.promises.writeFile(pathCarts, JSON.stringify(cartsUpdated, null, 2))

                    return {status:"success", message:`Product '${productId}' deleted from cart ${cartId}`, payload: cartsUpdated}
                    
                } else return {status: "error", message: `productId: ${productId} do not exist in cart ${cartId}`}         
                
            } catch (error) {
                return {status: error, message:"add product error"}
            }   
        } else { return {status: "empty", payload: []} }
    }
}

module.exports = CartManagerMongo;