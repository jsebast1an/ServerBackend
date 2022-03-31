const ProductManagerMongo = require('../manager/ProductsMongo');
const ProductManager = require('../manager/ProductsFs');
const CartManager = require('../manager/CartsFs');

const db = 'mongo';

let productDao;
let cartDao;

switch (db) {
    case 'mongo':
        productDao = new ProductManagerMongo()
        break;
    case 'fs':
        productDao = new ProductManager()
        cartDao = new CartManager()
        break;
    default:
        break;
}

module.exports = {
    productDao,
    cartDao
};