const fs = require('fs')

const pathCarts = __dirname+'/../files/carts'
const pathProducts = __dirname+'/../files/products'

class CartManager {
    getById = async (id) => {
        if(!id) return {status:"error", message: "Id field missing"}
        if (fs.existsSync(pathCarts)) {
            try {
                let data = await fs.promises.readFile(pathCarts, 'utf-8')
                let carts = JSON.parse(data);
                let cart = carts.find( cart => cart.id == id )
                if(cart) return {status:"success", payload: cart}
                else return {status: null, message: "cart not found"}
            } catch (error) {
                return {status: error}
            }   
        } else { return {status: "empty", payload: []} }
    }

    add = async(cart) => {
        if(fs.existsSync(pathCarts)) {  //pregunta si esxiste el file
            try {
                let data = await fs.promises.readFile(pathCarts, 'utf-8')
                let carts = JSON.parse(data)
            if(carts.length === 0){
                cart.id = 1
                carts.push(cart)
                await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, 2))
                return {status:'added 1 cart'}
            }
            cart.id = carts[carts.length-1].id+1
            carts.push(cart)
            await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, 2))
            return {status:'added 1 cart'}

            } catch (error) {
                return {status: error}
            }
        } else {
            try {
                cart.id = 1
                await fs.promises.writeFile(pathCarts, JSON.stringify([cart], null, 2))
                return {status:'added 1 cart'}
            } catch (error) {   
                return {status: error}
            }
        }
    }
    addProduct = async (id, productId) => {
        if(!id) return {status:"error", message: "Id field missing"}
        if (fs.existsSync(pathCarts)) {
            try {
                //encontramos el carrito
                let data = await fs.promises.readFile(pathCarts, 'utf-8') 
                let carts = JSON.parse(data);
                let cart = carts.find( cart => cart.id === parseInt(id) )
                //ahora tenemos que encontrar el producto
                let data2 = await fs.promises.readFile(pathProducts, 'utf-8')
                let products = JSON.parse(data2);
                let product = products.find( product => product.id == parseInt(productId))
                if (cart) {
                    newCart = cart.products.push(product.id)
                    await fs.promises.writeFile(pathCarts, JSON.stringify([...carts, newCart]))
                    return {status:"success", payload: newCart}
                }
                else return {status: null, message: "cart not found"}
            } catch (error) {
                return {status: error}
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

    updateProduct = async(id, updatedProduct) => {
        if (!id) return { status: "error", error: "ID needed" }
        const data = await fs.promises.readFile(pathCarts, 'utf-8')
        let carts = JSON.parse(data)
        const index = carts.findIndex(e => e.id === id)
        carts[index] = updatedProduct.precio
        carts = [...carts, carts[index]]

        await fs.promises.writeFile(pathCarts, JSON.stringify(carts, null, 2))
        return { status: "success", message: "Product updated" }
    }
}

module.exports = CartManager;