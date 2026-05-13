const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');

// Rutas del carrito
router.get('/cart', cartController.showCart);
//Ruta para agregar producto
router.post('/cart/add/:productId', cartController.addToCart);
//Actualiza la cantidad de productos
router.post('/cart/update/:productId', cartController.updateCartItem);
//Vacia el carrito 
router.post('/cart/clear', cartController.clearCart);
//Ruta de checkout
router.get('/cart/checkout', cartController.showCheckout);
//Ruta para ver un producto
router.get('/:id', productController.showProductDetail);

module.exports = router;